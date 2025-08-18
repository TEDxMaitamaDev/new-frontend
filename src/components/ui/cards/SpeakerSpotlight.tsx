import Image from "next/image";
import React from "react";

type SpeakerSpotlight = {
  speaker: Speaker;
};

export default function SpeakerSpotlightCard({ speaker }: SpeakerSpotlight) {
  return (
    <div className="flex flex-col justify-center text-center items-center gap-4">
      <div className="size-52 rounded-full overflow-hidden bg-tedx-brown-100/95">
        <Image
          src={speaker.image}
          className="size-full "
          alt={`${speaker.name} image`}
        />
      </div>
      <div className="">
        <h2>{speaker.name}</h2>
        <p className="text-sm font-light">"{speaker.anchored_topic}"</p>
      </div>
    </div>
  );
}
