import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import MotionController from './MotionController'

export default function Model({ config = {}, children }) {
    const ref = useRef()
    const controller = useRef(null)

    // Create controller once
    if (!controller.current) {
        controller.current = new MotionController(config)
    }
    
    useFrame((state, delta) => {
        if (ref.current) {
            controller.current.update(ref.current, delta)
        }
    })

    return (
        <group
            ref={ref}
            position={config.position}
            rotation={config.rotation}
            scale={config.scale}
        >
            {children}
        </group>
    )
}