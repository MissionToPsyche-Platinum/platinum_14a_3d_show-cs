export const orbitCConfig = {
    type: 'circle',

    circle: {
        radius: 0.000300,
        center: [306.127, 3.913, 260.440],
        axis: [0, 1, 0],
        startAngle: 180,
    },

    style: {
        color: 0xfb9062,
        opacity: 0.5,
    },

    icon: {
        color: 0xfb9062,
    },

    visibility: [
        {
            startVH: 16.9,
            endVH: 18.05,
            fadeInDuration: 0.05,
            fadeOutDuration: 0.05,
        },
        {
            startVH: 21.15,
            endVH: 22.55,
            fadeInDuration: 0.05,
            fadeOutDuration: 0.05,
        },
    ],

    motion: {
        startVH: 21.25,
        durationVH: 1.25,
    },

    planetName: 'Orbit C',
    info: {
        cardType: 'orbit',
        type: 'Detailed Surface Study',
        altitude: '190 km',
        orbitalPeriod: '7.2 hours',
        orbits: '333 orbits',
        duration: '100 days',
        fact: 'Producing detailed maps of surface composition and magnetic variations.',
    },
};