import Image from "next/image";
import React from "react";
import type { Speaker } from "@/types/speaker";

type SpeakerSpotlight = {
  speaker: Speaker;
};

export default function SpeakerSpotlightCard({ speaker }: SpeakerSpotlight) {
  const imageSrc = speaker.image || "/images/speakers/speaker-1.png";

  return (
    <div className="flex flex-col justify-center text-center items-center gap-4">
      <div className="size-52 rounded-full overflow-hidden bg-tedx-brown-100/95">
        <Image
          src={imageSrc}
          width={200}
          height={200}
          className="size-full "
          alt={`${speaker.name} image`}
        />
      </div>
      <div className="text-gray-200">
        <h2>{speaker.name}</h2>
        <p className="text-sm font-light">&ldquo;{speaker.anchored_topic}&rdquo;</p>
      </div>
    </div>
  );
}
