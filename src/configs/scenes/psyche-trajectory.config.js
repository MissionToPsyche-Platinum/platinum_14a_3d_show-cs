export const psycheTrajectoryConfig = {
    type: 'spline',

    spline: {
        closed: false,
        segments: 512,
        points: [
            [  139.567,    9.817,    -51.952 ],
            [  105.300,    7.200,   -162.600 ],
            [   -11.300,    4.600,   -277.200 ],
            [ -168.700,    2.000,   -297.500 ],
            [ -337.000,   -0.600,   -157.700 ],
            [ -371.100,   -3.200,     55.800 ],
            [ -280.400,   -5.800,    254.100 ],
            [  -64.900,   -8.500,    325.600 ],
            [  104.600,  -11.100,    246.500 ],
            [  178.600,  -13.700,    136.800 ],
            [  206.330,  -16.291,     11.763 ],
            [  196.400,  -13.800,   -148.300 ],
            [   69.700,  -11.200,   -312.300 ],
            [ -181.300,   -8.700,   -324.100 ],
            [ -403.600,   -6.200,   -161.800 ],
            [ -422.500,   -3.700,    104.800 ],
            [ -352.500,   -2.700,    264.800 ],
            [ -233.900,   -1.100,    360.400 ],
            [   79.400,    1.400,    397.000 ],
            [   249.400,    1.400,    315.000 ],
            [  306.117,    3.914,    260.455 ],
        ],
    },

    style: {
        color: 0xB0EDEA,
        opacity: 0.25,
    },

    icon: {
        type: 'hexagon',
        color: 0xB0EDEA,
        size: 2.4,
        opacity: 1,
    },

    visibility: [
        {
            startVH: 7.65,
            endVH: 9.75,
            fadeInDuration: 0.15,
            fadeOutDuration: 0.15,
        },
        {
            startVH: 13.25,
            endVH: 16,
            fadeInDuration: 0.15,
            fadeOutDuration: 0.15,
        },
    ],

    motion: [
        {
            startVH: 8.25,
            endVH: 9.25,
            startProgress: 0,
            endProgress: 0.4603,
        },
        {
            startVH: 13.75,
            endVH: 15.25,
            startProgress: 0.4603,
            endProgress: 1,
        },
    ],

    planetName: 'Psyche',
    info: {
        cardType: 'orbit',
        type: 'Spacecraft Trajectory',
        // fact: 'Mapping Psyche\'s overall shape, rotation, and gravitational field.',
    },
}
