import { buildRichText, h2, h3, p, ul } from '../lexical'
import type { ProjectSeedData } from '../types'

export const yourkar: ProjectSeedData = {
  title: 'Yourkar Car Rental Platform',
  slug: 'yourkar-car-rental-platform',
  client: 'Yourkar',
  description:
    'Architected and developed a comprehensive website and Android mobile app for a rent-a-car broker in the Canary Islands, enabling fleet management, contract handling, and BLE-connected document printing.',
  industries: ['Automotive & Fleet', 'SaaS'],
  technologies: ['Vue.js', 'WebSockets', 'Android', 'BLE'],
  status: 'published',
  publishedDate: '2017-09-01T00:00:00.000Z',
  order: 11,
  featuredImageUrl: null,
  featuredImageAlt: 'Yourkar car rental management platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'Yourkar is a rent-a-car broker operating in the Canary Islands. The project involved building both the web platform and a companion Android app to streamline fleet operations and bookings.'
    ),

    h2('Web Platform'),

    h3('Comprehensive Management System'),
    p(
      'Architected, led, and developed a comprehensive website for managing contracts, agreements, and fleet operations using Vue.js and real-time WebSocket communication.'
    ),

    h2('Mobile Application'),

    h3('Android Native App'),
    ul([
      'Developed an Android native mobile application integrated with Yourkar\'s platform',
      'Enabled rent-a-car companies to manage contracts and handle bookings on the go',
      'Integrated BLE device support for printing documents directly from the app',
    ]),
  ]),
}
