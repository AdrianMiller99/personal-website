import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Download, ExternalLink, FileUp, Sun, Moon } from 'lucide-react';
import SimplePDFViewer from '../components/SimplePDFViewer';

const Resources = () => {
    const darkModePdfUrl = '/CV_Adrian_Miller_Dark.pdf';
    const lightModePdfUrl = '/CV_Adrian_Miller.pdf';
    const [isDarkPdf, setIsDarkPdf] = useState(true);
    const [containerHeight, setContainerHeight] = useState('800px');
    const [pdfError, setPdfError] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    
    // Use the correct PDF based on theme
    const pdfUrl = isDarkPdf ? darkModePdfUrl : lightModePdfUrl;
    
    useEffect(() => {
        // Set container height based on window size
        const updateHeight = () => {
            // Increase from 0.75 to 0.85 for a larger initial zoom
            setContainerHeight(`${window.innerHeight * 0.85}px`);
        };
        
        updateHeight();
        
        // Debounce resize event
        let resizeTimer;
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateHeight, 250);
        };
        
        window.addEventListener('resize', debouncedResize);
        
        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(resizeTimer);
        };
    }, []);
    
    const handlePdfError = (error) => {
        console.log('PDF viewer failed, showing direct download links:', error);
        setPdfError(true);
    };
    
    // Toggle PDF theme
    const togglePdfTheme = () => {
        setIsDarkPdf(prev => !prev);
    };
    
    const downloadPdf = (e) => {
        e.preventDefault();
        
        if (isDownloading) return; // Prevent multiple clicks
        
        setIsDownloading(true);
        
        try {
            // Create a direct link to the PDF for download
            const link = document.createElement('a');
            link.href = /* pdfUrl */ lightModePdfUrl; // Currently light mode is forced for downloads
            link.download = /* isDarkPdf ? 'CV_Adrian_Miller_Dark.pdf' : */ 'CV_Adrian_Miller.pdf'; // Currently light mode is forced for downloads
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Reset download state after a short delay
            setTimeout(() => {
                setIsDownloading(false);
            }, 1000);
        } catch (error) {
            console.error('Download error:', error);
            setIsDownloading(false);
            
            // Fallback - open in new tab
            window.open(pdfUrl, '_blank');
        }
    };
    
    const renderFallback = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-lg">
                <FileUp size={40} className="text-my-blue mb-4" />
                <p className="text-xl font-semibold mb-4 text-gray-800">PDF Viewer Unavailable</p>
                <p className="mb-6 text-gray-600 text-center">
                    We couldn't load the PDF viewer. You can view the PDF in a new tab or download it directly.
                </p>
                <div className="flex gap-4">
                    <a 
                        href={pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-my-blue rounded text-white hover:bg-opacity-80 transition-colors flex items-center gap-2"
                    >
                        Open in New Tab <ExternalLink size={16} />
                    </a>
                    <button 
                        onClick={downloadPdf}
                        disabled={isDownloading}
                        className="px-4 py-2 border border-my-blue rounded text-my-blue hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {isDownloading ? 'Downloading...' : 'Download'} <Download size={16} />
                    </button>
                </div>
            </div>
        );
    };
    
    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Résumé</h1>
                    <div className="flex gap-4">
                        <button 
                            onClick={downloadPdf}
                            disabled={isDownloading}
                            className="px-4 py-2 bg-my-blue rounded hover:bg-opacity-80 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50"
                        >
                            {isDownloading ? 'Downloading...' : 'Download CV'} <Download size={16} />
                        </button>
                    </div>
                </div>
                
                <div className="backdrop-blur-md bg-gray-800 bg-opacity-50 p-6 rounded-lg overflow-hidden">
                    <div 
                        className="bg-gray-700 rounded-lg overflow-hidden" 
                        style={{ height: containerHeight }}
                    >
                        {pdfError ? 
                            renderFallback() : 
                            <SimplePDFViewer 
                                pdfUrl={pdfUrl} 
                                onError={handlePdfError}
                                renderCustomControls={(controlsProps) => (
                                    <button
                                        onClick={togglePdfTheme}
                                        className="p-1 rounded hover:bg-gray-500 flex items-center"
                                        aria-label={isDarkPdf ? "Switch to light mode" : "Switch to dark mode"}
                                        title={isDarkPdf ? "Switch to light mode" : "Switch to dark mode"}
                                    >
                                        {isDarkPdf ? (
                                            <Sun size={18} className="text-white" />
                                        ) : (
                                            <Moon size={18} className="text-white" />
                                        )}
                                    </button>
                                )}
                            />
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Resources; 