export const SITE_CONFIG = {
  name: "TEDxMaitama",
  description: "Ideas worth spreading in Maitama, Abuja, Nigeria",
  url: "https://tedxmaitama.com",
  ogImage: "https://tedxmaitama.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/tedxmaitama",
    instagram: "https://instagram.com/tedxmaitama",
    facebook: "https://facebook.com/tedxmaitama",
    youtube: "https://youtube.com/tedxmaitama",
  },
  contact: {
    email: "info@tedxmaitama.com",
    phone: "+234 XXX XXX XXXX",
    address: "Maitama, Abuja, Nigeria",
  },
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export const ANIMATION_DELAYS = {
  fast: 0.1,
  normal: 0.2,
  slow: 0.3,
  slower: 0.5,
} as const

export const speakers = [
  { name: "Aisha Bello", role: "Director & Curator", image: null },
  { name: "Chukwuma Eze", role: "Creative Director & Executive Producer", image: null },
  { name: "Ngozi Okonjo", role: "Impact Director", image: null },
  { name: "Ibrahim Attah", role: "Head of Communications", image: null },
  { name: "Aisha Bello", role: "Head of People", image: null },
  { name: "Chukwuma Eze", role: "Speaker Relationship Manager", image: null },
  { name: "Ngozi Okonjo", role: "Volunteer Manager", image: null },
  { name: "Ibrahim Attah", role: "“Lead with vision and integrity.”", image: null },
];