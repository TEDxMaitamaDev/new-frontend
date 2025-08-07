"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { DesktopNavigation } from "./DesktopNavigation"
import { MobileNavigation } from "./MobileNavigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-white"
        }
      `}
    >
      <div className="bg-black px-4 sm:px-6 lg:px-8 border-bottom border-2 border-white">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              <Image src="/logo-white.png" alt="TedX Maitama" width={200} height={10} />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </motion.header>
  )
} 