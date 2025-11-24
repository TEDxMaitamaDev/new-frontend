"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSpeakerById } from "@/lib/api/speakers";
import { Speaker } from "@/types/speaker";
import { createSlug } from "@/utils/slug";

export default function SpeakerProfile() {
  const params = useParams<{ slug?: string[] }>();
  const router = useRouter();
  const slugParts = (params?.slug ?? []) as string[];
  const speakerId = slugParts.length > 0 ? Number(slugParts[0]) : NaN;
  const currentSlugSegment = slugParts[1];
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpeaker() {
      if (!speakerId) {
        setError("Invalid speaker id");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getSpeakerById(speakerId);
        const transformedSpeaker: Speaker = {
          ...data,
          image: data.photo || "/images/speakers/speaker-1.png",
          role: data.portfolio || "",
          biography: data.profile || "",
        };
        setSpeaker(transformedSpeaker);
        setError(null);
      } catch (err) {
        console.error("Error fetching speaker:", err);
        setError("Failed to load speaker. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchSpeaker();
  }, [speakerId]);

  useEffect(() => {
    if (!speaker || !speakerId) return;
    const expectedSlug = createSlug(speaker.name || `speaker-${speakerId}`);
    if (expectedSlug && currentSlugSegment !== expectedSlug) {
      router.replace(`/speakers/${speakerId}/${expectedSlug}`, { scroll: false });
    }
  }, [speaker, speakerId, currentSlugSegment, router]);

  if (loading) {
    return (
      <Layout>
        <Container className="py-16">
          <div className="text-center">
            <p className="text-gray-600">Loading speaker...</p>
          </div>
        </Container>
      </Layout>
    );
  }

  if (error || !speaker) {
    return (
      <Layout>
        <Container className="py-16">
          <div className="text-center">
            <p className="text-red-600">{error || "Speaker not found"}</p>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="bg-white py-16 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${speaker.image}')` }}
      >
        <Container>
          <div className="flex">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-1/6"
            >
              {/* Speaker Portrait Card */}
              <div className="flex flex-col items-start">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-xl mb-4">
                  <Image
                    src={speaker.image || "/images/speakers/speaker-1.png"}
                    alt={speaker.name}
                    width={400}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="text-xl font-bold text-tedx-red leading-tight">
                  {speaker.name}
                </h1>
                <p className="text-gray-700 text-sm mt-1">{speaker.role || speaker.portfolio}</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Biography Section */}
      <section className="bg-tedx-red text-white py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-4">Biography</h2>
          <p className="text-lg leading-relaxed max-w-3xl opacity-95">
            {speaker.biography || speaker.profile || "No biography available."}
          </p>
        </Container>
      </section>

      {/* Insights Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h3 className="text-xl font-bold mb-6 text-black">Insights from the Stage</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <Image
                src="/images/events/event-1.png"
                alt="The Future of Sustainable Cities"
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h4 className="font-semibold mb-1 text-black">The Future of Sustainable Cities</h4>
                <p className="text-sm text-gray-600">TEDx Maitama 2022</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <Image
                src="/images/events/event-2.png"
                alt="Empowering Communities Through Environmental Education"
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h4 className="font-semibold mb-1 text-black">
                  Empowering Communities Through Environmental Education
                </h4>
                <p className="text-sm text-gray-600">TEDx Maitama 2020</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What is TEDx */}
      <section className="py-16 bg-black text-white">
        <Container>
          <h3 className="text-xl font-bold mb-4">
            What is <span className="text-tedx-red">TEDx?</span>
          </h3>
          <p className="text-lg opacity-90 max-w-3xl">
            TEDx Maitama is an independently organized TED event that celebrates ideas
            worth spreading. Through powerful storytelling and thought-provoking talks,
            we aim to drive innovation and inspire action across our communities.
          </p>
        </Container>
      </section>
    </Layout>
  );
}

