import React, { useMemo, useState } from "react";

/**
 * OTG Fitness — Webster
 * Modern, conversion‑focused single‑file React app
 * - TailwindCSS utility classes (assumes Tailwind present in host)
 * - Sticky nav, gradient hero, trust/social proof, coaches, FAQs, map, footer
 * - Dedicated Pricing page with monthly/annual toggle, add‑ons, comparison table
 * - Edit PRICING_DATA below to adjust plans quickly
 *
 * Notes:
 * • Images are placeholders; replace src with local assets or brand shots.
 * • Colors chosen for energy & contrast; tweak the tailwind classes to match brand.
 */

// ======= Quick knobs (edit these for fast customization) =======
const BRAND = {
  name: "OTG Fitness",
  city: "Webster",
  address1: "100 E Nasa Pkwy #15",
  address2: "Webster, TX 77598",
  phone: "(281) 688-1191",
  accent: "from-orange-500 via-rose-500 to-fuchsia-500", // hero gradient
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "pricing", label: "Pricing" },
  { id: "coaches", label: "Coaches" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

// Pricing copy references: site mentions PT sessions ~ $40; keep plans as editable examples.
const PRICING_DATA = {
  currency: "$",
  sessionFrom: 40, // "from $40/session" — adjust to your current offer
  // plan price is per month; annual displays 2 months free (configurable)
  annualDiscountMonthsFree: 2,
  plans: [
    {
      key: "starter",
      name: "Kickstart",
      blurb: "2 guided sessions / week + app booking",
      monthly: 199,
      features: [
        "2× semi‑private sessions / week",
        "Movement screen + goal plan",
        "Coach accountability check‑ins",
        "Member app for booking & tips",
      ],
      cta: "Start Free Intro",
      popular: false,
    },
    {
      key: "standard",
      name: "Momentum",
      blurb: "3 guided sessions / week — best for visible progress",
      monthly: 269,
      features: [
        "3× semi‑private sessions / week",
        "Personalized progression plan",
        "Form coaching each session",
        "Habit & recovery guidance",
      ],
      cta: "Build Momentum",
      popular: true,
    },
    {
      key: "elite",
      name: "Elite",
      blurb: "Unlimited semi‑private + monthly 1:1 progression",
      monthly: 349,
      features: [
        "Unlimited semi‑private training",
        "Monthly 1:1 coach review",
        "Priority time slots",
        "Guest pass (2× / mo)",
      ],
      cta: "Go Elite",
      popular: false,
    },
    {
      key: "personal",
      name: "Personal Training",
      blurb: "1:1 coaching — fully bespoke programming",
      monthly: 0, // display per‑session pricing instead
      perSessionFrom: 40,
      features: [
        "One‑on‑one 60‑min sessions",
        "Custom program + progress tracking",
        "Flexible scheduling",
        "Add nutrition coaching (optional)",
      ],
      cta: "Book Free Consult",
      popular: false,
    },
  ],
  addOns: [
    {
      name: "Nutrition Coaching",
      price: 99,
      details: [
        "Macro targets & habits",
        "Monthly check‑ins",
        "Recipe + grocery guides",
      ],
    },
    {
      name: "Recovery Pack",
      price: 39,
      details: ["Mobility flows", "Guided breathwork", "Companion app access"],
    },
  ],
  comparison: {
    rows: [
      { label: "Semi‑private sessions", starter: "2/wk", standard: "3/wk", elite: "Unlimited" },
      { label: "Coach accountability", starter: "✓", standard: "✓", elite: "✓" },
      { label: "Monthly 1:1 review", starter: "—", standard: "—", elite: "✓" },
      { label: "Priority time slots", starter: "—", standard: "—", elite: "✓" },
      { label: "Guest pass", starter: "—", standard: "—", elite: "2×/mo" },
    ],
  },
};

function classNames(...a) {
  return a.filter(Boolean).join(" ");
}

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
    {children}
  </span>
);

const Section = ({ id, eyebrow, title, lead, children }) => (
  <section id={id} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    {eyebrow && (
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/70">
        {eyebrow}
      </p>
    )}
    {title && (
      <h2 className="text-3xl/tight font-semibold text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
    )}
    {lead && (
      <p className="mt-4 max-w-2xl text-base/7 text-white/80">{lead}</p>
    )}
    <div className="mt-10">{children}</div>
  </section>
);

