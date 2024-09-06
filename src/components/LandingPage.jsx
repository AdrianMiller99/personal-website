// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-my-gray text-white flex flex-col justify-between p-8">
            {/* Identity dots */}
            <div className="flex justify-center space-x-2 mb-12">
                <div className="w-2 h-2 bg-my-green rounded-full"></div>
                <div className="w-2 h-2 bg-my-yellow rounded-full"></div>
                <div className="w-2 h-2 bg-my-red rounded-full"></div>
                <div className="w-2 h-2 bg-my-blue rounded-full"></div>
            </div>

            {/* Main content */}
            <main className="flex-grow flex items-center">
                <div className="max-w-3xl m-40" >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        A <span className="text-my-yellow">25-year-old</span>
                        <br />software engineer
                    </h1>
                    <p className="mb-6 my-14">
                        <a href="mailto:adrian@adrianmiller.ch" className="hover:text-my-blue transition-colors duration-300 cursor-pointer">
                            adrian@adrianmiller.ch
                        </a>
                    </p>
                    <div className="space-x-4">
                        <a href="https://github.com/AdrianMiller99?tab=repositories" className="animated-underline text-my-yellow font-bold">My projects</a>
                        <a href="#" className="animated-underline text-my-green font-bold">My 3D design work</a>
                        <a href="#" className="animated-underline text-my-red font-bold">Download my résumé</a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="flex justify-center space-x-6">
                <a href="https://linkedin.com/in/adrian-miller99" className="text-gray-500 hover:text-white"><Linkedin size={20} /></a>
                <a href="https://github.com/AdrianMiller99" className="text-gray-500 hover:text-white"><Github size={20} /></a>
            </footer>
        </div>
    );
};

export default LandingPage;