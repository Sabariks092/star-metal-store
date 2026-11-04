import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { CtaBand, PageHero, heroBtn } from '../components/PageHero'
import { Button, Eyebrow, Pending, Reveal, SectionHead, Stamp } from '../components/ui'
import { usePageMeta } from '../components/usePageMeta'
import { categories, categoryBySlug } from '../content/categories'
import { hero } from '../content/home'
import { categoryBanner, productImage } from '../content/images'

const pad = (n) => String(n).padStart(2, '0')

function ProductImage({ slug, name, className }) {
  const { fit, ...img } = productImage(slug, name)
  return <img {...img} width="800" height="800" loading="lazy" decoding="async" className={`${fit} ${className}`} />
}

function ProductLedger({ c, enquireTo }) {
  const [featured, ...rest] = c.products
  return (
    <section className="section bg-surface-raised">
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHead eyebrow={c.card.title} title="Products in This Category" />
          </Reveal>
          <Reveal delay={80}>
            <Stamp className="text-accent">{pad(c.products.length)} product lines</Stamp>
          </Reveal>
        </div>

        {/* Showcase: the first product as a wide feature, the rest as tall catalogue cards */}
        {featured && (
          <Reveal className="mt-10">
            <article className="group grid overflow-hidden rounded-md border border-line bg-white shadow-plate transition-shadow duration-300 hover:shadow-lift lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <div className="relative aspect-square w-full overflow-hidden bg-surface sm:aspect-[4/3] lg:aspect-square">
                <ProductImage
                  slug={c.slug}
                  name={featured.name}
                  className="h-full w-full transition-transform duration-700 ease-[var(--ease-weight)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                <span className="absolute inset-x-0 top-0 h-1 bg-primary lg:inset-y-0 lg:right-auto lg:h-auto lg:w-1" />
                <span aria-hidden="true" className="font-display text-[4.5rem] leading-none font-bold tracking-[-0.04em] text-surface-sunk sm:text-[6rem]">
                  {pad(1)}
                </span>
                <ProductBody p={featured} large />
                <EnquireButton to={enquireTo} className="mt-8" />
              </div>
            </article>
          </Reveal>
        )}

        {rest.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-6">
            {rest.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={(i % 3) * 70}
                className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-plate transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-weight)] hover:-translate-y-1 hover:border-secondary/25 hover:shadow-lift">
                  <div className="relative aspect-square w-full overflow-hidden bg-surface">
                    <ProductImage
                      slug={c.slug}
                      name={p.name}
                      className="h-full w-full transition-transform duration-700 ease-[var(--ease-weight)] group-hover:scale-[1.06]"
                    />
                    <NumberChip n={i + 2} />
                  </div>
                  <span aria-hidden="true" className="h-[3px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex flex-1 flex-col p-6">
                    <ProductBody p={p} />
                    <EnquireButton to={enquireTo} className="mt-auto pt-6" />
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function NumberChip({ n }) {
  return (
    <span className="absolute top-4 left-4 rounded-sm bg-secondary/90 px-2.5 py-1.5 font-display text-sm leading-none font-semibold tracking-[0.08em] text-white">
      {pad(n)}
    </span>
  )
}

function ProductBody({ p, large = false }) {
  return (
    <>
      <h3 className={`font-semibold text-secondary ${large ? 'mt-2 text-[1.75rem] leading-tight sm:text-[2.25rem]' : 'text-[1.3rem] leading-snug'}`}>{p.name}</h3>
      {p.alias && (
        <span className="mt-2 inline-block self-start rounded-sm border border-line bg-surface px-2 py-0.5 text-[0.8rem] text-text-muted">
          also: <em>{p.alias}</em>
        </span>
      )}
      <p className={`mt-3 leading-relaxed text-text-muted ${large ? 'max-w-prose text-[1.05rem] sm:text-lg' : 'text-[0.95rem]'}`}>{p.desc}</p>
      {p.note && (
        <p className="mt-4 rounded-sm border-l-2 border-accent bg-surface px-3 py-2 text-sm leading-relaxed text-text-muted">{p.note}</p>
      )}
      {p.pending && <Pending className="mt-4" note={p.pending} />}
    </>
  )
}

function EnquireButton({ to, className = '' }) {
  return (
    <div className={className}>
      <Link
        to={to}
        className="group/btn inline-flex min-h-11 items-center gap-3 rounded-sm bg-primary px-5 font-display text-[0.8rem] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-primary-deep"
      >
        Enquire
        <Icon name="arrow" size={16} strokeWidth={2} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
      </Link>
    </div>
  )
}

export default function Category({ slug }) {
  const c = categoryBySlug[slug]
  usePageMeta(c.heading, c.meta)

  const index = categories.indexOf(c)
  const prev = categories[(index - 1 + categories.length) % categories.length]
  const next = categories[(index + 1) % categories.length]
  const enquireTo = `/contact?category=${encodeURIComponent(c.formOption)}`

  return (
    <div style={{ '--cat': c.theme.color }}>
      <PageHero
        eyebrow={`Category ${pad(index + 1)} of ${pad(categories.length)}`}
        title={c.heading}
        subtitle={c.subheading}
        texture={c.theme.texture}
        accent={c.theme.color}
        image={categoryBanner(slug)}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/#products' }, { label: c.card.title }]}
      >
        <Reveal delay={150} className="mt-5 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
          <Button to={enquireTo} className={heroBtn}>{hero.primaryCta}</Button>
          <Button href="#range" variant="ghostLight" className={heroBtn} title={c.card.summary}>View the Range</Button>
        </Reveal>
      </PageHero>

      {/* Intro + who it serves */}
      <section className="section tex-grain">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Category Overview</Eyebrow>
            <p className="mt-5 text-xl leading-relaxed text-secondary sm:text-[1.3rem]">{c.intro}</p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <div className="relative overflow-hidden rounded-sm bg-secondary p-6 text-surface sm:p-8">
              <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
              <div className="relative">
                <p className="eyebrow text-accent-soft">{c.servesIntro}</p>
                <ul className="mt-5 divide-y divide-line-dark">
                  {c.serves.map((s) => (
                    <li key={s} className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
                      <Icon name="check" size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-primary" />
                      <span className="text-surface/90">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div id="range" className="scroll-mt-20 lg:scroll-mt-28">
        <ProductLedger c={c} enquireTo={enquireTo} />
      </div>

      {/* Buyer note / Why buy from us */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="grid overflow-hidden rounded-sm border border-line bg-white md:grid-cols-[15rem_1fr]">
              <div className="flex items-center gap-4 border-b-[3px] border-accent bg-surface-sunk p-6 text-secondary md:flex-col md:items-start md:justify-between md:border-r-[3px] md:border-b-0 md:p-8">
                <Icon name={c.theme.icon} size={40} className="shrink-0 text-accent" />
                <p className="font-display text-[1.5rem] leading-tight font-semibold">{c.note.heading}</p>
              </div>
              <p className="p-6 text-lg leading-relaxed text-text-primary sm:p-10">{c.note.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand eyebrow={c.card.title} title={c.cta} cta={hero.primaryCta} to={enquireTo} accent={c.theme.color} />

      {/* Prev / next category */}
      <nav aria-label="Other categories" className="border-t border-line bg-surface-sunk">
        <div className="container grid grid-cols-2 divide-x divide-line">
          {[{ c: prev, dir: 'Previous' }, { c: next, dir: 'Next' }].map(({ c: o, dir }) => (
            <Link
              key={dir}
              to={`/products/${o.slug}`}
              className={`group flex flex-col gap-2 py-8 ${dir === 'Next' ? 'items-end pl-4 text-right' : 'pr-4'}`}
            >
              <span className="eyebrow !text-[0.7rem] text-text-muted">{dir}</span>
              <span className="flex items-center gap-3 font-display text-lg leading-tight font-semibold text-secondary transition-colors group-hover:text-primary sm:text-[1.35rem]">
                {dir === 'Previous' && <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: o.theme.color }} />}
                {o.card.title}
                {dir === 'Next' && <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: o.theme.color }} />}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
