import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin } from 'lucide-react';
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
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center space-x-3">
                                <Mail className="text-my-red" />
                                <span>adrian@adrianmiller.ch</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="text-my-red" />
                                <span>Solothurn, Switzerland</span>
                            </div>
                        </div>

                        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                            <input type="hidden" name="to_name" value="Adrian" />
                            <div>
                                <label className="block mb-2">Name</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    className="w-full p-2 rounded bg-gray-800 bg-opacity-50"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Email</label>
                                <input
                                    type="email"
                                    name="from_email"
                                    className="w-full p-2 rounded bg-gray-800 bg-opacity-50"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Message</label>
                                <textarea
                                    name="message"
                                    className="w-full p-2 rounded bg-gray-800 bg-opacity-50 h-32"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            
                            {status.message && (
                                <div className={`p-3 rounded ${
                                    status.type === 'success' ? 'bg-green-500/20 text-green-200' :
                                    status.type === 'error' ? 'bg-red-500/20 text-red-200' :
                                    'bg-blue-500/20 text-blue-200'
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

                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Connect</h2>
                        <p className="mb-6">
                            Feel free to reach out through any of these platforms:
                        </p>
                        <div className="space-y-4">
                            <a href="https://linkedin.com/in/adrian-miller99" 
                               className="flex items-center space-x-3 hover:text-my-red">
                                <span>LinkedIn</span>
                            </a>
                            <a href="https://github.com/AdrianMiller99" 
                               className="flex items-center space-x-3 hover:text-my-red">
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact; 