import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

import Scene from './components/Scene'
import CameraRig from './components/CameraRig'
import Overlay from './components/Overlay'
import Background from './components/Background'
import ProgressBar from './components/ProgressBar'
// Import both the Brain (default) and the UI (named) from DistanceScale
import DistanceScale, { DistanceScaleUI } from './components/DistanceScale'

export default function App() {
  // App.jsx only holds the metric state since both the Math and UI need to share it
  const [isMetric, setIsMetric] = useState(false)

  return (
    <>
      <Canvas>
        <ambientLight intensity={1} />
        <Background />
        <CameraRig />
        <Scene />

        {/* The Brain: Calculates math inside the 3D Canvas */}
        <DistanceScale isMetric={isMetric} />
      </Canvas>

      {/* The UI Elements: Rendered as flat HTML over the Canvas */}
      <DistanceScaleUI isMetric={isMetric} setIsMetric={setIsMetric} />
      <ProgressBar />
      <Overlay />
    </>
  )
}