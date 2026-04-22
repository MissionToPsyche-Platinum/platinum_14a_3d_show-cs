import { useEffect, useRef, useState } from 'react'
import '../styles/PsycheGame.css'

const W = 740
const H = 480

const MAT_COLOR  = { iron: '#8888a0', nickel: '#b8b8cc', silicate: '#b08050', gold: '#ffd700', platinum: '#80e8ff' }
const MAT_BRIGHT = { iron: '#d0d0ff', nickel: '#eeeeff', silicate: '#ffb870', gold: '#ffe84a', platinum: '#c0f8ff' }
const MAT_ABBR  = { iron: 'Fe', nickel: 'Ni', silicate: 'Si', gold: 'Au', platinum: 'Pt' }

const UPGRADES = [
    {
        id: 'engine', label: 'Engine',
        levels: [
            { desc: 'Speed +25%',  cost: { iron: 10 } },
            { desc: 'Speed +50%',  cost: { iron: 18, nickel: 8 } },
            { desc: 'Speed +75%',  cost: { iron: 28, nickel: 12, gold: 3 } },
            { desc: 'Speed +100%', cost: { iron: 40, nickel: 20, gold: 8, platinum: 2 } },
        ],
    },
    {
        id: 'cannon', label: 'Cannon',
        levels: [
            { desc: 'Fire +30%', cost: { iron: 8, nickel: 6 } },
            { desc: 'Fire +55%', cost: { iron: 14, nickel: 14, silicate: 6 } },
            { desc: 'Fire +75%', cost: { iron: 22, nickel: 20, silicate: 10 } },
            { desc: 'Fire +90%', cost: { iron: 35, nickel: 30, silicate: 15, gold: 3 } },
        ],
    },
    {
        id: 'hull', label: 'Hull',
        levels: [
            { desc: '+1 Max HP', cost: { iron: 10, silicate: 8 } },
            { desc: '+2 Max HP', cost: { iron: 18, silicate: 15, nickel: 6 } },
            { desc: '+3 Max HP', cost: { iron: 28, silicate: 22, nickel: 10 } },
            { desc: '+5 Max HP', cost: { iron: 40, silicate: 30, nickel: 15, platinum: 2 } },
        ],
    },
    {
        id: 'magnet', label: 'Magnet',
        levels: [
            { desc: 'Pull radius: sm', cost: { iron: 5, gold: 4 } },
            { desc: 'Pull radius: md', cost: { iron: 10, gold: 7, nickel: 8 } },
            { desc: 'Pull radius: lg', cost: { iron: 16, gold: 10, nickel: 15 } },
            { desc: 'Pull radius: xl', cost: { iron: 25, gold: 15, nickel: 20, platinum: 2 } },
        ],
    },
    {
        id: 'repeater', label: 'Repeater',
        levels: [
            { desc: '3-shot spread', cost: { iron: 8,  platinum: 2, nickel: 10 } },
            { desc: '5-shot spread', cost: { iron: 14, platinum: 4, nickel: 16 } },
            { desc: '7-shot spread', cost: { iron: 22, platinum: 6, silicate: 12 } },
            { desc: '9-shot spread', cost: { iron: 32, platinum: 10, silicate: 20 } },
        ],
    },
]

const MAGNET_RADIUS = [0, 70, 120, 180, 250]
const SPREAD_COUNTS = [1, 3, 5, 7, 9]

function rndPts(r, n = 10) {
    return Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2
        const d = r * (0.65 + Math.random() * 0.7)
        return [Math.cos(a) * d, Math.sin(a) * d]
    })
}

function dist(ax, ay, bx, by) { return Math.hypot(ax - bx, ay - by) }
function wrap(v, max) { return ((v % max) + max) % max }

function dropType() {
    const r = Math.random()
    if (r < 0.52) return 'iron'
    if (r < 0.76) return 'nickel'
    if (r < 0.91) return 'silicate'
    if (r < 0.97) return 'gold'
    return 'platinum'
}

