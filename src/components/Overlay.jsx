import '../styles/Overlay.css'
import CardOverlay from './CardOverlay.jsx'

// Overlay configs
import { card1 } from '../configs/cards/card1.config.js'
import { card2 } from '../configs/cards/card2.config.js'
import { card3 } from '../configs/cards/card3.config.js'
import { card4 } from '../configs/cards/card4.config.js'
import { card5 } from '../configs/cards/card5.config.js'

export default function Overlay() {
    return (
        <div className='overlay'>
            <CardOverlay config={card1}>
                <section className="overlay-right">
                    <h1>The Big Picture</h1>
                    <div>
                        <p>
                            If you take a look between Mars and Jupiter, you will see a region that is filled with millions of rocky objects orbiting the Sun. This area is known as the <b>“Main Asteroid Belt”</b>. It stretches for about 140 million miles across, which is about one and a half times the distance from Earth to the sun. Early in the history of our solar system, these materials could have formed another planet. However, Jupiter’s strong gravity kept them from coming together so instead of being a planet, they remained separate and continued orbiting the Sun as individual asteroids.
                        </p>
                         <p>
                            Among these millions of objects, 16 Psyche is especially important. 16 Psyche was discovered in 1852 and was the sixteenth asteroid ever found which is where the number 16 in the name comes from. Another fun fact is that this asteroid was named after the Greek goddess of the soul.
                         </p>
                         <p>
                            Psyche is large compared to most asteroids. It measures about <b>279 kilometers</b> (173 miles) long, <b>232 kilometers</b> (144 miles) wide and <b>189 kilometers</b> (117 miles) tall. Its surface area is about <b>64,000 square miles</b>, similar to the distance between Phoenix and Flagstaff. With an estimated mass of about 23 times 10 to 18 kilograms, Psyche is known to be the <b>10th largest</b> known asteroid and it makes up about 1% of the total mass of the entire Main Asteroid Belt.
                         </p>
                         <p>
                            Unlike most asteroids that are mainly made of rock or ice, Psyche is <b>rich in metal</b>. Scientists think that it may be the exposed core of an early building block of a planet. By studying Psyche, researchers hope to learn more about how planets formed and to better understand the metal cores deep inside planets like Earth.
                        </p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card2}>
                <section className="overlay-right">
                    <h1>Scene 2</h1>
                    <p>Mission to a metal asteroid.</p>
                </section>
            </CardOverlay>

            <CardOverlay config={card3}>
                <section className="overlay-right">
                    <h1>Scene 3</h1>
                    <p>Mission to a metal asteroid.</p>
                </section>
            </CardOverlay>

            <CardOverlay config={card4}>
                <section className="overlay-right">
                    <h1>Scene 4</h1>
                    <p>Mission to a metal asteroid.</p>
                </section>
            </CardOverlay>

            <CardOverlay config={card5}>
                <section className="overlay-right">
                    <h1>Scene 5</h1>
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