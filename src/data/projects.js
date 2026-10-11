export const projects = [
    {
        id: 'ultidex',
        title: 'UltiDex',
        description:
            'A fast, client-only Pokedex with generation-aware data views, multilingual search, and dense Pokemon detail screens.',
        fullDescription: `UltiDex is a frontend-only Pokedex built on top of PokeAPI. I designed it around fast exploration, high information density, and zero server-side infrastructure.

The application pre-generates a local static dataset for Pokemon, moves, and abilities, then falls back to live PokeAPI requests when needed. That gives it a responsive feel while still keeping the architecture simple.

Highlights:
- Generation-aware views for moves, abilities, and evolution chains
- Search by canonical or localized Pokemon names
- Detailed Pokemon pages with type matchups, learnsets, evolutions, and alternate forms
- Light and dark themes with preferences stored locally
- Responsive layout tuned for both desktop and mobile browsing`,
        category: 'Web Development',
        technologies: ['React', 'TypeScript', 'Vite', 'React Router', 'PokeAPI', 'CSS'],
        githubUrl: 'https://github.com/AdrianMiller99/ultidex',
        deployedUrl: 'https://pokedex.adrianmiller.ch',
        date: '2026',
        image:'ultidex.png'
    },
    {
        id: 'earthquakes',
        title: 'When Magnitude Lies',
        description:
            'An interactive data story showing why earthquake magnitude alone is a poor predictor of human impact.',
        fullDescription: `This project presents earthquake risk as a narrative data experience instead of a static report. It compares real events such as Haiti and Chile in 2010 to show that a stronger earthquake does not automatically lead to greater devastation.

The live site combines explorable visuals, maps, and comparative storytelling to explain how factors like depth, population exposure, and infrastructure shape outcomes far more than magnitude alone.

Highlights:
- Scroll-based data story structure with multiple interactive sections
- Earthquake energy comparisons and contextual visual explanations
- Geographic storytelling using map-based visuals
- A focused, editorial presentation rather than a dashboard-style interface`,
        category: 'Data Visualization',
        technologies: ['JavaScript', 'D3.js', 'Leaflet', 'HTML', 'CSS'],
        deployedUrl: 'https://earthquakes.coolify.adrianmiller.ch/',
        date: '2026',
        image:'earthquake.png'
    },
        {
        id: 'nutri-track',
        title: 'Nutri Track',
        description:
            'A nutrition tracking app for logging meals, searching food products, and reviewing daily macros with a mobile-first workflow.',
        fullDescription: `Nutri Track is a Vue and Capacitor app focused on reducing friction when tracking daily food intake. Users can sign in, search products from Open Food Facts, log serving sizes, and review their nutrient totals for a selected day.

The project uses Pinia for client-side state management and Supabase for authentication and backend services. It also includes local caching for product data so repeated searches stay fast and the experience remains usable offline.

Highlights:
- Daily dashboard for calories, protein, carbs, fat, fiber, sugar, and sodium
- Open Food Facts integration for product search and barcode-based lookups
- Edit and delete flows for logged meals
- Capacitor setup for Android packaging
- Responsive UI designed to work on both desktop and mobile devices`,
        category: 'Web Development',
        technologies: ['Vue 3', 'Capacitor', 'Pinia', 'Supabase', 'Open Food Facts', 'Vite'],
        githubUrl: '',
        deployedUrl: '',
        date: '2025',
        image:'nutritrack.png'
    },
    {
        id: 'hpcp-assignment-mea',
        title: 'DEMREG HPC Optimization',
        description:
            'A high-performance computing team project exploring CPU vectorization, GPU acceleration, and MPI for a solar physics workload.',
        fullDescription: `This FHNW high-performance computing assignment focused on optimizing DEMREG, a computationally intensive application used to analyze Solar Dynamics Observatory data.

Instead of pursuing a single optimization path, our team split the work across three dedicated branches: CPU vectorization, GPU acceleration with CUDA and CuPy, and MPI-based distributed execution. That setup let us compare different strategies against the same baseline workload and benchmark their performance tradeoffs clearly.

Highlights:
- Separate implementations for CPU, GPU, and MPI optimization strategies
- Benchmarking and performance analysis for each branch
- Branch-based collaboration model for parallel development
- Focus on scientific computing and performance engineering`,
        category: 'High-Performance Computing',
        technologies: ['Python', 'CUDA', 'CuPy', 'MPI', 'NumPy', 'Benchmarking'],
        githubUrl: 'https://github.com/AdrianMiller99/hpcp-assignment-MEA',
        deployedUrl: '',
        date: '2025',
        coverTheme: 'violet',
    },
    {
        id: 'turtle-classification',
        title: 'Sea Turtle Detection from Drone Imagery',
        description:
            'A computer vision project that detects and counts sea turtles in high-resolution drone imagery using convolutional neural networks.',
        fullDescription: `This project implements and compares multiple CNN architectures for identifying turtle-positive image patches in large drone images and estimating turtle counts across full scenes.

The workflow uses high-resolution aerial imagery together with annotated metadata, a sliding-window approach, and GPU-assisted training. The notebook covers data exploration, preprocessing, training, evaluation, and model comparison in a single reproducible workflow.

Highlights:
- Binary classification pipeline for turtle versus non-turtle image patches
- Sliding-window inference across 4,048 x 3,048 drone images
- Comparison of SimpleCNN, DeeperCNN, and transfer-learned ResNet18 models
- Training visualizations, confusion matrices, ROC curves, and prediction examples`,
        category: 'Machine Learning',
        technologies: ['Python', 'PyTorch', 'CNNs', 'Jupyter', 'CUDA', 'Computer Vision'],
        githubUrl: 'https://github.com/AdrianMiller99/turtle-classification',
        deployedUrl: '',
        date: '2025',
        coverTheme: 'teal',
    },
    {
        id: 'bloxgame',
        title: 'BloxGame',
        description:
            'A multiplayer co-op Tetris game where two players share control of the same falling piece in real time.',
        fullDescription: `BloxGame is a collaborative Tetris implementation built around a simple twist: two players control the same game piece together. One player handles movement, while the other manages rotation and hard drop actions.

The project combines a React frontend with an Express backend and Supabase-powered real-time synchronization. It also includes lobby management, authentication, host transfer logic, and cleanup behavior when players leave or close the game.

Highlights:
- Two-player cooperative control scheme for a shared Tetris board
- Lobby creation and join flows with role selection
- Real-time synchronization using Supabase channels
- Backend support for multiplayer session management and score handling`,
        category: 'Web Engineering',
        technologies: ['React', 'Vite', 'Express', 'Supabase', 'PostgreSQL', 'WebSockets'],
        githubUrl: 'https://github.com/AdrianMiller99/bloxgame',
        deployedUrl: '',
        date: '2025',
        coverTheme: 'amber',
    },
    {
        id: 'decolonise',
        aliases: ['decolonise'],
        title: 'Decolonise Volunteering',
        description:
            'An interactive web application featuring an informative quiz about decolonization for SCI Switzerland, designed for potential volunteers.',
        fullDescription: `This project was developed as part of my studies at the University of Applied Sciences and Arts Northwestern Switzerland.

It was created in collaboration with SCI Switzerland. The goal was to create an interactive tool that educates people who want to volunteer about decolonization principles and practices. The quiz format makes learning engaging while providing valuable information about ethical volunteering approaches.`,
        category: 'Web Development',
        technologies: ['React', 'JavaScript', 'CSS', 'Spring Boot', 'Java', 'MySQL', 'Docker'],
        githubUrl: '',
        deployedUrl: 'https://scich.org/decolonize-tool/',
        image: '/decolonise.png',
        date: '2023',
    },
    {
        id: 'gradient',
        aliases: ['gradient'],
        title: 'Gradient Wallpaper Generator',
        description:
            'A beautiful, user-friendly tool for creating custom gradient wallpapers in various aspect ratios.',
        fullDescription: `I created this project one evening when I wanted a new desktop wallpaper but could not find anything I liked.

The tool allows users to create customized gradient wallpapers with up to five colors, adjust angle and opacity, choose from common screen resolutions, enter custom dimensions, toggle between light and dark themes, and export the final wallpaper as a PNG.

It was a small project, but a useful exercise in building and shipping a polished interface quickly.`,
        category: 'Web Development',
        technologies: ['TypeScript', 'React', 'HTML', 'Tailwind CSS'],
        githubUrl: 'https://github.com/AdrianMiller99/gradient_wallpaper_generator',
        deployedUrl: 'https://gradients.adrianmiller.ch/',
        image: '/gradient.png',
        date: '2023',
    },
    {
        id: 'valor',
        aliases: ['valor'],
        title: 'Chronicles of Valor',
        description:
            'A turn-based fantasy tactical role-playing game with a retro aesthetic, inspired by classic Fire Emblem games.',
        fullDescription: `Chronicles of Valor is a passion project born out of nostalgia. After finding an old Fire Emblem GameBoy game I played as a child, I was inspired to create my own tactical RPG with similar gameplay mechanics but with my own twist.

This project is developed using the Godot Engine and GDScript. I chose Godot because I had already gained experience with Unity during my university studies and wanted to explore a different game development ecosystem.

Planned features include turn-based tactical combat on grid-based maps, character progression, a story-driven campaign, retro pixel-art presentation, and terrain-based strategy systems.`,
        category: 'Game Development',
        technologies: ['Godot', 'GDScript'],
        githubUrl: '',
        deployedUrl: '',
        image: '/Chronicles_Of_Valor.png',
        date: '2024',
        underConstruction: true,
    },
];

export function findProjectBySlug(slug) {
    return projects.find((project) => project.id === slug || project.aliases?.includes(slug));
}
