"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import Image from "next/image"

export default function Tickets() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
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
        <Container className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get Your <span className="text-tedx-red">Tickets</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            Join us for inspiring talks and connect with like-minded individuals at TEDxMaitama events.
          </motion.p>
        </Container>
      </section>

      {/* Tickets Content */}
      <section className="py-16">
        <Container>
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <i className="fa-solid fa-ticket text-6xl text-gray-300 mb-4"></i>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-tedx-red">
                No Event Tickets Available
              </h2>
              <p className="text-gray-600 text-lg">
                We&rsquo;re currently not selling tickets for any events. Please check back later or subscribe to our newsletter to be notified when tickets become available.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

