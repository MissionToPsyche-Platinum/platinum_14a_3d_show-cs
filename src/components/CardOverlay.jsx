import { useRef, useEffect } from 'react'
import CardOverlayController from './CardOverlayController'

export default function CardOverlay({ config = {}, children }) {
    const divRef = useRef(null)
    const controller = useRef(null)

    useEffect(() => {
        if (!controller.current && divRef.current) {
            controller.current = new CardOverlayController(
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