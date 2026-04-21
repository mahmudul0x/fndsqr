import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/menu" className="p-2 rounded-full hover:bg-secondary">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-heading text-3xl font-bold">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-heading text-xl mb-6">Your cart is empty</p>
            <Link
              to="/menu"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:shadow-[var(--shadow-warm)] transition-all inline-flex items-center gap-2"
            >
              Browse Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-4 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-accent font-bold">৳{item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center ml-1 hover:bg-destructive/20 transition-colors">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary + CTA */}
            <div className="glass-card p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-heading text-lg font-bold">Total</span>
                <span className="font-heading text-xl font-bold text-accent">৳{totalPrice}</span>
              </div>

              <div className="space-y-2">
                <Link
                  to="/checkout"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-[var(--shadow-warm)] transition-all active:scale-[0.98] text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Proceed to Checkout
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full text-destructive text-xs font-medium hover:underline py-1"
                >
                  Clear Cart
                </button>
              </div>

              <div className="text-[10px] text-muted-foreground text-center pt-1.5 border-t border-border/50">
                🚚 Free delivery • ~30 min
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;