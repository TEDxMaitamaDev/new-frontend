import Image from "next/image";
import React from "react";
import type { EventType } from "@/types/event";

type EventPreview = { event: EventType };

export default function EventPreviewCard({ event }: EventPreview) {
  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4 text-tedx-black">
      <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden">
        <Image
          className="object-cover"
          alt="Event preview"
          src={event.image}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="px-1">
        <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-2">{event.title}</h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{event.description}</p>
      </div>
    </div>
  );
}
