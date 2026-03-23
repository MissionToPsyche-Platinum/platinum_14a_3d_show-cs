import { useState, useEffect, useRef } from 'react'

const SCROLL_SPEED = 120 // px/s

export default function AutoScroll() {
    const [isScrolling, setIsScrolling] = useState(false)
    const rafRef = useRef(null)
    const lastTimeRef = useRef(null)
    const isScrollingRef = useRef(false)

    // Keep ref in sync with state so rAF loop sees current value
    useEffect(() => {
        isScrollingRef.current = isScrolling
    }, [isScrolling])

    useEffect(() => {
        if (!isScrolling) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            lastTimeRef.current = null
            return
        }

        const scroll = (timestamp) => {
            if (!isScrollingRef.current) return

            if (lastTimeRef.current === null) {
                lastTimeRef.current = timestamp
            }

            const delta = (timestamp - lastTimeRef.current) / 1000
            lastTimeRef.current = timestamp

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            if (window.scrollY >= maxScroll) {
                setIsScrolling(false)
                return
            }

            window.scrollBy(0, SCROLL_SPEED * delta)
            rafRef.current = requestAnimationFrame(scroll)
        }

        rafRef.current = requestAnimationFrame(scroll)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [isScrolling])

    return (
        <button
            className={`autoscroll-btn${isScrolling ? ' autoscroll-btn--active' : ''}`}
            onClick={() => setIsScrolling(prev => !prev)}
            aria-label={isScrolling ? 'Pause auto scroll' : 'Start auto scroll'}
        >
            <span className="autoscroll-icon">{isScrolling ? '❚❚' : '▶'}</span>
            <span className="autoscroll-label">{isScrolling ? 'PAUSE' : 'AUTO SCROLL'}</span>
        </button>
    )
}