const Nav = ({ active, onNavigate }) => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-fuchsia-600" />
          <div className="text-sm font-semibold tracking-wide text-white/90">
            {BRAND.name} <span className="text-white/60">— {BRAND.city}</span>
          </div>
        </div>
        <nav className="hidden gap-6 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onNavigate(n.id)}
              className={classNames(
                "text-sm font-medium transition",
                active === n.id ? "text-white" : "text-white/70 hover:text-white"
              )}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="#contact" onClick={() => onNavigate("contact")} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:shadow-md">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onNavigate }) => (
  <header className="relative overflow-hidden bg-neutral-950">
    <div className={classNames("absolute inset-0 -z-10 bg-gradient-to-br opacity-40", BRAND.accent)} />
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-28 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
      <div className="max-w-2xl text-center lg:text-left">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
          <Pill>Simple</Pill>
          <Pill>Fun</Pill>
          <Pill>Effective</Pill>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Where <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Strength</span>
          {" "}Meets Community
        </h1>
        <p className="mt-5 text-balance text-base/7 text-white/85 sm:text-lg/8">
          Join a coached, small‑group training experience that’s tailored to your goals and schedule. Real coaches, real progress, welcoming vibe.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
          <button onClick={() => onNavigate("pricing")} className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow hover:shadow-lg sm:w-auto">
            View Pricing
          </button>
          <a href="#contact" onClick={() => onNavigate("contact")} className="w-full rounded-xl border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 sm:w-auto">
            Book Free Intro
          </a>
        </div>
        <p className="mt-3 text-xs text-white/70">Personal training from {PRICING_DATA.currency}{PRICING_DATA.sessionFrom}/session</p>
      </div>
      <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl sm:h-96">
        <img
          alt="Training at OTG Fitness Webster"
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </div>
  </header>
);

const FeatureCard = ({ title, body, icon }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:translate-y-[-2px] hover:shadow-md">
    <div className="mb-4 h-10 w-10 rounded-xl bg-white/10" />
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-white/80">{body}</p>
  </div>
);

const Features = () => (
  <Section
    id="features"
    eyebrow="Why OTG"
    title="Train smarter with real coaches"
    lead="Skip the guesswork. Get a plan, accountability, and a supportive crew."
  >
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <FeatureCard title="Coached Sessions" body="Every session is guided, scaled to your level, and focused on measurable progress." />
      <FeatureCard title="Small Groups" body="Semi‑private format (up to 4) gives you attention + energy without the crowd." />
      <FeatureCard title="Holistic Approach" body="Programming, recovery tips, and optional nutrition coaching to support your goals." />
      <FeatureCard title="Easy Booking" body="Reserve spots easily in the member app. Show up, work hard, feel great." />
    </div>
  </Section>
);

const Testimonial = ({ name, quote }) => (
  <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
    <blockquote className="text-white/90">“{quote}”</blockquote>
    <figcaption className="mt-4 text-sm text-white/70">— {name}</figcaption>
  </figure>
);

const SocialProof = () => (
  <Section id="reviews" eyebrow="Real results" title="Members who started just like you">
    <div className="grid gap-6 md:grid-cols-2">
      <Testimonial name="Amanda D." quote="The trainers are motivating and invested in your whole well‑being. It truly feels like family." />
      <Testimonial name="Vicki A." quote="Great variety, awesome coaches, and we actually look forward to going. Highly recommend." />
      <Testimonial name="Meg C." quote="I started as a beginner and felt comfortable on day one. Staff is amazing and knowledgeable." />
      <Testimonial name="Tamer" quote="Workouts tailored to my level with consistent guidance. Scheduling keeps me showing up!" />
    </div>
  </Section>
);

const CoachCard = ({ name, role, bio, img }) => (
  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm">
    <img src={img} alt={name} className="h-56 w-full object-cover" />
    <div className="space-y-2 p-6">
      <p className="text-xs uppercase tracking-widest text-white/60">{role}</p>
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="text-sm text-white/80">{bio}</p>
    </div>
  </div>
);

