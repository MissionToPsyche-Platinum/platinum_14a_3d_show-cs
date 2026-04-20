import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

export default function Psyche({position = [0, 0, 0], scale = 1, rotation = [0, 1.5, -0.6]}) {
    const gltf = useGLTF('/models/Psyche.glb')
    const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene])

    return (
        <primitive
            object={scene}
            position={position}
            scale={scale}
            rotation={rotation}
        />
    )
}
