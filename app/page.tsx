const departments = [
  ["01", "Pole Fitness", "Build strength and embrace your power.", "Explore pole →"],
  ["02", "Heels Choreography", "Walk in confidence. Own the room.", "Explore heels →"],
  ["03", "Lap & Chair", "Seductive, fierce, unapologetic.", "Explore chair →"],
  ["04", "Floorwork", "Flow, express, feel the power.", "Explore floorwork →"],
  ["05", "Flex Appeal", "Lengthen and strengthen your dance body.", "Explore flexibility →"],
];

const scheduleUrl = "https://www.thekkc.net/schedule";

const plans = [
  { slug: "starter" as const, name: "Femme Starter Membership", buttonLabel: "Choose Starter", price: "$79", detail: "4 classes / month", perks: ["Four classes each month", "Easy online booking", "Cancel anytime"] },
  { slug: "enthusiast" as const, name: "Femme Enthusiast Membership", buttonLabel: "Choose Enthusiast", price: "$119", detail: "8 classes / month", perks: ["Eight classes each month", "10% off Femme merch", "Priority waitlist access"] },
  { slug: "unlimited-vip" as const, name: "Femme Unlimited VIP Membership", buttonLabel: "Choose Unlimited VIP", price: "$149", detail: "Unlimited classes", perks: ["Unlimited studio classes", "Member-only events", "10% off Femme merch"], vip: true },
];

