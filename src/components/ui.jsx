import { useEffect, useRef, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

/* Fade-up on first entry into the viewport. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Buttons — solid red for the primary action; flat, square, colour shift on hover. */
const btnBase =
  'group inline-flex items-center justify-center gap-2.5 min-h-12 px-6 py-3 rounded-sm font-display text-[0.85rem] font-semibold uppercase tracking-[0.05em] leading-tight ' +
  'transition-[background-color,color,border-color] duration-200 ease-[var(--ease-weight)]'
const btnVariants = {
  primary: 'bg-primary text-white hover:bg-primary-deep',
  dark: 'bg-secondary text-surface hover:bg-ink',
  ghostLight: 'border border-surface/45 text-surface hover:border-surface hover:bg-surface/10',
  ghostDark: 'border border-secondary/35 text-secondary hover:border-secondary hover:bg-secondary/5',
}

export function Button({ to, href, variant = 'primary', arrow = true, className = '', children, ...rest }) {
  const cls = `${btnBase} ${btnVariants[variant]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Icon name="arrow" size={17} strokeWidth={2} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}

/* Five-point star — the logo's star, redrawn as a vector. */
export function Star({ className = '', ...rest }) {
  return (
    <svg viewBox="0 0 100 95" className={className} aria-hidden="true" {...rest}>
      <path fill="currentColor" d="M50 0l11.8 36.3H100L69.1 58.7 80.9 95 50 72.6 19.1 95l11.8-36.3L0 36.3h38.2z" />
    </svg>
  )
}

/* Eyebrow label led by a short rule (brass on light grounds, red on charcoal). */
export function Eyebrow({ children, className = '', tone = 'dark' }) {
  return (
    <p className={`eyebrow flex items-center gap-2 ${tone === 'light' ? 'text-accent-soft' : 'text-text-muted'} ${className}`}>
      <span aria-hidden="true" className={`h-[2px] w-4 shrink-0 ${tone === 'light' ? 'bg-primary' : 'bg-accent'}`} />
      {children}
      <span aria-hidden="true" className={`h-[2px] w-4 shrink-0 ${tone === 'light' ? 'bg-primary' : 'bg-accent'}`} />

    </p>
  )
}
export function EyebrowNoBorder({ children, className = '', tone = 'dark' }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === 'light' ? 'text-accent-soft' : 'text-text-muted'} ${className}`}>
      {children}
    </p>
  )
}

/* Section heading block: eyebrow, condensed title, optional lede. */
export function SectionHead({ eyebrow, title, lede, tone = 'dark', align = 'left', className = '' }) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow tone={tone} className={center ? 'justify-center' : ''}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-3 text-[1.5rem] leading-[1.15] sm:mt-4 sm:leading-[1.12] font-semibold sm:text-[2.25rem] lg:text-[2.5rem] ${tone === 'light' ? 'text-surface' : 'text-secondary'}`}>
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 text-[0.95rem] leading-relaxed sm:mt-5 sm:text-lg ${tone === 'light' ? 'text-text-inverse-muted' : 'text-text-muted'}`}>{lede}</p>
      )}
    </div>
  )
}

/* Renders `**bold**` runs from content strings. */
export function Rich({ text, strongClass = 'font-bold text-secondary' }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') ? <strong key={i} className={strongClass}>{p.slice(2, -2)}</strong> : <Fragment key={i}>{p}</Fragment>,
  )
}

/* Placeholder UI for content.md items marked "(to be added)". */
export function Pending({ label, note, className = '', compact = false, tone = 'dark' }) {
  return (
    <span
      className={`pending inline-flex max-w-full items-start gap-2 ${compact ? 'px-2 py-1' : 'px-3 py-2'} ${className}`}
      title={note}
    >
      <span className={`eyebrow mt-[0.2em] shrink-0 !text-[0.62rem] !tracking-[0.12em] ${tone === 'light' ? 'text-accent-soft' : 'text-accent'}`}>
        To be added
      </span>
      {(label || note) && (
        <span className={`text-sm leading-snug ${tone === 'light' ? 'text-text-inverse-muted' : 'text-text-muted'}`}>
          {label && <span className={`font-bold ${tone === 'light' ? 'text-surface' : 'text-secondary'}`}>{label}</span>}
          {label && note && ' — '}
          {note}
        </span>
      )}
    </span>
  )
}

/* Oval trade seal — echoes the logo's oval badge. */
export function Seal({ top = 'Est.', main = '1988', bottom = 'Pondicherry', className = '' }) {
  return (
    <div className={`relative grid aspect-[1.85/1] place-items-center ${className}`}>
      <svg viewBox="0 0 185 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <ellipse cx="92.5" cy="50" rx="89" ry="46.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <ellipse cx="92.5" cy="50" rx="81" ry="39" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
      <div className="relative text-center leading-none">
        <div className="eyebrow !text-[0.6rem] opacity-80">{top}</div>
        <div className="mt-1 font-display text-[2.1rem] font-semibold tracking-[0.02em]">{main}</div>
        <div className="eyebrow mt-1 !text-[0.55rem] opacity-80">{bottom}</div>
      </div>
    </div>
  )
}

/* Small inline "stamp" chip for counts / codes. */
export function Stamp({ children, className = '' }) {
  return (
    <span className={`eyebrow inline-flex items-center rounded-xs border border-current px-2.5 py-1 !text-[0.72rem] ${className}`}>
      {children}
    </span>
  )
}
