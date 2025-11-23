import { MenuItem } from "@/types/navigation"

export const mainNavigation: MenuItem[] = [
  {
    id: "about",
    label: "About",
    href: "/about/about-us",
    children: [
      {
        id: "about-us",
        label: "About Us",
        href: "/about/about-us",
      },
      {
        id: "team",
        label: "Meet the Team",
        href: "/about/team",
      },
      {
        id: "volunteers",
        label: "Volunteers",
        href: "/about/volunteers",
      },
    ],
  },
  {
    id: "events",
    label: "Events",
    href: "/events",
  },
    {
    id: "speakers",
    label: "Speakers",
    href: "/speakers",
  },
  {
    id: "partners",
    label: "Partners",
    href: "/partners",
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
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