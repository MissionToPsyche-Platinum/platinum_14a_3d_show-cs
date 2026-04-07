import { useState, useEffect, useRef } from 'react';

export default function LandscapePrompt() {
    const [isPortrait, setIsPortrait] = useState(false);
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const starsRef = useRef([]);

    useEffect(() => {
        const checkOrientation = () => {
            const isPortraitMode = window.innerHeight > window.innerWidth;

            const isTouchDevice =
                navigator.maxTouchPoints > 0 &&
                !window.matchMedia('(pointer: fine)').matches;

            const isTablet =
                isTouchDevice &&
                window.innerWidth <= 1400 &&
                window.innerWidth >= 600;

            const isMobile = isTouchDevice || isTablet;

            setIsPortrait(isPortraitMode && isMobile);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);
        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    useEffect(() => {
        if (!isPortrait || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const makeStars = (W, H) => Array.from({ length: 120 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.2 + 0.2,
            alpha: Math.random() * 0.5 + 0.3,
        }));

        const resize = () => {
            const W = canvas.offsetWidth;
            const H = canvas.offsetHeight;
            canvas.width = W;
            canvas.height = H;
            starsRef.current = makeStars(W, H);
        };

        const ro = new ResizeObserver(() => resize());
        ro.observe(canvas);
        resize();

        const meteors = [];
        let spawnTimer = 0;
        const SPAWN_INTERVAL = 0.9;

        const spawnMeteor = () => {
            const W = canvas.width;
            const H = canvas.height;
            const fromTop = Math.random() > 0.3;
            return {
                x: fromTop ? Math.random() * W * 1.2 - W * 0.1 : -10,
                y: fromTop ? -10 : Math.random() * H * 0.5,
                vx: Math.random() * 3 + 2.5,
                vy: Math.random() * 3 + 2.5,
                len: Math.random() * 70 + 50,
                alpha: 1,
                width: Math.random() * 1.2 + 0.6,
            };
        };

        let last = performance.now();

        const draw = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            spawnTimer += dt;

            const W = canvas.width;
            const H = canvas.height;

            ctx.clearRect(0, 0, W, H);

            starsRef.current.forEach(s => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
                ctx.fill();
            });

            if (spawnTimer >= SPAWN_INTERVAL) {
                meteors.push(spawnMeteor());
                if (Math.random() < 0.25) meteors.push(spawnMeteor());
                spawnTimer = 0;
            }

            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.alpha -= dt * 0.55;

                if (m.alpha <= 0 || m.x > W + 50 || m.y > H + 50) {
                    meteors.splice(i, 1);
                    continue;
                }

                const angle = Math.atan2(m.vy, m.vx);
                const tailX = m.x - Math.cos(angle) * m.len;
                const tailY = m.y - Math.sin(angle) * m.len;

                const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
                grad.addColorStop(0, `rgba(255,255,255,0)`);
                grad.addColorStop(0.6, `rgba(200,220,255,${m.alpha * 0.4})`);
                grad.addColorStop(1, `rgba(255,255,255,${m.alpha})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(m.x, m.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = m.width;
                ctx.lineCap = 'round';
                ctx.stroke();

                const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 4);
                glow.addColorStop(0, `rgba(255,255,255,${m.alpha * 0.9})`);
                glow.addColorStop(1, `rgba(255,255,255,0)`);
                ctx.beginPath();
                ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            ro.disconnect();
        };
    }, [isPortrait]);

    if (!isPortrait) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            backgroundColor: 'rgba(5, 5, 5, 0.98)',
            backdropFilter: 'blur(15px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            fontFamily: 'sans-serif',
            padding: '20px',
            textAlign: 'center',
            overflow: 'hidden',
        }}>
            {/* Meteor shower canvas — absolutely fills the container */}
            <canvas ref={canvasRef} style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
            }} />

            <style>{`
                @keyframes spinPhone {
                    0%   { transform: rotate(0deg); }
                    20%  { transform: rotate(0deg); }
                    50%  { transform: rotate(-90deg); }
                    70%  { transform: rotate(-90deg); }
                    100% { transform: rotate(0deg); }
                }
            `}</style>

            <div style={{
                marginBottom: '30px',
                animation: 'spinPhone 2.5s infinite ease-in-out',
                position: 'relative', zIndex: 1,
            }}>
                <svg width="60" height="100" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="56" height="96" rx="8" stroke="rgba(255,255,255,0.8)" strokeWidth="4" />
                    <path d="M20 90H40" stroke="rgba(255,255,255,0.8)" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>

            <h2 style={{
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontSize: '20px',
                marginBottom: '15px',
                fontWeight: '600',
                position: 'relative', zIndex: 1,
            }}>
                Rotate Device
            </h2>
            <p style={{
                color: '#aaaaaa',
                fontSize: '14px',
                lineHeight: '1.6',
                maxWidth: '80%',
                letterSpacing: '0.5px',
                position: 'relative', zIndex: 1,
            }}>
                The Mission to Psyche 3D experience is designed for landscape viewing. Please turn your phone horizontally.
            </p>
        </div>
    );
}