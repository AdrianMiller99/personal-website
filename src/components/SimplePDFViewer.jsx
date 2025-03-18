import React, { useState, useEffect, useRef } from 'react';
import { pdfjs } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Maximize, ChevronsDown, Minimize } from 'lucide-react';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the worker path to the local file
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// Add CSS for text layer selection
const injectTextLayerCSS = () => {
  if (!document.getElementById('pdf-text-layer-styles')) {
    const style = document.createElement('style');
    style.id = 'pdf-text-layer-styles';
    style.textContent = `
      .textLayer {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        line-height: 1.0;
        text-align: initial;
        opacity: 0.2;
      }

      .textLayer span,
      .textLayer br {
        color: transparent;
        position: absolute;
        white-space: pre;
        cursor: text;
        transform-origin: 0% 0%;
      }

      .textLayer span.markedContent {
        top: 0;
        height: 0;
      }

      .textLayer .highlight {
        margin: -1px;
        padding: 1px;
        background-color: rgba(180, 0, 170, 0.2);
        border-radius: 4px;
      }

      .textLayer ::selection {
        background: rgba(240, 171, 0, 1); /* my-yellow with opacity */
        color: transparent;
      }
    `;
    document.head.appendChild(style);
  }
}

// Inject CSS when component is imported
injectTextLayerCSS();

