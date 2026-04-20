import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function HoverDetector() {
    const { camera, scene } = useThree()
    const raycaster = useRef(new THREE.Raycaster())

    useEffect(() => {
        const onMove = (e) => {
            const mouse = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            )

            raycaster.current.setFromCamera(mouse, camera)

            const targets = []
            scene.traverse(obj => {
                if (obj.isMesh && obj.userData?.isHoverable) {
                    let visible = true
                    let parent = obj
                    while (parent) {
                        if (!parent.visible) { visible = false; break }
                        parent = parent.parent
                    }
                    if (visible) targets.push(obj)
                }
            })

            const hits = raycaster.current.intersectObjects(targets, false)

            if (hits.length > 0) {
                const obj = hits[0].object
                const worldPos = new THREE.Vector3()
                obj.parent.getWorldPosition(worldPos)
                document.body.style.cursor = 'pointer'
                window.dispatchEvent(new CustomEvent('planetHover', {
                    detail: {
                        show: true,
                        name: obj.userData.name,
                        color: obj.userData.color,
                        info: obj.userData.info,
                        x: e.clientX,
                        y: e.clientY,
                        worldPos: { x: worldPos.x, y: worldPos.y, z: worldPos.z },
                    }
                }))
            } else {
                document.body.style.cursor = 'auto'
                window.dispatchEvent(new CustomEvent('planetHover', { detail: { show: false } }))
            }
        }

        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [camera, scene])

    return null
}
