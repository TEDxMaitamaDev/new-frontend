"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Users, Heart, Award, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const benefits = [
  {
    icon: Users,
    title: "Join a Community",
    description: "Connect with like-minded individuals passionate about spreading ideas"
  },
  {
    icon: Heart,
    title: "Make an Impact",
    description: "Contribute to bringing transformative ideas to life in your community"
  },
  {
    icon: Award,
    title: "Gain Experience",
    description: "Develop skills in event management, communication, and leadership"
  }
];

export default function VolunteerPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/get-involved/volunteer.jpg"
            alt="Volunteer with TEDxMaitama"
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
              Volunteer with <span className="text-tedx-red">Us</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Join our passionate team and help bring inspiring ideas to life. 
              Be part of something bigger than yourself.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why <span className="text-tedx-red">Volunteer?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              TEDxMaitama volunteers are the backbone of our events. Your dedication 
              helps us create unforgettable experiences that inspire and transform lives.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-tedx-red rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How to Join Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How to <span className="text-tedx-red">Get Started</span>
              </h2>
              <p className="text-lg text-gray-600">
                Ready to make a difference? Join our volunteer community today!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="mb-6">
                <MessageCircle className="w-16 h-16 text-tedx-red mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Connect with us on WhatsApp to stay updated with volunteer opportunities, 
                  event updates, and be part of our growing community of changemakers.
                </p>
              </div>

              <Link
                href="https://chat.whatsapp.com/IoyVZkW85Z21eSwRmYqK69"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-green-500 hover:bg-green-600">
                  Join WhatsApp Community
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

