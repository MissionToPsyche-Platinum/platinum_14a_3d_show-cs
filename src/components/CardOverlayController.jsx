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
        const { startVH = 0, endVH = 1 } = this.config.visibility
        const visible = scrollVH >= startVH && scrollVH <= endVH

        this.element.style.display = visible ? 'block' : 'none'
    }

    dispose() {
        window.removeEventListener('scroll', this.onScroll)
    }
}