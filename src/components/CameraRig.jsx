import { useThree, useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function CameraRig() {
    const { camera } = useThree()
    const scroll = useScroll()

    // Camera path
    const start = new THREE.Vector3(0, 0, 10)
    const end = new THREE.Vector3(5, 5, 5)

    useFrame(() => {
        const t = scroll.offset // Scroll offset from 0 to 1

        camera.position.lerpVectors(start, end, t)
        camera.lookAt(0, 0, 0)
    })

    return null
}