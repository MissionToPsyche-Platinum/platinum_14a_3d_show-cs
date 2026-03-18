import { Canvas } from '@react-three/fiber'

import Scene from './components/Scene'
import CameraRig from './components/CameraRig'
import Overlay from './components/Overlay'
import Background from './components/Background'

export default function App() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={1} />

        <Background />
        <CameraRig />
        <Scene />
      </Canvas>
      <Overlay />
    </>
  )
}