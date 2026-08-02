import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error: eventError } = await supabase.from("stripe_webhook_events").insert({
    event_id: event.id,
    event_type: event.type,
  });

  if (eventError?.code === "23505") return NextResponse.json({ received: true, duplicate: true });
  if (eventError) return NextResponse.json({ error: "Unable to record webhook" }, { status: 500 });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const planSlug = session.metadata?.plan_slug;
    const { data: plan } = planSlug
      ? await supabase.from("membership_plans").select("id").eq("slug", planSlug).maybeSingle()
      : { data: null };

    await supabase.from("payment_orders").upsert({
      plan_id: plan?.id ?? null,
      customer_email: session.customer_details?.email ?? session.customer_email ?? "unknown@invalid.local",
      stripe_checkout_session_id: session.id,
      stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
      stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
      stripe_subscription_id: typeof session.subscription === "string" ? session.subscription : null,
      amount_total: session.amount_total,
      currency: session.currency ?? "usd",
      payment_status: session.payment_status,
    }, { onConflict: "stripe_checkout_session_id" });
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    await supabase.from("customer_memberships")
      .update({ status: "cancelled" })
      .eq("external_subscription_id", subscription.id);
  }

  return NextResponse.json({ received: true });
}
