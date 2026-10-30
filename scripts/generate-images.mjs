// Draws every image in public/images as SVG, then renders optimised WebP with sharp.
// Run: npm run images            (all)      ·  npm run images -- wok   (only files matching "wok")
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { categoryImages, productImages, scenes } from '../src/content/images.js'

const OUT = path.resolve('public/images')
const only = process.argv[2]

/* ------------------------------------------------------------------ utils */
const f = (n) => Math.round(n * 10) / 10
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const rgb2hex = (a) => '#' + a.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')
const mix = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A.map((v, i) => v + (B[i] - v) * t)) }
const lighten = (c, t) => mix(c, '#ffffff', t)
const darken = (c, t) => mix(c, '#000000', t)
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
let uid = 0

/* ------------------------------------------------------------------ defs registry */
const defs = new Map()
const reg = (id, body) => { if (!defs.has(id)) defs.set(id, body); return `url(#${id})` }
const stopsSvg = (s) => s.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}"${a < 1 ? ` stop-opacity="${a}"` : ''}/>`).join('')
const lin = (id, s, [x1, y1, x2, y2] = [0, 0, 0, 1]) => reg(id, `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stopsSvg(s)}</linearGradient>`)
const rad = (id, s, { cx = 0.5, cy = 0.5, r = 0.5 } = {}) => reg(id, `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stopsSvg(s)}</radialGradient>`)
const FILTERS = `
<filter id="blur" x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="16"/></filter>
<filter id="blurS" x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="blurXL" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="40"/></filter>
<filter id="dof" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="3.5"/></filter>`

/* ------------------------------------------------------------------ materials (lit from top-left) */
const CP = [0, 0.12, 0.24, 0.42, 0.66, 0.84, 1]
const MATS = {
  steel: { base: '#b4bbc2', cyl: ['#5b626a', '#d9dfe4', '#f7f9fa', '#a9b1b8', '#6f777f', '#c4cbd1', '#666d74'] },
  brass: { base: '#c1953a', cyl: ['#5c3f10', '#dcb862', '#f9e7a8', '#c08f33', '#7a5616', '#d4aa52', '#664612'] },
  copper: { base: '#b5652f', cyl: ['#4c200e', '#d98a58', '#f6c09a', '#b45f2b', '#6b3015', '#c87a48', '#55250f'] },
  alu: { base: '#a7adb2', cyl: ['#737a80', '#c3c8cc', '#dadee1', '#a8aeb3', '#878d93', '#b6bbbf', '#7a8187'] },
  iron: { base: '#34312e', cyl: ['#0e0e0f', '#45413d', '#6a645d', '#2c2a28', '#131314', '#3b3734', '#111112'] },
  anod: { base: '#2f3235', cyl: ['#0d0e0f', '#3c4044', '#5d6267', '#282a2d', '#101112', '#35383b', '#0e0f10'] },
}
const M = (m) => MATS[m] ?? { base: m, cyl: [darken(m, 0.5), lighten(m, 0.2), lighten(m, 0.42), m, darken(m, 0.3), lighten(m, 0.06), darken(m, 0.42)] }
const key = (m) => m.replace('#', 'c')
const gCyl = (m) => lin(`cyl-${key(m)}`, M(m).cyl.map((c, i) => [CP[i], c]), [0, 0, 1, 0])
const gCylV = (m) => lin(`cylv-${key(m)}`, M(m).cyl.map((c, i) => [CP[i], c]))
const gIn = (m) => { const b = M(m).base; return lin(`in-${key(m)}`, [[0, lighten(b, 0.1)], [0.5, darken(b, 0.32)], [1, darken(b, 0.58)]]) }
const gDome = (m) => { const b = M(m).base; return rad(`dome-${key(m)}`, [[0, lighten(b, 0.7)], [0.3, lighten(b, 0.2)], [0.7, darken(b, 0.15)], [1, darken(b, 0.45)]], { cx: 0.38, cy: 0.3, r: 0.75 }) }
const gCap = (m) => { const b = M(m).base; return rad(`cap-${key(m)}`, [[0, lighten(b, 0.55)], [0.6, lighten(b, 0.12)], [1, darken(b, 0.15)]], { cx: 0.38, cy: 0.35, r: 0.8 }) }
const gFront = (m) => { const b = M(m).base; return lin(`fr-${key(m)}`, [[0, darken(b, 0.12)], [0.3, lighten(b, 0.22)], [0.55, b], [0.8, lighten(b, 0.08)], [1, darken(b, 0.18)]], [0, 0, 1, 0]) }
const gTop = (m) => { const b = M(m).base; return lin(`tp-${key(m)}`, [[0, lighten(b, 0.22)], [1, lighten(b, 0.45)]], [0, 1, 1, 0]) }
const gSide = (m) => { const b = M(m).base; return lin(`sd-${key(m)}`, [[0, darken(b, 0.22)], [1, darken(b, 0.42)]]) }
const VS = () => lin('vshade', [[0, '#000', 0], [0.55, '#000', 0.04], [1, '#000', 0.3]])
const GLASS = () => lin('glass', [[0, '#ffffff', 0.34], [0.45, '#dfeaf0', 0.1], [0.7, '#ffffff', 0.04], [1, '#ffffff', 0.3]], [0, 0, 1, 1])

/* ------------------------------------------------------------------ primitives */
const g = (t, s) => `<g transform="${t}">${s}</g>`
const T = (x, y, s = 1) => `translate(${f(x)},${f(y)})${s !== 1 ? ` scale(${s})` : ''}`
const K = 0.3
const DX = 0.55, DY = -0.36
const topPt = (x, y, w, d, u, v) => [x + u * w + v * d * DX, y + v * d * DY]
const poly = (pts, attrs) => `<path d="M${pts.map(([a, b]) => `${f(a)},${f(b)}`).join('L')}Z" ${attrs}/>`

function smooth(p) {
  let d = ''
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] ?? p2
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`
  }
  return d
}
// Silhouette of a turned (lathe) object from a [radius, y] profile, top → bottom.
function lathePath(p, k = K, front = false) {
  const [rt, yt] = p[0], [rb, yb] = p[p.length - 1]
  const L = [...p].reverse().map(([r, y]) => [-r, y])
  return `M${f(rt)},${f(yt)}${smooth(p)}A${f(rb)},${f(rb * k)} 0 0 1 ${f(-rb)},${f(yb)}${smooth(L)}A${f(rt)},${f(rt * k)} 0 0 ${front ? 0 : 1} ${f(rt)},${f(yt)}Z`
}
function ring(r, y, m, k = K) {
  const b = M(m).base
  return `<path d="M${f(-r)},${f(y)}A${f(r)},${f(r * k)} 0 0 0 ${f(r)},${f(y)}" fill="none" stroke="${darken(b, 0.45)}" stroke-opacity=".5" stroke-width="2"/>` +
    `<path d="M${f(-r)},${f(y + 2.5)}A${f(r)},${f(r * k)} 0 0 0 ${f(r)},${f(y + 2.5)}" fill="none" stroke="${lighten(b, 0.6)}" stroke-opacity=".55" stroke-width="1.5"/>`
}
function rim(r, y, m, k = K) {
  const b = M(m).base
  return `<ellipse cx="0" cy="${f(y)}" rx="${f(r)}" ry="${f(r * k)}" fill="${gIn(m)}"/>` +
    `<ellipse cx="0" cy="${f(y + 2)}" rx="${f(r - 4)}" ry="${f((r - 4) * k)}" fill="none" stroke="${darken(b, 0.5)}" stroke-opacity=".35" stroke-width="2"/>` +
    `<ellipse cx="0" cy="${f(y)}" rx="${f(r)}" ry="${f(r * k)}" fill="none" stroke="${lighten(b, 0.55)}" stroke-width="3"/>`
}
function hammered(d, p, m, seed = 7) {
  const id = `clip${uid++}`, R = rng(seed), b = M(m).base
  const maxR = Math.max(...p.map(([r]) => r)), yt = p[0][1], yb = p[p.length - 1][1]
  let dots = ''
  for (let i = 0; i < 220; i++) {
    const x = (R() * 2 - 1) * maxR, y = yt + R() * (yb - yt), s = 4 + R() * 7
    dots += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(s)}" ry="${f(s * 0.7)}" fill="${R() > 0.5 ? lighten(b, 0.6) : darken(b, 0.5)}" opacity=".16"/>`
  }
  return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${dots}</g>`
}
function lathe(p, m, { k = K, open = false, rings = [], hammer = false, seed } = {}) {
  const d = lathePath(p, k)
  let s = `<path d="${d}" fill="${gCyl(m)}"/><path d="${d}" fill="${VS()}"/>`
  if (hammer) s += hammered(d, p, m, seed)
  s += `<path d="${d}" fill="none" stroke="${darken(M(m).base, 0.55)}" stroke-opacity=".35" stroke-width="1.5"/>`
  for (const [r, y] of rings) s += ring(r, y, m, k)
  if (open) s += rim(p[0][0], p[0][1], m, k)
  return s
}
// Only the front wall of an open vessel — redrawn to hide whatever sits inside it.
function latheFront(p, m, { k = K, hammer = false, seed } = {}) {
  const d = lathePath(p, k, true), [r, y] = p[0]
  let s = `<path d="${d}" fill="${gCyl(m)}"/><path d="${d}" fill="${VS()}"/>`
  if (hammer) s += hammered(d, p, m, seed)
  return s + `<path d="M${f(-r)},${f(y)}A${f(r)},${f(r * k)} 0 0 0 ${f(r)},${f(y)}" fill="none" stroke="${lighten(M(m).base, 0.55)}" stroke-width="3"/>`
}
function cap(r, y, m, k = K) {
  return `<ellipse cx="0" cy="${f(y)}" rx="${f(r)}" ry="${f(r * k)}" fill="${gCap(m)}"/><ellipse cx="0" cy="${f(y)}" rx="${f(r)}" ry="${f(r * k)}" fill="none" stroke="${lighten(M(m).base, 0.5)}" stroke-width="2"/>`
}
function lid(r, y, m, { h = r * 0.35, k = K, knob = true, knobM = m } = {}) {
  const d = `M${f(-r)},${f(y)}C${f(-r)},${f(y - h * 1.33)} ${f(r)},${f(y - h * 1.33)} ${f(r)},${f(y)}A${f(r)},${f(r * k)} 0 0 1 ${f(-r)},${f(y)}Z`
  let s = `<path d="${d}" fill="${gDome(m)}"/><path d="${d}" fill="none" stroke="${darken(M(m).base, 0.5)}" stroke-opacity=".35" stroke-width="1.5"/>` +
    `<path d="M${f(-r)},${f(y)}A${f(r)},${f(r * k)} 0 0 0 ${f(r)},${f(y)}" fill="none" stroke="${lighten(M(m).base, 0.55)}" stroke-width="3"/>`
  if (knob) s += lathe([[13, y - h - 22], [20, y - h - 14], [16, y - h - 4], [9, y - h + 3]], knobM)
  return s
}
function glassLid(r, y, { h = r * 0.3, k = K } = {}) {
  const d = `M${f(-r)},${f(y)}C${f(-r)},${f(y - h * 1.33)} ${f(r)},${f(y - h * 1.33)} ${f(r)},${f(y)}A${f(r)},${f(r * k)} 0 0 1 ${f(-r)},${f(y)}Z`
  return `<path d="${d}" fill="${GLASS()}" stroke="#d9dee2" stroke-opacity=".6" stroke-width="2"/>` +
    `<path d="M${f(-r * 0.6)},${f(y - h * 0.55)}Q${f(-r * 0.2)},${f(y - h * 0.95)} ${f(r * 0.25)},${f(y - h * 0.9)}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M${f(-r)},${f(y)}A${f(r)},${f(r * k)} 0 0 0 ${f(r)},${f(y)}" fill="none" stroke="${MATS.steel.cyl[2]}" stroke-width="6"/>` +
    lathe([[14, y - h - 20], [18, y - h - 8], [10, y - h + 3]], '#1c1c1e')
}
function loopH(x, y, s, m, side = 1) {
  const b = M(m).base
  const d = `M${f(x)},${f(y - s * 0.45)}C${f(x + side * s * 1.15)},${f(y - s * 0.6)} ${f(x + side * s * 1.15)},${f(y + s * 0.6)} ${f(x)},${f(y + s * 0.45)}`
  return `<path d="${d}" fill="none" stroke="${darken(b, 0.4)}" stroke-width="${f(s * 0.26)}" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="${lighten(b, 0.5)}" stroke-width="${f(s * 0.08)}" stroke-linecap="round" transform="translate(0,${f(-s * 0.06)})"/>`
}
const handles = (r, y, s, m) => loopH(r - 3, y, s, m, 1) + loopH(-r + 3, y, s, m, -1)
function rod(x1, y1, x2, y2, w, c, hi = lighten(c, 0.35)) {
  return `<path d="M${f(x1)},${f(y1)}L${f(x2)},${f(y2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="M${f(x1)},${f(y1 - w * 0.22)}L${f(x2)},${f(y2 - w * 0.22)}" stroke="${hi}" stroke-opacity=".7" stroke-width="${f(w * 0.25)}" stroke-linecap="round"/>`
}
function box(x, y, w, h, d, m, { edge = true } = {}) {
  const dx = d * DX, dy = d * DY, b = M(m).base
  return poly([[x, y], [x + dx, y + dy], [x + w + dx, y + dy], [x + w, y]], `fill="${gTop(m)}"`) +
    poly([[x + w, y], [x + w + dx, y + dy], [x + w + dx, y + h + dy], [x + w, y + h]], `fill="${gSide(m)}"`) +
    `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${gFront(m)}"/>` +
    `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${VS()}" opacity=".6"/>` +
    (edge ? `<path d="M${f(x)},${f(y)}H${f(x + w)}L${f(x + w + dx)},${f(y + dy)}" fill="none" stroke="${lighten(b, 0.6)}" stroke-opacity=".8" stroke-width="1.5"/>` : '')
}
function legs(x, yTop, w, d, m, { wd = 16, inset = 6 } = {}) {
  const dx = d * DX, dy = d * DY
  const leg = (lx, y1, y2) => `<rect x="${f(lx)}" y="${f(y1)}" width="${wd}" height="${f(y2 - y1)}" fill="${gCyl(m)}"/>`
  return {
    rear: leg(x + inset + dx, yTop + dy, dy) + leg(x + w - inset - wd + dx, yTop + dy, dy),
    front: leg(x + inset, yTop, 0) + leg(x + w - inset - wd, yTop, 0),
  }
}
const shadow = (cx, cy, rx, ry, o = 0.35) =>
  `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="#1b1a17" opacity="${o}" filter="url(#blur)"/>` +
  `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx * 0.82)}" ry="${f(ry * 0.4)}" fill="#1b1a17" opacity="${f(o * 0.9)}" filter="url(#blurS)"/>`
