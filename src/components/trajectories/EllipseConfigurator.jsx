import * as THREE from 'three'

export default class EllipseConfigurator {
    static createEllipseConfig({ perihelion, aphelion, orbitalPeriod, timeOfPerihelion, epochTime, inclination = 0, longitudeAscendingNode = 0, argumentOfPerihelion = 0, style = {}, icon = {}, speed = 1, visibility = {}, motion, planetName, info }) {
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

        const rawMotions = !motion
            ? []
            : Array.isArray(motion)
                ? motion
                : [motion]

        let currentEpoch = epochTime
        let accProgress = 0
        const motionWindows = []

        for (const m of rawMotions) {
            if (!m.durationVH || m.durationVH <= 0) continue
            const startProgress = accProgress
            let endProgress

            if (m.endEpochTime !== undefined) {
                endProgress = accProgress + (m.endEpochTime - currentEpoch) / (orbitalPeriod * 86400)
                currentEpoch = m.endEpochTime
            } else {
                const spd = m.speed !== undefined ? m.speed : speed
                endProgress = accProgress + (365.25 / orbitalPeriod) * spd * m.durationVH
            }

            accProgress = endProgress
            motionWindows.push({
                startVH: m.startVH ?? 0,
                endVH: (m.startVH ?? 0) + m.durationVH,
                startProgress,
                endProgress,
            })
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
            motion: motionWindows.length > 0 ? motionWindows : null,
            visibility,
        }
    }
}
