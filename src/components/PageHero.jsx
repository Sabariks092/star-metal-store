import { Link } from 'react-router-dom'
import { Button, Eyebrow, Reveal, Star } from './ui'

/* Inner-page hero: charcoal ground, optional material texture + accent colour, optional scene image (right-weighted).
   `imageSeam` feathers photos whose left half is a hard-edged dark panel into a matching ground. */
export function PageHero({ eyebrow, title, accentLine, subtitle, crumbs, texture = 'tex-brushed', accent, image, imageSeam = false, children }) {
  return (
    <section className={`relative isolate overflow-hidden text-surface ${imageSeam ? 'bg-night' : 'bg-secondary'}`}>
      <div className={`${texture} absolute inset-0 -z-10 opacity-70`} style={accent ? { backgroundColor: accent } : undefined} />
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          decoding="async"
          className={imageSeam ? 'hero-photo photo-seam-fade -z-10' : 'absolute inset-0 -z-10 h-full w-full object-cover object-right'}
        />
      )}
      <Star className="pointer-events-none absolute top-1/2 -right-16 -z-10 w-72 -translate-y-1/2 text-white/[0.03] sm:w-[28rem]" />

      <div className="hero-text container pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="eyebrow flex flex-wrap items-center gap-2 !text-[0.7rem] text-text-inverse-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.to ? <Link to={c.to} className="transition-colors hover:text-surface">{c.label}</Link> : <span className="text-accent-soft">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
          <h1 className="mt-5 max-w-4xl text-[2rem] leading-[1.08] font-semibold sm:text-[2.75rem] lg:text-[3.2rem]">
            {title}
            {accentLine && <span className="mt-1 block" style={{ color: accent ? 'var(--color-surface)' : 'var(--color-primary)' }}>{accentLine}</span>}
          </h1>
          {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-inverse-muted sm:text-xl">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
      <div className="h-1 w-full bg-primary" />
    </section>
  )
}

/* Closing call-to-action band used at the foot of inner pages. */
export function CtaBand({ eyebrow, title, cta, to = '/contact' }) {
  return (
    <section className="section pt-0">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-sm bg-secondary px-6 py-10 text-surface sm:px-12 sm:py-14">
            <div className="stripes absolute top-0 right-0 h-full w-20 text-accent opacity-15 sm:w-32" />
            <div className="absolute top-0 left-0 h-full w-1 bg-primary" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
                <h2 className="mt-4 text-[1.75rem] leading-[1.15] font-semibold sm:text-[2.25rem]">{title}</h2>
              </div>
              <Button to={to} className="shrink-0">{cta}</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
