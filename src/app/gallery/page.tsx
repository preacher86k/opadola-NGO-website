"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteGallery from "@/components/ui/InfiniteGallery";

const ALL_IMAGES = [
  "IMG_1771.JPG", "IMG_1772.JPG", "IMG_1773.JPG", "IMG_1774.JPG", "IMG_1775.JPG",
  "IMG_1778.JPG", "IMG_1779.JPG", "IMG_1780.JPG", "IMG_1781.JPG", "IMG_1783.JPG",
  "IMG_1914.JPG", "IMG_1915.JPG", "IMG_1916.JPG", "IMG_1917.JPG", "IMG_1918.JPG",
  "IMG_1919.JPG", "IMG_1920.JPG", "IMG_1921.JPG", "IMG_1922.JPG", "IMG_1923.JPG",
  "IMG_1925.JPG", "IMG_1926.JPG", "IMG_1927.JPG", "IMG_1928.JPG",
  "IMG_1936.JPG", "IMG_1939.JPG", "IMG_1941.JPG", "IMG_1942.JPG", "IMG_1943.JPG", "IMG_1944.JPG",
  "IMG_1295.jpg", "IMG_1083 copy.jpg",
  "vounteer1.png", "vounteer2.png", "vounteer3.png", "vounteer4.png",
  "volunteer5.PNG", "volunteer6.PNG",
];

const GALLERY_ITEMS = ALL_IMAGES.map((file, i) => ({
  src: `/images/gallery/${file}`,
  alt: `Gallery image ${i + 1}`,
  title: `Gallery ${i + 1}`,
}));

