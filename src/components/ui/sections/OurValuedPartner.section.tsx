"use client";

import React, { useState } from "react";
import { Container } from "../Container";
import { PartnerList } from "@/data/partners";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OurValuedPartnerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Number of partners to show per slide (responsive)
  const partnersPerSlide = 4;
  const totalSlides = Math.ceil(PartnerList.length / partnersPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getPartnersForSlide = (slideIndex: number) => {
    const start = slideIndex * partnersPerSlide;
    const end = start + partnersPerSlide;
    return PartnerList.slice(start, end);
  };

  return (
    <section className="bg-white py-8 min-h-[40vh]">
      <Container>
        <h2 className="text-2xl md:text-4xl font-bold text-tedx-black">
          <span className="text-tedx-red">Our Valued</span> Partners
        </h2>
        
        <div className="relative py-4 md:py-8">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {getPartnersForSlide(currentSlide).map((partner) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-center justify-center"
                  >
                    <div className="relative w-full h-24 md:h-32 flex items-center justify-center">
                      <Image
                        src={`/images/partners/${partner.photo}`}
                        alt={partner.name}
                        width={150}
                        height={150}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-tedx-red" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-tedx-red" />
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-tedx-red"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
