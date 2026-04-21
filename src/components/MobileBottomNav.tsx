import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, ShoppingBag, CalendarDays, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/menu", icon: UtensilsCrossed, label: "Menu" },
  { to: "/cart", icon: ShoppingBag, label: "Cart", showBadge: true },
  { to: "/reservation", icon: CalendarDays, label: "Book" },
  { to: "/contact", icon: Phone, label: "Contact" },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40">
      <div className="bg-background/95 backdrop-blur-xl border border-border shadow-[0_8px_30px_-8px_hsla(18,30%,18%,0.2)] rounded-full">
        <div className="flex items-center justify-around h-15 py-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-all px-3 py-1.5 rounded-full ${
                  isActive ? "text-primary-foreground bg-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.showBadge && totalItems > 0 && (
                  <span className="absolute -top-0.5 right-1 w-4 h-4 bg-accent text-accent-foreground text-[9px] rounded-full flex items-center justify-center font-bold ring-2 ring-background">
                    {totalItems}
                  </span>
                )}
                {isActive && <span>{link.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
