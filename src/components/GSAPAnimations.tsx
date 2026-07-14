"use client";

import { useEffect, useRef } from "react";

export default function GSAPAnimations() {
  const initialized = useRef(false);

  function runAnimations() {
    const w = window as unknown as Record<string, unknown>;
    const gsap = w.gsap as {
      registerPlugin: (...args: unknown[]) => void;
      utils: { toArray: (sel: string | Element) => unknown[] };
      fromTo: (target: unknown, from: Record<string, unknown>, to: Record<string, unknown>) => void;
      set: (target: unknown, vars: Record<string, unknown>) => void;
      to: (target: unknown, vars: Record<string, unknown>) => void;
      timeline: (vars?: Record<string, unknown>) => { to: (target: unknown, vars: Record<string, unknown>) => { fromTo?: (target: unknown, from: Record<string, unknown>, to: Record<string, unknown>) => void } };
    } | undefined;
    const ScrollTrigger = w.ScrollTrigger as {
      create: (config: Record<string, unknown>) => void;
      refresh: () => void;
      getAll: () => unknown[];
    } | undefined;

    if (!gsap || !ScrollTrigger) return false;

    gsap.registerPlugin(ScrollTrigger);

    // === 1. REVEAL ANIMATIONS — Premium Scroll Entrances ===
    document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-scale, [data-animate]").forEach((el) => {
      if (el.dataset.gsapDone === "1") return;
      el.dataset.gsapDone = "1";

      const animType = el.getAttribute("data-animate") || "";
      const delay = parseFloat(el.getAttribute("data-delay") || "0");
      const duration = parseFloat(el.getAttribute("data-duration") || "0.9");

      if (animType === "fade-up" || el.classList.contains("reveal")) {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      } else if (animType === "fade-in") {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration, delay, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      } else if (animType === "scale" || el.classList.contains("reveal-scale")) {
        gsap.fromTo(el, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration, delay, ease: "back.out(1.4)", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      } else if (animType === "clip") {
        gsap.fromTo(el, { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 30 }, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, duration: 1.2, delay, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      } else if (el.classList.contains("reveal-left")) {
        gsap.fromTo(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      } else if (el.classList.contains("reveal-right")) {
        gsap.fromTo(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      }
    });

    // === 2. STAGGER CHILDREN — Premium Grid Entrances ===
    document.querySelectorAll<HTMLElement>(".stagger-children").forEach((container) => {
      if (container.dataset.gsapDone === "1") return;
      container.dataset.gsapDone = "1";
      const items = Array.from(container.children) as HTMLElement[];
      gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: container, start: "top 85%", once: true } });
    });

    // === 3. PARALLAX IMAGES — Subtle scroll depth ===
    document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      if (el.dataset.gsapDone === "1") return;
      el.dataset.gsapDone = "1";
      const speed = parseFloat(el.getAttribute("data-parallax") || "0.15");
      gsap.to(el, { y: `${-speed * 100}%`, ease: "none", scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // === 4. HERO IMAGE REVEAL ===
    document.querySelectorAll<HTMLElement>(".hero-image-wrapper, .ab-hero-media, .dt-hero-media, .programs-hero").forEach((el) => {
      if (el.dataset.gsapDone === "1") return;
      el.dataset.gsapDone = "1";
      gsap.fromTo(el, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" });
    });

    // === 5. ATMOSPHERE FLOATING ELEMENTS ===
    document.querySelectorAll<HTMLElement>(".atmo-gradient-green, .atmo-gradient-blue, .atmo-heart-glow, .atmo-bloom").forEach((el) => {
      if (el.dataset.gsapDone === "1") return;
      el.dataset.gsapDone = "1";
      gsap.to(el, { y: "random(-15, 15)", x: "random(-10, 10)", duration: "random(6, 10)", repeat: -1, yoyo: true, ease: "sine.inOut" });
    });

    // === 6. STAT COUNTERS ===
    document.querySelectorAll<HTMLElement>(".stat-value, .impact-value, .dt-trust-value, .ab-impact-number, .programs-impact-value, .events-impact-value, .gallery-featured-number").forEach((el) => {
      if (el.dataset.gsapDone === "1") return;
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      if (!target) return;
      el.dataset.gsapDone = "1";
      gsap.fromTo(el, { innerText: "0" }, { innerText: target, duration: 2.5, ease: "power2.out", snap: { innerText: 1 }, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });

    // === 7. BACK TO TOP ===
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop && !(backToTop as HTMLElement).dataset.gsapDone) {
      (backToTop as HTMLElement).dataset.gsapDone = "1";
      ScrollTrigger.create({
        start: "top -300",
        onUpdate: (self: { direction: number }) => {
          if (self.direction === 1) {
            backToTop.classList.remove("is-visible");
          } else {
            backToTop.classList.add("is-visible");
          }
        },
      });
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // === 8. PROGRESS ANIMATION FOR SKILL BARS ===
    document.querySelectorAll<HTMLElement>(".progress-bar").forEach((el) => {
      if (el.dataset.gsapDone === "1") return;
      el.dataset.gsapDone = "1";
      const targetWidth = el.getAttribute("data-width") || "0%";
      gsap.fromTo(el, { width: "0%" }, { width: targetWidth, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    ScrollTrigger.refresh();
    return true;
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    let attempts = 0;
    const maxAttempts = 20;

    function tryInit() {
      if (runAnimations()) {
        initialized.current = true;
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryInit, 300);
      } else {
        document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }
    }

    tryInit();

    function onRouteChange() {
      document.querySelectorAll<HTMLElement>("[data-gsap-done]").forEach((el) => {
        delete el.dataset.gsapDone;
      });

      const w = window as unknown as Record<string, unknown>;
      const ScrollTrigger = w.ScrollTrigger as unknown as { getAll: () => unknown[]; refresh: () => void } | undefined;
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((st: unknown) => {
          (st as { kill?: () => void }).kill?.();
        });
      }

      setTimeout(() => {
        document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
        });
        runAnimations();
      }, 100);
    }

    window.addEventListener("popstate", onRouteChange);

    const origPushState = history.pushState.bind(history);
    history.pushState = function (...args: Parameters<typeof history.pushState>) {
      origPushState(...args);
      setTimeout(onRouteChange, 200);
    } as typeof history.pushState;

    return () => {
      window.removeEventListener("popstate", onRouteChange);
      history.pushState = origPushState as typeof history.pushState;
    };
  }, []);

  return null;
}
