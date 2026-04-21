import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-restaurant.jpg";
import outdoorImg from "@/assets/outdoor-seating.jpg";
import familyImg from "@/assets/family-dining.jpg";
import kitchenImg from "@/assets/open-kitchen.jpg";
import { Users, ChefHat, Sparkles, Leaf, Heart, Shield, Award, Clock } from "lucide-react";

const values = [
  { icon: Heart, title: "Cozy Ambiance", desc: "Warm lighting and comfortable seating that feels like home." },
  { icon: Users, title: "Family-Friendly", desc: "Spacious layout designed for gatherings of every size." },
  { icon: ChefHat, title: "Open Kitchen", desc: "Watch our chefs craft your meal with care and precision." },
  { icon: Leaf, title: "Indoor + Outdoor", desc: "Pool-side outdoor seating or air-conditioned indoor dining." },
  { icon: Shield, title: "Hygienic Standards", desc: "Spotless kitchen and rigorous food-safety practices." },
  { icon: Sparkles, title: "Photo-Friendly", desc: "Instagram-worthy spaces curated for memorable moments." },
];

const stats = [
  { value: "8+", label: "Years of Service" },
  { value: "50K+", label: "Happy Guests" },
  { value: "100+", label: "Menu Items" },
  { value: "4.8★", label: "Avg. Rating" },
];

const milestones = [
  { year: "2017", title: "Our Beginning", desc: "Friends Square opened its doors in Dinajpur with a simple vision — quality food, warm hospitality." },
  { year: "2019", title: "Outdoor Expansion", desc: "Added our signature pool-side dining area for a unique open-air experience." },
  { year: "2022", title: "Menu Evolution", desc: "Expanded to over 100 dishes spanning Bangladeshi, Thai, Chinese, Italian and Continental cuisines." },
  { year: "2024", title: "Modern Era", desc: "Launched online ordering, table reservations and event hosting — all powered by WhatsApp." },
];

const AboutPage = () => (
  <div className="pt-16 md:pt-20 pb-24 md:pb-12">
    {/* Hero */}
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
      <img src={heroImg} alt="Friends Square Restaurant interior" className="w-full h-full object-cover" />
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 flex items-end pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="chip bg-warm-gold/90 text-deep-brown mb-4">Est. 2017 · Dinajpur</span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-cream max-w-3xl leading-tight">
              Where every meal feels like <em className="text-warm-gold not-italic">coming home</em>.
            </h1>
            <p className="text-cream/80 text-lg mt-4 max-w-xl">A modern dining destination crafted around food, family and friendship.</p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stats strip */}
    <section className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
            <div className="font-heading text-3xl md:text-5xl font-semibold">{s.value}</div>
            <div className="text-sm md:text-base opacity-80 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Story */}
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
          <img src={kitchenImg} alt="Open kitchen at Friends Square" className="w-full h-full object-cover aspect-[4/5]" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="chip bg-secondary text-primary mb-4">Our Story</span>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-6 leading-tight">A neighborhood favorite, rooted in <em className="text-primary not-italic">Dinajpur</em>.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Friends Square Restaurant was born from a simple belief — that good food brings people closer. From the moment you step in, warm lighting, friendly faces and the aroma of freshly prepared dishes welcome you.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Our menu blends authentic Bangladeshi flavors with international favorites — Thai, Chinese, Italian and Continental — all crafted in our open kitchen using fresh, locally sourced ingredients.
          </p>
          <div className="flex gap-3">
            <Link to="/menu" className="btn-primary px-6 py-3 inline-flex items-center gap-2">Explore Menu</Link>
            <Link to="/reservation" className="btn-outline px-6 py-3 inline-flex items-center gap-2">Book a Table</Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-secondary/40 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="chip bg-primary/10 text-primary mb-3">What Sets Us Apart</span>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold">The Friends Square promise</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-card rounded-3xl p-7 hover-lift border border-border">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-14">
        <span className="chip bg-primary/10 text-primary mb-3">Our Journey</span>
        <h2 className="font-heading text-3xl md:text-5xl font-semibold">Milestones that shaped us</h2>
      </div>
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2 hidden sm:block" />
        {milestones.map((m, i) => (
          <motion.div key={m.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`relative flex gap-5 mb-10 ${i % 2 ? "sm:flex-row-reverse sm:text-right" : ""}`}>
            <div className="shrink-0 sm:w-1/2 flex sm:justify-end">
              <div className={`bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)] sm:max-w-sm ${i % 2 ? "sm:mr-8" : "sm:ml-8"}`}>
                <div className="font-heading text-3xl font-semibold text-primary">{m.year}</div>
                <h3 className="font-heading text-xl font-semibold mt-1 mb-2">{m.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </div>
            </div>
            <div className="hidden sm:block sm:w-1/2" />
            <div className="absolute left-6 sm:left-1/2 top-6 w-3 h-3 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background" />
          </motion.div>
        ))}
      </div>
    </section>

    {/* Gallery preview */}
    <section className="container mx-auto px-4 pb-16">
      <div className="grid md:grid-cols-2 gap-5">
        {[
          { img: outdoorImg, title: "Pool-side outdoor seating", sub: "Relax under the open sky" },
          { img: familyImg, title: "Spacious family dining", sub: "Built for gatherings, big or small" },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden group aspect-[4/3]">
            <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 gradient-hero" />
            <div className="absolute bottom-6 left-6 right-6 text-cream">
              <h3 className="font-heading text-2xl font-semibold">{item.title}</h3>
              <p className="text-cream/80 text-sm mt-1">{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="container mx-auto px-4">
      <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-10 md:p-16 text-primary-foreground text-center">
        <Award className="w-12 h-12 mx-auto mb-4 opacity-90" />
        <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-3">Come dine with us</h2>
        <p className="opacity-90 max-w-xl mx-auto mb-6">Reserve a table or order online — we can't wait to welcome you.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/reservation" className="bg-cream text-primary px-7 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform">
            <Clock className="w-4 h-4" /> Book a Table
          </Link>
          <Link to="/menu" className="bg-deep-brown/30 text-cream border border-cream/30 px-7 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-deep-brown/50 transition-colors">
            View Menu
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
