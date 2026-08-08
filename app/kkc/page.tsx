import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Studio, Classes & Event Space in Dallas | The KKC",
  description: "The Kreative Kollective Campus is a South Dallas creative studio for dance classes, studio rentals, private parties, events, and community experiences.",
};

const wix = "https://www.thekkc.net";
const femme = `${wix}/femmekollective`;
const intro = `${wix}/pricing-plans/plan-customization?planId=95589e75-4097-4581-bd41-b97a4bb1dff3&pricingVariantId=16e5871b-5040-445d-a5c9-37207e6155bf`;
const enthusiast = `${wix}/pricing-plans/plan-customization?planId=3cbb67cc-c50e-42dc-9dfd-9deb693f812a&pricingVariantId=c769a879-d33a-4769-9b6b-aba11ebd5003`;
const vip = `${wix}/pricing-plans/plan-customization?planId=09435e6b-6126-47a4-abcb-389e99b1ec21&pricingVariantId=42ee0218-673f-4acf-a661-248a7f14bde3`;

const paths = [
  { n: "01", title: "Femme Kollective", copy: "Women’s pole, heels, floorwork, flexibility and movement classes for beginners through experienced dancers.", cta: "View Classes", href: femme, image: "/femme-header-clean.png" },
  { n: "02", title: "Studio Rentals", copy: "Flexible studio space for rehearsals, classes, content creation, photography and creative projects.", cta: "Rent The Studio", href: `${wix}/studio-rental`, image: "/flex-appeal.png" },
  { n: "03", title: "Parties & Private Experiences", copy: "Celebrate with pole, heels, chair or lap dance and private group experiences.", cta: "Plan A Party", href: `${femme}#parties`, image: "/lap-chair.png" },
  { n: "04", title: "Events & Creative Space", copy: "Host workshops, pop-ups, private events, community experiences and creative gatherings.", cta: "Host An Event", href: `${wix}/portfolio`, image: "/floorwork.png" },
];

const classes = [
  ["Monday", "6:00 PM", "Absolute Beginner Pole", "First-timer friendly"],
  ["Tuesday", "8:00 PM", "Intro to Heels", "Beginner"],
  ["Wednesday", "7:00 PM", "Floorwork", "All levels"],
  ["Friday", "8:00 PM", "Beginner Heels", "Beginner"],
];

