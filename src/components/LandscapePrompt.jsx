import { useState, useEffect } from 'react';

export default function LandscapePrompt() {
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            const isPortraitMode = window.innerHeight > window.innerWidth;
            const isMobile = window.innerWidth <= 850 || window.innerHeight <= 850;

            if (isPortraitMode && isMobile) {
                setIsPortrait(true);
            } else {
                setIsPortrait(false);
            }
        };

        checkOrientation();

        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (!isPortrait) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
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
            textAlign: 'center'
        }}>
            {/* Inline CSS animation for the phone icon */}
            <style>
                {`
                @keyframes spinPhone {
                    0% { transform: rotate(0deg); }
                    20% { transform: rotate(0deg); }
                    50% { transform: rotate(-90deg); }
                    70% { transform: rotate(-90deg); }
                    100% { transform: rotate(0deg); }
                }
                `}
            </style>

            {/* Animated SVG Phone Icon */}
            <div style={{ marginBottom: '30px', animation: 'spinPhone 2.5s infinite ease-in-out' }}>
                <svg width="60" height="100" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Phone Body */}
                    <rect x="2" y="2" width="56" height="96" rx="8" stroke="rgba(255,255,255,0.8)" strokeWidth="4" />
                    {/* Phone Screen line/button indicator */}
                    <path d="M20 90H40" stroke="rgba(255,255,255,0.8)" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>

            <h2 style={{
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontSize: '20px',
                marginBottom: '15px',
                fontWeight: '600'
            }}>
                Rotate Device
            </h2>
            <p style={{
                color: '#aaaaaa',
                fontSize: '14px',
                lineHeight: '1.6',
                maxWidth: '80%',
                letterSpacing: '0.5px'
            }}>
                The Mission to Psyche 3D experience is designed for landscape viewing. Please turn your phone horizontally.
            </p>
        </div>
    );
}