"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all bg-black duration-300
        ${isScrolled ? " backdrop-blur-md shadow-lg" : ""}
      `}
    >
      <div className="bg-black px-4 sm:px-6 py-3 sm:py-4 lg:px-8 border-b border-white">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">
              <Image
                src="/logo-white.png"
                alt="TedX Maitama"
                width={360}
                className="w-40 sm:w-56 md:w-64 lg:w-72 h-auto object-contain"
                height={340}
              />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </motion.header>
  );
}
