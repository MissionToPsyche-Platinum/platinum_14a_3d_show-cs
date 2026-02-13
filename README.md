# Psyche 3D Webpage

This project is a 3D website build with **React** and **Three.js** for the Psyche mission visualization. Users scroll through a 3D scene with models like Earth and the Psyche asteroid, along with overlay text content.

---

## Project Structure

- `src/` - React components and 3D scene files
- `src/components/` - Contains `Scene.jsx`, `CameraRig.jsx`, `Overlay.jsx`, `Model.jsx`, `MotionController.jsx`, etc.
- `src/styles/` - Contains CSS stylesheets for root, canvas, overlay, etc.
- `src/config/` - Configuration files for Models and CameraRig
- `src/components/models` - Object models that can be used in the 3D environment
- `public/models` - GLB model files

---

## Getting Started (Team Setup)

Follow these steps to get your local environment ready in vs code and ensure your branch is selected and up-to-date with main.

### 1. Create a folder for the project

```bash
mkdir Psyche-3D-Webpage-Project
cd Psyche-3D-Webpage-Project
```
Enter that folder in vs code and open a terminal.

### 2. Clone the repository

```bash
git clone https://github.com/MissionToPsyche-Platinum/platinum_14a_3s_show-cs.git
cd platinum_14a_3s_show-cs
```

### 3. Switch to your assigned branch:

```bash
git fetch -all
git branch -a
```
Find your branch (your name).
```bash
git checkout your-name
```

### 4. Make your branch match main

```bash
git fetch origin
git merge origin/main
```
This should make your branch up-to-date with main.

### 5. Install Node.js and npm

Make sure Node.js (v24 recommended) and npm are installed:
```bash
node -v
npm -v
```
If not installed, download from https://nodejs.org

### 6. Install project dependencies

```bash
npm install
```
Installs React, Three.js, and other dependencies from `package.json`.

### 7. Start the development local host
```bash
npm start
```
This opens a local server that will update as you make changes.
Sometimes you may need to refresh the page to get changes.

---

## Camera System

CameraRig.jsx
- Controls the main camera
- Moves camera along splines
- Using duration-based segments in VH (View Height)
Camera motion is defined entirely in `src/configs/camera-rig.config.js`

Example: `src/configs/camera-rig.config.js`
```javascript
export const cameraTimeLine = [
    {
        durationVH: 3,
        position: [
            [0, 0, 30],
            [5, 2, 35],
            [10, 5, 40]
        ],
        lookAt: [
            [0, 0, 0],
            [0, 0, 0]
        ],
    },
    {
        durationVH: 1,
        position: [
            [10, 5, 40],
            [10, 5, 40]
        ],
        lookAt: [
            [0, 0, 0],
            [0, 0, 0]
        ]
    }
]
```

---

## Model Motion System

The model system is designed to make inserting objects into the environment simple and easy. There are a few configurations that help simulate a space-like environment:
- `spin` - Controls the rotation of the object using time.
- `orbit` - Allows you to have an object orbit around a specific point in space at a certain radius using time.
- `path` - If orbit isn't defined, the object will follow the spline path using VH.
- `visibility` - Controls if an object is visible using VH.
- `lookAt` - If spin isn't defined, the object will face a specific point in space.

### Creating models

Models should be stored in `public/models/` as a GLB file. The will also have an associated file in `src/components/models/` as a JSX file that will link the object to the GLB model.
Example: `src/components/models/Psyche.jsx`
```javascript
import { useGLTF } from '@react-three/drei'

export default function Psyche({position = [0, 0, 0], scale = 1, rotation = [0, 0, 0]}) { // Default location, scale, and rotation
    const gltf = useGLTF('/models/Psyche.glb')

    return (
        <primitive
            object={gltf.scene}
            position={position}
            scale={scale}
            rotation={rotation}
        />
    )
}
```

### Adding a model to the environment

To add a model to the environment, you need a configuration file and a model.
Example: `src/components/Scene.jsx`
```javascript
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
```

### Creating a configuration file

Each model needs a configuration file for it to be added to the 3D environment. Configuration files contain information about motion properties for `MotionController.jsx`. Below an example of a blank configuration file (no motion).
Example: `src/configs/psyche.config.js`
```javascript
export const psycheConfig = {
    position: [0, 0, 0],
    scale: 1,
    rotation: [0, 0, 0],
}
```
To config motion properties, add a property and define the necessary parameters. Below are example of motion properties.

#### Spin
Controls the rotation of the object using time.
```javascript
spin: {
    speed: 0.2,
    axis: 'y',
}
```

#### Orbit
Allows you to have an object orbit around a specific point in space at a certain radius using time.
```javascript
orbit: {
    radius: 10,
    speed: 1,
    center: [0, 0, 0],
    axis: [0, 0, 1],
}
```

#### Path
If orbit isn't defined, the object will follow the spline path using VH.
```javascript
path: {
    startVH: 1,
    durationVH: 3,
    points: [
        [0, 0, 0],
        [10, 5, -10],
        [30, 10, -30],
    ]
}
```

#### Visibility
Controls if an object is visible using VH.
```javascript
visibility: {
    startVH: 0,
    endVH: 5,
}
```

#### Look At
If spin isn't defined, the object will face a specific point in space.
```javascript
lookAt: [0, 0, 0]
```

---
