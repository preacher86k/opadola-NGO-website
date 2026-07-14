"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY_ENABLED = "audioEnabled";
const STORAGE_KEY_VOLUME = "audioVolume";
const AUDIO_SRC = "/audio/living-hope.m4a";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [expanded, setExpanded] = useState(true);
  const [closed, setClosed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.15);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [gestureDetected, setGestureDetected] = useState(false);
  const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.muted = true;

    const savedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED);
    const savedVolume = localStorage.getItem(STORAGE_KEY_VOLUME);
    const parsedVol = savedVolume ? parseFloat(savedVolume) : 0.15;

    if (savedEnabled === "true") {
      setVolume(parsedVol);
      setMuted(false);
    }

    const onCanPlay = () => {
      setReady(true);
      setDuration(audio.duration);
    };

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };

    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    audio.load();

    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || gestureDetected) return;

    setGestureDetected(true);

    const savedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED);
    if (savedEnabled === "false") {
      setShowPanel(false);
      return;
    }

    const savedVolume = localStorage.getItem(STORAGE_KEY_VOLUME);
    const vol = savedVolume ? parseFloat(savedVolume) : 0.15;

    audio.muted = false;
    audio.volume = 0;

    audio.play().then(() => {
      setMuted(false);
      setPlaying(true);
      setShowPanel(false);

      let current = 0;
      const target = vol;
      const step = target / 60;
      const fade = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(fade);
        }
        audio.volume = current;
      }, 50);
    }).catch(() => {});
  }, [gestureDetected]);

  useEffect(() => {
    if (gestureDetected) return;

    const handler = () => startPlayback();
    document.addEventListener("click", handler, { once: true });
    document.addEventListener("touchstart", handler, { once: true });
    document.addEventListener("keydown", handler, { once: true });

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [gestureDetected, startPlayback]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.muted = false;
      audio.volume = volume;
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = parseFloat(e.target.value);
    setVolume(vol);
    audio.volume = muted ? 0 : vol;
    localStorage.setItem(STORAGE_KEY_VOLUME, vol.toString());

    if (muted && vol > 0) {
      audio.muted = false;
      setMuted(false);
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audio.currentTime = pct * duration;
    setProgress(pct);
  }

  function handleClose() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.muted = true;
    }
    setPlaying(false);
    setMuted(true);
    setClosed(true);
    localStorage.setItem(STORAGE_KEY_ENABLED, "false");
  }

  function handleCollapse() {
    setExpanded(false);
  }

  function handleExpand() {
    setExpanded(true);
  }

  function formatTime(sec: number) {
    if (!sec || !isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  if (closed) return null;

  if (!expanded) {
    return (
      <>
        <audio ref={audioRef} preload="metadata" loop>
          <source src={AUDIO_SRC} type="audio/mp4" />
        </audio>
        <button className="lh-collapsed" onClick={handleExpand} aria-label="Expand Living Hope player">
          <span className="lh-collapsed-icon">♪</span>
          <span className="lh-collapsed-label">Living Hope</span>
        </button>
      </>
    );
  }

  return (
    <>
      <audio ref={audioRef} preload="metadata" loop>
        <source src={AUDIO_SRC} type="audio/mpeg" />
      </audio>

      {showPanel && !gestureDetected && (
        <div className="lh-prep-panel">
          <div className="lh-prep-inner">
            <span className="lh-prep-icon">♪</span>
            <span className="lh-prep-title">Living Hope Experience</span>
            <span className="lh-prep-text">Experience Opadola with our signature soundscape.</span>
            <span className="lh-prep-dots">
              <span className="lh-dot" style={{ animationDelay: "0s" }}>·</span>
              <span className="lh-dot" style={{ animationDelay: "0.3s" }}>·</span>
              <span className="lh-dot" style={{ animationDelay: "0.6s" }}>·</span>
            </span>
          </div>
        </div>
      )}

      <div className={`lh-dock${gestureDetected ? " lh-dock--active" : ""}`}>
        <div className="lh-dock-glow" aria-hidden="true" />

        <div className="lh-dock-row">
          <button className="lh-btn lh-btn-label" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
            <span className="lh-note">♪</span>
            <span className="lh-label">Living Hope</span>
          </button>

          <div className="lh-progress" onClick={handleSeek} role="slider" aria-label="Seek" tabIndex={0}>
            <div className="lh-progress-track">
              <div className="lh-progress-fill" style={{ width: `${progress * 100}%` }} />
              <div className="lh-progress-thumb" style={{ left: `${progress * 100}%` }} />
            </div>
          </div>

          <span className="lh-time">{formatTime(duration * progress)}</span>

          <div className="lh-controls">
            <button className="lh-btn" onClick={() => { const a = audioRef.current; if (a) { a.currentTime = Math.max(0, a.currentTime - 10); } }} aria-label="Rewind 10 seconds">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            </button>

            <button className="lh-btn lh-btn-play" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="6,3 20,12 6,21"/></svg>
              )}
            </button>

            <button className="lh-btn" onClick={() => { const a = audioRef.current; if (a) { a.currentTime = Math.min(a.duration, a.currentTime + 10); } }} aria-label="Forward 10 seconds">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/></svg>
            </button>
          </div>

          <div className="lh-volume-wrap">
            <button className="lh-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
              {muted || volume === 0 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              ) : volume < 0.2 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              )}
            </button>
            <input
              type="range"
              className="lh-volume-slider"
              min="0"
              max="0.25"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
            />
          </div>

          <button className="lh-btn lh-btn-close" onClick={handleClose} aria-label="Close player">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
