import { useState, useEffect, useRef } from 'react'

const BASE_SPEED = 120 // px/s (1x)

export default function AutoScroll({ showFooter }) {
    const [isScrolling, setIsScrolling] = useState(false)
    const [speed, setSpeed] = useState(1)
    const [isLooping, setIsLooping] = useState(false) // State to track the loop toggle

    const rafRef = useRef(null)
    const lastTimeRef = useRef(null)
    const isScrollingRef = useRef(false)
    const speedRef = useRef(1)
    const isLoopingRef = useRef(false)
    const isDelayingRef = useRef(false) // Tracks if we are currently waiting to jump back up

    useEffect(() => { isScrollingRef.current = isScrolling }, [isScrolling])
    useEffect(() => { speedRef.current = speed }, [speed])
    useEffect(() => { isLoopingRef.current = isLooping }, [isLooping])

    useEffect(() => {
        if (!isScrolling) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            lastTimeRef.current = null
            isDelayingRef.current = false // Reset delay state if user pauses
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

            // Check if we hit the bottom (with a 1px buffer)
            if (window.scrollY >= maxScroll - 1) {
                if (isLoopingRef.current) {
                    // If looping is ON and we aren't already waiting...
                    if (!isDelayingRef.current) {
                        isDelayingRef.current = true

                        // Wait 1.5 seconds before jumping back up
                        setTimeout(() => {
                            // Check if the user didn't pause while we were waiting
                            if (isScrollingRef.current) {
                                window.scrollTo(0, 0)
                                lastTimeRef.current = null // Reset delta timer
                                isDelayingRef.current = false // Resume normal scrolling
                            }
                        }, 8000)
                    }
                } else {
                    // If looping is OFF, just stop auto-scrolling
                    setIsScrolling(false)
                    return
                }
            } else if (!isDelayingRef.current) {
                // Scroll normally as long as we aren't in the delay phase
                window.scrollBy(0, BASE_SPEED * speedRef.current * delta)
            }

            rafRef.current = requestAnimationFrame(scroll)
        }

        rafRef.current = requestAnimationFrame(scroll)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [isScrolling])

    return (
        <div className={`autoscroll-group${showFooter ? ' autoscroll-group--footer-up' : ''}`}>
            <button
                className={`autoscroll-btn${isScrolling ? ' autoscroll-btn--active' : ''}`}
                onClick={() => setIsScrolling(prev => !prev)}
                aria-label={isScrolling ? 'Pause auto scroll' : 'Start auto scroll'}
            >
                <span className="autoscroll-icon">{isScrolling ? '❚❚' : '▶'}</span>
                <span className="autoscroll-label">{isScrolling ? 'PAUSE' : 'AUTO SCROLL'}</span>
            </button>

            {/* Show controls only when scrolling is active */}
            {isScrolling && (
                <>
                    <button
                        className={`autoscroll-speed${speed === 0.5 ? ' autoscroll-speed--active' : ''}`}
                        onClick={() => setSpeed(s => s === 0.5 ? 1 : 0.5)}
                        aria-label="0.5x speed"
                    >
                        .5×
                    </button>

                    <button
                        className={`autoscroll-speed${speed === 2 ? ' autoscroll-speed--active' : ''}`}
                        onClick={() => setSpeed(s => s === 2 ? 1 : 2)}
                        aria-label="2x speed"
                    >
                        2×
                    </button>

                    {/* The new Loop Toggle Button */}
                    <button
                        className={`autoscroll-loop${isLooping ? ' autoscroll-loop--active' : ''}`}
                        onClick={() => setIsLooping(l => !l)}
                        aria-label={isLooping ? 'Disable Loop' : 'Enable Loop'}
                        title="Loop back to top"
                    >
                        ∞
                    </button>
                </>
            )}
        </div>
    )
}