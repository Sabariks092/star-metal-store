// English ⇄ Tamil via Google's website translator. The choice lives in Google's own
// `googtrans` cookie, and the translator script is only loaded once Tamil is chosen.

const COOKIE = 'googtrans'
const EXPIRED = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'

export function getLang() {
  return new RegExp(`(?:^|;\\s*)${COOKIE}=/en/ta(?:;|$)`).test(document.cookie) ? 'ta' : 'en'
}

export function setLang(lang) {
  if (lang === getLang()) return
  if (lang === 'ta') {
    document.cookie = `${COOKIE}=/en/ta; path=/`
  } else {
    // Google may also have written the cookie on the bare and dotted domain — clear all three.
    const host = window.location.hostname
    for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${COOKIE}=; path=/; ${EXPIRED}${domain}`
    }
  }
  window.location.reload()
}

// Google swaps text nodes for <font> wrappers behind React's back; without this React
// throws when it later removes or re-orders those nodes (facebook/react#11538).
function guardDomForTranslation() {
  const { removeChild, insertBefore } = Node.prototype
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child
    return removeChild.call(this, child)
  }
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return node
    return insertBefore.call(this, node, ref)
  }
}

export function bootTranslate() {
  if (getLang() !== 'ta') return
  guardDomForTranslation()

  const mount = document.createElement('div')
  mount.id = 'google_translate_element'
  mount.hidden = true
  document.body.appendChild(mount)

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'ta', autoDisplay: false },
      'google_translate_element',
    )
  }
  const script = document.createElement('script')
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.head.appendChild(script)
}
