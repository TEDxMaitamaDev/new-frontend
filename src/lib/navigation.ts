import { MenuItem } from "@/types/navigation"

export const mainNavigation: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    children: [
      {
        id: "mission",
        label: "Our Mission",
        href: "/about/mission",
      },
      {
        id: "team",
        label: "Our Team",
        href: "/about/team",
      },
      {
        id: "history",
        label: "Our History",
        href: "/about/history",
      },
    ],
  },
  {
    id: "events",
    label: "Events",
    href: "/events",
    children: [
      {
        id: "current-event",
        label: "Current Event",
        href: "/events/current",
      },
      {
        id: "past-events",
        label: "Past Events",
        href: "/events/past",
      },
    ],
  },
  {
    id: "speakers",
    label: "Speakers",
    href: "/speakers",
    children: [
      {
        id: "all-speakers",
        label: "All Speakers",
        href: "/speakers/all",
      },
      {
        id: "featured-speakers",
        label: "Featured Speakers",
        href: "/speakers/featured",
      },
    ],
  },
  {
    id: "get-involved",
    label: "Get Involved",
    href: "/get-involved",
    children: [
      {
        id: "volunteer",
        label: "Volunteer With Us",
        href: "/get-involved/volunteer",
      },
      {
        id: "partner",
        label: "Partner With Us",
        href: "/get-involved/partner",
      },
      {
        id: "speak",
        label: "Speak at TEDxMaitama",
        href: "/get-involved/speak",
      },
    ],
  },
  {
    id: "partners",
    label: "Partners",
    href: "/partners",
  },
  {
    id: "blog",
    label: "Blog / Insights",
    href: "/blog",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
  },
]

export const ticketsNavigation: MenuItem = {
  id: "tickets",
  label: "Get Tickets",
  href: "/tickets",
  isHighlighted: true,
}

export const socialLinks = [
  {
    id: "twitter",
    label: "Twitter",
    href: "https://twitter.com/tedxmaitama",
    isExternal: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/tedxmaitama",
    isExternal: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/tedxmaitama",
    isExternal: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/tedxmaitama",
    isExternal: true,
  },
] 