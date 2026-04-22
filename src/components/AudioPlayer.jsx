import { useRef, useState } from 'react'

export default function AudioPlayer() {
    const audioRef = useRef(null)
    const [isMuted, setIsMuted] = useState(true)

    const toggle = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isMuted) {
            audio.muted = false
            audio.play()
        } else {
            audio.muted = true
        }
        setIsMuted(m => !m)
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={`${import.meta.env.BASE_URL}music/Journey_IsaacWisdom_MP3file.mp3`}
                loop
                muted
            />
            <button
                className={`audio-btn${!isMuted ? ' audio-btn--active' : ''}`}
                onClick={toggle}
                aria-label={isMuted ? 'Unmute music' : 'Mute music'}
                title={isMuted ? 'Unmute music' : 'Mute music'}
            >
                {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/>
                        <line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                )}
            </button>
        </>
    )
}
