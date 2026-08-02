const departments = [
  ["01", "Pole Fitness", "Build strength and embrace your power.", "Explore pole →"],
  ["02", "Heels Choreography", "Walk in confidence. Own the room.", "Explore heels →"],
  ["03", "Lap & Chair", "Seductive, fierce, unapologetic.", "Explore chair →"],
  ["04", "Floorwork", "Flow, express, feel the power.", "Explore floorwork →"],
  ["05", "Flex Appeal", "Lengthen and strengthen your dance body.", "Explore flexibility →"],
];

const scheduleUrl = "https://www.thekkc.net/schedule";

const plans = [
  { name: "Starter", buttonLabel: "Choose Starter", price: "$79", cadence: "/mo", detail: "4 classes / month", perks: ["Access to eligible Femme classes", "Monthly milestone recognition", "Birthday recognition"] },
  { name: "Enthusiast", buttonLabel: "Choose Enthusiast", price: "$119", cadence: "/mo", detail: "8 classes / month", perks: ["Priority booking", "10% off workshops + merch", "Guest pass every 3 months"] },
  { name: "Unlimited VIP", buttonLabel: "Choose Unlimited VIP", price: "$149", cadence: "/mo", detail: "Unlimited classes", perks: ["Priority booking", "15% off workshops, merch + rentals", "Member-only events + masterclasses"], vip: true },
];

