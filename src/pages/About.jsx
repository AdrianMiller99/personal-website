import React from 'react';
import Layout from '../components/Layout';

const About = () => {
    const skills = [
        "React", "Next.js", "JavaScript", "TypeScript", "Python", "Java", "C#", "C", 
        "Kotlin", "Haskell", "HTML5", "CSS", "SQL", "MySQL", "MongoDB", "Oracle Database",
        "Pandas", "Node.js", "Android Development", "Unity", "Godot", "Git", "Docker",
        "Android Studio", "Scrum", "Project Planning"
    ];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">About Me</h1>
                
                <section className="mb-12 flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg overflow-hidden">
                            <img 
                                src="/headshot.jpg" 
                                alt="Adrian Miller" 
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                            <div className="mb-4">
                            <p>Hi, I'm Adrian, a computer science student from Switzerland with a passion for blending creativity and technology. While coding is at the heart of what I do, my creative pursuits don't end there—I express myself through music by playing the piano and crafting digital art with 3D modeling in Blender.</p>

                            <p>I'm also an avid gamer who enjoys exploring virtual worlds, understanding game mechanics, and even developing my own game projects. My love for geography often finds its way into my hobbies, whether through strategy games, maps, trivia, or exploring my local geography on my bike.</p>

                            <p>I'm always looking for new challenges and projects that allow me to combine technology with creativity. Feel free to reach out if you share similar interests or just want to connect!</p>


                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span 
                                    key={index} 
                                    className="px-3 py-1 bg-my-green bg-opacity-20 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>                
            </div>
        </Layout>
    );
};

export default About; 