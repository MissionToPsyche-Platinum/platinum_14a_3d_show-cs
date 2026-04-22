import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, EquirectangularReflectionMapping } from 'three'
import { useEffect } from 'react'

export default function Background() {
    const texture = useLoader(TextureLoader, `${import.meta.env.BASE_URL}images/milky-way-equirectangular.jpg`)
    const{ scene } = useThree()

    useEffect(() => {
        texture.mapping = EquirectangularReflectionMapping
        scene.background = texture
        scene.backgroundIntensity = 0.6
    }, [texture, scene])

    return null
}