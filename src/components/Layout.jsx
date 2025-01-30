import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';

const Layout = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const navItems = [
        { color: 'border-my-green bg-my-green', title: 'About', path: '/about' },
        { color: 'border-my-yellow bg-my-yellow', title: 'Projects', path: '/projects' },
        { color: 'border-my-red bg-my-red', title: 'Contact', path: '/contact' },
        { color: 'border-my-blue bg-my-blue', title: 'Resources', path: '/resources' }
    ];

    return (
        <div className="min-h-screen bg-transparent text-white flex flex-col justify-between p-4 md:p-8">
            <ParticleNetwork interactive={isHome} />
            <div className="sticky top-0 z-20 bg-my-gray/80 backdrop-blur-sm -mx-4 md:-mx-8">
                <div className="w-full px-4 md:px-8">
                    <div className="relative flex items-center">
                        <Link to="/" className="hover:scale-110 transition-transform duration-300">
                            <img src="/white.svg" alt="Logo" className="w-8 h-8" />
                        </Link>
                        <div className="flex-1">
                            <div className="flex justify-center space-x-6 py-4">
                                {navItems.map((item, index) => (
                                    <Link key={index} to={item.path} className="group relative">
                                        <div className={`w-5 h-5 ${item.color} rounded-full cursor-pointer 
                                            border-2 hover:bg-opacity-100 bg-opacity-0 
                                            transition-all duration-300 hover:scale-110
                                            ${location.pathname === item.path ? 'bg-opacity-100' : ''}`}>
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
                        </div>
                    </div>
                </div>
            </div>
            <main className="flex-grow mt-8 md:mt-12">
                {children}
            </main>
            <footer className="flex justify-center space-x-6 mt-6">
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

export default Layout; 