class GameState {
    constructor() {
        this.player = {
            x: W / 2, y: H * 0.72, vx: 0, vy: 0,
            angle: 0, hp: 3, maxHp: 3, radius: 11,
            fireCooldown: 0, invincible: 0, thrusting: false,
            upgrades: { engine: 0, cannon: 0, hull: 0, magnet: 0, repeater: 0 },
        }
        this.asteroids = []
        this.bullets   = []
        this.drops     = []
        this.particles = []
        this.stars = Array.from({ length: 80 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: 0.5 + Math.random() * 1.2,
            a: 0.2 + Math.random() * 0.8,
        }))
        this.score       = 0
        this.wave        = 1
        this.inventory   = { iron: 0, nickel: 0, silicate: 0, gold: 0, platinum: 0 }
        this.gameOver    = false
        this.started     = false
        this.waveCleared = false
        this.keys        = {}
        this.mouse       = { x: W / 2, y: H / 2 }
    }

    getSpeed()    { return 155 * (1 + [0, 0.25, 0.5, 0.75, 1.0][this.player.upgrades.engine]) }
    getFireRate() { return 0.33 * (1 - [0, 0.3, 0.55, 0.75, 0.9][this.player.upgrades.cannon]) }
    getMagnetR()  { return MAGNET_RADIUS[this.player.upgrades.magnet] }
    getSpread()   { return SPREAD_COUNTS[this.player.upgrades.repeater] }

    startGame() {
        this.started     = true
        this.waveCleared = false
        this.spawnWave()
    }

    nextWave() {
        this.wave++
        this.waveCleared = false
        this.spawnWave()
    }

    spawnWave() {
        const hugeCount  = Math.max(0, Math.floor((this.wave - 1) / 2))
        const largeCount = 3 + this.wave - hugeCount
        const spawn = (size) => {
            let x, y
            do { x = Math.random() * W; y = Math.random() * H }
            while (dist(x, y, this.player.x, this.player.y) < 130)
            const ang = Math.random() * Math.PI * 2
            const spd = size === 'huge' ? 8 + Math.random() * 10 : 15 + Math.random() * 20
            const r   = size === 'huge' ? 44 : 30
            const hp  = size === 'huge' ? 5  : 3
            this.asteroids.push({
                x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
                angle: Math.random() * Math.PI * 2,
                rotSpd: (Math.random() - 0.5) * (size === 'huge' ? 0.7 : 1.5),
                size, radius: r, hp, maxHp: hp,
                pts: rndPts(r, size === 'huge' ? 13 : 11),
            })
        }
        for (let i = 0; i < hugeCount;  i++) spawn('huge')
        for (let i = 0; i < largeCount; i++) spawn('large')
    }

    splitAsteroid(a) {
        if (a.size === 'small') {
            for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
                const ang = Math.random() * Math.PI * 2
                this.drops.push({
                    x: a.x, y: a.y,
                    vx: Math.cos(ang) * (50 + Math.random() * 60),
                    vy: Math.sin(ang) * (50 + Math.random() * 60),
                    type: dropType(), radius: 5, life: 13, pulse: 0,
                })
            }
            this.score += 10
            this.spawnParticles(a.x, a.y, 10, '#907898')
            return
        }
        const sizes = { huge: 'large', large: 'medium', medium: 'small' }
        const radii = { large: 30, medium: 18, small: 9 }
        const hps   = { large: 3,  medium: 2,  small: 1  }
        const spds  = { large: 25, medium: 40, small: 65 }
        const pts   = { large: 11, medium: 8,  small: 8  }
        const nextSize = sizes[a.size]
        const nextR    = radii[nextSize]
        const count    = a.size === 'huge' ? 3 : 2
        for (let i = 0; i < count; i++) {
            const ang = Math.random() * Math.PI * 2
            this.asteroids.push({
                x: a.x, y: a.y,
                vx: a.vx * 0.3 + Math.cos(ang) * (spds[nextSize] + Math.random() * 20),
                vy: a.vy * 0.3 + Math.sin(ang) * (spds[nextSize] + Math.random() * 20),
                angle: Math.random() * Math.PI * 2,
                rotSpd: (Math.random() - 0.5) * 3,
                size: nextSize, radius: nextR, hp: hps[nextSize], maxHp: hps[nextSize],
                pts: rndPts(nextR, pts[nextSize]),
            })
        }
        const scoreMap = { huge: 100, large: 50, medium: 25 }
        this.score += scoreMap[a.size]
        this.spawnParticles(a.x, a.y, a.size === 'huge' ? 22 : 14, '#907898')
    }

    spawnParticles(x, y, n, color) {
        for (let i = 0; i < n; i++) {
            const ang = Math.random() * Math.PI * 2
            const spd = 50 + Math.random() * 130
            const life = 0.3 + Math.random() * 0.5
            this.particles.push({
                x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
                life, maxLife: life, sz: 2 + Math.random() * 3, color,
            })
        }
    }

    update(dt) {
        if (this.gameOver || !this.started) return
        const p = this.player

        let dx = 0, dy = 0
        if (this.keys['a'] || this.keys['arrowleft'])  dx -= 1
        if (this.keys['d'] || this.keys['arrowright']) dx += 1
        if (this.keys['w'] || this.keys['arrowup'])    dy -= 1
        if (this.keys['s'] || this.keys['arrowdown'])  dy += 1

        const spd = this.getSpeed()
        if (dx || dy) {
            const m = Math.hypot(dx, dy)
            p.vx += (dx / m) * spd * dt * 9
            p.vy += (dy / m) * spd * dt * 9
            p.angle = Math.atan2(dy, dx)
            p.thrusting = true
        } else {
            p.thrusting = false
        }

        p.vx *= Math.pow(0.84, dt * 60)
        p.vy *= Math.pow(0.84, dt * 60)
        const vel = Math.hypot(p.vx, p.vy)
        if (vel > spd) { p.vx = p.vx / vel * spd; p.vy = p.vy / vel * spd }
        p.x = wrap(p.x + p.vx * dt, W)
        p.y = wrap(p.y + p.vy * dt, H)

        p.fireCooldown = Math.max(0, p.fireCooldown - dt)
        if ((this.keys[' '] || this.keys['mousedown']) && p.fireCooldown === 0) {
            const baseAng = Math.atan2(this.mouse.y - p.y, this.mouse.x - p.x)
            const count   = this.getSpread()
            const step    = count > 1 ? 0.18 : 0
            const offset  = -((count - 1) / 2) * step
            for (let i = 0; i < count; i++) {
                const ang = baseAng + offset + i * step
                this.bullets.push({
                    x: p.x + Math.cos(ang) * 16, y: p.y + Math.sin(ang) * 16,
                    vx: p.vx * 0.3 + Math.cos(ang) * 500,
                    vy: p.vy * 0.3 + Math.sin(ang) * 500,
                    life: 1.4, radius: 3,
                })
            }
            p.fireCooldown = this.getFireRate()
        }

        this.bullets.forEach(b => {
            b.x += b.vx * dt
            b.y += b.vy * dt
            b.life -= dt
        })
        this.bullets = this.bullets.filter(b => b.life > 0 && b.x >= 0 && b.x <= W && b.y >= 0 && b.y <= H)

        this.asteroids.forEach(a => {
            a.x = wrap(a.x + a.vx * dt, W)
            a.y = wrap(a.y + a.vy * dt, H)
            a.angle += a.rotSpd * dt
        })

        const magnetR = this.getMagnetR()
        this.drops.forEach(d => {
            const ddx = p.x - d.x, ddy = p.y - d.y
            const dd = Math.hypot(ddx, ddy)
            const inMagnet = magnetR > 0 && dd < magnetR && dd > 0
            if (inMagnet) {
                const t = 1 - dd / magnetR
                const force = 700 * t + 250
                d.vx += (ddx / dd) * force * dt
                d.vy += (ddy / dd) * force * dt
                d.vx *= Math.pow(0.94, dt * 60)
                d.vy *= Math.pow(0.94, dt * 60)
            } else {
                d.vx *= Math.pow(0.97, dt * 60)
                d.vy *= Math.pow(0.97, dt * 60)
            }
            d.x = wrap(d.x + d.vx * dt, W)
            d.y = wrap(d.y + d.vy * dt, H)
            d.life -= dt
            d.pulse += dt * 3
        })
        this.drops = this.drops.filter(d => d.life > 0)

        this.particles.forEach(pt => {
            pt.x += pt.vx * dt; pt.y += pt.vy * dt
            pt.vx *= Math.pow(0.9, dt * 60); pt.vy *= Math.pow(0.9, dt * 60)
            pt.life -= dt
        })
        this.particles = this.particles.filter(pt => pt.life > 0)

        const deadA = new Set(), deadB = new Set()
        for (let bi = 0; bi < this.bullets.length; bi++) {
            const b = this.bullets[bi]
            for (let ai = 0; ai < this.asteroids.length; ai++) {
                if (deadA.has(ai)) continue
                const a = this.asteroids[ai]
                if (dist(b.x, b.y, a.x, a.y) < a.radius + b.radius) {
                    deadB.add(bi)
                    a.hp -= 1
                    this.spawnParticles(b.x, b.y, 4, '#a090b8')
                    if (a.hp <= 0) { this.splitAsteroid(a); deadA.add(ai) }
                    break
                }
            }
        }
        this.asteroids = this.asteroids.filter((_, i) => !deadA.has(i))
        this.bullets   = this.bullets.filter((_, i) => !deadB.has(i))

        if (p.invincible <= 0) {
            for (const a of this.asteroids) {
                if (dist(p.x, p.y, a.x, a.y) < a.radius + p.radius - 4) {
                    p.hp -= 1
                    p.invincible = 2
                    this.spawnParticles(p.x, p.y, 8, '#80d8ff')
                    if (p.hp <= 0) { this.gameOver = true; this.spawnParticles(p.x, p.y, 25, '#80d8ff') }
                    break
                }
            }
        } else {
            p.invincible -= dt
        }

        const pickupR = p.radius + 5 + (magnetR > 0 ? 16 : 8)
        this.drops.forEach(d => {
            if (dist(p.x, p.y, d.x, d.y) < pickupR + d.radius) {
                this.inventory[d.type]++
                this.spawnParticles(p.x, p.y, 3, MAT_COLOR[d.type])
                d.life = 0
            }
        })

        if (this.asteroids.length === 0 && !this.waveCleared) this.waveCleared = true
    }

    render(ctx) {
        ctx.fillStyle = '#04060e'
        ctx.fillRect(0, 0, W, H)

        for (const s of this.stars) {
            ctx.globalAlpha = s.a
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
            ctx.fillStyle = '#fff'; ctx.fill()
        }
        ctx.globalAlpha = 1

        for (const pt of this.particles) {
            ctx.globalAlpha = pt.life / pt.maxLife
            ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.sz, 0, Math.PI * 2)
            ctx.fillStyle = pt.color; ctx.fill()
        }
        ctx.globalAlpha = 1

        for (const d of this.drops) {
            const alpha = Math.min(1, d.life * 0.4) * (0.6 + 0.4 * Math.sin(d.pulse))
            ctx.globalAlpha = alpha
            ctx.shadowColor = MAT_COLOR[d.type]
            ctx.shadowBlur = 7
            ctx.beginPath(); ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
            ctx.fillStyle = MAT_COLOR[d.type]; ctx.fill()
            ctx.shadowBlur = 0; ctx.globalAlpha = 1
        }

        for (const a of this.asteroids) {
            ctx.save()
            ctx.translate(a.x, a.y); ctx.rotate(a.angle)
            ctx.beginPath()
            ctx.moveTo(a.pts[0][0], a.pts[0][1])
            for (let i = 1; i < a.pts.length; i++) ctx.lineTo(a.pts[i][0], a.pts[i][1])
            ctx.closePath()
            ctx.fillStyle = a.size === 'huge' ? '#332840' : a.size === 'large' ? '#48385a' : a.size === 'medium' ? '#513850' : '#604858'
            ctx.fill()
            const dmgFrac = 1 - a.hp / a.maxHp
            ctx.strokeStyle = dmgFrac > 0 ? `rgba(255,110,50,${0.4 + dmgFrac * 0.5})` : '#907898'
            ctx.lineWidth = 1.5; ctx.stroke()
            ctx.restore()
        }

        ctx.shadowBlur = 9
        for (const b of this.bullets) {
            ctx.shadowColor = '#70d8ff'
            ctx.beginPath(); ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
            ctx.fillStyle = '#a0eeff'; ctx.fill()
        }
        ctx.shadowBlur = 0

        const p = this.player
        if (!this.gameOver) {
            // Magnet radius ring
            const mR = this.getMagnetR()
            if (mR > 0) {
                ctx.beginPath(); ctx.arc(p.x, p.y, mR, 0, Math.PI * 2)
                const magnetColors = ['', '#ffd70044', '#ffd70066', '#ffd70088']
                ctx.strokeStyle = magnetColors[p.upgrades.magnet]
                ctx.lineWidth = 1
                ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([])
            }

            const flash = p.invincible > 0 && Math.floor(p.invincible * 8) % 2 === 0
            if (!flash) {
                // Hull glow at max level
                if (p.upgrades.hull === 3) {
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.radius + 6, 0, Math.PI * 2)
                    ctx.strokeStyle = 'rgba(100,220,255,0.25)'; ctx.lineWidth = 4; ctx.stroke()
                }
                ctx.save()
                ctx.translate(p.x, p.y); ctx.rotate(p.angle)
                if (p.thrusting) {
                    const engineLvl = p.upgrades.engine
                    const flameColor = engineLvl === 3 ? 'rgba(120,200,255,0.95)'
                        : engineLvl === 2 ? 'rgba(200,120,255,0.9)'
                        : 'rgba(255,150,50,0.9)'
                    const flameLen = 10 + engineLvl * 4
                    ctx.beginPath()
                    ctx.moveTo(-9, -5); ctx.lineTo(-9 - flameLen - Math.random() * 8, 0); ctx.lineTo(-9, 5)
                    ctx.fillStyle = flameColor; ctx.fill()
                }
                ctx.beginPath()
                ctx.moveTo(14, 0); ctx.lineTo(-9, -9); ctx.lineTo(-5, 0); ctx.lineTo(-9, 9)
                ctx.closePath()
                ctx.fillStyle = '#c8e8ff'
                ctx.shadowColor = '#70d8ff'; ctx.shadowBlur = 7
                ctx.fill()
                ctx.strokeStyle = '#70d8ff'; ctx.lineWidth = 1; ctx.stroke()
                ctx.shadowBlur = 0
                ctx.restore()

                const bw = 28
                ctx.fillStyle = 'rgba(0,0,0,0.5)'
                ctx.fillRect(p.x - bw / 2, p.y - p.radius - 10, bw, 4)
                ctx.fillStyle = p.hp / p.maxHp > 0.5 ? '#44ff88' : p.hp / p.maxHp > 0.25 ? '#ff9944' : '#ff4444'
                ctx.fillRect(p.x - bw / 2, p.y - p.radius - 10, bw * (p.hp / p.maxHp), 4)
            }
        }

        const mx = this.mouse.x, my = this.mouse.y
        ctx.strokeStyle = 'rgba(110,210,255,0.4)'; ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(mx - 7, my); ctx.lineTo(mx + 7, my)
        ctx.moveTo(mx, my - 7); ctx.lineTo(mx, my + 7)
        ctx.stroke()
        ctx.beginPath(); ctx.arc(mx, my, 4, 0, Math.PI * 2); ctx.stroke()

        ctx.fillStyle = 'rgba(110,180,255,0.35)'
        ctx.font = '11px monospace'; ctx.textAlign = 'right'
        ctx.fillText(`WAVE ${this.wave}`, W - 10, 16)
        ctx.textAlign = 'left'
    }
}

