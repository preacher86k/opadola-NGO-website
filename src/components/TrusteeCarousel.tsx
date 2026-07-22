"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface Trustee {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

interface Props {
  trustees: Trustee[];
}

function modIdx(i: number, n: number) {
  return ((i % n) + n) % n;
}

function easeCubicInOut(p: number) {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

export default function TrusteeCarousel({ trustees }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const M = trustees.length;
  const buttonSize = isMobile ? 44 : 48;
  const gap = isMobile ? 20 : 28;
  const curve = 2;
  const buttonCount = 5;

  const posRef = useRef(0);
  const [posDisplay, setPosDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);
  const animRef = useRef({ startPos: 0, targetPos: 0, startTime: 0 });
  const [dir, setDir] = useState(1);
  const active = modIdx(Math.round(posDisplay), M);

  const half = Math.floor(Math.min(Math.max(1, buttonCount), M) / 2);
  const buffer = half + 1;
  const t = Math.max(0.0001, Math.min(10, curve) / 10);
  const step = buttonSize + gap;
  const dPsi = ((Math.PI * 2) / M) * t;
  const R = step / (2 * Math.sin(dPsi / 2));
  const baseTop = buttonSize * 0.9;
  const fadeInner = Math.max(0, half - 0.4);
  const fadeEnd = half + 0.6;
  const maxPsi = Math.min(Math.PI, fadeEnd * dPsi);
  const stripHeight = Math.round(baseTop + R * (1 - Math.cos(maxPsi)) + buttonSize / 2 + 16);

  const select = useCallback(
    (itemIdx: number) => {
      const currentActive = modIdx(Math.round(posRef.current), M);
      if (itemIdx === currentActive) return;
      let delta = itemIdx - Math.round(posRef.current);
      delta = ((delta % M) + M) % M;
      if (delta > M / 2) delta -= M;
      setDir(Math.sign(delta));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      animRef.current = {
        startPos: posRef.current,
        targetPos: posRef.current + delta,
        startTime: performance.now(),
      };
      const DURATION = 320;
      function tick(now: number) {
        const { startPos, targetPos, startTime } = animRef.current;
        const progress = Math.min(1, (now - startTime) / DURATION);
        posRef.current = startPos + (targetPos - startPos) * easeCubicInOut(progress);
        setPosDisplay(posRef.current);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          posRef.current = targetPos;
          setPosDisplay(targetPos);
          rafRef.current = null;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [M]
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const center = Math.round(posDisplay);
  const renderItems: number[] = [];
  const seen = new Set<number>();
  for (let s = -buffer; s <= buffer; s++) {
    const idx = modIdx(center + s, M);
    if (!seen.has(idx)) {
      seen.add(idx);
      renderItems.push(idx);
    }
  }

  function getVisualSlot(itemIdx: number): number {
    let slot = itemIdx - posDisplay;
    slot = slot % M;
    if (slot > M / 2) slot -= M;
    if (slot < -M / 2) slot += M;
    return slot;
  }

  function slotStyle(slot: number) {
    const angle = slot * dPsi;
    const x = R * Math.sin(angle);
    const y = R * (1 - Math.cos(angle));
    const deg = (angle * 180) / Math.PI;
    const absSlot = Math.abs(slot);
    const depth = Math.max(0, 1 - (0.55 * absSlot) / Math.max(1, half));
    const scale = 0.55 + 0.45 * depth;
    const opacity =
      absSlot <= fadeInner
        ? 1
        : absSlot >= fadeEnd
          ? 0
          : 1 - (absSlot - fadeInner) / (fadeEnd - fadeInner);
    const zIndex = Math.round(depth * 100) + (absSlot < 0.5 ? 100 : 0);
    return { x, y, deg, scale, opacity, zIndex };
  }

  const trustee = trustees[active];

  return (
    <div className="trustee-carousel">
      <div className="trustee-carousel-main">
        <div className="trustee-carousel-image-wrapper">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={{
                enter: (d: number) => ({
                  x: d * 260,
                  y: 150,
                  opacity: 0,
                  scale: 0.82,
                  rotate: d * 8,
                }),
                center: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 },
                exit: (d: number) => ({
                  x: -d * 260,
                  y: 150,
                  opacity: 0,
                  scale: 0.82,
                  rotate: -d * 8,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="trustee-carousel-image"
            >
              <img src={trustee.image} alt={trustee.name} draggable={false} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="trustee-carousel-info">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`info-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="trustee-carousel-name">{trustee.name}</h3>
            <p className="trustee-carousel-role">{trustee.role}</p>
            <p className="trustee-carousel-bio">{trustee.bio}</p>
            <a
              href={trustee.linkedin}
              className="trustee-carousel-linkedin"
              target="_blank"
              rel="noopener"
              aria-label={`${trustee.name} LinkedIn`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="trustee-carousel-strip" style={{ height: stripHeight }}>
        {renderItems.map((itemIdx) => {
          const slot = getVisualSlot(itemIdx);
          const { x, y, deg, scale, opacity, zIndex } = slotStyle(slot);
          const isActive = itemIdx === active;
          const item = trustees[itemIdx];
          return (
            <div
              key={itemIdx}
              className="trustee-carousel-button"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${deg}deg) scale(${scale})`,
                opacity,
                zIndex,
                width: buttonSize,
                height: buttonSize,
                left: "50%",
                top: buttonSize * 0.9,
                marginLeft: -(buttonSize / 2),
                marginTop: -(buttonSize / 2),
              }}
              onClick={() => select(itemIdx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") select(itemIdx); }}
              aria-label={`View ${item.name}`}
            >
              <div
                className={`trustee-carousel-thumb ${isActive ? "is-active" : ""}`}
                style={{ width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 }}
              >
                <img src={item.image} alt={item.name} draggable={false} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