export default function KkcHome() {
  return <main className="kkc-home" id="kkc-top">
    <section className="kkc-hero">
      <nav className="kkc-nav kkc-wrap" aria-label="KKC navigation">
        <a className="kkc-logo" href="#kkc-top" aria-label="The KKC home">THE <b>KKC</b></a>
        <div className="kkc-navlinks"><a href="#kkc-classes">Classes</a><a href="#kkc-rentals">Rentals</a><a href="#kkc-parties">Parties</a><a href="#kkc-about">About</a></div>
        <a className="kkc-btn kkc-btn-small" href={`${wix}/schedule`} target="_top">Book Now</a>
      </nav>
      <div className="kkc-wrap kkc-hero-grid">
        <div><p className="kkc-kicker">A creative campus · South Dallas</p><h1>The Kreative<br />Kollective <em>Campus.</em></h1><p className="kkc-lead">A creative home for movement, events, rentals & experiences in South Dallas.</p><p className="kkc-support">Take a class. Rent the studio. Host your event. Create something here.</p><div className="kkc-actions"><a className="kkc-btn" href="#kkc-paths">Explore The KKC</a><a className="kkc-btn kkc-btn-ghost" href="#kkc-rentals">Book / Rent Now</a></div></div>
        <div className="kkc-hero-photo" role="img" aria-label="Dallas creatives moving and creating at The Kreative Kollective Campus"><span>Move · Create · Celebrate</span></div>
      </div>
    </section>

    <section className="kkc-section kkc-paths" id="kkc-paths"><div className="kkc-wrap"><p className="kkc-kicker">Choose your experience</p><h2>What brings you to <em>KKC?</em></h2><div className="kkc-path-grid">{paths.map(path => <a className="kkc-path" href={path.href} target="_top" key={path.title}><img src={path.image} alt="" loading="lazy"/><span className="kkc-path-shade"/><small>{path.n}</small><div><h3>{path.title}</h3><p>{path.copy}</p><b>{path.cta} →</b></div></a>)}</div></div></section>

    <section className="kkc-section kkc-femme" id="kkc-classes"><div className="kkc-wrap"><div className="kkc-split"><div><p className="kkc-kicker">Femme Kollective</p><h2>Find your Femme.<br /><em>Find your movement.</em></h2></div><p>Pole. Heels. Floorwork. Flexibility. Confidence. An adult women’s movement community for beginners and experienced dancers alike.</p></div><div className="kkc-offers"><a href={intro} target="_top"><small>New here</small><h3>3 Classes</h3><strong>$39</strong><p>Valid for 14 days</p><b>Start With 3 Classes →</b></a><a className="popular" href={enthusiast} target="_top"><span>Most Popular</span><small>Femme Enthusiast</small><h3>8 Classes / Month</h3><strong>$119<sup>/mo</sup></strong><b>Choose 8 Classes →</b></a><a className="vip" href={vip} target="_top"><small>Femme Unlimited VIP</small><h3>Unlimited Eligible Classes</h3><strong>$149<sup>/mo</sup></strong><b>Go Unlimited →</b></a></div></div></section>

    <section className="kkc-section kkc-classes"><div className="kkc-wrap"><div className="kkc-split"><div><p className="kkc-kicker">Upcoming movement</p><h2>Find your <em>next class.</em></h2></div><a className="kkc-text-link" href={`${wix}/schedule`} target="_top">View Full Schedule →</a></div><div className="kkc-class-grid">{classes.map(([day,time,name,level]) => <a href={`${wix}/schedule`} target="_top" key={name}><small>{day}</small><time>{time}</time><h3>{name}</h3><p>{level} · Membership eligible</p><b>Book Class →</b></a>)}</div></div></section>

    <section className="kkc-section kkc-rentals" id="kkc-rentals"><div className="kkc-wrap kkc-rental-grid"><div><p className="kkc-kicker">Studio rentals</p><h2>Your space.<br /><em>Your vision.</em></h2><p>Need room to rehearse, teach, shoot content or create? Rent private studio space at The KKC by the hour.</p><div className="kkc-tags"><span>Dance Rehearsals</span><span>Classes</span><span>Photography</span><span>Content Creation</span><span>Workshops</span><span>Creative Projects</span></div><a className="kkc-btn" href={`${wix}/studio-rental`} target="_top">View Studio Rentals</a></div><div className="kkc-rental-photo" role="img" aria-label="Flexible Dallas studio rental space"/></div></section>

    <section className="kkc-section kkc-parties" id="kkc-parties"><div className="kkc-wrap kkc-party-grid"><div className="kkc-party-photo" role="img" aria-label="Private dance party experience at Femme Kollective"/><div><p className="kkc-kicker">Private experiences</p><h2>This isn’t your average <em>girls’ night.</em></h2><p>Fun, tasteful, beginner-friendly experiences created for your group.</p><ul><li>Pole Party</li><li>Heels Party</li><li>Chair / Lap Dance Party</li></ul><a className="kkc-btn" href={`${femme}#parties`} target="_top">Plan Your Party</a></div></div></section>

    <section className="kkc-section kkc-about" id="kkc-about"><div className="kkc-wrap"><p className="kkc-kicker">Why KKC</p><h2>More than <em>a studio.</em></h2><p className="kkc-about-copy">The Kreative Kollective Campus gives dancers, instructors, creatives and entrepreneurs a place to move, create, teach and build.</p><div className="kkc-values">{["Creative Space","Community","Flexible Rentals","Classes","Events","Private Experiences"].map((x,i)=><div key={x}><small>0{i+1}</small><b>{x}</b></div>)}</div></div></section>

    <section className="kkc-section kkc-proof"><div className="kkc-wrap"><p className="kkc-kicker">Community first</p><h2>Loved by the <em>Dallas girlies.</em></h2><p className="kkc-proof-note">Real client stories and community moments belong here. Until approved reviews are connected, we’re keeping this space honest—no fabricated testimonials.</p><div className="kkc-gallery"><img src="/pole-fitness.png" alt="Pole fitness class in the Femme studio" loading="lazy"/><img src="/heels-choreography.png" alt="Heels choreography at Femme Kollective" loading="lazy"/><img src="/flex-appeal.png" alt="Flexibility movement class" loading="lazy"/></div></div></section>

    <section className="kkc-section kkc-location"><div className="kkc-wrap kkc-location-grid"><div><p className="kkc-kicker">South Dallas</p><h2>Come create <em>with us.</em></h2></div><div><strong>The Kreative Kollective Campus</strong><address>8438 Old Hickory Trail<br />Dallas, TX 75237</address><div className="kkc-actions"><a className="kkc-btn" href="https://maps.google.com/?q=8438+Old+Hickory+Trail+Dallas+TX+75237" target="_top">Get Directions</a><a className="kkc-btn kkc-btn-ghost" href="mailto:thekkc.net@gmail.com" target="_top">Contact Us</a></div></div></div></section>

    <section className="kkc-final"><div className="kkc-wrap"><p className="kkc-kicker">Your next move starts here</p><h2>There’s a space for you <em>at The KKC.</em></h2><p>Dance here. Create here. Celebrate here.</p><div className="kkc-actions"><a className="kkc-btn" href={femme} target="_top">Take A Class</a><a className="kkc-btn kkc-btn-ghost" href={`${wix}/studio-rental`} target="_top">Rent The Studio</a><a className="kkc-btn kkc-btn-ghost" href={`${femme}#parties`} target="_top">Host Something</a></div></div></section>
    <a className="kkc-mobile-book" href={`${wix}/schedule`} target="_top">Book Now</a>
  </main>;
}
