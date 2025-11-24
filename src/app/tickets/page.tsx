"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import Image from "next/image"

export default function Tickets() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/events/event-1.jpg"
            alt="TEDx Maitama Tickets"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 text-center text-white px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Get Your <span className="text-tedx-red">Tickets</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-6 leading-relaxed px-2"
          >
            Join us for inspiring talks and connect with like-minded individuals at TEDxMaitama events.
          </motion.p>
        </Container>
      </section>

      {/* Tickets Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <Container className="px-4 sm:px-6">
          <div className="text-center py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-4 sm:mb-6">
                <i className="fa-solid fa-ticket text-4xl sm:text-5xl md:text-6xl text-gray-300 mb-4"></i>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-tedx-red">
                No Event Tickets Available
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">
                We&rsquo;re currently not selling tickets for any events. Please check back later or subscribe to our newsletter to be notified when tickets become available.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

