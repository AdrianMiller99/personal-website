import React, { useState } from 'react';
import { Github, Linkedin, Copy, Check } from 'lucide-react';
import ThreeScene from './ThreeScene';

const LandingPage = () => {
    const [copied, setCopied] = useState(false);
    const email = 'adrian@adrianmiller.ch';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-my-gray text-white flex flex-col justify-between p-4 md:p-8">
            <div className="flex justify-center space-x-2 mb-6 md:mb-12">
                <div className="w-2 h-2 bg-my-green rounded-full"></div>
                <div className="w-2 h-2 bg-my-yellow rounded-full"></div>
                <div className="w-2 h-2 bg-my-red rounded-full"></div>
                <div className="w-2 h-2 bg-my-blue rounded-full"></div>
            </div>

            <main className="flex-grow flex flex-col md:flex-row items-center justify-center">
                <div className="max-w-xl w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
                        A <span className="text-my-yellow">25-year-old</span>
                        <br />software engineer
                    </h1>
                    <p className="mb-6 mt-4 md:mt-8 flex items-center">
                        <a
                            href={`mailto:${email}`}
                            className="hover:text-my-blue transition-colors duration-300 cursor-pointer"
                        >
                            {email}
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className="ml-4 p-1 rounded-full hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-none focus:ring-offset-2 focus:ring-offset-my-gray focus:ring-white"
                            title="Copy email address"
                        >
                            {copied ? (
                                <Check size={16} className="text-my-green" />
                            ) : (
                                <Copy size={16} />
                            )}
                        </button>
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="https://github.com/AdrianMiller99?tab=repositories" className="animated-underline text-my-yellow font-bold">My projects</a>
                        <a href="#" className="animated-underline text-my-green font-bold">My 3D design work</a>
                        <a href="#" className="animated-underline text-my-red font-bold">Download my résumé</a>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <ThreeScene />
                </div>
            </main>

            <footer className="flex justify-center space-x-6 mt-8">
                <a href="https://linkedin.com/in/adrian-miller99" className="text-gray-500 hover:text-white"><Linkedin size={20} /></a>
                <a href="https://github.com/AdrianMiller99" className="text-gray-500 hover:text-white"><Github size={20} /></a>
            </footer>
        </div>
    );
};

export default LandingPage;