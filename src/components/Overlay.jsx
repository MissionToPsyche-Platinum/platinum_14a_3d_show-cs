import '../styles/Overlay.css'
import CardOverlay from './CardOverlay.jsx'
import AutoScroll from './AutoScroll.jsx'
import TimeOverlay from './TimeOverlay.jsx'

// Overlay configs
import { card1 } from '../configs/cards/card1.config.js'
import { card2 } from '../configs/cards/card2.config.js'
import { card3 } from '../configs/cards/card3.config.js'
import { card4 } from '../configs/cards/card4.config.js'
import { card5 } from '../configs/cards/card5.config.js'

import { timeTimeLine } from '../configs/time.config.js'


export default function Overlay() {
    return (
        <div className='overlay'>
            <AutoScroll />
            
            <TimeOverlay config={timeTimeLine}>
                <div id="timeBar">
                    <h1>Time</h1>
                </div>
            </TimeOverlay>

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
                    <h1>The Spacecraft</h1>
                    <div>
                        <p>
                            On October 13, 2023, the Psyche mission began its journey from Kennedy Space Center in Florida. The spacecraft launched aboard a SpaceX Falcon Heavy rocket. The “Heavy” version was required because the spacecraft carried a large amount of xenon propellant for its long trip to the Main Asteroid Belt. Two side boosters provided the extra power needed to overcome the Earth’s gravity. To escape Earth’s pull, rockets must reach speeds greater than 25,000 miles per hour. As fuel is used, rocket stages separate to reduce weight. The spacecraft sits at the top inside a protective fairing during launch. At liftoff, Psyche 6,056 pounds. Once in space and fully deployed, its solar panels extend outward, making it about the size of a tennis court.
                        </p>
                         <p>
                            The mission will last eight years. The spacecraft will travel for almost six years before arriving at the asteroid Psyche in August 2029. Its primary science mission will last about two years, ending in November 2031. The journey includes two major cruise phases. Cruise 1 will last about three years as the spacecraft travels from Earth towards Mars. During this phase, Mars’s gravity will adjust the spacecraft’s speed and direction without using large amounts of fuel. After May 2026, Cruise 2 begins and becomes the longest stretch of the mission. 
                         </p>
                         <p>
                            Psyche uses solar electric propulsion instead of traditional chemical engines. Sunlight powers its thrusters, which gently push the spacecraft using xenon gas. The thrust is small but very efficient, allowing long distance travel but with less fuel. When it arrives, Psyche will become the first spacecraft to orbit a metal rich asteroid, helping scientists study materials that may resemble a planetary core and better understand how rocky planets formed.
                         </p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card3}>
                <section className="overlay-right">
                    <h1>Scene 3</h1>
                    <div>
                        <p>
                            After launch, the Psyche spacecraft begins a long journey through deep space known as the cruise phase. This phase starts about 100 days after liftoff and lasts for nearly five years. During this time, the spacecraft steadily travels towards its final destination in the Main Asteroid Belt. Psyche is scheduled to arrive at Mars in May 2026 for a key part of its journey. 
                        </p>
                         <p>
                            The cruise phase is divided into three parts:
                            <ol>
                                <li>Cruise 1</li>
                                <li>Mars gravity assist</li>
                                <li>Cruise 2 </li>
                            </ol>
                         </p>
                         <p>
                            Cruise 1 is the first stretch of the journey from Earth to Mars. During this time, the spacecraft uses its solar electric thrusters for extended periods to slowly build up speed. The thrust is gentle but continuous, allowing the spacecraft to travel great distances efficiently.
                         </p>
                         <p>
                            When Psyche reaches Mars, it will perform a gravity assist. This maneuver uses the planet’s gravity to increase the spacecraft’s speed and changes its direction while using very little fuel. The effect is often compared to a sling shot. By passing close to Mars and taking advantage of the planet’s motion around the Sun, Psyche gains additional speed. Before the flyby, the spacecraft will be traveling about 45,600 miles per hour relative to the sun. Afterwards, it will reach about 52,200 miles per hour, which is an increase of roughly 6,000 miles per hour. 
                         </p>
                         <p>
                            The Mars flyby also gives the mission team an opportunity to test the spacecraft’s instruments. As it passes the planet, the team will perform a practice run using Mars to calibrate cameras and sensors before reaching the asteroid. After the gravity assist, Cruise 2 begins. This final stretch includes about 29 months of continuous thruster use, guiding the spacecraft toward Psyche for arrival in 2029. 
                         </p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card4}>
                <section className="overlay-right">
                    <h1>Scene 4</h1>
                    <div>
                        <p>
                            As the Psyche spacecraft enters the Main Asteroid Belt, it begins the most important part of its mission. After years of travel, the focus shifts from getting there to studying the asteroid. To do this, the spacecraft carries several scientific instruments designed to answer questions about what Psyche is made of and how it was formed.
                        </p>
                         <p>
                            One of the primary instruments is the magnetometer. This tool searches for what scientists call a remnant magnetic field. If Psyche once had a molten, active interior like Earth’s core, it may have generated a magnetic field long ago. Even if that field no longer exists today, traces of it could remain locked within the asteroid’s materials. Detecting such evidence would strongly support the idea that Psyche may be the exposed core of an early planetary building block.
                         </p>
                         <p>
                            Another key instrument is the gamma ray and neutron spectrometer. Its purpose is to identify the elements that make up the asteroid. To work properly, this sensor must be cooled to an extremely low temperature of 85 Kelvin or minus 306 degrees Fahrenheit. A special cryocooler keeps it cold enough to operate accurately in space.
                         </p>
                         <p>
                            The spacecraft also carries two identical multispectral imagers. These cameras use filters and telescopic lenses to photograph the asteroid’s surface in different wavelengths of light and by studying these images, scientists can learn about surface features and variations in compositions. Finally, by measuring the X band radio waves exchanged between Earth and the spacecraft, scientists can detect small changes in the spacecraft’s orbit caused by Psyche’s gravity which provides valuable clues about the asteroid’s interior structure.
                         </p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card5}>
                <section className="overlay-right">
                    <h1>Scene 5</h1>
                    <div>
                        <p>
                        </p>
                         <p>
                         </p>
                         <p>
                         </p>
                    </div>
                </section>
            </CardOverlay>

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