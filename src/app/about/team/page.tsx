"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import Image from "next/image"
import { getAllTeamMembers, TeamMemberResponse } from "@/lib/api/team"

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        setLoading(true)
        const data = await getAllTeamMembers()
        setTeamMembers(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching team members:", err)
        setError("Failed to load team members. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchTeamMembers()
  }, [])

  // Group team members by member_type
  const groupedMembers = teamMembers.reduce((acc, member) => {
    let type = member.member_type || "Other"
    
    // If member_type is "Convener", include them in Executive Team
    if (type === "Convener") {
      type = "Executive Team"
    }
    
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(member)
    return acc
  }, {} as Record<string, TeamMemberResponse[]>)

  // Sort Executive Team to put Convener first
  if (groupedMembers["Executive Team"]) {
    groupedMembers["Executive Team"].sort((a, b) => {
      if (a.member_type === "Convener") return -1
      if (b.member_type === "Convener") return 1
      return 0
    })
  }

  // Define display order
  const displayOrder = ["Advisory Board", "Patron", "Executive Team"]

  const getImageUrl = (photo: string) => {
    if (!photo) return "/images/default-avatar.png"
    if (photo.startsWith("http")) return photo
    // Extract base URL from API config (remove /api suffix if present)
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
    const baseUrl = apiBase.replace(/\/api$/, "")
    return `${baseUrl}/static/uploads/team/${photo}`
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner.jpg"
            alt="TEDxMaitama Team"
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
              Meet the <span className="text-tedx-red">Team</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              The passionate individuals driving TEDxMaitama forward
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Team Members Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading team members...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No team members found.</p>
            </div>
          ) : (
            <>
              {displayOrder.map((groupType) => {
                const members = groupedMembers[groupType]
                if (!members || members.length === 0) return null

                return (
                  <motion.div
                    key={groupType}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-tedx-red">
                      {groupType}
                    </h2>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                      {members.map((member) => (
                        <motion.div
                          key={member.team_id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="flex flex-col items-center text-center bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="w-64 h-64 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                            <Image
                              src={getImageUrl(member.photo)}
                              alt={`${member.first_name} ${member.last_name}`}
                              width={256}
                              height={256}
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/images/default-avatar.png"
                              }}
                            />
                          </div>
                          <h3 className="text-lg font-semibold mb-1">
                            {member.first_name} {member.last_name}
                          </h3>
                          {member.portfolio && (
                            <p className="text-sm text-gray-600 italic mb-2">
                              {member.portfolio}
                            </p>
                          )}
                          {member.member_type === "Convener" && (
                            <span className="text-xs font-semibold text-tedx-red bg-blue-50 px-3 py-1 rounded-full">
                              Convener
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </>
          )}
        </Container>
      </section>
    </Layout>
  )
}

