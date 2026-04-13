import Model from './Model'
import Trajectory from './Trajectory'
import HoverDetector from './HoverDetector'

// 3D Models
import Psyche from './models/Psyche'
import PsycheSat from './models/PsycheSat'
import Mars from './models/Mars'
import Moon from './models/Moon'
import Earth from './models/Earth'

// Trajectories
import SolarSystem from './trajectories/SolarSystem.jsx'
import { orbitAConfig } from '../configs/scenes/orbit-a.config.js'
import { orbitBConfig } from '../configs/scenes/orbit-b.config.js'
import { orbitCConfig } from '../configs/scenes/orbit-c.config.js'
import { orbitDConfig } from '../configs/scenes/orbit-d.config.js'
import { psycheTrajectoryConfig } from '../configs/scenes/psyche-trajectory.config.js'

// Configs
import { psycheIntroConfig } from '../configs/scenes/psyche-intro.config.js'
import { solarSystemConfig } from '../configs/scenes/solar-system.config.js'
import { earthConfig } from '../configs/scenes/earth.config.js'
import { psycheSatEarthConfig } from '../configs/scenes/psyche-sat-earth.config.js'
import { marsConfig } from '../configs/scenes/mars.config.js'
import { psycheConfig } from '../configs/scenes/psyche.config.js'
import { psycheSatAsteroidConfig } from '../configs/scenes/psyche-sat-asteroid.config.js'

export default function Scene() {
  return (
    <>
      <HoverDetector />
      <Model config={psycheIntroConfig}>
        <Psyche />
      </Model>
      <SolarSystem config={solarSystemConfig} />
      <Model config={earthConfig}>
        <Earth />
      </Model>
      <Model config={psycheSatEarthConfig}>
        <PsycheSat />
      </Model>
      <Model config={marsConfig}>
        <Mars />
      </Model>
      <Model config={psycheConfig}>
        <Psyche />
      </Model>
      <Trajectory config={orbitAConfig} />
      <Trajectory config={orbitBConfig} />
      <Trajectory config={orbitCConfig} />
      <Trajectory config={orbitDConfig} />
      <Model config={psycheSatAsteroidConfig}>
        <PsycheSat />
      </Model>
      <Trajectory config={psycheTrajectoryConfig} />
    </>
  )
}