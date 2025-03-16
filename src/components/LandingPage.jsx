import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Copy, Check } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';

const LandingPage = () => {
    const [copied, setCopied] = useState(false);
    const email = 'adrian@adrianmiller.ch';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const navItems = [
        { color: 'border-my-green bg-my-green', title: 'About', path: '/about' },
        { color: 'border-my-yellow bg-my-yellow', title: 'Projects', path: '/projects' },
        { color: 'border-my-red bg-my-red', title: 'Contact', path: '/contact' },
        { color: 'border-my-blue bg-my-blue', title: 'Resources', path: '/resources' }
    ];

    return (
        <div className="min-h-screen bg-transparent text-white flex flex-col justify-between p-4 md:p-8">
            <ParticleNetwork />
            <div className="flex justify-center space-x-6 mb-6 md:mb-12">
                {navItems.map((item, index) => (
                    <Link key={index} to={item.path} className="group relative">
                        <div className={`w-5 h-5 ${item.color} rounded-full cursor-pointer 
                            border-2 hover:bg-opacity-100 bg-opacity-0 
                            transition-all duration-300 hover:scale-110`}>
                        </div>
                        <div className="absolute invisible group-hover:visible opacity-0 
                            group-hover:opacity-100 top-full left-1/2 -translate-x-1/2 
                            pt-4 transition-all duration-300">
                            <div className={`${item.color} p-3 rounded-lg border-2 bg-opacity-20`}>
                                <h3 className="text-sm font-medium whitespace-nowrap">{item.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="w-full lg:w-2/3 text-center lg:text-left">
                    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold mb-6 px-4 lg:px-0 leading-tight">
                        Hello there! <br/> I&apos;m <span className="text-my-purple">Adrian</span>
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
                            <Link 
                                to="/projects" 
                                className="animated-underline text-my-yellow font-bold text-2xl sm:text-2xl md:text-xl lg:text-lg"
                            >
                                My projects
                            </Link>
                            <Link 
                                to="/contact" 
                                className="animated-underline text-my-red font-bold text-2xl sm:text-2xl md:text-xl lg:text-lg"
                            >
                                My contact info
                            </Link>
                            <Link 
                                to="/resources" 
                                className="animated-underline text-my-blue font-bold text-2xl sm:text-2xl md:text-xl lg:text-lg"
                            >
                                Download my résumé
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="flex justify-center space-x-6 mt-0">
                <a href="https://linkedin.com/in/adrian-miller99" className="text-gray-500 hover:text-white">
                    <Linkedin size={24} />
                </a>
                <a href="https://github.com/AdrianMiller99" className="text-gray-500 hover:text-white">
                    <Github size={24} />
                </a>
            </footer>
        </div>
    );
};

export default LandingPage;