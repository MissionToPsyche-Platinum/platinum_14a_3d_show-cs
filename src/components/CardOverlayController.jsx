export default class CardOverlayController {
    constructor(element, config = {}) {
        this.element = element
        this.config = config

        this.onScroll = this.update.bind(this)
        window.addEventListener('scroll', this.onScroll)

        this.update()
    }

    update() {
        const scrollVH = window.scrollY / window.innerHeight

        if (this.config.visibility) {
            this.visibility(scrollVH)
        }
    }

    visibility(scrollVH) {
        const { startVH = 0, endVH = 1, fadeInDuration = 0, fadeOutDuration = 0 } = this.config.visibility

        if (scrollVH < startVH - fadeInDuration || scrollVH > endVH + fadeOutDuration) {
            this.element.style.display = 'none'
            return
        }
        
        this.element.style.display = 'block'
        let opacity = 1

        // Fade in
        if (fadeInDuration > 0 && scrollVH < startVH) {
            opacity = Math.min(1, Math.max(0, (scrollVH - (startVH - fadeInDuration)) / fadeInDuration))
        }

        // Fade out
        if (fadeOutDuration > 0 && scrollVH > endVH) {
            opacity = Math.min(1, Math.max(0, 1 - (scrollVH - endVH) / fadeOutDuration))
        }

        this.element.style.opacity = opacity
    }

    dispose() {
        window.removeEventListener('scroll', this.onScroll)
    }
}