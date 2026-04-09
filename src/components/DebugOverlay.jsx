import { useState, useEffect } from 'react'

export default function DebugOverlay() {
    const [enabled, setEnabled] = useState(false)
    const [hover, setHover] = useState(null)

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === '`') setEnabled(v => !v)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    useEffect(() => {
        const onHover = (e) => setHover(e.detail.show ? e.detail : null)
        window.addEventListener('planetHover', onHover)
        return () => window.removeEventListener('planetHover', onHover)
    }, [])

    if (!enabled) return null

    const fmt = (n) => n?.toFixed(3) ?? '—'

    return (
        <div style={{
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 9999,
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#00ff88',
            background: 'rgba(0,0,0,0.75)',
            border: '1px solid rgba(0,255,136,0.3)',
            borderRadius: '4px',
            padding: '8px 12px',
            pointerEvents: 'none',
            lineHeight: '1.7',
        }}>
            <div style={{ color: '#00ff88', letterSpacing: '2px', marginBottom: '4px', fontSize: '9px' }}>
                DEBUG MODE — ` to toggle
            </div>
            {hover ? (
                <>
                    <div><span style={{ color: '#888' }}>name </span>{hover.name}</div>
                    <div><span style={{ color: '#888' }}>x    </span>{fmt(hover.worldPos?.x)}</div>
                    <div><span style={{ color: '#888' }}>y    </span>{fmt(hover.worldPos?.y)}</div>
                    <div><span style={{ color: '#888' }}>z    </span>{fmt(hover.worldPos?.z)}</div>
                </>
            ) : (
                <div style={{ color: '#555' }}>hover a planet icon</div>
            )}
        </div>
    )
}
