import Model from './Model'
import Trajectory from './Trajectory'

// 3D Models
import Psyche from './models/Psyche'

// Configs
import { psycheConfig } from '../configs/psyche.config'
import { testTrajectoryConfig } from '../configs/test-trajectory.config.js'

// Trajectories
import SolarSystem from './trajectories/SolarSystem.jsx'

export default function Scene() {
  return (
    <>
      <SolarSystem position={[0, 0, 0]} speed={0.25} />
    </>
  )
}

/**
      <Model config={psycheConfig}>
        <Psyche />
      </Model>
      <Trajectory config={testTrajectoryConfig} />
*/