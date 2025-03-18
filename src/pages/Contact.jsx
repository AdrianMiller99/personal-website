import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Sending...' });

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then((result) => {
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
        }, (error) => {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        });
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Contact</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center space-x-3">
                                <Mail className="text-my-red" />
                                <span>info@adrianmiller.ch</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="text-my-red" />
                                <span>Solothurn, Switzerland</span>
                            </div>
                        </div>

                        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                            <input type="hidden" name="to_name" value="Adrian" />
                            <div>
                                <label className="block mb-2 text-white">Name</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    className="w-full p-2 rounded bg-gray-700 bg-opacity-80 border border-gray-600 focus:border-my-red focus:outline-none focus:ring-1 focus:ring-my-red text-white"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white">Email</label>
                                <input
                                    type="email"
                                    name="from_email"
                                    className="w-full p-2 rounded bg-gray-700 bg-opacity-80 border border-gray-600 focus:border-my-red focus:outline-none focus:ring-1 focus:ring-my-red text-white"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white">Message</label>
                                <textarea
                                    name="message"
                                    className="w-full p-2 rounded bg-gray-700 bg-opacity-80 border border-gray-600 focus:border-my-red focus:outline-none focus:ring-1 focus:ring-my-red text-white h-32"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            
                            {status.message && (
                                <div className={`p-3 rounded ${
                                    status.type === 'success' ? 'bg-green-500/30 text-green-200' :
                                    status.type === 'error' ? 'bg-red-500/30 text-red-200' :
                                    'bg-blue-500/30 text-blue-200'
                                }`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="px-6 py-2 bg-my-red rounded hover:bg-opacity-80 transition-colors duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-rows-2 gap-6 h-full">
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex flex-col justify-center items-center">
                            <div className="text-center">
                                <img 
                                    src="/headshot.jpg" 
                                    alt="Adrian Miller" 
                                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-2 border-my-red"
                                />
                                <h3 className="text-xl font-semibold mb-2">Adrian Miller</h3>
                                <p className="text-gray-300">Software Developer</p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex flex-col justify-center">
                            <h3 className="text-xl font-semibold mb-4 text-center">Connect With Me</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <a 
                                    href="https://linkedin.com/in/adrian-miller99" 
                                    className="bg-blue-900 bg-opacity-30 flex flex-col items-center p-4 rounded-lg hover:bg-opacity-50 transition-all transform hover:-translate-y-1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin size={32} className="text-blue-400 mb-2" />
                                    <span>LinkedIn</span>
                                </a>
                                <a 
                                    href="https://github.com/AdrianMiller99" 
                                    className="bg-gray-700 bg-opacity-30 flex flex-col items-center p-4 rounded-lg hover:bg-opacity-50 transition-all transform hover:-translate-y-1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github size={32} className="text-gray-300 mb-2" />
                                    <span>GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact; 