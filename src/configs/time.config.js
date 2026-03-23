export const timeTimeLine = [
    {
        visibility: {
            startVH: 1,
            endVH: 5,
            fadeInDuration: 0.5,
            fadeOutDuration: 0.5,
        },
        timeBounds: {
            // only month is 0 indexed
            startTime: new Date(2023, 0, 1),
            endTime: new Date(2024, 0, 1)
        }
    },
    {
        visibility: {
            startVH: 7,
            endVH: 10,
            fadeInDuration: 0.5,
            fadeOutDuration: 0.5,
        },
        timeBounds: {
            // only month is 0 indexed
            startTime: new Date(2024, 6, 15),
            endTime: new Date(2025, 0, 1)
        }
    }
]