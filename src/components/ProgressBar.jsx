import { useState, useEffect, useRef } from 'react';
import '../styles/global.css';

const progressBarConfig = {
    startVH: 0,
    endVH: 10,
    scenes: [
        { name: 'Asteroid', vh: 0 },
        { name: 'Spacecraft', vh: 2.5 },
        { name: 'Journey to Mars', vh: 5 },
        { name: 'Last Leg', vh: 7.5 },
        { name: 'Psyche', vh: 9.8 },
    ]
};

export default function ProgressBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredScene, setHoveredScene] = useState(null);
    const fillLineRef = useRef(null);

    useEffect(() => {
        let ticking = false;

        const updateScroll = () => {
            const currentVH = window.scrollY / window.innerHeight;
            const { startVH, endVH, scenes } = progressBarConfig;
            const progressRange = endVH - startVH;
            const progress = Math.max(0, Math.min(1, (currentVH - startVH) / progressRange));

            if (fillLineRef.current) {
                fillLineRef.current.style.height = `${progress * 100}%`;
            }

            let currentSceneIndex = 0;
            for (let i = 0; i < scenes.length; i++) {
                if (currentVH >= scenes[i].vh - 0.1) {
                    currentSceneIndex = i;
                }
            }

            setActiveIndex((prev) => {
                if (prev !== currentSceneIndex) return currentSceneIndex;
                return prev;
            });

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        updateScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToScene = (targetVH) => {
        const targetScrollY = targetVH * window.innerHeight;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    };

    return (
        <div style={{
            position: 'fixed', top: '45%', left: '40px', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1002,
        }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <div style={{
                    position: 'absolute', top: '0', bottom: '0', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)', zIndex: -1,
                }}>
                    <div
                        ref={fillLineRef}
                        style={{
                            height: '0%', width: '100%',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)',
                        }}
                    />
                </div>

                {progressBarConfig.scenes.map((scene, index) => {
                    const isActive = index === activeIndex;
                    const isPassed = index <= activeIndex;
                    const isLast = index === progressBarConfig.scenes.length - 1;
                    const isHovered = hoveredScene === scene.name;

                    return (
                        <div
                            key={scene.name}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                                marginBottom: isLast ? 0 : '70px', cursor: 'pointer', position: 'relative',
                            }}
                            onClick={() => scrollToScene(scene.vh)}
                            onMouseEnter={() => setHoveredScene(scene.name)}
                            onMouseLeave={() => setHoveredScene(null)}
                        >
                            <div
                                className={isActive ? 'pulse-animation' : ''}
                                style={{
                                    width: isPassed || isHovered ? '10px' : '6px', height: isPassed || isHovered ? '10px' : '6px',
                                    borderRadius: '50%', border: isPassed || isHovered ? '2px solid white' : '1px solid rgba(255,255,255,0.4)',
                                    backgroundColor: isPassed ? 'white' : '#000000', transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                }} />

                            <div style={{
                                position: 'absolute', left: '25px', color: isPassed || isHovered ? '#ffffff' : '#aaaaaa',
                                fontFamily: 'sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px',
                                fontWeight: isActive ? '600' : '400', opacity: isPassed || isHovered ? 1 : 0.3,
                                transition: 'all 0.3s ease', whiteSpace: 'nowrap', pointerEvents: 'none',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.8)', textAlign: 'left'
                            }}>
                                {scene.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}