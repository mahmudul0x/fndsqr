import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-restaurant.jpg";
import foodImg from "@/assets/food-showcase.jpg";
import outdoorImg from "@/assets/outdoor-seating.jpg";
import kitchenImg from "@/assets/open-kitchen.jpg";
import biryaniImg from "@/assets/food-biryani.jpg";
import familyImg from "@/assets/family-dining.jpg";
import birthdayImg from "@/assets/event-birthday.jpg";
import corporateImg from "@/assets/event-corporate.jpg";

type Cat = "All" | "Interior" | "Food" | "Events";
const images: { src: string; alt: string; cat: Exclude<Cat, "All"> }[] = [
  { src: heroImg, alt: "Warm restaurant interior", cat: "Interior" },
  { src: foodImg, alt: "Signature dishes spread", cat: "Food" },
  { src: outdoorImg, alt: "Pool-side seating", cat: "Interior" },
  { src: kitchenImg, alt: "Open kitchen at work", cat: "Interior" },
  { src: biryaniImg, alt: "Aromatic biryani", cat: "Food" },
  { src: familyImg, alt: "Family dining moments", cat: "Events" },
  { src: birthdayImg, alt: "Birthday celebrations", cat: "Events" },
  { src: corporateImg, alt: "Corporate gatherings", cat: "Events" },
];

const cats: Cat[] = ["All", "Interior", "Food", "Events"];

const GalleryPage = () => {
  const [filter, setFilter] = useState<Cat>("All");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = filter === "All" ? images : images.filter((i) => i.cat === filter);

  const next = () => setSelected((s) => (s === null ? null : (s + 1) % filtered.length));
  const prev = () => setSelected((s) => (s === null ? null : (s - 1 + filtered.length) % filtered.length));

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="chip bg-primary/10 text-primary mb-3">Gallery</span>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold mb-3">Moments at <em className="text-primary not-italic">Friends Square</em></h1>
          <p className="text-muted-foreground max-w-xl mx-auto">A glimpse into the food, the space and the people that make us special.</p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === c ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]" : "bg-secondary text-foreground hover:bg-secondary/70"
              }`}>{c}</button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative ${i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]"}`}
                onClick={() => setSelected(i)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <span className="chip bg-cream/20 text-cream backdrop-blur-sm text-[10px]">{img.cat}</span>
                    <p className="text-cream text-sm mt-1.5 font-medium">{img.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-deep-brown/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <button className="absolute top-5 right-5 p-2.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream z-10" onClick={() => setSelected(null)}>
              <X className="w-5 h-5" />
            </button>
            <button className="absolute left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="absolute right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}>
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div key={selected} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
              <img src={filtered[selected].src} alt={filtered[selected].alt} className="max-w-full max-h-[85vh] object-contain rounded-2xl" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-deep-brown/70 backdrop-blur text-cream px-5 py-2 rounded-full text-sm">
                {filtered[selected].alt} · <span className="opacity-70">{selected + 1} / {filtered.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
