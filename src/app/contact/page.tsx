"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout/Layout"
import { Container } from "@/components/ui/Container"
import { Phone, Mail } from "lucide-react"
import Image from "next/image"

const contacts = [
  {
    name: "Chukwunenye",
    phone: "+234 708 703 6843",
    role: "Partnerships",
  },
  {
    name: "Paschal",
    phone: "+234 816 275 1386",
    role: "Operations Lead",
  },
  {
    name: "Josephine",
    phone: "+234 903 816 5340",
    role: "Communications",
  },
];

export default function Contact() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/contact.jpg"
            alt="Contact TEDxMaitama"
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
              Contact <span className="text-tedx-red">Us</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Have questions about sponsorships, partnerships, or general inquiries? 
              Our team is here to help you.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Cards Section */}
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
              Get in <span className="text-tedx-red">Touch</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Reach out to our team members for specific inquiries or general questions.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-2 border-gray-100 hover:border-tedx-red"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-tedx-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-tedx-red p-4 text-white transition-transform duration-300 group-hover:scale-110">
                      <Phone className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {contact.name}
                    </h3>
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

          {/* Email Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <Mail className="text-tedx-red w-5 h-5" />
              <a
                href="mailto:contact@tedxmaitama.com"
                className="text-tedx-red font-medium hover:text-red-700 transition-colors"
              >
                contact@tedxmaitama.com
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </Layout>
  )
}
