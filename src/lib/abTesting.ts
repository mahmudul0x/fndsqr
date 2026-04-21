// A/B Testing Framework for Checkout Optimization
// Stores experiment data in localStorage for persistence

type Variant = "A" | "B" | "C";
type Experiment = {
  name: string;
  variants: Variant[];
  defaultVariant: Variant;
  conversions: Record<Variant, number>;
  impressions: Record<Variant, number>;
};

type ABTestConfig = {
  layout: Variant;          // A: Multi-step, B: Single-page
  buttonText: Variant;      // A: "Order Now", B: "Confirm Order"
  badgePlacement: Variant;  // A: Sidebar, B: Checkout header, C: Both
  colorScheme: Variant;     // A: Primary (terracotta), B: Blue trust
};

class ABTesting {
  private experiments: Record<string, Experiment> = {};
  private userVariants: Record<string, Variant> = {};
  private readonly STORAGE_KEY = "checkout_ab_tests";

  constructor() {
    this.loadFromStorage();
    this.initializeExperiments();
  }

  private initializeExperiments() {
    // Experiment 1: Checkout Layout
    this.registerExperiment("layout", {
      name: "Checkout Layout",
      variants: ["A", "B"],
      defaultVariant: "A",
      conversions: { A: 0, B: 0 },
      impressions: { A: 0, B: 0 }
    });

    // Experiment 2: Button Text
    this.registerExperiment("button_text", {
      name: "CTA Button Text",
      variants: ["A", "B"],
      defaultVariant: "A",
      conversions: { A: 0, B: 0 },
      impressions: { A: 0, B: 0 }
    });

    // Experiment 3: Trust Badge Placement
    this.registerExperiment("badge_placement", {
      name: "Trust Badge Location",
      variants: ["A", "B", "C"],
      defaultVariant: "A",
      conversions: { A: 0, B: 0, C: 0 },
      impressions: { A: 0, B: 0, C: 0 }
    });

    // Experiment 4: Color Scheme
    this.registerExperiment("color_scheme", {
      name: "Primary Color",
      variants: ["A", "B"],
      defaultVariant: "A",
      conversions: { A: 0, B: 0 },
      impressions: { A: 0, B: 0 }
    });
  }

  private registerExperiment(key: string, config: Experiment) {
    this.experiments[key] = config;
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.experiments = data.experiments || {};
        this.userVariants = data.userVariants || {};
      }
    } catch (e) {
      console.warn("Failed to load A/B test data:", e);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({
          experiments: this.experiments,
          userVariants: this.userVariants
        })
      );
    } catch (e) {
      console.warn("Failed to save A/B test data:", e);
    }
  }

  // Get variant for user (consistent within session)
  public getVariant(experimentKey: string): Variant {
    // Check if we already assigned a variant
    if (this.userVariants[experimentKey]) {
      return this.userVariants[experimentKey];
    }

    const experiment = this.experiments[experimentKey];
    if (!experiment) return "A";

    // Assign variant based on session/user randomness
    // In production, you'd use user ID or consistent hashing
    const variantIndex = Math.floor(Math.random() * experiment.variants.length);
    const assignedVariant = experiment.variants[variantIndex] as Variant;

    this.userVariants[experimentKey] = assignedVariant;
    this.recordImpression(experimentKey, assignedVariant);
    this.saveToStorage();

    return assignedVariant;
  }

  public recordImpression(experimentKey: string, variant: Variant) {
    const experiment = this.experiments[experimentKey];
    if (experiment) {
      experiment.impressions[variant]++;
      this.saveToStorage();
    }
  }

  public recordConversion(experimentKey: string, variant: Variant) {
    const experiment = this.experiments[experimentKey];
    if (experiment) {
      experiment.conversions[variant]++;
      this.saveToStorage();
    }
  }

  public getVariantConfig(): ABTestConfig {
    return {
      layout: this.getVariant("layout"),
      buttonText: this.getVariant("button_text"),
      badgePlacement: this.getVariant("badge_placement"),
      colorScheme: this.getVariant("color_scheme")
    };
  }

  // Get human-readable variant names
  public getVariantLabel(experimentKey: string, variant: Variant): string {
    const labels: Record<string, Record<Variant, string>> = {
      layout: {
        A: "Multi-Step",
        B: "Single-Page"
      },
      button_text: {
        A: "Order Now",
        B: "Confirm Order"
      },
      badge_placement: {
        A: "Sidebar Only",
        B: "Checkout Header",
        C: "Both"
      },
      color_scheme: {
        A: "Red Brand",
        B: "Blue Trust"
      }
    };
    return labels[experimentKey]?.[variant] || variant;
  }

  // Get statistics for dashboard/analysis
  public getStats() {
    return Object.entries(this.experiments).map(([key, exp]) => ({
      experiment: exp.name,
      variants: exp.variants.map(v => ({
        variant: v,
        impressions: exp.impressions[v],
        conversions: exp.conversions[v],
        rate: exp.impressions[v] > 0
          ? ((exp.conversions[v] / exp.impressions[v]) * 100).toFixed(2)
          : "0.00"
      }))
    }));
  }

  // Force a specific variant (for testing/debugging)
  public forceVariant(experimentKey: string, variant: Variant) {
    this.userVariants[experimentKey] = variant;
    this.saveToStorage();
  }

  // Reset all experiments (for fresh testing)
  public resetAll() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.reload();
  }
}

// Singleton instance
export const abTest = new ABTesting();

// Custom hook for using A/B tests in components
export const useABTest = (experimentKey: string) => {
  const variant = abTest.getVariant(experimentKey);
  const label = abTest.getVariantLabel(experimentKey, variant);
  return { variant, label };
};

// Record conversion when order is placed
export const recordConversion = (experimentKey: string, variant: Variant) => {
  abTest.recordConversion(experimentKey, variant);
};

export default ABTesting;
