import { NextResponse } from "next/server";
import { getStripe, isStripePlanSlug, stripePrices } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { plan?: unknown };
    if (!isStripePlanSlug(body.plan)) {
      return NextResponse.json({ error: "Invalid membership selection" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
    const recurring = body.plan === "starter" || body.plan === "enthusiast" || body.plan === "unlimited-vip";
    const session = await getStripe().checkout.sessions.create({
      mode: recurring ? "subscription" : "payment",
      line_items: [{ price: stripePrices[body.plan], quantity: 1 }],
      billing_address_collection: "auto",
      customer_creation: recurring ? undefined : "always",
      allow_promotion_codes: true,
      metadata: { plan_slug: body.plan },
      subscription_data: recurring ? { metadata: { plan_slug: body.plan } } : undefined,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/#membership`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json({ error: "Secure checkout could not be started" }, { status: 500 });
  }
}
