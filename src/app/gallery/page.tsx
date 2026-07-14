"use client";

import Link from "next/link";
import { useEffect } from "react";

const STATIC_ITEMS = [
  { src: "/images/gallery/IMG_1920.JPG", alt: "Education outreach", category: "programs", title: "Education Outreach" },
  { src: "/images/gallery/IMG_1928.JPG", alt: "Medical outreach", category: "programs", title: "Medical Outreach" },
  { src: "/images/gallery/IMG_1774.JPG", alt: "Food distribution", category: "events", title: "Food Distribution" },
  { src: "/images/gallery/IMG_1775.JPG", alt: "Community meeting", category: "community", title: "Community Meeting" },
  { src: "/images/gallery/IMG_1916.JPG", alt: "Elderly care", category: "programs", title: "Elderly Care Program" },
  { src: "/images/gallery/IMG_1939.JPG", alt: "Educational support", category: "events", title: "Educational Support" },
  { src: "/images/gallery/IMG_1921.JPG", alt: "Volunteer team", category: "team", title: "Volunteer Team" },
  { src: "/images/gallery/IMG_1926.JPG", alt: "Partnership meeting", category: "community", title: "Partnership Meeting" },
  { src: "/images/gallery/IMG_1923.JPG", alt: "Community outreach", category: "community", title: "Community Outreach" },
  { src: "/images/gallery/IMG_1936.JPG", alt: "Youth empowerment", category: "team", title: "Youth Empowerment" },
  { src: "/images/gallery/vounteer3.png", alt: "Field team", category: "team", title: "Field Team" },
];

const ALBUM_ITEMS = [
  { src: "/images/gallery/IMG_1928.JPG", alt: "Medical Outreach 2026", title: "Medical Outreach 2026", count: 24, desc: "Free healthcare for senior citizens" },
  { src: "/images/gallery/IMG_1939.JPG", alt: "Educational Support Initiative", title: "Educational Support Initiative", count: 18, desc: "Bridging the digital divide" },
  { src: "/images/gallery/IMG_1927.JPG", alt: "Community Events", title: "Community Events", count: 32, desc: "Engaging with communities" },
];

