import { notFound } from "next/navigation";

const scheduleUrl = "https://www.thekkc.net/schedule";

const classes = {
  "pole-fitness": {
    number: "01", name: "Pole Fitness", eyebrow: "Strength meets self-expression", image: "/pole-fitness.png",
    statement: "Build strength. Learn the foundations. Surprise yourself.",
    intro: "Pole Fitness blends full-body conditioning with beginner-friendly pole technique. You’ll learn how to move around the pole with control while building grip, coordination, confidence, and strength at your own pace.",
    learn: ["Foundational grips and pole safety", "Walks, spins, poses, and transitions", "Core, upper-body, and lower-body strength", "Movement combinations that build confidence"],
    flow: ["Mobility-focused warm-up", "Strength and grip preparation", "Step-by-step skill instruction", "A short combination or guided practice", "Cool-down and celebration"],
    wear: "Fitted shorts and a comfortable top are best because skin contact helps you grip the pole. Come without lotion or body oil. Bare feet are perfect for beginner classes.",
    perfect: "You want a fun strength practice, you’re curious about pole, or you’re ready to feel capable in a completely new way.",
    tracks: [
      { name: "Absolute Beginner Pole", level: "Your first pole class", description: "Learn studio safety, basic grips, pole walks, foundational spins, simple poses, and the strength patterns that make every future skill feel more possible.", times: ["Monday · 6:00 PM · 60 min", "Saturday · 10:00 AM · 45 min"] },
      { name: "Advanced Beginner Pole", level: "Build on your foundation", description: "Progress your spins, climbs, holds, transitions, and combinations with more control. Best after you feel comfortable with the Absolute Beginner foundations.", times: ["Monday · 7:00 PM · 60 min", "Saturday · 11:00 AM · 60 min"] },
      { name: "Pole Dance Choreography", level: "Connect skills to music", description: "Turn beginner pole vocabulary into a complete dance experience using transitions, musicality, floor-to-pole movement, and expressive choreography.", times: ["Monday · 8:00 PM · 60 min", "Saturday · 12:00 PM · 60 min"] },
    ],
  },
  "heels-choreography": {
    number: "02", name: "Heels Choreography", eyebrow: "Confidence you can feel", image: "/heels-choreography.png",
    statement: "Walk taller. Move with intention. Own the room.",
    intro: "Heels Choreography is an expressive dance class centered on posture, musicality, clean lines, and confident performance. Choreography is broken down slowly so you can find your style without needing prior dance experience.",
    learn: ["Confidence walks and weight transfers", "Posing, lines, and body awareness", "Beginner-friendly choreography", "Performance quality and musicality"],
    flow: ["Warm-up and ankle preparation", "Walk, posture, and technique drills", "Choreography taught in small sections", "Guided performance rounds", "Stretch and cool-down"],
    wear: "Wear fitted clothing you can move in. Knee pads are strongly recommended. Dance heels are optional unless the class listing says otherwise—socks or clean sneakers work too.",
    perfect: "You want to feel more confident, expressive, and grounded in how you carry yourself on and off the dance floor.",
  },
  "lap-chair": {
    number: "03", name: "Lap & Chair", eyebrow: "Fierce, playful, unapologetic", image: "/lap-chair.png",
    statement: "Make the chair your stage—and the moment completely yours.",
    intro: "Lap & Chair explores chair-based choreography, sensual movement, posing, and lap-dance-inspired technique in a supportive women-centered space. It’s playful, empowering, and always taught with consent and personal comfort in mind.",
    learn: ["Safe chair placement and movement technique", "Chair transitions, poses, and shapes", "Lap-dance-inspired movement vocabulary", "Floorwork accents and confident performance"],
    flow: ["Body-awareness warm-up", "Chair safety and foundation drills", "Movement vocabulary and transitions", "A short expressive routine", "Photo-ready poses and cool-down"],
    wear: "Choose fitted dancewear, leggings, or shorts that make you feel good. Knee pads are helpful. Heels are optional; socks or bare feet are welcome.",
    perfect: "You want to explore sensuality, playfulness, and performance in a private-feeling, judgment-free environment.",
  },
  floorwork: {
    number: "04", name: "Floorwork", eyebrow: "Flow from the ground up", image: "/floorwork.png",
    statement: "Slow down. Connect the movement. Tell your story.",
    intro: "Floorwork teaches you how to transition, roll, pose, and flow close to the ground with intention. The class blends technique, musicality, and expression so movement feels fluid instead of rushed.",
    learn: ["Safe pathways to and from the floor", "Legwork, rolls, body waves, and poses", "Smooth transitions and weight placement", "Musicality and expressive choreography"],
    flow: ["Joint-friendly mobility warm-up", "Foundational floor pathways", "Technique drills on both sides", "A short choreographed sequence", "Stretch and recovery"],
    wear: "Leggings or covered knees, socks, and comfortable fitted layers work best. Knee pads are encouraged, especially while you learn new pathways.",
    perfect: "You love expressive movement, want smoother transitions, or want to feel more connected to your body and the music.",
  },
  "flex-appeal": {
    number: "05", name: "Flex Appeal", eyebrow: "Mobility with intention", image: "/flex-appeal.png",
    statement: "Lengthen, strengthen, and move with more freedom.",
    intro: "Flex Appeal combines active flexibility, mobility, and controlled stretching to help your dance body move with greater ease. You do not need to be flexible to begin—this is where flexibility is built.",
    learn: ["Active and passive flexibility techniques", "Hip, hamstring, back, and shoulder mobility", "Strength for safer range of motion", "Breathing and body awareness"],
    flow: ["Gentle full-body warm-up", "Mobility and activation drills", "Focused flexibility sequences", "Supported progressions for your level", "Restorative cool-down"],
    wear: "Wear stretchy, comfortable layers and bring socks. A yoga mat is helpful when noted on the schedule. No heels or dance experience are needed.",
    perfect: "You want more mobility for dance or daily life, need a recovery-focused class, or think you’re ‘not flexible enough.’",
  },
} as const;

