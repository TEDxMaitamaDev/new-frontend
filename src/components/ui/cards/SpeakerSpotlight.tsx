import Image from "next/image";
import React from "react";
import type { Speaker } from "@/types/speaker";

type SpeakerSpotlight = {
  speaker: Speaker;
};

export default function SpeakerSpotlightCard({ speaker }: SpeakerSpotlight) {
  const imageSrc = speaker.image || "/images/speakers/speaker-1.png";

  return (
    <div className="flex flex-col justify-center text-center items-center gap-3 sm:gap-4">
      <div className="size-32 sm:size-40 md:size-48 lg:size-52 rounded-full overflow-hidden bg-tedx-brown-100/95 flex-shrink-0">
        <Image
          src={imageSrc}
          width={208}
          height={208}
          className="size-full object-cover"
          alt={`${speaker.name} image`}
        />
      </div>
      <div className="text-gray-200 w-full px-2">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-1 line-clamp-2">{speaker.name}</h2>
        <p className="text-xs sm:text-sm font-light line-clamp-2">&ldquo;{speaker.anchored_topic}&rdquo;</p>
      </div>
    </div>
  );
}