const instructors = [
  { number: "01", name: "Krystal P.", role: "Founder + Instructor", portrait: "p-one", detail: "Pole · Heels · Floorwork" },
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
          <p className="hero-copy">You don&apos;t need experience. You don&apos;t need to be flexible. You just need to show up. Reconnect with your flow through pole, heels, floorwork, and more.</p>
          <div className="hero-actions"><a className="button button-primary" href="#membership">Claim 3 classes for $39 <span>→</span></a><a className="button button-ghost" href="#classes">View class schedule</a></div>
          <div className="hero-foot"><p><strong>No experience required</strong> · Every body welcome · Judgment-free</p></div>
        </div>
        <div className="hero-side-note">move like you mean it <span>✦</span></div>
        <div className="scroll-cue">Scroll to discover <span>↓</span></div>
      </section>

      <section className="testimonials" aria-label="The Femme Kollective promise">
        <div className="container"><p className="eyebrow red"><i /> The Femme feeling</p><div className="section-heading"><h2>You&apos;re not just joining<br />a studio. You&apos;re joining <em>the Kollective.</em></h2><p>Confidence brings you through the door. Sisterhood is why you stay.</p></div>
        <div className="promise-grid"><article><span>01</span><h3>Come as you are.</h3><p>No flexibility, coordination, or dance background required.</p></article><article><span>02</span><h3>Take up space.</h3><p>Learn in a women-centered room built for exploration without judgment.</p></article><article><span>03</span><h3>Leave more you.</h3><p>Build confidence, expression, strength, and real community.</p></article></div></div>
      </section>

      <section className="departments container" id="classes">
        <div className="section-heading split"><div><p className="eyebrow red"><i /> Find your flow</p><h2>Your movement,<br /><em>your rules.</em></h2></div><p>Come exactly as you are. Leave with a little more of yourself.</p></div>
        <div className="department-grid">{departments.map(([number, title, copy, link], index) => <article className={`department-card card-${index + 1}`} key={title}><span className="card-number">{number}</span><div className="card-overlay" /><div className="department-copy"><h3>{title}</h3><p>{copy}</p><a href="#membership">{link}</a></div><span className="card-spark">✦</span></article>)}</div>
        <div className="schedule-callout"><span className="circle-arrow">↗</span><p>Not sure where to start? <strong>Find the class that fits your energy.</strong></p><a href="#membership">Choose your pass</a></div>
      </section>

      <section className="pricing" id="membership"><div className="container"><div className="pricing-top"><div><p className="eyebrow red"><i /> Come as you are</p><h2>Start your<br /><em>Femme era.</em></h2></div><p>Choose the rhythm that feels right. No contracts. Just your next move.</p></div>
        <div className="intro-offer"><div className="best-ribbon">NEW STUDENTS</div><div><p className="eyebrow">Your first step</p><h3>Femme First Timer<br />Special</h3><p className="offer-copy">Three classes. Fourteen days.<br />Explore every side of Femme.</p></div><div className="offer-price"><small>One-time</small><b>$39</b><small>Valid for 14 days</small></div><a className="button button-light" href={scheduleUrl} target="_top">Book Now <span>→</span></a></div>
        <div className="plan-grid">{plans.map((plan) => <article className={`plan ${plan.vip ? "vip" : ""}`} key={plan.name}>{plan.vip && <div className="vip-label">✦ MOST FEMME</div>}<p className="plan-name">{plan.name}</p><p className="plan-price">{plan.price}<small>{plan.cadence}</small></p><p className="plan-detail">{plan.detail}</p><ul>{plan.perks.map((perk) => <li key={perk}><span>✓</span>{perk}</li>)}</ul><a href={scheduleUrl} target="_top" className="plan-link">{plan.buttonLabel} <span>→</span></a></article>)}</div>
        <div className="flex-passes"><article><small>CASUAL PASS</small><h3>Drop-In</h3><strong>$30</strong><p>One eligible Femme class.</p></article><article><small>CLASS PACK</small><h3>3-Class Pack</h3><strong>$49</strong><p>Flexible visits without a membership.</p></article><article><small>CLASS PACK</small><h3>6-Class Pack</h3><strong>$89</strong><p>More movement, more value.</p></article><a href={scheduleUrl} target="_top" className="button button-primary">View booking options <span>→</span></a></div>
        <p className="pricing-schedule">Already have a pass? <a href={scheduleUrl} target="_top">Book from the live Wix calendar →</a></p>
      </div></section>

      <section className="parties" id="parties"><div className="party-visual"><div className="party-arch" /><p>THE NIGHT<br />IS <em>YOURS.</em></p></div><div className="party-copy"><p className="eyebrow red"><i /> Private experiences</p><h2>Celebrate with<br />the <em>Kollective.</em></h2><p>Bachelorettes, birthdays, and girls&apos; nights become a private, beginner-friendly movement experience made for your group.</p><div className="party-packages"><div><b>Intro Party</b><span>$249</span><small>1 hour · up to 8 guests</small></div><div><b>Signature Party</b><span>$399</span><small>1.5 hours · up to 15 guests</small></div><div><b>VIP Party</b><span>$599</span><small>2 hours · up to 20 guests · champagne/mocktails</small></div></div><a href="/parties" className="button button-primary">Start your inquiry <span>→</span></a></div></section>

      <section className="instructors container"><div className="section-heading split"><div><p className="eyebrow red"><i /> Your hype woman</p><h2>Meet the woman<br />behind the <em>magic.</em></h2></div><p>Founder, instructor, and your biggest fan from the very first eight count.</p></div><div className="instructor-grid single">{instructors.map((instructor) => <article key={instructor.number}><div className={`portrait ${instructor.portrait}`}><span>{instructor.number}</span></div><h3>{instructor.name}</h3><p>{instructor.role}</p><small>{instructor.detail}</small></article>)}</div></section>

      <section className="faq"><div className="container faq-grid"><div><p className="eyebrow red"><i /> You&apos;re wondering</p><h2>Let&apos;s make<br />this <em>easy.</em></h2><p className="faq-intro">Your only job is to show up. We&apos;ll take care of the rest.</p></div><div className="faq-list"><details open><summary>What do I wear?<span>+</span></summary><p>Wear something you can move in and feel good in. Fitted shorts or leggings and a tee are perfect for your first class. Heels are welcome for heels classes, but never required to start.</p></details><details><summary>Do I need any experience?<span>+</span></summary><p>Absolutely not. Beginner-friendly classes are built for your first spin, first strut, and every brave try in between.</p></details><details><summary>Is Femme for all body types?<span>+</span></summary><p>Yes. Full stop. Femme is designed as a judgment-free room for every body and every starting point.</p></details><details><summary>Where are you located?<span>+</span></summary><p>We&apos;re inside The Kreative Kollective Campus at 8438 Old Hickory Trail, Dallas, TX 75237.</p></details></div></div></section>

      <footer><div className="footer-top container"><div><a className="brand" href="#top"><span>FEMME</span> KOLLECTIVE</a><p>Move. Feel. Become.</p></div><div className="footer-links"><a href="#classes">Classes</a><a href="#membership">Membership</a><a href="#parties">Private parties</a><a href="mailto:thekkc.net@gmail.com">Contact</a></div><div className="footer-contact"><p>8438 Old Hickory Trail<br />Dallas, TX 75237</p><p><a href="mailto:thekkc.net@gmail.com">thekkc.net@gmail.com</a></p></div></div><div className="footer-bottom container"><p>© 2026 Femme Kollective · A Kreative Kollective Campus experience</p><div><a href="#top">Instagram</a><a href="#top">TikTok</a></div></div></footer>
    </main>
  );
}
