import Icon from '../components/Icon'
import { CtaBand, PageHero } from '../components/PageHero'
import { Reveal, Rich, SectionHead, Star } from '../components/ui'
import { usePageMeta } from '../components/usePageMeta'
import { aboutHero, story, whatWeDo, approach, numbers, values } from '../content/about'
import { hero, location } from '../content/home'
import { meta } from '../content/site'
import { scenes, sceneSrc } from '../content/images'

const pad = (n) => String(n).padStart(2, '0')

function Timeline() {
  const last = story.timeline.length - 1
  return (
    <section className="section tex-grain">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="Our Story" title={story.heading} />
        </Reveal>

        <ol className="relative mt-14 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {/* Rail: vertical on mobile, horizontal on desktop — brass, cut with logo stripes */}
          <span aria-hidden="true" className="stripes absolute top-2 bottom-2 left-[0.6875rem] w-1.5 text-accent/70 lg:top-[0.6875rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-1.5 lg:w-auto" />
          {story.timeline.map((step, i) => (
            <Reveal as="li" key={step.year} delay={i * 120} className="relative pl-12 lg:pt-14 lg:pl-0">
              <span
                className={`absolute top-0 left-0 grid h-7 w-7 place-items-center rounded-full border-[3px] ${
                  i === last ? 'border-primary bg-primary text-white' : 'border-secondary bg-surface-raised text-secondary'
                }`}
              >
                {i === last ? <Star className="h-3 w-3" /> : <span className="h-2 w-2 rounded-full bg-current" />}
              </span>
              <p className={`font-display text-[3.25rem] leading-none font-semibold tracking-[0.01em] sm:text-6xl ${i === last ? 'text-primary' : 'text-secondary'}`}>
                {step.year}
              </p>
              <p className="eyebrow mt-3 text-accent">{step.label}</p>
              <div className="mt-5 max-w-prose space-y-4 border-t border-line pt-5 leading-relaxed text-text-muted">
                {step.paragraphs.map((p) => (
                  <p key={p}><Rich text={p} /></p>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function WhatWeDo() {
  return (
    <section className="section bg-surface-raised">
      <div className="container grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHead eyebrow="What We Do" title={whatWeDo.heading} />
          {whatWeDo.body.map((p) => <p key={p} className="mt-5 text-[0.95rem] leading-relaxed text-text-muted sm:mt-6 sm:text-lg">{p}</p>)}
          <p className="mt-6 border-l-[3px] border-primary pl-4 font-display text-[1.05rem] leading-snug sm:pl-5 sm:text-xl font-medium text-secondary">{whatWeDo.closing}</p>
          <img
            src={sceneSrc('storeShelves')}
            alt={scenes.storeShelves.alt}
            width={scenes.storeShelves.w}
            height={scenes.storeShelves.h}
            loading="lazy"
            decoding="async"
            className="mt-8 aspect-[16/10] w-full rounded-sm border border-line object-cover"
          />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow text-text-muted">{whatWeDo.listIntro}</p>
          <ul className="mt-4 border-t-2 border-secondary">
            {whatWeDo.list.map((item, i) => (
              <li key={item.strong} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-4">
                <span className="font-display text-lg font-semibold text-accent">{pad(i + 1)}</span>
                <span>
                  <span className="block font-display text-[1.15rem] leading-snug font-medium text-secondary">{item.strong}</span>
                  <span className="text-[0.95rem] leading-relaxed text-text-muted">{item.rest}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section className="section relative overflow-hidden bg-secondary text-surface">
      <div className="tex-brushed absolute inset-0 opacity-40" />
      <div className="container relative grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <SectionHead tone="light" eyebrow="Our Approach" title={approach.heading} />
          <p className="mt-6 leading-relaxed text-text-inverse-muted">{approach.body}</p>
          <p className="mt-6 leading-relaxed text-text-inverse-muted">{approach.closing}</p>
          <img
            src={sceneSrc('kiloPricing')}
            alt={scenes.kiloPricing.alt}
            width={scenes.kiloPricing.w}
            height={scenes.kiloPricing.h}
            loading="lazy"
            decoding="async"
            className="mt-8 aspect-[16/10] w-full rounded-sm border border-line-dark object-cover"
          />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-sm border border-line-dark border-t-[3px] border-t-accent bg-ink/50 p-6 sm:p-8">
            <p className="text-[0.95rem] leading-relaxed text-surface sm:text-lg"><Rich text={approach.listIntro} strongClass="font-bold text-accent-soft" /></p>
            <ul className="mt-6 space-y-4">
              {approach.list.map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-xs bg-primary text-white">
                    <Icon name="check" size={16} strokeWidth={2.5} />
                  </span>
                  <span className="leading-relaxed text-text-inverse-muted"><Rich text={item} strongClass="font-bold text-surface" /></span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="Track Record" title={numbers.heading} />
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 border-t-2 border-l border-t-secondary border-l-line bg-white lg:grid-cols-3">
          {numbers.stats.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 90} className="border-r border-b border-line p-5 sm:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className={`block font-display text-[2.1rem] leading-[0.95] font-semibold sm:text-6xl lg:text-7xl ${i === 0 ? 'text-primary' : 'text-secondary'}`}>
                  {s.value}
                </span>
                <span className="mt-4 block max-w-[16rem] text-sm leading-snug text-text-muted sm:text-base" aria-hidden="true">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="section tex-grain">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="Our Values" title={values.heading} />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {values.items.map((v, i) => (
            <Reveal as="li" key={v.title} delay={(i % 2) * 90} className="lift group rounded-sm border border-line bg-white p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xs border border-secondary/30 text-secondary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  <Icon name={v.icon} size={24} />
                </span>
                <span className="eyebrow text-accent">Value {pad(i + 1)}</span>
              </div>
              <h3 className="mt-5 text-[1.2rem] leading-snug font-semibold text-secondary sm:mt-6 sm:text-[1.5rem]">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-text-muted">{v.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function About() {
  usePageMeta('About', meta.about)
  const [first, second] = aboutHero.heading.split('. ')
  return (
    <>
      <PageHero image={sceneSrc('aboutHero')} imageSeam eyebrow="About Star Metal Store" title={`${first}.`} accentLine={second} subtitle={aboutHero.subheading} />
      <Timeline />
      <WhatWeDo />
      <Approach />
      <Numbers />
      <Values />
      <CtaBand eyebrow={hero.primaryCta} title={location.headline} cta={location.cta} />
    </>
  )
}
