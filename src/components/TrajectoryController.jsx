import * as THREE from 'three'

export default class TrajectoryController {
    constructor(config = {}) {
        this.config = config
        this.group = new THREE.Group()

        this.progress = 0
        this.curve = this.createCurve()

        this.trajectoryLine = this.createTrajectoryLine()
        this.icon = this.createIcon()

        this.group.add(this.trajectoryLine)
        this.group.add(this.icon)
    }

    createCurve() {
        switch (this.config.type) {
            case 'circle':
                return this.createCircleCurve()
            case 'spline':
                return this.createSplineCurve()
            case 'ellipse':
                return this.createEllipseCurve()
            default:
                return this.createCircleCurve()
        }
    }

    createCircleCurve() {
        const { radius = 1, center = [0, 0, 0], axis = [0, 1, 0], startAngle = 0 } = this.config.circle

        const axisVector = new THREE.Vector3(...axis).normalize()
        const centerVector = new THREE.Vector3(...center)

        let startVector = new THREE.Vector3(1, 0, 0)
        if (axisVector.dot(startVector) > 0.9) {
            startVector = new THREE.Vector3(0, 1, 0)
        }

        startVector.cross(axisVector).normalize().multiplyScalar(radius)

        const startQuaternion = new THREE.Quaternion().setFromAxisAngle(axisVector, THREE.MathUtils.degToRad(startAngle))
        startVector.applyQuaternion(startQuaternion)

        const points = []
        const segments = 128
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2
            const quaternion = new THREE.Quaternion().setFromAxisAngle(axisVector, angle)
            points.push(startVector.clone().applyQuaternion(quaternion).add(centerVector))
        }

