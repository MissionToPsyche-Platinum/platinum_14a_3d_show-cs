import Model from './Model'
import Trajectory from './Trajectory'

// 3D Models
import Psyche from './models/Psyche'
import PsycheSat from './models/PsycheSat'
import Mars from './models/Mars'
import Moon from './models/Moon'
import Earth from './models/Earth'

// Trajectories
import SolarSystem from './trajectories/SolarSystem.jsx'

// Configs
import { psycheIntroConfig } from '../configs/scenes/psyche-intro.config.js'
import { solarSystemConfig } from '../configs/scenes/solar-system.config.js'
import { earthConfig } from '../configs/scenes/earth.config.js'
import { psycheSatEarthConfig } from '../configs/scenes/psyche-sat-earth.config.js'
import { marsConfig } from '../configs/scenes/mars.config.js'

export default function Scene() {
  return (
    <>
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
    </>
    // <>
    // {/* Intro scene */}
    //   <Model config={psyche1Config}>
    //     <Psyche />
    //   </Model>
    //   <SolarSystem config={solarSystemConfig} />
    // {/* Scene 1: Earth and Psyche satellite scene */}
    //   <Model config={earth1Config}>
    //     <Earth />
    //   </Model>
    //   <Model config={psycheSat1Config}>
    //     <PsycheSat />
    //   </Model>
    // {/* Scene 2: Mars gravity assist scene */}
    //   <SolarSystem config={solarSystemCruise1Config} />
    //   <Model config={mars1Config}>
    //     <Mars />
    //   </Model>
    //   <Trajectory config={slingshotConfig} />
    // {/* Scene 3: Solar system cruise 2 */}
    //   <SolarSystem config={solarSystemCruise2Config} />
    // </>
  )
}