export default function GalleryPage() {
  useEffect(() => {
    const filterBtns = document.querySelectorAll<HTMLButtonElement>(".gallery-filter-btn");
    const items = document.querySelectorAll<HTMLElement>(".gallery-item");
    const lightbox = document.querySelector<HTMLElement>(".gallery-lightbox");
    const lightboxImg = lightbox?.querySelector<HTMLImageElement>(".gallery-lightbox-img");
    const lightboxTitle = lightbox?.querySelector<HTMLElement>(".gallery-lightbox-title");
    const lightboxMeta = lightbox?.querySelector<HTMLElement>(".gallery-lightbox-meta");
    const lightboxClose = lightbox?.querySelector<HTMLElement>(".gallery-lightbox-close");
    const lightboxPrev = lightbox?.querySelector<HTMLElement>(".gallery-lightbox-prev");
    const lightboxNext = lightbox?.querySelector<HTMLElement>(".gallery-lightbox-next");

    let currentIndex = 0;
    let imageItems: HTMLElement[] = [];

    const updateLightbox = (index: number) => {
      const item = imageItems[index];
      if (!item) return;
      const img = item.querySelector<HTMLImageElement>("img");
      const titleEl = item.querySelector<HTMLElement>(".gallery-item-title");
      const catEl = item.querySelector<HTMLElement>(".gallery-item-category");
      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxImg && img) lightboxImg.alt = img.alt;
      if (lightboxTitle) lightboxTitle.textContent = titleEl?.textContent || "";
      if (lightboxMeta) lightboxMeta.textContent = catEl?.textContent || "";
      currentIndex = index;
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter") || "all";
        items.forEach((item) => {
          if (filter === "all" || item.getAttribute("data-category") === filter) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });

    items.forEach((item, i) => {
      imageItems.push(item);
      const expandBtn = item.querySelector<HTMLElement>(".gallery-item-btn");
      const openLightbox = () => {
        imageItems = Array.from(document.querySelectorAll<HTMLElement>(".gallery-item:not(.hidden)"));
        const visibleIndex = imageItems.indexOf(item);
        if (visibleIndex !== -1) {
          updateLightbox(visibleIndex);
          lightbox?.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      };
      item.addEventListener("click", (e) => {
        if ((e.target as HTMLElement).closest(".gallery-item-btn")) return;
        openLightbox();
      });
      expandBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox();
      });
    });

    lightboxClose?.addEventListener("click", () => {
      lightbox?.classList.remove("active");
      document.body.style.overflow = "";
    });

    lightbox?.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox?.classList.contains("active")) return;
      if (e.key === "Escape") {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
      }
      if (e.key === "ArrowLeft") {
        const prev = (currentIndex - 1 + imageItems.length) % imageItems.length;
        updateLightbox(prev);
      }
      if (e.key === "ArrowRight") {
        const next = (currentIndex + 1) % imageItems.length;
        updateLightbox(next);
      }
    });

    lightboxPrev?.addEventListener("click", () => {
      const prev = (currentIndex - 1 + imageItems.length) % imageItems.length;
      updateLightbox(prev);
    });

    lightboxNext?.addEventListener("click", () => {
      const next = (currentIndex + 1) % imageItems.length;
      updateLightbox(next);
    });
  }, []);

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
            <a href="#albums" className="btn btn-ghost btn-lg">View Albums</a>
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

      {/* 3. FILTERS */}
      <section className="gallery-filters" id="gallery">
        <div className="gallery-filters-inner">
          <button className="gallery-filter-btn active" data-filter="all" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            All Photos
          </button>
          <button className="gallery-filter-btn" data-filter="programs" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Programs
          </button>
          <button className="gallery-filter-btn" data-filter="events" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M21 9H3"/><path d="M9 21V9"/></svg>
            Events
          </button>
          <button className="gallery-filter-btn" data-filter="community" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Community
          </button>
          <button className="gallery-filter-btn" data-filter="team" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Team
          </button>
        </div>
      </section>

      {/* 4. GALLERY GRID */}
      <section className="gallery-grid">
        <div className="gallery-grid-inner">
          <div className="gallery-masonry">
            {STATIC_ITEMS.map((item, i) => (
              <div className="gallery-item" data-category={item.category} key={i}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="gallery-item-glow" aria-hidden="true"></div>
                <div className="gallery-item-overlay">
                  <span className="gallery-item-category">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                  <h3 className="gallery-item-title">{item.title}</h3>
                </div>
                <button className="gallery-item-btn" aria-label="View full image" type="button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                </button>
                <span className="gallery-item-badge">2026</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ALBUMS */}
      <section id="albums" className="gallery-albums">
        <div className="gallery-albums-header">
          <span className="gallery-albums-label">Collections</span>
          <h2 className="gallery-albums-title">Browse by Album</h2>
          <p className="gallery-albums-text">Curated collections from our programs, events, and community outreach.</p>
        </div>
        <div className="gallery-albums-grid">
          {ALBUM_ITEMS.map((album, i) => (
            <div className="gallery-album-card" key={i}>
              <img src={album.src} alt={album.alt} loading="lazy" />
              <div className="gallery-album-overlay"></div>
              <div className="gallery-album-content">
                <span className="gallery-album-count">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  {album.count} Photos
                </span>
                <h3 className="gallery-album-title">{album.title}</h3>
                <p className="gallery-album-desc">{album.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA */}
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

      {/* 7. LIGHTBOX */}
      <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Image lightbox">
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
            <p className="gallery-lightbox-meta"></p>
          </div>
        </div>
        <button className="gallery-lightbox-nav gallery-lightbox-next" aria-label="Next image" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </>
  );
}
