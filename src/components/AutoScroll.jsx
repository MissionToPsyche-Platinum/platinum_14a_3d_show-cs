import { useState, useEffect, useRef } from 'react'

const BASE_SPEED = 120

export default function AutoScroll({ conclusion }) {
    const [isScrolling, setIsScrolling] = useState(false)
    const [speed, setSpeed] = useState(1)

    const rafRef = useRef(null)
    const lastTimeRef = useRef(null)
    const isScrollingRef = useRef(false)
    const speedRef = useRef(1)

    useEffect(() => { isScrollingRef.current = isScrolling }, [isScrolling])
    useEffect(() => { speedRef.current = speed }, [speed])

    useEffect(() => {
        if (!isScrolling) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            lastTimeRef.current = null
            return
        }

        const scroll = (timestamp) => {
            if (!isScrollingRef.current) return
            if (lastTimeRef.current === null) lastTimeRef.current = timestamp
            const delta = (timestamp - lastTimeRef.current) / 1000
            lastTimeRef.current = timestamp
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            if (window.scrollY >= maxScroll) { setIsScrolling(false); return }
            window.scrollBy(0, BASE_SPEED * speedRef.current * delta)
            rafRef.current = requestAnimationFrame(scroll)
        }

        rafRef.current = requestAnimationFrame(scroll)
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    }, [isScrolling])

    // when conclusion is active, float to top-right clear of the card's content
    const groupStyle = conclusion ? {
        bottom: 'auto',
        top: '1.25rem',
        left: 'auto',
        right: '2rem',
        transform: 'none',
    } : {}

    return (
        <div className="autoscroll-group" style={groupStyle}>
            <button
                className={`autoscroll-btn${isScrolling ? ' autoscroll-btn--active' : ''}`}
                onClick={() => setIsScrolling(prev => !prev)}
                aria-label={isScrolling ? 'Pause auto scroll' : 'Start auto scroll'}
            >
                <span className="autoscroll-icon">{isScrolling ? '❚❚' : '▶'}</span>
                <span className="autoscroll-label">{isScrolling ? 'PAUSE' : 'AUTO SCROLL'}</span>
            </button>
            {isScrolling && (
                <button
                    className={`autoscroll-speed${speed === 2 ? ' autoscroll-speed--active' : ''}`}
                    onClick={() => setSpeed(s => s === 1 ? 2 : 1)}
                    aria-label={speed === 2 ? 'Switch to 1x speed' : 'Switch to 2x speed'}
                >
                    2×
                </button>
            )}
        </div>
    )
}