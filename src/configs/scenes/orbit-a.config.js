export const orbitAConfig = {
    type: 'circle',

    circle: {
        radius: 0.000819,
        center: [306.127, 3.913, 260.440],
        axis: [0, 1, 0],
        startAngle: 180,
    },

    style: {
        color: 0xce4993,
        opacity: 0.5,
    },

    icon: {
        color: 0xce4993,
    },

    visibility: [
        {
            startVH: 17,
            endVH: 19.55,
            fadeInDuration: 0.05,
            fadeOutDuration: 0.05,
        },
    ],

    planetName: 'Orbit A',
    info: {
        cardType: 'orbit',
        type: 'Initial Mapping & Survey',
        altitude: '709 km',
        orbitalPeriod: '32.6 hours',
        orbits: '41 orbits',
        duration: '56 days',
        fact: 'Mapping Psyche\'s overall shape, rotation, and gravitational field.',
    },
};