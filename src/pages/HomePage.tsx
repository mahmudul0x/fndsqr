import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { UtensilsCrossed, Users, ChefHat, Leaf, Star, Clock, ArrowRight, ChevronLeft, ChevronRight, Flame, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { menuItems, categoryImages } from "@/data/menuData";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import foodImg from "@/assets/food-showcase.jpg";
import outdoorImg from "@/assets/outdoor-seating.jpg";
import kitchenImg from "@/assets/open-kitchen.jpg";

const heroSlides = [
  { image: heroSlide1, title: "Welcome to", subtitle: "Friends Square", desc: "A Cozy Modern Dining Experience in Dinajpur" },
  { image: heroSlide2, title: "Dine Under", subtitle: "The Stars", desc: "Pool-side outdoor seating with beautiful ambiance" },
  { image: heroSlide3, title: "Taste The", subtitle: "Difference", desc: "Local Bangladeshi & international cuisines crafted with love" },
];

const highlights = [
  { icon: Users, title: "Family Friendly", desc: "A warm space for all ages to enjoy together" },
  { icon: ChefHat, title: "Open Kitchen", desc: "Watch your food being prepared with care" },
  { icon: Leaf, title: "Indoor & Outdoor", desc: "Pool-side seating and cozy interiors" },
  { icon: UtensilsCrossed, title: "Diverse Menu", desc: "Local & international cuisines to explore" },
];

const dailySpecials = [
  { name: "Kacchi Biriyani", price: 300, originalPrice: 350, desc: "Traditional aromatic kacchi", badge: "Today's Special", id: "bk3" },
  { name: "Butter Chicken", price: 300, originalPrice: 350, desc: "Creamy tomato butter chicken", badge: "Chef's Pick", id: "c4" },
  { name: "Mixed Kabab Platter", price: 500, originalPrice: 600, desc: "Assorted kabab for sharing", badge: "Best Seller", id: "k4" },
];

const testimonials = [
  { name: "Arif Rahman", text: "Best restaurant in Dinajpur! The kacchi biriyani is outstanding and the ambiance is perfect for family dining.", rating: 5 },
  { name: "Fatima Akter", text: "We celebrated our anniversary here. The pool-side seating was magical and the food was absolutely delicious!", rating: 5 },
  { name: "Kamal Hossain", text: "Great place for friends hangout. Affordable prices, amazing food, and the open kitchen concept is really cool.", rating: 5 },
  { name: "Nusrat Jahan", text: "The grilled chicken and Thai fried chicken are must-tries. Super clean environment and friendly staff.", rating: 4 },
];

const popularCategories = [
  { name: "Biriyani", image: categoryImages["Biriyani / Kacchi"], link: "/menu?category=Biriyani+%2F+Kacchi" },
  { name: "Pizza", image: categoryImages["Pizza"], link: "/menu?category=Pizza" },
  { name: "Burger", image: categoryImages["Burger"], link: "/menu?category=Burger" },
  { name: "Grilled", image: categoryImages["Grilled Chicken"], link: "/menu?category=Grilled+Chicken" },
  { name: "Drinks", image: categoryImages["Drinks"], link: "/menu?category=Drinks" },
  { name: "Pasta", image: categoryImages["Pasta"], link: "/menu?category=Pasta" },
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), []);
  const prevSlide = useCallback(() => setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.subtitle}
              className="absolute inset-0 w-full h-full object-cover scale-105"
              width={1920}
              height={1080}
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            key={`sub-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/70 text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-body font-medium"
          >
            {heroSlides[currentSlide].title}
          </motion.p>
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            {heroSlides[currentSlide].subtitle}
          </motion.h1>
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 text-base md:text-lg mb-10 font-body max-w-xl mx-auto"
          >
            {heroSlides[currentSlide].desc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/menu" className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 transition-all">
              View Menu
            </Link>
            <Link to="/reservation" className="bg-white text-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/90 transition-all">
              Book Table
            </Link>
          </motion.div>
        </div>

        {/* Slider controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-white" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center gap-3 text-sm font-medium">
          <Flame className="w-4 h-4" />
          <span>🎉 Special Offer: Get 15% off on Set Menus this weekend! Use code: FRIENDS15</span>
          <Link to="/menu" className="underline underline-offset-2 hover:opacity-80 ml-2">Order Now →</Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">The Friends Square Experience</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 md:p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <h.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{h.title}</h3>
                <p className="text-muted-foreground text-sm">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Explore</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">Popular Categories</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {popularCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={cat.link} className="group block text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-border group-hover:border-accent transition-colors">
                    <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Specials */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Don't Miss</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">Today's Specials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dailySpecials.map((item, i) => {
              const menuItem = menuItems.find((m) => m.id === item.id);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={categoryImages[menuItem?.category || "Appetizers"]}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold text-lg">৳{item.price}</span>
                      </div>
                      <button
                        onClick={() => menuItem && addItem(menuItem)}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ambiance showcase */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Experience</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">Our Ambiance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: foodImg, title: "Signature Dishes", desc: "Crafted with love and the finest ingredients" },
              { img: outdoorImg, title: "Pool-Side Dining", desc: "Enjoy your meal under the stars" },
              { img: kitchenImg, title: "Open Kitchen", desc: "Watch our chefs create magic" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group rounded-2xl overflow-hidden hover-lift"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Reviews</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="font-heading font-bold text-base">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours + CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-foreground/60 text-sm uppercase tracking-widest mb-3">Visit Us</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Ready to Dine?</h2>
              <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                Reserve your table now or order your favorite dishes online. We're open every day to serve you the best dining experience in Dinajpur.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/reservation" className="bg-white text-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/90 transition-all">
                  Reserve a Table
                </Link>
                <a
                  href="https://wa.me/8801752441799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6" />
                <h3 className="font-heading text-2xl font-bold">Opening Hours</h3>
              </div>
              <div className="space-y-3 text-primary-foreground/80">
                <div className="flex justify-between py-2 border-b border-primary-foreground/10">
                  <span>Saturday – Thursday</span>
                  <span className="font-semibold text-primary-foreground">11:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-primary-foreground/10">
                  <span>Friday</span>
                  <span className="font-semibold text-primary-foreground">2:00 PM – 11:00 PM</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <a href="tel:+8801752441799" className="font-semibold text-lg">+880 1752 441799</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
