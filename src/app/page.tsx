"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import GetInvolvedSection from "@/components/ui/sections/GetInvolved.section";
import OurValuedPartnerSection from "@/components/ui/sections/OurValuedPartner.section";
import SpeakerSpotlightCard from "@/components/ui/cards/SpeakerSpotlight";
import EventPreviewCard from "@/components/ui/cards/EventPreview";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Speaker } from "@/types/speaker";
import { EventType } from "@/types/event";
import { getAllSpeakers } from "@/lib/api/speakers";
import { getAllEvents } from "@/lib/api/events";

const stats = [
  {
    number: 10000,
    description: "Attendees and digital participants.",
  },
  {
    number: 50,
    description: "Speakers",
  },
  {
    number: 15,
    description: "Countries watch our talks",
  },
];


export default function Home() {
  const router = useRouter();
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [speakersData, eventsData] = await Promise.all([
          getAllSpeakers(),
          getAllEvents()
        ])
        
        // Transform speakers data
        const transformedSpeakers: Speaker[] = speakersData.slice(0, 8).map((speaker) => ({
          ...speaker,
          image: speaker.photo || "/images/speakers/speaker-1.png",
          role: speaker.portfolio || "",
          biography: speaker.profile || "",
        }))
        
        // Transform events data
        const transformedEvents: EventType[] = eventsData.slice(0, 3).map((event) => ({
          ...event,
          date: event.start_time || event.date_created || "",
          image: event.image || "/images/events/event-1.png",
        }))
        
        setSpeakers(transformedSpeakers)
        setEvents(transformedEvents)
      } catch (err) {
        console.error("Error fetching data:", err)
        // Set empty arrays on error to prevent crashes
        setSpeakers([])
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-tedx-black">
        {/* Background Image */}

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero section */}
        <Container className="relative w-full h-[70vh] sm:h-[80vh] md:h-[89vh] z-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex h-full justify-center"
          >
            <div className="absolute h-full w-full md:w-[90%] right-0 bg-[url('/images/speaker-1.png')] bg-gray-900/30 bg-blend-overlay bg-cover bg-top" />
            <div className="relative w-full flex h-full flex-col md:justify-end md:items-start justify-center items-center max-w-4xl text-white p-4 sm:p-6 md:px-0 pt-12 md:pt-0">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 font-inter text-center md:text-left text-white">
                Ideas Worth Spreading
              </h1>

              <div className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-center md:text-left text-white">
                <p className="mb-1 text-white">Join us for inspiring conversations, innovative thinking,</p>
                <p className="text-white">and transformative ideas.</p>
              </div>

              <Button onClick={() => router.push("/about")} size="lg" 
              className="w-full sm:w-auto" variant="primary">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </Container>

        {/* Tagline */}
        <Container className="relative flex text-center px-4 sm:px-6 py-6 sm:py-7 justify-center items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Revolutionary Ideas, Born in Abuja.
          </h2>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="bg-[#EB0028] text-white">
        <Container className="px-4 sm:px-6 py-8 sm:py-12">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white">
            Our mission is to curate and amplify local ideas worth spreading by
            uniting visionary thinkers, doers, and dreamers across Nigeria and
            beyond. TEDxMaitama aims to challenge norms, inspire action, and
            catalyze change by building a platform that celebrates innovation,
            fosters connections, and empowers a new generation of leaders to
            reimagine what&apos;s possible—starting with our community and
            extending to the world.
          </p>

          <div className="py-6 sm:py-8 mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-2 sm:gap-4 text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">{stat.number}+</h2>
                <p className="text-sm sm:text-base font-light text-white">{stat.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Past Events */}
      <section className="py-8 sm:py-12 min-h-[40vh]">
        <Container className="px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8">
            <span className="text-tedx-red">Talks &</span> Past Events
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No events available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-4 sm:py-8">
              {events.map((event) => (
                <EventPreviewCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Speakers */}
      <section className="bg-tedx-black py-8 sm:py-12">
        <Container className="px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
            <span className="text-tedx-red">Speakers</span> Spotlight
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-white">Loading speakers...</p>
            </div>
          ) : speakers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white">No speakers available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-4 sm:py-8">
              {speakers.map((speaker) => (
                <SpeakerSpotlightCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="bg-tedx-black py-8 sm:py-12 min-h-[40vh]">
        <Container className="px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            <span className="text-tedx-red">Upcoming</span> Events
          </h2>
        </Container>
      </section>

      {/* Tagline Section */}
      <section className="bg-tedx-black py-8 sm:py-12 min-h-[40vh]">
        <Container className="px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl border-y-2 sm:border-y-4 border-tedx-red py-4 sm:py-6 md:py-8 mx-auto max-w-4xl text-center italic font-bold text-white">
            Shaping, supporting, and sharing revolutionary ideas of African
            descent.
          </h2>
        </Container>
      </section>

      <GetInvolvedSection />

      <OurValuedPartnerSection />
    </Layout>
  );
}
