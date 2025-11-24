"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllEvents } from "@/lib/api/events"
import { EventType } from "@/types/event"
import { createSlug } from "@/utils/slug"

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const buildEventUrl = (event: EventType) => {
    const slug = createSlug(event.title || `event-${event.id}`)
    return `/events/${event.id}/${slug}`
  }

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

  const now = new Date()
  const isUpcoming = (event: EventType) => {
    if (typeof event.is_upcoming === "boolean") return event.is_upcoming
    const compareDate = event.start_time || event.event_date
    if (!compareDate) return false
    return new Date(compareDate) > now
  }

  const isPast = (event: EventType) => {
    if (typeof event.is_past === "boolean") return event.is_past
    const compareDate = event.start_time || event.event_date
    if (!compareDate) return true
    return new Date(compareDate) <= now
  }

  const getStatusBadge = (event: EventType) => {
    return isUpcoming(event)
      ? { label: "Upcoming", className: "bg-green-100 text-green-800" }
      : { label: "Past Event", className: "bg-gray-200 text-gray-700" }
  }

  const formatDate = (event: EventType) => {
    const rawDate = event.start_time || event.event_date || event.date_created
    if (!rawDate) return "Date coming soon"
    return new Date(rawDate).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const upcomingEvents = events.filter(isUpcoming)
  const pastEvents = events.filter(isPast)
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
              {upcomingEvents.map((event) => {
                const status = getStatusBadge(event)
                return (
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
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      {event.event_category && (
                        <span className="rounded-full bg-tedx-red/10 text-tedx-red px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                          {event.event_category}
                        </span>
                      )}
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-black">{event.title}</h3>
                    {event.location && (
                      <p className="text-tedx-red font-semibold mb-2">
                        Location: {event.location}
                      </p>
                    )}
                    <p className="text-gray-600 mb-2">
                      {formatDate(event)}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {event.description || "Join us for an inspiring event."}
                    </p>
                    <Link href={buildEventUrl(event)}>
                      <Button className="bg-tedx-red text-white">View Details</Button>
                    </Link>
                  </div>
                  </div>
                )
              })}
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
              {pastEvents.map((event) => {
                const status = getStatusBadge(event)
                return (
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
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      {event.event_category && (
                        <span className="rounded-full bg-tedx-red/10 text-tedx-red px-3 py-1 text-[10px] font-semibold uppercase tracking-wide">
                          {event.event_category}
                        </span>
                      )}
                      <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <h4 className="font-semibold text-black">{event.title}</h4>
                    {event.location && (
                      <p className="text-sm text-gray-600">Location: {event.location}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      {formatDate(event)}
                    </p>
                    <Link
                      href={buildEventUrl(event)}
                      className="mt-4 inline-flex text-sm font-semibold text-tedx-red hover:text-tedx-red/80 transition-colors"
                    >
                      View Event Details →
                    </Link>
                  </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  )
}
