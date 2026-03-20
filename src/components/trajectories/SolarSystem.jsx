import { use, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import TrajectoryController from '../TrajectoryController'
import EllipseConfigurator from './EllipseConfigurator'

const PSYCHE = {
    name: 'Psyche',
    trajectory: {
        aphelion: 497, // in million km
        perihelion: 378, // in million km
        timeOfPerihelion: 1745841600, // in unix time (seconds)
        inclination: 3.09, // in degrees (sun's equator)
        longitudeAscendingNode: 150, // in degrees
        argumentOfPerihelion: 229.8, // in degrees
        orbitalPeriod: 1825.6, // earth days
        style: {
            color: 0xF99D06,
            opacity: 0.5,
        },
        icon: {
            type: 'hexagon',
            color: 0xF99D06,
        }
    }
}

const MERCURY = {
    name: 'Mercury',
    trajectory: {
        aphelion: 69.82, // in million km
        perihelion: 46, // in million km
        timeOfPerihelion: 1756296000, // in unix time (seconds)
        inclination: 3.38, // in degrees (sun's equator)
        longitudeAscendingNode: 48.33, // in degrees
        argumentOfPerihelion: 29.12, // in degrees
        orbitalPeriod: 87.97, // earth days
        style: {
            color: 0x504E51,
            opacity: 0.5,
        },
        icon: {
            type: 'circle',
            color: 0x504E51
        }
    }
}

const VENUS = {
    name: 'Venus',
    trajectory: {
        aphelion: 108.94,
        perihelion: 107.48,
        timeOfPerihelion: 1759406400,
        inclination: 3.86,
        longitudeAscendingNode: 76.68,
        argumentOfPerihelion: 54.88,
        orbitalPeriod: 224.7,
        style: {
            color: 0x8C7853,
            opacity: 0.5,
        },
        icon: {
            type: 'circle',
            color: 0x8C7853
        }
    }
}

const EARTH = {
    name: 'Earth',
    trajectory: {
        aphelion: 152.1,
        perihelion: 147.1,
        timeOfPerihelion: 1767441600,
        inclination: 7.155,
        longitudeAscendingNode: -11.26,
        argumentOfPerihelion: 114.21,
        orbitalPeriod: 365.25,
        style: {
            color: 0x2E86C1,
            opacity: 0.5,
        },
        icon: {
            type: 'circle',
            color: 0x2E86C1
        }
    }
}

const MARS = {
    name: 'Mars',
    trajectory: {
        aphelion: 249.2,
        perihelion: 206.7,
        timeOfPerihelion: 1655812800,
        inclination: 5.65,
        longitudeAscendingNode: 49.56,
        argumentOfPerihelion: 286.5,
        orbitalPeriod: 687,
        style: {
            color: 0xC1440E,
            opacity: 0.5,
        },
        icon: {
            type: 'circle',
            color: 0xC1440E
        }
    }
}

const JUPITER = {
    name: 'Jupiter',
    trajectory: {
        aphelion: 816.62,
        perihelion: 740.52,
        timeOfPerihelion: 1674302400,
        inclination: 6.09,
        longitudeAscendingNode: 100.46,
        argumentOfPerihelion: 273.87,
        orbitalPeriod: 4331,
        style: {
            color: 0xD2B48C,
            opacity: 0.5,
        },
        icon: {
            type: 'circle',
            color: 0xD2B48C
        }
    }
}

const SATURN = {
    name: 'Saturn',
    trajectory: {
        aphelion: 1514.5,
        perihelion: 1352.55,
        timeOfPerihelion: 1985342400,
        inclination: 5.51,
        longitudeAscendingNode: 113.67,
        argumentOfPerihelion: 339.39,
        orbitalPeriod: 10747,
        style: {
            color: 0xF5DEB3,
            opacity: 0.5,
        },
        icon: {
            type: 'circle',
            color: 0xF5DEB3
        }
    }
}

const URANUS = {
    name: 'Uranus',
    trajectory: {
        aphelion: 3003.6,
        perihelion: 2741.3,
        timeOfPerihelion: 2544436800,
        inclination: 6.48,
        longitudeAscendingNode: 74.01,
        argumentOfPerihelion: 97.00,
        orbitalPeriod: 30589,
        style: {
            color: 0xAFEEEE,
            opacity: 0.5,
        },
        icon: {
            type: 'circle',
            color: 0xAFEEEE
        }
    }
}

const NEPTUNE = {
    name: 'Neptune',
    trajectory: {
        aphelion: 4545.7,
        perihelion: 4457.1,
        timeOfPerihelion: 2293444800,
        inclination: 6.43,
        longitudeAscendingNode: 131.78,
        argumentOfPerihelion: 273.19,
        orbitalPeriod: 59800,
        style: {
            color: 0x4169E1,
            opacity: 0.5,
        },
        icon: {
            type: 'circle',
            color: 0x4169E1
        }
    }
}

export default function SolarSystem({ config = {} }) {
    const system = useRef(null)

    system.current = new SolarSystemController(config)

    useFrame(() => {
        system.current.update()
    })

    return <primitive object={system.current.group} />
}

class SolarSystemController {
    constructor(config) {
        const { position = [0, 0, 0], speed = 1 } = config

        this.group = new THREE.Group()
        this.group.position.set(...position)
        this.config = config
        this.speed = speed

        this.trajectories = []
        this.createSun()
        this.createPlanets()
    }

    createSun() {
        const geometry = new THREE.SphereGeometry(0.696, 32, 32)
        
        const texture = new THREE.TextureLoader().load('/images/equirectangular/sun-equirectangular.jpg')

        const material = new THREE.MeshBasicMaterial({ map: texture })

        const sun = new THREE.Mesh(geometry, material)
        this.group.add(sun)
    }

    createPlanets() {
        const planets = [
            PSYCHE,
            MERCURY,
            VENUS,
            EARTH,
            MARS,
            JUPITER,
            SATURN,
            URANUS,
            NEPTUNE,
        ]

        planets.forEach(planet => {
            const ellipseConfig = {
                ...structuredClone(planet.trajectory),
                speed: this.speed,
                visibility: this.config.visibility,
                epochTime: this.config.epochTime,
            }
            const trajectory = new TrajectoryController(EllipseConfigurator.createEllipseConfig(ellipseConfig, this.speed))
            this.group.add(trajectory.group)
            this.trajectories.push(trajectory)
        })
    }

    update() {
        this.trajectories.forEach(trajectory => trajectory.update())
        if (this.config.visibility) {
            this.visibility(this.group, window.scrollY / window.innerHeight)
        }
    }

    // Set object visibility
    visibility(group, scrollVH) {
        const { startVH, endVH, fadeInDuration = 0, fadeOutDuration = 0} = this.config.visibility

        if (scrollVH < startVH - fadeInDuration || scrollVH > endVH + fadeOutDuration) {
            group.visible = false
            return
        }

        group.visible = true
        let opacity = 1

        // Fade in
        if (fadeInDuration > 0 && scrollVH < startVH) {
            opacity = THREE.MathUtils.clamp((scrollVH - (startVH - fadeInDuration)) / fadeInDuration, 0, 1)
        }

        // Fade out
        if (fadeOutDuration > 0 && scrollVH > endVH) {
            opacity = THREE.MathUtils.clamp(1 - (scrollVH - endVH) / fadeOutDuration, 0, 1)
        }
        
        this.setOpacity(group, opacity)
    }

    setOpacity(group, opacity) {
        group.traverse(child => {
            if (!child.isMesh) return
            
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach(material => {
                if (!material) return

                material.transparent = true
                material.opacity = opacity
                material.side = THREE.FrontSide // Prevent rendering inside texture when fading out
                material.depthWrite = opacity >= 0.99
                material.depthTest = true
            })
        })
    }
}