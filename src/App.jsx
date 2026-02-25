import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

import Scene from './components/Scene'
import CameraRig from './components/CameraRig'
import Overlay from './components/Overlay'
import Background from './components/Background'
import DistanceScale from './components/DistanceScale'
import ProgressBar from './components/ProgressBar'

export default function App() {
  const [showScaleInfo, setShowScaleInfo] = useState(false)
  // Add the state for the Metric/Imperial toggle (default to Imperial/false)
  const [isMetric, setIsMetric] = useState(false)

  return (
    <>
      <Canvas>
        <ambientLight intensity={1} />
        <Background />
        <CameraRig />
        <Scene />

        {/* Pass the state into the DistanceScale Brain */}
        <DistanceScale isMetric={isMetric} />
      </Canvas>

      <div
        // Add onClick to flip the state
        onClick={() => setIsMetric(!isMetric)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          zIndex: 1010,
          pointerEvents: 'auto',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          fontVariantNumeric: 'tabular-nums', // Anti-Jitter fix
          textShadow: '1px 1px 2px black'
        }}
        onMouseEnter={() => setShowScaleInfo(true)}
        onMouseLeave={() => setShowScaleInfo(false)}
      >
        <div style={{
          position: 'absolute',
          bottom: '100%',
          right: '0',
          marginBottom: '15px',
          width: '260px',
          padding: '12px 16px',
          backgroundColor: 'rgba(10, 10, 10, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: '#e0e0e0',
          fontSize: '12px',
          lineHeight: '1.5',
          textAlign: 'right',
          backdropFilter: 'blur(4px)',
          boxShadow: '0px 4px 15px rgba(0,0,0,0.5)',
          opacity: showScaleInfo ? 1 : 0,
          transform: showScaleInfo ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          pointerEvents: 'none'
        }}>
          This scale indicates the physical distance represented by the 100px line below. <br /><br />
          <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Click to toggle between Metric (km) and Imperial (mi).</span>
        </div>

        <div
          id="scale-text"
          style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}
        >
          Calculating...
        </div>

        <div
          id="scale-analogy"
          style={{ color: '#aaaaaa', fontSize: '11px', marginBottom: '4px', fontStyle: 'italic' }}
        ></div>

        <div style={{
          width: '100px',
          height: '6px',
          borderBottom: '2px solid white',
          borderLeft: '2px solid white',
          borderRight: '2px solid white',
          boxShadow: '0px 1px 2px rgba(0,0,0,0.5)',
          opacity: showScaleInfo ? 1 : 0.8,
          transition: 'opacity 0.3s',
        }} />
      </div>

      <ProgressBar />
      <Overlay />
    </>
  )
}