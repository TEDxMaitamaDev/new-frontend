"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  ExternalLink 
} from "lucide-react"
import { cn } from "@/utils/cn"
import { mainNavigation, socialLinks } from "@/lib/navigation"

const footerNavigation = {
  main: mainNavigation.filter(item => !item.children), // Only top-level items
  social: socialLinks,
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@tedxmaitama.com",
    href: "mailto:info@tedxmaitama.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Maitama, Abuja, Nigeria",
    href: "#",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 XXX XXX XXXX",
    href: "tel:+234XXXXXXXXX",
  },
]

// Social media icon mapping
const socialIcons = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
                <span className="text-lg font-bold">T</span>
              </div>
              <span className="text-2xl font-bold">
                TEDx<span className="text-red-400">Maitama</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Ideas worth spreading in Maitama, Abuja. Join us in exploring 
              innovative ideas and inspiring conversations.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {footerNavigation.social.map((item) => {
                const IconComponent = socialIcons[item.id as keyof typeof socialIcons]
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-red-600 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {footerNavigation.main.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              {contactInfo.map((contact) => (
                <li key={contact.label} className="flex items-start space-x-3">
                  <contact.icon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {contact.label}
                    </p>
                    <a
                      href={contact.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {contact.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="mt-4 text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates and event announcements.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-l-md border-0 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} TEDxMaitama. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <a
                href="https://www.ted.com/about/programs-initiatives/tedx-program"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white"
              >
                TEDx Program
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 