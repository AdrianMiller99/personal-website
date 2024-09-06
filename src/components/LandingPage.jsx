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

            <main className="flex-grow flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full lg:w-1/2 mb-0 lg:pr-6 md:ml-20 lg:ml-20 xl:ml-40">
                    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold mb-6 px-4 lg:px-0 leading-tight">
                        Hello there! <br/> I'm <span className="text-my-yellow">Adrian</span>

                    </h1>
                    <p className="mb-6 mt-4 md:mt-8 flex items-center px-4 lg:px-0 text-2xl sm:text-2xl md:text-xl lg:text-lg">
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
                                <Check size={20} className="text-my-green" />
                            ) : (
                                <Copy size={20} />
                            )}
                        </button>
                    </p>
                    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-0">
                        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-6">
                            <a href="https://github.com/AdrianMiller99?tab=repositories" className="animated-underline text-my-yellow font-bold text-2xl sm:text-2xl md:text-xl lg:text-lg">My projects</a>
                            <a href="#" className="animated-underline text-my-green font-bold text-2xl sm:text-2xl md:text-xl lg:text-lg">My 3D design work</a>
                            <a href="#" className="animated-underline text-my-red font-bold text-2xl sm:text-2xl md:text-xl lg:text-lg">Download my résumé</a>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center items-center mt-0 lg:mt-0">
                    <ThreeScene />
                </div>
            </main>

            <footer className="flex justify-center space-x-6 mt-0">
                <a href="https://linkedin.com/in/adrian-miller99" className="text-gray-500 hover:text-white"><Linkedin size={24} /></a>
                <a href="https://github.com/AdrianMiller99" className="text-gray-500 hover:text-white"><Github size={24} /></a>
            </footer>
        </div>
    );
};

export default LandingPage;