const instructors = [
  { number: "01", name: "Krystal P.", role: "Founder + Instructor", portrait: "p-one", detail: "Pole · Heels · Floorwork" },
  { number: "02", name: "Your Name Here", role: "Future Pole Instructor", portrait: "p-two", detail: "Strength · Spins · Confidence", placeholder: true },
  { number: "03", name: "Your Name Here", role: "Future Heels Instructor", portrait: "p-three", detail: "Choreo · Strut · Expression", placeholder: true },
  { number: "04", name: "Your Name Here", role: "Future Floorwork Instructor", portrait: "p-four", detail: "Flow · Mobility · Feel-good movement", placeholder: true },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav container" aria-label="Main navigation">
          <a className="brand" href="#top"><span>FEMME</span> KOLLECTIVE</a>
          <div className="nav-links"><a href="#classes">Classes</a><a href="#membership">Membership</a><a href="#parties">Private parties</a></div>
          <a className="nav-cta" href="#classes">View classes <span>↗</span></a>
        </nav>
        <div className="hero-glow" />
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-content container">
          <p className="eyebrow"><i /> A women-centered movement studio · Dallas</p>
          <h1>Reclaim your<br /><em>confidence.</em></h1>
          <p className="hero-copy">Reconnect with your flow through pole, heels, and sensual movement in a space made for every version of you.</p>
          <div className="hero-actions"><a className="button button-primary" href="#membership">Claim 3 classes for $39 <span>→</span></a><a className="button button-ghost" href="#classes">View class schedule</a></div>
          <div className="hero-foot"><div className="avatars"><b>J</b><b>M</b><b>A</b><b>S</b></div><p><strong>500+ women</strong> moving with us in Dallas</p></div>
        </div>
        <div className="hero-side-note">move like you mean it <span>✦</span></div>
        <div className="scroll-cue">Scroll to discover <span>↓</span></div>
      </section>

      <section className="testimonials" aria-label="Student testimonials">
        <div className="container"><p className="eyebrow red"><i /> The Femme feeling</p><div className="section-heading"><h2>“I finally found<br />my <em>tribe.</em>”</h2><p>More than a class. A room full of women who get it.</p></div></div>
        <div className="quote-track">
          <article className="quote-card"><div className="quote-mark">“</div><p>I walked in nervous and left feeling like I could take up all the space I need.</p><footer><span className="mini-avatar">T</span><b>Tayla R.</b><small>· Femme since 2023</small></footer></article>
          <article className="quote-card featured"><div className="quote-mark">“</div><p>Every class reminds me that strong, soft, and sexy can all be mine at once.</p><footer><span className="mini-avatar">N</span><b>Nia B.</b><small>· Heels student</small></footer></article>
          <article className="quote-card"><div className="quote-mark">“</div><p>Femme is the one appointment on my calendar that is only, fully for me.</p><footer><span className="mini-avatar">K</span><b>Kara J.</b><small>· Femme since 2024</small></footer></article>
        </div>
      </section>

      <section className="departments container" id="classes">
        <div className="section-heading split"><div><p className="eyebrow red"><i /> Find your flow</p><h2>Your movement,<br /><em>your rules.</em></h2></div><p>Come exactly as you are. Leave with a little more of yourself.</p></div>
        <div className="department-grid">{departments.map(([number, title, copy, link], index) => <article className={`department-card card-${index + 1}`} key={title}><span className="card-number">{number}</span><div className="card-overlay" /><div className="department-copy"><h3>{title}</h3><p>{copy}</p><a href="#membership">{link}</a></div><span className="card-spark">✦</span></article>)}</div>
        <div className="schedule-callout"><span className="circle-arrow">↗</span><p>Not sure where to start? <strong>Find the class that fits your energy.</strong></p><a href="#membership">Choose your pass</a></div>
      </section>

      <section className="pricing" id="membership"><div className="container"><div className="pricing-top"><div><p className="eyebrow red"><i /> Come as you are</p><h2>Start your<br /><em>Femme era.</em></h2></div><p>Choose the rhythm that feels right. No contracts. Just your next move.</p></div>
        <div className="intro-offer"><div className="best-ribbon">BEST VALUE</div><div><p className="eyebrow">Your first step</p><h3>Femme First Timer<br />Special</h3><p className="offer-copy">Three classes. Two weeks.<br />One very good decision.</p></div><div className="offer-price"><small>One-time</small><b>$39</b><small>Valid for 14 days</small></div><CheckoutButton className="button button-light" plan="first-timer">Buy First Timer Special <span>→</span></CheckoutButton></div>
        <div className="plan-grid">{plans.map((plan) => <article className={`plan ${plan.vip ? "vip" : ""}`} key={plan.name}>{plan.vip && <div className="vip-label">✦ MOST FEMME</div>}<p className="plan-name">{plan.name}</p><p className="plan-price">{plan.price}<small>/mo</small></p><p className="plan-detail">{plan.detail}</p><ul>{plan.perks.map((perk) => <li key={perk}><span>✓</span>{perk}</li>)}</ul><CheckoutButton plan={plan.slug} className="plan-link">{plan.buttonLabel} <span>→</span></CheckoutButton></article>)}</div>
        <p className="drop-in">Femme Single Class Drop-In: <strong>$30 / class</strong> <CheckoutButton plan="drop-in">Buy a single class →</CheckoutButton></p>
        <p className="pricing-schedule">Already have classes? <a href={scheduleUrl} target="_top">Book from the live calendar →</a></p>
      </div></section>

      <section className="parties" id="parties"><div className="party-visual"><div className="party-arch" /><p>THE NIGHT<br />IS <em>YOURS.</em></p></div><div className="party-copy"><p className="eyebrow red"><i /> Private experiences</p><h2>Celebrate with<br />the <em>Kollective.</em></h2><p>Turn up the music and bring your people. From bachelorettes to birthdays to the girls&apos; night you&apos;ve been trying to plan, we&apos;ll make it a whole moment.</p><div className="party-tags"><span>Bachelorette</span><span>Birthday</span><span>Girls&apos; night out</span></div><a href="mailto:thekkc.net@gmail.com?subject=Femme%20Private%20Party" className="button button-primary">Inquire about a party <span>→</span></a></div></section>

      <section className="instructors container"><div className="section-heading split"><div><p className="eyebrow red"><i /> Your hype women</p><h2>Meet the women<br />behind the <em>magic.</em></h2></div><p>A growing team of devoted teachers and your biggest fans from the very first eight count.</p></div><div className="instructor-grid">{instructors.map((instructor) => <article className={instructor.placeholder ? "instructor-placeholder" : ""} key={instructor.number}><div className={`portrait ${instructor.portrait}`}><span>{instructor.number}</span>{instructor.placeholder && <div className="placeholder-badge">COMING SOON <b>✦</b></div>}</div><h3>{instructor.name}</h3><p>{instructor.role}</p><small>{instructor.detail}</small></article>)}</div><p className="instructor-note">Building the dream team? <a href="mailto:thekkc.net@gmail.com?subject=Femme%20Instructor%20Inquiry">Ask about teaching at Femme →</a></p></section>

      <section className="faq"><div className="container faq-grid"><div><p className="eyebrow red"><i /> You&apos;re wondering</p><h2>Let&apos;s make<br />this <em>easy.</em></h2><p className="faq-intro">Your only job is to show up. We&apos;ll take care of the rest.</p></div><div className="faq-list"><details open><summary>What do I wear?<span>+</span></summary><p>Wear something you can move in and feel good in. Fitted shorts or leggings and a tee are perfect for your first class. Heels are welcome for heels classes, but never required to start.</p></details><details><summary>Do I need any experience?<span>+</span></summary><p>Absolutely not. Beginner-friendly classes are built for your first spin, first strut, and every brave try in between.</p></details><details><summary>Is Femme for all body types?<span>+</span></summary><p>Yes. Full stop. Femme is designed as a judgment-free room for every body and every starting point.</p></details><details><summary>Where are you located?<span>+</span></summary><p>We&apos;re inside The Kreative Kollective Campus at 8438 Old Hickory Trail, Dallas, TX 75237.</p></details></div></div></section>

      <footer><div className="footer-top container"><div><a className="brand" href="#top"><span>FEMME</span> KOLLECTIVE</a><p>Move. Feel. Become.</p></div><div className="footer-links"><a href="#classes">Classes</a><a href="#membership">Membership</a><a href="#parties">Private parties</a><a href="mailto:thekkc.net@gmail.com">Contact</a></div><div className="footer-contact"><p>8438 Old Hickory Trail<br />Dallas, TX 75237</p><p><a href="mailto:thekkc.net@gmail.com">thekkc.net@gmail.com</a></p></div></div><div className="footer-bottom container"><p>© 2026 Femme Kollective · A Kreative Kollective Campus experience</p><div><a href="#top">Instagram</a><a href="#top">TikTok</a></div></div></footer>
    </main>
  );
}
import { CheckoutButton } from "@/components/checkout-button";
