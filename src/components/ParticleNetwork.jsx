import React, { useEffect, useRef, useState } from 'react';

const ParticleNetwork = () => {
    const canvasRef = useRef(null);
    const [allParticlesCaught, setAllParticlesCaught] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let confetti = [];
        let mouse = { x: null, y: null, radius: 150 };
        let releaseTimeout = null;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse position
        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Mouse leave handler
        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };
        window.addEventListener('mouseleave', handleMouseLeave);

        class Confetti {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.width = Math.random() * 10 + 5;
                this.height = Math.random() * 10 + 5;
                this.speed = Math.random() * 3 + 2;
                this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
                this.angle = Math.random() * 360;
                this.spin = Math.random() * 8 - 4;
            }

            update() {
                this.y += this.speed;
                this.angle += this.spin;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.angle * Math.PI) / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
                ctx.restore();
            }
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = 2;
                this.isCaught = false;
            }

            update() {
                // Normal movement
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = dx / distance;
                        const directionY = dy / distance;
                        
                        this.x += directionX * force * 2;
                        this.y += directionY * force * 2;

                        // Mark as caught if very close to mouse
                        if (distance < 30) {
                            this.isCaught = true;
                        }
                    }
                }

                // Bounce off walls
                if (this.x < 0 || this.x > canvas.width) {
                    this.vx = -this.vx;
                    this.baseX = this.x;
                }
                if (this.y < 0 || this.y > canvas.height) {
                    this.vy = -this.vy;
                    this.baseY = this.y;
                }

                this.baseX += this.vx;
                this.baseY += this.vy;
            }

            release() {
                this.isCaught = false;
                // Calculate direction away from mouse position
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const directionX = dx / distance;
                const directionY = dy / distance;
                
                // Reduced velocity multipliers for gentler dispersal
                this.vx = directionX * (Math.random() * 1 + 2); // Changed from (Math.random() * 2 + 4)
                this.vy = directionY * (Math.random() * 1 + 2); // Changed from (Math.random() * 2 + 4)
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fill();
            }
        }

        const checkAllParticlesCaught = () => {
            const allCaught = particles.every(p => p.isCaught);
            if (allCaught && !allParticlesCaught) {
                setAllParticlesCaught(true);
                
                // Create and start confetti immediately
                confetti = Array.from({ length: 100 }, () => new Confetti());
                
                // Release particles immediately with explosion effect
                particles.forEach(p => p.release());
                
                // Reset catch state after a delay
                releaseTimeout = setTimeout(() => {
                    setAllParticlesCaught(false);
                }, 2000);
            }
        };

        // Create particles
        const createParticles = () => {
            const particleCount = Math.min(100, (canvas.width * canvas.height) / 20000);
            particles = Array.from({ length: particleCount }, () => new Particle());
        };
        createParticles();

        // Draw lines between nearby particles
        const drawLines = () => {
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                        ctx.stroke();
                    }
                });
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            drawLines();

            // Update and draw confetti
            confetti = confetti.filter(c => c.y < canvas.height);
            confetti.forEach(c => {
                c.update();
                c.draw();
            });

            checkAllParticlesCaught();
            
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            if (releaseTimeout) clearTimeout(releaseTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
            style={{ background: '#171a19' }}
        />
    );
};

export default ParticleNetwork;