import Model from './Model'
import Trajectory from './Trajectory'

// 3D Models
import Psyche from './models/Psyche'
import PsycheSat from './models/PsycheSat'
import Mars from './models/Mars'
import Moon from './models/Moon'
import Earth from './models/Earth'

// Configs: Intro Scene
import { psyche1Config } from '../configs/intro/psyche1.config.js'
import { solarSystemConfig } from '../configs/intro/solar-system.config.js'
import { earth1Config } from '../configs/intro/earth1.config.js'
import { psycheSat1Config } from '../configs/intro/psyche-sat1.config.js'

// Trajectories
import SolarSystem from './trajectories/SolarSystem.jsx'

export default function Scene() {
  return (
    <>
    {/* Intro scene */}
      <Model config={psyche1Config}>
        <Psyche />
      </Model>
      <SolarSystem config={solarSystemConfig} />
      <Model config={earth1Config}>
        <Earth />
      </Model>
      <Model config={psycheSat1Config}>
        <PsycheSat />
      </Model>
    </>
  )
}