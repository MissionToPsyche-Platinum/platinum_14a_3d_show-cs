export const orbitBConfig = {
    type: 'circle',

    circle: {
        radius: 0.000413,
        center: [306.127, 3.913, 260.440],
        axis: [0, 1, 0],
        startAngle: 180,
    },

    style: {
        color: 0xee5d6c,
        opacity: 0.5,
    },

    icon: { 
        color: 0xee5d6c,
    },

    visibility: [
        {
            startVH: 16.95,
            endVH: 18.05,
            fadeInDuration: 0.15,
            fadeOutDuration: 0.05,
        },
        {
            startVH: 19.65,
            endVH: 21.05,
            fadeInDuration: 0.05,
            fadeOutDuration: 0.05,
        },
    ],

    planetName: 'Orbit B (B1, B2)',
    info: {
        cardType: 'orbit',
        type: 'Gravity & Magnetism Analysis',
        altitude: '303 km',
        orbitalPeriod: '11.6 hours',
        orbits: '396 orbits',
        duration: '192 days',
        fact: 'Refining the gravity field measurements and detecting any magnetic field.',
    },
};