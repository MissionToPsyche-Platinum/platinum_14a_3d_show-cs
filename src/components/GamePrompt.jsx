import '../styles/PsycheGame.css'

export default function GamePrompt({ onPlay, onDismiss }) {
    return (
        <div className="gp-overlay">
            <div className="gp-card">
                <span className="gp-icon">⬡</span>
                <h2 className="gp-title">Secret Transmission</h2>
                <p className="gp-body">
                    A signal from the asteroid belt…<br />
                    Psyche awaits, commander.
                </p>
                <div className="gp-actions">
                    <button className="gp-play" onClick={onPlay}>LAUNCH</button>
                    <button className="gp-dismiss" onClick={onDismiss}>ABORT</button>
                </div>
            </div>
        </div>
    )
}
