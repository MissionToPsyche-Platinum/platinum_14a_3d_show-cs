import { useTexture } from '@react-three/drei'

export default function Mars() {
    const texture = useTexture('/images/equirectangular/mars-equirectangular.jpg')

    return (
        <mesh>
            <sphereGeometry args={[0.003390, 64, 64]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}
