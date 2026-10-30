// Line-icon set drawn on a 32px grid, 1.75 stroke, square caps — sturdy, utilitarian,
// matching the heavy flat-terminal lettering of the SMS mark.
const paths = {
  // Buyers & categories
  hotel: (
    <>
      <path d="M5 27V9l11-5 11 5v18" />
      <path d="M3 27h26M10 13h3M19 13h3M10 18h3M19 18h3" />
      <path d="M13 27v-5h6v5" />
    </>
  ),
  carrier: (
    <>
      <path d="M9 9h14M16 5v4M11 5h10" />
      <rect x="7" y="9" width="18" height="6" />
      <rect x="7" y="15" width="18" height="6" />
      <rect x="7" y="21" width="18" height="6" />
      <path d="M5 12v12M27 12v12" />
    </>
  ),
  canteen: (
    <>
      <path d="M3 14h26M5 14v13M27 14v13M5 20h22" />
      <path d="M8 14c0-3 2-5 4-5s4 2 4 5M17 14c0-3 2-5 4-5s4 2 4 5" />
      <path d="M9 6h3M20 6h3" />
    </>
  ),
  tea: (
    <>
      <path d="M8 10h14v12a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5V10Z" />
      <path d="M22 13h2a3 3 0 0 1 0 6h-2M6 10h18" />
      <path d="M12 3c-1 1.5 1 2.5 0 4M17 3c-1 1.5 1 2.5 0 4" />
    </>
  ),
  mixer: (
    <>
      <path d="M10 27h14M12 27l1-4h8l1 4" />
      <path d="M9 9h13a3 3 0 0 1 3 3v2H12" />
      <path d="M9 5v18h4" />
      <path d="M14 16h8l-1 5h-6l-1-5ZM18 14v2" />
    </>
  ),
  scale: (
    <>
      <path d="M16 4v23M10 27h12M7 8h18" />
      <path d="M7 8l-4 9h8l-4-9ZM25 8l-4 9h8l-4-9Z" />
      <path d="M3 17a4 3 0 0 0 8 0M21 17a4 3 0 0 0 8 0" />
    </>
  ),
  wok: (
    <>
      <path d="M4 14h22a11 9 0 0 1-22 0Z" />
      <path d="M26 15l4-2M9 27h12" />
      <path d="M12 9c-1-2 1-3 0-5M17 9c-1-2 1-3 0-5" />
    </>
  ),
  idly: (
    <>
      <path d="M8 8h16v18H8z" />
      <path d="M8 14h16M8 20h16M14 4h4v4" />
      <circle cx="12" cy="11" r="1" />
      <circle cx="20" cy="11" r="1" />
      <circle cx="12" cy="17" r="1" />
      <circle cx="20" cy="17" r="1" />
      <circle cx="12" cy="23" r="1" />
      <circle cx="20" cy="23" r="1" />
    </>
  ),
  gear: (
    <>
      <circle cx="16" cy="16" r="4" />
      <path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M6.8 25.2l2.8-2.8M22.4 9.6l2.8-2.8" />
      <circle cx="16" cy="16" r="9" />
    </>
  ),
  cooker: (
    <>
      <path d="M6 13h16v10a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V13Z" />
      <path d="M5 13h18M22 15h7" />
      <path d="M12 13V9h4v4M14 9V5" />
      <path d="M13 5h2" />
    </>
  ),
  // Values
  hourglass: (
    <>
      <path d="M8 3h16M8 29h16" />
      <path d="M10 3c0 7 12 7 12 13s-12 6-12 13M22 3c0 7-12 7-12 13s12 6 12 13" />
      <path d="M13 25h6" />
    </>
  ),
  book: (
    <>
      <path d="M4 6h9a3 3 0 0 1 3 3v18a3 3 0 0 0-3-3H4V6ZM28 6h-9a3 3 0 0 0-3 3v18a3 3 0 0 1 3-3h9V6Z" />
      <path d="M8 11h4M8 15h4M20 11h4M20 15h4" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 12l5-4 5 2 4-2 5 1 7 3" />
      <path d="M3 12v8l3 2M29 12v8l-4 3" />
      <path d="M10 15l5 5a2 2 0 0 0 3-3l-4-4M16 18l3 3a2 2 0 0 0 3-3l-4-4M20 19l2 2a2 2 0 0 0 3-3l-6-6" />
    </>
  ),
  wrench: (
    <>
      <path d="M20 4a7 7 0 0 0-6.6 9.3L4 22.7 9.3 28l9.4-9.4A7 7 0 0 0 28 12l-4.5 4.5-5-1-1-5L22 6a7 7 0 0 0-2-2Z" />
    </>
  ),
  // Contact
  phone: (
    <path d="M7 4h5l2 7-3 2a16 16 0 0 0 8 8l2-3 7 2v5a3 3 0 0 1-3 3C14 28 4 18 4 7a3 3 0 0 1 3-3Z" />
  ),
  chat: (
    <>
      <path d="M16 4a12 12 0 0 0-10.4 18L4 28l6.2-1.6A12 12 0 1 0 16 4Z" />
      <path d="M11 12c0 5 4 9 9 9l1.5-2.5-3-1.5-1.5 1.5c-1.5-.5-3-2-3.5-3.5L15 13.5 13.5 10.5Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="7" width="26" height="18" />
      <path d="M3 8l13 10L29 8" />
    </>
  ),
  pin: (
    <>
      <path d="M16 29s-9-9.5-9-16a9 9 0 0 1 18 0c0 6.5-9 16-9 16Z" />
      <circle cx="16" cy="13" r="3.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 9v7l5 3" />
    </>
  ),
  truck: (
    <>
      <path d="M3 8h16v14H3zM19 13h6l4 5v4H19" />
      <circle cx="9" cy="24" r="2.5" />
      <circle cx="23" cy="24" r="2.5" />
    </>
  ),
  // UI
  arrow: <path d="M5 16h21M19 9l7 7-7 7" />,
  menu: <path d="M4 9h24M4 16h24M4 23h24" />,
  close: <path d="M7 7l18 18M25 7L7 25" />,
  check: <path d="M5 17l7 7L27 8" />,
  chevron: <path d="M9 12l7 7 7-7" />,
}

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.75, ...rest }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