const Coaches = () => (
  <Section id="coaches" eyebrow="Meet the team" title="Coaches who care about your progress">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CoachCard
        name="Sarah"
        role="Trainer"
        bio="Positive and encouraging — helps clients unlock confidence through consistent wins."
        img="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1400&auto=format&fit=crop"
      />
      <CoachCard
        name="Ian"
        role="Trainer"
        bio="Powerlifting background with a holistic approach — mind & body working together."
        img="https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1400&auto=format&fit=crop"
      />
      <CoachCard
        name="Justin"
        role="Fitness Director"
        bio="Army‑forged work ethic. Results‑oriented programming tailored to your milestones."
        img="https://images.unsplash.com/photo-1544211412-d8d6dbe0a43e?q=80&w=1400&auto=format&fit=crop"
      />
      <CoachCard
        name="Denver"
        role="New Client Specialist"
        bio="Guides you from day 1 with hospitality and clear steps toward a sustainable lifestyle."
        img="https://images.unsplash.com/photo-1520974741279-4e2a56b3c2b4?q=80&w=1400&auto=format&fit=crop"
      />
    </div>
  </Section>
);

const FAQ = () => (
  <Section
    id="faq"
    eyebrow="FAQ"
    title="Got questions? We've got answers."
    lead="If you’re unsure where to start, book a free intro — we’ll map it out together."
  >
    <div className="grid gap-6 md:grid-cols-2">
      {[
        {
          q: "How do I get started?",
          a: "Click any ‘Book Free Intro’ button to schedule a quick call + gym tour and meet our coaches.",
        },
        {
          q: "Do I need experience?",
          a: "Nope. We scale every workout to your level and focus on safe, steady progress.",
        },
        {
          q: "Do you help with nutrition & recovery?",
          a: "Yes. Add nutrition coaching for targets, habits, and monthly check‑ins; we also share recovery guidance.",
        },
        {
          q: "How many days a week should I come?",
          a: "3×/week is a great start for visible results. Consistency is the secret sauce.",
        },
      ].map((f) => (
        <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h4 className="text-base font-semibold text-white">{f.q}</h4>
          <p className="mt-2 text-sm text-white/80">{f.a}</p>
        </div>
      ))}
    </div>
  </Section>
);

function useAnnualPrice(monthly) {
  const monthsFree = PRICING_DATA.annualDiscountMonthsFree;
  return useMemo(() => {
    if (!monthly) return 0;
    // 12 months, monthsFree free
    const chargedMonths = Math.max(0, 12 - monthsFree);
    return chargedMonths * monthly;
  }, [monthly]);
}