export default function PsycheGame({ onClose }) {
    const canvasRef  = useRef(null)
    const gameRef    = useRef(null)
    const rafRef     = useRef(null)
    const lastTRef   = useRef(null)

    const [ui, setUi] = useState({
        score: 0, hp: 3, maxHp: 3,
        inventory: { iron: 0, nickel: 0, silicate: 0, gold: 0, platinum: 0 },
        upgrades: { engine: 0, cannon: 0, hull: 0, magnet: 0, repeater: 0 },
        gameOver: false,
        waveCleared: false,
        started: false,
    })

    useEffect(() => {
        window.dispatchEvent(new Event('psyche-game-open'))
        return () => window.dispatchEvent(new Event('psyche-game-close'))
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        gameRef.current = new GameState()

        const onKey = (e) => {
            const k = e.key.toLowerCase()
            if (['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))
                e.preventDefault()
            if (e.type === 'keydown') gameRef.current.keys[k] = true
            else delete gameRef.current.keys[k]
        }
        const onMouseMove = (e) => {
            const r = canvas.getBoundingClientRect()
            gameRef.current.mouse.x = (e.clientX - r.left) * (W / r.width)
            gameRef.current.mouse.y = (e.clientY - r.top)  * (H / r.height)
        }
        const onMouseDown = (e) => { if (e.button === 0) { gameRef.current.keys['mousedown'] = true; e.preventDefault() } }
        const onMouseUp   = (e) => { if (e.button === 0) delete gameRef.current.keys['mousedown'] }

        window.addEventListener('keydown', onKey)
        window.addEventListener('keyup', onKey)
        canvas.addEventListener('mousemove', onMouseMove)
        canvas.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mouseup', onMouseUp)
        canvas.style.cursor = 'none'

        const ctx = canvas.getContext('2d')
        const loop = (ts) => {
            if (!lastTRef.current) lastTRef.current = ts
            const dt = Math.min((ts - lastTRef.current) / 1000, 0.05)
            lastTRef.current = ts
            gameRef.current.update(dt)
            gameRef.current.render(ctx)
            rafRef.current = requestAnimationFrame(loop)
        }
        rafRef.current = requestAnimationFrame(loop)

        const uiSync = setInterval(() => {
            const g = gameRef.current
            if (!g) return
            setUi({
                score: g.score,
                hp: g.player.hp, maxHp: g.player.maxHp,
                inventory: { ...g.inventory },
                upgrades: { ...g.player.upgrades },
                gameOver: g.gameOver,
                waveCleared: g.waveCleared,
                started: g.started,
            })
        }, 150)

        return () => {
            cancelAnimationFrame(rafRef.current)
            clearInterval(uiSync)
            window.removeEventListener('keydown', onKey)
            window.removeEventListener('keyup', onKey)
            canvas.removeEventListener('mousemove', onMouseMove)
            canvas.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [])

    const canAfford = (cost) =>
        Object.entries(cost).every(([mat, amt]) => ui.inventory[mat] >= amt)

    const buyUpgrade = (upgradeId) => {
        const g = gameRef.current
        if (!g) return
        const up  = UPGRADES.find(u => u.id === upgradeId)
        const lvl = g.player.upgrades[upgradeId]
        if (lvl >= up.levels.length) return
        const cost = up.levels[lvl].cost
        if (!Object.entries(cost).every(([m, n]) => g.inventory[m] >= n)) return
        Object.entries(cost).forEach(([m, n]) => { g.inventory[m] -= n })
        g.player.upgrades[upgradeId]++
        if (upgradeId === 'hull') {
            g.player.maxHp = 3 + [0, 1, 3, 6, 11][g.player.upgrades.hull]
            g.player.hp = g.player.maxHp
        }
    }

    const restart = () => { lastTRef.current = null; gameRef.current = new GameState() }

    const CostLabel = ({ cost }) => (
        <>
            {Object.entries(cost).map(([mat, amt], i) => {
                const has = ui.inventory[mat] >= amt
                return (
                    <span key={mat}>
                        {i > 0 && <span style={{ color: 'rgba(150,160,180,0.25)' }}> + </span>}
                        <span style={{ color: has ? MAT_BRIGHT[mat] : MAT_COLOR[mat], opacity: has ? 1 : 0.35 }}>
                            {amt} {MAT_ABBR[mat]}
                        </span>
                    </span>
                )
            })}
        </>
    )

    return (
        <div className="pg-overlay">
            <div className="pg-window">
                <div className="pg-header">
                    <span className="pg-title"><span style={{ color: '#f5a020' }}>⬡</span> PSYCHE MINER</span>
                    <span className="pg-score">SCORE: {ui.score}</span>
                    <button className="pg-close" onClick={onClose}>✕</button>
                </div>

                <div className="pg-canvas-wrap">
                    <canvas ref={canvasRef} width={W} height={H} className="pg-canvas" />
                    {ui.gameOver && (
                        <div className="pg-gameover">
                            <p>SIGNAL LOST</p>
                            <span>SCORE: {ui.score}</span>
                            <button onClick={restart}>RETRY</button>
                        </div>
                    )}
                    {!ui.started && !ui.gameOver && (
                        <div className="pg-wave-cleared">
                            <span>READY FOR LAUNCH</span>
                            <button onClick={() => gameRef.current?.startGame()}>LAUNCH WAVE 1</button>
                        </div>
                    )}
                    {ui.waveCleared && ui.started && !ui.gameOver && (
                        <div className="pg-wave-cleared">
                            <span>WAVE {gameRef.current?.wave} CLEARED</span>
                            <button onClick={() => gameRef.current?.nextWave()}>NEXT WAVE</button>
                        </div>
                    )}
                    <div className="pg-hint">WASD move · Mouse aim · Click / Space shoot · Fly over drops to collect</div>
                </div>

                <div className="pg-hud">
                    <div className="pg-inv">
                        {Object.entries(MAT_ABBR).map(([id, abbr]) => (
                            <span key={id} className="pg-mat" style={{ color: MAT_COLOR[id] }}>
                                {abbr} {ui.inventory[id]}
                            </span>
                        ))}
                    </div>
                    <div className="pg-upgrades">
                        {UPGRADES.map(up => {
                            const lvl        = ui.upgrades[up.id]
                            const maxed      = lvl >= up.levels.length
                            const next       = maxed ? null : up.levels[lvl]
                            const affordable = next ? canAfford(next.cost) : false
                            return (
                                <button
                                    key={up.id}
                                    className={`pg-upgrade-btn${maxed ? ' maxed' : affordable ? ' can-buy' : ''}`}
                                    onClick={() => buyUpgrade(up.id)}
                                    disabled={maxed || !affordable}
                                >
                                    <span className="pg-up-label">{up.label} <span className="pg-up-lvl">{maxed ? 'MAX' : `Lv.${lvl + 1}`}</span></span>
                                    {next && <span className="pg-up-desc">{next.desc}</span>}
                                    {next && <span className="pg-up-cost"><CostLabel cost={next.cost} /></span>}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
