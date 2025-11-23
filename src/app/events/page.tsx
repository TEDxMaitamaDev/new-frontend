"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getAllEvents } from "@/lib/api/events"
import { EventType } from "@/types/event"

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        const data = await getAllEvents()
        // Transform backend data to frontend format
        const transformedEvents: EventType[] = data.map((event) => ({
          ...event,
          date: event.start_time || event.date_created || "",
          image: event.image || "/images/events/event-1.png",
        }))
        setEvents(transformedEvents)
        setError(null)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Separate upcoming and past events
  const now = new Date()
  const upcomingEvents = events.filter((event) => {
    if (!event.start_time) return false
    return new Date(event.start_time) > now
  })
  const pastEvents = events.filter((event) => {
    if (!event.start_time) return true
    return new Date(event.start_time) <= now
  })
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/events/event-1.jpg"
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
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="text-tedx-red">Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            Discover inspiring conferences, salons, and webinars that bring together visionary thinkers and bold ideas worth spreading.
          </motion.p>
          {!loading && upcomingEvents.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg mb-6 text-gray-200"
            >
              {upcomingEvents.length} {upcomingEvents.length === 1 ? 'event' : 'events'} coming soon
            </motion.p>
          )}
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-black">Upcoming Events</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No upcoming events at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="grid md:grid-cols-2 gap-10 items-center">
                  <div className="relative h-72 rounded-lg overflow-hidden">
                    <Image
                      src={event.image || "/images/events/event-1.png"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">{event.title}</h3>
                    {event.location && (
                      <p className="text-tedx-red font-semibold mb-2">
                        Location: {event.location}
                      </p>
                    )}
                    {event.start_time && (
                      <p className="text-gray-600 mb-2">
                        {new Date(event.start_time).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-gray-700 mb-4">
                      {event.description || "Join us for an inspiring event."}
                    </p>
                    <Button className="bg-tedx-red text-white">Register Now</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-black">Past Events</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : pastEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No past events available.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-lg overflow-hidden bg-white shadow-sm"
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image || "/images/events/event-1.png"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-black">{event.title}</h4>
                    {event.location && (
                      <p className="text-sm text-gray-600">Location: {event.location}</p>
                    )}
                    {event.start_time && (
                      <p className="text-sm text-gray-600">
                        {new Date(event.start_time).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  )
}
