import { useState, useEffect } from 'react'

export default function SplashScreen({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50){
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
    <div style={{
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
      <div style={{
        position: 'absolute', top: '32px', left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2,
      }}>
        <p style={{
          color: '#aaaacc', fontSize: '11px', letterSpacing: '5px',
          textTransform: 'uppercase', margin: '0 0 6px 0', opacity: 0.8,
        }}>
          NASA PRESENTS
        </p>
        <h1 style={{
          color: '#ffffff', fontSize: 'clamp(22px, 3vw, 38px)',
          fontWeight: 700, letterSpacing: '6px', textTransform: 'uppercase',
          margin: '0 0 10px 0', textShadow: '0 0 30px rgba(249,157,6,0.5)',
          whiteSpace: 'nowrap',
        }}>
          Mission to Psyche
        </h1>
        <div style={{
          width: '100%', maxWidth: '520px', height: '1px',
          background: 'linear-gradient(to right, transparent, #F99D06, transparent)',
        }} />
      </div>

      {/* LEFT: Instructions */}
      <div style={{
        position: 'absolute', left: '32px', top: '50%', transform: 'translateY(-50%)',
        width: '220px', zIndex: 2,
        background: 'rgba(10,10,20,0.75)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: '2px solid #F99D06',
        borderRadius: '6px',
        padding: '20px 16px',
        backdropFilter: 'blur(8px)',
      }}>
        <p style={{
          color: '#F99D06', fontSize: '9px', letterSpacing: '3px',
          textTransform: 'uppercase', margin: '0 0 14px 0', fontWeight: 700,
        }}>
          How to Navigate
        </p>
        {[
          { icon: '↕', text: 'Scroll to move through the mission timeline' },
          { icon: '◎', text: 'Hover over planets to see details' },
          { icon: '▶', text: 'Use Auto Scroll to sit back and enjoy' },
          { icon: '●', text: 'Use the progress bar on the left to jump to any scene' },
        ].map(({ icon, text }, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: '#F99D06', fontSize: '14px', lineHeight: 1.4, flexShrink: 0 }}>{icon}</span>
            <p style={{ color: '#cccccc', fontSize: '11px', lineHeight: 1.5, margin: 0, letterSpacing: '0.3px' }}>{text}</p>
          </div>
        ))}
      </div>

      {/* CENTER: Empty — Psyche 3D model shows through from scene behind */}
      <div style={{ zIndex: 2, width: '240px', height: '240px' }} />

      {/* RIGHT: Logos, Mission Summary */}
      <div style={{
        position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)',
        width: '230px', zIndex: 2,
        display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center',
      }}>

        {/* Logos */}
        <div style={{
          display: 'flex', gap: '12px', alignItems: 'center',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <img
            src="/images/nasa-logo.jpg"
            onError={(e) => { e.target.style.display = 'none' }}
            alt="NASA"
            style={{ height: '44px', objectFit: 'contain' }}
          />
          <img
            src="/images/asu-logo.png"
            onError={(e) => { e.target.style.display = 'none' }}
            alt="Arizona State University"
            style={{ height: '44px', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(255,165,0,0.4))' }}
          />
          <img
            src="/images/psyche-logo.png"
            onError={(e) => { e.target.style.display = 'none' }}
            alt="Psyche Mission"
            style={{ height: '44px', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(249,157,6,0.4))' }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }} />

        {/* Mission Summary */}
        <div style={{
          background: 'rgba(10,10,20,0.75)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderLeft: '2px solid #F99D06',
          borderRadius: '6px', padding: '14px 16px', width: '100%',
          backdropFilter: 'blur(8px)',
        }}>
          <p style={{
            color: '#F99D06', fontSize: '9px', letterSpacing: '3px',
            textTransform: 'uppercase', margin: '0 0 8px 0', fontWeight: 700,
          }}>
            About This Mission
          </p>
          <p style={{
            color: '#cccccc', fontSize: '11px', lineHeight: 1.7,
            margin: 0, letterSpacing: '0.3px',
          }}>
            In the asteroid belt between Mars and Jupiter lies{' '}
            <b style={{ color: '#ffffff' }}>16 Psyche</b> — a metal-rich world
            that may be the exposed core of an early planet. Launched in
            October 2023, NASA's Psyche spacecraft will travel six years to
            reach it, study it from four orbits, and help us understand how
            rocky planets like Earth are formed.
          </p>
        </div>
      </div>

      {/* BOTTOM: Scroll to begin */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        zIndex: 2,
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '3px',
          textTransform: 'uppercase', margin: 0,
          animation: 'fadePulse 2s ease-in-out infinite',
        }}>
          Scroll to Begin
        </p>
        <div style={{
          width: '1px', height: '30px',
          background: 'linear-gradient(to bottom, #F99D06, transparent)',
          animation: 'fadePulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes fadePulse {
          0%, 100% { opacity: 0.4 }
          50% { opacity: 1 }
        }
      `}</style>

    </div>
  )
}