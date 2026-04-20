import { useRef, useEffect, useState } from 'react';

const images = [
    {
        src: '/images/psyche-launch.jpg',
        alt: 'Psyche Launch',
        caption: 'Falcon Heavy launches the Psyche spacecraft — Credit: NASA/Aubrey Gemignani',
        href: 'https://images.nasa.gov/details/NHQ202310130019',
    },
    {
        src: '/images/psyche-team.jpg',
        alt: 'Psyche Team',
        caption: 'The team behind the Psyche mission — Credit: Mission to Psyche (LinkedIn)',
        href: 'https://www.linkedin.com/company/mission-to-psyche',
    },
    {
        src: '/images/offload.jpg',
        alt: 'Spacecraft Offload',
        caption: 'Psyche spacecraft being offloaded at Kennedy Space Center — Credit: NASA',
        href: 'https://images.nasa.gov/details/KSC-20230715-PH-DAC01_0170',
    },
    {
        src: '/images/dsoc.jpg',
        alt: 'DSOC Instrument',
        caption: 'Deep Space Optical Communications demonstration — Credit: NASA/JPL-Caltech',
        href: 'https://images.nasa.gov/details/PIA24569',
    },
    {
        src: '/images/processing.jpg',
        alt: 'Spacecraft Processing',
        caption: 'Psyche spacecraft during processing at Kennedy Space Center — Credit: NASA',
        href: 'https://images.nasa.gov/details/KSC-20221208-PH-JBS01_0047',
    },
    {
        src: '/images/spectrometer.jpg',
        alt: 'Spectrometer Instrument',
        caption: 'Gamma-ray and neutron spectrometer instrument — Credit: NASA/JPL-Caltech',
        href: 'https://images.nasa.gov/details/PIA24891',
    },
];

const ITEMS = [...images, ...images];

const SCROLL_SPEED = 0.2; // px per frame
const IMAGE_WIDTH = 320; // px
const IMAGE_GAP = 16;  // px 

export default function MissionGallery() {
    const trackRef = useRef(null);
    const rafRef = useRef(null);
    const pausedRef = useRef(false);
    const offsetRef = useRef(0);

    const setWidth = images.length * (IMAGE_WIDTH + IMAGE_GAP);

    useEffect(() => {
        const tick = () => {
            if (!pausedRef.current && trackRef.current) {
                offsetRef.current += SCROLL_SPEED;
                if (offsetRef.current >= setWidth) {
                    offsetRef.current -= setWidth;
                }
                trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [setWidth]);

    return (
        <div
            className="mission-gallery"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
        >
            <div className="mission-gallery__track" ref={trackRef}>
                {ITEMS.map((img, i) => (
                    <a
                        key={i}
                        href={img.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mission-gallery__item"
                        onClick={e => { if (Math.abs(offsetRef.current % setWidth - offsetRef.current % setWidth) > 4) e.preventDefault(); }}
                    >
                        <img src={img.src} alt={img.alt} />
                        <figcaption>{img.caption}</figcaption>
                    </a>
                ))}
            </div>
        </div>
    );
}