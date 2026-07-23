"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY_ENABLED = "audioEnabled";
const STORAGE_KEY_VOLUME = "audioVolume";
const AUDIO_SRC = "/audio/living-hope.m4a";
const MAX_VOLUME = 0.2;

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
  const [started, setStarted] = useState(false);
  const [showPanel, setShowPanel] = useState(true);

  const volumeRef = useRef(0);
  const targetVolumeRef = useRef(0.15);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.muted = true;

    const savedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED);
    if (savedEnabled === "false") {
      setClosed(true);
      return;
    }

    const savedVolume = localStorage.getItem(STORAGE_KEY_VOLUME);
    const vol = savedVolume ? parseFloat(savedVolume) : 0.15;
    targetVolumeRef.current = vol;

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
    if (!audio || started) return;

    setStarted(true);
    setShowPanel(false);

    audio.muted = false;
    audio.volume = 0;
    volumeRef.current = 0;

    audio.play().then(() => {
      setMuted(false);
      setPlaying(true);
    }).catch(() => {});
  }, [started]);

  useEffect(() => {
    if (started) return;

    const tryStart = () => startPlayback();
    document.addEventListener("click", tryStart, { once: true });
    document.addEventListener("touchstart", tryStart, { once: true });
    document.addEventListener("keydown", tryStart, { once: true });
    document.addEventListener("scroll", tryStart, { once: true });

    return () => {
      document.removeEventListener("click", tryStart);
      document.removeEventListener("touchstart", tryStart);
      document.removeEventListener("keydown", tryStart);
      document.removeEventListener("scroll", tryStart);
    };
  }, [started, startPlayback]);

  useEffect(() => {
    if (!started || !playing) return;

    function handleScroll() {
      const scrollPct = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight || 1), 1);
      const target = Math.min(scrollPct * targetVolumeRef.current * 5, targetVolumeRef.current);
      targetVolumeRef.current = Math.max(target, 0.02);
    }

    function rampVolume() {
      const audio = audioRef.current;
      if (!audio || audio.paused) return;

      const current = volumeRef.current;
      const target = targetVolumeRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        const next = current + diff * 0.03;
        volumeRef.current = next;
        audio.volume = next;
        setVolume(next);
      }

      requestAnimationFrame(rampVolume);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    const raf = requestAnimationFrame(rampVolume);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [started, playing]);

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
    volumeRef.current = vol;
    targetVolumeRef.current = vol;
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
        <audio ref={audioRef} preload="auto" loop>
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
      <audio ref={audioRef} preload="auto" loop>
        <source src={AUDIO_SRC} type="audio/mpeg" />
      </audio>

      {showPanel && !started && (
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

      <div className={`lh-dock${started ? " lh-dock--active" : ""}`}>
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
              ) : volume < 0.1 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
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
              max={MAX_VOLUME.toString()}
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
