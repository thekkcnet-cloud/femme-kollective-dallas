import Stripe from "stripe";

let stripeClient: Stripe | undefined;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("STRIPE_SECRET_KEY is not configured");

  stripeClient ??= new Stripe(secretKey, { typescript: true });
  return stripeClient;
}

export const stripePrices = {
  "first-timer": process.env.STRIPE_PRICE_FIRST_TIMER ?? "price_1TzoKCECd0ECkskHukQfx9tp",
  starter: process.env.STRIPE_PRICE_STARTER ?? "price_1TzoKCECd0ECkskHGim4Fu55",
  enthusiast: process.env.STRIPE_PRICE_ENTHUSIAST ?? "price_1TzoKCECd0ECkskHPSApxGmL",
  "unlimited-vip": process.env.STRIPE_PRICE_UNLIMITED_VIP ?? "price_1TzoKCECd0ECkskHy6RJqT4I",
  "drop-in": process.env.STRIPE_PRICE_DROP_IN ?? "price_1TzoKCECd0ECkskHkRB2S29t",
} as const;

export type StripePlanSlug = keyof typeof stripePrices;

export function isStripePlanSlug(value: unknown): value is StripePlanSlug {
  return typeof value === "string" && value in stripePrices;
}
