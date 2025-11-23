"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useMemo, useRef } from "react"
import { getAllSpeakers } from "@/lib/api/speakers"
import { getAllEvents } from "@/lib/api/events"
import { Speaker } from "@/types/speaker"
import { EventResponse } from "@/lib/api/events"
import { ChevronDown } from "lucide-react"

export default function Speakers() {
  const [sortBy, setSortBy] = useState("recent")
  const [selectedEvent, setSelectedEvent] = useState<number | "all">("all")
  const [selectedYear, setSelectedYear] = useState<number | "all">("all")
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [events, setEvents] = useState<EventResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false)
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)
  const eventDropdownRef = useRef<HTMLDivElement>(null)
  const yearDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target as Node)) {
        setEventDropdownOpen(false)
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setYearDropdownOpen(false)
      }
    }

    if (eventDropdownOpen || yearDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [eventDropdownOpen, yearDropdownOpen])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [speakersData, eventsData] = await Promise.all([
          getAllSpeakers(),
          getAllEvents()
        ])
        
        // Transform backend data to frontend format
        const transformedSpeakers: Speaker[] = speakersData.map((speaker) => {
          const event = eventsData.find(e => e.id === speaker.event_id)
          const eventDate = event?.event_date 
            ? new Date(event.event_date) 
            : event?.start_time 
            ? new Date(event.start_time) 
            : null
          const eventYear = eventDate ? eventDate.getFullYear() : null
          
          return {
            ...speaker,
            image: speaker.photo || "/images/speakers/speaker-1.png",
            role: speaker.portfolio || "",
            biography: speaker.profile || "",
            event_title: event?.title,
            event_year: eventYear || null,
          }
        })
        
        setSpeakers(transformedSpeakers)
        setEvents(eventsData)
        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load speakers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Get unique years from events
  const availableYears = useMemo(() => {
    const years = new Set<number>()
    events.forEach(event => {
      const eventDate = event.event_date 
        ? new Date(event.event_date) 
        : event.start_time 
        ? new Date(event.start_time) 
        : null
      if (eventDate && !isNaN(eventDate.getTime())) {
        const year = eventDate.getFullYear()
        years.add(year)
      }
    })
    return Array.from(years).sort((a, b) => b - a) // Sort descending
  }, [events])

  // Filter and sort speakers
  const filteredSpeakers = useMemo(() => {
    let filtered = [...speakers]

    // Filter by event
    if (selectedEvent !== "all") {
      filtered = filtered.filter(s => s.event_id === selectedEvent)
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter(s => s.event_year === selectedYear)
    }

    // Sort speakers
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => {
          const dateA = a.date_created ? new Date(a.date_created).getTime() : 0
          const dateB = b.date_created ? new Date(b.date_created).getTime() : 0
          return dateB - dateA // Most recent first
        })
        break
      case "alphabetical":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "year":
        filtered.sort((a, b) => {
          const yearA = a.event_year || 0
          const yearB = b.event_year || 0
          return yearB - yearA // Most recent year first
        })
        break
      default:
        break
    }

    return filtered
  }, [speakers, selectedEvent, selectedYear, sortBy])
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/speakers/speakers-cover.jpg"
            alt="TEDx Maitama Stage"
            fill
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
            Meet the Minds Who Have Graced Our Stage
          </motion.h1>
        </Container>
      </section>

   {/* Stats */}
<section className="bg-tedx-red text-white py-12 w-full">
  <Container>
    <div className="grid md:grid-cols-3 text-center">
      <div>
        <h3 className="text-4xl font-bold">30+</h3>
        <p className="text-lg opacity-90">Speakers</p>
      </div>
      <div>
        <h3 className="text-4xl font-bold">5,087,027+</h3>
        <p className="text-lg opacity-90">Views of our talks</p>
      </div>
      <div>
        <h3 className="text-4xl font-bold">15+</h3>
        <p className="text-lg opacity-90">Live Events</p>
      </div>
    </div>
  </Container>
</section>

      {/* Speakers Grid */}
      <section className="py-16 bg-white">
        <Container>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Event Filter */}
            <div className="relative" ref={eventDropdownRef}>
              <button
                onClick={() => {
                  setEventDropdownOpen(!eventDropdownOpen)
                  setYearDropdownOpen(false)
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50 min-w-[180px] justify-between"
              >
                <span className="text-sm font-medium">
                  {selectedEvent === "all" 
                    ? "All Events" 
                    : events.find(e => e.id === selectedEvent)?.title || "Select Event"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    eventDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {eventDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setSelectedEvent("all")
                      setEventDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      selectedEvent === "all"
                        ? "bg-tedx-red text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    All Events
                  </button>
                  {events.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => {
                        setSelectedEvent(event.id)
                        setEventDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedEvent === event.id
                          ? "bg-tedx-red text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {event.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Year Filter */}
            <div className="relative" ref={yearDropdownRef}>
              <button
                onClick={() => {
                  setYearDropdownOpen(!yearDropdownOpen)
                  setEventDropdownOpen(false)
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50 min-w-[140px] justify-between"
              >
                <span className="text-sm font-medium">
                  {selectedYear === "all" ? "All Years" : selectedYear.toString()}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    yearDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {yearDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10 overflow-hidden max-h-[200px] overflow-y-auto"
                >
                  <button
                    onClick={() => {
                      setSelectedYear("all")
                      setYearDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      selectedYear === "all"
                        ? "bg-tedx-red text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    All Years
                  </button>
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year)
                        setYearDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedYear === year
                          ? "bg-tedx-red text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setSortBy("recent")}
                className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                  sortBy === "recent"
                    ? "bg-tedx-red text-white border-tedx-red"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                }`}
              >
                Most Recent
              </button>
              <button
                onClick={() => setSortBy("alphabetical")}
                className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                  sortBy === "alphabetical"
                    ? "bg-tedx-red text-white border-tedx-red"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                }`}
              >
                A-Z
              </button>
              <button
                onClick={() => setSortBy("year")}
                className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                  sortBy === "year"
                    ? "bg-tedx-red text-white border-tedx-red"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                }`}
              >
                By Year
              </button>
            </div>
          </div>


          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading speakers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : speakers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No speakers found.</p>
            </div>
          ) : filteredSpeakers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No speakers found matching your filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {filteredSpeakers.map((sp) => (
                <Link key={sp.id} href={`/speakers/${sp.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="relative w-40 h-40 mx-auto mb-4">
                      <Image
                        src={sp.image || "/images/speakers/speaker-1.png"}
                        alt={sp.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-black">{sp.name}</h4>
                    <p className="text-sm text-gray-500">{sp.role || sp.portfolio}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  )
}
