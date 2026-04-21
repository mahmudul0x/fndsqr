import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, MapPin, Clock, MessageCircle, Facebook, Mail, Send, Navigation } from "lucide-react";
import { toast } from "sonner";
import heroImg from "@/assets/hero-restaurant.jpg";

const contactCards = [
  { icon: Phone, title: "Call Us", info: "+880 1752 441799", sub: "Daily 11AM – 11PM", href: "tel:+8801752441799", color: "primary" },
  { icon: MessageCircle, title: "WhatsApp", info: "Quick replies", sub: "Order or reserve instantly", href: "https://wa.me/8801752441799", color: "accent" },
  { icon: MapPin, title: "Visit Us", info: "Nayanpur Rd, Dinajpur", sub: "Bangladesh", href: "https://maps.google.com/?q=Nayanpur+Rd+Dinajpur+Bangladesh", color: "primary" },
  { icon: Clock, title: "Open Hours", info: "11 AM – 11 PM", sub: "Every day of the week", href: undefined, color: "accent" },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hello Friends Square,\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`);
    window.open(`https://wa.me/8801752441799?text=${msg}`, "_blank");
    toast.success("Opening WhatsApp...");
  };

  return (
    <div className="pt-16 md:pt-20 pb-24 md:pb-12">
      {/* Hero */}
      <section className="relative h-[42vh] min-h-[300px] overflow-hidden">
        <img src={heroImg} alt="Restaurant exterior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="chip bg-warm-gold/90 text-deep-brown mb-3">Get in Touch</span>
              <h1 className="font-heading text-4xl md:text-6xl font-semibold text-cream">We'd love to hear from you</h1>
              <p className="text-cream/80 text-lg mt-2 max-w-xl">Questions, reservations, feedback — we're always happy to chat.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((c, i) => {
            const inner = (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-3xl p-6 h-full hover-lift group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${c.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-1">{c.title}</h3>
                <p className="font-medium text-sm text-foreground">{c.info}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
              </motion.div>
            );
            return c.href ? (
              <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
            ) : <div key={c.title}>{inner}</div>;
          })}
        </div>
      </section>

      {/* Form + map */}
      <section className="container mx-auto px-4 mt-16 grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="bg-card border border-border rounded-3xl p-7 md:p-9">
          <span className="chip bg-primary/10 text-primary mb-3">Send a Message</span>
          <h2 className="font-heading text-3xl font-semibold mb-2">Drop us a line</h2>
          <p className="text-muted-foreground text-sm mb-6">We'll respond on WhatsApp within minutes during opening hours.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Your Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone</label>
              <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+880..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="How can we help you?" />
            </div>
            <button type="submit" className="btn-primary w-full py-3.5 inline-flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send via WhatsApp
            </button>
          </form>

          <div className="flex items-center gap-3 mt-7 pt-6 border-t border-border">
            <Facebook className="w-5 h-5 text-primary" />
            <span className="text-sm flex-1">Follow us on Facebook</span>
            <a href="https://www.facebook.com/profile.php?id=61556723062242" target="_blank" rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:underline">Visit Page →</a>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-soft)] bg-card">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-heading text-xl font-semibold">Find Us</h3>
              <p className="text-xs text-muted-foreground">Nayanpur Rd, Dinajpur, Bangladesh</p>
            </div>
            <a href="https://maps.google.com/?q=Nayanpur+Rd+Dinajpur+Bangladesh" target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold text-primary inline-flex items-center gap-1 bg-primary/10 px-3 py-2 rounded-full hover:bg-primary/15">
              <Navigation className="w-3.5 h-3.5" /> Directions
            </a>
          </div>
          <iframe
            title="Friends Square Restaurant Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.0!2d88.6365!3d25.6279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM3JzQwLjQiTiA4OMKwMzgnMTEuNCJF!5e0!3m2!1sen!2sbd!4v1600000000000"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