const SimplePDFViewer = ({ pdfUrl, onError, renderCustomControls }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimalFit, setIsOptimalFit] = useState(true); // Track if we're in optimal fit mode
  const canvasRef = useRef(null);
  const textLayerRef = useRef(null);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const pdfInstanceRef = useRef(null); // For proper cleanup
  const renderTaskRef = useRef(null); // For proper cleanup
  const [originalPageSize, setOriginalPageSize] = useState({ width: 0, height: 0 });
  const initialLoadRef = useRef(true); // Track if this is the initial load
  const prevScaleRef = useRef(1.0); // Track previous scale for zoom centering

  // Cancel any pending render tasks
  const cancelRenderTask = () => {
    if (renderTaskRef.current && !renderTaskRef.current.promise.isFulfilled) {
      try {
        renderTaskRef.current.cancel();
      } catch (e) {
        console.warn('Error cancelling render task:', e);
      }
      renderTaskRef.current = null;
    }
    
    // Also clear text layer
    if (textLayerRef.current) {
      textLayerRef.current.innerHTML = '';
    }
  };

  // Cleanup PDF instance
  const cleanupPdfInstance = () => {
    cancelRenderTask();
    if (pdfInstanceRef.current) {
      try {
        pdfInstanceRef.current.destroy();
      } catch (e) {
        console.warn('Error destroying PDF instance:', e);
      }
      pdfInstanceRef.current = null;
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    
    // Clear text layer
    if (textLayerRef.current) {
      textLayerRef.current.innerHTML = '';
    }
  };

  // Calculate optimal scale to fit the PDF to the container
  const calculateOptimalScale = () => {
    if (!containerRef.current || !originalPageSize.width || !originalPageSize.height) return 1.0;
    
    // Get container dimensions with a larger margin for comfort, especially at the top
    const containerWidth = containerRef.current.clientWidth - 32; // 16px margin on each side
    const containerHeight = containerRef.current.clientHeight - 50; // Additional margin for top
    
    // Calculate scale factors for width and height
    const scaleX = containerWidth / originalPageSize.width;
    const scaleY = containerHeight / originalPageSize.height;
    
    // Use the smaller scale to ensure the PDF fits within the container
    // Increase the scale multiplier from 1.0 to give a slightly larger initial view
    // but still capped at 1.5 to avoid fuzzy rendering
    const optimalScale = Math.min(scaleX, scaleY * 1.05, 1.5); // Slightly lower multiplier to ensure full visibility
    
    console.log(`Calculated optimal scale: ${optimalScale} from container size ${containerWidth}x${containerHeight} and page size ${originalPageSize.width}x${originalPageSize.height}`);
    
    return optimalScale;
  };

  // Auto-fit PDF to container
  const fitToContainer = () => {
    // Store previous scale for zoom centering
    prevScaleRef.current = scale;
    
    const optimalScale = calculateOptimalScale();
    setScale(optimalScale);
    setIsOptimalFit(true); // Mark that we're in optimal fit mode
  };

  // Set zoom to exactly 100%
  const resetZoom = () => {
    // Store previous scale for zoom centering
    prevScaleRef.current = scale;
    
    setScale(1.0);
    setIsOptimalFit(false); // Not in optimal fit mode when manually set to 100%
  };

  // Helper function to ensure zoom happens from the center
  const adjustScrollPositionAfterZoom = (newScale) => {
    if (!scrollContainerRef.current || !canvasRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    const canvas = canvasRef.current;
    
    // Calculate the center point of the current viewport
    const viewportWidth = scrollContainer.clientWidth;
    const viewportHeight = scrollContainer.clientHeight;
    
    // Calculate the current center position relative to the content
    const centerX = scrollContainer.scrollLeft + viewportWidth / 2;
    const centerY = scrollContainer.scrollTop + viewportHeight / 2;
    
    // Calculate the scale factor between new and old scale
    const scaleFactor = newScale / prevScaleRef.current;
    
    // Calculate new scroll position to maintain the same center point
    const newCenterX = centerX * scaleFactor;
    const newCenterY = centerY * scaleFactor;
    
    // Set new scroll position (after a short delay to allow rendering)
    setTimeout(() => {
      scrollContainer.scrollLeft = newCenterX - viewportWidth / 2;
      scrollContainer.scrollTop = newCenterY - viewportHeight / 2;
    }, 50);
  };

  // Load the PDF document
  useEffect(() => {
    setIsLoading(true);
    initialLoadRef.current = true; // Reset initial load flag when PDF changes
    prevScaleRef.current = 1.0; // Reset previous scale
    setIsOptimalFit(true); // Start with optimal fit mode
    
    // Clean up any existing PDF instance first
    cleanupPdfInstance();
    
    console.log('Loading PDF from:', pdfUrl);
    
    // Add a timestamp to URL to prevent caching issues
    const urlWithTimestamp = `${pdfUrl}?t=${Date.now()}`;
    
    // Use Fetch API to get the PDF as ArrayBuffer
    fetch(urlWithTimestamp)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(arrayBuffer => {
        // Load the PDF document from array buffer
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        
        return loadingTask.promise;
      })
      .then(pdfDoc => {
        console.log('PDF loaded successfully with', pdfDoc.numPages, 'pages');
        pdfInstanceRef.current = pdfDoc; // Store for cleanup
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        
        // Check the first page to determine initial orientation and size
        return pdfDoc.getPage(1).then(page => {
          const viewport = page.getViewport({ scale: 1 });
          console.log('Initial viewport dimensions:', viewport.width, 'x', viewport.height);
          
          // Store original page dimensions
          setOriginalPageSize({
            width: viewport.width,
            height: viewport.height
          });
          
          setRotation(0);
          setIsLoading(false);
        });
      })
      .catch(error => {
        console.error('Error loading PDF:', error);
        setIsLoading(false);
        if (onError && typeof onError === 'function') {
          onError(error);
        }
      });
      
    // Cleanup when component unmounts or pdfUrl changes
    return () => {
      cleanupPdfInstance();
    };
  }, [pdfUrl, onError]);
  
  // Apply optimal scale when original page size is set or container size changes
  useEffect(() => {
    // Only run if we have the original page size
    if (originalPageSize.width > 0 && originalPageSize.height > 0 && containerRef.current) {
      // For initial load, fit to container with a short delay to ensure DOM is ready
      if (initialLoadRef.current) {
        const timer = setTimeout(() => {
          fitToContainer();
          initialLoadRef.current = false; // Mark initial load as complete
          
          // Ensure the top of the PDF is visible by scrolling to top after rendering
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [originalPageSize, isLoading]);
  
  // Handle window resize specifically
  useEffect(() => {
    const handleResize = () => {
      // Only re-render if we have a PDF and it's not loading
      if (pdf && !isLoading && canvasRef.current) {
        // Store previous scale before auto-fitting
        prevScaleRef.current = scale;
        
        // Auto-fit on resize
        fitToContainer();
      }
    };
    
    // Debounce the resize event
    let resizeTimer;
    const debouncedResize = () => {
      cancelRenderTask(); // Cancel any ongoing render
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 250);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [pdf, pageNumber, rotation, isLoading, originalPageSize, scale]);
  
  // Adjust scroll position after scale changes
  useEffect(() => {
    if (!initialLoadRef.current && prevScaleRef.current !== scale) {
      // Only adjust scroll position if we're not in optimal fit mode
      if (!isOptimalFit) {
        adjustScrollPositionAfterZoom(scale);
      }
      prevScaleRef.current = scale; // Update previous scale
    }
  }, [scale, isOptimalFit]);
  
  // Render text layer - directly manipulates the DOM for better text selection
  const renderTextLayer = async (page, viewport, textLayerDiv) => {
    // Get text content
    const textContent = await page.getTextContent();
    
    // Clear text layer
    textLayerDiv.innerHTML = '';
    textLayerDiv.className = 'textLayer';
    
    // Create a simple text layer with better text selection capabilities
    if (!textContent.items || textContent.items.length === 0) return;
    
    // Set container styles for correct positioning
    textLayerDiv.style.width = `${viewport.width}px`;
    textLayerDiv.style.height = `${viewport.height}px`;
    
    // Process text elements
    const textItems = textContent.items;
    
    // Position text elements with correct bounding boxes
    for (let i = 0; i < textItems.length; i++) {
      const item = textItems[i];
      
      if (!item.str || item.str.trim() === '') continue;
      
      // Create text element
      const span = document.createElement('span');
      
      // Calculate text positioning based on the PDF's transform
      // This is where we need to be more precise for text selection
      const tx = pdfjs.Util.transform(
        viewport.transform,
        item.transform
      );
      
      // Get font height from the transform
      const fontHeight = Math.sqrt((tx[2] * tx[2]) + (tx[3] * tx[3]));
      
      // To ensure text selection aligns with display at any zoom level:
      // 1. Set text content and position
      span.textContent = item.str;
      
      // 2. Calculate exact position taking zoom into account
      const left = tx[4];
      const top = tx[5] - fontHeight;
      
      // 3. Apply precise styling
      span.style.left = `${left}px`;
      span.style.top = `${top}px`;
      span.style.fontSize = `${fontHeight}px`;
      span.style.fontFamily = item.fontFamily || 'sans-serif';
      
      // 4. Set exact width for proper text selection
      span.style.width = `${item.width * viewport.scale}px`;
      span.style.height = `${fontHeight}px`;
      
      // 5. Make sure text is transparent but selectable
      span.style.color = 'transparent';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'pre';
      span.style.transformOrigin = '0% 0%';
      
      // Append to text layer container
      textLayerDiv.appendChild(span);
    }
  };
  
  // Render current page with text layer
  const renderPage = async (pdfDoc, num, currentScale, currentRotation) => {
    if (!canvasRef.current || !textLayerRef.current) return;
    
    cancelRenderTask(); // Cancel any ongoing render
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const textLayerDiv = textLayerRef.current;
    
    // Clear the canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Clear text layer
    textLayerDiv.innerHTML = '';
    
    try {
      // Get the current page
      const page = await pdfDoc.getPage(num);
      
      // Calculate viewport to display the page - this is critical for alignment
      const viewport = page.getViewport({ 
        scale: currentScale,
        rotation: currentRotation 
      });
      
      // Set canvas dimensions to match the viewport
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // Render the page
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      
      console.log(`Rendering page ${num} with scale ${currentScale} and rotation ${currentRotation}`);
      renderTaskRef.current = page.render(renderContext);
      await renderTaskRef.current.promise;
      
      // Render text layer with custom implementation for better selection
      await renderTextLayer(page, viewport, textLayerDiv);
      
      // Update the parent container's dimensions for proper scrolling
      if (canvas.parentElement && canvas.parentElement.parentElement) {
        // For better scrolling when zoomed in
        if (currentScale > 1 && !isOptimalFit) { // Only expand if not in optimal fit mode
          canvas.parentElement.parentElement.style.width = `${Math.max(viewport.width + 40, containerRef.current.clientWidth)}px`;
          canvas.parentElement.parentElement.style.height = `${Math.max(viewport.height + 40, containerRef.current.clientHeight)}px`;
        } else {
          // Reset to auto dimensions when not zoomed in or in optimal fit mode
          canvas.parentElement.parentElement.style.width = '100%';
          canvas.parentElement.parentElement.style.height = '100%';
        }
      }
      
    } catch (error) {
      if (error.name !== 'RenderingCancelled') {
        console.error('Error rendering page:', error);
      }
    }
  };
  
  // Call renderPage when PDF or settings change
  useEffect(() => {
    if (pdf && canvasRef.current && !isLoading) {
      renderPage(pdf, pageNumber, scale, rotation);
    }
  }, [pdf, pageNumber, scale, rotation, isLoading, isOptimalFit]);
  
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const zoomIn = () => {
    // Store previous scale for zoom centering
    prevScaleRef.current = scale;
    setIsOptimalFit(false); // No longer in optimal fit mode when manually zooming
    
    setScale(prevScale => {
      const newScale = Math.min(prevScale + 0.2, 3);
      console.log('Zooming in, new scale:', newScale);
      return newScale;
    });
  };

  const zoomOut = () => {
    // Store previous scale for zoom centering
    prevScaleRef.current = scale;
    setIsOptimalFit(false); // No longer in optimal fit mode when manually zooming
    
    setScale(prevScale => {
      const newScale = Math.max(prevScale - 0.2, 0.5);
      console.log('Zooming out, new scale:', newScale);
      return newScale;
    });
  };

  const rotate = () => {
    setRotation(prevRotation => {
      const newRotation = (prevRotation + 90) % 360;
      console.log('Rotating, new rotation:', newRotation);
      return newRotation;
    });
  };
  
  // Control props to pass to custom controls
  const controlProps = {
    pageNumber,
    numPages,
    scale,
    rotation,
    isLoading,
    goToPrevPage,
    goToNextPage,
    zoomIn,
    zoomOut,
    rotate,
    fitToContainer,
    resetZoom
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex justify-between items-center p-1 bg-gray-600 rounded-t-lg">
        {/* Custom controls or page navigation */}
        <div className="flex items-center space-x-2">
          {renderCustomControls ? (
            renderCustomControls(controlProps)
          ) : numPages > 1 ? (
            <>
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1 || isLoading}
                className="p-1 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              
              <span className="text-white text-sm">
                {pageNumber} / {numPages || '?'}
              </span>
              
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages || isLoading}
                className="p-1 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            </>
          ) : (
            <div></div> /* Empty div to maintain the flex layout */
          )}
        </div>
        
        {/* Page navigation if custom controls are present and there are multiple pages */}
        {renderCustomControls && numPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1 || isLoading}
              className="p-1 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            
            <span className="text-white text-sm">
              {pageNumber} / {numPages || '?'}
            </span>
            
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages || isLoading}
              className="p-1 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="p-1 rounded hover:bg-gray-500"
            aria-label="Zoom out"
            type="button"
            disabled={isLoading}
          >
            <ZoomOut size={18} className="text-white" />
          </button>
          
          <span className="text-white text-sm">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={zoomIn}
            className="p-1 rounded hover:bg-gray-500"
            aria-label="Zoom in"
            type="button"
            disabled={isLoading}
          >
            <ZoomIn size={18} className="text-white" />
          </button>
          
          <button
            onClick={resetZoom}
            className="p-1 rounded hover:bg-gray-500"
            aria-label="Reset to 100%"
            type="button"
            disabled={isLoading}
            title="Reset to 100%"
          >
            <Minimize size={18} className="text-white" />
          </button>
          
          <button
            onClick={fitToContainer}
            className="p-1 rounded hover:bg-gray-500"
            aria-label="Fit to container"
            type="button"
            disabled={isLoading}
          >
            <Maximize size={18} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* PDF Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-grow bg-gray-700 relative"
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="absolute inset-0 overflow-auto"
          >
            <div 
              className={`${isOptimalFit || scale <= 1 ? 'flex items-start justify-center min-h-full min-w-full pt-4' : ''} p-2`}
            >
              <div className="relative">
                <canvas 
                  ref={canvasRef} 
                  className="shadow-lg"
                />
                <div 
                  ref={textLayerRef}
                  className="textLayer absolute top-0 left-0 right-0 bottom-0 z-10"
                  style={{ 
                    userSelect: 'text',
                    pointerEvents: 'auto'
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimplePDFViewer;