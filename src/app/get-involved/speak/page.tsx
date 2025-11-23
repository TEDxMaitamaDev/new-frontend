"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mic, Lightbulb, Users, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const requirements = [
  {
    icon: Lightbulb,
    title: "Original Ideas",
    description: "Share unique, innovative perspectives that challenge conventional thinking"
  },
  {
    icon: Users,
    title: "Engaging Presence",
    description: "Ability to connect with and inspire diverse audiences"
  },
  {
    icon: Clock,
    title: "Time Commitment",
    description: "Dedication to preparation and rehearsals for an impactful talk"
  }
];

export default function SpeakPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/get-involved/speak.jpg"
            alt="Speak at TEDxMaitama"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Speak at <span className="text-tedx-red">TEDxMaitama</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Share your ideas worth spreading. Join our platform to inspire, 
              educate, and transform lives through the power of ideas.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Why Speak Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Speak at <span className="text-tedx-red">TEDxMaitama?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                TEDxMaitama provides a unique platform to share transformative ideas with a global audience. 
                Our speakers come from diverse backgrounds, united by their passion to inspire change and innovation.
              </p>
              <div className="flex items-center gap-4 text-tedx-red">
                <Mic className="w-10 h-10" />
                <p className="text-lg font-medium">Join our community of thought leaders</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {requirements.map((req, index) => {
                const Icon = req.icon;
                return (
                  <motion.div
                    key={req.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-tedx-red rounded-full flex items-center justify-center">
                        <Icon className="text-white w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{req.title}</h4>
                      <p className="text-gray-600">{req.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Apply Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-tedx-red">Share Your Idea?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Take the first step towards inspiring thousands. Apply now to become a speaker 
                at our next TEDxMaitama event.
              </p>
              <Link
                href="https://forms.gle/CeMhggDxi5EvBQsG7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-tedx-red hover:bg-red-700">
                  Apply to Speak
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

