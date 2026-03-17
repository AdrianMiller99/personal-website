import { useParams, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import ProjectCover from '../components/ProjectCover';
import { findProjectBySlug } from '../data/projects';

const ProjectDetail = () => {
    const { projectName } = useParams();
    const location = useLocation();
    const projectSlug = projectName ?? location.pathname.substring(1);
    const project = findProjectBySlug(projectSlug);
    
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
                    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
                        <ProjectCover project={project} className="w-full h-full" detail />
                    </div>
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
