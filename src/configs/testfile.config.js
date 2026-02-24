export const testTrajectoryConfig = {
    type: 'spline',

    circle: {
        radius: 20,
        center: [0, 0, 0],
        axis: [1, 1, 1],
        startAngle: 90,
    },

    spline: {
        points: [
            [0, 0, 20],
            [10, 5, 10],
            [20, 0, 0],
        ],
        closed: true,
    },

    ellipse: {
        radiusX: 20,
        radiusZ: 40,
        center: [0, 0, 0],
        axis: [0, 1, 0],
        startAngle: 0, 
        rotationOffset: [0, 90, 0]
    },

    style: {
        color: 0xffffff,
        opacity: 1,
    },

    icon: {
        type: 'hexagon',
        size: 3,
        color: 0xffffff,
        opacity: 1,
    },

    motion: {
        startVH: 0,
        speed: 1,
    },

    visibility: {
        startVH: 0,
        endVH: 2,
    },
}