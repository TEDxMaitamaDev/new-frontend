"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { counterDetails } from "@/data/counter";
import { Button } from "@/components/ui";
import { guestSpeakers } from "@/data/guestSpeakers";
// import { Play, Calendar, Users, MapPin } from "lucide-react"

export default function Speakers() {
  const [imageSize, setImageSize] = useState({ width: 176, height: 176 });

  useEffect(() => {
    const updateImageSize = () => {
      setImageSize({
        width: window.innerWidth < 768 ? 160 : 176,
        height: window.innerWidth < 768 ? 160 : 176,
      });
    };
    updateImageSize();
    window.addEventListener("resize", updateImageSize);
    return () => window.removeEventListener("resize", updateImageSize);
  }, []);

  return (
    <Layout>
      <section className="relative h-[90vh] flex items-center bg-black">
        {/* Background Image */}
        <div className="absolute inset-0  w-full ">
          <Image
            src="/images/speakers-hero-img.png"
            alt="TEDxMaitama Speaker"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay */}
          {/* <div className="absolute inset-0 bg-black/60" /> */}
        </div>
        {/* <h1 className="text-4xl sm:text-5xl font-bold mb-4 z-10">
          TEDxMaitama: The Catalyst
        </h1> */}
      </section>

      {/* Counter */}
      <section className="bg-tedx-red py-[35px] lg:py-[90px]">
        <Container className="relative z-1 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-[90px] lg:flex-row justify-between gap-0 ">
              {counterDetails.map((item, i) => {
                return (
                  <div key={i} className="flex flex-col gap-[12px]">
                    <p className="text-[36px] font-semibold leading-[44px]">
                      {item.couterNumber}
                    </p>
                    <p className="text-[16px] font-normal leading-[24px]">
                      {item.counterText}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/*   Gallery section */}
      <section className="py-[27px]">
        <Container className="relative z-1 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-[28px]">
              <div className="flex gap-[12px]">
                <Button className="bg-tedx-brown py-2 px-4 rounded-[8px]">
                  Topic
                </Button>
                <Button className="bg-tedx-brown py-2 px-4 rounded-[8px]">
                  Year
                </Button>
                <Button className="bg-tedx-brown py-2 px-4 rounded-[8px]">
                  Most Recent
                </Button>
              </div>

              <div className="flex flex-wrap gap-[12px]">
                {guestSpeakers.map((item, i) => {
                  return (
                    <div key={i} className="flex flex-col gap-[6px]">
                      <Image
                        src={item.image}
                        alt="TEDxMaitama guest speaker"
                        width={imageSize.width}
                        height={imageSize.height}
                        className="rounded-[8px]"
                      />
                      <p className="tex-tedx-black w-[176px] text-[16px] leading-[24px]">
                        {item.name}
                      </p>
                      <p className="text-[#B89E9E] text-[14px] leading-[21px]">
                        {item.profession}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
}
