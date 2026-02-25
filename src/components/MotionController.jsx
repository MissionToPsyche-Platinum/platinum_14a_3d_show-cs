import * as THREE from 'three'

export default class MotionController {
    constructor(config = {}) {
        this.config = config
        this.time = 0

        // Spline path if exists
        if (config.path?.points) {
            this.curve = new THREE.CatmullRomCurve3(
                config.path.points.map(p => new THREE.Vector3(...p)),
                config.path.closed ?? false
            )
        }

        this.startVH = config.path?.startVH ?? 0
        this.durationVH = config.path?.durationVH ?? 0
    }

    // Updates all properties based on time and config
    update(object, delta) {
        const scrollVH = window.scrollY / window.innerHeight

        // Motion properties
        if (this.config.spin) this.spin(object, delta)
        if (this.config.orbit) this.orbit(object, delta)
        if (this.config.path && !this.config.orbit) {
            this.path(object, scrollVH)
        }
        if (this.config.visibility) this.visibility(object, scrollVH)
        if (this.config.lookAt && !this.config.spin) {
            object.lookAt(...this.config.lookAt)
        }
    }

    // Rotates the object around an axis
    spin(object, delta) {
        const { speed = 1, axis = 'y' } = this.config.spin
        object.rotation[axis] += delta * speed
    }

    // Object follows an orbit
    orbit(object, delta) {
        const { 
            radius = 10,
            speed = 1,
            center = [0, 0, 0],
            axis = [0, 1, 0],
        } = this.config.orbit

        // Increment orbit angle based on speed and delta time
        this.orbitAngle = (this.orbitAngle ?? 0) + delta * speed

        // Get normalized axis vector
        const axisVector = new THREE.Vector3(...axis).normalize()

        // Pick a vector perpendicular to the axis to start the orbit
        let startVector
        if (Math.abs(axisVector.x) < 0.9) {
            startVector = new THREE.Vector3(1, 0, 0).cross(axisVector).normalize()
        } else {
            startVector = new THREE.Vector3(0, 1, 0).cross(axisVector).normalize()
        }

        // Scale by radius
        startVector.multiplyScalar(radius)

        // Rotate around the axis
        const quaternion = new THREE.Quaternion()
        quaternion.setFromAxisAngle(axisVector, this.orbitAngle)
        startVector.applyQuaternion(quaternion)

        // Offset by center and update
        startVector.add(new THREE.Vector3(...center))
        object.position.copy(startVector)
    }

    // Object follows a predefined path
    path(object, scrollVH) {
        if (!this.curve || !this.durationVH) return

        if ( scrollVH < this.startVH || scrollVH > this.startVH + this.durationVH ) return // Do not update if outside of path range

        const localT = THREE.MathUtils.clamp(
            (scrollVH - this.startVH) / this.durationVH,
            0,
            1
        )

        const t = THREE.MathUtils.smoothstep(localT, 0, 1)
        this.curve.getPointAt(t, object.position)
    }

    // Set object visibility
    visibility(object, scrollVH) {
        const { startVH, endVH, fadeInDuration = 0, fadeOutDuration = 0} = this.config.visibility

        if (scrollVH < startVH - fadeInDuration || scrollVH > endVH + fadeOutDuration) {
            object.visible = false
            return
        }

        object.visible = true
        let opacity = 1

        // Fade in
        if (fadeInDuration > 0 && scrollVH < startVH) {
            opacity = THREE.MathUtils.clamp((scrollVH - (startVH - fadeInDuration)) / fadeInDuration, 0, 1)
        }

        // Fade out
        if (fadeOutDuration > 0 && scrollVH > endVH) {
            opacity = THREE.MathUtils.clamp(1 - (scrollVH - endVH) / fadeOutDuration, 0, 1)
        }
        
        this.setOpacity(object, opacity)
    }

    setOpacity(object, opacity) {
        object.traverse(child => {
            if (!child.isMesh) return
            
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach(material => {
                if (!material) return

                material.transparent = true
                material.opacity = opacity
                material.side = THREE.FrontSide // Prevent rendering inside texture when fading out
                material.depthWrite = opacity >= 0.99
                material.depthTest = true
            })
        })
    }
}