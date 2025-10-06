"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Calendar } from "lucide-react";
import GetInvolvedSection from "@/components/ui/sections/GetInvolved.section";
import OurValuedPartnerSection from "@/components/ui/sections/OurValuedPartner.section";
import speakers from "@/data/speakers";
import SpeakerSpotlightCard from "@/components/ui/cards/SpeakerSpotlight";
import events from "@/data/events";
import EventPreviewCard from "@/components/ui/cards/EventPreview";

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
                TEDxMaitama: The Catalyst
              </h1>

              <div className="flex items-center text-lg mb-6">
                <Calendar className="w-5 h-5 mr-2" />
                October 5, 2025 | Transcorp Hilton, Abuja
              </div>

              <Button size="lg">Get Tickets</Button>
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

          <div className="flex gap-8 py-4 md:py-8">
            {events.map((event, index) => (
              <EventPreviewCard key={index} event={event} />
            ))}
          </div>
        </Container>
      </section>

      {/* Speakers */}
      <section className="bg-tedx-black py-8 md:py-12">
        <Container>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            <span className="text-tedx-red">Speakers</span> Spotlight
          </h2>

          <div className="flex gap-8 py-4 md:py-8">
            {speakers.map((speaker, index) => (
              <SpeakerSpotlightCard key={index} speaker={speaker} />
            ))}
          </div>
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
