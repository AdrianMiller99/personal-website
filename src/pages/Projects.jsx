import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProjectCover from '../components/ProjectCover';
import { projects } from '../data/projects';

const Projects = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Projects</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <Link 
                            key={index} 
                            to={`/projects/${project.id}`} 
                            className="glass-surface rounded-lg overflow-hidden transition duration-300 hover:border-white/15"
                        >
                            <div className="h-48 bg-gray-700 overflow-hidden">
                                <ProjectCover project={project} className="w-full h-full" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tag, tagIndex) => (
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
