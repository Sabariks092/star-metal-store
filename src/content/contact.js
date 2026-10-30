// content.md › PAGE: CONTACT

export const contactHero = {
  heading: 'Get in Touch With Star Metal Store',
  subheading:
    'For bulk orders, wholesale enquiries, equipment sourcing, and after-sales service — our team is available.',
}

export const contactIntro =
  "Star Metal Store has been serving commercial buyers from its Pondicherry location since 1988. Whether you're planning a full kitchen setup, reordering bulk vessels, or need to discuss a custom requirement — reach out to our team directly. We work best with buyers who know what they need; if you're still working it out, we can help with that too."

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
  note: 'We typically respond within one business day. For urgent requirements, call or WhatsApp directly.',
}

export const reach = {
  heading: 'Finding Us in Pondicherry',
  body: 'Our store is located in Pondicherry — well-connected by road to buyers from Villupuram, Cuddalore, Tindivanam, Chidambaram, and the broader coastal Tamil Nadu belt. Buyers from further afield — Chennai, Vellore, Trichy — regularly visit us for bulk procurement, as our pricing makes the trip worthwhile.',
  mapPlaceholder: 'Map embed and specific address / landmark directions to be added here',
}

export const afterSales = {
  heading: 'After-Sales Support',
  body: "If you're an existing customer and need after-sales support or a replacement enquiry, contact us on the same number. Our policy is to address service issues on applicable products — please have your purchase details ready when you call.",
}
