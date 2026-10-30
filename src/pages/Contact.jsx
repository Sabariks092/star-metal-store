import { useId, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import ReachMap from '../components/ReachMap'
import { PageHero } from '../components/PageHero'
import { Button, Eyebrow, Pending, Reveal, SectionHead } from '../components/ui'
import { usePageMeta } from '../components/usePageMeta'
import { contactHero, contactIntro, form, reach, afterSales } from '../content/contact'
import { business, meta } from '../content/site'
import { sceneSrc } from '../content/images'

const inputCls =
  'w-full min-h-12 rounded-sm border border-[#c9c1b0] bg-white px-4 py-3 text-base text-text-primary placeholder:text-text-muted/60 ' +
  'transition-[border-color,box-shadow] outline-none hover:border-secondary/50 focus:border-secondary focus:shadow-[0_0_0_3px_rgb(224_32_40_/_0.18)] ' +
  'aria-[invalid=true]:border-primary'

function Field({ id, label, required, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-1.5 text-[0.92rem] text-secondary">
        {label}
        {required && <span className="text-primary" aria-hidden="true">*</span>}
        {optional && <span className="text-xs text-text-muted">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm text-primary">{error}</p>}
    </div>
  )
}

const empty = { name: '', business: '', city: '', phone: '', email: '', category: '', message: '', contactMethod: form.fields.contactMethod.options[0] }

function EnquiryForm() {
  const uid = useId()
  const [params] = useSearchParams()
  const preset = params.get('category')
  const [values, setValues] = useState(() => ({
    ...empty,
    category: form.fields.category.options.includes(preset) ? preset : '',
  }))
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const f = form.fields
  const id = (k) => `${uid}-${k}`

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    for (const k of ['name', 'business', 'city', 'phone']) {
      if (!values[k].trim()) er[k] = `Please enter your ${f[k].label.toLowerCase()}.`
    }
    if (values.phone.trim() && !/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(values.phone.trim()))
      er.phone = 'Please enter a valid 10-digit mobile number.'
    if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) er.email = 'Please enter a valid email address.'
    return er
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    const first = Object.keys(er)[0]
    if (first) return document.getElementById(id(first))?.focus()
    setSubmitted(true)
  }

  const errProps = (k) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${id(k)}-err` : undefined })

  if (submitted) {
    return (
      <div className="rounded-sm border border-line border-t-[3px] border-t-primary bg-white p-6 sm:p-10" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-xs bg-secondary text-surface">
          <Icon name="check" size={24} strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 text-3xl font-semibold text-secondary">{values.business}</h3>
        <p className="mt-1 text-text-muted">{values.name}</p>
        <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-line pt-6 text-sm sm:grid-cols-2">
          {[['city', values.city], ['phone', values.phone], ['category', values.category], ['contactMethod', values.contactMethod]]
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow !text-[0.7rem] text-text-muted">{f[k].label}</dt>
                <dd className="mt-1 text-secondary">{v}</dd>
              </div>
            ))}
        </dl>
        <Pending className="mt-6" label="Online enquiry delivery" note="connection to the store's phone / email to be added" />
        <p className="mt-6 text-text-muted italic">{form.note}</p>
        <button type="button" onClick={() => { setValues(empty); setSubmitted(false) }} className="eyebrow mt-6 text-secondary underline underline-offset-4 hover:text-primary">
          {form.heading}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-sm border border-line border-t-[3px] border-t-primary bg-white p-5 sm:p-8">
      <h2 className="text-[1.85rem] leading-tight font-semibold text-secondary sm:text-[2.1rem]">{form.heading}</h2>
      <div className="mt-3 h-[2px] w-12 bg-accent" />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id={id('name')} label={f.name.label} required error={errors.name}>
          <input id={id('name')} className={inputCls} value={values.name} onChange={set('name')} autoComplete="name" required {...errProps('name')} />
        </Field>
        <Field id={id('business')} label={f.business.label} required error={errors.business}>
          <input id={id('business')} className={inputCls} value={values.business} onChange={set('business')} autoComplete="organization" required {...errProps('business')} />
        </Field>
        <Field id={id('city')} label={f.city.label} required error={errors.city}>
          <input id={id('city')} className={inputCls} value={values.city} onChange={set('city')} autoComplete="address-level2" required {...errProps('city')} />
        </Field>
        <Field id={id('phone')} label={f.phone.label} required error={errors.phone}>
          <input id={id('phone')} type="tel" inputMode="tel" className={inputCls} value={values.phone} onChange={set('phone')} autoComplete="tel" placeholder="+91" required {...errProps('phone')} />
        </Field>
        <Field id={id('email')} label={f.email.label} optional error={errors.email}>
          <input id={id('email')} type="email" inputMode="email" className={inputCls} value={values.email} onChange={set('email')} autoComplete="email" {...errProps('email')} />
        </Field>
        <Field id={id('category')} label={f.category.label}>
          <div className="relative">
            <select id={id('category')} className={`${inputCls} appearance-none pr-10`} value={values.category} onChange={set('category')}>
              <option value="">—</option>
              {f.category.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <Icon name="chevron" size={18} strokeWidth={2.5} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-secondary" />
          </div>
        </Field>
        <div className="sm:col-span-2">
          <Field id={id('message')} label={f.message.label}>
            <textarea id={id('message')} rows={5} className={`${inputCls} resize-y`} value={values.message} onChange={set('message')} />
          </Field>
        </div>
        <fieldset className="sm:col-span-2">
          <legend className="mb-2 text-[0.92rem] text-secondary">{f.contactMethod.label}</legend>
          <div className="grid grid-cols-3 gap-2">
            {f.contactMethod.options.map((o) => (
              <label key={o} className="relative cursor-pointer">
                <input type="radio" name={id('contactMethod')} value={o} checked={values.contactMethod === o} onChange={set('contactMethod')} className="peer sr-only" />
                <span className="flex min-h-12 items-center justify-center gap-2 rounded-sm border border-[#c9c1b0] bg-white px-2 text-center font-display text-[0.92rem] font-medium tracking-[0.04em] text-text-muted uppercase transition-colors peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary hover:border-secondary/50">
                  <Icon name={o === 'WhatsApp' ? 'chat' : o === 'Email' ? 'mail' : 'phone'} size={16} className="hidden min-[400px]:block" />
                  {o}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6">
        <Button type="submit" className="w-full sm:w-auto sm:self-start">{form.submit}</Button>
        <p className="text-sm text-text-muted italic">{form.note}</p>
      </div>
    </form>
  )
}

function DetailRow({ icon, label, children }) {
  return (
    <li className="flex gap-4 border-b border-line py-4 last:border-b-0">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xs border border-line bg-surface text-secondary">
        <Icon name={icon} size={20} />
      </span>
      <div className="min-w-0">
        <p className="eyebrow !text-[0.7rem] text-text-muted">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  )
}

export default function Contact() {
  usePageMeta('Contact', meta.contact)
  return (
    <>
      <PageHero image={sceneSrc('contactHero')} imageSeam eyebrow="Bulk Orders · Wholesale Enquiries" title={contactHero.heading} subtitle={contactHero.subheading} />

      <section className="section tex-grain">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-[42rem] text-lg leading-relaxed text-secondary sm:text-xl">{contactIntro}</p>
            </Reveal>
            <Reveal delay={80} className="mt-10">
              <EnquiryForm />
            </Reveal>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            {/* After-sales — the B2B differentiator, given the strongest card on the page */}
            <Reveal>
              <div className="relative overflow-hidden rounded-sm border-t-[3px] border-primary bg-secondary p-7 text-surface sm:p-9">
                <div className="stripes absolute -top-4 -right-4 h-28 w-28 text-accent/25" />
                <span className="relative grid h-12 w-12 place-items-center rounded-xs bg-primary text-white">
                  <Icon name="wrench" size={24} />
                </span>
                <h2 className="relative mt-6 text-[1.85rem] leading-tight font-semibold">{afterSales.heading}</h2>
                <p className="relative mt-4 leading-relaxed text-text-inverse-muted">{afterSales.body}</p>
                <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-line-dark pt-5">
                  <Icon name="phone" size={18} className="text-accent-soft" />
                  <span className="text-sm font-bold">{business.phone.label}:</span>
                  {business.phone.numbers.map((n, i) => (
                    <span key={n.tel} className="flex items-center gap-2">
                      {i > 0 && <span aria-hidden="true" className="text-white/30">/</span>}
                      <a translate="no" href={`tel:${n.tel}`} className="notranslate font-display font-semibold tracking-[0.02em] text-surface underline-offset-4 hover:text-accent-soft hover:underline">{n.display}</a>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-sm border border-line bg-white p-6 sm:p-8">
                <Eyebrow>Contact Details</Eyebrow>
                <p className="mt-4 font-display text-2xl font-semibold text-secondary">{business.name}</p>
                <ul className="mt-3">
                  <DetailRow icon="pin" label={business.address.label}>
                    <address className="text-secondary not-italic">
                      {business.address.lines.map((l) => <span key={l} className="block">{l}</span>)}
                    </address>
                  </DetailRow>
                  <DetailRow icon="phone" label={business.phone.label}>
                    {business.phone.numbers.map((n) => (
                      <a key={n.tel} translate="no" href={`tel:${n.tel}`} className="notranslate block text-secondary transition-colors hover:text-primary">{n.display}</a>
                    ))}
                  </DetailRow>
                  <DetailRow icon="chat" label={business.whatsapp.label}>
                    <Pending compact />
                  </DetailRow>
                  <DetailRow icon="mail" label={business.email.label}>
                    <a translate="no" href={`mailto:${business.email.value}`} className="notranslate break-all text-secondary transition-colors hover:text-primary">{business.email.value}</a>
                  </DetailRow>
                  <DetailRow icon="clock" label={business.hours.label}>
                    <Pending compact note={business.hours.note} />
                  </DetailRow>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-secondary text-surface">
        <div className="tex-brushed absolute inset-0 opacity-40" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHead tone="light" eyebrow="How to Reach Us" title={reach.heading} />
            <p className="mt-6 leading-relaxed text-text-inverse-muted">{reach.body}</p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-sm border border-line-dark bg-ink/50">
              <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <ReachMap className="mx-auto h-auto w-full max-w-xs p-4" />
                <div className="flex flex-col justify-center gap-4 border-t border-line-dark p-6 sm:border-t-0 sm:border-l">
                  <Icon name="pin" size={36} className="text-primary" />
                  <Pending tone="light" label="Map" note={reach.mapPlaceholder} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
