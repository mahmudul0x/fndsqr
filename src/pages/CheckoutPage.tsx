import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag, User, MapPin, ArrowLeft, Check, AlertCircle,
  CreditCard, Plus, Minus, X, Smartphone, Wallet, Building2, Banknote, Lock
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getItemImage } from "@/data/menuData";
import { cn } from "@/lib/utils";
import PromoCodeInput from "@/components/PromoCodeInput";

type CheckoutStep = "details" | "payment" | "tracking";

export default function Checkout() {
  const { items, totalPrice, clearCart, updateQuantity } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("details");
  const [formData, setFormData] = useState({ name: "", address: "", phone: "", note: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderSent, setOrderSent] = useState(false);

  const subtotal = totalPrice;
  const discountAmount = (subtotal * promoDiscount) / 100;
  const totalBeforePayment = subtotal - discountAmount;

  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery", icon: Banknote, color: "rgb(139, 92, 246)" },
    { id: "bkash", name: "bKash", icon: Smartphone, color: "rgb(0, 146, 81)" },
    { id: "nagad", name: "Nagad", icon: Wallet, color: "rgb(238, 16, 46)" },
    { id: "card", name: "Card", icon: CreditCard, color: "rgb(59, 130, 246)" },
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name": return !value.trim() ? "Name is required" : value.trim().length < 2 ? "Please enter a valid name" : "";
      case "address": return !value.trim() ? "Address is required" : value.trim().length < 10 ? "Please enter a complete address" : "";
      case "phone": return !value.trim() ? "Phone number is required" : !/^[0-9+\-\s()]{10,}$/.test(value.replace(/\s/g, "")) ? "Please enter a valid phone" : "";
      default: return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = useMemo(() => {
    return ["name", "address", "phone"].every(field => !validateField(field, formData[field as keyof typeof formData]));
  }, [formData]);

  const handleApplyPromo = (code: string, discount: number) => {
    setAppliedPromo(code);
    setPromoDiscount(discount);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const handleProceedToPayment = () => {
    if (isFormValid) {
      setCurrentStep("payment");
    }
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) return;
    
    const newOrderId = "ORD-" + Date.now().toString().slice(-6);
    setOrderId(newOrderId);
    setCurrentStep("tracking");

    const itemsList = items.map(i => `* ${i.name} x${i.quantity} = ${i.price * i.quantity} Taka`).join("\n");
    const discountText = promoDiscount > 0 ? `Discount (${appliedPromo}): -${discountAmount.toFixed(0)} Taka\n` : "";
    const methodName = paymentMethods.find(m => m.id === paymentMethod)?.name || paymentMethod;
    
    const message = `*NEW ORDER #${newOrderId}*\n\nName: ${formData.name}\nAddress: ${formData.address}\nPhone: ${formData.phone}\n${formData.note ? `Note: ${formData.note}\n\n` : ""}Order Items:\n${itemsList}\n\nPrice Breakdown:\n   Subtotal: ${subtotal} Taka\n${discountText}   Delivery: Free\n   Payment: ${methodName}\n\nTotal: ${totalBeforePayment} Taka\n\nPlease confirm and prepare for delivery. Thank you!`;

    setTimeout(() => {
      window.open(`https://wa.me/8801752441799?text=${encodeURIComponent(message)}`, "_blank");
      setOrderSent(true);
      clearCart();
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-primary/60" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Explore our menu and start ordering!</p>
          <Link to="/menu" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Browse Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background pb-24">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/cart" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === "details" && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 md:p-8 rounded-3xl space-y-6">
                <h2 className="font-heading text-2xl font-bold mb-6">Delivery Details</h2>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[45%]">
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur}
                      placeholder="Enter your full name"
                      className={cn("w-full px-4 py-3 rounded-xl bg-secondary border-2 text-sm transition-all", touched.name && errors.name ? "border-destructive" : "border-border focus:ring-2 focus:ring-primary/20")}
                    />
                    {touched.name && errors.name && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number <span className="text-destructive">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur}
                      placeholder="+880 1XXX-XXXXXX"
                      className={cn("w-full px-4 py-3 rounded-xl bg-secondary border-2 text-sm transition-all", touched.phone && errors.phone ? "border-destructive" : "border-border focus:ring-2 focus:ring-primary/20")}
                    />
                    {touched.phone && errors.phone && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
                  </div>

                  <div className="w-full">
                    <label htmlFor="address" className="block text-sm font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Delivery Address <span className="text-destructive">*</span>
                    </label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} onBlur={handleBlur}
                      placeholder="House/Road, Area, Landmark, City..." rows={2}
                      className={cn("w-full px-4 py-3 rounded-xl bg-secondary border-2 text-sm resize-none transition-all", touched.address && errors.address ? "border-destructive" : "border-border focus:ring-2 focus:ring-primary/20")}
                    />
                    {touched.address && errors.address && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.address}</p>}
                  </div>

                  <div className="w-full">
                    <label htmlFor="note" className="block text-sm font-semibold mb-2">Special Instructions <span className="text-muted-foreground font-normal">(optional)</span></label>
                    <textarea id="note" name="note" value={formData.note} onChange={handleInputChange}
                      placeholder="Delivery instructions, allergies, etc." rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === "payment" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 md:p-8 rounded-3xl space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold">Payment Method</h2>
                  <button onClick={() => setCurrentStep("details")} className="text-sm text-primary hover:underline">
                    Edit Details
                  </button>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium">{formData.name}</p>
                  <p className="text-sm text-muted-foreground">{formData.address}</p>
                  <p className="text-sm text-muted-foreground">{formData.phone}</p>
                </div>

                <h3 className="font-semibold mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-left",
                          isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${method.color}20` }}>
                            <Icon className="w-5 h-5" style={{ color: method.color }} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{method.name}</p>
                            {method.id === "cod" && <p className="text-xs text-muted-foreground">0% fee</p>}
                          </div>
                          {isSelected && <Check className="w-5 h-5 text-primary ml-auto" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentStep === "tracking" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-3xl text-center">
                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-1">Your order <span className="font-semibold">#{orderId}</span> has been sent to the restaurant.</p>
                <p className="text-muted-foreground text-sm mb-4">You'll receive a WhatsApp confirmation shortly.</p>
                
                {!orderSent && <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />}
                
                {orderSent && (
                  <Link to="/menu" className="block w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all mt-4">
                    Order Again
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="glass-card p-5 rounded-2xl sticky top-24">
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                Your Order
              </h3>
              
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30">
                    {getItemImage(item) ? <img src={getItemImage(item)} alt={item.name} className="w-10 h-10 rounded-md object-cover" /> : 
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center"><ShoppingBag className="w-4 h-4 text-primary/40" /></div>}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-xs truncate">{item.name}</p>
                      <div className="flex items-center gap-0 mt-0.5">
                        <button onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))} className="w-6 h-6 rounded-md bg-secondary border border-border flex items-center justify-center hover:bg-muted">
                          {item.quantity === 1 ? <X className="w-3 h-3 text-destructive" /> : <Minus className="w-3 h-3" />}
                        </button>
                        <span className="text-xs font-semibold px-2 min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-md bg-secondary border border-border flex items-center justify-center hover:bg-muted">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <span className="font-semibold text-primary text-xs">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <PromoCodeInput onApply={handleApplyPromo} onRemove={handleRemovePromo} appliedCode={appliedPromo} discount={promoDiscount} originalAmount={subtotal} compact />

              <div className="border-t border-border pt-3 mt-4">
                <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Subtotal</span><span>৳{subtotal}</span></div>
                {promoDiscount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Discount ({promoDiscount}%)</span><span>-৳{discountAmount.toFixed(0)}</span></div>}
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="font-heading font-bold">Total</span>
                  <span className="font-heading text-xl font-bold text-primary">৳{totalBeforePayment}</span>
                </div>
              </div>

              {currentStep === "details" && isFormValid && (
                <button onClick={handleProceedToPayment}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold mt-4 hover:shadow-lg transition-all">
                  Proceed to Payment
                </button>
              )}

              {currentStep === "payment" && (
                <button
                  onClick={handlePlaceOrder}
                  disabled={!paymentMethod}
                  className={cn(
                    "w-full py-3 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2 transition-all",
                    paymentMethod ? "bg-primary text-primary-foreground hover:shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  )}
                >
                  {paymentMethod ? `Place Order - ৳${totalBeforePayment}` : "Select Payment Method"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}