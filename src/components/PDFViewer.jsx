// This component is no longer used. The PDF viewer is now directly implemented
// in the Resources.jsx page using a simple iframe approach for better compatibility.

import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Import pdfjs and set the worker source
import { pdfjs } from 'react-pdf';
// Use the local worker file instead of CDN to avoid CORS issues
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PDFViewer = ({ pdfUrl, onError }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add a useEffect to log when the component mounts
  useEffect(() => {
    console.log('PDFViewer mounted, using worker at:', pdfjs.GlobalWorkerOptions.workerSrc);
    return () => {
      console.log('PDFViewer unmounted');
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('PDF loaded successfully with', numPages, 'pages');
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (errorMessage) => {
    console.error('Error loading PDF:', errorMessage);
    setError(errorMessage);
    setIsLoading(false);
    if (onError && typeof onError === 'function') {
      onError(errorMessage);
    }
  };

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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-lg">
        <p className="text-xl font-semibold mb-4 text-red-600">Error Loading PDF</p>
        <p className="mb-6 text-gray-600 text-center">
          There was an error loading the PDF. Please try downloading it instead.
        </p>
      </div>
    );
  }

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
      
      {/* PDF Document */}
      <div className="flex-grow overflow-auto bg-gray-700 p-4 flex justify-center">
        {isLoading && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          options={{
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
            cMapPacked: true,
            standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/standard_fonts/'
          }}
          loading={null} // We're handling loading state ourselves
        >
          {!error && numPages && (
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
            />
          )}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer; 