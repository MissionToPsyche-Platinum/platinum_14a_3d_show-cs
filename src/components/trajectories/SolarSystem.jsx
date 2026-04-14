import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import TrajectoryController from '../TrajectoryController'
import EllipseConfigurator from './EllipseConfigurator'

const PLANET_DATA = {
    '16 Psyche': { type: 'Asteroid', diameter: '226 km', distanceFromSun: '437 million km', orbitalPeriod: '5 years', moons: 0, fact: "A metal-rich asteroid — target of NASA's Psyche mission." },
    Mercury: { type: 'Terrestrial Planet', diameter: '4,879 km', distanceFromSun: '57.9 million km', orbitalPeriod: '88 days', moons: 0, fact: 'The smallest planet and closest to the Sun.' },
    Venus: { type: 'Terrestrial Planet', diameter: '12,104 km', distanceFromSun: '108.2 million km', orbitalPeriod: '225 days', moons: 0, fact: 'The hottest planet, with surface temps reaching 465°C.' },
    Earth: { type: 'Terrestrial Planet', diameter: '12,742 km', distanceFromSun: '149.6 million km', orbitalPeriod: '365.25 days', moons: 1, fact: 'The only known planet to harbour life.' },
    Mars: { type: 'Terrestrial Planet', diameter: '6,779 km', distanceFromSun: '227.9 million km', orbitalPeriod: '687 days', moons: 2, fact: 'Home to Olympus Mons, the tallest volcano in the solar system.' },
    Jupiter: { type: 'Gas Giant', diameter: '139,820 km', distanceFromSun: '778.5 million km', orbitalPeriod: '11.86 years', moons: 95, fact: 'The Great Red Spot is a storm larger than Earth, ongoing for centuries.' },
    Saturn: { type: 'Gas Giant', diameter: '116,460 km', distanceFromSun: '1.43 billion km', orbitalPeriod: '29.46 years', moons: 146, fact: 'Its rings are made of ice and rock, spanning 282,000 km.' },
    Uranus: { type: 'Ice Giant', diameter: '50,724 km', distanceFromSun: '2.87 billion km', orbitalPeriod: '84 years', moons: 28, fact: 'Rotates on its side with an axial tilt of 98 degrees.' },
    Neptune: { type: 'Ice Giant', diameter: '49,244 km', distanceFromSun: '4.5 billion km', orbitalPeriod: '164.8 years', moons: 16, fact: 'Winds here reach 2,100 km/h — the fastest in the solar system.' },
    'The Sun': { type: 'G-type Main Sequence Star', diameter: '1,392,700 km', distanceFromSun: '—', orbitalPeriod: '225 million yrs', moons: null, fact: 'Contains 99.86% of all mass in the solar system.' },
}

