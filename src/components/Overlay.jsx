import '../styles/Overlay.css'
import CardOverlay from './CardOverlay.jsx'
import AutoScroll from './AutoScroll.jsx'

// Overlay configs
import { card1 } from '../configs/cards/card1.config.js'

export default function Overlay() {
    return (
        <div className='overlay'>
            <CardOverlay config={card1}>
                <section className="overlay-right">
                    <h1>Scene 1</h1>
                    <p>Mission to a metal asteroid.</p>
                </section>
            </CardOverlay>
            
            {/* <section className="overlay-left">
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
            </section> */}

            <AutoScroll />

            <div className="footer">
                <p>PSYCHE / JOURNEY TO A METAL WORLD</p>
                <div className="socials">
                    <a href="https://www.facebook.com/MissionToPsyche" target="_blank" rel="noopener noreferrer">
                        <img src="/images/socials/facebook.svg"></img>
                    </a>

                    <a href="https://x.com/MissionToPsyche" target="_blank" rel="noopener noreferrer">
                        <img src="/images/socials/twitter.svg"></img>
                    </a>

                    <a href="https://www.instagram.com/missiontopsyche/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/socials/instagram.svg"></img>
                    </a>

                    <a href="https://www.youtube.com/channel/UC2BGcbPW8mxryXnjQcBqk6A" target="_blank" rel="noopener noreferrer">
                        <img src="/images/socials/youtube.svg"></img>
                    </a>
                </div>
            </div>
        </div>
    )
}