export default function GalleryPage() {
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const updateLightbox = useCallback((index: number) => {
    const items = GALLERY_ITEMS;
    const item = items[index];
    if (!item) return;
    const lightbox = lightboxRef.current;
    if (!lightbox) return;
    const img = lightbox.querySelector<HTMLImageElement>(".gallery-lightbox-img");
    const titleEl = lightbox.querySelector<HTMLElement>(".gallery-lightbox-title");
    if (img) img.src = item.src;
    if (img) img.alt = item.alt;
    if (titleEl) titleEl.textContent = item.title;
    setLightboxIdx(index);
  }, []);

  const openLightbox = useCallback((index: number) => {
    updateLightbox(index);
    setLightboxActive(true);
    document.body.style.overflow = "hidden";
  }, [updateLightbox]);

  const closeLightbox = useCallback(() => {
    setLightboxActive(false);
    document.body.style.overflow = "";
  }, []);

  const goPrev = useCallback(() => {
    const prev = (lightboxIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    updateLightbox(prev);
  }, [lightboxIdx, updateLightbox]);

  const goNext = useCallback(() => {
    const next = (lightboxIdx + 1) % GALLERY_ITEMS.length;
    updateLightbox(next);
  }, [lightboxIdx, updateLightbox]);

  const handleImageClick = useCallback((idx: number) => {
    openLightbox(idx);
  }, [openLightbox]);

  useEffect(() => {
    const lightbox = lightboxRef.current;
    if (!lightbox) return;

    const closeBtn = lightbox.querySelector<HTMLElement>(".gallery-lightbox-close");
    const prevBtn = lightbox.querySelector<HTMLElement>(".gallery-lightbox-prev");
    const nextBtn = lightbox.querySelector<HTMLElement>(".gallery-lightbox-next");

    const onKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") { closeLightbox(); }
      if (e.key === "ArrowLeft") { goPrev(); }
      if (e.key === "ArrowRight") { goNext(); }
    };

    const onBackdrop = (e: MouseEvent) => {
      if (e.target === lightbox) closeLightbox();
    };

    closeBtn?.addEventListener("click", closeLightbox);
    prevBtn?.addEventListener("click", goPrev);
    nextBtn?.addEventListener("click", goNext);
    document.addEventListener("keydown", onKeyDown);
    lightbox.addEventListener("click", onBackdrop);

    return () => {
      closeBtn?.removeEventListener("click", closeLightbox);
      prevBtn?.removeEventListener("click", goPrev);
      nextBtn?.removeEventListener("click", goNext);
      document.removeEventListener("keydown", onKeyDown);
      lightbox.removeEventListener("click", onBackdrop);
    };
  }, [closeLightbox, goPrev, goNext]);

  useEffect(() => {
    const lightbox = lightboxRef.current;
    if (!lightbox) return;
    if (lightboxActive) {
      lightbox.classList.add("active");
    } else {
      lightbox.classList.remove("active");
    }
  }, [lightboxActive]);

  return (
    <>
      {/* 1. CINEMATIC HERO */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <img src="/images/gallery/IMG_1926.JPG" alt="" className="gallery-hero-image" />
          <div className="gallery-hero-overlay"></div>
        </div>
        <div className="gallery-hero-particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="gallery-hero-particle" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
        <div className="gallery-hero-content">
          <span className="gallery-hero-badge">Captured Moments</span>
          <h1 className="gallery-hero-title">Our Story in Frames</h1>
          <p className="gallery-hero-subtitle">Every photograph tells a story of hope, dignity, and lasting change across Nigerian communities.</p>
          <div className="gallery-hero-cta">
            <a href="#gallery" className="btn btn-white btn-lg">Explore Gallery</a>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STRIP */}
      <section className="gallery-featured">
        <div className="gallery-featured-inner">
          <div className="gallery-featured-stat">
            <span className="gallery-featured-number" data-target="500">0</span>
            <span className="gallery-featured-plus">+</span>
            <span className="gallery-featured-label">Photos Captured</span>
          </div>
          <div className="gallery-featured-divider" aria-hidden="true"></div>
          <div className="gallery-featured-stat">
            <span className="gallery-featured-number" data-target="30">0</span>
            <span className="gallery-featured-plus">+</span>
            <span className="gallery-featured-label">Outreaches</span>
          </div>
          <div className="gallery-featured-divider" aria-hidden="true"></div>
          <div className="gallery-featured-stat">
            <span className="gallery-featured-number" data-target="10">0</span>
            <span className="gallery-featured-plus">+</span>
            <span className="gallery-featured-label">Communities</span>
          </div>
        </div>
      </section>

      {/* 3. INFINITE GALLERY */}
      <section className="gallery-infinite" id="gallery">
        <InfiniteGallery
          images={GALLERY_ITEMS}
          density={5}
          imageWidth={150}
          imageHeight={150}
          rounded={3}
          dragSpeed={20}
          driftAmount={8}
          friction={10}
          backgroundColor="#0A1215"
          onImageClick={handleImageClick}
        />
      </section>

      {/* 4. CTA */}
      <section className="gallery-cta">
        <div className="gallery-cta-inner">
          <div className="gallery-cta-header">
            <span className="gallery-cta-label">Get Involved</span>
            <h2 className="gallery-cta-title">Be Part of the Story</h2>
            <p className="gallery-cta-text">Your support helps us continue capturing and creating moments of impact.</p>
          </div>
          <div className="gallery-cta-grid">
            <Link href="/donate" className="gallery-cta-card gallery-cta-featured">
              <div className="gallery-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <h3 className="gallery-cta-heading">Donate Now</h3>
              <p className="gallery-cta-desc">Your generosity fuels every outreach, every photograph, every story.</p>
              <span className="gallery-cta-arrow">
                Donate
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </Link>
            <Link href="/volunteer" className="gallery-cta-card">
              <div className="gallery-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="gallery-cta-heading">Volunteer</h3>
              <p className="gallery-cta-desc">Join the team and help us capture and create more moments of impact.</p>
              <span className="gallery-cta-arrow">
                Sign Up
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </Link>
            <Link href="/contact" className="gallery-cta-card">
              <div className="gallery-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="gallery-cta-heading">Contact</h3>
              <p className="gallery-cta-desc">Have photos to share? We&apos;d love to feature your perspective.</p>
              <span className="gallery-cta-arrow">
                Reach Out
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. LIGHTBOX */}
      <div
        ref={lightboxRef}
        className="gallery-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        <button className="gallery-lightbox-close" aria-label="Close lightbox" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <button className="gallery-lightbox-nav gallery-lightbox-prev" aria-label="Previous image" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="gallery-lightbox-content">
          <img alt="" className="gallery-lightbox-img" />
          <div className="gallery-lightbox-info">
            <p className="gallery-lightbox-title"></p>
          </div>
        </div>
        <button className="gallery-lightbox-nav gallery-lightbox-next" aria-label="Next image" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </>
  );
}
