import { useState, useEffect } from 'react'
import '../styles/Overlay.css'
import CardOverlay from './CardOverlay.jsx'
import AutoScroll from './AutoScroll.jsx'
import TimeOverlay from './TimeOverlay.jsx'
import MissionGallery from './MissionGallery.jsx';
import SplashScreen from './SplashScreen.jsx'

import { splash } from '../configs/splash.config.js'

import { card1 } from '../configs/cards/card1.config.js'
import { card2 } from '../configs/cards/card2.config.js'
import { card3 } from '../configs/cards/card3.config.js'
import { card4 } from '../configs/cards/card4.config.js'
import { card5 } from '../configs/cards/card5.config.js'
import { card6 } from '../configs/cards/card6.config.js'
import { card7 } from '../configs/cards/card7.config.js'
import { card8 } from '../configs/cards/card8.config.js'
import { card9 } from '../configs/cards/card9.config.js'
import { card10 } from '../configs/cards/card10.config.js'
import { card11 } from '../configs/cards/card11.config.js'
import { card12 } from '../configs/cards/card12.config.js'
import { card13 } from '../configs/cards/card13.config.js'
import { card14 } from '../configs/cards/card14.config.js'
import { card15 } from '../configs/cards/card15.config.js'

import { timeTimeLine } from '../configs/time.config.js'

const CONCLUSION_VH = 26;

