import React from 'react';
import Layout from '../components/Layout';

const Resources = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Resources</h1>
                
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Resume</h2>
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                        <p className="mb-4">Download my resume in different formats:</p>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-my-blue rounded hover:bg-opacity-80">
                                Download PDF
                            </button>
                            <button className="px-4 py-2 bg-my-blue rounded hover:bg-opacity-80">
                                View Online
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Resources; 