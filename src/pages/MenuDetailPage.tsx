import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, Plus, Minus, ShoppingBag, Star, Clock, Flame, Heart } from "lucide-react";
import { menuItems, getItemImage } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import MenuCard from "@/components/MenuCard";
import { motion } from "framer-motion";

const MenuDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const item = useMemo(() => menuItems.find((m) => m.id === id), [id]);

  const related = useMemo(() => {
    if (!item) return [];
    return menuItems.filter((m) => m.category === item.category && m.id !== item.id).slice(0, 5);
  }, [item]);

  if (!item) {
    return (
      <div className="pt-32 pb-20 text-center container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold mb-4">Dish not found</h1>
        <Link to="/menu" className="text-primary hover:underline">← Back to menu</Link>
      </div>
    );
  }

  const image = getItemImage(item);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(item);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-background min-h-screen pb-32 md:pb-12">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6 md:pt-10 mb-6">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to menu
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary shadow-[var(--shadow-elegant)]">
              <img src={image} alt={item.name} className="w-full h-full object-cover" />
              {item.badge && (
                <span className="absolute top-5 left-5 chip bg-accent text-accent-foreground shadow-md">
                  {item.badge}
                </span>
              )}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-primary text-primary" : "text-foreground"}`} />
              </button>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="chip bg-primary/10 text-primary self-start mb-4">{item.category}</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-balance">{item.name}</h1>

            {/* Ratings */}
            <div className="flex items-center gap-4 mb-5 text-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warm-gold text-warm-gold" />
                ))}
                <span className="ml-1 font-semibold">4.8</span>
                <span className="text-muted-foreground">(124)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" /> 15-20 min
              </div>
            </div>

            {item.description && (
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6 text-pretty">
                {item.description}
              </p>
            )}

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Flame, label: "Fresh", sub: "Made to order" },
                { icon: Star, label: "Signature", sub: "Chef's pick" },
                { icon: Clock, label: "Quick", sub: "15-20 min" },
              ].map((b) => (
                <div key={b.label} className="bg-card rounded-2xl p-3 border border-border/60 text-center">
                  <b.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                  <p className="text-xs font-bold">{b.label}</p>
                  <p className="text-[10px] text-muted-foreground">{b.sub}</p>
                </div>
              ))}
            </div>

            {/* Price + qty */}
            <div className="bg-card border border-border/60 rounded-3xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Price</p>
                  <p className="font-heading text-3xl md:text-4xl font-bold text-primary">৳{item.price * qty}</p>
                </div>
                <div className="flex items-center gap-2 bg-secondary rounded-full px-1.5 py-1.5">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-full bg-background flex items-center justify-center hover:bg-card">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-full bg-background flex items-center justify-center hover:bg-card">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-[var(--shadow-warm)] hover:-translate-y-0.5 transition-all active:translate-y-0"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart — ৳{item.price * qty}
              </button>
            </div>

            <a
              href={`https://wa.me/8801752441799?text=${encodeURIComponent(`Hello Friends Square, I want to order ${qty}x ${item.name} (৳${item.price * qty}). Please confirm.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="text-center py-3 rounded-2xl border border-border bg-card hover:bg-secondary text-sm font-semibold transition-colors"
            >
              💬 Order Now on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="chip bg-primary/10 text-primary mb-2">You may also like</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">More from {item.category}</h2>
              </div>
              <Link to="/menu" className="text-sm text-primary font-semibold hover:underline hidden md:inline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {related.map((r, i) => <MenuCard key={r.id} item={r} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MenuDetailPage;
