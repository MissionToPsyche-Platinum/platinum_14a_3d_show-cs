import Model from './Model'
import Trajectory from './Trajectory'

// 3D Models
import Psyche from './models/Psyche'

// Configs
import { psycheConfig } from '../configs/psyche.config'
import { testTrajectoryConfig } from '../configs/testfile.config.js'

// Trajectories
import SolarSystem from './trajectories/SolarSystem.jsx'

export default function Scene() {
  return (
    <>
      <SolarSystem position={[0, 0, 0]} speed={0.25} />
      {/* <Trajectory config={testTrajectoryConfig} /> */}
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