function steam(x, y, n = 3, spread = 60, c = '#b9b3a8', o = 0.35) {
  let s = ''
  for (let i = 0; i < n; i++) {
    const sx = x + (i - (n - 1) / 2) * spread
    s += `<path d="M${f(sx)},${f(y)}c-22,-40 30,-62 2,-112c-24,-38 16,-58 6,-86" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round" opacity="${o}" filter="url(#blurS)"/>`
  }
  return s
}
function tap(x, y, side = 1, s = 1) {
  const b = gCylV('brass')
  return g(`${T(x, y, s)} scale(${side},1)`,
    `<rect x="-4" y="-9" width="44" height="18" rx="6" fill="${b}"/>` +
    `<rect x="28" y="2" width="14" height="34" rx="4" fill="${gCyl('brass')}"/>` +
    `<ellipse cx="35" cy="36" rx="7" ry="3" fill="#3a2a0c"/>` +
    `<rect x="30" y="-24" width="10" height="16" fill="${gCyl('brass')}"/>` +
    `<rect x="14" y="-32" width="42" height="10" rx="5" fill="${darken(MATS.brass.base, 0.25)}"/>` +
    `<rect x="16" y="-31" width="38" height="3" rx="1.5" fill="${lighten(MATS.brass.base, 0.5)}"/>`)
}
function burner(cx, cy, rx, k = 0.36) {
  const ry = rx * k
  let s = `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${rad('burner-bowl', [[0, '#4a4643'], [1, '#121110']])}"/>` +
    `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx * 0.6)}" ry="${f(ry * 0.6)}" fill="#2b2826" stroke="#625c55" stroke-width="2"/>`
  for (let a = 0; a < 360; a += 22.5) {
    const t = (a * Math.PI) / 180
    s += `<circle cx="${f(cx + Math.cos(t) * rx * 0.6)}" cy="${f(cy + Math.sin(t) * ry * 0.6)}" r="${f(rx * 0.025 + 1)}" fill="#0c0c0c"/>`
  }
  s += `<ellipse cx="${f(cx)}" cy="${f(cy - 2)}" rx="${f(rx * 0.3)}" ry="${f(ry * 0.3)}" fill="${rad('burner-cap', [[0, '#a38c5c'], [1, '#4a3c22']], { cx: 0.4, cy: 0.35 })}"/>`
  s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx * 1.18)}" ry="${f(ry * 1.18)}" fill="none" stroke="#141414" stroke-width="${f(rx * 0.08 + 2)}"/>`
  for (const a of [45, 135, 225, 315]) {
    const t = (a * Math.PI) / 180, c = Math.cos(t), sn = Math.sin(t)
    s += `<line x1="${f(cx + c * rx * 1.18)}" y1="${f(cy + sn * ry * 1.18)}" x2="${f(cx + c * rx * 0.72)}" y2="${f(cy + sn * ry * 0.72 - 5)}" stroke="#191919" stroke-width="${f(rx * 0.08 + 2)}" stroke-linecap="round"/>`
  }
  return s
}
function knob(x, y, r = 14) {
  return `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${rad('knob', [[0, '#55575b'], [1, '#121314']], { cx: 0.4, cy: 0.35 })}"/>` +
    `<rect x="${f(x - 2.5)}" y="${f(y - r + 3)}" width="5" height="${f(r * 0.8)}" rx="2" fill="#d9dde0"/>`
}
function chromeKnob(x, y, r = 14) {
  return `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${rad('cknob', [[0, '#ffffff'], [0.5, '#b9c0c6'], [1, '#5b626a']], { cx: 0.38, cy: 0.32 })}"/>` +
    `<rect x="${f(x - 2)}" y="${f(y - r + 3)}" width="4" height="${f(r * 0.75)}" rx="2" fill="#3a3d40"/>`
}

/* ------------------------------------------------------------------ reusable objects */
function pressureCooker(r, h, m, k = K) {
  const body = [[r, -h], [r, -h * 0.25], [r * 0.95, -h * 0.05], [r * 0.9, 0]]
  const hl = (y, len, w) => rod(r * 0.8, y, r + len, y - len * 0.14, w, '#1c1c1e', '#5a5c60')
  const wy = -h - r * 0.2
  return shadow(r * 0.3, 4, r * 1.6, r * 0.28) +
    rod(-r * 0.85, -h + 14, -r - r * 0.35, -h + 6, 18, '#1c1c1e', '#5a5c60') +
    lathe(body, m, { k, rings: [[r, -h + 12], [r * 0.99, -h * 0.25]] }) +
    hl(-h + 8, r * 1.1, 22) +
    lid(r * 0.97, -h, m, { h: r * 0.2, knob: false, k }) +
    hl(-h - 14, r * 1.05, 18) +
    lathe([[8, wy - 30], [15, wy - 22], [15, wy - 8], [8, wy + 2]], '#2a2a2c') +
    `<ellipse cx="0" cy="${f(wy - 30)}" rx="8" ry="3" fill="#5a5c60"/>`
}
function dabaraSet(m, { tumbler = true, dabara = true } = {}) {
  const dab = [[100, -78], [94, -70], [86, -28], [72, 0]]
  const tum = [[52, -170], [49, -20], [46, 0]]
  let s = shadow(0, 4, 115, 18, 0.3)
  if (dabara) s += lathe(dab, m, { open: true })
  if (tumbler) s += g(T(0, dabara ? -36 : 0), lathe(tum, m, { open: true, rings: [[50, -150], [47, -24]] }))
  if (dabara && tumbler) s += latheFront(dab, m)
  return s
}
function tumbler(m = 'steel', s = 1) {
  return g(T(0, 0, s), shadow(0, 3, 60, 10, 0.25) + lathe([[50, -150], [47, -15], [44, 0]], m, { open: true, rings: [[49, -134], [45, -16]] }))
}
function tumblerTower(n, m = 'steel', step = 16) {
  const p = [[50, -150], [47, -15], [44, 0]]
  let s = shadow(0, 3, 64, 11, 0.3) + g(T(0, -(n - 1) * step), lathe(p, m, { open: true, rings: [[49, -134]] }))
  for (let i = n - 2; i >= 0; i--) s += g(T(0, -i * step), latheFront(p, m))
  return s
}
function dabaraStack(n, m = 'steel', step = 13) {
  const p = [[100, -78], [94, -70], [86, -28], [72, 0]]
  let s = shadow(0, 3, 118, 18, 0.3) + g(T(0, -(n - 1) * step), lathe(p, m, { open: true }))
  for (let i = n - 2; i >= 0; i--) s += g(T(0, -i * step), latheFront(p, m))
  return s
}
function plateDisc(r, k, m = 'steel') {
  const b = M(m).base
  return lathe([[r, -7], [r * 0.98, 0]], m, { k }) +
    `<ellipse cx="0" cy="-7" rx="${f(r)}" ry="${f(r * k)}" fill="${gCap(m)}"/>` +
    `<ellipse cx="0" cy="-5" rx="${f(r * 0.86)}" ry="${f(r * 0.86 * k)}" fill="${darken(b, 0.08)}" stroke="${darken(b, 0.3)}" stroke-opacity=".4" stroke-width="2"/>` +
    `<ellipse cx="${f(-r * 0.2)}" cy="${f(-7 - r * k * 0.3)}" rx="${f(r * 0.4)}" ry="${f(r * k * 0.25)}" fill="#fff" opacity=".35"/>` +
    `<ellipse cx="0" cy="-7" rx="${f(r)}" ry="${f(r * k)}" fill="none" stroke="${lighten(b, 0.6)}" stroke-width="2.5"/>`
}
function idlyPlate(r, y, k = 0.36, filled = true) {
  let s = g(T(0, y), plateDisc(r, k))
  const cav = [0, 1, 2, 3].map((i) => (i * Math.PI) / 2 + Math.PI / 4).map((t) => [Math.cos(t) * r * 0.5, Math.sin(t) * r * 0.5 * k])
  cav.sort((a, b) => a[1] - b[1])
  for (const [cx, cy] of cav) {
    const ccy = y - 7 + cy
    s += `<ellipse cx="${f(cx)}" cy="${f(ccy)}" rx="${f(r * 0.3)}" ry="${f(r * 0.3 * k)}" fill="${darken(MATS.steel.base, 0.3)}"/>`
    if (filled) s += `<ellipse cx="${f(cx)}" cy="${f(ccy - r * 0.05)}" rx="${f(r * 0.27)}" ry="${f(r * 0.27 * k + r * 0.07)}" fill="${rad('idly', [[0, '#fffdf7'], [0.7, '#f1ead8'], [1, '#d9cdb2']], { cx: 0.4, cy: 0.35 })}"/>`
  }
  return s
}
function idlyStack(r, n, gap, k = 0.36) {
  let s = rod(0, -n * gap - 10, 0, -gap * 0.5, 8, '#8d959c')
  for (let i = 0; i < n; i++) s += idlyPlate(r, -i * gap, k)
  s += loopH(0, -n * gap - 20, 26, 'steel', 1)
  return s
}
function anda(m = 'brass', seed = 3) {
  const p = [[158, -330], [140, -305], [150, -275], [192, -210], [212, -135], [198, -60], [150, -14], [96, 0]]
  return shadow(0, 4, 230, 34) + lathe(p, m, { open: true, hammer: true, seed, rings: [[147, -282]] })
}
function carrier(r, h) {
  let s = shadow(0, 4, r * 1.3, r * 0.24) + lathe([[r, -h], [r, -14], [r - 6, 0]], 'steel', { rings: [[r, -h + 34], [r, -h * 0.5], [r, -32]] }) +
    handles(r, -h * 0.55, 42, 'steel') +
    lathe([[r + 6, -h - 26], [r + 6, -h]], 'steel') + cap(r + 6, -h - 26, 'steel')
  for (const sd of [-1, 1]) s += `<rect x="${f(sd * (r + 2) - 8)}" y="${f(-h - 36)}" width="16" height="46" rx="4" fill="${gCyl('#2a2b2d')}"/>`
  s += `<path d="M${f(-r * 0.55)},${f(-h - 30)}C${f(-r * 0.55)},${f(-h - 130)} ${f(r * 0.55)},${f(-h - 130)} ${f(r * 0.55)},${f(-h - 30)}" fill="none" stroke="${darken(MATS.steel.base, 0.35)}" stroke-width="10" stroke-linecap="round"/>` +
    `<rect x="-38" y="${f(-h - 118)}" width="76" height="20" rx="10" fill="#1c1c1e"/>`
  return s
}
function drum(r, h) {
  return shadow(0, 4, r * 1.3, r * 0.24) +
    lathe([[r, -h], [r, -10], [r - 5, 0]], 'steel', { rings: [[r, -h + 30], [r, -h * 0.66], [r, -h * 0.33], [r, -28]] }) +
    handles(r, -h * 0.8, 40, 'steel') +
    lathe([[r + 8, -h - 20], [r + 8, -h]], 'steel') + cap(r + 8, -h - 20, 'steel') +
    rod(-r * 0.35, -h - 34, r * 0.35, -h - 34, 14, '#8d959c', '#f2f4f5') +
    `<rect x="${f(-r * 0.35 - 6)}" y="${f(-h - 40)}" width="12" height="22" fill="#7a8188"/><rect x="${f(r * 0.35 - 6)}" y="${f(-h - 40)}" width="12" height="22" fill="#7a8188"/>`
}
function stove(n) {
  const w = n === 3 ? 600 : 420, x = -w / 2 - 50, y = -150, d = 230, fr = '#2a2b2e'
  const L = legs(x, y + 40, w, d, fr, { wd: 14 })
  let s = shadow(30, 0, w * 0.62, 40) + L.rear + box(x, y, w, 40, d, fr)
  for (let i = 0; i < n; i++) { const [bx, by] = topPt(x, y, w, d, (i + 0.5) / n, 0.5); s += burner(bx, by, (w / n) * 0.3) }
  s += L.front + `<rect x="${x + 8}" y="${y + 56}" width="${w - 16}" height="14" rx="7" fill="${gCylV('brass')}"/>`
  for (let i = 0; i < n; i++) s += knob(x + ((i + 0.5) / n) * w, y + 63, 16)
  return s
}
function cleaver(x, y, rot, s) {
  const blade = lin('blade', [[0, '#8f979e'], [0.3, '#eef2f4'], [0.55, '#bfc6cc'], [0.8, '#858d94'], [1, '#d5dbdf']], [0, 0, 1, 1])
  return g(`translate(${x},${y}) rotate(${rot}) scale(${s})`,
    `<path d="M0,-120L232,-120Q252,-120 253,-100L256,-8Q256,0 248,0L0,0Z" fill="${blade}" stroke="#6c737a" stroke-width="1.5"/>` +
    `<path d="M0,-13L254,-13L256,-6Q256,0 248,0L0,0Z" fill="#f4f7f8" opacity=".75"/>` +
    `<circle cx="216" cy="-93" r="11" fill="#7d5a37"/>` +
    `<rect x="-14" y="-82" width="16" height="44" rx="3" fill="#9aa2a9"/>` +
    `<rect x="-160" y="-80" width="148" height="38" rx="14" fill="#3b2516"/>` +
    `<rect x="-150" y="-76" width="128" height="7" rx="3" fill="#6b4a33" opacity=".8"/>` +
    [-125, -85, -45].map((cx) => `<circle cx="${cx}" cy="-61" r="5" fill="#c9a24f"/>`).join(''))
}
function woodGrad() { return lin('wood', [[0, '#a87445'], [0.5, '#c4925f'], [1, '#9a6a3e']], [0, 0, 1, 0.2]) }
function cupWhite(s = 1) { return g(T(0, 0, s), lathe([[30, -50], [26, -6], [22, 0]], '#eeeae2', { open: true }) + `<ellipse cx="0" cy="-50" rx="26" ry="7" fill="#5b3a22"/>`) }
function teaGlass(s = 1) {
  const p = [[34, -112], [30, -10], [28, 0]], tea = [[32, -86], [30, -10], [28, 0]]
  return g(T(0, 0, s),
    `<path d="${lathePath(tea)}" fill="${lin('tea', [[0, '#c48a52'], [1, '#7a4422']], [0, 0, 1, 0])}"/>` +
    `<ellipse cx="0" cy="-86" rx="32" ry="9.6" fill="#e6c79c"/>` +
    `<path d="${lathePath(p)}" fill="${GLASS()}" stroke="#9fa9b0" stroke-opacity=".6" stroke-width="1.5"/>` +
    `<ellipse cx="0" cy="-112" rx="34" ry="10" fill="none" stroke="#e8eef2" stroke-width="2"/>` +
    `<path d="M-22,-100L-20,-16" stroke="#fff" stroke-opacity=".6" stroke-width="4" stroke-linecap="round"/>`)
}

