import { useState, useEffect } from 'react'
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

import { splash } from './configs/splash.config.js'

export default function App() {
  const [isMetric, setIsMetric] = useState(true)
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollVH = window.scrollY / window.innerHeight
      setSplashDone(scrollVH > 0.25)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      {/* <DistanceScaleUI isMetric={isMetric} setIsMetric={setIsMetric} />
      <ProgressBar />
      <Overlay />
      <PlanetTooltip /> */}
      <DebugOverlay />


      <DistanceScaleUI isMetric={isMetric} setIsMetric={setIsMetric} />
      
      <SplashScreen config={splash}></SplashScreen>
      {/* Hide all UI until splash is done */}
      <div style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        <ProgressBar />
        <Overlay />
        <PlanetTooltip />
        <DebugOverlay />
      </div>

      {/* <ProgressBar /> */}
      {/* <Overlay /> */}
      {/* <PlanetTooltip />
      <DebugOverlay /> */}

      {/* <SplashScreen onDone={() => setSplashDone(true)} /> */}
      <LandscapePrompt />
    </>

  )
}