"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import { PartnerList } from "@/data/partners"
import Image from "next/image"
import { Award, Users } from "lucide-react"

export default function Partners() {
  // First partner is the headline sponsor
  const headlineSponsor = PartnerList[0]
  // Rest are supporting partners
  const supportingPartners = PartnerList.slice(1)

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/get-involved/partner.jpg"
            alt="TEDxMaitama Partners"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 text-center text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Our <span className="text-tedx-red">Partners</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-2">
              Together, we&rsquo;re spreading ideas worth spreading and creating meaningful impact in our community.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Headline Sponsor Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <Container className="px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-tedx-red" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Headline <span className="text-tedx-red">Sponsor</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              Our headline sponsor plays a crucial role in making our events possible
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-tedx-red/20 hover:border-tedx-red/40 transition-all duration-300">
              <div className="relative w-full h-40 sm:h-48 md:h-64 flex items-center justify-center mb-4 sm:mb-6">
                <Image
                  src={`/images/partners/${headlineSponsor.photo}`}
                  alt={headlineSponsor.name}
                  width={300}
                  height={200}
                  className="object-contain w-full h-full"
                  sizes="(max-width: 640px) 100vw, 768px"
                />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-tedx-black">
                {headlineSponsor.name}
              </h3>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Supporting Partners Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <Container className="px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-tedx-red" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Supporting <span className="text-tedx-red">Partners</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              We&rsquo;re grateful to all our partners who support our mission
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {supportingPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full h-24 sm:h-32 md:h-40 flex items-center justify-center mb-3 sm:mb-4">
                  <Image
                    src={`/images/partners/${partner.photo}`}
                    alt={partner.name}
                    width={150}
                    height={150}
                    className="object-contain w-full h-full"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <h4 className="text-center text-xs sm:text-sm md:text-base font-semibold text-gray-800 line-clamp-2">
                  {partner.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  )
}
