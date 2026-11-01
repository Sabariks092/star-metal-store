import { useState } from 'react'
import { Eyebrow, Reveal } from './ui'
import { testimonials } from '../content/home'

type Review = {
  name: string
  meta: string
  when: string
  rating: number
  text: string
}

const reviews: Review[] = testimonials.reviews
const mapLink = 'https://www.google.com/maps?cid=7832759121906646307'
const INITIAL = 6

// Google's avatar fallback: a coloured disc with the reviewer's initial
const avatarColors = ['#1a73e8', '#d93025', '#188038', '#e37400', '#9334e6', '#007b83', '#c5221f', '#5f6368']
const avatarColor = (name: string) => avatarColors[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % avatarColors.length]

function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
          <path
            fill={n <= rating ? '#fbbc04' : '#dadce0'}
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="relative flex h-full flex-col rounded-md border border-line bg-white p-6 shadow-plate transition-[box-shadow,border-color] duration-300 ease-[var(--ease-weight)] hover:border-secondary/25 hover:shadow-lift">
      <header className="flex items-start gap-3 pr-8">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-[1.05rem] font-medium text-white"
          style={{ backgroundColor: avatarColor(review.name) }}
        >
          {review.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[0.98rem] leading-tight font-semibold text-secondary">{review.name}</p>
          <p className="mt-0.5 truncate text-[0.78rem] text-text-muted">{review.meta}</p>
        </div>
        <span className="absolute top-6 right-6">
          <GoogleG size={18} />
        </span>
      </header>
      <div className="mt-4 flex items-center gap-2.5">
        <Stars rating={review.rating} />
        <span className="text-[0.8rem] text-text-muted">{review.when}</span>
      </div>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-text-primary">{review.text}</p>
    </article>
  )
}

export default function GoogleReviews() {
  const [showAll, setShowAll] = useState(false)
  const shown = showAll ? reviews : reviews.slice(0, INITIAL)

  return (
    <section className="section tex-grain" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <Eyebrow>Google Reviews</Eyebrow>
            <h2 id="reviews-heading" className="mt-4 text-[1.8rem] leading-[1.12] font-semibold text-secondary sm:text-[2.25rem] lg:text-[2.5rem]">
              {testimonials.headline}
            </h2>
          </Reveal>

          {/* Google-style summary bar */}
          <Reveal delay={80}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-md border border-line bg-white px-5 py-4 shadow-plate">
              <span className="flex items-center gap-3">
                <GoogleG size={28} />
                <span className="flex flex-col">
                  <span className="font-display text-[0.95rem] leading-tight font-semibold text-secondary">Google Reviews</span>
                  <span className="text-[0.78rem] text-text-muted">Star Metal Store · Puducherry</span>
                </span>
              </span>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center rounded-sm bg-[#1a73e8] px-4 font-display text-[0.8rem] font-semibold tracking-[0.04em] text-white uppercase transition-colors hover:bg-[#1557b0]"
              >
                Review us on Google
              </a>
            </div>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {shown.map((r, i) => (
            <Reveal as="li" key={r.name} delay={(i % 3) * 70}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {reviews.length > INITIAL && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-secondary/35 px-6 font-display text-[0.85rem] font-semibold tracking-[0.05em] text-secondary uppercase transition-colors hover:border-secondary hover:bg-secondary/5"
            >
              {showAll ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
            </button>
          )}
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-[#1a73e8] hover:underline"
          >
            <GoogleG size={16} />
            See all reviews on Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
