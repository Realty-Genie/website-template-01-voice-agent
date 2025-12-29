"use client";
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function LiveStream({ playlistUrl, className }: { playlistUrl: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported() && video) {
      const hls = new Hls({
        // Enable live streaming optimizations
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 5,
      });
      hlsRef.current = hls;
      // Load the live playlist
      hls.loadSource(playlistUrl);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS support
      video.src = playlistUrl;
    }
  }, [playlistUrl]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}
