import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import GSAPAnimations from "@/components/GSAPAnimations";
import "@/styles/variables.css";
import "@/styles/reset.css";
import "@/styles/typography.css";
import "@/styles/layout.css";
import "@/styles/components.css";
import "@/styles/navigation.css";
import "@/styles/animations.css";
import "@/styles/utilities.css";
import "@/styles/utilities-extended.css";
import "@/styles/pages/page-base.css";
import "@/styles/pages/home.css";
import "@/styles/pages/about.css";
import "@/styles/pages/programs.css";
import "@/styles/pages/events.css";
import "@/styles/pages/volunteer.css";
import "@/styles/pages/gallery.css";
import "@/styles/pages/contact.css";
import "@/styles/pages/donate.css";
import "@/styles/pages/team.css";
import "@/styles/pages/privacy.css";
import "@/styles/audio-player.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.opadolacare.org"),
  title: {
    default: "Opadola Care Initiative — Restoring Dignity, Expanding Opportunity",
    template: "%s | Opadola Care Initiative",
  },
  description:
    "An independent humanitarian and community development organization dedicated to restoring dignity, expanding opportunity, and strengthening communities through practical and sustainable solutions.",
  keywords: [
    "humanitarian", "community development", "Nigeria", "charity",
    "nonprofit", "children", "seniors", "medical outreach", "poverty relief",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Opadola Care Initiative",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Opadola Care Initiative" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/og-image.jpg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('theme');
            if (t) document.documentElement.setAttribute('data-theme', t);
          })();
        `}} />
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
        <script src="https://unpkg.com/lenis@1.1/dist/lenis.min.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('DOMContentLoaded', function() {
            if (typeof lenis !== 'undefined') {
              const l = new lenis({ duration: 1.2, easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)) }, orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2 });
              function raf(time) { l.raf(time); requestAnimationFrame(raf); }
              requestAnimationFrame(raf);
              if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                l.on('scroll', ScrollTrigger.update);
              }
            }
          });
        `}} />
        <noscript dangerouslySetInnerHTML={{ __html: '<style>.reveal,.reveal-left,.reveal-right,.reveal-scale,[data-animate]{opacity:1!important;transform:none!important;clip-path:none!important}</style>' }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <AudioPlayer />
        <GSAPAnimations />
        <button className="back-to-top" aria-label="Back to top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </body>
    </html>
  );
}
