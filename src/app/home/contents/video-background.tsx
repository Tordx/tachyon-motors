import { VideoBackgroundProps } from "@/types";


export default function VideoBackground(props: VideoBackgroundProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={props.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Grayish Overlay */}
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
