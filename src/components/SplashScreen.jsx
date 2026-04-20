import { useState, useEffect } from 'react'

export default function SplashScreen({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setVisible(false)
      }
      else if (window.scrollY > 10 && !fadeOut && window.scrollY <= 50) {
        setFadeOut(true)
        setTimeout(() => {
          setVisible(false)
          if (onDone) onDone()
        }, 800)
      } else if (window.scrollY <= 10) {
        setVisible(true)
        setFadeOut(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onDone, fadeOut])

  if (!visible) return null

  return (
    <div className="splash-container" style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,5,0.85) 75%)',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 1s ease',
      pointerEvents: fadeOut ? 'none' : 'auto',
      fontFamily: 'sans-serif',
      overflow: 'hidden',
    }}>

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

      <style>{`
        @keyframes fadePulse {
          0%, 100% { opacity: 0.4 }
          50% { opacity: 1 }
        }

        /* --- STRUCTURAL LAYOUT --- */
        .splash-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          margin: clamp(10px, 3vh, 32px) 0;
          flex-shrink: 0;
        }

        .splash-title p {
          color: #aaaacc; font-size: clamp(9px, 1.5vh, 11px); letter-spacing: 5px;
          text-transform: uppercase; margin: 0 0 6px 0; opacity: 0.8;
        }

        .splash-title h1 {
          color: #ffffff; font-size: clamp(18px, 4.5vh, 38px);
          font-weight: 700; letter-spacing: clamp(3px, 1vw, 6px); text-transform: uppercase;
          margin: 0 0 10px 0; text-shadow: 0 0 30px rgba(249,157,6,0.5);
          white-space: nowrap;
        }

        .splash-title-line {
          width: 100%; max-width: 520px; height: 1px;
          background: linear-gradient(to right, transparent, #F99D06, transparent);
        }

        .splash-content {
          flex-grow: 1;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 0 2vw;
          box-sizing: border-box;
          min-height: 0; 
        }

        /* --- CARDS & CONTENT --- */
        .splash-card {
          background: rgba(10,10,20,0.75);
          border: 1px solid rgba(255,255,255,0.1);
          border-left: 2px solid #F99D06;
          border-radius: 6px;
          padding: clamp(10px, 2.5vh, 20px) clamp(12px, 2vw, 16px);
          backdrop-filter: blur(8px);
          max-width: 280px;
          flex-shrink: 1;
          overflow-y: auto; 
          max-height: 100%;
          scrollbar-width: none;
        }
        .splash-card::-webkit-scrollbar { display: none; }

        .splash-card-header {
          color: #F99D06; font-size: 9px; letter-spacing: 3px;
          text-transform: uppercase; margin: 0 0 clamp(8px, 2vh, 14px) 0; font-weight: 700;
        }

        .instructions-list {
          display: flex; flex-direction: column; gap: clamp(6px, 1.5vh, 12px);
        }

        .instruction-item {
          display: flex; gap: 10px; align-items: flex-start;
        }

        .instruction-item span {
          color: #F99D06; font-size: 14px; line-height: 1.4; flex-shrink: 0;
        }

        .instruction-item p {
          color: #cccccc; font-size: clamp(10px, 1.5vh, 11px); line-height: 1.5; margin: 0; letter-spacing: 0.3px;
        }

        .splash-center-spacer {
          flex-grow: 1; width: clamp(10px, 10vw, 240px);
        }

        .splash-summary-container {
          display: flex; flex-direction: column; gap: clamp(10px, 2vh, 14px); align-items: center;
        }

        .splash-logos-container {
          display: flex; gap: clamp(6px, 1.5vw, 12px); align-items: center; justify-content: center; flex-wrap: wrap;
        }

        .splash-logos-container img {
          height: clamp(24px, 5vh, 44px); object-fit: contain;
        }

        .splash-divider {
          width: 100%; height: 1px; background: rgba(255,255,255,0.1); flex-shrink: 0;
        }

        .splash-summary-block { width: 100%; }
        
        .splash-summary-text {
          color: #cccccc; font-size: clamp(10px, 1.5vh, 11px); line-height: 1.6;
          margin: 0; letter-spacing: 0.3px;
        }
        
        .splash-summary-text b { color: #ffffff; }

        /* --- BOTTOM INDICATOR --- */
        .splash-scroll-indicator {
          display: flex; flex-direction: column; align-items: center; gap: 10px; z-index: 2;
          margin: clamp(10px, 3vh, 32px) 0; flex-shrink: 0;
        }

        .splash-scroll-indicator p {
          color: rgba(255,255,255,0.4); font-size: clamp(8px, 1.5vh, 10px); letter-spacing: 3px;
          text-transform: uppercase; margin: 0; animation: fadePulse 2s ease-in-out infinite;
        }

        .splash-scroll-line {
          width: 1px; height: clamp(15px, 4vh, 30px);
          background: linear-gradient(to bottom, #F99D06, transparent);
          animation: fadePulse 2s ease-in-out infinite;
        }

        /* --- RESPONSIVE BREAKPOINTS --- */
        @media (max-height: 450px) {
          .splash-title { margin: 5px 0; }
          .splash-title h1 { margin: 0 0 5px 0; font-size: clamp(16px, 6vh, 24px); }
          .splash-scroll-indicator { margin: 5px 0; gap: 5px; }
          .splash-scroll-line { height: clamp(10px, 3vh, 20px); }
          
          /* Force cards narrower & increase transparency slightly */
          .splash-card {
             max-width: 210px; 
             padding: 8px 10px;
             background: rgba(10,10,20,0.6); 
          }
          
          .splash-card-header { margin: 0 0 4px 0; font-size: 8px; }
          .instruction-item { gap: 6px; }
          .instructions-list { gap: 6px; }
          .instruction-item p, .splash-summary-text { font-size: 9px; line-height: 1.35; }
          .instruction-item span { font-size: 11px; }
          .splash-logos-container img { height: 18px; }
          .splash-summary-container { gap: 8px; }
          
          .splash-center-spacer {
             min-width: 60px;
             width: clamp(60px, 15vw, 240px); 
          }
        }

        /* 2. PORTRAIT PHONES (Stacks everything vertically) */
        @media (max-width: 600px) {
          .splash-content {
            flex-direction: column;
            padding: 1vw;
            gap: 2vh;
          }
          .splash-card {
            max-width: 340px;
            width: 100%;
          }
          .splash-center-spacer {
            height: clamp(5px, 2vh, 40px);
            width: 1px;
            flex-grow: 0;
            min-width: 0;
          }
        }
      `}</style>
    </div>
  )
}