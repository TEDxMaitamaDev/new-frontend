"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Twitter, 
  Instagram, 
  Facebook 
} from "lucide-react"
import { subscribeNewsletter } from "@/lib/api/newsletter"

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
    } catch (error) {
      const err = error as { message?: string }
      setMessage({ 
        type: "error", 
        text: err?.message || "An error occurred. Please try again later." 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-black text-white text-center border-t border-tedx-brown-100">
      <div className="mx-auto w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:px-8">
          {/* Contact Information */}
          <div className="">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter">Join the Movement</h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Be the first to know about the new talks, events and opportunities.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row rounded-lg border-0 p-2 bg-tedx-brown border-tedx-brown gap-2 sm:gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-tedx-brown text-sm text-white placeholder-gray-400 focus:border-tedx-brown focus:bg-tedx-brown focus:outline-tedx-brown disabled:opacity-50 rounded-lg sm:rounded-none sm:rounded-l-lg"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer rounded-lg sm:rounded-none sm:rounded-r-lg bg-tedx-red px-4 py-2 sm:py-3 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
              <div className="mt-6 sm:mt-8 mx-auto flex items-center justify-center"> 
                <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {contactInfo.map((contact) => (
                  <li key={contact.id} className="flex items-center">
                    <a
                      href={contact.href}
                      target={contact.isExternal ? "_blank" : "_self"}
                      rel={contact.isExternal ? "noopener noreferrer" : undefined}
                      className="text-sm text-tedx-brown transition-colors hover:text-white"
                      aria-label={contact.id}
                    >
                      <contact.icon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-tedx-brown-100 hover:text-white transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Copyright */}
            <div className="mt-6 sm:mt-8 border-t border-tedx-brown-100 pt-4 sm:pt-6">
              <p className="text-xs sm:text-sm text-tedx-brown-100">
                © {new Date().getFullYear()} TEDxMaitama. All rights reserved.
              </p>
            </div>
        </div>
    </footer>
  )
} 