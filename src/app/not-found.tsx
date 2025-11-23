"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner.jpg"
            alt="404 Not Found"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <Container className="relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-8xl md:text-9xl font-bold text-tedx-red mb-4">
                404
              </h1>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-lg mb-12 text-gray-300">
              Let's get you back on track to discovering ideas worth spreading.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button size="lg" className="bg-tedx-red hover:bg-red-700">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center rounded-full font-medium transition-colors bg-white text-tedx-black hover:bg-gray-100 h-12 px-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Search className="w-6 h-6 text-tedx-red" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Popular Pages
              </h2>
            </div>
            <p className="text-gray-600">
              Here are some pages you might be looking for
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Events", href: "/events" },
              { name: "Speakers", href: "/speakers" },
              { name: "Partners", href: "/partners" },
              { name: "Contact", href: "/contact" },
              { name: "Get Involved", href: "/get-involved/volunteer" },
              { name: "Become a Speaker", href: "/get-involved/speak" },
            ].map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="block bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-tedx-red"
                >
                  <span className="text-tedx-black font-semibold hover:text-tedx-red transition-colors">
                    {link.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  )
}

