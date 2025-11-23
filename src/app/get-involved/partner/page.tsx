"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { Handshake, Mail, Phone, Target, TrendingUp, Globe } from "lucide-react";
import Image from "next/image";

const contacts = [
  {
    name: "Paschal",
    phone: "+234 816 275 1386",
    role: "Lead, Partnerships"
  },
  {
    name: "Chukwunenye",
    phone: "+234 708 703 6843",
    role: "Partnerships Manager"
  }
];

const partnershipBenefits = [
  {
    icon: Target,
    title: "Brand Visibility",
    description: "Reach thousands of engaged attendees and digital participants"
  },
  {
    icon: TrendingUp,
    title: "Community Impact",
    description: "Support innovative ideas and contribute to positive change"
  },
  {
    icon: Globe,
    title: "Network Expansion",
    description: "Connect with thought leaders, innovators, and change-makers"
  }
];

export default function PartnerPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/get-involved/partner.jpg"
            alt="Partner with TEDxMaitama"
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
              Partner with <span className="text-tedx-red">TEDxMaitama</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Your partnership will help us bring together innovative minds and ideas, 
              amplifying our mission to make significant impact and create a brighter future for all.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Why Partner Section */}
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
              Why <span className="text-tedx-red">Partner With Us?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Join us in creating meaningful impact. Our partnerships are built on 
              shared values and a commitment to spreading ideas worth spreading.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partnershipBenefits.map((benefit, index) => {
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

      {/* Contact Section */}
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
                Get in <span className="text-tedx-red">Touch</span>
              </h2>
              <p className="text-lg text-gray-600">
                Ready to partner with us? Reach out to our partnerships team.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-white p-8 border-2 border-gray-100 hover:border-tedx-red transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="rounded-full bg-tedx-red p-4 text-white transition-transform duration-300 group-hover:scale-110">
                        <Phone className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{contact.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{contact.role}</p>
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, "")}`}
                        className="text-tedx-red font-medium hover:text-red-700 transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-full">
                <Mail className="text-tedx-red w-5 h-5" />
                <a
                  href="mailto:partnerships@tedxmaitama.com"
                  className="text-tedx-red font-medium hover:text-red-700 transition-colors"
                >
                  partnerships@tedxmaitama.com
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

