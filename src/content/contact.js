// content.md › PAGE: CONTACT

export const contactHero = {
  heading: 'Get in Touch With Star Metal Store',
  subheading:
    'Bulk orders, wholesale enquiries and after-sales service.',
}

export const contactIntro =
  'Planning a full kitchen setup, reordering bulk vessels or need something custom? Tell us what you need — or let us help you work it out.'

export const form = {
  heading: 'Send Us a Bulk Enquiry',
  fields: {
    name: { label: 'Your Name', required: true },
    business: { label: 'Business Name', required: true },
    city: { label: 'City / Location', required: true },
    phone: { label: 'Phone Number', required: true },
    email: { label: 'Email Address', required: false },
    category: {
      label: 'What are you looking for?',
      options: [
        'Chinese Restaurant Equipment',
        'Tea Shop Setup',
        'Restaurant Kitchen',
        'Catering Equipment',
        'Corporate Canteen',
        'Food Processing Machinery',
        'Hawkins Cookers & Cookware',
        'Bakery & Café Equipment',
        'General',
        'Other',
      ],
    },
    message: { label: 'Tell us more about your requirement' },
    contactMethod: { label: 'Preferred contact method', options: ['Phone call', 'WhatsApp', 'Email'] },
  },
  submit: 'Send Enquiry',
  note: 'We reply within one business day. Urgent? Call or WhatsApp us.',
}

export const reach = {
  heading: 'Finding Us in Pondicherry',
  body: 'Easy to reach from Villupuram, Cuddalore, Tindivanam and Chidambaram — buyers from Chennai, Vellore and Trichy make the trip for our prices.',
  mapPlaceholder: 'Map embed and specific address / landmark directions to be added here',
}

export const afterSales = {
  heading: 'After-Sales Support',
  body: 'Existing customer? Call the same number for service or replacements — keep your purchase details handy.',
}