export function generateStaticParams() { return Object.keys(classes).map(slug => ({ slug })); }

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classes[slug as keyof typeof classes];
  if (!item) notFound();
  const otherClasses = Object.entries(classes).filter(([key]) => key !== slug);

  return <main className="class-page">
    <section className="class-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.96) 0%,rgba(0,0,0,.72) 43%,rgba(0,0,0,.16) 100%),url('${item.image}')` }}>
      <nav className="nav container"><a className="brand" href="/"><span>FEMME</span> KOLLECTIVE</a><a className="nav-cta" href="/#classes">All classes <span>↗</span></a></nav>
      <div className="class-hero-copy container"><p className="eyebrow red"><i /> {item.eyebrow}</p><span className="class-number">{item.number}</span><h1>{item.name}</h1><p>{item.statement}</p><div className="hero-actions"><a className="button button-primary" href={scheduleUrl} target="_top">Book this style <span>→</span></a><a className="button button-ghost" href="#expect">What to expect</a></div></div>
    </section>
    <section className="class-intro container" id="expect"><div><p className="eyebrow red"><i /> The experience</p><h2>Come curious.<br /><em>Leave connected.</em></h2></div><p>{item.intro}</p></section>
    <section className="class-details container"><article><span>01</span><h3>What you&apos;ll learn</h3><ul>{item.learn.map(point => <li key={point}>{point}</li>)}</ul></article><article><span>02</span><h3>How class flows</h3><ol>{item.flow.map(point => <li key={point}>{point}</li>)}</ol></article></section>
    {"tracks" in item && <section className="pole-tracks"><div className="container"><div className="section-heading split"><div><p className="eyebrow red"><i /> Choose your pole path</p><h2>Start at your level.<br /><em>Grow from there.</em></h2></div><p>The weekly progression is modeled after the Krysco class rhythm. Times may change, so confirm your spot on the live Wix schedule.</p></div><div className="pole-track-grid">{item.tracks.map((track, index) => <article key={track.name}><span>0{index + 1}</span><small>{track.level}</small><h3>{track.name}</h3><p>{track.description}</p><div>{track.times.map(time => <time key={time}>{time}</time>)}</div><a href={scheduleUrl} target="_top">View live availability →</a></article>)}</div></div></section>}
    <section className="class-prep"><div className="container class-prep-grid"><article><p className="eyebrow red"><i /> What to wear</p><h2>Dress to <em>move.</em></h2><p>{item.wear}</p></article><article><p className="eyebrow red"><i /> This is for you if</p><h2>Start where<br /><em>you are.</em></h2><p>{item.perfect}</p></article></div></section>
    <section className="class-reassurance container"><p>No experience required</p><p>Every body welcome</p><p>Beginner-friendly options</p><p>Judgment-free room</p></section>
    <section className="class-next"><div className="container"><p className="eyebrow red"><i /> Keep exploring</p><h2>Find another <em>flow.</em></h2><div className="class-next-grid">{otherClasses.map(([key, other]) => <a href={`/classes/${key}`} key={key}><small>{other.number}</small><span>{other.name}</span><b>→</b></a>)}</div></div></section>
    <section className="class-book"><div className="container"><div><p className="eyebrow"><i /> Your next move</p><h2>Ready to try<br /><em>{item.name}?</em></h2></div><div><p>Claim the First Timer Special—3 classes for $39, valid for 14 days—and explore the styles that call to you.</p><a className="button button-light" href={scheduleUrl} target="_top">View the Wix schedule <span>→</span></a></div></div></section>
  </main>;
}
