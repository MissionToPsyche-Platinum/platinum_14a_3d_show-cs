import '../styles/Overlay.css'
import CardOverlay from './CardOverlay.jsx'

// Configs

export default function Overlay() {
    return (
        <div className='overlay'>
            <section className="overlay-right">
                <h1>Scene 1</h1>
                <p>Mission to a metal asteroid.</p>
            </section>
            <section className="overlay-left">
                <h1>Scene 2</h1>
                <p>Mission to a metal asteroid.</p>
            </section>
            <section className="overlay-right">
                <h1>Scene 3</h1>
                <p>Mission to a metal asteroid.</p>
            </section>
            <section className="overlay-right">
                <h1>Scene 4</h1>
                <p>Mission to a metal asteroid.</p>
            </section>
            <section className="overlay-left">
                <h1>Scene 5</h1>
                <p>Mission to a metal asteroid.</p>
            </section>
        </div>
    )
}