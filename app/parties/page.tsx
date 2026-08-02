"use client";

import { FormEvent, useState } from "react";

const addOns = ["Extra 30 minutes ($80)", "Professional videographer ($50)", "Mini cake + candles ($20)", "Money gun ($5)", "Props ($10)", "Custom routine ($25)"];

export default function PartyInquiryPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    payload.addOns = form.getAll("addOns");
    payload.guestCount = Number(payload.guestCount);
    payload.allGuests21 = payload.allGuests21 === "true";
    payload.bringingFoodDrinks = payload.bringingFoodDrinks === "true";
    payload.alcoholAcknowledged = form.has("alcoholAcknowledged");
    payload.safetyAcknowledged = form.has("safetyAcknowledged");

    const response = await fetch("/api/party-inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Please try again."); setStatus("error"); return; }
    setStatus("sent");
    event.currentTarget.reset();
  }

  return <main className="inquiry-page">
    <header className="inquiry-hero"><nav className="nav container"><a className="brand" href="/"><span>FEMME</span> KOLLECTIVE</a><a className="nav-cta" href="/">Back to Femme <span>↗</span></a></nav><div className="container inquiry-intro"><p className="eyebrow red"><i /> Private experiences</p><h1>Let&apos;s plan your<br /><em>Femme moment.</em></h1><p>Tell us what you&apos;re celebrating. We&apos;ll follow up to confirm availability, details, and your deposit.</p></div></header>
    <section className="inquiry-wrap container"><aside><p className="eyebrow red"><i /> Pick your energy</p><div className="inquiry-packages"><article><span>$299</span><h3>Intro Party</h3><p>1 hour · up to 8 guests</p></article><article><span>$399</span><h3>Signature Party</h3><p>1.5 hours · up to 15 guests</p></article><article><span>$599</span><h3>VIP Party</h3><p>2 hours · up to 20 guests · champagne/mocktails</p></article></div><p className="inquiry-note">Submitting a request does not reserve the date. Your party is confirmed after availability and deposit are completed.</p></aside>
      <form className="party-form" onSubmit={submit}>
        <div className="form-section"><span>01</span><h2>About you</h2><div className="form-grid"><label>Full name<input name="fullName" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label><label>Preferred contact<select name="contactMethod" required defaultValue=""><option value="" disabled>Select one</option><option>Call</option><option>Text</option><option>Email</option></select></label></div></div>
        <div className="form-section"><span>02</span><h2>Your party</h2><fieldset className="party-type-field"><legend>Choose your party type</legend><div className="party-type-options"><label><input type="radio" name="partyType" value="Pole" required /><span><b>Pole</b><small>Spins, poses, transitions, and beginner-friendly choreography.</small></span></label><label><input type="radio" name="partyType" value="Heels" required /><span><b>Heels</b><small>Confidence walks, posing, and beginner-friendly choreography.</small></span></label><label><input type="radio" name="partyType" value="Lap/Chair" required /><span><b>Lap/Chair</b><small>Chair choreography, sensual movement, floorwork, and posing.</small></span></label></div></fieldset><div className="form-grid"><label>Preferred date<input name="preferredDate" type="date" required /></label><label>Preferred time<input name="preferredTime" type="time" required /></label><label>Party package<select name="partyPackage" required defaultValue=""><option value="" disabled>Select a package</option><option>Intro Party</option><option>Signature Party</option><option>VIP Party</option></select></label><label>Guest count<input name="guestCount" type="number" min="2" max="60" required /></label><label>Occasion<select name="occasion" required defaultValue=""><option value="" disabled>Select one</option><option>Bachelorette</option><option>Birthday</option><option>Girls Night Out</option><option>Other</option></select></label><label>Is everyone 21+?<select name="allGuests21" required defaultValue=""><option value="" disabled>Select one</option><option value="true">Yes</option><option value="false">No</option></select></label><label>Bringing food or drinks?<select name="bringingFoodDrinks" required defaultValue=""><option value="" disabled>Select one</option><option value="true">Yes</option><option value="false">No</option></select></label></div></div>
        <div className="form-section"><span>03</span><h2>Add your extras</h2><div className="check-grid">{addOns.map(item => <label className="check" key={item}><input type="checkbox" name="addOns" value={item} /><span>{item}</span></label>)}</div><label>Anything else we should know?<textarea name="message" rows={5} maxLength={3000} placeholder="Theme, accessibility needs, special requests, or questions…" /></label></div>
        <div className="form-section acknowledgments"><span>04</span><h2>Good to know</h2><label className="check"><input type="checkbox" name="alcoholAcknowledged" required /><span>I understand that guests under 21 may not be served or consume alcohol.</span></label><label className="check"><input type="checkbox" name="safetyAcknowledged" required /><span>I&apos;ll tell guests not to apply lotions, oils, or greasy products before class so the poles and floor remain safe.</span></label></div>
        {status === "sent" && <p className="form-success" role="status">Your request is in! We&apos;ll follow up using your preferred contact method.</p>}{status === "error" && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary form-submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send party request"} <span>→</span></button>
      </form>
    </section>
  </main>;
}
