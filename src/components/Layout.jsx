import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '/logo.png'
import Icon from './Icon'
import { Button, Star } from './ui'
import { getLang, setLang } from './translate'
import { business, footer, nav } from '../content/site'
import { categories } from '../content/categories'
import { hero } from '../content/home'

const YEAR = new Date().getFullYear()

/* Restores scroll on navigation and honours #hash targets (e.g. /#products). */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex min-w-0 items-center gap-3 ${className}`} aria-label={`${business.name} — Home`}>
      <img src={logo} alt="" width="1057" height="573" className="h-9 w-auto sm:h-12" />
      <span className="border-l border-line pl-3 leading-none">
        <span translate="no" className="notranslate block font-display text-[1rem] font-bold tracking-[0.02em] whitespace-nowrap text-secondary uppercase sm:text-[1.15rem]">{business.name}</span>
        <span className="eyebrow mt-1.5 hidden !text-[0.62rem] !tracking-[0.18em] text-accent sm:block">Pondicherry · Est. 1988</span>
      </span>
    </Link>
  )
}

/* EN / தமிழ் switch — floats at the bottom-right of every page; reloads into Google's page
   translation (see translate.js). */
function LanguageSwitch() {
  const [lang] = useState(getLang)
  const opt = (code, label, name) => (
    <button
      type="button"
      lang={code}
      aria-pressed={lang === code}
      aria-label={name}
      onClick={() => setLang(code)}
      className={`min-w-11 rounded-sm px-3 text-[0.85rem] font-semibold transition-colors ${code === 'ta' ? "font-['Anek_Tamil',sans-serif]" : 'font-display tracking-[0.04em]'} ${
        lang === code ? 'bg-primary text-white' : 'text-surface/80 hover:bg-white/10 hover:text-white'
      }`}
    >
      {label}
    </button>
  )
  return (
    <div
      role="group"
      aria-label="Language"
      translate="no"
      className="notranslate fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex h-11 gap-1 rounded-md border border-white/10 bg-secondary/95 p-1 shadow-[0_12px_28px_-10px_rgb(0_0_0/0.55)] backdrop-blur sm:right-6 sm:bottom-6"
    >
      {opt('en', 'EN', 'English')}
      {opt('ta', 'தமிழ்', 'Tamil')}
    </div>
  )
}

const navLinkCls = ({ isActive }) =>
  `relative px-1 py-2 label-wide text-[0.85rem] transition-colors hover:text-primary after:absolute after:inset-x-1 after:-bottom-0.5 after:h-[2px] after:bg-primary after:transition-transform ${
    isActive ? 'text-primary after:scale-x-100' : 'text-secondary after:scale-x-0'
  }`

function ProductsMenu() {
  return (
    <div className="group relative">
      <Link to="/#products" className="label-wide flex items-center gap-1 px-1 py-2 text-[0.85rem] text-secondary transition-colors hover:text-primary group-hover:text-primary">
        Products
        <Icon name="chevron" size={14} strokeWidth={2.25} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>
      <div className="invisible absolute top-full left-1/2 z-50 w-[36rem] -translate-x-1/2 pt-4 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line border-t-[3px] border-t-primary bg-line shadow-lift">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/products/${c.slug}`}
              className="group/item flex items-center gap-3 bg-white px-4 py-3 font-display text-[0.98rem] leading-snug font-medium text-secondary transition-colors hover:bg-surface hover:text-primary"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xs bg-surface text-secondary transition-colors group-hover/item:bg-secondary group-hover/item:text-white">
                <Icon name={c.theme.icon} size={19} />
              </span>
              {c.formOption}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function Header() {
  const location = useLocation()
  // The menu is "open at" a specific navigation; any route change closes it.
  const [openAt, setOpenAt] = useState(null)
  const open = openAt === location.key
  const setOpen = (fn) => setOpenAt(fn(open) ? location.key : null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      {/* Utility strip — sticks with the header on large screens */}
      <div className="z-50 bg-ink text-[0.8rem] text-surface/85 lg:sticky lg:top-0">
        <div className="container flex h-9 items-center justify-between gap-4">
          <p translate="no" className="notranslate flex min-w-0 items-center gap-2">
            <Icon name="phone" size={14} className="shrink-0 text-accent-soft" />
            {business.phone.numbers.map((n, i) => (
              <span key={n.tel} className="flex items-center gap-2 whitespace-nowrap">
                {i > 0 && <span aria-hidden="true" className="text-white/30">/</span>}
                <a href={`tel:${n.tel}`} className="transition-colors hover:text-accent-soft">{n.display}</a>
              </span>
            ))}
          </p>
          <div className="hidden items-center gap-6 md:flex">
            <a translate="no" href={`mailto:${business.email.value}`} className="notranslate flex items-center gap-2 transition-colors hover:text-accent-soft">
              <Icon name="mail" size={14} className="text-accent-soft" />
              {business.email.value}
            </a>
            <p className="hidden items-center gap-2 xl:flex">
              <Icon name="pin" size={14} className="text-accent-soft" />
              {business.address.lines.join(', ')}
            </p>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b border-line bg-surface-raised transition-shadow lg:top-9 ${
          scrolled ? 'shadow-lift' : ''
        }`}
      >
        <div className="container flex h-[4.5rem] items-center justify-between gap-4 lg:gap-6">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((n) =>
              n.label === 'Products' ? (
                <ProductsMenu key={n.label} />
              ) : (
                <NavLink key={n.label} to={n.to} end className={navLinkCls}>
                  {n.label}
                </NavLink>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block"><Button to="/contact" className="!min-h-11 !px-5">
              {hero.primaryCta}
            </Button></span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-sm border border-secondary/25 text-secondary transition-colors hover:border-secondary lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          id="mobile-nav"
          className={`absolute inset-x-0 top-full h-[calc(100svh-4.5rem)] overflow-y-auto overscroll-contain border-t-[3px] border-primary bg-secondary text-surface transition-[opacity,visibility] duration-200 lg:hidden ${
            open ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <nav className="container pt-6 pb-16" aria-label="Mobile">
            <ul className="divide-y divide-line-dark border-y border-line-dark">
              {nav.filter((n) => n.label !== 'Products').map((n) => (
                <li key={n.label}>
                  <NavLink
                    to={n.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 font-display text-xl font-medium tracking-[0.05em] uppercase ${isActive ? 'text-primary' : ''}`
                    }
                  >
                    {n.label}
                    <Icon name="arrow" size={20} className="text-primary" />
                  </NavLink>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8 text-accent-soft">Products</p>
            <ul className="mt-3 divide-y divide-line-dark border-y border-line-dark">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/products/${c.slug}`} className="flex items-center gap-3 py-3 font-display text-[1.02rem] font-medium leading-snug transition-colors hover:text-accent-soft">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xs border border-line-dark text-accent-soft">
                      <Icon name={c.theme.icon} size={18} />
                    </span>
                    {c.formOption}
                  </Link>
                </li>
              ))}
            </ul>
            <Button to="/contact" className="mt-8 w-full">{hero.primaryCta}</Button>
          </nav>
        </div>
      </header>
    </>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-text-inverse-muted">
      <div className="h-1 bg-primary" />
      <div className="container grid gap-10 py-14 sm:gap-12 sm:py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="inline-block rounded-sm bg-white px-3 py-2">
            <img src={logo} alt={business.name} width="1057" height="573" className="h-12 w-auto" />
          </div>
          <ul className="mt-6 space-y-1.5 border-l-2 border-accent pl-4 text-sm leading-relaxed">
            <li>{footer.details[0]}</li>
            <li>{business.address.lines.join(', ')}</li>
            <li className="flex flex-wrap items-center gap-x-2">
              <span className="text-surface/60">{business.phone.label}:</span>
              {business.phone.numbers.map((n, i) => (
                <span key={n.tel}>
                  {i > 0 && <span aria-hidden="true" className="mr-2 text-white/30">/</span>}
                  <a translate="no" href={`tel:${n.tel}`} className="notranslate text-surface transition-colors hover:text-accent-soft">{n.display}</a>
                </span>
              ))}
            </li>
            <li>
              <span className="text-surface/60">{business.email.label}: </span>
              <a translate="no" href={`mailto:${business.email.value}`} className="notranslate text-surface transition-colors hover:text-accent-soft">{business.email.value}</a>
            </li>
            <li>{footer.details[1]}</li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-accent-soft">Navigate</p>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.label}>
                <Link to={n.to} className="font-display text-[1.02rem] font-medium tracking-[0.04em] text-surface uppercase transition-colors hover:text-accent-soft">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <p className="eyebrow text-accent-soft">Product Categories</p>
          <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/products/${c.slug}`} className="group flex items-start gap-2.5 text-[0.95rem] leading-snug text-surface/90 transition-colors hover:text-accent-soft">
                  <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 bg-accent" />
                  {c.formOption}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 !text-[0.68rem]">
            {footer.taglineLine.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <Star className="h-2 w-2 text-primary" />}
                {t}
              </span>
            ))}
          </p>
          <p className="text-xs">© {YEAR} {business.name}</p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollManager />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <LanguageSwitch />
    </div>
  )
}

