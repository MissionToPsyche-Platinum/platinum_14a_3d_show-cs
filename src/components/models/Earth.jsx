import { useTexture } from '@react-three/drei'

export default function Earth({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
    const texture = useTexture('/images/equirectangular/earth-equirectangular.jpg')
    const cloudTexture = useTexture('/images/equirectangular/earth-clouds-equirectangular.jpg')
    
    return (
        <group position={position} scale={scale} rotation={rotation}>
            <mesh>
                <sphereGeometry args={[6.37 * scale, 64, 64]} /> {/* in thousand km */}
                <meshStandardMaterial map={texture} />
            </mesh>
            <mesh>
                <sphereGeometry args={[6.37 * scale * 1.01, 64, 64]} /> {/* in thousand km */}
                <meshStandardMaterial map={cloudTexture} transparent opacity={0.6} />
            </mesh>
        </group>
    )
}