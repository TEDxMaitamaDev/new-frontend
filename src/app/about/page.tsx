"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui"
import Image from "next/image"
import { speakers } from "@/lib/constants"

export default function About() {
  return (
    <Layout>
    <section className="relative h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/speaker-2.jpg"   // replace with your hero image
          alt="TEDxMaitama Speaker"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <Container className="relative z-1 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            TEDxMaitama: The Catalyst
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            October 5, 2025 | Transcorp Hilton, Abuja
          </p>
          <Button
            className="inline-block bg-tedx-red"
          >
            Get Tickets
          </Button>
        </motion.div>
      </Container>
    </section>
      {/* Commitment Section */}
      <section className="bg-tedx-red text-white py-16">
        <Container>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            TEDxMaitama is committed to sharing bold ideas that inspire action, foster community, and shape a more inclusive, innovative, and vibrant Nigeria.
          </h2>
          <p className="max-w-4xl text-lg leading-relaxed opacity-90">
            To curate and amplify local ideas worth spreading by bringing together visionary thinkers, doers, and dreamers across Nigeria and beyond—to challenge norms, inspire action, and catalyze change. TEDxMaitama is committed to building a platform that celebrates innovation, fosters deep connection, and empowers a new generation of leaders to reimagine what&apos;s possible—starting within our community and rippling out to the world.
          </p>
        </Container>
      </section>

      {/* History & Core Values */}
      <section className="py-20 bg-gray-50">
        <Container className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold text-tedx-red mb-4">
              History of TEDxMaitama
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              TEDxMaitama was founded as a TED-licensed local event platform dedicated to spotlighting African voices and bold ideas. Since its inception, TEDxMaitama has curated high-impact conferences, salons, and virtual sessions, establishing itself as one of Africa's leading TEDx platforms.
            </p>

            <h3 className="text-2xl font-bold text-tedx-red mb-4">
              Community Impact
              </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Engaged 10,000+ attendees and digital participants.</li>
              <li>Hosted 50+ speakers across diverse sectors.</li>
              <li>Partnered with mission-aligned organizations and brands.</li>
              <li>Launched campaigns, salons, and webinars reaching 15+ countries.</li>
            </ul>

            <h3 className="text-2xl font-bold text-tedx-red mt-8 mb-4">TEDxMaitama’s Relationship with TEDx</h3>
            <p className="text-gray-700 leading-relaxed">
              TEDxMaitama operates under the official TEDx license, independently organized in line with TED guidelines. While TEDx events are self-organized, they carry TED’s global spirit of “Ideas Worth Spreading.”
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-black text-white rounded-lg p-10">
            <h3 className="text-2xl font-bold mb-4 text-tedx-red">
              Our Core Values...
              </h3>
            <p className="text-lg leading-relaxed font-bold">
              <span className="text-tedx-red"></span>We are guided by boldness, authenticity, inclusivity, community, innovation, and impact, principles that shape everything we do.
            </p>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black text-white">
        <Container>
          <h2 className="text-3xl font-bold mb-12 md:text-justify text-center">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {speakers.map((member, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 bg-red-500 flex items-center justify-center text-white text-2xl font-bold">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      e.currentTarget.parentElement?.classList.add("fallback")
                    }}
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-700">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                )}
              </div>

                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What is TEDx */}
      <section className="py-16 bg-black">
        <Container>
          <h3 className="text-xl font-bold mb-4">
            What is <span className="text-tedx-red font-semibold">TEDx?</span>
          </h3>
          <p className="text-white leading-relaxed max-w-full">
            In the spirit of ideas worth spreading, TED created the TEDx program—local, self-organized events that bring people together to share a TED-like experience. Our event is called <span className="text-tedx-red font-semibold">TEDxMaitama</span>, where x stands for an independently organized TED event. At TEDxMaitama, TED Talks videos and live speakers will come together to spark deep dialogue, creativity, and connection within an intimate setting. While the TED Conference provides overall guidance for the TEDx program, each TEDx event, including ours, is self-organized.
          </p>
        </Container>
      </section>
    </Layout>
  )
}
