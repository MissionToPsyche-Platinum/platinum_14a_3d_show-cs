import { useTexture } from '@react-three/drei'

export default function Earth() {
    const texture = useTexture(`${import.meta.env.BASE_URL}images/equirectangular/earth-equirectangular.jpg`)
    const cloudTexture = useTexture(`${import.meta.env.BASE_URL}images/equirectangular/earth-clouds-equirectangular.jpg`)

    return (
        <group>
            <mesh>
                <sphereGeometry args={[0.006371, 64, 64]} />
                <meshStandardMaterial map={texture} transparent opacity={1} />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.006371 * 1.01, 64, 64]} />
                <meshStandardMaterial alphaMap={cloudTexture} transparent opacity={0.6} />
            </mesh>
        </group>
    )
}
