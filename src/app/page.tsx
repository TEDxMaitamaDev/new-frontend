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
      <section className="relative  bg-tedx-black">
        {/* Background Image */}

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero section */}
        <Container className="relative w-full h-[89vh] z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex h-full justify-center"
          >
            <div className="absolute h-full w-full md:w-[90%]  right-0 bg-[url('/images/speaker-1.png')] bg-gray-900/30 bg-blend-overlay bg-cover h-full bg-top" />
            <div className="relative w-full flex h-full  flex-col md:justify-end md:items-start justify-center items-center max-w-4xl text-white p-4 md:px-0 pt-12 md:pt-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 font-inter">
                Ideas Worth Spreading
              </h1>

              <div className="flex items-center text-lg mb-6">
                Join us for inspiring conversations, innovative thinking, 
                <br />
                and transformative ideas.
              </div>

              <Button onClick={() => router.push("/about")} size="lg">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </Container>

        {/*  */}

        <Container className="relative flex text-center p-4 py-7 justify-center items-center">
          <h2
            className="text-white md:text-3xl text-2xl
          font-bold"
          >
            Revolutionary Ideas, Born in Abuja.
          </h2>
        </Container>
      </section>

      {/*  */}
      <section className="bg-[#EB0028] hidden md:flex">
        <Container className="p-8 py-12">
          <p>
            Our mission is to curate and amplify local ideas worth spreading by
            uniting visionary thinkers, doers, and dreamers across Nigeria and
            beyond. TEDxMaitama aims to challenge norms, inspire action, and
            catalyze change by building a platform that celebrates innovation,
            fosters connections, and empowers a new generation of leaders to
            reimagine what&apos;s possible—starting with our community and
            extending to the world.
          </p>

          <div className="py-8 mt-12 grid grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h2 className="text-4xl font-bold">{stat.number}+</h2>
                <p className="font-light">{stat.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Past Events */}
      <section className="py-8 min-h-[40vh]">
        <Container>
          <h2 className="text-2xl md:text-4xl font-bold text-black">
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
            <div className="flex gap-8 py-4 md:py-8">
              {events.map((event) => (
                <EventPreviewCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Speakers */}
      <section className="bg-tedx-black py-8 md:py-12">
        <Container>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4 md:py-8">
              {speakers.map((speaker) => (
                <SpeakerSpotlightCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="bg-tedx-black py-8 min-h-[40vh]">
        <Container>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            <span className="text-tedx-red">Upcoming</span> Events
          </h2>
        </Container>
      </section>

      {/*  */}

      <section className="bg-tedx-black py-12 min-h-[40vh]">
        <Container>
          <h2 className="text-3xl border-y-4 border-tedx-red py-4 md:py-8 mx-auto md:max-w-4xl md:text-5xl text-center italic font-bold text-white">
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
