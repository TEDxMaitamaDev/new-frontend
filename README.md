# TEDxMaitama Website

A modern, responsive website for TEDxMaitama built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Interactive Navigation**: Animated mobile menu with slide-in navigation
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Performance**: Optimized images, lazy loading, and efficient animations
- **Developer Experience**: TypeScript, ESLint, and organized component structure

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
│   ├── about
│   │   └── page.tsx      # About Page
│   ├── contact
│   │   └── page.tsx      # Contact Page
│   ├── events
│   │   └── page.tsx      # Event Page
│   ├── partners
│   │   └── page.tsx      # Partners Page
│   ├── speakers
│   │   └── page.tsx      # Speakers Page 
├── components/
│   ├── layout/            # Layout components
│   │   ├── Header.tsx     # Main header with navigation
│   │   ├── Footer.tsx     # Footer with social links
│   │   ├── Layout.tsx     # Main layout wrapper
│   │   ├── DesktopNavigation.tsx  # Desktop menu
│   │   └── MobileNavigation.tsx   # Mobile menu
│   └── ui/                # Reusable UI components
│       ├── Button.tsx     # Button component
│       └── Container.tsx  # Container component
├── lib/                   # Utility libraries
│   └── navigation.ts      # Navigation data
├── types/                 # TypeScript type definitions
│   └── navigation.ts      # Navigation types
├── hooks/                 # Custom React hooks
│   └── useMobileMenu.ts   # Mobile menu hook
└── utils/                 # Utility functions
    └── cn.ts             # Class name utility
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd newfrontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Navigation Structure

The website includes a comprehensive navigation system with the following structure:

### Main Menu Items:
- **Home** - Landing page
- **About** - About TEDxMaitama
  - Our Mission
  - Our Team  
  - Our History
- **Events** - Event information
  - Current Event
  - Past Events
- **Speakers** - Speaker profiles
  - All Speakers
  - Featured Speakers
- **Get Involved** - Participation opportunities
  - Volunteer With Us
  - Partner With Us
  - Speak at TEDxMaitama
- **Partners** - Sponsors and partners
- **Blog / Insights** - Articles and updates
- **Contact** - Contact information

### Conditional Menu Item:
- **Tickets** - Appears when tickets are available

## 🎯 Key Components

### Header Component
- Fixed header with scroll effects
- Responsive navigation (desktop dropdowns, mobile slide-in)
- TEDxMaitama branding
- Tickets button (highlighted)

### Mobile Navigation
- Animated hamburger menu
- Slide-in navigation panel
- Expandable submenu items
- Touch-friendly interactions
- Backdrop overlay

### Footer Component
- Social media links
- Contact information
- Newsletter signup
- Quick links
- TEDx program link

## 🎨 Design System

### Colors
- **Primary**: Red (#dc2626) - TEDx brand color
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Various shades for hover states and highlights

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: Regular, Medium, Semibold, Bold
- **Responsive**: Fluid typography scaling

### Animations
- **Framer Motion**: Smooth page transitions and micro-interactions
- **CSS Animations**: Custom keyframes for loading states
- **Hover Effects**: Interactive feedback on all clickable elements

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting (recommended)

### Component Guidelines

1. **Use TypeScript**: All components should be typed
2. **Follow Naming**: Use PascalCase for components, camelCase for functions
3. **Props Interface**: Define prop interfaces for all components
4. **Accessibility**: Include ARIA labels and keyboard navigation
5. **Responsive**: Test on all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Content Management

### Navigation Updates
Update navigation items in `src/lib/navigation.ts`:

```typescript
export const mainNavigation: MenuItem[] = [
  {
    id: "new-page",
    label: "New Page",
    href: "/new-page",
    children: [
      {
        id: "sub-page",
        label: "Sub Page", 
        href: "/new-page/sub-page"
      }
    ]
  }
]
```

### Metadata Updates
Update site metadata in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your description",
  // ... other metadata
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- TEDx for the platform and guidelines
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations

## 📞 Support

For support or questions, please contact:
- Email: info@tedxmaitama.com
- Website: https://tedxmaitama.com

---

Built with ❤️ for TEDxMaitama
