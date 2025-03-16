import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Download, ExternalLink, FileUp } from 'lucide-react';
import SimplePDFViewer from '../components/SimplePDFViewer';

const Resources = () => {
    const pdfUrl = '/CV_Adrian_Miller_Dark.pdf';
    const [containerHeight, setContainerHeight] = useState('800px');
    const [pdfError, setPdfError] = useState(false);
    
    useEffect(() => {
        // Set container height based on window size
        const updateHeight = () => {
            setContainerHeight(`${window.innerHeight * 0.75}px`);
        };
        
        updateHeight();
        window.addEventListener('resize', updateHeight);
        
        return () => window.removeEventListener('resize', updateHeight);
    }, []);
    
    const handlePdfError = (error) => {
        console.log('PDF viewer failed, showing direct download links:', error);
        setPdfError(true);
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
                    <a 
                        href={pdfUrl}
                        download="CV_Adrian_Miller.pdf"
                        className="px-4 py-2 border border-my-blue rounded text-my-blue hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                        Download <Download size={16} />
                    </a>
                </div>
            </div>
        );
    };
    
    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Resume</h1>
                    <div className="flex gap-4">
                        <a 
                            href={pdfUrl}
                            download="CV_Adrian_Miller.pdf"
                            className="px-4 py-2 bg-my-blue rounded hover:bg-opacity-80 transition-colors duration-300 flex items-center gap-2"
                        >
                            Download CV <Download size={16} />
                        </a>
                    </div>
                </div>
                
                <div className="backdrop-blur-md bg-gray-800 bg-opacity-50 p-6 rounded-lg overflow-hidden">
                    <div 
                        className="bg-gray-700 rounded-lg overflow-hidden" 
                        style={{ height: containerHeight }}
                    >
                        {pdfError ? renderFallback() : <SimplePDFViewer pdfUrl={pdfUrl} onError={handlePdfError} />}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Resources; 