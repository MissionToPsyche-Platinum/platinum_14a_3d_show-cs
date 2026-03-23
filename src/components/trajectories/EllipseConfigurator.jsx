import * as THREE from 'three'

export default class EllipseConfigurator {
    static createEllipseConfig({ perihelion, aphelion, orbitalPeriod, timeOfPerihelion, epochTime, inclination = 0, longitudeAscendingNode = 0, argumentOfPerihelion = 0, style = {}, icon = {}, speed = 1, visibility = {}, planetName, info }) {
        const a = (perihelion + aphelion) / 2
        const b = Math.sqrt(perihelion * aphelion)
        const center = [a - perihelion, 0, 0]

        const iRad = THREE.MathUtils.degToRad(inclination)
        const omegaRad = THREE.MathUtils.degToRad(longitudeAscendingNode)

        const axis = new THREE.Vector3(
            Math.sin(omegaRad) * Math.sin(iRad),
            Math.cos(iRad),
            Math.cos(omegaRad) * Math.sin(iRad)
        ).normalize()

        const deltaTime = epochTime - timeOfPerihelion
        const orbitFraction = ((deltaTime / orbitalPeriod) % 1 + 1) % 1
        const meanAngle = orbitFraction * 360

        return {
            type: 'ellipse',
            planetName,
            info,
            ellipse: {
                radiusX: a,
                radiusZ: b,
                center: center,
                axis: axis.toArray(),
                startAngle: argumentOfPerihelion + meanAngle,
            },
            style,
            icon,
            motion: {
                startVH: 0,
                speed: 365.25 / orbitalPeriod * speed,
            },
            visibility,
        }
    }
}