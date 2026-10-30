import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Button, Eyebrow,EyebrowNoBorder , Pending, Reveal, SectionHead, Star } from '../components/ui'
import { usePageMeta } from '../components/usePageMeta'
import { hero, trustBar, whoWeServe, productsSection, whyUs, location, testimonials } from '../content/home'
import { categories } from '../content/categories'
import { business, footer, meta } from '../content/site'
import { categoryBanner, categoryImages, categoryThumb, scenes, sceneSrc } from '../content/images'

const pad = (n) => String(n).padStart(2, '0')
const pillarIcons = ['hourglass', 'scale', 'wrench', 'book']
const trustIcons = ['clock', 'handshake', 'scale', 'wrench', 'pin']

// Hero carousel — the three 1920×1080 hero scenes
const heroSlides = [
  // `seam`: photo has a hard-edged dark panel on its left half that needs feathering
  { key: 'homeHero', seam: false },
  { key: 'aboutHero', seam: true },
  { key: 'contactHero', seam: true },
]
const SLIDE_MS = 6000

// Google Maps place for the store
const mapEmbed =
  'https://www.google.com/maps/embed?pb=!1m16!1m11!1m3!1d3!2d79.8268269771917!3d11.936097317336207!2m2!1f0!2f90!3m2!1i1024!2i768!4f75!3m3!1m2!1s0x3a53617ef1d551ab%3A0x6cb38cebf0723d23!2sStar%20Metal%20Store!4v1793353171525'
const mapLink = 'https://www.google.com/maps?cid=7832759121906646307'
const reachTowns = ['Cuddalore', 'Villupuram', 'Tindivanam', 'Chidambaram', 'Chennai']

const ctrlBtn =
  'grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10'

function HeroControls({ active, count, paused, go, togglePause }) {
  return (
    <div className="flex flex-wrap items-center gap-3 [text-shadow:none] lg:justify-end">
      <button type="button" onClick={() => go(active - 1)} aria-label="Previous slide" className={ctrlBtn}>
        <Icon name="chevron" size={18} strokeWidth={2} className="rotate-90" />
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            className="group px-0.5 py-4"
          >
            <span className={`block h-[3px] transition-all duration-300 ${i === active ? 'w-10 bg-primary' : 'w-5 bg-white/50 group-hover:bg-white'}`} />
          </button>
        ))}
      </div>
      <button type="button" onClick={() => go(active + 1)} aria-label="Next slide" className={ctrlBtn}>
        <Icon name="chevron" size={18} strokeWidth={2} className="-rotate-90" />
      </button>
      <button type="button" onClick={togglePause} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} className={ctrlBtn}>
        {paused ? (
          <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" />
        ) : (
          <span className="flex gap-[3px]"><span className="h-3 w-[3px] bg-current" /><span className="h-3 w-[3px] bg-current" /></span>
        )}
      </button>
      <span className="eyebrow ml-1 text-surface/80">{pad(active + 1)} / {pad(count)}</span>
    </div>
  )
}

function Hero() {
  const [main, since] = hero.headline.split(' — ')
  const count = heroSlides.length
  const [active, setActive] = useState(0)
  // Autoplay starts off for visitors who prefer reduced motion
  const [paused, setPaused] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  const [holding, setHolding] = useState(false)
  const go = (i) => setActive((i + count) % count)

  useEffect(() => {
    if (paused || holding) return
    const t = setTimeout(() => setActive((a) => (a + 1) % count), SLIDE_MS)
    return () => clearTimeout(t)
  }, [active, paused, holding, count])

  return (
    <section
      className="relative isolate overflow-hidden bg-night text-surface"
      aria-roledescription="carousel"
      aria-label="Star Metal Store showcase"
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHolding(false)}
    >
      <div className="tex-brushed absolute inset-0 -z-10 opacity-60" />
      {heroSlides.map((s, i) => (
        <img
          key={s.key}
          src={sceneSrc(s.key)}
          alt=""
          aria-hidden="true"
          fetchPriority={i === 0 ? 'high' : undefined}
          decoding="async"
          className={`hero-photo -z-10 origin-right ${s.seam ? 'photo-seam-fade' : ''} transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-weight)] ${
            i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
          }`}
        />
      ))}
      {/* Soft left-to-right fade: dense behind the copy, gone before the vessels */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(34_35_38/0.9)_0%,rgb(34_35_38/0.74)_14%,rgb(34_35_38/0.5)_25%,rgb(34_35_38/0.25)_35%,rgb(34_35_38/0.08)_43%,rgb(34_35_38/0)_50%)] max-lg:bg-[linear-gradient(90deg,rgb(20_24_27/0.88)_0%,rgb(20_24_27/0.7)_55%,rgb(20_24_27/0.5)_100%)]"
      />
      <div className="hero-text container pt-14 pb-36 sm:pt-20 lg:pt-24 lg:pb-44">
        <Reveal>
          <Eyebrow tone="light" >{since}</Eyebrow>
        </Reveal>
     
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl text-[2.1rem] leading-[1.08] font-bold sm:text-[3rem] lg:text-[3.75rem]">
            {main}
            
          </h1>
        </Reveal>
           <Reveal className='mt-4'>
          <EyebrowNoBorder tone="light">{footer.taglineLine.slice(0, 3).join(' · ')}</EyebrowNoBorder>
        </Reveal>
        

        <div className="mt-5 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={160} className="lg:col-span-7">
            {/* <p className="font-display text-xl leading-snug font-normal text-surface sm:text-[1.6rem]">{hero.subheadline}</p> */}
            <p className=" max-w-2xl text-[1.02rem] leading-relaxed text-text-inverse-muted">{hero.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact">{hero.primaryCta}</Button>
              <Button href="#products" variant="ghostLight">{hero.secondaryCta}</Button>
            </div>
          </Reveal>
          <Reveal delay={240} className="flex lg:col-span-4 lg:col-start-9 lg:justify-end">
            <HeroControls active={active} count={count} paused={paused} go={go} togglePause={() => setPaused((p) => !p)} />
          </Reveal>
        </div>
      </div>
      <div className="stripe-rule absolute inset-x-0 bottom-0 !text-accent/40" />
    </section>
  )
}

