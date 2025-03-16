import React from 'react';

const CV = () => {
    return (
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg print:bg-white print:text-black">
            {/* Header */}
            <div className="mb-8 text-center print:text-left">
                <h1 className="text-3xl font-bold mb-2 text-my-blue">Adrian Miller</h1>
                <p className="text-my-blue print:text-gray-600">Full Stack Developer</p>
                <div className="text-sm mt-2 text-gray-400">
                    <p>Solothurn, Switzerland</p>
                    <p>adrian@adrianmiller.ch</p>
                </div>
            </div>

            {/* Skills Section */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-my-blue print:text-gray-800">Technical Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-my-blue font-semibold mb-2 print:text-gray-700">Development</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>React & Next.js</li>
                            <li>JavaScript / TypeScript</li>
                            <li>Python</li>
                            <li>Java</li>
                            <li>Node.js</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-my-blue font-semibold mb-2 print:text-gray-700">Design</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>UI/UX Design</li>
                            <li>Figma</li>
                            <li>3D Modeling</li>
                            <li>Motion Design</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-my-blue print:text-gray-800">Experience</h2>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-my-blue">Senior Developer</h3>
                            <span className="text-sm text-gray-400">2020 - Present</span>
                        </div>
                        <p className="text-my-blue text-sm mb-2 print:text-gray-600">Company Name</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Led development of key projects</li>
                            <li>Mentored junior developers</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section>
                <h2 className="text-xl font-bold mb-4 text-my-blue print:text-gray-800">Education</h2>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-my-blue">Bachelor's in Computer Science</h3>
                            <span className="text-sm text-gray-400">2016 - 2020</span>
                        </div>
                        <p className="text-my-blue text-sm print:text-gray-600">University Name</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CV; 