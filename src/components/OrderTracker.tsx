import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ChefHat, Bike, CheckCircle, Package, Truck, Navigation } from "lucide-react";

interface DeliveryStep {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface OrderTrackerProps {
  estimatedTime: number; // minutes
  className?: string;
}

const OrderTracker = ({ estimatedTime, className = "" }: OrderTrackerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(estimatedTime);

  // Simulate order progression (for demo purposes)
  useEffect(() => {
    if (currentStep >= 4) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Countdown timer
  useEffect(() => {
    if (currentStep >= 4) return;

    const countdown = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 60000); // Decrease by 1 minute every real minute (accelerated for demo)

    return () => clearInterval(countdown);
  }, [currentStep]);

  const formatTime = (minutes: number) => {
    if (minutes <= 0) return "Arriving now!";
    if (minutes < 60) return `${minutes} min`;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  };

  const steps: DeliveryStep[] = [
    { id: 0, label: "Order Confirmed", icon: CheckCircle, description: "Your order has been received" },
    { id: 1, label: "Preparing", icon: ChefHat, description: "Chefs are cooking your food" },
    { id: 2, label: "Out for Delivery", icon: Bike, description: "On the way to you" },
    { id: 3, label: "Almost There", icon: Truck, description: "Arriving in ~5 minutes" },
    { id: 4, label: "Delivered", icon: Package, description: "Enjoy your meal!" }
  ];

  const activeStep = steps[currentStep];

  return (
    <div className={`bg-gradient-to-br from-card to-secondary/20 border border-border rounded-2xl p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estimated Delivery</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-heading text-lg font-bold text-foreground">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-amber-500 text-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Live Tracking
          </div>
          <p className="text-xs text-muted-foreground mt-1">Dinajpur City</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: currentStep }}
          transition={{ duration: 0.5 }}
          className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary origin-top"
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-6 pl-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-4"
              >
                {/* Icon Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium text-sm ${isCurrent ? "text-primary" : ""}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <span className="text-xs text-primary font-medium animate-pulse">
                        Now
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Delivery Address Preview */}
      {currentStep >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-4 border-t border-border"
        >
          <div className="flex items-start gap-2 text-xs">
            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Delivering to:</p>
              <p className="text-muted-foreground">
                {currentStep === 4 ? "Delivered!" : "On the way..."}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Contact Driver (when out for delivery) */}
      {currentStep === 2 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Track on Map
        </motion.button>
      )}
    </div>
  );
};

export default OrderTracker;
