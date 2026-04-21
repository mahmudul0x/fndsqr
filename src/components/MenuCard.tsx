import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { getItemImage } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

const MenuCard = ({ item, index }: MenuCardProps) => {
  const { addItem } = useCart();
  const image = getItemImage(item);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.025, 0.4), duration: 0.3 }}
      className="group bg-card rounded-3xl border border-border/60 overflow-hidden hover-lift"
    >
      <Link to={`/menu/${item.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {item.badge && (
            <span className="absolute top-3 left-3 chip bg-accent text-accent-foreground shadow-md">
              {item.badge}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">{item.category}</p>
        <Link to={`/menu/${item.id}`}>
          <h3 className="font-heading text-base font-semibold text-foreground line-clamp-1 mb-1 hover:text-primary transition-colors">
            {item.name}
          </h3>
        </Link>
        {item.description && (
          <p className="text-muted-foreground text-xs line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <span className="font-heading text-xl font-bold text-primary">৳{item.price}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(item);
            }}
            className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-[var(--shadow-warm)] hover:scale-105 transition-all active:scale-95"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