/* ------------------------------------------------------------------ products (base at y=0, centred on x=0) */
const P = {}

P['heavy-gauge-chinese-wok-kadai'] = () => {
  const k = 0.42
  const inner = rad('wok-in', [[0, '#7c6b58'], [0.35, '#4a3f35'], [0.8, '#1e1b19'], [1, '#141312']], { cx: 0.5, cy: 0.62, r: 0.62 })
  return shadow(10, 6, 250, 36) + loopH(-222, -118, 36, 'iron', -1) +
    lathe([[232, -130], [214, -82], [160, -30], [70, 0]], 'iron', { k }) +
    `<ellipse cx="0" cy="-130" rx="232" ry="${f(232 * k)}" fill="${inner}"/>` +
    `<ellipse cx="-70" cy="-160" rx="95" ry="20" fill="#fff" opacity=".08" transform="rotate(-8 -70 -160)"/>` +
    `<ellipse cx="0" cy="-130" rx="232" ry="${f(232 * k)}" fill="none" stroke="#6b645c" stroke-width="4"/>` +
    rod(214, -128, 316, -176, 18, '#2a2725', '#5d5751') + rod(300, -168, 372, -202, 28, '#6b4527', '#a8774a')
}
P['noodle-station-stockpot-strainer'] = () => {
  const big = [[150, -330], [150, 0]], small = [[105, -190], [105, 0]]
  const noodles = `<clipPath id="ncl"><ellipse cx="0" cy="-174" rx="98" ry="29"/></clipPath><g clip-path="url(#ncl)"><ellipse cx="0" cy="-174" rx="98" ry="29" fill="#e9c87a"/>` +
    Array.from({ length: 14 }, (_, i) => `<path d="M${-110 + i * 16},-200q14,18 0,34t4,30" fill="none" stroke="#c99d45" stroke-width="3"/>`).join('') + `</g>`
  return shadow(-70, 4, 200, 30) + shadow(170, 30, 130, 22) +
    g(T(-70, 0), handles(150, -290, 42, 'steel') + lathe(big, 'steel', { open: true, rings: [[150, -300], [150, -28]] }) +
      `<ellipse cx="-20" cy="-326" rx="72" ry="20" fill="${darken(MATS.steel.base, 0.5)}" stroke="#d9dfe4" stroke-width="5"/>` +
      rod(30, -330, 220, -500, 10, '#8d959c', '#f2f4f5') + `<circle cx="226" cy="-506" r="12" fill="none" stroke="#8d959c" stroke-width="6"/>`) +
    g(T(170, 30), handles(105, -160, 32, 'steel') + lathe(small, 'steel', { open: true, rings: [[105, -170], [105, -20]] }) + g(T(0, 8), noodles))
}
P['commercial-meat-vegetable-choppers'] = () => {
  const top = [[-330, -40], [290, -40], [360, -220], [-260, -220]]
  let grain = ''
  for (let i = 0; i < 9; i++) { const y = -60 - i * 18, x = -322 + i * 7 + 3; grain += `<path d="M${x},${y}q160,${(i % 2 ? 6 : -6)} 310,0t310,0" fill="none" stroke="#8a5a32" stroke-opacity=".35" stroke-width="2"/>` }
  return shadow(10, 4, 360, 40) +
    poly([[-330, -40], [290, -40], [290, 0], [-330, 0]], `fill="#8a5a34"`) +
    poly([[290, -40], [360, -220], [360, -180], [290, 0]], `fill="#6e4528"`) +
    poly(top, `fill="${woodGrad()}"`) + `<g clip-path="url(#boardclip)">${grain}</g><clipPath id="boardclip">${poly(top, '')}</clipPath>` +
    `<path d="M-330,-40H290" stroke="#d9a873" stroke-width="2"/>` +
    cleaver(10, -120, 12, 0.85) + cleaver(-130, -70, -6, 1)
}
P['multi-tier-stainless-momo-steamer'] = () => {
  const r = 150
  let s = shadow(0, 4, 200, 32) + handles(r, -110, 40, 'steel') + lathe([[r, -150], [r - 6, -10], [r - 14, 0]], 'steel', { rings: [[r, -132]] })
  for (let i = 0; i < 3; i++) {
    const y = -150 - i * 88
    s += handles(r + 4, y - 48, 28, 'steel') + lathe([[r + 4, y - 88], [r + 4, y - 6], [r, y]], 'steel', { rings: [[r + 4, y - 80], [r + 4, y - 16]] })
    for (let j = -4; j <= 4; j++) s += `<ellipse cx="${j * 30}" cy="${f(y - 46 + Math.abs(j) * -2)}" rx="${f(4.5 * (1 - Math.abs(j) / 7))}" ry="3" fill="#5b626a" opacity=".55"/>`
  }
  return s + lid(r + 8, -414, 'steel', { h: 72 }) + steam(0, -520, 3, 70)
}
P['commercial-chest-deep-freezer'] = () => {
  const x = -300, y = -300, w = 520, h = 300, d = 200, W = '#efefed'
  let s = shadow(20, 4, 340, 38) + box(x, y, w, h, d, W) +
    `<rect x="${x}" y="-46" width="${w}" height="46" fill="#3b3e42"/>` +
    poly([[x + w, -46], [x + w + d * DX, -46 + d * DY], [x + w + d * DX, d * DY], [x + w, 0]], 'fill="#2b2d30"')
  for (let i = 0; i < 12; i++) s += `<rect x="${x + 24 + i * 22}" y="-34" width="12" height="22" rx="2" fill="#1d1f22"/>`
  s += `<rect x="${x}" y="${y + 120}" width="${w}" height="10" fill="${gFront('steel')}"/>` +
    box(x - 6, y - 26, w + 12, 26, d + 8, '#f7f7f5') +
    `<rect x="-120" y="${y - 16}" width="190" height="10" rx="5" fill="#8e969d"/>` +
    `<rect x="${x + w - 150}" y="${y + 30}" width="120" height="50" rx="5" fill="#25282c"/>` +
    `<text x="${x + w - 128}" y="${y + 64}" font-family="Consolas,monospace" font-size="24" font-weight="700" fill="#62d987">-18°C</text>` +
    `<circle cx="${x + w - 42}" cy="${y + 55}" r="5" fill="#62d987"/>`
  return s
}
P['compact-stainless-mini-cookers'] = () => g(T(-150, -10), pressureCooker(95, 170, 'steel')) + g(T(100, 30), pressureCooker(75, 135, 'steel'))
P['colour-coded-commercial-chopping-boards'] = () => {
  let s = shadow(-20, 4, 340, 36) +
    g('translate(40,-30) rotate(6)', `<rect x="-140" y="-440" width="330" height="440" rx="26" fill="${woodGrad()}"/>` +
      `<rect x="186" y="-436" width="14" height="432" rx="6" fill="#7a5030"/>` +
      Array.from({ length: 8 }, (_, i) => `<path d="M${-120 + i * 40},-430q${i % 2 ? 10 : -10},200 0,420" stroke="#8a5a32" stroke-opacity=".3" stroke-width="2" fill="none"/>`).join('') +
      `<ellipse cx="25" cy="-390" rx="34" ry="14" fill="#5d3c22"/>`)
  ;['#e9e7e1', '#2f5f9e', '#c23a2e', '#2f7d4f'].reverse().forEach((c, i) => { s += box(-300 + i * 8, -(i + 1) * 34, 460, 30, 210, c) })
  return s
}
P['stainless-steel-tea-boiler-brass-tap'] = () =>
  shadow(0, 4, 170, 28) + handles(130, -320, 40, 'steel') +
  lathe([[72, -430], [110, -398], [128, -350], [130, -40], [122, -12], [116, 0]], 'steel', { rings: [[128, -350], [130, -200], [130, -62]] }) +
  tap(118, -78, 1, 1.2) + lid(78, -430, 'steel', { h: 46, knobM: 'brass' }) + steam(0, -520, 2, 50)
P['heavy-gauge-milk-boiler'] = () =>
  shadow(0, 4, 230, 34) + handles(175, -245, 46, 'steel') +
  lathe([[175, -290], [175, -20], [168, 0]], 'steel', { rings: [[175, -268], [175, -150], [175, -36]] }) +
  tap(164, -60, 1, 1.3) + lathe([[182, -304], [182, -290]], 'steel') + cap(182, -304, 'steel') +
  lathe([[16, -330], [22, -320], [12, -304]], '#2a2b2d')
