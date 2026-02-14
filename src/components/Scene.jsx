import Model from './Model'
import Trajectory from './Trajectory'

// 3D Models
import Psyche from './models/Psyche'

// Configs
import { psycheConfig } from '../configs/psyche.config'
import { testTrajectoryConfig } from '../configs/test-trajectory.config.js'

export default function Scene() {
  return (
    <>
      <Model config={psycheConfig}>
        <Psyche />
      </Model>
      <Trajectory config={testTrajectoryConfig} />
    </>
  )
}