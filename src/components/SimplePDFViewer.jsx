import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

// Set the worker path to the local file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const SimplePDFViewer = ({ pdfUrl, onError }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  
  // Load the PDF document
  useEffect(() => {
    setIsLoading(true);
    console.log('Loading PDF from:', pdfUrl);
    
    // Use Fetch API to get the PDF as ArrayBuffer
    fetch(pdfUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(arrayBuffer => {
        // Load the PDF document from array buffer
        return pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      })
      .then(pdfDoc => {
        console.log('PDF loaded successfully with', pdfDoc.numPages, 'pages');
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading PDF:', error);
        setIsLoading(false);
        if (onError && typeof onError === 'function') {
          onError(error);
        }
      });
  }, [pdfUrl, onError]);
  
  // Render current page when page number, scale, or rotation changes
  useEffect(() => {
    if (!pdf || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Get the current page
    pdf.getPage(pageNumber).then(page => {
      // Calculate viewport to display the page
      const viewport = page.getViewport({ scale, rotation: rotation });
      
      // Set canvas dimensions to match the viewport
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // Render the page
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      
      page.render(renderContext);
    });
  }, [pdf, pageNumber, scale, rotation]);
  
  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex justify-between items-center p-2 bg-gray-600 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-1 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          
          <span className="text-white text-sm">
            {pageNumber} / {numPages || '?'}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-1 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="p-1 rounded hover:bg-gray-500"
            aria-label="Zoom out"
          >
            <ZoomOut size={20} className="text-white" />
          </button>
          
          <span className="text-white text-sm">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={zoomIn}
            className="p-1 rounded hover:bg-gray-500"
            aria-label="Zoom in"
          >
            <ZoomIn size={20} className="text-white" />
          </button>
          
          <button
            onClick={rotate}
            className="p-1 rounded hover:bg-gray-500"
            aria-label="Rotate"
          >
            <RotateCw size={20} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* PDF Canvas */}
      <div className="flex-grow overflow-auto bg-gray-700 p-4 flex justify-center">
        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <canvas 
            ref={canvasRef} 
            className="shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default SimplePDFViewer; 