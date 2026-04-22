import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping } from 'three'
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
import GamePrompt from './components/GamePrompt'
import PsycheGame from './components/PsycheGame'

import { splash } from './configs/splash.config.js'

export default function App() {
  const [isMetric, setIsMetric] = useState(true)
  const [splashDone, setSplashDone] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const keyBufferRef = useRef('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollVH = window.scrollY / window.innerHeight
      setSplashDone(scrollVH > 0.25)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.length !== 1) return
      keyBufferRef.current = (keyBufferRef.current + e.key.toLowerCase()).slice(-6)
      if (keyBufferRef.current === 'psyche') {
        setShowPrompt(true)
        keyBufferRef.current = ''
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Canvas gl={{ logarithmicDepthBuffer: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.0 }}>
        <ambientLight intensity={0.05} />
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

      {showPrompt && !showGame && (
        <GamePrompt
          onPlay={() => { setShowPrompt(false); setShowGame(true) }}
          onDismiss={() => setShowPrompt(false)}
        />
      )}
      {showGame && <PsycheGame onClose={() => setShowGame(false)} />}
    </>
  )
}