export const psycheSlingshotConfig = {
    type: 'spline',

    spline: {
        offset: [ 206.330, -16.291, 11.763 ],
        closed: false,
        points: [
            [ 0.062, -0.002, 0.04 ],
            [ -0.01, -0.001, -0.05 ],
            [ 0.009, 0, -0.3 ],
        ],
    },

    style: {
        color: 0xB0EDEA,
        opacity: 0.5,
    },

    icon: {
        type: 'hexagon',
        color: 0xB0EDEA,
        size: 2.4,
        opacity: 1,
    },

    visibility: {
        startVH: 10.25,
        endVH: 11.75,
        fadeInDuration: 0.15,
        fadeOutDuration: 0.15,
    },

    motion: {
        startVH: 10.75,
        durationVH: 1,
    }
}