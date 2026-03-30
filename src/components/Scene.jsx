import Model from './Model'
import Trajectory from './Trajectory'

// 3D Models
import Psyche from './models/Psyche'
import PsycheSat from './models/PsycheSat'
import Mars from './models/Mars'
import Moon from './models/Moon'
import Earth from './models/Earth'

// Configs: Intro Scene
import { psyche1Config } from '../configs/scenes/intro/psyche1.config.js'
import { solarSystemConfig } from '../configs/scenes/intro/solar-system-static-1.config.js'

// Configs: Scene 1: Earth and Psyche satellite scene
import { earth1Config } from '../configs/scenes/scene1/earth1.config.js'
import { psycheSat1Config } from '../configs/scenes/scene1/psyche-sat1.config.js'

// Configs: Scene 2: Mars gravity assist scene
import { solarSystemCruise1Config } from '../configs/scenes/scene2/solar-system-cruise1.config.js'

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
    {/* Scene 1: Earth and Psyche satellite scene */}
      <Model config={earth1Config}>
        <Earth />
      </Model>
      <Model config={psycheSat1Config}>
        <PsycheSat />
      </Model>
    {/* Scene 2: Mars gravity assist scene */}
      <SolarSystem config={solarSystemCruise1Config} />
    </>
  )
}