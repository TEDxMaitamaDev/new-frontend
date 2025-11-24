"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui";

import { getEventById, EventResponse } from "@/lib/api/events";
import { getAllSpeakers } from "@/lib/api/speakers";
import type { Speaker } from "@/types/speaker";
import { createSlug } from "@/utils/slug";

export default function EventDetailPage() {
  const params = useParams<{ slug?: string[] }>();
  const router = useRouter();
  const slugParts = (params?.slug ?? []) as string[];
  const eventId = slugParts.length > 0 ? Number(slugParts[0]) : NaN;
  const currentSlugSegment = slugParts[1];
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventSpeakers, setEventSpeakers] = useState<Speaker[]>([]);
  const [speakersLoading, setSpeakersLoading] = useState(false);
  const [speakersError, setSpeakersError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) {
      setError("Invalid event id");
      setLoading(false);
      return;
    }

    async function fetchEvent() {
      try {
        setLoading(true);
        const data = await getEventById(eventId);
        setEvent(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Unable to load this event. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (!eventId) return;

    async function fetchSpeakers() {
      try {
        setSpeakersLoading(true);
        const data = await getAllSpeakers();
        const filtered = data.filter((speaker) => speaker.event_id === eventId);
        setEventSpeakers(filtered);
        setSpeakersError(null);
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setSpeakersError("Unable to load speakers for this event.");
      } finally {
        setSpeakersLoading(false);
      }
    }

    fetchSpeakers();
  }, [eventId]);

  useEffect(() => {
    if (!event || !eventId) return;
    const expectedSlug = createSlug(event.title || `event-${eventId}`);
    if (expectedSlug && currentSlugSegment !== expectedSlug) {
      router.replace(`/events/${eventId}/${expectedSlug}`, { scroll: false });
    }
  }, [event, eventId, router, currentSlugSegment]);

  const computeStatus = () => {
    if (!event) return { label: "Loading", className: "bg-gray-100 text-gray-600" };
    if (typeof event.is_upcoming === "boolean" && event.is_upcoming) {
      return { label: "Upcoming", className: "bg-green-100 text-green-800" };
    }
    if (typeof event.is_past === "boolean" && event.is_past) {
      return { label: "Past Event", className: "bg-gray-200 text-gray-700" };
    }
    const compareDate = event.start_time || event.event_date || event.date_created;
    if (!compareDate) {
      return { label: "Event", className: "bg-gray-100 text-gray-600" };
    }
    const isFuture = new Date(compareDate) > new Date();
    return isFuture
      ? { label: "Upcoming", className: "bg-green-100 text-green-800" }
      : { label: "Past Event", className: "bg-gray-200 text-gray-700" };
  };

  const formatDate = (value?: string | null) => {
    if (!value) return "Date coming soon";
    return new Date(value).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusBadge = computeStatus();
  const eventDate = event?.start_time || event?.event_date || event?.date_created;
  const isUpcoming = statusBadge.label === "Upcoming";

  return (
    <Layout>
      {loading ? (
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-tedx-red" />
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      ) : error || !event ? (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Event Not Available</h1>
          <p className="text-gray-600 mb-6 max-w-xl">{error || "This event could not be found."}</p>
          <Link href="/events" className="text-tedx-red font-semibold hover:text-tedx-red/80">
            ← Back to all events
          </Link>
        </div>
      ) : (
        <>
          {/* Hero */}
          <section className="relative h-[70vh] flex items-center justify-center">
            <div className="absolute inset-0">
              <Image
                src={event.image || "/images/events/event-1.png"}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <Container className="relative z-10 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {event.event_category && (
                    <span className="rounded-full bg-tedx-red/10 text-tedx-red px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                      {event.event_category}
                    </span>
                  )}
                  <span className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${statusBadge.className}`}>
                    {statusBadge.label}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{event.title}</h1>
                <p className="text-lg text-gray-200 max-w-2xl">{event.description}</p>
              </motion.div>
            </Container>
          </section>

          {/* Details */}
          <section className="py-16">
            <Container>
              <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
                <div>
                  <h2 className="text-2xl font-bold text-black mb-4">Event Overview</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {event.description || "Join us for an inspiring experience with thought leaders and changemakers."}
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
                      <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Date & Time</p>
                      <p className="font-semibold text-black">{formatDate(eventDate)}</p>
                      {event.start_time && (
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(event.start_time).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                    <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
                      <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Venue</p>
                      <p className="font-semibold text-black">
                        {event.location || "Venue will be announced soon"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
                      <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Category</p>
                      <p className="font-semibold text-black">
                        {event.event_category || "General"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
                      <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Status</p>
                      <p className="font-semibold text-black">{statusBadge.label}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-900 text-white p-8 self-start">
                  <h3 className="text-xl font-semibold mb-3">Attend this event</h3>
                  <p className="text-gray-300 mb-6">
                    {isUpcoming
                      ? "Secure your seat and be part of an unforgettable experience."
                      : "This event has ended. Stay tuned for more TEDxMaitama experiences."}
                  </p>
                  {isUpcoming ? (
                    <Link href={`/tickets/${event.id}`}>
                      <Button className="w-full bg-tedx-red text-white hover:bg-tedx-red/90">
                        Get Tickets
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href="/events"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      Browse Other Events
                    </Link>
                  )}
                </div>
              </div>
            </Container>
          </section>

          {/* Speakers */}
          <section className="py-16 bg-gray-50">
            <Container>
              <div className="flex flex-col gap-4 mb-10 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-tedx-red">Event Speakers</p>
                <h2 className="text-3xl font-bold text-black">Meet the voices behind {event.event_category || "this event"}</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Discover the thought leaders, innovators, and changemakers sharing ideas worth spreading at this edition of TEDxMaitama.
                </p>
              </div>

              {speakersLoading ? (
                <div className="flex justify-center py-12">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-tedx-red" />
                    <p className="text-gray-500">Loading speakers...</p>
                  </div>
                </div>
              ) : speakersError ? (
                <div className="text-center py-12 text-red-600">
                  {speakersError}
                </div>
              ) : eventSpeakers.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  Speakers for this event will be announced soon. Check back later.
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {eventSpeakers.map((speaker) => (
                    <Link
                      key={speaker.id}
                      href={`/speakers/${speaker.id}/${createSlug(speaker.name || `speaker-${speaker.id}`)}`}
                      className="group rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="relative h-60 w-full overflow-hidden">
                        <Image
                          src={speaker.photo || "/images/speakers/pic-person-01.jpg"}
                          alt={speaker.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-tedx-red mb-2">
                          Speaker
                        </p>
                        <h3 className="text-xl font-semibold text-black">{speaker.name}</h3>
                        {speaker.portfolio && (
                          <p className="text-sm text-gray-600 mt-1">{speaker.portfolio}</p>
                        )}
                        {speaker.anchored_topic && (
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                            {speaker.anchored_topic}
                          </p>
                        )}
                        <div className="mt-4 inline-flex items-center text-sm font-semibold text-tedx-red group-hover:text-tedx-red/80">
                          View Speaker →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Container>
          </section>
        </>
      )}
    </Layout>
  );
}

