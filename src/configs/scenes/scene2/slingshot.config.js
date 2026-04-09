export const slingshotConfig = {
    type: 'spline',

    spline: {
        points: [
            [-4, 0, 8],
            [-4, 0, 8],
            [-1, 0, -0.5],
            [6, 0, -6],
        ],
        offset: [230, -224.75, -60.8],
        closed: false,
    },

    style: {
        color: 0xffffff,
        opacity: 0.5,
    },

    icon: {
        type: 'hexagon',
        size: 3,
        color: 0xffffff,
        opacity: 1,
    },

    motion: {
        startVH: 13,
        durationVH: 2,
    },

    visibility: {
        startVH: 13.75,
        endVH: 14.25,
        fadeInDuration: 0.1,
        fadeOutDuration: 0.25,
    }
}