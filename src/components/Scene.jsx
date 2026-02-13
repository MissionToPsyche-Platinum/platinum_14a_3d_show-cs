import Model from './Model'

// 3D Models
import Psyche from './models/Psyche'

// Configs
import { psycheConfig } from '../configs/psyche.config'

export default function Scene() {
  return (
    <>
      <Model config={psycheConfig}>
        <Psyche />
      </Model>
    </>
  )
}