const PSYCHE  = { name: '16 Psyche',  trajectory: { aphelion: 497,    perihelion: 378,     timeOfPerihelion: 1745841600, inclination: 3.09,  longitudeAscendingNode: 150,    argumentOfPerihelion: 229.8,  orbitalPeriod: 1825.6, style: { color: 0xF5A020, opacity: 0.5 }, icon: { type: 'hexagon', color: 0xF5A020 } } }
const MERCURY = { name: 'Mercury', trajectory: { aphelion: 69.82,  perihelion: 46,      timeOfPerihelion: 1756296000, inclination: 3.38,  longitudeAscendingNode: 48.33,  argumentOfPerihelion: 29.12,  orbitalPeriod: 87.97,  style: { color: 0x9898AA, opacity: 0.5 }, icon: { type: 'circle',  color: 0x9898AA } } }
const VENUS   = { name: 'Venus',   trajectory: { aphelion: 108.94, perihelion: 107.48,  timeOfPerihelion: 1759406400, inclination: 3.86,  longitudeAscendingNode: 76.68,  argumentOfPerihelion: 54.88,  orbitalPeriod: 224.7,  style: { color: 0xE8C050, opacity: 0.5 }, icon: { type: 'circle',  color: 0xE8C050 } } }
const EARTH   = { name: 'Earth',   trajectory: { aphelion: 152.1,  perihelion: 147.1,   timeOfPerihelion: 1767441600, inclination: 7.155, longitudeAscendingNode: -11.26, argumentOfPerihelion: 114.21, orbitalPeriod: 365.25, style: { color: 0x48A8E0, opacity: 0.5 }, icon: { type: 'circle',  color: 0x48A8E0 } } }
const MARS    = { name: 'Mars',    trajectory: { aphelion: 249.2,  perihelion: 206.7,   timeOfPerihelion: 1655812800, inclination: 5.65,  longitudeAscendingNode: 49.56,  argumentOfPerihelion: 286.5,  orbitalPeriod: 687,    style: { color: 0xD85030, opacity: 0.5 }, icon: { type: 'circle',  color: 0xD85030 } } }
const JUPITER = { name: 'Jupiter', trajectory: { aphelion: 816.62, perihelion: 740.52,  timeOfPerihelion: 1674302400, inclination: 6.09,  longitudeAscendingNode: 100.46, argumentOfPerihelion: 273.87, orbitalPeriod: 4331,   style: { color: 0xC88050, opacity: 0.5 }, icon: { type: 'circle',  color: 0xC88050 } } }
const SATURN  = { name: 'Saturn',  trajectory: { aphelion: 1514.5, perihelion: 1352.55, timeOfPerihelion: 1985342400, inclination: 5.51,  longitudeAscendingNode: 113.67, argumentOfPerihelion: 339.39, orbitalPeriod: 10747,  style: { color: 0xDCBE72, opacity: 0.5 }, icon: { type: 'circle',  color: 0xDCBE72 } } }
const URANUS  = { name: 'Uranus',  trajectory: { aphelion: 3003.6, perihelion: 2741.3,  timeOfPerihelion: 2544436800, inclination: 6.48,  longitudeAscendingNode: 74.01,  argumentOfPerihelion: 97.00,  orbitalPeriod: 30589,  style: { color: 0x5EC8C4, opacity: 0.5 }, icon: { type: 'circle',  color: 0x5EC8C4 } } }
const NEPTUNE = { name: 'Neptune', trajectory: { aphelion: 4545.7, perihelion: 4457.1,  timeOfPerihelion: 2293444800, inclination: 6.43,  longitudeAscendingNode: 131.78, argumentOfPerihelion: 273.19, orbitalPeriod: 59800,  style: { color: 0x2858D0, opacity: 0.5 }, icon: { type: 'circle',  color: 0x2858D0 } } }


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
        const texture = new THREE.TextureLoader().load('/images/equirectangular/sun-equirectangular.jpg')
        const sunGeometry = new THREE.SphereGeometry(0.696, 32, 32)
        const sunMaterial = new THREE.MeshBasicMaterial({ map: texture })
        const sun = new THREE.Mesh(sunGeometry, sunMaterial)
        this.group.add(sun)

        const glowCanvas = document.createElement('canvas')
        glowCanvas.width = 256
        glowCanvas.height = 256

        const ctx = glowCanvas.getContext('2d')
        const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 128)

        gradient.addColorStop(0, 'rgba(255, 220, 160, 1.0)')
        gradient.addColorStop(0.35, 'rgba(255, 170, 60, 0.45)')
        gradient.addColorStop(0.7, 'rgba(255, 120, 30, 0.12)')
        gradient.addColorStop(1, 'rgba(255, 80, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 256, 256)

        const glowTexture = new THREE.CanvasTexture(glowCanvas)

        const glowMaterial = new THREE.SpriteMaterial({
            map: glowTexture,
            transparent: true,
            depthWrite: false,
        })

        const glow = new THREE.Sprite(glowMaterial)
        glow.scale.set(4, 4, 1)

        this.group.add(glow)

        const hitboxGeo = new THREE.SphereGeometry(3, 8, 8)
        const hitboxMat = new THREE.MeshBasicMaterial({ visible: false })
        const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat)
        hitbox.userData = {
            isHoverable: true,
            name: 'The Sun',
            color: 0xF9D71C,
            info: PLANET_DATA['The Sun'],
        }
        this.group.add(hitbox)
    }

    createPlanets() {
        const planets = [PSYCHE, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE]
        planets.forEach(planet => {
            const ellipseConfig = {
                ...structuredClone(planet.trajectory),
                planetName: planet.name,
                info: PLANET_DATA[planet.name],
                speed: this.speed,
                visibility: this.config.visibility,
                motion: this.config.motion,
                epochTime: this.config.epochTime,
            }
            const trajectory = new TrajectoryController(
                EllipseConfigurator.createEllipseConfig(ellipseConfig, this.speed)
            )
            this.group.add(trajectory.group)
            this.trajectories.push(trajectory)
        })
    }

    update() {
        this.trajectories.forEach(t => t.update())
        if (this.config.visibility) {
            this.visibility(this.group, window.scrollY / window.innerHeight)
        }
    }

    visibility(group, scrollVH) {
        const windows = Array.isArray(this.config.visibility)
            ? this.config.visibility
            : [this.config.visibility]

        let bestOpacity = null
        for (const { startVH, endVH, fadeInDuration = 0, fadeOutDuration = 0 } of windows) {
            if (scrollVH < startVH - fadeInDuration || scrollVH > endVH + fadeOutDuration) continue
            let opacity = 1
            if (fadeInDuration > 0 && scrollVH < startVH)
                opacity = THREE.MathUtils.clamp((scrollVH - (startVH - fadeInDuration)) / fadeInDuration, 0, 1)
            if (fadeOutDuration > 0 && scrollVH > endVH)
                opacity = THREE.MathUtils.clamp(1 - (scrollVH - endVH) / fadeOutDuration, 0, 1)
            if (bestOpacity === null || opacity > bestOpacity) bestOpacity = opacity
        }

        if (bestOpacity === null) {
            group.visible = false
            return
        }

        group.visible = true
        this.setOpacity(group, bestOpacity)
    }

    setOpacity(group, opacity) {
        group.traverse(child => {
            if (!child.isMesh) return
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach(mat => {
                if (!mat) return
                mat.transparent = true
                mat.opacity = opacity
                mat.side = THREE.FrontSide
                mat.depthWrite = opacity >= 0.99
                mat.depthTest = true
            })
        })
    }
}

export default function SolarSystem({ config = {} }) {
    const system = useRef(null)

    if (!system.current) {
        system.current = new SolarSystemController(config)
    }

    useFrame(() => {
        system.current.update()
    })

    return <primitive object={system.current.group} />
}