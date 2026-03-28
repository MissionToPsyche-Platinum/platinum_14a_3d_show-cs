import * as THREE from 'three'

export default class EllipseConfigurator {
    // Create ellipse path where 1 unit is 1 million km
    static createEllipseConfig({ perihelion, aphelion, orbitalPeriod, timeOfPerihelion, epochTime, inclination = 0, longitudeAscendingNode = 0, argumentOfPerihelion = 0, style = {}, icon = {}, speed = 1, visibility = {}, motion = {} }) {
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

        // Offset start angle by argument of perihelion
        const deltaTime = epochTime - timeOfPerihelion
        const orbitFraction = ((deltaTime / orbitalPeriod) % 1 + 1) % 1
        const meanAngle = orbitFraction * 360

        // Create default motion if needed
        if (!motion.startVH) motion.startVH = 0
        if (!motion.speed) motion.speed = 365.25 / orbitalPeriod * speed

        return {
            type: 'ellipse',
            ellipse: {
                radiusX: a,
                radiusZ: b,
                center: center,
                axis: axis.toArray(),
                startAngle: argumentOfPerihelion + meanAngle,
            },
            style: style,
            icon: icon,
            motion: motion,
            visibility: visibility
        }
    }
}