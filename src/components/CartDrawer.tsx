import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getItemImage, menuItems } from "@/data/menuData";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart, totalItems } = useCart();

  const getImg = (item: any) => {
    const full = menuItems.find((m) => m.id === item.id);
    return full ? getItemImage(full) : "";
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-deep-brown/50 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Your Order</p>
                <h2 className="font-heading text-lg font-bold">{totalItems} {totalItems === 1 ? "item" : "items"}</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground px-8">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <ShoppingBag className="w-9 h-9 text-muted-foreground/40" />
                </div>
                <p className="font-heading text-xl font-bold mb-1 text-foreground">Your cart is empty</p>
                <p className="text-sm text-center mb-6">Start exploring our delicious menu</p>
                <button onClick={() => setIsCartOpen(false)} className="btn-primary px-6 py-2.5 text-sm">
                  Browse menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex items-center gap-1 p-1.5 rounded-lg bg-card border border-border/60"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary">
                        <img src={getImg(item)} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[11px] truncate">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">৳{item.price}</p>
                        <p className="text-primary font-bold text-xs mt-0.5">৳{item.price * item.quantity}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div className="flex items-center gap-0.5 bg-secondary rounded-full p-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-background flex items-center justify-center hover:bg-card">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center text-[10px] font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-background flex items-center justify-center hover:bg-card">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-border p-3 bg-card/50 space-y-2">
                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>৳{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Service</span>
                      <span className="text-primary">Free</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-border">
                      <span className="font-heading text-sm font-bold">Total</span>
                      <span className="font-heading text-lg font-bold text-primary">৳{totalPrice}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-[var(--shadow-warm)] transition-all active:scale-[0.98] text-sm"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Checkout
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full text-center text-destructive text-[10px] font-medium hover:underline py-1"
                  >
                    Clear Cart
                  </button>

                  <div className="text-[9px] text-muted-foreground text-center pt-1 border-t border-border/50">
                    🚚 Free delivery • ~30 min
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
