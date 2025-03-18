import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

const ProjectDetail = () => {
    const { projectName } = useParams();
    const location = useLocation();
    const currentPath = location.pathname.substring(1); // Remove leading slash
    
    // Determine if we're on the special decolonise route
    const isDecolonisePage = currentPath === 'decolonise';
    const isGradientPage = currentPath === 'gradient';
    const isValorPage = currentPath === 'valor';
    
    // Use the projectName from params or special route if on that route
    const projectId = isDecolonisePage ? 'decolonise' : (isGradientPage ? 'gradient' : (isValorPage ? 'valor' : projectName));
    
    const [project, setProject] = useState(null);
    
    useEffect(() => {
        // In a real app, you might fetch this data from an API
        // For now, we'll hardcode the projects
        const projects = {
            'decolonise': {
                title: "Decolonise Volunteering",
                description: "An interactive web application featuring an informative quiz about decolonization for SCI Switzerland, designed for potential volunteers.",
                fullDescription: `This project was developed as part of my studies at the University of Applied Sciences and Arts Northwestern Switzerland. 
                It was created in collaboration with SCI Switzerland. The goal was to create an interactive tool that educates people who want to volunteer about decolonization principles and practices. The quiz format makes learning engaging while providing valuable information about ethical volunteering approaches.`,
                deployedUrl: "https://scich.org/decolonize-tool/",
                githubUrl: "#", // Replace with actual GitHub URL if available
                technologies: ["React", "JavaScript", "CSS", "Spring Boot", "Java", "MySQL", "Docker"],
                coverImage: "/decolonise.png",
                images: ["/decolonise.png"],
                date: "2023"
            },
            'gradient': {
                title: "Gradient Wallpaper Generator",
                description: "A beautiful, user-friendly tool for creating custom gradient wallpapers in various aspect ratios.",
                fullDescription: `I created this project one evening when I wanted a new desktop wallpaper but couldn't find anything I liked. The tool allows users to:

• Create customized gradient wallpapers with up to 5 colors
• Adjust gradient angle and opacity of each color
• Select from common screen resolutions (16:9, 4:3, 21:9, etc.)
• Support for custom dimensions
• Toggle between light and dark themes
• Download wallpapers in PNG format

It was a fun project to build and deploy in the short span of a couple of hours. The tool provides a straightforward interface for creating beautiful custom wallpapers quickly.`,
                deployedUrl: "https://gradients.adrianmiller.ch/",
                githubUrl: "https://github.com/AdrianMiller99/gradient_wallpaper_generator",
                technologies: ["TypeScript", "React", "HTML", "Tailwind CSS"],
                coverImage: "/gradient.png",
                images: ["/gradient.png"],
                date: "2023"
            },
            'valor': {
                title: "Chronicles of Valor",
                description: "A turn-based fantasy tactical role-playing game with a retro aesthetic, inspired by classic Fire Emblem games.",
                underConstruction: true,
                fullDescription: `Chronicles of Valor is a passion project born out of nostalgia. After finding an old Fire Emblem GameBoy game I played as a child, I was inspired to create my own tactical RPG with similar gameplay mechanics but with my own unique twist.

This project is developed using the Godot Engine and GDScript. I chose Godot for this project because I had already gained experience with Unity during my university studies and wanted to explore a different game development ecosystem.

Key Features (Planned):
• Turn-based tactical combat on grid-based maps
• Character progression and class system
• Story-driven campaign with branching narratives
• Retro pixel art aesthetic
• Strategic unit positioning and terrain advantages

The game is still early in development with core systems being built out. The repository is private, and no demo is currently available as the project still evolves.`,
                deployedUrl: "",
                githubUrl: "",
                technologies: ["Godot", "GDScript"],
                coverImage: "/Chronicles_Of_Valor.png",
                images: ["/Chronicles_Of_Valor.png"],
                date: "2024"
            },
            // Add more projects as needed
        };
        
        if (projectId && projects[projectId]) {
            setProject(projects[projectId]);
        } else {
            // Handle case where project doesn't exist
            // You could redirect to 404 page or projects list
        }
    }, [projectId]);
    
    if (!project) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto py-10">
                    <h1 className="text-2xl">Project not found</h1>
                </div>
            </Layout>
        );
    }
    
    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                    <p className="text-xl text-gray-300 mb-6">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="px-3 py-1 bg-my-yellow bg-opacity-20 rounded-full text-sm">
                                {tech}
                            </span>
                        ))}
                        {project.underConstruction && (
                            <span className="px-3 py-1 bg-my-red bg-opacity-20 rounded-full text-sm">
                                Under Construction
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="mb-10">
                    <img 
                        src={project.coverImage} 
                        alt={project.title} 
                        className="w-full h-auto rounded-lg mb-6"
                    />
                </div>
                
                <div className="prose prose-invert max-w-none mb-10">
                    <p className="whitespace-pre-line">{project.fullDescription}</p>
                </div>
                
                {project.deployedUrl && (
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2">Live Demo</h3>
                        <a 
                            href={project.deployedUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-my-yellow text-black font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
                        >
                            Visit Project
                        </a>
                    </div>
                )}
                
                {project.githubUrl && project.githubUrl !== "#" && (
                    <div>
                        <h3 className="text-xl font-bold mb-2">Source Code</h3>
                        <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-gray-800 text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            View on GitHub
                        </a>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ProjectDetail; 