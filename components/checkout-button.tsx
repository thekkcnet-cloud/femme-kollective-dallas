"use client";

import { useState } from "react";
import type { StripePlanSlug } from "@/lib/stripe";

type CheckoutButtonProps = {
  plan: StripePlanSlug;
  className?: string;
  children: React.ReactNode;
};

export function CheckoutButton({ plan, className, children }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error ?? "Checkout is unavailable");
      // The site is embedded on Wix, so send checkout to the top-level window.
      // This prevents Stripe from being trapped inside the page iframe.
      if (window.top) {
        window.top.location.href = payload.url;
      } else {
        window.location.assign(payload.url);
      }
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout is unavailable");
      setLoading(false);
    }
  }

  return (
    <>
      <button className={className} type="button" onClick={checkout} disabled={loading}>
        {loading ? "Opening secure checkout…" : children}
      </button>
      {error && <span role="alert">{error}</span>}
    </>
  );
}