const PricingCard = ({ plan, billing, currency }) => {
  const isAnnual = billing === "annual";
  const annualPrice = useAnnualPrice(plan.monthly);
  const hasPerSession = typeof plan.perSessionFrom === "number" && plan.perSessionFrom > 0;
  const priceDisplay = hasPerSession
    ? (
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-semibold text-white">{currency}{plan.perSessionFrom}</span>
          <span className="text-sm text-white/70">/session</span>
        </div>
      )
    : isAnnual
    ? (
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-white">{currency}{annualPrice}</span>
            <span className="text-sm text-white/70">/year</span>
          </div>
          <p className="text-xs text-white/60">({PRICING_DATA.annualDiscountMonthsFree} months free)</p>
        </div>
      )
    : (
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-semibold text-white">{currency}{plan.monthly}</span>
          <span className="text-sm text-white/70">/month</span>
        </div>
      );

  return (
    <div className={classNames(
      "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/5 p-6 shadow-sm",
      plan.popular ? "border-white/30" : "border-white/10"
    )}>
      {plan.popular && (
        <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
        <p className="text-sm text-white/70">{plan.blurb}</p>
      </div>
      <div className="mt-5">{priceDisplay}</div>
      <ul className="mt-5 space-y-2 text-sm text-white/80">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/70" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a href="#contact" className="inline-flex w-full justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900">
          {plan.cta}
        </a>
      </div>
      {hasPerSession && (
        <p className="mt-3 text-xs text-white/60">Personal training from {currency}{plan.perSessionFrom}/session</p>
      )}
    </div>
  );
};

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");
  const { currency, plans, addOns, comparison } = PRICING_DATA;

  return (
    <Section
      id="pricing"
      eyebrow="Memberships"
      title="Simple plans. Real coaching."
      lead="Choose the structure that matches your schedule — upgrade any time."
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-white/70">
          Personal training from {currency}
          {PRICING_DATA.sessionFrom}/session. Cancel or pause any time.
        </p>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1 text-sm text-white/80">
          <button
            onClick={() => setBilling("monthly")}
            className={classNames(
              "rounded-lg px-3 py-1",
              billing === "monthly" ? "bg-white text-neutral-900" : ""
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={classNames(
              "rounded-lg px-3 py-1",
              billing === "annual" ? "bg-white text-neutral-900" : ""
            )}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <PricingCard key={p.key} plan={p} billing={billing} currency={currency} />
        ))}
      </div>

      {/* Add‑ons */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-white">Add‑ons</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {addOns.map((a) => (
            <div key={a.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <p className="text-white">{a.name}</p>
                <p className="text-sm text-white/80">{currency}{a.price}/mo</p>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-white/80">
                {a.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-white/80">
            <tr>
              <th className="px-4 py-3">What’s included</th>
              <th className="px-4 py-3">Kickstart</th>
              <th className="px-4 py-3">Momentum</th>
              <th className="px-4 py-3">Elite</th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((r) => (
              <tr key={r.label} className="odd:bg-white/[0.03]">
                <td className="px-4 py-3 text-white/80">{r.label}</td>
                <td className="px-4 py-3 text-white">{r.starter}</td>
                <td className="px-4 py-3 text-white">{r.standard}</td>
                <td className="px-4 py-3 text-white">{r.elite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <a href="#contact" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900">Book Free Intro</a>
        <p className="text-xs text-white/60">No high‑pressure sales — just clarity on the best fit for your goals.</p>
      </div>
    </Section>
  );
};

const Contact = () => (
  <Section id="contact" eyebrow="Contact" title="Get started — free intro call">
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 gap-4">
          <input className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 outline-none" placeholder="Full name" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 outline-none" placeholder="Email" />
            <input className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 outline-none" placeholder="Phone" />
          </div>
          <textarea className="min-h-28 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 outline-none" placeholder="Your goals (optional)" />
          <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900">Schedule Intro</button>
          <p className="text-xs text-white/60">Or call {BRAND.phone}</p>
        </form>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h4 className="text-base font-semibold text-white">Visit us</h4>
          <p className="mt-1 text-sm text-white/80">{BRAND.address1}<br />{BRAND.address2}</p>
          <p className="mt-3 text-sm text-white/80">Phone: {BRAND.phone}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Map"
            className="h-72 w-full"
            loading="lazy"
            src="https://www.google.com/maps?q=100%20E%20Nasa%20Pkwy%20%2315%2C%20Webster%2C%20TX%2077598&output=embed"
          />
        </div>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="border-t border-white/10 bg-neutral-950/90">
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-400 to-fuchsia-600" />
            <span className="text-sm font-semibold text-white/90">{BRAND.name} — {BRAND.city}</span>
          </div>
          <p className="text-sm text-white/70">Where strength meets community. Real coaching, real progress.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Explore</p>
          <ul className="mt-2 space-y-2 text-sm text-white/70">
            <li><a href="#home">Home</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#coaches">Coaches</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <p className="mt-2 text-sm text-white/70">{BRAND.address1}<br />{BRAND.address2}<br />{BRAND.phone}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Follow</p>
          <div className="mt-2 flex gap-3 text-white/70">
            <a href="#" aria-label="Facebook" className="underline-offset-4 hover:underline">Facebook</a>
            <a href="#" aria-label="Instagram" className="underline-offset-4 hover:underline">Instagram</a>
            <a href="#" aria-label="YouTube" className="underline-offset-4 hover:underline">YouTube</a>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
    </div>
  </footer>
);

export default function App() {
  const [active, setActive] = useState("home");
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Nav active={active} onNavigate={setActive} />
      {active === "home" && (
        <>
          <Hero onNavigate={setActive} />
          <Features />
          <SocialProof />
          <Coaches />
          <Pricing />
          <FAQ />
          <Contact />
          <Footer />
        </>
      )}
      {active === "pricing" && (
        <>
          <Hero onNavigate={setActive} />
          <Pricing />
          <FAQ />
          <Contact />
          <Footer />
        </>
      )}
      {active === "coaches" && (
        <>
          <Hero onNavigate={setActive} />
          <Coaches />
          <FAQ />
          <Contact />
          <Footer />
        </>
      )}
      {active === "faq" && (
        <>
          <Hero onNavigate={setActive} />
          <FAQ />
          <Contact />
          <Footer />
        </>
      )}
      {active === "contact" && (
        <>
          <Hero onNavigate={setActive} />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}
