export const orbitDConfig = {
    type: 'circle',

    circle: {
        radius: 0.000185,
        center: [306.127, 3.913, 260.440],
        axis: [-0.940, 0.342, 0],
        startAngle: 180,
    },

    style: {
        color: 0xeeaf61,
        opacity: 0.5,
    },

    icon: {
        color: 0xeeaf61,
    },

    visibility: [
        {
            startVH: 16.85,
            endVH: 18.05,
            fadeInDuration: 0.15,
            fadeOutDuration: 0.05,
        },
        {
            startVH: 22.65,
            endVH: 24.05,
            fadeInDuration: 0.05,
            fadeOutDuration: 0.05,
        },
    ],

    planetName: 'Orbit D',
    info: {
        cardType: 'orbit',
        type: 'High-Resolution Data Collection',
        altitude: '75 km',
        orbitalPeriod: '3.6 hours',
        orbits: '666 orbits',
        duration: '100 days',
        fact: 'Collecting high-resolution data to determine composition, gravity, and internal structure.',
    },
};