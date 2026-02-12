import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'

import Scene from './components/Scene'
import CameraRig from './components/CameraRig'
import Overlay from './components/Overlay'

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ position: 'fixed', top: 0, left: 0}}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Scroll Timeline */}
        <ScrollControls pages={3} damping={0.1}>
          <CameraRig />
          <Scene />
          <Scroll html>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}