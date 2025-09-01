"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Play, Calendar, Users, MapPin } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-tedx-black">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            {/* This is just a template for you to place every section in a div, make this align properly. */}
            <div className="relative w-full flex justify-center max-h-600 font-inter">
              <img
                src="/images/speaker-1.png"
                alt="Speaker"
                className="w-full mx-auto object-cover rounded-lg shadow-lg"
                style={{ maxHeight: 600, maxWidth: "100%" }}
              />
              <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-start w-10/12 px-6">
                <span className="text-3xl md:text-4xl font-bold mb-2">
                  TEDxMaitama: The Catalyst
                </span>
                <span className="flex items-center text-lg mb-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  October 5, 2025 | Transcorp Hilton, Abuja
                </span>
                <Button size="lg" className="mt-2">
                  Get Tickets
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
}
