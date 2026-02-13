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
        const { radius = 10, speed = 1 } = this.config.orbit
        this.orbitAngle = (this.orbitAngle ?? 0) + delta * speed

        object.position.x = Math.cos(this.orbitAngle) * radius
        object.position.z = Math.sin(this.orbitAngle) * radius
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
        const { startVH, endVH } = this.config.visibility
        object.visible = scrollVH >= startVH && scrollVH <= endVH
    }
}