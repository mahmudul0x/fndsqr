import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Check, X, Sparkles, Percent } from "lucide-react";

interface PromoCodeInputProps {
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
  appliedCode: string | null;
  discount: number;
  originalAmount: number;
  compact?: boolean;
}

const PromoCodeInput = ({ onApply, onRemove, appliedCode, discount, originalAmount, compact }: PromoCodeInputProps) => {
  const [code, setCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");

  const validCodes: Record<string, number> = {
    "FRIENDS10": 10, // 10% off
    "SAVE15": 15,    // 15% off
    "WELCOME20": 20, // 20% off
    "FIRSTORDER": 15,
    "SUMMER25": 25,
    "DELIVERYFREE": 100, // 100% delivery fee (currently free anyway)
  };

  const handleApply = async () => {
    const upperCode = code.toUpperCase().trim();

    if (!upperCode) {
      setError("Please enter a promo code");
      return;
    }

    setIsChecking(true);
    setError("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const discountPercent = validCodes[upperCode];

    if (discountPercent === undefined) {
      setError("Invalid promo code");
    } else if (appliedCode === upperCode) {
      setError("This code is already applied");
    } else {
      onApply(upperCode, discountPercent);
      setCode("");
    }

    setIsChecking(false);
  };

  const discountAmount = (originalAmount * discount) / 100;

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {!appliedCode ? (
        <div>
          <label className={compact ? "block text-xs font-semibold mb-1 flex items-center gap-1" : "block text-sm font-semibold mb-2 flex items-center gap-2"}>
            <Tag className={compact ? "w-3 h-3 text-primary" : "w-4 h-4 text-primary"} />
            {!compact && "Promo Code"}
            {!compact && <Sparkles className="w-3 h-3 text-amber-500" />}
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
                placeholder="Enter code (e.g., FRIENDS10)"
                className={compact ? "w-full px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20" : "w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"}
                disabled={isChecking}
              />
              {code && (
                <button
                  onClick={() => setCode("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className={compact ? "w-3 h-3" : "w-4 h-4"} />
                </button>
              )}
            </div>
            <button
              onClick={handleApply}
              disabled={isChecking || !code.trim()}
              className={compact ? "px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground font-medium text-xs hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-border" : "px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-border"}
            >
              {isChecking ? "..." : "Apply"}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-1 text-xs text-destructive flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Available codes hint */}
          <div className={compact ? "mt-1 flex flex-wrap gap-1" : "mt-2 flex flex-wrap gap-1"}>
            {Object.keys(validCodes).slice(0, 3).map((code) => (
              <button
                key={code}
                onClick={() => setCode(code)}
                className={compact ? "text-[9px] px-1.5 py-0.5 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors" : "text-[10px] px-2 py-1 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Applied Code Display
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={compact ? "bg-green-50 border border-green-200 rounded-lg p-2" : "bg-green-50 border border-green-200 rounded-xl p-4"}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={compact ? "w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center" : "w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"}>
                <Check className={compact ? "w-3 h-3" : "w-4 h-4"} />
              </div>
              <div>
                <p className={compact ? "font-semibold text-green-800 text-xs" : "font-semibold text-green-800 text-sm"}>{appliedCode}</p>
                {!compact && <p className="text-xs text-green-600">Code applied</p>}
              </div>
            </div>
            <button
              onClick={onRemove}
              className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded transition-colors"
            >
              <X className={compact ? "w-3 h-3" : "w-4 h-4"} />
            </button>
          </div>
          {!compact && (
            <div className="flex items-center gap-2 text-sm">
              <Percent className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-800">
                {discount}% discount applied
              </span>
              <span className="text-green-600">(৳{discountAmount.toFixed(0)} saved)</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Discount Preview */}
      {discount > 0 && (
        <div className={compact ? "bg-secondary/30 rounded p-2 text-xs" : "bg-secondary/30 rounded-lg p-3 text-xs"}>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount ({discount}%)</span>
            <span className="text-green-600 font-semibold">-৳{discountAmount.toFixed(0)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;
