export const psycheSlingshotConfig = {
    type: 'spline',

    spline: {
        offset: [ 206.330, -16.291, 11.763 ],
        closed: false,
        points: [
            [ 0.062, -0.002, 0.04 ],
            [ -0.005, -0.001, -0.05 ],
            [ 0.009, 0, -0.3 ],
        ],
    },

    style: {
        color: 0xB0EDEA,
        opacity: 0.8,
        trail: 0.25,
    },

    icon: {
        type: 'hexagon',
        color: 0xB0EDEA,
        size: 2.4,
        opacity: 1,
    },

    visibility: {
        startVH: 10.75,
        endVH: 11.75,
        fadeInDuration: 0.15,
        fadeOutDuration: 0.15,
    },

    motion: {
        startVH: 10.75,
        durationVH: 1.5,
    },

    planetName: 'Psyche',
    info: {
        cardType: 'orbit',
        type: 'Spacecraft Trajectory',
        fact: 'Type \'psyche\' to receive a secret transmission.',
    },
}