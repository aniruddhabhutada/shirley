'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2 } from 'lucide-react';

interface ProductVideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  badge?: string;
  className?: string;
}

export default function ProductVideoPlayer({
  src,
  poster,
  title,
  badge = 'PRODUCT FILM',
  className = '',
}: ProductVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.warn('Playback prevented:', err);
          // try muted play if browser blocked unmuted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => {
              setIsPlaying(true);
              setHasStarted(true);
            });
          }
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-shirley-plum-dark shadow-elevated border border-white/60 aspect-[9/16] max-w-[320px] sm:max-w-[340px] mx-auto group cursor-pointer select-none ${className}`}
      onClick={togglePlay}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        muted={isMuted}
        loop
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center"
      />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="glass-pill px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-shirley-plum-rich uppercase shadow-sm">
          {badge}
        </div>
        <div className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-semibold text-shirley-plum-rich flex items-center gap-1 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>IN MOTION</span>
        </div>
      </div>

      {/* Center Play Button Overlay (when paused or before start) */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-shirley-plum-rich/30 backdrop-blur-[2px] flex items-center justify-center z-20 transition-all duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich flex items-center justify-center shadow-glow-yellow transform group-hover:scale-105 transition-transform">
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-shirley-plum-dark/90 via-shirley-plum-dark/50 to-transparent p-4 pt-10 z-20 flex flex-col gap-2">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-shirley-yellow-mango transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Restart video"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-medium text-shirley-cream/80 truncate max-w-[120px]">
            {title}
          </span>
        </div>
      </div>

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-shirley-plum-rich/90 flex flex-col items-center justify-center p-6 text-center text-white z-30 space-y-2">
          <p className="font-serif text-sm">Video ad temporarily unavailable</p>
          <p className="text-[11px] text-shirley-blush/80">Please check your connection</p>
        </div>
      )}
    </div>
  );
}

