import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { cameraTimeLine } from '../configs/camera-rig.config'

export default function CameraRig() {
    const { camera, size } = useThree()

    const segments = useMemo(() => {
        let scrollVHLength = 0

        // Create timeline segments with curves for position and lookAt
        return cameraTimeLine.map((segment) => {
            const positionCurve = new THREE.CatmullRomCurve3(
                segment.position.map((pos) => new THREE.Vector3(...pos))
            )

            const lookAtCurve = new THREE.CatmullRomCurve3(
                segment.lookAt.map((pos) => new THREE.Vector3(...pos))
            )

            const data = {
                startVH: scrollVHLength,
                endVH: scrollVHLength + segment.durationVH,
                positionCurve,
                lookAtCurve,
            }

            scrollVHLength += segment.durationVH
            return data
        })
    }, [])

    useEffect(() => {
        const isMobile = size.width < 768
        camera.fov = isMobile ? 75 : 60
        camera.far = 10000
        camera.updateProjectionMatrix()
        camera.up.set(0, 1, 0)
    }, [size, camera])

    useFrame(() => {
        const scrollVH = window.scrollY / window.innerHeight

        // Find segment for current scroll position
        const segment = segments.find(
            (s) => scrollVH >= s.startVH && scrollVH <= s.endVH
        )

        if (!segment) return

        const localT = THREE.MathUtils.clamp(
            (scrollVH - segment.startVH) / (segment.endVH - segment.startVH),
            0,
            1
        )

        const t = THREE.MathUtils.smoothstep(localT, 0, 1)

        // Calculate the exact target the camera is looking at
        const currentTarget = segment.lookAtCurve.getPointAt(t)

        // Move and point the camera
        camera.position.copy(segment.positionCurve.getPointAt(t))
        camera.lookAt(currentTarget)

        // Save the target directly to the camera for the scale bar to read
        camera.userData.target = currentTarget
    })

    return null
}