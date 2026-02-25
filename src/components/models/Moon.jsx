import { useTexture } from '@react-three/drei'

export default function Moon({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
    const texture = useTexture('/images/equirectangular/moon-equirectangular.jpg')
    
    return (
        <mesh position={position} scale={scale} rotation={rotation}>
            <sphereGeometry args={[1.74 * scale, 64, 64]} /> {/* in thousand km */}
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}