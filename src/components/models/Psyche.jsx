import { useFBO, useGLTF } from '@react-three/drei'

export default function Psyche({position = [0, 0, 0], scale = 0.1, rotation = [0, 0, 0]}) {
    const gltf = useGLTF('/models/Psyche.glb')

    return (
        <primitive
            object={gltf.scene}
            position={position}
            scale={scale}
            rotation={rotation}
        />
    )
}
