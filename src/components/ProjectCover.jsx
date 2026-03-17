/* eslint-disable react/prop-types */

const coverThemes = {
    amber: {
        background: 'linear-gradient(135deg, #111827 0%, #3b2f14 55%, #f59e0b 100%)',
        accent: '#fbbf24',
        accentSoft: 'rgba(251, 191, 36, 0.18)',
    },
    emerald: {
        background: 'linear-gradient(135deg, #052e16 0%, #0f3d2e 55%, #34d399 100%)',
        accent: '#6ee7b7',
        accentSoft: 'rgba(110, 231, 183, 0.18)',
    },
    indigo: {
        background: 'linear-gradient(135deg, #172554 0%, #312e81 55%, #818cf8 100%)',
        accent: '#a5b4fc',
        accentSoft: 'rgba(165, 180, 252, 0.2)',
    },
    rose: {
        background: 'linear-gradient(135deg, #3f0f1d 0%, #4c1d95 45%, #fb7185 100%)',
        accent: '#fda4af',
        accentSoft: 'rgba(253, 164, 175, 0.18)',
    },
    teal: {
        background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 55%, #2dd4bf 100%)',
        accent: '#99f6e4',
        accentSoft: 'rgba(153, 246, 228, 0.18)',
    },
    violet: {
        background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #c084fc 100%)',
        accent: '#ddd6fe',
        accentSoft: 'rgba(221, 214, 254, 0.18)',
    },
};

const baseTheme = {
    background: 'linear-gradient(135deg, #111827 0%, #1f2937 55%, #4b5563 100%)',
    accent: '#f3f4f6',
    accentSoft: 'rgba(243, 244, 246, 0.14)',
};

function ProjectCover({ project, className = '', detail = false }) {
    if (project.image) {
        return (
            <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover ${className}`.trim()}
            />
        );
    }

    const theme = coverThemes[project.coverTheme] ?? baseTheme;

    return (
        <div
            className={`relative overflow-hidden ${className}`.trim()}
            style={{ background: theme.background }}
        >
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
                    backgroundSize: detail ? '72px 72px' : '56px 56px',
                }}
            />
            <div
                className="absolute -top-10 -right-10 rounded-full blur-2xl"
                style={{
                    width: detail ? '16rem' : '10rem',
                    height: detail ? '16rem' : '10rem',
                    backgroundColor: theme.accentSoft,
                }}
            />
            <div
                className="absolute -bottom-8 left-8 rounded-full blur-xl"
                style={{
                    width: detail ? '12rem' : '7rem',
                    height: detail ? '12rem' : '7rem',
                    backgroundColor: theme.accentSoft,
                }}
            />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div>
                    <span
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]"
                        style={{
                            color: theme.accent,
                            border: `1px solid ${theme.accentSoft}`,
                            backgroundColor: 'rgba(15, 23, 42, 0.28)',
                        }}
                    >
                        {project.category}
                    </span>
                </div>
                <div className="max-w-xl">
                    <p
                        className={`font-semibold uppercase tracking-[0.3em] ${
                            detail ? 'text-sm mb-3' : 'text-xs mb-2'
                        }`}
                        style={{ color: theme.accent }}
                    >
                        {project.date}
                    </p>
                    <h2 className={`${detail ? 'text-3xl md:text-5xl' : 'text-2xl'} font-bold text-white`}>
                        {project.title}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default ProjectCover;
