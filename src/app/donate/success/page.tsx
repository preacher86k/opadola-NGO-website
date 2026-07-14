"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

interface DonationData {
  name: string | null;
  amount: number;
  reference: string;
  status: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "pending" | "error">("loading");
  const [donation, setDonation] = useState<DonationData | null>(null);

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }

    const ref = reference;

    let attempts = 0;
    const maxAttempts = 10;

    function checkStatus() {
      fetch(`/api/donate/verify?reference=${encodeURIComponent(ref)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setDonation(data.data);
            if (data.data.status === "success") {
              setStatus("success");
            } else if (attempts < maxAttempts) {
              attempts++;
              setTimeout(checkStatus, 3000);
            } else {
              setStatus("pending");
            }
          } else {
            setStatus("error");
          }
        })
        .catch(() => {
          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(checkStatus, 3000);
          } else {
            setStatus("error");
          }
        });
    }

    checkStatus();
  }, [reference]);

  function formatNaira(n: number) {
    return new Intl.NumberFormat("en-NG").format(n);
  }

  return (
    <div className="page-hero" style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}>
      <div className="container" style={{ textAlign: "center", padding: "8rem 0 4rem" }}>
        <div className="page-hero-content" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {status === "loading" && (
            <>
              <div style={{ width: 60, height: 60, border: "4px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 2rem" }} />
              <h1 className="display" style={{ color: "white" }}>Verifying Payment...</h1>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>Please wait while we confirm your donation.</p>
            </>
          )}
          {status === "success" && (
            <>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width={40} height={40}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="display" style={{ color: "white" }}>Thank You!</h1>
              <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "0.5rem" }}>
                Your donation of <strong>&#8358;{formatNaira(donation?.amount || 0)}</strong> has been received.
              </p>
              <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>
                A confirmation will be sent to your email.
              </p>
              {reference && (
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--text-sm)", marginBottom: "2rem", fontFamily: "monospace" }}>
                  Ref: {reference}
                </p>
              )}
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/" className="btn btn-white btn-lg">Return Home</Link>
                <Link href="/programs" className="btn btn-white btn-lg">Our Programs</Link>
              </div>
            </>
          )}
          {status === "pending" && (
            <>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width={40} height={40}>
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h1 className="display" style={{ color: "white" }}>Payment Processing</h1>
              <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>
                Your payment is being processed. You&apos;ll receive a confirmation email shortly.
              </p>
              {reference && (
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--text-sm)", marginBottom: "2rem", fontFamily: "monospace" }}>
                  Ref: {reference}
                </p>
              )}
              <Link href="/" className="btn btn-white btn-lg">Return Home</Link>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="display" style={{ color: "white" }}>Something went wrong</h1>
              <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "2rem" }}>
                We could not verify your payment. Please contact us if you were charged.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-white btn-lg">Contact Us</Link>
                <Link href="/donate" className="btn btn-white btn-lg">Try Again</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DonateSuccessPage() {
  return (
    <Suspense fallback={
      <div className="page-hero" style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}>
        <div className="container" style={{ textAlign: "center", padding: "8rem 0 4rem" }}>
          <h1 className="display" style={{ color: "white" }}>Loading...</h1>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
