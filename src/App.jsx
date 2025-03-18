import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Resources from './pages/Resources';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectName" element={<ProjectDetail />} />
                <Route path="/decolonise" element={<ProjectDetail />} />
                <Route path="/gradient" element={<ProjectDetail />} />
                <Route path="/valor" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
            </Routes>
        </Router>
    );
}

export default App;