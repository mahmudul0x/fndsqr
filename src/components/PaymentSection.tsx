import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Smartphone, Building2, Wallet,
  Check, Star, AlertCircle, Shield, Lock, Zap,
  Banknote
} from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentMethod = "bkash" | "nagad" | "rocket" | "card" | "bank" | "cod" | null;

interface PaymentSectionProps {
  totalAmount: number;
  discount: number;
  onComplete: (paymentMethod: PaymentMethod, transactionId: string) => void;
  isProcessing: boolean;
  showPayButton?: boolean;
}

const PaymentSection = ({ totalAmount, discount, onComplete, isProcessing, showPayButton = true }: PaymentSectionProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [agreed, setAgreed] = useState(false);

  const finalAmount = totalAmount - discount;
  const hasDiscount = discount > 0;

  const paymentMethods = [
    {
      id: "cod" as PaymentMethod,
      name: "Cash on Delivery",
      icon: Banknote,
      color: "rgb(139, 92, 246)",
      description: "Pay when you receive your order",
      fee: "0%"
    },
    {
      id: "bkash" as PaymentMethod,
      name: "bKash",
      icon: Smartphone,
      color: "rgb(0, 146, 81)",
      description: "Pay with your bKash mobile account",
      fee: "0%"
    },
    {
      id: "nagad" as PaymentMethod,
      name: "Nagad",
      icon: Wallet,
      color: "rgb(238, 16, 46)",
      description: "Instant payment via Nagad",
      fee: "0%"
    },
    {
      id: "rocket" as PaymentMethod,
      name: "Rocket",
      icon: Smartphone,
      color: "rgb(227, 30, 45)",
      description: "DBBL Rocket mobile banking",
      fee: "0%"
    },
    {
      id: "card" as PaymentMethod,
      name: "Card",
      icon: CreditCard,
      color: "rgb(59, 130, 246)",
      description: "Visa, Mastercard, Amex",
      fee: "2.5%"
    },
    {
      id: "bank" as PaymentMethod,
      name: "Bank Transfer",
      icon: Building2,
      color: "rgb(16, 185, 129)",
      description: "Direct bank transfer",
      fee: "0%"
    }
  ];

  const handleSubmit = () => {
    if (!selectedMethod || !agreed) return;

    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    onComplete(selectedMethod, transactionId);
  };

  const isValidMobile = /^[0-9]{11}$/.test(mobileNumber);
  const isValidCard = cardDetails.number.length >= 13 && cardDetails.expiry.length === 5 && cardDetails.cvv.length >= 3;
  const canProceed = selectedMethod === "cod" ? agreed : (
    agreed && (
      (selectedMethod === "bkash" || selectedMethod === "nagad" || selectedMethod === "rocket") ? isValidMobile : isValidCard
    )
  );

  return (
    <div className="glass-card p-4 md:p-6 rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold">Payment Method</h3>
          <p className="text-xs text-muted-foreground">Choose how you'd like to pay</p>
        </div>
      </div>

      {/* Payment Methods Grid - Compact */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          return (
            <motion.button
              key={method.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                "relative p-2.5 rounded-xl border-2 transition-all text-center",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40 hover:bg-secondary/30"
              )}
            >
              {isSelected && (
                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              )}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto mb-1.5"
                style={{ backgroundColor: `${method.color}20` }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: method.color }} />
              </div>
              <p className="font-semibold text-[10px] leading-tight">{method.name}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{method.fee} fee</p>
            </motion.button>
          );
        })}
      </div>

      {/* Payment Details Form */}
      <AnimatePresence mode="wait">
        {selectedMethod && selectedMethod !== "cod" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden space-y-3 mb-4"
          >
            {/* Mobile Money Fields */}
            {(selectedMethod === "bkash" || selectedMethod === "nagad" || selectedMethod === "rocket") && (
              <div className="space-y-3">
                <div className="bg-secondary/30 rounded-lg p-3 text-xs">
                  <p className="flex items-center gap-1.5 font-medium mb-0.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Quick Payment
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Enter your mobile number. You'll receive a PIN to complete the payment.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Mobile Number *</label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    placeholder="01XXXXXXXXX"
                    maxLength={11}
                    className={cn(
                      "w-full px-3 py-2.5 rounded-lg bg-secondary border-2 text-sm transition-all",
                      mobileNumber.length > 0 && !isValidMobile
                        ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                        : mobileNumber.length === 11 && isValidMobile
                        ? "border-green-500 focus:ring-2 focus:ring-green-500/20"
                        : "border-border focus:ring-2 focus:ring-primary/20"
                    )}
                  />
                  {mobileNumber.length === 11 && !isValidMobile && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Invalid mobile number
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Card Details */}
            {selectedMethod === "card" && (
              <div className="space-y-3">
                <div className="bg-secondary/30 rounded-lg p-3 text-xs">
                  <p className="flex items-center gap-1.5 font-medium mb-0.5">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                    Secure Payment
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Your card details are encrypted and secure.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Card Number *</label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\D/g, "").slice(0, 16) })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">Expiry *</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
                        setCardDetails({ ...cardDetails, expiry: val.slice(0, 5) });
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">CVV *</label>
                    <input
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      placeholder="***"
                      maxLength={4}
                      className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Transfer Info */}
            {selectedMethod === "bank" && (
              <div className="space-y-3">
                <div className="bg-secondary/30 rounded-lg p-3 text-xs">
                  <p className="flex items-center gap-1.5 font-medium mb-0.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    Bank Details
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Transfer the exact amount to complete your order.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-[10px] font-semibold text-primary mb-1">ACCOUNT HOLDER</p>
                  <p className="font-bold text-sm">Friends Square Restaurant</p>
                  <p className="text-xs text-muted-foreground mt-2">Sonali Bank • 1234567890</p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Cash on Delivery Info */}
        {selectedMethod === "cod" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                <Banknote className="w-6 h-6 text-purple-600" />
              </div>
              <p className="font-semibold text-purple-800 text-sm">Pay on Delivery</p>
              <p className="text-xs text-purple-600 mt-1">
                Pay cash when your food arrives at your doorstep
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {showPayButton && (
        <>
          <button
            onClick={handleSubmit}
            disabled={!canProceed || isProcessing}
            className={cn(
              "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
              canProceed
                ? "bg-primary text-primary-foreground hover:shadow-lg active:scale-[0.98]"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            )}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-sm">Processing...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span className="text-sm">Pay ৳{finalAmount}</span>
              </>
            )}
          </button>

          {/* Security Notice */}
          <p className="text-[9px] text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
            <Shield className="w-2.5 h-2.5" />
            100% Secure Payment
          </p>
        </>
      )}
    </div>
  );
};

export default PaymentSection;