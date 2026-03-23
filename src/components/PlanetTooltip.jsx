import { useState, useEffect } from 'react'

const Row = ({ label, value, color }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '24px',
        padding: '5px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
        <span style={{
            color: '#777',
            fontSize: '9px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            fontWeight: 500,
        }}>
            {label}
        </span>
        <span style={{
            color: color || '#e8e8e8',
            fontSize: '11px',
            letterSpacing: '0.5px',
            fontWeight: 600,
            textAlign: 'right',
        }}>
            {value}
        </span>
    </div>
)

export default function PlanetTooltip() {
    const [data, setData] = useState({
        show: false,
        name: '',
        color: 0xffffff,
        info: null,
        x: 0,
        y: 0,
    })

    useEffect(() => {
        const handleHover = (e) => {
            setData(prev => ({ ...prev, ...e.detail }))
        }
        const handleMove = (e) => {
            setData(prev => ({ ...prev, x: e.detail.x, y: e.detail.y }))
        }

        window.addEventListener('planetHover', handleHover)
        window.addEventListener('planetHoverMove', handleMove)
        return () => {
            window.removeEventListener('planetHover', handleHover)
            window.removeEventListener('planetHoverMove', handleMove)
        }
    }, [])

    const cssColor = `#${(data.color >>> 0).toString(16).padStart(6, '0')}`
    const { info } = data

    const flipX = data.x > window.innerWidth * 0.7
    const offsetX = flipX ? -230 : 18

    return (
        <div style={{
            position: 'fixed',
            left: `${data.x + offsetX}px`,
            top: `${data.y + 18}px`,
            width: '210px',
            pointerEvents: 'none',
            zIndex: 1050,
            opacity: data.show ? 1 : 0,
            transform: data.show ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            backgroundColor: 'rgba(8, 8, 12, 0.92)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderTop: `2px solid ${cssColor}`,
            borderRadius: '6px',
            backdropFilter: 'blur(12px)',
            boxShadow: `0 12px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)`,
            fontFamily: 'sans-serif',
            overflow: 'hidden',
        }}>

            {/* Header */}
            <div style={{
                padding: '12px 14px 10px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <div style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: cssColor,
                        boxShadow: `0 0 6px ${cssColor}`,
                        flexShrink: 0,
                    }} />
                    <span style={{
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                    }}>
                        {data.name}
                    </span>
                </div>
                {info?.type && (
                    <div style={{
                        color: cssColor,
                        fontSize: '9px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginLeft: '15px',
                        opacity: 0.85,
                    }}>
                        {info.type}
                    </div>
                )}
            </div>

            {/* Stats */}
            {info && (
                <div style={{ padding: '8px 14px 4px' }}>
                    <Row label="Diameter" value={info.diameter} />
                    {info.distanceFromSun !== '—' && (
                        <Row label="Dist. from Sun" value={info.distanceFromSun} />
                    )}
                    <Row label="Orbital Period" value={info.orbitalPeriod} />
                    {info.moons !== null && (
                        <Row label="Moons" value={info.moons === 0 ? 'None' : info.moons} color={cssColor} />
                    )}
                </div>
            )}

            {/* Fact */}
            {info?.fact && (
                <div style={{
                    margin: '6px 14px 12px',
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '4px',
                    borderLeft: `2px solid ${cssColor}`,
                    color: '#aaa',
                    fontSize: '10px',
                    lineHeight: '1.5',
                    letterSpacing: '0.3px',
                }}>
                    {info.fact}
                </div>
            )}
        </div>
    )
}