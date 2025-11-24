import React from "react";
export default function Advertisement() {
  return (
    <section className="py-12">
      <div className="w-full">
        <div className="relative aspect-video w-full bg-black">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source type="video/mp4" src="video/burak-ads.mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        </div>
      </div>
    </section>
  );
}