function TrustBar() {
  return (
    <section aria-label="Why buyers trust us" className="relative z-10 -mt-24 lg:-mt-28">
      <div className="container">
        <Reveal>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-md border-t-[3px] border-primary bg-line shadow-[0_28px_56px_-28px_rgb(34_35_38/0.5)] ring-1 ring-line sm:grid-cols-2 lg:grid-cols-5">
            {trustBar.map((t, i) => (
              <li
                key={t.strong}
                className={`group relative flex items-center gap-4 bg-white px-5 py-5 transition-colors duration-300 hover:bg-surface-raised sm:px-6 lg:flex-col lg:items-start lg:gap-5 lg:py-8 ${
                  i === trustBar.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-gradient-to-b from-white to-surface text-primary shadow-[inset_0_1px_0_#fff,0_4px_10px_-6px_rgb(34_35_38/0.35)] ring-1 ring-line transition-all duration-300 group-hover:from-[#ee3a41] group-hover:to-primary-deep group-hover:text-white group-hover:ring-primary">
                  <Icon name={trustIcons[i]} size={24} />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-display text-[1.15rem] leading-tight font-semibold text-secondary sm:text-[1.3rem]">{t.strong}</span>
                  <span className="eyebrow !text-[0.68rem] !tracking-[0.1em] text-text-muted">{t.rest}</span>
                </span>
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function WhoWeServe() {
  return (
    <section className="section tex-grain">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHead eyebrow="Who We Serve" title={whoWeServe.headline} />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:pt-12">
            <p className="text-lg leading-relaxed text-text-muted">{whoWeServe.body}</p>
          </Reveal>
        </div>

        {/* Kitchen scene as the block background; client grid laid over its foot */}
        <Reveal className="relative mt-12 overflow-hidden rounded-sm lg:h-[52rem]">
          <img
            src={sceneSrc('kitchenLine')}
            alt={scenes.kitchenLine.alt}
            width={scenes.kitchenLine.w}
            height={scenes.kitchenLine.h}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/55 to-ink/10 lg:inset-x-0 lg:top-auto lg:h-3/4 lg:via-ink/50 lg:to-transparent" />

          <ul className="relative grid gap-3 p-3 pt-56 sm:grid-cols-2 sm:gap-4 sm:p-6 sm:pt-80 lg:absolute lg:inset-x-8 lg:bottom-8 lg:grid-cols-3 lg:p-0">
          {whoWeServe.clients.map((c, i) => (
            <li
              key={c.strong}
              className="group rounded-sm border border-white/20 backdrop-blur-[3px] transition-colors duration-300 hover:border-white/40 hover:bg-black/55"
            >
              <div className="flex h-full gap-5 p-6 sm:p-7">
                <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xs bg-white/10 text-white ring-1 ring-white/20 transition-colors group-hover:bg-primary group-hover:ring-primary">
                  <Icon name={c.icon} size={26} />
                  <span className="stripes absolute -right-1 -bottom-1 h-3 w-3 text-accent" />
                </div>
                <div>
                  <span className="eyebrow !text-[0.7rem] text-accent-soft">{pad(i + 1)}</span>
                  <h3 className="mt-1 text-[1.25rem] leading-snug font-semibold text-white">{c.strong}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">{c.rest}</p>
                </div>
              </div>
            </li>
          ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10">
          <p className="flex items-start gap-4 border-l-4 border-primary bg-secondary px-6 py-5 font-display text-xl leading-snug font-medium text-surface sm:px-8 sm:py-6 sm:text-[1.6rem]">
            {whoWeServe.closing}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section id="products" className="section scroll-mt-20 lg:scroll-mt-28 bg-surface-sunk">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHead eyebrow="Product Range · 8 Categories" title={productsSection.headline} />
          </Reveal>
          <Reveal delay={100} className="max-w-md">
            <p className="leading-relaxed text-text-muted">{productsSection.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={(i % 4) * 60}>
              <Link
                to={`/products/${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-white text-secondary shadow-plate transition-[box-shadow,transform,border-color] duration-300 ease-[var(--ease-weight)] hover:-translate-y-1 hover:border-secondary/30 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <img
                    src={categoryThumb(c.slug)}
                    alt={categoryImages[c.slug].alt}
                    width="1200"
                    height="900"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-weight)] group-hover:scale-[1.06]"
                  />
                  {/* Soft shade behind the corner number + base fade into the card body */}
                  <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgb(34_35_38/0.55),transparent_45%)]" />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent" />
                  <span className="absolute top-3 left-3 grid h-10 w-10 place-items-center rounded-sm bg-white/90 text-secondary shadow-plate transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon name={c.theme.icon} size={21} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-4 bg-gradient-to-b from-white/95 via-white/60 to-white/10 bg-clip-text font-display text-[3.25rem] leading-none font-bold tracking-[-0.03em] text-transparent drop-shadow-[0_2px_6px_rgb(0_0_0/0.25)]"
                  >
                    {pad(i + 1)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-[1.25rem] leading-[1.2] font-semibold transition-colors group-hover:text-primary">{c.card.title}</h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-text-muted">{c.card.summary}</p>
                  <span className="mt-auto pt-5">
                    <span className="inline-flex min-h-11 w-max items-center gap-3 rounded-sm bg-primary px-5 font-display text-[0.8rem] font-semibold tracking-[0.08em] text-white uppercase transition-colors group-hover:bg-primary-deep">
                      View range
                      <Icon name="arrow" size={17} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FortyYears() {
  return (
    <section className="section relative overflow-hidden bg-surface-raised">
      <div className="pointer-events-none absolute top-6 right-[var(--space-gutter)] font-display text-[8rem] leading-none font-semibold text-surface-sunk/70 select-none sm:text-[12rem] lg:text-[15rem]" aria-hidden="true">
        40
      </div>
      <div className="container relative">
        <Reveal>
          <Eyebrow>Why Star Metal Store</Eyebrow>
          <h2 className="mt-5 max-w-4xl text-[1.95rem] leading-[1.1] font-semibold text-secondary sm:text-[2.6rem] lg:text-[3rem]">
            {whyUs.headline[0]}
            <span className="block text-primary">{whyUs.headline[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="max-w-[42rem] text-lg leading-relaxed text-text-primary">
              {whyUs.body}
            </p>
            <p className="mt-6 font-display text-xl leading-snug font-medium text-secondary">{whyUs.bridge}</p>
            <img
              src={sceneSrc('teaKadai')}
              alt={scenes.teaKadai.alt}
              width={scenes.teaKadai.w}
              height={scenes.teaKadai.h}
              loading="lazy"
              decoding="async"
              className="mt-8 aspect-[16/10] w-full rounded-sm border border-line object-cover"
            />
          </Reveal>
          <Reveal delay={120} as="figure" className="relative lg:col-span-5">
            <div className="relative isolate flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-sm border-t-4 border-primary bg-secondary px-7 py-10 text-surface sm:px-10 sm:py-12">
              {/* Catering carriers behind the quote, faded out toward the text */}
              <img
                src={categoryBanner('catering-equipment')}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 -z-10 h-full w-full object-cover object-[72%_center]"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/15" />
              <span className="font-display text-8xl leading-[0.4] text-accent" aria-hidden="true">“</span>
              <blockquote className="mt-4 font-display text-[1.65rem] leading-[1.2] font-medium sm:text-[2.1rem] lg:text-[2.4rem]">
                {whyUs.pullQuote}
              </blockquote>
              <figcaption className="eyebrow mt-8 flex items-center gap-2 border-t border-line-dark pt-6 text-accent-soft">
                <span className="h-px w-8 bg-accent" /> Since 1988
              </figcaption>
            </div>
          </Reveal>
        </div>

        <Reveal as="ol" className="mt-14 grid gap-5 md:grid-cols-2">
          {whyUs.pillars.map((p, i) => (
            <li
              key={p.title}
              className="group relative isolate overflow-hidden rounded-md border border-white bg-gradient-to-b from-white via-surface-raised to-surface p-7 shadow-[inset_0_1px_0_#fff,0_1px_2px_rgb(34_35_38/0.06),0_14px_32px_-18px_rgb(34_35_38/0.35)] ring-1 ring-line transition-[transform,box-shadow] duration-300 ease-[var(--ease-weight)] hover:-translate-y-1 hover:shadow-[inset_0_1px_0_#fff,0_1px_2px_rgb(34_35_38/0.06),0_22px_40px_-18px_rgb(34_35_38/0.45)] sm:p-9"
            >
              {/* Gloss sheen across the top half */}
              <span aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-white/90 to-transparent" />
              <span aria-hidden="true" className="absolute -top-16 -right-16 -z-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition-colors group-hover:bg-primary/10" />
              <div className="flex items-center gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-gradient-to-b from-[#ee3a41] to-primary-deep text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_8px_16px_-8px_rgb(224_32_40/0.7)]">
                  <Icon name={pillarIcons[i]} size={28} />
                </span>
                <h3 className="text-[1.35rem] leading-snug font-semibold text-secondary sm:text-[1.45rem]">{p.title}</h3>
              </div>
              <p className="mt-5 leading-relaxed text-text-muted">{p.body}</p>
              <span aria-hidden="true" className="mt-6 block h-[2px] w-10 bg-accent transition-all duration-300 group-hover:w-20 group-hover:bg-primary" />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function LocationReach() {
  return (
    <section className="section relative isolate overflow-hidden bg-secondary text-surface">
      <div className="tex-brushed absolute inset-0 -z-10 opacity-40" />
      <Star className="pointer-events-none absolute -bottom-24 -left-24 -z-10 w-[26rem] text-white/[0.03]" />
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <SectionHead tone="light" eyebrow="Location & Reach" title={location.headline} />
          </Reveal>
          <Reveal delay={80} className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button to="/contact">{location.cta}</Button>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-12 grid overflow-hidden rounded-md border border-line-dark bg-ink shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)] lg:grid-cols-12">
          {/* Store card */}
          <div className="relative flex flex-col p-6 sm:p-9 lg:col-span-5">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-gradient-to-b from-[#ee3a41] to-primary-deep text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]">
                <Icon name="pin" size={28} />
              </span>
              <div>
                <p className="font-display text-[1.4rem] leading-tight font-semibold">{business.name}</p>
                <p className="mt-1 text-sm text-text-inverse-muted">{business.address.lines.join(', ')}</p>
              </div>
            </div>

            {location.body.map((p) => (
              <p key={p} className="mt-6 text-[0.97rem] leading-relaxed text-text-inverse-muted">{p}</p>
            ))}

            <p className="eyebrow mt-8 text-accent-soft">Buyers we serve from</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {reachTowns.map((t) => (
                <li key={t} className="rounded-sm border border-line-dark bg-white/[0.04] px-3 py-1.5 text-sm text-surface">{t}</li>
              ))}
              <li className="rounded-sm border border-accent/60 px-3 py-1.5 text-sm text-accent-soft">Tamil Nadu &amp; beyond</li>
            </ul>

            <div className="mt-8 border-t border-line-dark pt-6 lg:mt-auto">
              <Button href={mapLink} target="_blank" rel="noopener noreferrer" variant="ghostLight" className="w-full sm:w-auto">
                Get Directions
              </Button>
            </div>
          </div>

          {/* Live map */}
          <div className="relative min-h-[22rem] border-t border-line-dark sm:min-h-[26rem] lg:col-span-7 lg:min-h-[34rem] lg:border-t-0 lg:border-l">
            <iframe
              src={mapEmbed}
              title={`${business.name} on Google Maps`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section tex-grain">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="Social Proof" title={testimonials.headline} />
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal as="li" key={i} delay={i * 80} className="pending flex min-h-52 flex-col p-6">
              <span className="font-display text-6xl leading-[0.5] text-accent/60" aria-hidden="true">“</span>
              <div className="mt-4 space-y-2" aria-hidden="true">
                <div className="h-2 w-full bg-accent/15" />
                <div className="h-2 w-11/12 bg-accent/15" />
                <div className="h-2 w-3/4 bg-accent/15" />
              </div>
              <div className="mt-auto pt-6">
                <div className="h-2 w-1/3 bg-accent/25" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-6">
          <Pending note={testimonials.placeholder} />
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  usePageMeta(null, meta.home)
  return (
    <>
      <Hero />
      <TrustBar />
      <WhoWeServe />
      <Products />
      <FortyYears />
      <LocationReach />
      <Testimonials />
    </>
  )
}
