// src/configs/test-trajectory.config.js

export const testTrajectoryConfig = {
    type: 'circle',
    circle: {
        radius: 15,
        center: [0, 0, 0],
        axis: [0, 1, 0], // Flat orbit on the Y-axis
        startAngle: 0,
    },
    style: {
        color: 0xffffff,
        opacity: 0.5,
    },
    visibility: {
        startVH: 0,
        endVH: 10,
    }
};