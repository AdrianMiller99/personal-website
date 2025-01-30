import React from 'react';
import Layout from '../components/Layout';

const Projects = () => {
    const projects = [
        {
            title: "Project 1",
            description: "A web application built with React and Node.js",
            category: "Web Dev",
            tags: ["React", "Node.js", "MongoDB"],
            image: "/path/to/image.jpg"
        },
        // TODO: Add more projects
    ];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Projects</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden">
                            <div className="h-48 bg-gray-700">
                                {/* Project image */}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 bg-my-yellow bg-opacity-20 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Projects; 