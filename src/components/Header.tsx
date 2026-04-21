import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Phone, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
      {/* Top utility strip */}
      <div className="hidden md:flex bg-deep-brown text-cream/80 text-xs">
        <div className="container mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Nayanpur Rd, Dinajpur</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> +880 1752 441799</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Open daily • 11 AM – 11 PM</span>
            <a href="https://wa.me/8801752441799" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">WhatsApp Order →</a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent
            ? "bg-transparent"
            : "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          {/* Logo with mark */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-lg transition-all ${
              transparent ? "bg-white/15 backdrop-blur text-white border border-white/30" : "bg-primary text-primary-foreground"
            }`}>
              FS
            </div>
            <div className="leading-none">
              <div className={`font-heading text-xl md:text-2xl font-bold tracking-tight ${transparent ? "text-white" : "text-foreground"}`}>
                Friends Square
              </div>
              <div className={`text-[10px] uppercase tracking-[0.25em] mt-0.5 ${transparent ? "text-white/60" : "text-muted-foreground"}`}>
                Restaurant • Dinajpur
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    transparent ? "text-white/85 hover:text-white" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full ${transparent ? "bg-white" : "bg-primary"}`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className={`relative p-2.5 rounded-full transition-all ${
                transparent ? "hover:bg-white/15 text-white" : "hover:bg-secondary text-foreground"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center font-bold ring-2 ring-background">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              to="/reservation"
              className={`hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                transparent
                  ? "bg-white text-foreground hover:bg-white/90"
                  : "bg-primary text-primary-foreground hover:shadow-[var(--shadow-warm)]"
              }`}
            >
              Reserve Table
            </Link>

            <button
              className={`lg:hidden p-2 rounded-full ${transparent ? "text-white" : "text-foreground"}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-b border-border overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                      location.pathname === link.to
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/reservation"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold text-center mt-2"
                >
                  Reserve Table
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