P['commercial-three-burner-gas-stove'] = () => stove(3)
P['commercial-two-burner-gas-stove'] = () => stove(2)
P['traditional-copper-tea-boiler'] = () =>
  shadow(0, 4, 190, 30) + handles(138, -300, 42, 'brass') +
  lathe([[64, -410], [100, -385], [135, -300], [142, -150], [122, -24], [104, 0]], 'copper', { hammer: true, seed: 11, rings: [[140, -220], [124, -30]] }) +
  tap(128, -70, 1, 1.2) + lid(68, -410, 'copper', { h: 46, knobM: 'brass' })
P['high-pressure-commercial-gas-range'] = () => {
  const x = -300, y = -330, w = 520, d = 250, fr = '#2a2b2e'
  const L = legs(x, y + 34, w, d, fr, { wd: 20 })
  const [b1x, b1y] = topPt(x, y, w, d, 0.27, 0.5), [b2x, b2y] = topPt(x, y, w, d, 0.73, 0.5)
  return shadow(40, 0, 360, 44) + L.rear + box(x + 10, -110, w - 20, 14, d - 20, fr) + box(x, y, w, 34, d, fr) +
    burner(b1x, b1y, 96) + burner(b2x, b2y, 96) +
    g(T(b1x, b1y), lathe([[118, -190], [118, -10], [112, 0]], 'steel', { open: true, rings: [[118, -170]] }) + handles(118, -160, 34, 'steel')) +
    steam(b1x, b1y - 240, 3, 50) + L.front + knob(x + w * 0.27, y + 17, 15) + knob(x + w * 0.73, y + 17, 15)
}
P['hindolium-dabara-tumbler-sets'] = () =>
  g(T(-200, -40, 0.9), dabaraSet('alu')) + g(T(170, -50, 0.9), dabaraStack(3, 'alu')) + g(T(250, 30, 0.8), tumbler('alu')) + g(T(-10, 20), dabaraSet('alu'))
P['standard-round-idly-pot-with-plates'] = () =>
  shadow(-100, 4, 190, 30) + g(T(-100, 0), handles(140, -200, 38, 'steel') + lathe([[140, -240], [140, -16], [132, 0]], 'steel', { rings: [[140, -220], [140, -36]] }) + lid(146, -240, 'steel', { h: 60 })) +
  shadow(180, 30, 140, 22) + g(T(180, 30), idlyStack(115, 4, 42))