        return new THREE.CatmullRomCurve3(points, true)
    }

    createSplineCurve() {
        const { points, offset = [0, 0, 0], closed = false } = this.config.spline
        const offsetVec = new THREE.Vector3(...offset)

        return new THREE.CatmullRomCurve3(
            points.map(p => new THREE.Vector3(...p).add(offsetVec)),
            closed
        )
    }

    createEllipseCurve() {
        const {
            radiusX = 1,
            radiusZ = 1,
            center = [0, 0, 0],
            axis = [0, 1, 0],
            startAngle = 0,
            rotationOffset = [0, 0, 0],
            referenceDir,
        } = this.config.ellipse

        const axisVector = new THREE.Vector3(...axis).normalize()
        const centerVector = new THREE.Vector3(...center)

        let perpendicularVector
        if (referenceDir) {
            perpendicularVector = new THREE.Vector3(...referenceDir).normalize()
        } else {
            let startVector = new THREE.Vector3(1, 0, 0)
            if (axisVector.dot(startVector) > 0.9) startVector = new THREE.Vector3(0, 1, 0)
            perpendicularVector = new THREE.Vector3().crossVectors(axisVector, startVector).normalize()
        }

        const orthogonalVector = new THREE.Vector3().crossVectors(axisVector, perpendicularVector).normalize()

        const startQuaternion = new THREE.Quaternion().setFromAxisAngle(axisVector, THREE.MathUtils.degToRad(startAngle))

        const rotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            THREE.MathUtils.degToRad(rotationOffset[0]),
            THREE.MathUtils.degToRad(rotationOffset[1]),
            THREE.MathUtils.degToRad(rotationOffset[2])
        ))

        const points = []
        const segments = 128
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2
            const point = perpendicularVector.clone().multiplyScalar(Math.cos(angle) * radiusX)
                .add(orthogonalVector.clone().multiplyScalar(Math.sin(angle) * radiusZ))
                .applyQuaternion(startQuaternion)
                .add(centerVector)
                .applyQuaternion(rotationQuaternion)
            points.push(point)
        }

        return new THREE.CatmullRomCurve3(points, true)
    }

    createTrajectoryLine() {
        const { color = 0xffffff, opacity = 1 } = this.config.style

        this.baseOpacity = opacity

        const geometry = new THREE.BufferGeometry()
        const material = new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity,
        })
        material.userData.baseOpacity = opacity

        this.lineMaterial = material

        const line = new THREE.Line(geometry, material)

        if (this.config.type === 'circle' || this.config.type === 'ellipse') {
            geometry.setFromPoints(this.curve.getPoints(256))
        }

        return line
    }

    createIcon() {
        const { type = 'hexagon', size = 3, color = 0xffffff, opacity = 1 } = this.config.icon || {}

        const points = []
        if (type === 'circle') {
            const segments = 32
            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * Math.PI * 2
                points.push(new THREE.Vector3(Math.cos(angle) * size, Math.sin(angle) * size, 0))
            }
        } else if (type === 'hexagon') {
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2
                points.push(new THREE.Vector3(Math.cos(angle) * size, Math.sin(angle) * size, 0))
            }
        } else return
        points.push(points[0].clone())

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity,
        })
        material.userData.baseOpacity = opacity

        const mesh = new THREE.LineLoop(geometry, material)
        const group = new THREE.Group()
        group.add(mesh)

        const hitboxGeo = new THREE.SphereGeometry(size * 1.5, 8, 8)
        const hitboxMat = new THREE.MeshBasicMaterial({ visible: false, side: THREE.FrontSide })
        const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat)
        hitbox.userData = {
            isHoverable: true,
            name: this.config.planetName,
            color: this.config.icon?.color ?? 0xffffff,
            info: this.config.info ?? null,
        }
        group.add(hitbox)

        mesh.onBeforeRender = (renderer, scene, camera) => {
            const distance = group.position.distanceTo(camera.position)
            const vFOV = THREE.MathUtils.degToRad(camera.fov)
            const visibleWorldHeight = 2 * distance * Math.tan(vFOV / 2)
            const worldUnitsPerPixel = visibleWorldHeight / renderer.domElement.clientHeight
            const worldScale = size * (window.innerHeight / 1080) * worldUnitsPerPixel

            mesh.scale.set(worldScale, worldScale, 1)
            hitbox.scale.set(worldScale, worldScale, worldScale)

            mesh.quaternion.copy(camera.quaternion)
        }

        return group
    }

    update() {
        const scrollVH = window.scrollY / window.innerHeight
        if (this.config.visibility) this.visibility(scrollVH)
        if (this.config.motion) this.motion(scrollVH)
    }

    visibility(scrollVH) {
        const { startVH, endVH, fadeInDuration = 0, fadeOutDuration = 0 } = this.config.visibility

        if (scrollVH < startVH - fadeInDuration || scrollVH > endVH + fadeOutDuration) {
            this.group.visible = false
            return
        }

        this.group.visible = true
        let opacity = 1

        if (fadeInDuration > 0 && scrollVH < startVH) {
            opacity = THREE.MathUtils.clamp((scrollVH - (startVH - fadeInDuration)) / fadeInDuration, 0, 1)
        }

        if (fadeOutDuration > 0 && scrollVH > endVH) {
            opacity = THREE.MathUtils.clamp(1 - (scrollVH - endVH) / fadeOutDuration, 0, 1)
        }

        this.setOpacity(opacity)
    }

    setOpacity(opacity) {
        this.group.traverse(child => {
            if (!child.material) return
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach(material => {
                if (!material) return
                const baseOpacity = material.userData.baseOpacity ?? 1

                material.transparent = true
                material.opacity = opacity * baseOpacity
                material.depthWrite = opacity >= 0.99
                material.depthTest = true
            })
        })
    }

    motion(scrollVH) {
        const { startVH = 0, durationVH, speed } = this.config.motion
        const t = (scrollVH - startVH)
        if (scrollVH < startVH) {
            this.setProgress(0)
        } else {
            if (durationVH !== undefined) {
                if (speed !== undefined) {
                    this.setProgress(Math.min(t, durationVH) * speed)
                } else {
                    this.setProgress(THREE.MathUtils.clamp(t / durationVH, 0, 1))
                }
            } else if (speed !== undefined) {
                this.setProgress(t * speed)
            }
        }
    }

    setProgress(t) {
        if (!this.curve) return

        if (this.config.type === 'circle' || this.config.type === 'ellipse') {
            t = t % 1
        } else if (this.config.type === 'spline') {
            t = THREE.MathUtils.clamp(t, 0, 1)
        }

        this.progress = t

        const position = this.curve.getPointAt(t)
        this.icon.position.copy(position)

        if (this.config.type === 'spline') {
            const { segments = 256 } = this.config.spline
            const points = []
            for (let i = 0; i <= segments; i++) {
                const segmentT = i / segments
                if (segmentT > t) break
                points.push(this.curve.getPointAt(segmentT))
            }
            this.trajectoryLine.geometry.dispose()
            this.trajectoryLine.geometry = new THREE.BufferGeometry().setFromPoints(points)
        }
    }
}