"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import Image from "next/image"

interface Volunteer {
  id: number
  name: string
  photo: string
  department: string
  role: string
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call when backend is ready
    // For now, using empty array
    setLoading(false)
  }, [])

  const getImageUrl = (photo: string) => {
    if (!photo) return "/images/default-avatar.png"
    if (photo.startsWith("http")) return photo
    // Extract base URL from API config (remove /api suffix if present)
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
    const baseUrl = apiBase.replace(/\/api$/, "")
    return `${baseUrl}/static/uploads/volunteers/${photo}`
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner.jpg"
            alt="TEDxMaitama Volunteers"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-tedx-red">Volunteers</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              The dedicated volunteers who make TEDxMaitama possible
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Volunteers Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading volunteers...</p>
            </div>
          ) : volunteers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                No volunteers listed yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {volunteers.map((volunteer) => (
                <motion.div
                  key={volunteer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                    <Image
                      src={getImageUrl(volunteer.photo)}
                      alt={volunteer.name}
                      width={128}
                      height={128}
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/default-avatar.png"
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    {volunteer.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {volunteer.department}
                  </p>
                  <p className="text-sm text-tedx-red font-medium">
                    {volunteer.role}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  )
}

