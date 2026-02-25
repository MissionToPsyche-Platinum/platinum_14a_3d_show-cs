import { useTexture } from '@react-three/drei'

export default function Mars({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
    const texture = useTexture('/images/equirectangular/mars-equirectangular.jpg')
    
    return (
        <mesh position={position} scale={scale} rotation={rotation}>
            <sphereGeometry args={[3.39 * scale, 64, 64]} /> {/* in thousand km */}
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}