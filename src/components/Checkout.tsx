import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag, User, MapPin, Phone, MessageCircle, CreditCard, Truck,
  Check, AlertCircle, ArrowLeft, Lock,
  ChevronRight, ChevronDown, ChevronUp, Smartphone, Headphones
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

type CheckoutStep = "details" | "confirm";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("details");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    note: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Track touched fields for real-time validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Please enter a valid name";
        return "";
      case "address":
        if (!value.trim()) return "Address is required";
        if (value.trim().length < 10) return "Please enter a complete address";
        return "";
      case "phone":
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!value.trim()) return "Phone number is required";
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return "Please enter a valid phone number";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));

    // Real-time validation on blur or change after touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    const fields = ["name", "address", "phone"];
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, address: true, phone: true });
    return isValid;
  };

  const handleNextStep = () => {
    if (isFormValid()) {
      setCurrentStep("confirm");
    }
  };

  const handleBackToDetails = () => {
    setCurrentStep("details");
  };

  const handleSubmitOrder = () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);

    const itemsList = items.map(i => `• ${i.name} x${i.quantity} = ৳${i.price * i.quantity}`).join("\n");
    const message = encodeURIComponent(
      `🛒 *ORDER CONFIRMATION REQUEST*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📍 *Address:* ${formData.address}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `${formData.note ? `📝 *Note:* ${formData.note}\n\n` : '\n'}` +
      `📋 *Order Items:*\n${itemsList}\n\n` +
      `💰 *Total:* ৳${totalPrice}\n\n` +
      `✅ Please confirm my order. Thank you!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/8801752441799?text=${message}`, "_blank");
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
      setFormData({ name: "", address: "", phone: "", note: "" });
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1500);
  };

  const steps = [
    { key: "details", label: "Your Details", icon: User, completed: currentStep === "confirm" },
    { key: "confirm", label: "Confirm Order", icon: Check, active: currentStep === "confirm" }
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-primary/60" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.<br/>Explore our menu and start ordering!</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Browse Menu <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* Header with Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Link to="/cart" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              Secure Checkout
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: step.completed
                      ? "hsl(var(--primary))"
                      : step.active
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted))",
                    color: step.completed || step.active ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-primary-foreground/20" : "bg-white/20"
                  }`}>
                    {step.completed ? <Check className="w-3.5 h-3.5" /> : <step.icon className="w-3.5 h-3.5" />}
                  </div>
                  <span className="hidden sm:inline">{step.label}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="w-12 md:w-16 h-0.5 bg-muted mx-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: step.completed ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              {currentStep === "details" ? "Your Details" : "Confirm Your Order"}
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
              {currentStep === "details"
                ? "Please provide your details for delivery."
                : "Review your order and confirm via WhatsApp for instant processing."}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === "details" ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-6 md:p-8 rounded-3xl space-y-6"
                >
                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label htmlFor="name" className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Enter your full name"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-secondary border-2 text-sm transition-all",
                          touched.name && errors.name
                            ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                            : touched.name && !errors.name
                            ? "border-green-500 focus:ring-2 focus:ring-green-500/20"
                            : "border-border focus:ring-2 focus:ring-primary/20"
                        )}
                      />
                      {touched.name && errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs text-destructive flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="+880 1XXX-XXXXXX"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-secondary border-2 text-sm transition-all",
                          touched.phone && errors.phone
                            ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                            : touched.phone && !errors.phone
                            ? "border-green-500 focus:ring-2 focus:ring-green-500/20"
                            : "border-border focus:ring-2 focus:ring-primary/20"
                        )}
                      />
                      {touched.phone && errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs text-destructive flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Delivery Address <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="House/Road, Area, Landmark, City..."
                        rows={3}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-secondary border-2 text-sm resize-none transition-all",
                          touched.address && errors.address
                            ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                            : touched.address && !errors.address
                            ? "border-green-500 focus:ring-2 focus:ring-green-500/20"
                            : "border-border focus:ring-2 focus:ring-primary/20"
                        )}
                      />
                      {touched.address && errors.address && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs text-destructive flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.address}
                        </motion.p>
                      )}
                    </div>

                    {/* Special Instructions */}
                    <div className="md:col-span-2">
                      <label htmlFor="note" className="block text-sm font-semibold mb-2">
                        Special Instructions <span className="text-muted-foreground font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="Delivery instructions, allergies, etc."
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="pt-4 border-t border-border">
                    <button
                      onClick={handleNextStep}
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Confirmation
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Order Summary Card */}
                  <div className="glass-card p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Order Summary
                      </h3>
                      <button
                        onClick={handleBackToDetails}
                        className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
                      >
                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                        Edit
                      </button>
                    </div>

                    {/* Items */}
                    <div className="space-y-3 mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                          <div className="flex-1">
                            <p className="font-medium text-foreground text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-primary">৳{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info Preview */}
                    <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Delivery To</h4>
                      <p className="text-sm font-medium text-foreground">{formData.name}</p>
                      <p className="text-sm text-muted-foreground">{formData.address}</p>
                      <p className="text-sm text-muted-foreground">{formData.phone}</p>
                      {formData.note && (
                        <p className="text-sm text-muted-foreground mt-2 italic">"{formData.note}"</p>
                      )}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <span className="font-heading text-lg font-bold">Total Amount</span>
                      <span className="font-heading text-2xl font-bold text-accent">৳{totalPrice}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || isSuccess}
                    className={cn(
                      "w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
                      isSuccess
                        ? "bg-green-600 text-white"
                        : "bg-primary text-primary-foreground hover:shadow-lg active:scale-[0.98]"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="w-5 h-5" />
                        Order Sent Successfully!
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Confirm Order via WhatsApp
                      </>
                    )}
                  </button>

                  {/* Success Message */}
                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm text-center"
                      >
                        ✅ Your order has been sent!<br/>
                        You'll receive a WhatsApp confirmation shortly.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Back link */}
                  <button
                    onClick={handleBackToDetails}
                    className="w-full text-center text-muted-foreground text-sm hover:text-foreground transition-colors py-2"
                  >
                    ← Back to edit details
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Order Summary & Trust */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Order Summary Card */}
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                Order Summary
              </h3>
              <div className="space-y-2.5 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
                  <span>৳{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-heading font-bold">Total</span>
                  <span className="font-heading text-xl font-bold text-primary">৳{totalPrice}</span>
                </div>
              </div>

              
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
