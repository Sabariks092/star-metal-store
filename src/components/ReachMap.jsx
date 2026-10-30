// Schematic of the coastal Tamil Nadu trade belt around Pondicherry.
// Positions are projected from real coordinates (lon 79.3–80.5, lat 11.2–13.2).
const towns = [
  { name: 'Chennai', x: 242, y: 26, anchor: 'end', dx: -10 },
  { name: 'Tindivanam', x: 88, y: 213, anchor: 'start', dx: 10 },
  { name: 'Villupuram', x: 48, y: 277, anchor: 'start', dx: -6, dy: -14 },
  { name: 'Cuddalore', x: 108, y: 320, anchor: 'end', dx: -10 },
  { name: 'Chidambaram', x: 98, y: 396, anchor: 'end', dx: -10 },
]
const hub = { x: 128, y: 279 }
const coast = 'M250 0 L238 60 L225 132 L196 180 L170 220 L150 252 L136 279 L122 319 L126 360 L130 396 L140 440'

export default function ReachMap({ className = '', tone = 'dark' }) {
  const ink = tone === 'dark' ? '#f4f1ea' : '#36383b'
  const sea = tone === 'dark' ? 'rgb(255 255 255 / 0.04)' : 'rgb(54 56 59 / 0.05)'
  return (
    <svg viewBox="0 0 300 440" className={className} role="img" aria-label="Map: Pondicherry and the surrounding trade towns — Chennai, Tindivanam, Villupuram, Cuddalore, Chidambaram">
      <defs>
        <pattern id="sea-lines" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={ink} strokeOpacity="0.07" strokeWidth="3" />
        </pattern>
      </defs>
      {/* Sea */}
      <path d={`${coast} L300 440 L300 0 Z`} fill={sea} />
      <path d={`${coast} L300 440 L300 0 Z`} fill="url(#sea-lines)" />
      <path d={coast} fill="none" stroke={ink} strokeOpacity="0.55" strokeWidth="1.5" />
      <text x="262" y="300" fill={ink} fillOpacity="0.45" fontSize="9" letterSpacing="2.5" textAnchor="middle" transform="rotate(90 262 300)" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
        BAY OF BENGAL
      </text>

      {/* Reach rings */}
      {[45, 95, 150].map((r) => (
        <circle key={r} cx={hub.x} cy={hub.y} r={r} fill="none" stroke={ink} strokeOpacity="0.16" strokeDasharray="2 5" />
      ))}

      {/* Routes */}
      {towns.map((t) => (
        <line key={t.name} x1={hub.x} y1={hub.y} x2={t.x} y2={t.y} stroke="#b08d57" strokeWidth="1.25" strokeDasharray="5 4" />
      ))}

      {/* Towns */}
      {towns.map((t) => (
        <g key={t.name}>
          <circle cx={t.x} cy={t.y} r="4" fill={tone === 'dark' ? '#232427' : '#fbfaf6'} stroke={ink} strokeWidth="1.5" />
          <text
            x={t.x + t.dx}
            y={t.y + 3.5 + (t.dy ?? 0)}
            textAnchor={t.anchor}
            fill={ink}
            fontSize="11"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            {t.name}
          </text>
        </g>
      ))}

      {/* Hub — the store */}
      <circle cx={hub.x} cy={hub.y} r="16" fill="#e02028" fillOpacity="0.18" />
      <path
        fill="#e02028"
        transform={`translate(${hub.x - 11} ${hub.y - 10.5}) scale(0.22)`}
        d="M50 0l11.8 36.3H100L69.1 58.7 80.9 95 50 72.6 19.1 95l11.8-36.3L0 36.3h38.2z"
      />
      <text x={hub.x + 18} y={hub.y - 8} fill={ink} fontSize="14" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.02em' }}>
        Pondicherry
      </text>
    </svg>
  )
}
