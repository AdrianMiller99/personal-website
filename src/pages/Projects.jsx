import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Projects = () => {
    const projects = [
        {
            id: 'decolonise',
            title: "Decolonise Volunteering",
            description: "An interactive web application featuring an informative quiz about decolonization for SCI Switzerland, designed for potential volunteers.",
            category: "Web Development",
            tags: ["React", "JavaScript", "CSS", "Spring Boot", "Java", "MySQL", "Docker"],
            image: "/decolonise.png"
        },
        {
            id: 'gradient',
            title: "Gradient Wallpaper Generator",
            description: "A beautiful, user-friendly tool for creating custom gradient wallpapers in various aspect ratios.",
            category: "Web Development",
            tags: ["TypeScript", "React", "HTML", "Tailwind CSS"],
            image: "/gradient.png"
        },
        {
            id: 'valor',
            title: "Chronicles of Valor",
            description: "A turn-based fantasy tactical role-playing game with a retro aesthetic, inspired by classic Fire Emblem games.",
            category: "Game Development",
            tags: ["Godot", "GDScript"],
            image: "/Chronicles_Of_Valor.png",
            underConstruction: true
        },
        // TODO: Add more projects
    ];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Projects</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <Link 
                            key={index} 
                            to={`/projects/${project.id}`} 
                            className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden hover:bg-opacity-70 transition duration-300"
                        >
                            <div className="h-48 bg-gray-700 overflow-hidden">
                                {project.image && (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover"
                                    />
                                )}
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
                                    {project.underConstruction && (
                                        <span className="px-3 py-1 bg-my-red bg-opacity-20 rounded-full text-sm">
                                            Under Construction
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Projects; 