import { useRef, useEffect } from 'react'
import SplashController from './SplashController'

export default function SplashScreen({ config = {} }) {
    const divRef = useRef(null)
    const controller = useRef(null)

    useEffect(() => {
        if (!controller.current && divRef.current) {
            controller.current = new SplashController(
                divRef.current,
                config
            )
        }
    })

    return (
        <div ref={divRef}>
            <div className="splash-container">

                {/* TOP: Title */}
                <div className="splash-title">
                    <p>NASA PRESENTS</p>
                    <h1>Mission to Psyche</h1>
                    <div className="splash-title-line" />
                </div>

                {/* MIDDLE CONTENT: Wrapper for side cards and center area */}
                <div className="splash-content">

                    {/* LEFT: Instructions */}
                    <div className="splash-instructions-card splash-card">
                        <p className="splash-card-header">How to Navigate</p>
                        <div className="instructions-list">
                            {[
                            { icon: '↕', text: 'Scroll to move through the mission timeline' },
                            { icon: '◎', text: 'Hover over planets to see details' },
                            { icon: '▶', text: 'Use Auto Scroll to sit back and enjoy' },
                            { icon: '●', text: 'Use the progress bar on the left to jump to any scene' },
                            ].map(({ icon, text }, i) => (
                            <div key={i} className="instruction-item">
                                <span>{icon}</span>
                                <p>{text}</p>
                            </div>
                            ))}
                        </div>
                    </div>

                    {/* CENTER: Flexible Space */}
                    <div className="splash-center-spacer" />

                    {/* CENTER: Empty — Psyche 3D model shows through from scene behind */}
                    <div style={{ zIndex: 2, width: '240px', height: '240px' }} />

                    {/* CENTER: Flexible Space */}
                    <div className="splash-center-spacer" />

                    {/* RIGHT: Logos, Mission Summary */}
                    <div className="splash-summary-container splash-card">

                        {/* Logos */}
                        <div className="splash-logos-container">
                            <img src={`${import.meta.env.BASE_URL}images/nasa-logo.jpg`} onError={(e) => { e.target.style.display = 'none' }} alt="NASA" />
                            <img src={`${import.meta.env.BASE_URL}images/asu-logo.png`} onError={(e) => { e.target.style.display = 'none' }} alt="ASU" style={{ filter: 'drop-shadow(0 0 6px rgba(255,165,0,0.4))' }} />
                            <img src={`${import.meta.env.BASE_URL}images/psyche-logo.png`} onError={(e) => { e.target.style.display = 'none' }} alt="Psyche" style={{ filter: 'drop-shadow(0 0 6px rgba(249,157,6,0.4))' }} />
                        </div>

                        {/* Divider */}
                        <div className="splash-divider" />

                        {/* Mission Summary */}
                        <div className="splash-summary-block">
                            <p className="splash-card-header">About This Mission</p>
                            <p className="splash-summary-text">
                            In the asteroid belt between Mars and Jupiter lies{' '}
                            <b>16 Psyche</b> — a metal-rich world
                            that may be the exposed core of an early planet. Launched in
                            October 2023, NASA's Psyche spacecraft will travel six years to
                            reach it, study it from four orbits, and help us understand how
                            rocky planets like Earth are formed.
                            </p>
                        </div>
                    </div>

                </div>

                {/* BOTTOM: Scroll to begin */}
                <div className="splash-scroll-indicator">
                    <p>Scroll to Begin</p>
                    <div className="splash-scroll-line" />
                </div>
            </div>
        </div>
    )
}