import { useGLTF } from '@react-three/drei'

export default function Psyche({position = [0, 0, 0], scale = 1, rotation = [0, 0, 0]}) {
    const gltf = useGLTF('/models/psyche-sat.glb')

    return (
        <primitive
            object={gltf.scene}
            position={position}
            scale={scale}
            rotation={rotation}
        />
    )
}
