import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { cameraTimeLine } from '../configs/camera-rig.config.js'

export default function CameraRig() {
    const { camera, size } = useThree()

    const segments = useMemo(() => {
        let scrollVHLength = 0
        let prevLastLookAt = null

        return cameraTimeLine.map((segment) => {
            const positionCurve = new THREE.CatmullRomCurve3(
                segment.position.map((pos) => new THREE.Vector3(...pos))
            )

            const lookAtPoints = segment.lookAt.map((pos) => new THREE.Vector3(...pos))
            if (prevLastLookAt) lookAtPoints[0].copy(prevLastLookAt)
            prevLastLookAt = lookAtPoints[lookAtPoints.length - 1].clone()

            const lookAtCurve = lookAtPoints.length >= 3
                ? new THREE.CatmullRomCurve3(lookAtPoints)
                : null

            const data = {
                startVH: scrollVHLength,
                endVH: scrollVHLength + segment.durationVH,
                positionCurve,
                lookAtCurve,
                lookAtPoints,
            }

            scrollVHLength += segment.durationVH
            return data
        })
    }, [])

    useEffect(() => {
        if (segments.length === 0) return
        const first = segments[0]
        camera.position.copy(first.positionCurve.getPointAt(0))
        camera.lookAt(first.lookAtPoints[0])
        camera.updateProjectionMatrix()
    }, [segments, camera])

    useEffect(() => {
        const isMobile = size.width < 768
        camera.fov = isMobile ? 75 : 60
        camera.near = 0.000000001
        camera.far = 10000
        camera.updateProjectionMatrix()
        camera.up.set(0, 1, 0)
    }, [size, camera])

    useFrame(() => {
        const scrollVH = window.scrollY / window.innerHeight

        // Find segment for current scroll position
        const segment = segments.findLast(
            (s) => scrollVH >= s.startVH && scrollVH <= s.endVH
        )

        if (!segment) return

        const localT = THREE.MathUtils.clamp(
            (scrollVH - segment.startVH) / (segment.endVH - segment.startVH),
            0,
            1
        )

        const t = localT * localT * localT * (localT * (localT * 6 - 15) + 10)

        const currentTarget = segment.lookAtCurve
            ? segment.lookAtCurve.getPointAt(localT)
            : new THREE.Vector3().lerpVectors(segment.lookAtPoints[0], segment.lookAtPoints[1], localT)

        camera.position.copy(segment.positionCurve.getPointAt(t))
        camera.lookAt(currentTarget)

        // Save the target directly to the camera for the scale bar to read
        camera.userData.target = currentTarget
    })

    return null
}