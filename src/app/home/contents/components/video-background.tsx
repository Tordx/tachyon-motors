"use client";

import { useState } from "react";
import { VideoBackgroundProps } from "@/types";

export default function VideoBackground(props: VideoBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    // Go to next video or loop back to the first
    setCurrentIndex((prevIndex) => (prevIndex + 1) % props.videosrc.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        key={currentIndex} // force video to reload on change
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={props.videosrc[currentIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: props.overlayColor || "rgba(0, 0, 0, 1)",
          opacity: props.overlayOpacity || 0.8,
        }}
      ></div>

      {props.children}
    </div>
  );
}
