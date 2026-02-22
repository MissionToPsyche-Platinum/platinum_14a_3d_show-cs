import * as THREE from 'three'

export default class EllipseConfigurator {
    // Create ellipse path where 1 unit is 1 million km
    static createEllipseConfig({ perihelion, aphelion, orbitalPeriod, inclination = 0, longitudeAscendingNode = 0, argumentOfPerihelion = 0, style = {}, icon = {}, speed = 1 }) {
        // Set elliptical path
        const a = (perihelion + aphelion) / 2
        const b = Math.sqrt(perihelion * aphelion)
        const center = [a - perihelion, 0, 0]

        // Create axis vector
        const iRad = THREE.MathUtils.degToRad(inclination)
        const omegaRad = THREE.MathUtils.degToRad(longitudeAscendingNode)
        
        const axis = new THREE.Vector3(
            Math.sin(omegaRad) * Math.sin(iRad),
            Math.cos(iRad),
            Math.cos(omegaRad) * Math.sin(iRad)
        ).normalize()

        return {
            type: 'ellipse',
            ellipse: {
                radiusX: a,
                radiusZ: b,
                center: center,
                axis: axis.toArray(),
                startAngle: argumentOfPerihelion,
            },
            style: style,
            icon: icon,
            motion: {
                startVH: 0,
                speed: 365.25 / orbitalPeriod * speed, // Orbits per earth year
            }
        }
    }
}