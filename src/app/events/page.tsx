"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui"
import Image from "next/image"

export default function Events() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/events/event-1.png"
            alt="TEDx Maitama Stage"
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
            className="text-5xl font-bold mb-4"
          >
            TEDx Maitama
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg mb-6"
          >
            Ideas worth spreading
          </motion.p>
          <Button className="bg-tedx-red text-white px-6 py-3">Explore Events</Button>
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-black">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-72 rounded-lg overflow-hidden">
              <Image
                src="/images/events/event-2.png"
                alt="TEDx Maitama 2024"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-black">TEDx Maitama 2024</h3>
              <p className="text-tedx-red font-semibold mb-2">
                Theme: Innovation and Impact
              </p>
              <p className="text-gray-700 mb-4">
                Join us for a day of inspiring talks and discussions on how
                innovation can drive positive change in our communities and beyond.
              </p>
              <Button className="bg-tedx-red text-white">Register Now</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-black">Past Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "TEDx Maitama 2023",
                theme: "Resilience and Growth",
                img: "/images/events/event-1.png",
              },
              {
                title: "TEDx Maitama 2022",
                theme: "Connecting Minds",
                img: "/images/events/event-2.png",
              },
              {
                title: "TEDx Maitama 2021",
                theme: "Shaping the Future",
                img: "/images/events/event-1.png",
              },
            ].map((event, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <div className="relative h-48">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-black">{event.title}</h4>
                  <p className="text-sm text-gray-600">Theme: {event.theme}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* What is TEDx */}
      <section className="py-16 bg-black text-white">
        <Container>
          <h3 className="text-xl font-bold mb-4">
            What is <span className="text-tedx-red font-semibold">TEDx?</span>
          </h3>
          <p className="max-w-3xl text-lg opacity-90">
            In the spirit of ideas worth spreading, TED created the TEDx program—local,
            self-organized events that bring people together to share a TED-like
            experience. At <span className="text-tedx-red font-semibold">TEDx Maitama</span>,
            TED Talks videos and live speakers come together to spark deep dialogue,
            creativity, and connection within an intimate setting.
          </p>
        </Container>
      </section>
    </Layout>
  )
}
