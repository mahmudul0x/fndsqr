import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cake, Briefcase, Users, Heart, Music, Sparkles, Check, ArrowRight } from "lucide-react";
import eventBirthday from "@/assets/event-birthday.jpg";
import eventCorporate from "@/assets/event-corporate.jpg";
import familyDining from "@/assets/family-dining.jpg";
import outdoorImg from "@/assets/outdoor-seating.jpg";
import heroImg from "@/assets/hero-restaurant.jpg";

const events = [
  { img: eventBirthday, icon: Cake, title: "Birthday Parties", price: "From ৳3,500", desc: "Themed décor, custom cake, special menu and a dedicated host for the day.",
    perks: ["Customized décor", "Birthday cake included", "Photo & video friendly", "Group discounts"] },
  { img: familyDining, icon: Users, title: "Family Gatherings", price: "From ৳2,500", desc: "Spacious layout and a versatile menu that pleases every generation.",
    perks: ["Reserved family section", "Kid-friendly menu", "High chairs available", "Flexible timing"] },
  { img: eventCorporate, icon: Briefcase, title: "Corporate Meetings", price: "From ৳5,000", desc: "Private dining with AV setup, premium catering and professional service.",
    perks: ["Private room", "AV & projector", "Working lunch menus", "Invoice & receipts"] },
  { img: outdoorImg, icon: Heart, title: "Anniversaries & Dates", price: "From ৳2,000", desc: "Pool-side outdoor seating perfect for romantic evenings and milestones.",
    perks: ["Candle-lit setup", "Special dessert", "Floral arrangement", "Couple photography"] },
];

const occasions = [
  { icon: Cake, label: "Birthday" },
  { icon: Heart, label: "Anniversary" },
  { icon: Briefcase, label: "Corporate" },
  { icon: Music, label: "Engagement" },
  { icon: Users, label: "Reunion" },
  { icon: Sparkles, label: "Celebration" },
];

const steps = [
  { n: "01", title: "Tell us your vision", desc: "Share the occasion, date, guest count and any special requests via WhatsApp." },
  { n: "02", title: "We craft your package", desc: "Our team designs a custom menu and décor plan tailored to your event." },
  { n: "03", title: "Confirm & relax", desc: "Lock in your date with a small advance — we handle the rest on the day." },
];

const EventsPage = () => (
  <div className="pt-16 md:pt-20 pb-24 md:pb-12">
    {/* Hero */}
    <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
      <img src={heroImg} alt="Event setup at Friends Square" className="w-full h-full object-cover" />
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="chip bg-warm-gold/90 text-deep-brown mb-4">Events & Celebrations</span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-cream max-w-4xl mx-auto leading-tight">
              Make every moment <em className="text-warm-gold not-italic">unforgettable</em>
            </h1>
            <p className="text-cream/80 text-lg mt-4 max-w-xl mx-auto">From intimate dinners to grand celebrations — we host them all with heart.</p>
            <a href="https://wa.me/8801752441799?text=Hi%20I%20want%20to%20book%20an%20event"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-cream text-primary px-7 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
              Book Your Event <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Occasion icons */}
    <section className="container mx-auto px-4 -mt-12 relative z-10 mb-16">
      <div className="bg-card border border-border rounded-3xl shadow-[var(--shadow-elegant)] p-6 md:p-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">We host all occasions</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {occasions.map((o, i) => (
            <motion.div key={o.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary flex items-center justify-center transition-all">
                <o.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">{o.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Event cards */}
    <section className="container mx-auto px-4 mb-20">
      <div className="text-center mb-10">
        <span className="chip bg-primary/10 text-primary mb-3">Our Packages</span>
        <h2 className="font-heading text-3xl md:text-5xl font-semibold">Curated event experiences</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <motion.div key={event.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-3xl overflow-hidden hover-lift group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={event.img} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 gradient-hero" />
              <div className="absolute top-4 left-4 chip bg-warm-gold text-deep-brown">
                <event.icon className="w-3.5 h-3.5" /> {event.title}
              </div>
              <div className="absolute bottom-4 right-4 bg-cream/95 text-primary px-4 py-2 rounded-full text-sm font-bold">
                {event.price}
              </div>
            </div>
            <div className="p-6 md:p-7">
              <h3 className="font-heading text-2xl font-semibold mb-2">{event.title}</h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{event.desc}</p>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {event.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-foreground">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <a href={`https://wa.me/8801752441799?text=${encodeURIComponent(`Hello, I'd like to book: ${event.title}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 btn-primary px-5 py-3 inline-flex items-center justify-center gap-2 text-sm">
                  Enquire Now
                </a>
                <Link to="/reservation" className="btn-outline px-5 py-3 inline-flex items-center justify-center text-sm">
                  Reserve
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* How it works */}
    <section className="bg-secondary/40 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="chip bg-primary/10 text-primary mb-3">How It Works</span>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold">Booking your event is easy</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-3xl p-7 relative">
              <div className="font-heading text-6xl font-semibold text-primary/15 absolute top-3 right-5">{s.n}</div>
              <h3 className="font-heading text-xl font-semibold mb-2 relative">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="container mx-auto px-4 py-16">
      <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-10 md:p-14 text-primary-foreground text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-3">Let's plan something special</h2>
        <p className="opacity-90 max-w-xl mx-auto mb-7">Reach out today and our events team will design the perfect celebration for you.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://wa.me/8801752441799?text=Hi%20I%20want%20to%20book%20an%20event"
            target="_blank" rel="noopener noreferrer"
            className="bg-cream text-primary px-7 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform">
            Chat on WhatsApp <ArrowRight className="w-4 h-4" />
          </a>
          <Link to="/contact" className="bg-deep-brown/30 text-cream border border-cream/30 px-7 py-3 rounded-full font-semibold hover:bg-deep-brown/50 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default EventsPage;
