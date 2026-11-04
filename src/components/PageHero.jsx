import { Link } from 'react-router-dom'
import { Button, Eyebrow, Reveal, Star } from './ui'

/* Hero buttons shrink on phones so the copy block leaves the photo visible */
export const heroBtn = 'max-sm:min-h-10 max-sm:gap-2 max-sm:px-4 max-sm:py-2 max-sm:text-[0.72rem]'

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
      {/* Scrim keeps the copy off the bright metal: an even dim below xl (copy spans the photo),
          a left-weighted fade from xl where the photo sits to the right of the copy */}
      {image && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(20_24_27/0.9)_0%,rgb(20_24_27/0.78)_35%,rgb(20_24_27/0.35)_60%,rgb(20_24_27/0)_80%)] max-xl:bg-[linear-gradient(90deg,rgb(20_24_27/0.86)_0%,rgb(20_24_27/0.72)_60%,rgb(20_24_27/0.55)_100%)]"
        />
      )}
      <Star className="pointer-events-none absolute top-1/2 -right-16 -z-10 w-72 -translate-y-1/2 text-white/[0.03] sm:w-[28rem]" />

      <div className="hero-text container pt-7 pb-9 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 sm:mb-8">
            {/* Kept on one line: the current page truncates rather than wrapping under a stray "/" */}
            <ol className="eyebrow flex items-center gap-2 !text-[0.62rem] text-text-inverse-muted sm:!text-[0.7rem]">
              {crumbs.map((c, i) => (
                <li key={c.label} className={`flex items-center gap-2 ${c.to ? 'shrink-0' : 'min-w-0 [&>span:last-child]:truncate'}`}>
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.to ? <Link to={c.to} className="transition-colors hover:text-surface">{c.label}</Link> : <span className="text-accent-soft">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          {eyebrow && <Eyebrow tone="light" className="max-sm:!text-[0.62rem]">{eyebrow}</Eyebrow>}
          <h1 className="mt-3 max-w-3xl text-[1.4rem] leading-[1.12] font-semibold min-[400px]:text-[1.55rem] sm:mt-5 sm:leading-[1.08] sm:text-[2.75rem] lg:text-[3.2rem] xl:max-w-[40rem] 2xl:max-w-[44rem]">
            {title}
            {accentLine && <span className="mt-1 block" style={{ color: accent ? 'var(--color-surface)' : 'var(--color-primary)' }}>{accentLine}</span>}
          </h1>
          {subtitle && <p className="mt-3 max-w-2xl text-[0.88rem] leading-relaxed text-text-inverse-muted sm:mt-6 sm:text-xl lg:max-w-xl">{subtitle}</p>}
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
