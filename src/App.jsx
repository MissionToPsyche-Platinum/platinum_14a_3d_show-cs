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
import LandscapePrompt from './components/LandscapePrompt'
import SplashScreen from './components/SplashScreen'

export default function App() {
  const [isMetric, setIsMetric] = useState(true)
  const [splashDone, setSplashDone] = useState(false)

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

      <LandscapePrompt />
      {/* <DistanceScaleUI isMetric={isMetric} setIsMetric={setIsMetric} />
      <ProgressBar />
      <Overlay />
      <PlanetTooltip /> */}
      <DebugOverlay />
            {/* Dark overlay that blocks everything except the 3D canvas during splash */}
      {!splashDone && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'rgba(0,0,0,0.01)', // nearly transparent — just blocks pointer events
          pointerEvents: 'none',
        }} />
      )}

      <DistanceScaleUI isMetric={isMetric} setIsMetric={setIsMetric} />

      {/* Hide all UI until splash is done */}
      <div style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        <ProgressBar />
        <Overlay />
        <PlanetTooltip />
      </div>

      <SplashScreen onDone={() => setSplashDone(true)} />
    </>
  
  )
}