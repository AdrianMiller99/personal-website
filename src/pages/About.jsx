import React from 'react';
import Layout from '../components/Layout';

const About = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">About Me</h1>
                
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Bio</h2>
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                        <p className="mb-4">
                            I'm a passionate developer and designer with a focus on creating 
                            intuitive and engaging web experiences. With a background in both 
                            frontend and backend development, I bring a holistic approach to 
                            every project.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-3 text-my-green">Development</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>React & Next.js</li>
                                <li>JavaScript</li>
                                <li>TypeScript</li>
                                <li>Python</li>
                                <li>Java</li>
                                <li>C#</li>
                                <li>C</li>
                                <li>Kotlin</li>
                                <li>Haskell</li>
                                <li>HTML5</li>
                                <li>CSS</li>
                                <li>SQL</li>
                                <li>MySQL</li>
                                <li>MongoDB</li>
                                <li>Oracle Database</li>
                                <li>Pandas</li>
                                <li>Node.js</li>
                                <li>Android Development</li>
                                <li>Unity</li>
                                <li>Godot</li>
                                <li>Git</li>
                                <li>Docker</li>
                                <li>Android Studio</li>
                                <li>Scrum</li>
                                <li>Project Planning</li>
                                
                            </ul>
                        </div>
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-3 text-my-yellow">Design</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>UI/UX Design</li>
                                <li>Figma</li>
                                <li>3D Modeling</li>
                                <li>Motion Design</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* TODO: Add experience */}
                
            </div>
        </Layout>
    );
};

export default About; 