P['heavy-gauge-round-idly-steamer'] = () => {
  const pot = [[170, -260], [170, -16], [162, 0]]
  return shadow(-50, 4, 240, 36) +
    g(T(-50, 0), handles(170, -220, 44, 'steel') + lathe(pot, 'steel', { open: true, rings: [[170, -238], [170, -40]] }) + g(T(0, -150), idlyStack(150, 6, 44)) + latheFront(pot, 'steel')) +
    shadow(270, 10, 110, 20) + g('translate(275,-20) rotate(22)', lid(115, 0, 'steel', { h: 50 }))
}
P['square-idly-pot-and-tray'] = () => {
  const x = -260, y = -280, w = 300, d = 190
  let s = shadow(-60, 4, 260, 34) + loopH(x + 3, -200, 34, 'steel', -1) + box(x, y, w, 280, d, 'steel') +
    `<rect x="${x}" y="${y + 24}" width="${w}" height="4" fill="#7b838b" opacity=".5"/><rect x="${x}" y="-40" width="${w}" height="4" fill="#7b838b" opacity=".5"/>` +
    box(x - 8, y - 24, w + 16, 24, d + 10, 'steel')
  const [kx, ky] = topPt(x - 8, y - 24, w + 16, d + 10, 0.5, 0.5)
  s += g(T(kx, ky), lathe([[22, -22], [28, -12], [14, 0]], '#2a2b2d'))
  const tx = 70, ty = -14, tw = 210, td = 150
  s += shadow(200, 4, 160, 20) + box(tx, ty, tw, 14, td, 'steel')
  for (let j = 2; j >= 0; j--) for (let i = 0; i < 3; i++) {
    const [cx, cy] = topPt(tx, ty, tw, td, (i + 0.5) / 3, (j + 0.5) / 3)
    s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="26" ry="11" fill="#7b838b"/><ellipse cx="${f(cx)}" cy="${f(cy - 4)}" rx="23" ry="13" fill="${rad('idly', [[0, '#fffdf7'], [0.7, '#f1ead8'], [1, '#d9cdb2']], { cx: 0.4, cy: 0.35 })}"/>`
  }
  return s
}
P['insulated-catering-food-carriers'] = () => g(T(-110, -10), carrier(135, 320)) + g(T(160, 30), carrier(100, 230))
P['stainless-steel-storage-drums'] = () => g(T(-110, -10), drum(150, 380)) + g(T(170, 30), drum(105, 260))
P['catering-grade-steel-dabara-sets'] = () =>
  g(T(-210, -40), dabaraStack(6, 'steel')) + g(T(200, -50), tumblerTower(7)) + g(T(0, 30, 1.1), dabaraSet('steel'))
P['brass-anda-serving-vessel'] = () => g(T(-60, -10), anda('brass')) + g(T(210, 40, 0.48), anda('steel', 5))
P['stainless-steel-anda-service-table'] = () => {
  const x = -320, y = -300, w = 540, d = 240
  const L = legs(x, y + 22, w, d, 'steel', { wd: 18 })
  const [ax, ay] = topPt(x, y, w, d, 0.32, 0.5), [bx, by] = topPt(x, y, w, d, 0.76, 0.45)
  return shadow(40, 0, 380, 44) + L.rear + box(x + 14, -100, w - 28, 12, d - 20, 'steel') + box(x, y, w, 22, d, 'steel') +
    g(T(ax, ay, 0.46), anda('brass', 9)) +
    g(T(bx, by), shadow(0, 3, 90, 14, 0.3) + lathe([[78, -120], [66, -8], [62, 0]], 'steel', { open: true, rings: [[77, -108]] }) +
      `<path d="M-74,-112C-74,-210 74,-210 74,-112" fill="none" stroke="#8d959c" stroke-width="6"/>`) + L.front
}
P['compartment-tiffler-meal-plates'] = () => {
  const tray = (x, y, w, d, comps = true) => {
    let s = box(x, y, w, 16, d, 'steel')
    if (!comps) return s
    const cells = [[0.04, 0.6, 0.06, 0.52], [0.64, 0.96, 0.06, 0.52], [0.04, 0.33, 0.6, 0.94], [0.36, 0.64, 0.6, 0.94], [0.67, 0.96, 0.6, 0.94]]
    for (const [u0, u1, v0, v1] of cells) {
      const pts = [[u0, v0], [u1, v0], [u1, v1], [u0, v1]].map(([u, v]) => topPt(x, y, w, d, u, v))
      s += poly(pts, `fill="${lin('cell', [[0, '#8f979e'], [1, '#d3d9de']])}" stroke="#eef2f4" stroke-width="2"`)
    }
    return s
  }
  let s = shadow(110, -20, 220, 30) + shadow(-70, 10, 260, 34)
  for (let i = 0; i < 7; i++) s += tray(-20, -60 - i * 18, 300, 210, i === 6)
  return s + tray(-330, 0, 380, 250)
}
P['stainless-steel-tumblers-bulk'] = () => {
  let s = ''
  for (const x of [-170, -50, 70]) s += g(T(x, -70), tumbler())
  for (const x of [-230, -110, 10]) s += g(T(x, 10), tumbler())
  return s + g(T(200, 20), tumblerTower(7))
}
P['commercial-stainless-cutlery-set'] = () => {
  const holder = [[78, -180], [74, -10], [70, 0]]
  const blade = lin('blade', [[0, '#8f979e'], [0.3, '#eef2f4'], [0.55, '#bfc6cc'], [0.8, '#858d94'], [1, '#d5dbdf']], [0, 0, 1, 1])
  const spoonUp = (x, a) => g(`translate(${x},-150) rotate(${a})`, `<rect x="-6" y="-180" width="12" height="180" rx="6" fill="${gCyl('steel')}"/><ellipse cx="0" cy="-205" rx="24" ry="36" fill="${blade}" stroke="#7b838b" stroke-width="1.5"/>`)
  const forkUp = (x, a) => g(`translate(${x},-150) rotate(${a})`, `<rect x="-6" y="-170" width="12" height="170" rx="6" fill="${gCyl('steel')}"/><path d="M-20,-170Q-20,-196 -18,-240M-7,-172L-7,-244M7,-172L7,-244M20,-170Q20,-196 18,-240" stroke="#a9b1b8" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M-20,-176Q0,-160 20,-176" stroke="#a9b1b8" stroke-width="10" fill="none"/>`)
  const lying = (x, y, a, fork) => g(`translate(${x},${y}) rotate(${a}) scale(1,0.5)`, fork
    ? `<rect x="-130" y="-8" width="190" height="16" rx="8" fill="${gCylV('steel')}"/><path d="M60,-20L130,-24M60,-7L132,-8M60,7L132,8M60,20L130,24" stroke="#c4cbd1" stroke-width="8" stroke-linecap="round"/><path d="M56,-24L56,24" stroke="#c4cbd1" stroke-width="12"/>`
    : `<rect x="-130" y="-8" width="190" height="16" rx="8" fill="${gCylV('steel')}"/><ellipse cx="100" cy="0" rx="52" ry="34" fill="${blade}" stroke="#7b838b" stroke-width="2"/>`)
  return shadow(-60, 4, 140, 22) + g(T(-60, 0), lathe(holder, 'steel', { open: true }) + spoonUp(-30, -12) + forkUp(10, 6) + spoonUp(36, 16) + forkUp(-50, -22) + latheFront(holder, 'steel') +
    Array.from({ length: 18 }, (_, i) => `<circle cx="${f(-55 + (i % 6) * 22)}" cy="${f(-140 + Math.floor(i / 6) * 40)}" r="6" fill="#5b626a" opacity=".7"/>`).join('')) +
    shadow(180, 30, 170, 18, 0.2) + lying(170, 0, -8, false) + lying(180, 50, -4, true)
}
P['full-size-steel-lunch-plates'] = () => {
  let s = shadow(-110, 4, 230, 34)
  for (let i = 0; i < 10; i++) s += g(T(-110, -i * 9), plateDisc(190, 0.32))
  const face = rad('plateface', [[0, '#f5f7f8'], [0.55, '#c3cad0'], [0.82, '#e8ecef'], [0.9, '#8f979e'], [1, '#dfe4e8']], { cx: 0.42, cy: 0.4, r: 0.55 })
  return s + shadow(190, 20, 120, 18) +
    g('translate(190,-180) rotate(-6) scale(0.72,1)', `<circle r="180" fill="${face}" stroke="#7b838b" stroke-width="2"/><circle r="150" fill="none" stroke="#7b838b" stroke-opacity=".5" stroke-width="2"/><circle r="146" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`)
}
P['four-pan-bain-marie-counter'] = () => {
  const x = -330, y = -290, w = 560, d = 230
  const L = legs(x, -60, w, d, 'steel', { wd: 18 })
  let s = shadow(30, 0, 400, 44) + L.rear + box(x, y, w, 230, d, 'steel')
  const foods = ['#d58a2a', '#f3eee0', '#6d8f3a', '#e3b33a']
  foods.forEach((c, i) => {
    const u0 = 0.04 + i * 0.24, u1 = u0 + 0.21
    const rimPts = [[u0, 0.12], [u1, 0.12], [u1, 0.88], [u0, 0.88]].map(([u, v]) => topPt(x, y, w, d, u, v))
    const foodPts = [[u0 + 0.015, 0.2], [u1 - 0.015, 0.2], [u1 - 0.015, 0.82], [u0 + 0.015, 0.82]].map(([u, v]) => topPt(x, y, w, d, u, v))
    s += poly(rimPts, `fill="#7b838b" stroke="#eef2f4" stroke-width="2.5"`) + poly(foodPts, `fill="${c}"`) +
      poly(foodPts, `fill="${lin('foodsheen', [[0, '#fff', 0.25], [1, '#000', 0.15]])}"`)
    s += knob(x + ((i + 0.5) / 4) * w, y + 40, 13)
  })
  s += `<rect x="${x}" y="${y + 70}" width="${w}" height="3" fill="#7b838b" opacity=".6"/>`
  const posts = [topPt(x, y, w, d, 0.01, 0.06), topPt(x, y, w, d, 0.99, 0.06)]
  for (const [px, py] of posts) s += `<rect x="${f(px - 5)}" y="${f(py - 150)}" width="10" height="150" fill="${gCyl('steel')}"/>`
  const gl = [[0, 0], [1, 0], [1, 0.62], [0, 0.62]].map(([u, v]) => { const [a, b] = topPt(x, y, w, d, u, v); return [a, b - 150] })
  return s + poly(gl, `fill="${GLASS()}" stroke="#d9e4ea" stroke-width="2"`) + steam(x + w * 0.4, y - 60, 3, 120, '#b9b3a8', 0.2) + L.front
}
P['canteen-steel-table-and-stools'] = () => {
  const x = -250, y = -250, w = 400, d = 230
  const L = legs(x, y + 20, w, d, 'steel', { wd: 16 })
  const stool = (sx, sy) => g(T(sx, sy), shadow(0, 2, 80, 14, 0.3) +
    [[-48, -10], [48, -10], [-30, -40], [30, -40]].map(([lx, ly]) => rod(lx * 0.6, -160 + ly * 0.2, lx, ly + 10, 10, '#8d959c', '#e6eaed')).join('') +
    `<ellipse cx="0" cy="-60" rx="48" ry="12" fill="none" stroke="#8d959c" stroke-width="6"/>` +
    lathe([[64, -178], [64, -164]], 'steel') + cap(64, -178, 'steel'))
  return shadow(0, -10, 330, 44) + L.rear + box(x, y, w, 20, d, 'steel') + L.front + stool(-280, 40) + stool(230, 50)
}
P['commercial-atta-flour-mill'] = () => {
  const paint = '#2f5d7c', x = -230, y = -250, w = 300, d = 180
  const [cx, cy] = topPt(x, y, w, d, 0.42, 0.5)
  const sack = `<path d="M-305,0C-320,-60 -300,-120 -270,-150L-200,-150C-170,-120 -150,-60 -165,0Z" fill="${lin('sack', [[0, '#efe5cf'], [1, '#c9b892']], [0, 0, 1, 0])}"/>` +
    `<path d="M-265,-130Q-240,-80 -250,-20M-215,-135Q-200,-80 -210,-10" stroke="#b5a37d" stroke-width="3" fill="none"/>` +
    `<rect x="-276" y="-160" width="80" height="14" rx="5" fill="#8a7a58"/>`
  return shadow(30, 4, 360, 40) + box(x, y, w, 250, d, paint) +
    `<rect x="${x + 20}" y="${y + 30}" width="${w - 40}" height="3" fill="#000" opacity=".25"/>` +
    g(T(cx, cy), lathe([[95, -130], [95, 0]], 'steel', { rings: [[95, -110], [95, -20]] }) + cap(95, -130, 'steel')) +
    g(T(cx, cy - 130), lathe([[155, -175], [52, -40], [42, 0]], 'steel', { open: true })) +
    `<path d="M${x + 60},-170L-236,-150L-236,-136L${x + 60},-150Z" fill="${gCylV('steel')}"/>` + sack +
    g(T(240, 0), shadow(0, 2, 100, 14) + `<rect x="-90" y="-140" width="180" height="120" rx="40" fill="${gCylV('#3c4148')}"/>` +
      Array.from({ length: 8 }, (_, i) => `<rect x="${-70 + i * 18}" y="-136" width="6" height="112" fill="#24272b" opacity=".6"/>`).join('') +
      `<rect x="-70" y="-20" width="140" height="20" fill="#2a2b2e"/><circle cx="-92" cy="-80" r="34" fill="${gCylV('#3c4148')}"/>`) +
    rod(150, -90, 70, -230, 12, '#1d1d1f', '#444')
}
P['commercial-vegetable-cutting-machine'] = () => {
  const x = -220, y = -250, w = 280, d = 180
  const [hx, hy] = topPt(x, y, w, d, 0.45, 0.5)
  const slice = (cx, cy, c, r = 14) => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${f(r * 0.5)}" fill="${c}" stroke="${darken(c, 0.25)}" stroke-width="1.5"/>`
  const R = rng(4)
  let veg = ''
  for (let i = 0; i < 46; i++) veg += slice(f(130 + R() * 180), f(-30 - R() * 70), ['#f08a24', '#8bbf4a', '#e9e2f0', '#f08a24'][i % 4], 11 + R() * 6)
  return shadow(20, 4, 360, 40) + box(x, y, w, 250, d, 'steel') +
    `<circle cx="${x + 50}" cy="${y + 60}" r="13" fill="#2f9e5a"/><circle cx="${x + 90}" cy="${y + 60}" r="13" fill="#d23a2e"/><rect x="${x + 30}" y="${y + 100}" width="120" height="30" rx="4" fill="#d9dfe4" stroke="#8d959c"/>` +
    g(T(hx, hy), lathe([[112, -100], [112, 0]], 'steel', { rings: [[112, -18]] }) + cap(112, -100, 'steel') +
      g(T(-40, -110), lathe([[40, -110], [40, 0]], 'steel', { open: true })) + rod(-40, -235, 90, -180, 16, '#8d959c', '#f2f4f5') + `<circle cx="-40" cy="-236" r="16" fill="#2a2b2d"/>`) +
    `<path d="M${hx + 100},${hy - 60}L${hx + 220},${hy + 40}L${hx + 200},${hy + 70}L${hx + 90},${hy - 20}Z" fill="${gCylV('steel')}"/>` +
    shadow(220, 10, 150, 18, 0.3) + box(110, -26, 220, 26, 120, 'steel') + veg
}
P['heavy-duty-commercial-mixer-grinder'] = () => {
  const cream = '#e7e1d3', x = -110, y = -250, w = 190, d = 150
  const [jx, jy] = topPt(x, y, w, d, 0.5, 0.5)
  const jar = (r, h, s = 1) => g(T(0, 0, s), lathe([[r, -h], [r * 0.85, -h * 0.3], [r * 0.62, 0]], 'steel', { rings: [[r * 0.98, -h + 14]] }) +
    lathe([[r + 4, -h - 18], [r + 4, -h]], '#1c1c1e') + cap(r + 4, -h - 18, '#2a2b2d') +
    `<path d="M${f(r * 0.9)},${f(-h + 20)}C${f(r * 1.7)},${f(-h + 20)} ${f(r * 1.5)},${f(-h * 0.35)} ${f(r * 0.8)},${f(-h * 0.35)}" fill="none" stroke="#1c1c1e" stroke-width="14" stroke-linecap="round"/>`)
  return shadow(-20, 4, 330, 36) + box(x, y, w, 250, d, cream) +
    knob(x + w / 2, y + 120, 26) + `<rect x="${x + 30}" y="${y + 180}" width="${w - 60}" height="6" rx="3" fill="#bdb5a3"/><rect x="${x + 30}" y="${y + 196}" width="${w - 60}" height="6" rx="3" fill="#bdb5a3"/>` +
    g(T(jx, jy), jar(80, 230)) + g(T(-240, 20), shadow(0, 2, 80, 14, 0.3) + jar(65, 170)) + g(T(250, 30), shadow(0, 2, 70, 12, 0.3) + jar(52, 130))
}
P['tilting-wet-grinder-idly-dosa-batter'] = () => {
  const paint = '#2f5d7c', drumP = [[150, -210], [150, -20], [140, 0]]
  const stone = (sx) => g(T(sx, -150), lathe([[36, -70], [36, 0]], '#6d6f72', { rings: [[36, -40]] }) + cap(36, -70, '#6d6f72'))
  return shadow(0, 4, 320, 40) + box(-200, -170, 300, 170, 170, paint) +
    `<rect x="-200" y="-120" width="300" height="3" fill="#000" opacity=".25"/>` +
    `<rect x="-230" y="-430" width="30" height="270" fill="${gCyl('#3c4148')}"/><rect x="150" y="-460" width="30" height="300" fill="${gCyl('#3c4148')}"/>` +
    g('translate(-25,-260) rotate(-18)', lathe(drumP, 'steel', { open: true, rings: [[150, -40]] }) +
      `<ellipse cx="0" cy="-185" rx="138" ry="41" fill="${rad('batter', [[0, '#fbf7ec'], [1, '#e4dac2']], { cx: 0.45, cy: 0.4 })}"/>` + stone(-55) + stone(55) +
      `<rect x="-150" y="-300" width="300" height="20" rx="8" fill="#2a2b2d"/><rect x="-12" y="-290" width="24" height="120" fill="${gCyl('steel')}"/>` + latheFront(drumP, 'steel')) +
    g(T(165, -330), `<circle r="62" fill="none" stroke="#1d1d1f" stroke-width="10"/>` + [0, 60, 120].map((a) => `<line x1="0" y1="0" x2="${f(62 * Math.cos((a * Math.PI) / 180))}" y2="${f(62 * Math.sin((a * Math.PI) / 180))}" stroke="#1d1d1f" stroke-width="7" transform="rotate(${a})"/>`).join('') + `<circle r="14" fill="#55575b"/>`)
}
P['commercial-masala-spice-pulveriser'] = () => {
  const x = -230, y = -180, w = 280, d = 170
  const face = rad('chamber', [[0, '#f7f9fa'], [0.6, '#b4bbc2'], [1, '#6f777f']], { cx: 0.38, cy: 0.35, r: 0.7 })
  return shadow(20, 4, 350, 40) +
    g(T(170, -10), shadow(0, 2, 120, 14) + `<rect x="-110" y="-150" width="220" height="140" rx="50" fill="${gCylV('#7a2a26')}"/>` +
      Array.from({ length: 9 }, (_, i) => `<rect x="${-88 + i * 20}" y="-146" width="7" height="132" fill="#4a1714" opacity=".55"/>`).join('') + `<rect x="-90" y="-14" width="180" height="14" fill="#2a2b2e"/>`) +
    box(x, y, w, 180, d, 'steel') +
    g(T(x + 130, y - 90), `<circle cx="22" cy="-14" r="96" fill="#6f777f"/><circle r="96" fill="${face}" stroke="#5b626a" stroke-width="3"/>` +
      Array.from({ length: 8 }, (_, i) => { const t = (i * Math.PI) / 4; return `<circle cx="${f(Math.cos(t) * 80)}" cy="${f(Math.sin(t) * 80)}" r="7" fill="#5b626a"/>` }).join('') +
      `<circle r="26" fill="#2a2b2d"/><rect x="-6" y="-60" width="12" height="120" rx="6" fill="#2a2b2d" transform="rotate(35)"/>`) +
    g(T(x + 150, y - 190), lathe([[105, -130], [36, -20], [30, 0]], 'steel', { open: true })) +
    `<path d="M${x + 80},${y + 40}L${x + 30},${y + 120}L${x + 60},${y + 130}L${x + 110},${y + 50}Z" fill="${gCylV('steel')}"/>` +
    g(T(-290, 30), shadow(0, 2, 100, 14, 0.3) + lathe([[90, -40], [80, 0]], 'steel', { open: true }) +
      `<path d="M-78,-40Q0,-110 78,-40Z" fill="${rad('chilli', [[0, '#c4572f'], [1, '#7d2a17']], { cx: 0.4, cy: 0.3 })}"/>`)
}
P['aluminium-pressure-cookers-range'] = () =>
  g(T(-150, -40), pressureCooker(120, 200, 'alu')) + g(T(110, 10), pressureCooker(92, 160, 'alu')) + g(T(-250, 50), pressureCooker(66, 115, 'alu'))
P['hard-anodised-cookware-set'] = () => {
  const kadai = [[170, -120], [160, -70], [120, -22], [60, 0]], pan = [[122, -46], [112, -12], [96, 0]]
  return g('translate(250,-160) rotate(10)', shadow(0, 150, 120, 20) + `<ellipse rx="125" ry="140" fill="${rad('tawa', [[0, '#55595d'], [0.7, '#2a2c2e'], [1, '#141516']], { cx: 0.4, cy: 0.35 })}"/>` +
      `<ellipse rx="105" ry="118" fill="none" stroke="#3c4044" stroke-width="2"/>` + rod(0, -140, 0, -230, 18, '#1c1c1e', '#55575b')) +
    shadow(-20, -20, 220, 30) + g(T(-20, -30), loopH(-168, -100, 38, '#1c1c1e', -1) + loopH(168, -100, 38, '#1c1c1e', 1) + lathe(kadai, 'anod', { k: 0.34 }) + glassLid(176, -120, { k: 0.34, h: 60 })) +
    shadow(-130, 40, 160, 22) + g(T(-130, 40), lathe(pan, 'anod', { open: true, k: 0.36 }) + rod(-118, -40, -260, -10, 22, '#1c1c1e', '#55575b'))
}
P['pressure-cooker-spare-parts-gaskets-weights'] = () => {
  const gasket = (cx, cy, r) => `<ellipse cx="${cx}" cy="${cy + 6}" rx="${r}" ry="${f(r * 0.38)}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="18" filter="url(#blurS)"/>` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${f(r * 0.38)}" fill="none" stroke="#1d1d1f" stroke-width="16"/><ellipse cx="${cx}" cy="${cy - 4}" rx="${r}" ry="${f(r * 0.38)}" fill="none" stroke="#4d4f53" stroke-width="3"/>`
  const weight = (cx, cy, m) => g(T(cx, cy), shadow(0, 2, 30, 6, 0.3) + lathe([[12, -40], [22, -30], [22, -10], [12, 0]], m) + `<ellipse cx="0" cy="-40" rx="12" ry="3.6" fill="${lighten(M(m).base, 0.4)}"/>`)
  const valve = (cx, cy) => g(T(cx, cy), shadow(0, 2, 22, 5, 0.3) + lathe([[10, -26], [14, -18], [14, -8], [18, -4], [18, 0]], 'steel'))
  const handle = (cx, cy, a, l = 240) => g(`translate(${cx},${cy}) rotate(${a})`, `<rect x="0" y="-18" width="${l}" height="36" rx="18" fill="#000" opacity=".25" filter="url(#blurS)" transform="translate(4,8)"/>` +
    `<rect x="0" y="-18" width="${l}" height="36" rx="18" fill="${gCylV('#26282a')}"/><circle cx="30" cy="0" r="6" fill="#8d959c"/><circle cx="${l - 40}" cy="0" r="6" fill="#8d959c"/>`)
  return gasket(-160, -260, 130) + gasket(110, -270, 110) + gasket(-30, -170, 95) +
    handle(-300, -60, -4) + handle(30, -40, 3, 260) +
    weight(-240, 40, '#2a2a2c') + weight(-150, 50, 'alu') + weight(-60, 40, '#2a2a2c') + valve(60, 50) + valve(130, 40) + valve(200, 55) + weight(280, 40, 'alu')
}
P['commercial-planetary-mixer'] = () => {
  const paint = '#ddd7c9', bowl = [[120, -200], [112, -110], [80, -30], [50, 0]]
  return shadow(0, 4, 300, 40) + box(-220, -80, 330, 80, 200, paint) + box(40, -470, 100, 390, 110, paint) +
    `<rect x="60" y="-400" width="60" height="70" rx="6" fill="#2a2b2e"/><circle cx="90" cy="-376" r="11" fill="#2f9e5a"/><circle cx="90" cy="-346" r="7" fill="#d23a2e"/>` +
    box(-210, -540, 350, 90, 110, paint) +
    `<path d="M40,-300L-30,-250M40,-300L-90,-250" stroke="#7a756a" stroke-width="12" stroke-linecap="round"/>` +
    g(T(-50, -80), lathe(bowl, 'steel', { open: true }) +
      `<path d="M-20,-370L-20,-290C-20,-230 50,-230 40,-170C30,-130 -40,-140 -30,-100" fill="none" stroke="#c4cbd1" stroke-width="14" stroke-linecap="round"/>` +
      `<rect x="-36" y="-372" width="32" height="20" fill="#5b626a"/>` + latheFront(bowl, 'steel'))
}
P['commercial-high-speed-blenders'] = () => {
  const blender = (liquid, s) => {
    const jar = 'M-62,-160L62,-160L84,-420L-84,-420Z', liq = 'M-62,-160L62,-160L76,-320L-76,-320Z'
    return g(T(0, 0, s), shadow(0, 4, 130, 20) + box(-90, -150, 170, 150, 130, '#26282b') + knob(-5, -80, 26) +
      `<path d="${liq}" fill="${lin(`liq-${key(liquid)}`, [[0, lighten(liquid, 0.2)], [1, darken(liquid, 0.2)]], [0, 0, 1, 0])}" opacity=".92"/>` +
      `<ellipse cx="0" cy="-320" rx="76" ry="12" fill="${lighten(liquid, 0.35)}"/>` +
      `<path d="${jar}" fill="${GLASS()}" stroke="#8f989f" stroke-width="2.5"/><path d="M-62,-200L-76,-400" stroke="#fff" stroke-opacity=".75" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M80,-390C150,-390 150,-200 70,-200" fill="none" stroke="#1d1e20" stroke-width="18" stroke-linecap="round"/>` +
      `<rect x="-90" y="-444" width="180" height="28" rx="8" fill="#1d1e20"/><rect x="-24" y="-462" width="48" height="20" rx="6" fill="#2a2b2e"/>` +
      `<rect x="-70" y="-166" width="140" height="16" fill="#1d1e20"/>`)
  }
  return g(T(-130, -10), blender('#e2738a', 1)) + g(T(160, 30), blender('#93c24f', 0.82))
}
P['curved-glass-bakery-display-showcase'] = () => {
  const x = -340, w = 600, d = 190, dx = d * DX, dy = d * DY
  const cake = (cx, cy, c, s = 1) => g(T(cx, cy, s), lathe([[42, -44], [42, 0]], c, { rings: [[42, -22]] }) + cap(42, -44, lighten(c, 0.35)) + `<circle cx="0" cy="-50" r="7" fill="#c0202a"/>`)
  const croissant = (cx, cy) => `<path d="M${cx - 40},${cy}Q${cx},${cy - 50} ${cx + 40},${cy}Q${cx},${cy - 22} ${cx - 40},${cy}Z" fill="${rad('crois', [[0, '#e9b467'], [1, '#a5641f']], { cx: 0.5, cy: 0.3 })}"/>`
  const donut = (cx, cy) => `<ellipse cx="${cx}" cy="${cy}" rx="34" ry="15" fill="#c98a4a"/><ellipse cx="${cx}" cy="${cy - 4}" rx="30" ry="12" fill="#6a3a1f"/><ellipse cx="${cx}" cy="${cy - 4}" rx="9" ry="4" fill="#3a2414"/>`
  let s = shadow(30, 4, 400, 44) + box(x, -210, w, 210, d, '#6b4a33') + `<rect x="${x}" y="-30" width="${w}" height="30" fill="${gFront('steel')}"/>`
  for (let i = 0; i < 6; i++) s += `<rect x="${x + 20 + i * 98}" y="-190" width="80" height="140" rx="3" fill="none" stroke="#4e3524" stroke-width="3"/>`
  s += poly([[x + dx, -470 + dy], [x + w + dx, -470 + dy], [x + w + dx, -210 + dy], [x + dx, -210 + dy]], `fill="${lin('case-back', [[0, '#f8efe0'], [1, '#e5d3b6']])}"`) +
    poly([[x, -210], [x + w, -210], [x + w + dx, -210 + dy], [x + dx, -210 + dy]], 'fill="#f2e7d4"') +
    poly([[x, -340], [x + w, -340], [x + w + dx, -340 + dy], [x + dx, -340 + dy]], `fill="${GLASS()}" stroke="#cfd8de" stroke-width="2"`)
  for (let i = 0; i < 5; i++) s += cake(x + 100 + i * 110 + dx * 0.4, -340 + dy * 0.4 + 6, ['#f2d7e0', '#5a3626', '#f7f0e2', '#e7c25c', '#f2d7e0'][i], 0.8)
  for (let i = 0; i < 5; i++) s += i % 2 ? donut(x + 90 + i * 115 + dx * 0.4, -210 + dy * 0.4 + 2) : croissant(x + 90 + i * 115 + dx * 0.4, -210 + dy * 0.4 + 4)
  s += `<rect x="${x + dx}" y="${-470 + dy}" width="${w}" height="6" fill="#fffbe8"/><rect x="${x + dx}" y="${-464 + dy}" width="${w}" height="30" fill="${lin('led', [[0, '#fff6d8', 0.6], [1, '#fff6d8', 0]])}"/>` +
    `<path d="M${x},-210L${x + w},-210L${x + w + dx * 0.9},${-470 + dy * 0.9}L${x + dx * 0.9},${-470 + dy * 0.9}Z" fill="${GLASS()}" stroke="#cfd8de" stroke-width="2"/>` +
    poly([[x + w, -210], [x + w + dx, -210 + dy], [x + w + dx, -470 + dy], [x + w + dx * 0.9, -470 + dy * 0.9]], `fill="${GLASS()}" stroke="#cfd8de" stroke-width="2"`) +
    `<path d="M${x + 40},-230L${x + 40 + dx * 0.6},${-450 + dy * 0.6}" stroke="#fff" stroke-opacity=".6" stroke-width="10" stroke-linecap="round"/>` +
    box(x + dx * 0.9 - 6, -478 + dy * 0.9, w + 12, 12, d * 0.12, 'steel')
  return s
}
P['tea-coffee-dispensing-unit'] = () => {
  const x = -160, w = 250, d = 170
  return shadow(10, 4, 260, 34) + box(x - 10, -50, w + 20, 50, d + 10, '#2a2b2d') +
    Array.from({ length: 8 }, (_, i) => `<path d="M${x + i * 32},-50L${x + i * 32 + (d + 10) * DX},${-50 + (d + 10) * DY}" stroke="#555" stroke-width="3"/>`).join('') +
    box(x, -470, w, 300, d, 'steel') + `<rect x="${x}" y="-170" width="${w}" height="120" fill="#1f2022"/>` +
    poly([[x + w, -170], [x + w + d * DX, -170 + d * DY], [x + w + d * DX, -50 + d * DY], [x + w, -50]], `fill="${gSide('steel')}"`) +
    `<rect x="${x + 20}" y="-440" width="${w - 40}" height="150" rx="8" fill="#141516"/><rect x="${x + 40}" y="-420" width="${w - 80}" height="34" rx="3" fill="#0e2f1d"/>` +
    `<text x="${x + 52}" y="-396" font-family="Consolas,monospace" font-size="20" fill="#6ff0a2">READY  88°C</text>` +
    [0, 1].map((i) => `<circle cx="${x + 70 + i * 110}" cy="-336" r="22" fill="${i ? '#7a4a24' : '#c08a3e'}" stroke="#d9dfe4" stroke-width="3"/>`).join('') +
    [0, 1].map((i) => `<rect x="${x + 60 + i * 110}" y="-170" width="20" height="30" rx="4" fill="#0e0f10"/>` + g(T(x + 70 + i * 110, -50, 0.7), cupWhite())).join('') +
    `<rect x="${x + 6}" y="-484" width="${w - 12}" height="16" rx="6" fill="#26282b"/>`
}
P['commercial-tea-making-machine'] = () => {
  const x = -280, w = 230, d = 170
  const carafe = 'M-60,-40C-90,-80 -90,-170 -46,-200L-36,-240L36,-240L46,-200C90,-170 90,-80 60,-40Z'
  return shadow(0, 4, 360, 40) + box(x, -470, w, 470, d, 'steel') +
    `<rect x="${x + 20}" y="-450" width="${w - 40}" height="90" rx="6" fill="#141516"/><text x="${x + 44}" y="-396" font-family="Consolas,monospace" font-size="34" font-weight="700" fill="#ff9a3c">TEA 85°</text>` +
    `<rect x="${x + 20}" y="-220" width="${w - 40}" height="200" rx="6" fill="#26282b"/><rect x="${x + 100}" y="-220" width="30" height="40" fill="#0e0f10"/>` +
    g(T(x + 115, -30), lathe([[50, -110], [46, 0]], 'steel', { open: true }) + `<path d="M-46,-90C-90,-90 -86,-30 -46,-30" fill="none" stroke="#8d959c" stroke-width="10"/>`) +
    g(T(190, 0), shadow(0, 2, 150, 18) + box(-140, -40, 220, 40, 150, '#1d1e20') +
      g(T(-10, -40), `<path d="M-50,-30C-74,-70 -70,-150 -36,-175L-30,-190L30,-190L36,-175C70,-150 74,-70 50,-30Z" fill="${lin('tea', [[0, '#c48a52'], [1, '#7a4422']], [0, 0, 1, 0])}"/>` +
        `<path d="${carafe}" fill="${GLASS()}" stroke="#8f989f" stroke-width="2.5"/><rect x="-44" y="-262" width="88" height="26" rx="6" fill="#1d1e20"/>` +
        `<path d="M60,-200C130,-200 130,-70 64,-70" fill="none" stroke="#1d1e20" stroke-width="16" stroke-linecap="round"/><path d="M-50,-180Q-70,-120 -54,-60" stroke="#fff" stroke-opacity=".7" stroke-width="6" fill="none" stroke-linecap="round"/>`))
}
P['espresso-machine-and-filter-coffee-maker'] = () => {
  const x = -330, w = 430, d = 190
  const gauge = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="24" fill="#f5f2ea" stroke="#8d959c" stroke-width="4"/><line x1="${cx}" y1="${cy}" x2="${cx + 12}" y2="${cy - 14}" stroke="#c0202a" stroke-width="3"/>`
  let s = shadow(0, 4, 330, 40) + box(x, -40, w, 40, d, '#2a2b2d') +
    poly([[x + 20 + d * DX * 0.6, -330 + d * DY * 0.6], [x + w + d * DX * 0.6, -330 + d * DY * 0.6], [x + w + d * DX * 0.6, -40 + d * DY * 0.6], [x + 20 + d * DX * 0.6, -40 + d * DY * 0.6]], 'fill="#3a3c3f"') +
    box(x, -190, 46, 150, d, 'steel') + box(x + w - 46, -190, 46, 150, d, 'steel') +
    box(x, -340, w, 150, d, 'steel') + gauge(x + 160, -270) + gauge(x + 270, -270)
  for (const gx of [x + 130, x + 300]) {
    s += g(T(gx, -170), lathe([[40, -22], [34, 0]], 'steel') + `<rect x="-30" y="-6" width="60" height="16" rx="6" fill="${gCylV('steel')}"/>` + rod(20, 4, 110, 20, 18, '#1c1c1e', '#55575b')) + g(T(gx, -44, 0.75), cupWhite())
  }
  s += rod(x + w - 20, -200, x + w + 10, -90, 8, '#9aa2a9', '#f2f4f5')
  for (let i = 0; i < 4; i++) s += g(T(x + 110 + i * 70 + d * DX * 0.5, -340 + d * DY * 0.5, 0.6), `<path d="${lathePath([[22, 0], [26, -36], [30, -44]])}" fill="#efeae0"/>`)
  s += g(T(240, 40), shadow(0, 2, 90, 14) + lathe([[62, -150], [62, 0]], 'steel', { rings: [[62, -140]] }) +
    lathe([[64, -260], [64, -150]], 'steel', { rings: [[64, -170]] }) + lid(68, -260, 'steel', { h: 28 }))
  return s
}
P['countertop-snack-food-warmer'] = () => {
  const x = -260, w = 450, d = 180, dx = d * DX, dy = d * DY
  const samosa = (cx, cy) => `<path d="M${cx - 34},${cy}L${cx},${cy - 50}L${cx + 34},${cy}Z" fill="${lin('samosa', [[0, '#e8b45a'], [1, '#a8661f']])}" stroke="#8a5218" stroke-width="2" stroke-linejoin="round"/>`
  const puff = (cx, cy) => `<rect x="${cx - 36}" y="${cy - 26}" width="72" height="26" rx="6" fill="#e2b061"/><path d="M${cx - 30},${cy - 18}H${cx + 30}M${cx - 30},${cy - 10}H${cx + 30}" stroke="#b77c2c" stroke-width="2"/>`
  const vada = (cx, cy) => `<ellipse cx="${cx}" cy="${cy - 10}" rx="30" ry="13" fill="#9a5a24"/><ellipse cx="${cx}" cy="${cy - 13}" rx="8" ry="3.5" fill="#4a2a10"/>`
  let s = shadow(20, 4, 330, 36) + box(x, -40, w, 40, d, 'steel') +
    poly([[x + dx, -360 + dy], [x + w + dx, -360 + dy], [x + w + dx, -40 + dy], [x + dx, -40 + dy]], `fill="${lin('warm-back', [[0, '#ffcf8a'], [1, '#e48a3a']])}"`) +
    poly([[x, -40], [x + w, -40], [x + w + dx, -40 + dy], [x + dx, -40 + dy]], 'fill="#c9cfd4"') +
    poly([[x, -200], [x + w, -200], [x + w + dx, -200 + dy], [x + dx, -200 + dy]], 'fill="#d4dade" stroke="#8d959c" stroke-width="2"')
  for (let i = 0; i < 5; i++) s += samosa(x + 70 + i * 82 + dx * 0.45, -200 + dy * 0.45 + 2)
  for (let i = 0; i < 5; i++) s += i % 2 ? vada(x + 70 + i * 82 + dx * 0.45, -40 + dy * 0.45) : puff(x + 70 + i * 82 + dx * 0.45, -40 + dy * 0.45)
  s += `<rect x="${x}" y="-360" width="${w}" height="320" fill="${GLASS()}" stroke="#d0d7dc" stroke-width="2"/>` +
    poly([[x + w, -360], [x + w + dx, -360 + dy], [x + w + dx, -40 + dy], [x + w, -40]], `fill="${GLASS()}" stroke="#d0d7dc" stroke-width="2"`) +
    `<path d="M${x + 30},-80L${x + 120},-330" stroke="#fff" stroke-opacity=".55" stroke-width="10" stroke-linecap="round"/>` +
    box(x - 6, -380, w + 12, 20, d + 6, 'steel') + `<rect x="${x}" y="-360" width="10" height="320" fill="${gCyl('steel')}"/><rect x="${x + w - 10}" y="-360" width="10" height="320" fill="${gCyl('steel')}"/>` +
    `<ellipse cx="${x + w / 2 + dx / 2}" cy="${-330 + dy / 2}" rx="200" ry="40" fill="#ffb24d" opacity=".35" filter="url(#blur)"/>`
  return s
}
P['two-deck-commercial-baking-oven'] = () => {
  const x = -300, w = 480, d = 220
  const L = legs(x, -120, w, d, '#2a2b2e', { wd: 20 })
  const deck = (y) => {
    const loaf = (lx) => `<rect x="${lx}" y="${y + 70}" width="62" height="30" rx="14" fill="#9a5a22"/><path d="M${lx + 12},${y + 78}l10,8M${lx + 28},${y + 76}l10,8M${lx + 44},${y + 78}l8,6" stroke="#d99a52" stroke-width="3"/>`
    return `<rect x="${x + 20}" y="${y}" width="330" height="150" rx="4" fill="${gFront('steel')}" stroke="#7b838b" stroke-width="2"/>` +
      `<rect x="${x + 50}" y="${y + 36}" width="270" height="86" rx="6" fill="${rad('ovenglow', [[0, '#ffb35c'], [0.6, '#b8521c'], [1, '#3a1608']], { cx: 0.5, cy: 0.6, r: 0.7 })}"/>` +
      [x + 70, x + 150, x + 230].map(loaf).join('') +
      `<rect x="${x + 50}" y="${y + 36}" width="270" height="86" rx="6" fill="${GLASS()}" stroke="#2a2b2d" stroke-width="4"/>` + rod(x + 60, y + 18, x + 310, y + 18, 12, '#9aa2a9', '#f2f4f5')
  }
  return shadow(30, 0, 360, 44) + L.rear + box(x, -500, w, 380, d, 'steel') + deck(-480) + deck(-310) +
    `<rect x="${x + 370}" y="-480" width="90" height="320" rx="4" fill="#1f2022"/>` +
    [-440, -380, -270, -210].map((yy) => knob(x + 415, yy, 15)).join('') +
    L.front +
    g(T(x + w * 0.7 + d * DX * 0.7, -500 + d * DY * 0.7), lathe([[20, -70], [20, 0]], 'steel') + cap(20, -70, '#2a2b2d'))
}
P['commercial-microwave-oven'] = () => {
  const x = -260, w = 420, d = 250
  const mesh = reg('mesh', `<pattern id="mesh" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#1a1b1c"/><circle cx="4" cy="4" r="2.2" fill="#3b3c3e"/></pattern>`)
  return shadow(30, 4, 320, 36) + box(x, -290, w, 270, d, 'steel') +
    `<rect x="${x + 8}" y="-20" width="30" height="20" fill="#1d1e20"/><rect x="${x + w - 38}" y="-20" width="30" height="20" fill="#1d1e20"/>` +
    `<rect x="${x + 20}" y="-270" width="290" height="230" rx="8" fill="${gFront('steel')}" stroke="#7b838b" stroke-width="2"/>` +
    `<rect x="${x + 44}" y="-246" width="230" height="182" rx="8" fill="${mesh}"/><rect x="${x + 44}" y="-246" width="230" height="182" rx="8" fill="${GLASS()}"/>` +
    rod(x + 292, -250, x + 292, -60, 14, '#8d959c', '#f2f4f5') +
    `<rect x="${x + 324}" y="-270" width="84" height="230" rx="6" fill="#1f2022"/><rect x="${x + 334}" y="-256" width="64" height="30" rx="3" fill="#0e2f1d"/>` +
    `<text x="${x + 340}" y="-234" font-family="Consolas,monospace" font-size="20" fill="#6ff0a2">0:30</text>` +
    Array.from({ length: 12 }, (_, i) => `<rect x="${x + 336 + (i % 3) * 21}" y="${-210 + Math.floor(i / 3) * 30}" width="16" height="20" rx="3" fill="#3a3c3f"/>`).join('') +
    `<rect x="${x + 336}" y="-86" width="58" height="26" rx="4" fill="#2f9e5a"/>`
}
P['commercial-otg-oven-toaster-grill'] = () => {
  const x = -240, w = 360, d = 220
  const cookie = (cx, cy) => `<ellipse cx="${cx}" cy="${cy}" rx="16" ry="7" fill="#c98a4a"/><circle cx="${cx - 4}" cy="${cy - 2}" r="2" fill="#4a2a10"/><circle cx="${cx + 5}" cy="${cy}" r="2" fill="#4a2a10"/>`
  return shadow(30, 4, 300, 34) + box(x, -240, w, 220, d, '#1e1f21') +
    `<rect x="${x + 10}" y="-20" width="26" height="20" fill="#0e0f10"/><rect x="${x + w - 36}" y="-20" width="26" height="20" fill="#0e0f10"/>` +
    `<rect x="${x + 18}" y="-212" width="240" height="170" rx="6" fill="${rad('otg', [[0, '#ff9f4a'], [0.6, '#8a3410'], [1, '#2a0e05']], { cx: 0.5, cy: 0.5, r: 0.7 })}"/>` +
    [-196, -60].map((yy) => `<path d="M${x + 30},${yy}H${x + 246}" stroke="#ff5a1f" stroke-width="5"/><path d="M${x + 30},${yy}H${x + 246}" stroke="#ffd18a" stroke-width="2"/>`).join('') +
    `<path d="M${x + 36},-110L${x + 240},-110L${x + 228},-92L${x + 48},-92Z" fill="#6f777f"/>` +
    [0, 1, 2, 3, 4].map((i) => cookie(x + 70 + i * 36, -112)).join('') +
    `<rect x="${x + 18}" y="-212" width="240" height="170" rx="6" fill="${GLASS()}" stroke="#0e0f10" stroke-width="5"/>` + rod(x + 40, -226, x + 236, -226, 12, '#9aa2a9', '#f2f4f5') +
    [-190, -130, -70].map((yy) => chromeKnob(x + 310, yy, 18)).join('')
}

/* ------------------------------------------------------------------ extra props for scenes */
function scale() {
  const x = -200, w = 320, d = 240
  const [px, py] = topPt(x, -60, w, d, 0.92, 0.9)
  return shadow(20, 4, 300, 36) + box(x - 6, -24, w + 12, 24, d + 6, '#2a2b2d') + box(x, -60, w, 36, d, 'steel') +
    `<rect x="${f(px - 12)}" y="${f(py - 300)}" width="24" height="300" fill="${gCyl('#3c4148')}"/>` +
    g(T(px - 110, py - 380), box(0, 0, 220, 90, 60, '#26282b') + `<rect x="16" y="16" width="188" height="56" rx="4" fill="#0e2f1d"/><text x="28" y="56" font-family="Consolas,monospace" font-size="34" font-weight="700" fill="#6ff0a2">12.450 kg</text>`)
}
function stage(W, H, tint, spotX = W * 0.62) {
  return `<rect width="${W}" height="${H}" fill="${lin(`stage-${key(tint)}`, [[0, mix('#202124', tint, 0.38)], [0.7, mix('#151619', tint, 0.2)], [1, '#0f1012']])}"/>` +
    `<ellipse cx="${spotX}" cy="${H * 0.42}" rx="${W * 0.42}" ry="${H * 0.6}" fill="${rad('spot', [[0, '#fff3dc', 0.26], [1, '#fff3dc', 0]])}"/>` +
    `<rect y="${H * 0.8}" width="${W}" height="${H * 0.2}" fill="${lin('floor', [[0, '#000', 0], [1, '#000', 0.5]])}"/>`
}
function studio(W, H) {
  return `<rect width="${W}" height="${H}" fill="${lin('studio', [[0, '#f6f3ec'], [0.62, '#ece6da'], [1, '#ddd5c6']])}"/>` +
    `<ellipse cx="${W / 2}" cy="${H * 0.42}" rx="${W * 0.5}" ry="${H * 0.45}" fill="${rad('studio-glow', [[0, '#ffffff', 0.85], [1, '#ffffff', 0]])}"/>`
}
const place = (file, x, y, s) => g(T(x, y, s), P[file]())

/* ------------------------------------------------------------------ compositions */
const CAT = {
  'chinese-restaurant': ['#9e3b26', ['multi-tier-stainless-momo-steamer', 'heavy-gauge-chinese-wok-kadai', 'noodle-station-stockpot-strainer']],
  'tea-shop': ['#b8692e', ['stainless-steel-tea-boiler-brass-tap', 'traditional-copper-tea-boiler', 'heavy-gauge-milk-boiler']],
  'restaurant-kitchen': ['#7d8791', ['high-pressure-commercial-gas-range', 'hindolium-dabara-tumbler-sets', 'standard-round-idly-pot-with-plates']],
  'catering-equipment': ['#a8862f', ['stainless-steel-storage-drums', 'brass-anda-serving-vessel', 'insulated-catering-food-carriers']],
  'corporate-cafeteria': ['#46677a', ['four-pan-bain-marie-counter', 'stainless-steel-tumblers-bulk', 'compartment-tiffler-meal-plates']],
  machinery: ['#565c66', ['tilting-wet-grinder-idly-dosa-batter', 'commercial-atta-flour-mill', 'commercial-vegetable-cutting-machine']],
  'hawkins-cookers': ['#2f4a3f', ['aluminium-pressure-cookers-range', 'hard-anodised-cookware-set', 'pressure-cooker-spare-parts-gaskets-weights']],
  'bakery-cafe': ['#8a5a3b', ['two-deck-commercial-baking-oven', 'commercial-planetary-mixer', 'espresso-machine-and-filter-coffee-maker']],
}
function categoryScene(slug, W, H, wide) {
  const [tint, [c, l, r]] = CAT[slug]
  const L = wide
    ? [[W * 0.72, H * 0.83, 0.86], [W * 0.54, H * 0.92, 0.6], [W * 0.9, H * 0.93, 0.6]]
    : [[W * 0.5, H * 0.76, 0.72], [W * 0.24, H * 0.9, 0.52], [W * 0.77, H * 0.91, 0.52]]
  return stage(W, H, tint, L[0][0]) + place(c, ...L[0]) + place(l, ...L[1]) + place(r, ...L[2])
}

function homeHero(W, H) {
  const shelf = g('translate(980,0)', `<g filter="url(#dof)" opacity=".55">` +
    [300, 560].map((y) => `<rect x="0" y="${y}" width="960" height="14" fill="#55585d"/>`).join('') +
    Array.from({ length: 9 }, (_, i) => g(T(60 + i * 105, 300, 0.32), lathe([[150, -260], [150, 0]], i % 3 === 1 ? 'brass' : 'steel', { open: true }))).join('') +
    Array.from({ length: 12 }, (_, i) => g(T(40 + i * 80, 560, 0.42), i % 4 === 2 ? dabaraStack(4, 'brass') : tumblerTower(5))).join('') + `</g>`)
  return stage(W, H, '#36383b', W * 0.72) + shelf +
    place('stainless-steel-storage-drums', 1240, 900, 0.62) + place('stainless-steel-tea-boiler-brass-tap', 1540, 880, 0.74) + place('traditional-copper-tea-boiler', 1790, 900, 0.68) +
    place('brass-anda-serving-vessel', 1110, 1010, 0.5) + place('standard-round-idly-pot-with-plates', 1440, 1030, 0.5) + place('stainless-steel-tumblers-bulk', 1730, 1040, 0.46)
}
function aboutHero(W, H) {
  return stage(W, H, '#8a5a2b', W * 0.7) +
    place('traditional-copper-tea-boiler', 1420, 870, 0.8) + g(T(1150, 900, 0.85), anda('brass', 21)) + g(T(1700, 900, 0.6), anda('copper', 17)) +
    g(T(1290, 1010, 0.65), dabaraSet('brass')) + g(T(1560, 1030, 0.6), dabaraStack(5, 'brass')) + g(T(1820, 1040, 0.55), tumblerTower(6, 'brass'))
}
function contactHero(W, H) {
  return stage(W, H, '#46677a', W * 0.7) +
    place('insulated-catering-food-carriers', 1180, 880, 0.62) + place('stainless-steel-storage-drums', 1780, 880, 0.58) +
    g(T(1470, 960, 0.85), scale() + g(T(-40, -120, 0.7), lathe([[150, -230], [150, 0]], 'steel', { open: true, rings: [[150, -210]] }) + handles(150, -200, 40, 'steel'))) +
    place('stainless-steel-tumblers-bulk', 1150, 1050, 0.4) + place('catering-grade-steel-dabara-sets', 1760, 1060, 0.4)
}
function kiloScene(W, H) {
  return stage(W, H, '#b08a3e', W * 0.55) +
    g(T(880, 900, 1.25), scale() + g(T(-40, -120, 0.7), lathe([[150, -230], [150, 0]], 'steel', { open: true, rings: [[150, -210]] }) + handles(150, -200, 40, 'steel'))) +
    g(T(360, 940, 0.62), anda('brass', 31)) + place('stainless-steel-tumblers-bulk', 1380, 960, 0.5)
}
function wallTiles() {
  return reg('tiles', `<pattern id="tiles" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="#d9d4ca"/>` +
    `<rect x="1" y="1" width="78" height="38" rx="2" fill="#f4f1ea"/><rect x="-39" y="41" width="78" height="38" rx="2" fill="#f4f1ea"/><rect x="41" y="41" width="78" height="38" rx="2" fill="#f4f1ea"/></pattern>`)
}
function kitchenLine(W, H) {
  const ladle = (x) => `<path d="M${x},250L${x},380" stroke="#8d959c" stroke-width="6"/><ellipse cx="${x}" cy="392" rx="26" ry="16" fill="${gCylV('steel')}"/>`
  return `<rect width="${W}" height="${H}" fill="${wallTiles()}"/>` +
    `<rect width="${W}" height="${H}" fill="${rad('kl-light', [[0, '#fff', 0.15], [1, '#000', 0.25]], { cx: 0.5, cy: 0.3, r: 0.8 })}"/>` +
    `<rect y="700" width="${W}" height="${H - 700}" fill="${lin('kfloor', [[0, '#5b5f63'], [1, '#2e3134']])}"/>` +
    box(80, 226, 1440, 14, 90, 'steel') +
    [200, 290, 380, 470].map(ladle).join('') +
    Array.from({ length: 6 }, (_, i) => g(T(620 + i * 140, 226 + 90 * DY * 0.5, 0.36), lathe([[150, -220], [150, 0]], i === 2 ? 'brass' : 'steel', { open: true, rings: [[150, -200]] }))).join('') +
    g(T(1420, 226 + 90 * DY * 0.5, 0.4), tumblerTower(6)) +
    g(T(1240, 900), box(-160, -240, 420, 24, 200, 'steel') + legs(-160, -216, 420, 200, 'steel').rear + legs(-160, -216, 420, 200, 'steel').front +
      g(T(-20, -300, 0.6), P['standard-round-idly-pot-with-plates']()) + g(T(160, -290, 0.42), P['commercial-meat-vegetable-choppers']())) +
    place('high-pressure-commercial-gas-range', 640, 920, 1.0) + place('stainless-steel-storage-drums', 170, 980, 0.5)
}
function teaKadai(W, H) {
  let glasses = ''
  for (let i = 0; i < 7; i++) glasses += g(T(930 + i * 78, 700, 0.95), teaGlass())
  return `<rect width="${W}" height="${H}" fill="${lin('teawall', [[0, '#3f8a84'], [1, '#22504c']])}"/>` +
    `<rect width="${W}" height="${H}" fill="${rad('tw-light', [[0, '#fff3d6', 0.3], [1, '#fff3d6', 0]], { cx: 0.4, cy: 0.35, r: 0.6 })}"/>` +
    `<rect y="90" width="${W}" height="20" fill="#7a3f22"/>` +
    Array.from({ length: 9 }, (_, i) => g(T(160 + i * 160, 90, 0.5), `<path d="M0,0L0,60" stroke="#c9a24f" stroke-width="3"/><circle cx="0" cy="70" r="12" fill="#e9c35a"/>`)).join('') +
    box(120, 660, 1360, 340, 140, '#7a3f22') + `<rect x="120" y="660" width="1360" height="18" fill="${gFront('steel')}"/>` +
    poly([[120, 660], [120 + 140 * DX, 660 + 140 * DY], [1480 + 140 * DX, 660 + 140 * DY], [1480, 660]], `fill="${gTop('steel')}"`) +
    place('traditional-copper-tea-boiler', 330, 680, 0.75) + place('stainless-steel-tea-boiler-brass-tap', 650, 690, 0.95) + steam(650, 180, 3, 60, '#fff', 0.25) +
    glasses + g(T(1360, 640, 0.6), dabaraSet('steel'))
}
function storeShelves(W, H) {
  const plank = (y) => box(40, y, 1520, 16, 120, '#8a5a34')
  const items1 = Array.from({ length: 8 }, (_, i) => g(T(140 + i * 182, 300 + 120 * DY * 0.5, 0.42 - (i % 2) * 0.06), lathe([[150, -250], [150, 0]], ['steel', 'brass', 'steel', 'copper'][i % 4], { open: i % 2 === 0, rings: [[150, -230], [150, -24]], hammer: i % 4 > 0, seed: i }) + (i % 2 ? lid(156, -250, ['steel', 'brass', 'steel', 'copper'][i % 4], { h: 50 }) : ''))).join('')
  const items2 = Array.from({ length: 10 }, (_, i) => g(T(120 + i * 150, 600 + 120 * DY * 0.5, 0.62), i % 3 === 0 ? dabaraStack(5, i % 2 ? 'steel' : 'brass') : i % 3 === 1 ? tumblerTower(6, i % 2 ? 'brass' : 'steel') : g(T(0, 0), Array.from({ length: 7 }, (_, j) => g(T(0, -j * 9), plateDisc(110, 0.32))).join('')))).join('')
  return `<rect width="${W}" height="${H}" fill="${lin('storewall', [[0, '#efe8da'], [1, '#d8cdb8']])}"/>` +
    `<rect width="${W}" height="${H}" fill="${rad('sw-light', [[0, '#fff', 0.4], [1, '#fff', 0]], { cx: 0.5, cy: 0.3, r: 0.6 })}"/>` +
    [40, 1544].map((x) => `<rect x="${x}" y="40" width="16" height="${H}" fill="#6e4528"/>`).join('') +
    plank(300) + items1 + plank(600) + items2 +
    `<rect y="870" width="${W}" height="${H - 870}" fill="${lin('sfloor', [[0, '#b9ab90'], [1, '#8a7c62']])}"/>` +
    g(T(260, 980, 0.55), anda('brass', 41)) + place('stainless-steel-storage-drums', 640, 990, 0.45) + place('traditional-copper-tea-boiler', 960, 990, 0.5) +
    place('insulated-catering-food-carriers', 1240, 995, 0.45) + g(T(1470, 990, 0.5), anda('copper', 43))
}

/* ------------------------------------------------------------------ render */
function svgDoc(W, H, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${FILTERS}${[...defs.values()].join('')}</defs>${body}</svg>`
}
const jobs = []
for (const items of Object.values(productImages)) {
  for (const [file] of Object.values(items)) {
    if (!P[file]) throw new Error(`No drawing for ${file}`)
    jobs.push({ out: `products/${file}.webp`, W: 800, H: 800, product: file })
  }
}
for (const [slug, { file }] of Object.entries(categoryImages)) {
  jobs.push({ out: `categories/${file}.webp`, W: 1200, H: 900, body: () => categoryScene(slug, 1200, 900, false) })
  jobs.push({ out: `banners/${file}-banner.webp`, W: 1920, H: 900, body: () => categoryScene(slug, 1920, 900, true) })
}
const SCENES = { homeHero, aboutHero, contactHero, kitchenLine, teaKadai, storeShelves, kiloPricing: kiloScene }
for (const [k, s] of Object.entries(scenes)) jobs.push({ out: `${s.file}.webp`, W: s.w, H: s.h, body: () => SCENES[k](s.w, s.h) })

// Products: render on a transparent layer, trim to the drawing, then fit it into the studio frame
// so every product fills the shot consistently whatever its natural size.
async function framed(file) {
  const layer = await sharp(Buffer.from(svgDoc(1000, 1000, place(file, 500, 820, 1))), { density: 144 }).png().toBuffer()
  const item = await sharp(layer).trim({ threshold: 1 }).resize(660, 600, { fit: 'inside' }).png().toBuffer()
  const { width, height } = await sharp(item).metadata()
  const bg = await sharp(Buffer.from(svgDoc(800, 800, studio(800, 800))), { density: 144 }).resize(800, 800).png().toBuffer()
  return sharp(bg).composite([{ input: item, left: Math.round(400 - width / 2), top: Math.round(730 - height) }])
}

let total = 0
for (const job of jobs) {
  if (only && !job.out.includes(only)) continue
  const file = path.join(OUT, job.out)
  await mkdir(path.dirname(file), { recursive: true })
  const img = job.product ? await framed(job.product) : sharp(Buffer.from(svgDoc(job.W, job.H, job.body())), { density: 144 }).resize(job.W, job.H)
  const info = await img.webp({ quality: 82, effort: 5 }).toFile(file)
  total += info.size
  console.log(`${job.out.padEnd(72)} ${(info.size / 1024).toFixed(0).padStart(4)} KB`)
}
console.log(`\n${(total / 1024 / 1024).toFixed(2)} MB total`)
