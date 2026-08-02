import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const allowedPackages = new Set(["Intro Party", "Signature Party", "VIP Party"]);
const allowedOccasions = new Set(["Bachelorette", "Birthday", "Girls Night Out", "Other"]);
const allowedContactMethods = new Set(["Call", "Text", "Email"]);
const allowedAddOns = new Set(["Extra 30 minutes ($80)", "Professional videographer ($50)", "Mini cake + candles ($20)", "Money gun ($5)", "Props ($10)", "Custom routine ($25)"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const guestCount = Number(body.guestCount);
    const addOns = Array.isArray(body.addOns) ? body.addOns.filter((item: unknown) => allowedAddOns.has(String(item))) : [];

    if (fullName.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 7) {
      return NextResponse.json({ error: "Please enter your name, email, and phone number." }, { status: 400 });
    }
    if (!allowedContactMethods.has(body.contactMethod) || !allowedPackages.has(body.partyPackage) || !allowedOccasions.has(body.occasion)) {
      return NextResponse.json({ error: "Please complete the contact, package, and occasion fields." }, { status: 400 });
    }
    if (!body.preferredDate || !body.preferredTime || !Number.isInteger(guestCount) || guestCount < 2 || guestCount > 60) {
      return NextResponse.json({ error: "Please provide a valid date, time, and guest count." }, { status: 400 });
    }
    if (body.alcoholAcknowledged !== true || body.safetyAcknowledged !== true) {
      return NextResponse.json({ error: "Please accept both safety acknowledgments." }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin().from("private_party_inquiries").insert({
      full_name: fullName,
      email,
      phone,
      contact_method: body.contactMethod,
      preferred_date: body.preferredDate,
      preferred_time: body.preferredTime,
      party_package: body.partyPackage,
      guest_count: guestCount,
      occasion: body.occasion,
      all_guests_21: body.allGuests21,
      alcohol_acknowledged: true,
      safety_acknowledged: true,
      bringing_food_drinks: body.bringingFoodDrinks,
      add_ons: addOns,
      message: String(body.message || "").trim().slice(0, 3000) || null,
      status: "new",
    });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Party inquiry submission failed", error);
    return NextResponse.json({ error: "We couldn't send your request. Please try again or email thekkc.net@gmail.com." }, { status: 500 });
  }
}