export default function Overlay() {
    const [showFooter, setShowFooter] = useState(false)
    const [showConclusion, setShowConclusion] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const currentVH = window.scrollY / window.innerHeight
            const distFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY

            setShowConclusion(currentVH >= CONCLUSION_VH)

            setShowFooter(prev => {
                if (!prev && distFromBottom < 80) return true
                if (prev && distFromBottom > 350) return false
                return prev
            })
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollableContentStyle = {
        maxHeight: '55vh',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        pointerEvents: 'auto',
        paddingRight: '15px',
    };


    return (
        <div className='overlay'>
            {/* <SplashScreen config={splash}></SplashScreen> */}

            <AutoScroll />

            <TimeOverlay config={timeTimeLine}>
                <div id="timeBar">
                    <h1>Time</h1>
                </div>
            </TimeOverlay>

            <CardOverlay config={card1}>
                <section className="overlay-right">
                    <h1>The Asteroid Belt</h1>
                    <div className="card-scroll">
                        <p>Between Mars and Jupiter lies a region filled with millions of rocky objects orbiting the Sun. This region is known as the <b>Main Asteroid Belt</b>.</p>
                        <p>It stretches about <b>140 million miles</b> across, which is about one and a half times the distance from Earth to the Sun. Most objects in the asteroid belt are much smaller than planetary bodies, like Earth. Early in the history of the solar system, the gravity of newly formed Jupiter brought an end to the formation of planetary bodies in this region and caused the small bodies to collide with one another, fragmenting them into the asteroids we observe today.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card2}>
                <section className="overlay-right">
                    <h1>16 Psyche</h1>
                    <div className="card-scroll">
                        <p><b>16 Psyche</b> is an asteroid oribiting the Sun in the <b>Main Asteroid Belt</b>, located between Mars and Jupiter. It was discovered in 1852 and was the sixteenth asteroid found, named after the Greek goddess of the soul, “Psyche”. </p>
                        <p>Psyche measures about 279 km long, 232 km wide, and 189 km tall. Its surface area is about <b>64,000 square miles</b>. With a mass of about 2.3 * 10 ^19 kg (23 with 18 zeros behind it), it is the <b>tenth largest</b> known asteroid and makes up about 1 percent of the Main Asteroid Belt’s total mass all by itself.</p>
                        <p>Unlike most asteroids, Psyche is likely <b>rich in metal</b>. Scientists think it may be the <b>exposed core</b> of an early planetesimal. This gives us a unique opportunity to study the building blocks of our own planet and how other planets are formed.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card3}>
                <section className="overlay-right">
                    <h1>The Mission</h1>
                    <div className="card-scroll">
                        <p>On <a href='https://science.nasa.gov/blogs/psyche/'>October 13, 2023</a>, the Psyche mission launched from Kennedy Space Center aboard a SpaceX Falcon Heavy rocket.</p>
                        <p>The total mission length is estimated to be about <b>eight years</b>. The spacecraft will travel for nearly six years before arriving at Psyche in <b>August 2029</b>. Its primary science mission will continue for about two more years, ending in <b>November 2031</b>.</p>
                        <p>This mission will be the first to orbit a metal rich asteroid, helping scientists understand how planets formed and what lies inside their cores.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card4}>
                <section className="overlay-right">
                    <h1>The Spacecraft</h1>
                    <div className="card-scroll">
                        <p>The Psyche spacecraft launched at about 6,056 pounds and unfolded to the size of a tennis court once its solar panels deployed.</p>
                        <p>It uses <b>solar electric propulsion</b>, called Hall-effect thrusters, instead of traditional engines. The spacecraft harvests energy from the Sun and combines it with a propellant called xenon, which is traditionally used in car headlights and plasma TVs. This combination emits a blue glow, similar to what you see in sci-fi movies, and pushes the spacecraft forward.</p>
                        <p>This thrust is very small, exerting the same force that a AA battery would if you were holding in the palm of your hand. However, the main advantage is that it is <b>very efficient</b>, allowing the spacecraft to travel long distances using very little fuel.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card5}>
                <section className="overlay-right">
                    <h1>Cruise 1</h1>
                    <div className="card-scroll">
                        <p>Over time, the force from the thrusters adds up cumulatively, leading to enough velocity to make it to Mars. This phase is called <b>Cruise 1</b>, and begins about <b>100 days</b> after launch and lasts for nearly three years. During this time, the spacecraft travels steadily through deep space towards Mars, with closest approach in <b>May 2026</b>.</p>
                        <p>The spacecraft uses its solar electric thrusters for long periods to slowly build speed. The thrust is gentle but continuous, allowing efficient long distance travel while using very little fuel.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card6}>
                <section className="overlay-right">
                    <h1>Mars Gravity Assist</h1>
                    <div className="card-scroll">
                        <p>At Mars, we take advantage of one of the fundamental forces in our solar system: <b>Gravity</b>. The spacecraft performs a gravity assist to increase speed and change direction. This planet’s gravity acts like a <b>slingshot</b>, accelerating the spacecraft and setting it on a course to Psyche, all without using large amounts of fuel.</p>
                        <p>The spacecraft’s speed increases from about <b>45,600</b> miles per hour to about <b>52,000</b> miles per hour. The flyby also allows the scientists to test and calibrate the instruments before reaching the asteroid.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card7}>
                <section className="overlay-right">
                    <h1>Cruise 2</h1>
                    <div className="card-scroll">
                        <p>After the Mars flyby, <b>Cruise 2</b> begins. This is the <b>longest phase</b> of the journey, lasting about <b>29 months</b>. The spacecraft continues using its thrusters to guide itself toward Psyche for arrival in <b>2029</b>.</p>
                        <p>During this time, mission planners prepare for arrival by designing the spacecraft’s orbital path around Psyche. Instead of landing, the spacecraft will enter a series of <b>planned orbits</b> at different altitudes, each focused on collecting specific scientific data.</p>
                        <p>These planned orbits allow the mission to gradually study the asteroid’s surface, composition, and internal structure.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card8}>
                <section className="overlay-right">
                    <h1>The Instruments</h1>
                    <div className="card-scroll">
                        <div>
                            <h2>Imagers</h2>
                            <p>The imagers capture images using different wavelengths of light, helping scientists analyze <b>surface features and composition</b>.</p>
                        </div>
                        <div>
                            <h2>X-Band Radio</h2>
                            <p>Scientists also use X-band radio signals between Earth and the spacecraft to study gravity. Small changes in the spacecraft’s orbit reveal details about the asteroid’s properties, such as <b>rotation</b>, <b>mass</b>, and <b>gravity field</b>.</p>
                        </div>
                        <div>
                            <h2>Magnetometer</h2>
                            <p>The magnetometer searches for a <b>remanent magnetic field</b>. If Psyche once had a molten interior, it may have generated a magnetic field, and traces of it could still exist in the asteroid’s materials. This would be strong evidence that Psyche formed from the core of a planetary body.</p>
                        </div>
                        <div>
                            <h2>Spectrometer</h2>
                            <p>The gamma-ray and neutron spectrometer identifies the <b>elements</b> that make up the asteroid. It must be cooled to about 85 Kelvin, using a cryocooler to operate accurately in space.</p>
                        </div>
                    </div>
                </section>
            </CardOverlay>

            {/* CUT CONTENT: combined into single card */}
            <CardOverlay config={card9}>
                <section className="overlay-right">
                    <h1>The Instruments</h1>
                    <div className="card-scroll">
                        <p>The spacecraft carries two multispectral imagers and uses radio signals to study Psyche's structure.</p>
                        <div>
                            <h2>Imagers</h2>
                            <p>The imagers capture images using different wavelengths of light, helping scientists analyze surface features and composition.</p>
                        </div>
                        <div>
                            <h2>X Band Radio</h2>
                            <p>Scientists also use X band radio signals between Earth and the spacecraft to study gravity. Small changes in the spacecraft's orbit reveal details about the asteroid's properties, such as rotation, mass, and gravity field.</p>
                        </div>
                    </div>
                </section>
            </CardOverlay>
            
            <CardOverlay config={card10}>
                <section className="overlay-right">
                    <h1>Arrival at Psyche</h1>
                    <div className="card-scroll">
                        <p>The spacecraft is estimated to begin its approach at 16 Psyche in <b>May, 2029</b>. Rather than landing, the spacecraft will maneuver into 16 Psyche’s orbit, using the onboard imager to capture its <b>first close-up views</b> as well as calibrating its instruments. This will give scientists a better idea of what Psyche looks like as well as aiding in navigation.</p>
                        <p>The spacecraft is expected to enter the first of <b>four planned orbits</b> in <b>August, 2029</b>. Over the next <b>26 months</b>, the spacecraft will transition between these orbits, labeled A through D, and utilize different instruments to collect scientific data. The sequence of orbits will not actually follow alphabetical order and will transition from A to B to D to C due to varying sunlight conditions. The mission is expected to conclude <b>November, 2031</b>.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card11}>
                <section className="overlay-right">
                    <h1>Orbit A</h1>
                    <div className="card-scroll">
                        <p>Orbit A is the highest orbit at <b>709 kilometers</b> and lasts about <b>56 days</b>. During this phase, the spacecraft creates the <b>first global maps</b> of Psyche by imaging the entire surface. It also collects initial magnetic field and gravity measurements.</p>
                        <p>The goal of Orbit A is to provide a complete overview of the asteroid. These early observations help scientists understand Psyche's overall <b>shape</b>, <b>rotation</b>, and <b>major surface features</b>. This information is critical for planning lower orbits and guiding the rest of the mission.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card12}>
                <section className="overlay-right">
                    <h1>Orbit B</h1>
                    <div className="card-scroll">
                        <p>Orbit B occurs at about <b>303 kilometers</b> and is divided into two phases called <b>B1 and B2</b>. In this orbit, the spacecraft performs <b>detailed mapping</b> of the surface, covering most of the asteroid. It focuses on <b>topography</b>, <b>geology</b>, and <b>surface variations</b>.</p>
                        <p>The goal of Orbit B is to reveal <b>how Psyche's surface formed</b> and changed over time. By studying features such as craters, ridges, and textures, scientists can learn about the asteroid's history and whether it formed through impacts or internal processes.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card13}>
                <section className="overlay-right">
                    <h1>Orbit C</h1>
                    <div className="card-scroll">
                        <p>Orbit C takes place at <b>190 kilometers</b> and focuses on gravity and <b>magnetic field measurements</b>. During this phase, the spacecraft scans the asteroid from all angles as Psyche rotates beneath it.</p>
                        <p>The goal of Orbit C is to understand <b>what lies beneath the surface</b>. By analyzing the changes in gravity and magnetic signals, scientists can determine the <b>internal structure</b> of Psyche and confirm whether it has a layered core like a planet.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card14}>
                <section className="overlay-right">
                    <h1>Orbit D</h1>
                    <div className="card-scroll">
                        <p>Orbit D is the lowest orbit at <b>75 kilometers</b>. At the same time, Orbit D marks a shift from a course that generally goes around the asteroid’s poles to one that generally travels around its equator. This phase focuses on determining the asteroid’s <b>composition</b> using the gamma-ray and neutron spectrometer, while continuing <b>gravity and magnetic measurements</b>.</p>
                        <p>The goal of Orbit D is to identify <b>what Psyche is made of</b>. By measuring elements such as metal and rock, scientists can test the idea that Psyche may be the exposed core of an early planetesimal. This is one of the most important phases for understanding <b>planetary formation</b>.</p>
                    </div>
                </section>
            </CardOverlay>

            <CardOverlay config={card15}>
                <section className={`overlay-conclusion${showFooter ? ' overlay-conclusion--footer-up' : ''}`}>
                    <div className="conclusion-hero">
                        <h1>End of a Journey</h1>
                    </div>

                    <div className="conclusion-body">
                        <div className="conclusion-text-block">
                            <h2>A Window Into Our Origins</h2>
                            <p>
                                By the end of the mission, Psyche is expected to deliver the first detailed look at a <b>metal-rich</b> asteroid, offering insight into the <b>building blocks</b> of planetesimal cores. Its data will help scientists better understand <b>how planets form</b> and evolve, as well as refine models of our own solar system’s <b>early history</b>.
                            </p>
                            <p>
                                Since we cannot bore a path to Earth's metallic core, Psyche provides a <b>one-of-a-kind</b> opportunity to study our own planet. By the end of its orbital campaign, the spacecraft will have gathered the data necessary to determine if this asteroid is truly the surviving heart of a shattered planetesimal.
                            </p>
                        </div>

                        <div className="conclusion-gallery-row">
                            <MissionGallery />
                        </div>
                        <div className='conclusion-text-columns'>
                            <div className="conclusion-text-block">
                                <h2>Post-Mission Plan</h2>
                                <p>
                                    At the conclusion of its mission, the Psyche spacecraft will be placed into a <b>long-term</b>, <b>non-impacting</b> orbit in accordance with <b>international planetary protection standards</b>. There, it will remain indefinitely as a silent monument to human ingenuity and deep-space exploration.
                                </p>
                                <p>
                                    Under the 1967 Outer Space Treaty, missions must avoid contaminating celestial bodies and protect the integrity of future scientific study. Although Psyche itself is not considered a target for biological research, the spacecraft must meet strict requirements due to its planned flyby of Mars. These include maintaining a very high probability of avoiding impact with Mars for decades after launch. From initial assembly in highly controlled clean rooms to its final trajectory, every stage of the mission is designed around these requirements and guidelines to ensure responsible and contamination-free exploration. 
                                </p>
                            </div>

                            <div className="conclusion-text-block">
                                <h2>A Global Collaboration</h2>
                                <p>
                                    The Psyche mission brings together <b>NASA</b>, <b>universities</b>, and industry in a shared effort to explore deep space, providing opportunities for students to contribute and gain experience in <b>science and engineering</b>.
                                </p>
                                <p>
                                    The mission is led by <b>Arizona State University</b>. <b>Lindy Elkins-Tanton</b> of the University of California, Berkeley is the <b>principal investigator</b>. A division of <b>Caltech</b> in <b>Pasadena, JPL</b> is responsible for the mission’s overall management, system engineering, integration and test, and mission operations. <b>Maxar Technologies</b> (now Intuitive Machines) in Palo Alto, California, provided the high-power solar electric propulsion spacecraft chassis.
                                </p>
                            </div>
                        </div>

                        <div className='conclusion-spacer'></div>
                        
                        <div className="conclusion-disclaimer">
                            <p>
                                This work was created in partial fulfillment of Arizona State University Capstone Course "CSE485 & CSE486″.
                                The work is a result of the Psyche Student Collaborations component of NASA's Psyche Mission (
                                <a href='https://psyche.ssl.berkeley.edu' target="_blank" rel="noopener noreferrer">https://psyche.ssl.berkeley.edu</a>).
                                "Psyche: A Journey to a Metal World" [Contract number NNM16AA09C] is part of the NASA Discovery Program
                                mission to solar system targets. Trade names and trademarks of ASU and NASA are used in this work for
                                identification only. Their usage does not constitute an official endorsement, either expressed or implied,
                                by Arizona State University or National Aeronautics and Space Administration. The content is solely the
                                responsibility of the authors and does not necessarily represent the official views of ASU or NASA.
                            </p>
                        </div>
                    </div>

                    
                </section>
            </CardOverlay>

            <div className={`footer${showFooter ? ' footer--visible' : ''}`}>
                <div className="footer__accent" />
                <h2 className="footer__title">PSYCHE / JOURNEY TO A METAL WORLD</h2>
                <div className="footer__facts">
                    {[
                        { label: 'Launched',       value: 'Oct 13, 2023' },
                        { label: 'Vehicle',        value: 'Falcon Heavy' },
                        { label: 'Destination',    value: '16 Psyche' },
                        { label: 'Distance',       value: '3.6 billion km' },
                        { label: 'Arrival',        value: 'Aug 2029' },
                        { label: 'Mission End',    value: 'Nov 2031' },
                    ].map(({ label, value }) => (
                        <div key={label} className="footer__fact">
                            <span className="footer__fact-label">{label}</span>
                            <span className="footer__fact-value">{value}</span>
                        </div>
                    ))}
                </div>
                <div className="footer__socials">
                    {[
                        { name: 'facebook', url: 'https://www.facebook.com/MissionToPsyche' },
                        { name: 'twitter', url: 'https://x.com/MissionToPsyche' },
                        { name: 'instagram', url: 'https://www.instagram.com/missiontopsyche/' },
                        { name: 'youtube', url: 'https://www.youtube.com/channel/UC2BGcbPW8mxryXnjQcBqk6A' }
                    ].map(({ name, url }) => (
                        <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="footer__social-link">
                            <img src={`${import.meta.env.BASE_URL}images/socials/${name}.svg`} alt={name} />
                        </a>
                    ))}
                </div>

                <div className="footer__links">
                    <a href="https://www.jpl.nasa.gov/press-kits/psyche/" target="_blank" rel="noopener noreferrer" className="footer__text-link">Press Kit</a>
                    <span className="footer__links-divider">·</span>
                    <a href="https://psyche.ssl.berkeley.edu/category/blog/" target="_blank" rel="noopener noreferrer" className="footer__text-link">Blog Archive</a>
                </div>

                <p className="footer__credit">NASA / JPL-Caltech / Arizona State University</p>
            </div>
        </div>
    )
}