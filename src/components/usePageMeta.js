import { useEffect } from 'react'
import { business } from '../content/site'

/* Sets <title> and meta description per route (content.md › META DESCRIPTIONS). */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${business.name}, Pondicherry` : `${business.name} — Pondicherry`
    const tag = document.querySelector('meta[name="description"]')
    if (tag && description) tag.setAttribute('content', description)
  }, [title, description])
}
