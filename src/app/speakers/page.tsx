"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui"
import { useState } from "react"
import speakers from "@/data/speakers"

export default function Speakers() {
  const [activeFilter, setActiveFilter] = useState("recent")

const handleFilter = (filter: string) => {
  setActiveFilter(filter)
  // Implement filtering logic based on the selected filter
}
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/speakers/speaker-1-full.png"
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
<div className="flex justify-start mb-8">
  <div className="flex gap-6">
    <button
      onClick={() => handleFilter("topic")}
      className={`px-4 py-2 rounded-md border ${activeFilter === "topic" ? "bg-tedx-red text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
    >
      Topic
    </button>
    <button
      onClick={() => handleFilter("year")}
      className={`px-4 py-2 rounded-md border ${activeFilter === "year" ? "bg-tedx-red text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
    >
      Year
    </button>
    <button
      onClick={() => handleFilter("recent")}
      className={`px-4 py-2 rounded-md border ${activeFilter === "recent" ? "bg-tedx-red text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
    >
      Most Recent
    </button>
  </div>
</div>


          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {speakers.map((sp, i) => (
              <Link key={i} href={`/speakers/${i}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <Image
                      src={sp.image}
                      alt={sp.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-black">{sp.name}</h4>
                  <p className="text-sm text-gray-500">{sp.role}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* What is TEDx */}
      <section className="py-16 bg-black text-white">
        <Container>
          <h3 className="text-xl font-bold mb-4">
            What is <span className="text-tedx-red">TEDx?</span>
          </h3>
          <p className="text-lg opacity-90 max-w-3xl">
            In the spirit of ideas worth spreading, TED created the TEDx program—local,
            self-organized events that bring people together to share a TED-like
            experience. TEDx Maitama brings visionaries, creators, and changemakers
            together to inspire and drive impact.
          </p>
        </Container>
      </section>
    </Layout>
  )
}
