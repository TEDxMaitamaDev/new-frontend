"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube, 
  ExternalLink 
} from "lucide-react"
import { mainNavigation, socialLinks } from "@/lib/navigation"
import { subscribeNewsletter } from "@/lib/api/newsletter"

const footerNavigation = {
  main: mainNavigation.filter(item => !item.children), // Only top-level items
  social: socialLinks,
}

const contactInfo = [
  {
    id: "twitter",
    icon: Twitter,
    href: "https://twitter.com/tedxmaitama",
    isExternal: true,
  },
  {
    id: "instagram",
    icon: Instagram,
    href: "https://instagram.com/tedxmaitama",
    isExternal: true,
  },
  {
    id: "facebook",
    icon: Facebook,
    href: "https://facebook.com/tedxmaitama",
    isExternal: true,
  }
]

// Social media icon mapping
const socialIcons = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter your email address" })
      return
    }

    try {
      setLoading(true)
      setMessage(null)
      const result = await subscribeNewsletter(email)
      
      if (result.success) {
        setMessage({ type: "success", text: result.message || "Successfully subscribed to newsletter!" })
        setEmail("")
      } else {
        setMessage({ type: "error", text: result.message || "Failed to subscribe. Please try again." })
      }
    } catch (error: any) {
      setMessage({ 
        type: "error", 
        text: error.message || "An error occurred. Please try again later." 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-black text-white text-center border-t border-tedx-brown-100">
      <div className="mx-auto md:w-6/12 w-11/12 max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Contact Information */}
          <div className="">
            <h3 className="text-4xl font-bold font-inter">Join the Movement</h3>
            <p className="mt-2 text-sm text-gray-400">
              Be the first to know about the new talks, events and opportunities.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex rounded-lg border-0 p-2 bg-tedx-brown border-tedx-brown">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-tedx-brown text-sm text-white placeholder-gray-400 focus:border-tedx-brown focus:bg-tedx-brown focus:outline-tedx-brown disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer rounded-lg bg-tedx-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm ${
                      message.type === "success" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {message.text}
                  </motion.p>
                )}
              </div>
            </form>
            </div>

              {/* Socials */}
              <div className="mt-6 mx-auto flex space-evenly items-center justify-center"> 
                <ul className="flex flex-wrap space-x-4">
                {contactInfo.map((contact) => (
                  <li key={contact.id} className="flex items-start space-x-3">
                    <div>
                      <a
                        href={contact.href}
                        target={contact.isExternal ? "_blank" : "_self"}
                        className="text-sm text-tedx-brown transition-colors hover:text-white"
                      >
                        <contact.icon className="h-5 w-5 flex-shrink-0 text-tedx-brown-100" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Copyright */}
            <div className="mt-6 border-t border-tedx-brown-100">
              <p className="text-sm text-tedx-brown-100 mt-2">
                © {new Date().getFullYear()} TEDxMaitama. All rights reserved.
              </p>
            </div>
        </div>
    </footer>
  )
} 