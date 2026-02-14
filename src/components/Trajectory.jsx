import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import TrajectoryController from './TrajectoryController'

export default function Trajectory({ config = {} }) {
    const controller = useRef(null)

    // Create controller once
    if (!controller.current) {
        controller.current = new TrajectoryController(config)
    }
    
    useFrame(() => {
        controller.current.update()
    })

    return (
        <primitive object={controller.current.group} />
    )
}