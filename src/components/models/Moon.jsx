import { useTexture } from '@react-three/drei'

export default function Moon() {
    const texture = useTexture(`${import.meta.env.BASE_URL}images/equirectangular/moon-equirectangular.jpg`)

    return (
        <mesh>
            <sphereGeometry args={[0.001737, 64, 64]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}
