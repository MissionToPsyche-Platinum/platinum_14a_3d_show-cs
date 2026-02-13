import { Canvas } from '@react-three/fiber'

import Scene from './components/Scene'
import CameraRig from './components/CameraRig'
import Overlay from './components/Overlay'

export default function App() {
  return (
    <>
      <Canvas>
        {/* Temporary Lights */}
        <ambientLight intensity={1} />

        <CameraRig />
        <Scene />
      </Canvas>
      <Overlay />
    </>
  )
}