import Image from "next/image";
import React from "react";
import type { EventType } from "@/types/event";

type EventPreview = { event: EventType };

export default function EventPreviewCard({ event }: EventPreview) {
  return (
    <div className=" w-full md:w-64 flex flex-col gap-4 text-tedx-black">
      <Image
        className="h-40 w-full rounded-xl"
        alt="Event preview"
        src={event.image}
        width={1024}
        height={1024}
        loading="lazy"
      />
      <div className="">
        <h2 className="font-bold">{event.title}</h2>
        <p className="text-sm">{event.description}</p>
      </div>
    </div>
  );
}
