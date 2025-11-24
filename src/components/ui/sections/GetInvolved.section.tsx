"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../Container";
import { motion } from "framer-motion";
import { ArrowRight, Users, Handshake, Mic } from "lucide-react";

const involvementOptions = [
  {
    title: "Volunteer with us",
    description: "Join our passionate team and help bring inspiring ideas to life.",
    href: "/get-involved/volunteer",
    icon: Users,
    delay: 0.1,
  },
  {
    title: "Partner with us",
    description: "Collaborate with us to create meaningful impact in our community.",
    href: "/get-involved/partner",
    icon: Handshake,
    delay: 0.2,
  },
  {
    title: "Speak at our event",
    description: "Share your ideas worth spreading on our stage.",
    href: "/get-involved/speak",
    icon: Mic,
    delay: 0.3,
  },
];

export default function GetInvolvedSection() {
  return (
    <section className="bg-tedx-red py-8 sm:py-12 min-h-[40vh]">
      <Container className="px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-12">
          <span className="text-tedx-black">Get</span> Involved
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {involvementOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: option.delay }}
              >
                <Link
                  href={option.href}
                  className="group block h-full bg-white rounded-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-tedx-red rounded-full flex items-center justify-center mb-4 group-hover:bg-tedx-black transition-colors duration-300">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-tedx-black mb-2 group-hover:text-tedx-red transition-colors duration-300">
                        {option.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {option.description}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center text-tedx-red font-semibold group-hover:text-tedx-black transition-colors duration-300">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
