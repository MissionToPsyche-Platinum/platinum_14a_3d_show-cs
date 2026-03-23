import { useState, useEffect } from 'react'
import '../styles/Overlay.css'
import CardOverlay from './CardOverlay.jsx'
import AutoScroll from './AutoScroll.jsx'

// Overlay configs
import { card1 } from '../configs/cards/card1.config.js'

export default function Overlay() {
    // State to track if the user has reached the bottom of the page
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const bodyHeight = document.documentElement.scrollHeight;

            // Trigger the footer to show when the user is within 50 pixels of the bottom
            if (bodyHeight > windowHeight && Math.ceil(scrollPosition + windowHeight) >= bodyHeight - 50) {
                setShowFooter(true);
            } else {
                setShowFooter(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on initial load

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='overlay'>
            <AutoScroll />

            <CardOverlay config={card1}>
                <section className="overlay-right">
                    <h1>Scene 1</h1>
                    <p>Mission to a metal asteroid.</p>
                </section>
            </CardOverlay>

            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '25px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '50px',
                background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,0) 100%)',
                backdropFilter: 'blur(2px)',
                zIndex: 999,
                opacity: showFooter ? 1 : 0,
                transform: showFooter ? 'translateY(0)' : 'translateY(100%)',
                transition: 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                pointerEvents: showFooter ? 'auto' : 'none'
            }}>
                <p style={{
                    color: '#ffffff',
                    fontFamily: 'sans-serif',
                    fontSize: '13px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    margin: 0,
                    fontWeight: '600',
                    textShadow: '0 0 10px rgba(255,255,255,0.3)'
                }}>
                    PSYCHE / JOURNEY TO A METAL WORLD
                </p>

                <div style={{ display: 'flex', gap: '20px' }}>
                    {[
                        { name: 'facebook', url: 'https://www.facebook.com/MissionToPsyche' },
                        { name: 'twitter', url: 'https://x.com/MissionToPsyche' },
                        { name: 'instagram', url: 'https://www.instagram.com/missiontopsyche/' },
                        { name: 'youtube', url: 'https://www.youtube.com/channel/UC2BGcbPW8mxryXnjQcBqk6A' }
                    ].map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                opacity: 0.6,
                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = 1;
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = 0.6;
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <img
                                src={`/images/socials/${social.name}.svg`}
                                alt={social.name}
                                style={{ width: '28px', height: '28px' }}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}