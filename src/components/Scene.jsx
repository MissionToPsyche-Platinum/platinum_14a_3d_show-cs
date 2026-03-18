import Model from './Model'
import Trajectory from './Trajectory'

// 3D Models
import Psyche from './models/Psyche'
import Mars from './models/Mars'
import Moon from './models/Moon'
import Earth from './models/Earth'

// Configs
import { psycheConfig } from '../configs/psyche.config'
import { solarSystemConfig } from '../configs/solar-system.config.js'
import { testTrajectoryConfig } from '../configs/test-trajectory.config.js'

// Trajectories
import SolarSystem from './trajectories/SolarSystem.jsx'

export default function Scene() {
  return (
    <>
      <SolarSystem config={solarSystemConfig} />
      <Trajectory config={testTrajectoryConfig} />
      <Model config={psycheConfig}>
        <Psyche />
      </Model>
    </>
  )
}

/**
      <Model config={psycheConfig}>
        <Psyche />
      </Model>
      <Trajectory config={testTrajectoryConfig} />
*/