import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

import Scene from './components/Scene'
import CameraRig from './components/CameraRig'
import Overlay from './components/Overlay'
import Background from './components/Background'
import ProgressBar from './components/ProgressBar'
import DistanceScale, { DistanceScaleUI } from './components/DistanceScale'
import PlanetTooltip from './components/PlanetTooltip'
import DebugOverlay from './components/DebugOverlay'

export default function App() {
  const [isMetric, setIsMetric] = useState(false)

  return (
    <>
      <Canvas gl={{ logarithmicDepthBuffer: true }}>
        <ambientLight intensity={0.1} />
        <pointLight intensity={500} position={[0, 0, 0]} distance={0} decay={1} /> {/* Sun */}
        <Background />
        <CameraRig />
        <Scene />
        <DistanceScale isMetric={isMetric} />
      </Canvas>

      <DistanceScaleUI isMetric={isMetric} setIsMetric={setIsMetric} />
      <ProgressBar />
      <Overlay />
      <PlanetTooltip />
      <DebugOverlay />
    </>
  )
}