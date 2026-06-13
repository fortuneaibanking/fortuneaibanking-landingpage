"use client";

import { useEffect, useRef } from "react";

interface LogoVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onEnded?: () => void;
  play?: boolean;
}

// Render each video frame onto a canvas with white/near-white pixels made
// transparent — same threshold logic used for the cowrie PNG.
export default function LogoVideo({
  src,
  className,
  style,
  onEnded,
  play = false,
}: LogoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Trigger play imperatively so the effect runs on phase change
  useEffect(() => {
    if (play && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [play]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // willReadFrequently: true tells the browser to optimise for frequent getImageData calls
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animating = true;

    const processFrame = () => {
      if (!animating) return;

      if (!video.paused && !video.ended && video.readyState >= 2) {
        const W = canvas.width;
        const H = canvas.height;

        ctx.drawImage(video, 0, 0, W, H);

        const imageData = ctx.getImageData(0, 0, W, H);
        const d = imageData.data;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          if (r >= 235 && g >= 235 && b >= 235) {
            d[i + 3] = 0;
          } else if (r > 190 && g > 190 && b > 190) {
            const whiteness = (r + g + b) / 3;
            d[i + 3] = Math.round(((255 - whiteness) / 65) * 255);
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      rafRef.current = requestAnimationFrame(processFrame);
    };

    const handleMetadata = () => {
      // Cap processing resolution at 600px max dimension for performance
      const MAX = 600;
      const scale = Math.min(1, MAX / Math.max(video.videoWidth, video.videoHeight));
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      rafRef.current = requestAnimationFrame(processFrame);
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    // If metadata already loaded (e.g. cached), kick off immediately
    if (video.readyState >= 1) handleMetadata();

    return () => {
      animating = false;
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, []);

  return (
    <>
      {/* Hidden video source — no display, no blend mode needed */}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        onEnded={onEnded}
        style={{ display: "none" }}
        crossOrigin="anonymous"
      />
      {/* Canvas shows the processed transparent frames */}
      <canvas
        ref={canvasRef}
        className={className}
        style={style}
        aria-label="Fortune logo animation"
      />
    </>
  );
}
