export default class TimeOverlayController {
    constructor(element, config = {}) {
        this.element = element
        this.heading = this.element.querySelector('h1')
        this.config = config

        this.onScroll = this.update.bind(this)
        window.addEventListener('scroll', this.onScroll)

        this.update()
    }

    update() {
        const scrollVH = window.scrollY / window.innerHeight
        const activeSegment = this.getActiveSegment(scrollVH)

        if (!activeSegment) {
            this.element.style.display = 'none'
            return
        }
        
        this.visibility(scrollVH, activeSegment)
        this.updateTime(scrollVH, activeSegment)
    }

    getActiveSegment(scrollVH) {
        const timeline = this.config

        return timeline.find((segment) => {
            const { startVH = 0, endVH = 0, fadeInDuration = 0, fadeOutDuration = 0 } = segment.visibility

            return scrollVH >= (startVH - fadeInDuration) &&
                   scrollVH <= (endVH + fadeOutDuration)
        }) || null
    }

    visibility(scrollVH, activeSegment) {
        const { startVH = 0, endVH = 1, fadeInDuration = 0, fadeOutDuration = 0 } = activeSegment.visibility

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

    updateTime(scrollVH, activeSegment) {
        const { startVH = 0, endVH = 1 } = activeSegment.visibility
        const { startTime, endTime } = activeSegment.timeBounds

        // date object check
        if (!(startTime instanceof Date) || !(endTime instanceof Date)) return

        const range = endVH - startVH
        if (range <= 0) return

        const progress = Math.min(1, Math.max(0, (scrollVH - startVH) / range))

        const startMs = startTime.getTime()
        const endMs = endTime.getTime()
        const currentMs = startMs + (endMs - startMs) * progress
        const currentDate = new Date(currentMs)

        this.heading.textContent = this.formatDate(currentDate)
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        })
    }

    dispose() {
        window.removeEventListener('scroll', this.onScroll)
    }
}