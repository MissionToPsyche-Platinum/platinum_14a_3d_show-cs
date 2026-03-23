import { useRef, useEffect } from 'react'
import TimeOverlayController from './TimeOverlayController'

export default function TimeOverlay({ config = {}, children }) {
    const divRef = useRef(null)
    const controller = useRef(null)

    useEffect(() => {
        if (!controller.current && divRef.current) {
            controller.current = new TimeOverlayController(
                divRef.current,
                config
            )
        }
    })

    return (
        <div ref={divRef}>
            {children}
        </div>
    )
}