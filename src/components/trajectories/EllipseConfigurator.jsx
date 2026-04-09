import * as THREE from 'three'

export default class EllipseConfigurator {
    // Create ellipse path where 1 unit is 1 million km
    static createEllipseConfig({ perihelion, aphelion, orbitalPeriod, timeOfPerihelion, epochTime, inclination = 0, longitudeAscendingNode = 0, argumentOfPerihelion = 0, style = {}, icon = {}, speed = 1, visibility = {}, motion = {}, planetName, info }) {
        // Set elliptical path
        const a = (perihelion + aphelion) / 2
        const b = Math.sqrt(perihelion * aphelion)

        const iRad = THREE.MathUtils.degToRad(inclination)
        const omegaRad = THREE.MathUtils.degToRad(longitudeAscendingNode)
        const wRad = THREE.MathUtils.degToRad(argumentOfPerihelion)

        const axis = new THREE.Vector3(
            Math.sin(omegaRad) * Math.sin(iRad),
            Math.cos(iRad),
            Math.cos(omegaRad) * Math.sin(iRad)
        ).normalize()

        const ascendingNode = new THREE.Vector3(Math.cos(omegaRad), 0, -Math.sin(omegaRad))
        const ortho = new THREE.Vector3().crossVectors(axis, ascendingNode).normalize()
        const perihelionDir = ascendingNode.clone().multiplyScalar(Math.cos(wRad))
            .add(ortho.clone().multiplyScalar(Math.sin(wRad)))

        const c = a - perihelion
        const center = perihelionDir.clone().multiplyScalar(-c).toArray()

        const deltaTime = epochTime - timeOfPerihelion
        const orbitFraction = ((deltaTime / (orbitalPeriod * 86400)) % 1 + 1) % 1
        const meanAngle = orbitFraction * 360

        const globalSpeed = motion.speed ?? speed
        const planetSpeed = motion.endEpochTime !== undefined
            ? (motion.endEpochTime - epochTime) / (orbitalPeriod * 86400) / (motion.durationVH ?? 1)
            : 365.25 / orbitalPeriod * globalSpeed
        const planetMotion = {
            ...motion,
            startVH: motion.startVH ?? 0,
            speed: planetSpeed,
        }

        return {
            type: 'ellipse',
            planetName,
            info,
            ellipse: {
                radiusX: a,
                radiusZ: b,
                center,
                axis: axis.toArray(),
                referenceDir: ascendingNode.toArray(),
                startAngle: argumentOfPerihelion + meanAngle,
            },
            style,
            icon,
            motion: planetMotion,
            visibility,
        }
    }
}