import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon, Clock, Users, Sparkles, User as UserIcon,
  Check, ChevronLeft, ChevronRight, Cake, Briefcase, Heart, Utensils, PartyPopper,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  { label: "Lunch", times: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"] },
  { label: "Dinner", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] },
];

const OCCASIONS = [
  { id: "Family Dinner", icon: Utensils, label: "Family Dinner" },
  { id: "Birthday", icon: Cake, label: "Birthday" },
  { id: "Anniversary", icon: Heart, label: "Anniversary" },
  { id: "Date Night", icon: Sparkles, label: "Date Night" },
  { id: "Corporate", icon: Briefcase, label: "Corporate" },
  { id: "Celebration", icon: PartyPopper, label: "Other" },
];

type Form = {
  date?: Date;
  time: string;
  guests: number;
  occasion: string;
  name: string;
  phone: string;
  notes: string;
};

const STEPS = [
  { n: 1, label: "Date", icon: CalendarIcon },
  { n: 2, label: "Time", icon: Clock },
  { n: 3, label: "Guests", icon: Users },
  { n: 4, label: "Occasion", icon: Sparkles },
  { n: 5, label: "Details", icon: UserIcon },
];

const ReservationPage = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<Form>({
    date: undefined, time: "", guests: 2, occasion: "", name: "", phone: "", notes: "",
  });

  const update = <K extends keyof Form>(k: K, v: Form[K]) => setForm((p) => ({ ...p, [k]: v }));

  const canProceed = () => {
    if (step === 1) return !!form.date;
    if (step === 2) return !!form.time;
    if (step === 3) return form.guests > 0;
    if (step === 4) return !!form.occasion;
    if (step === 5) return form.name.trim() && form.phone.trim();
    return false;
  };

  const next = () => { if (canProceed() && step < 5) { setDirection(1); setStep(step + 1); } };
  const prev = () => { if (step > 1) { setDirection(-1); setStep(step - 1); } };

  const submit = () => {
    if (!canProceed()) return;
    const msg = encodeURIComponent(
      `Hello Friends Square, I'd like to confirm a reservation:\n\n` +
      `👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n` +
      `📅 Date: ${form.date && format(form.date, "PPP")}\n⏰ Time: ${form.time}\n` +
      `👥 Guests: ${form.guests}\n✨ Occasion: ${form.occasion}\n` +
      (form.notes ? `📝 Notes: ${form.notes}\n` : "") +
      `\nPlease confirm availability. Thank you!`
    );
    window.open(`https://wa.me/8801752441799?text=${msg}`, "_blank");
    toast.success("Sending to WhatsApp for confirmation!");
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-12 min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="chip bg-primary/10 text-primary mb-3">Table Reservation</span>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold mb-2">Reserve your table</h1>
          <p className="text-muted-foreground">A few quick steps to secure your spot at Friends Square.</p>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => s.n < step && setStep(s.n)}
                  className={cn(
                    "relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all shrink-0",
                    s.n === step && "bg-primary text-primary-foreground shadow-[var(--shadow-warm)] scale-110",
                    s.n < step && "bg-primary/90 text-primary-foreground cursor-pointer hover:scale-105",
                    s.n > step && "bg-secondary text-muted-foreground"
                  )}>
                  {s.n < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground hidden sm:block">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-1 mx-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ width: s.n < step ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-primary"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-14">
          {/* Step content */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 min-h-[460px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2">When would you like to dine?</h2>
                    <p className="text-muted-foreground text-sm mb-6">Pick a date — we're open every day from 11AM to 11PM.</p>
                    <div className="flex justify-center">
                      <div className="bg-secondary/40 rounded-2xl p-2">
                        <Calendar
                          mode="single"
                          selected={form.date}
                          onSelect={(d) => update("date", d)}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2">Pick a time slot</h2>
                    <p className="text-muted-foreground text-sm mb-6">Choose lunch or dinner — we'll have your table ready.</p>
                    <div className="space-y-6">
                      {TIME_SLOTS.map((slot) => (
                        <div key={slot.label}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="chip bg-primary/10 text-primary">{slot.label}</span>
                            <div className="h-px flex-1 bg-border" />
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                            {slot.times.map((t) => (
                              <button key={t} type="button" onClick={() => update("time", t)}
                                className={cn(
                                  "py-3 rounded-xl text-sm font-semibold transition-all",
                                  form.time === t ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]" : "bg-secondary hover:bg-secondary/70 text-foreground"
                                )}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2">How many guests?</h2>
                    <p className="text-muted-foreground text-sm mb-8">Select your party size — we cater to small dates and large gatherings.</p>
                    <div className="flex items-center justify-center gap-6 mb-8">
                      <button onClick={() => update("guests", Math.max(1, form.guests - 1))}
                        className="w-14 h-14 rounded-full bg-secondary hover:bg-secondary/70 flex items-center justify-center text-2xl font-semibold">−</button>
                      <div className="text-center">
                        <div className="font-heading text-7xl md:text-8xl font-semibold text-primary leading-none">{form.guests}</div>
                        <div className="text-muted-foreground mt-2">{form.guests === 1 ? "Guest" : "Guests"}</div>
                      </div>
                      <button onClick={() => update("guests", Math.min(50, form.guests + 1))}
                        className="w-14 h-14 rounded-full bg-secondary hover:bg-secondary/70 flex items-center justify-center text-2xl font-semibold">+</button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-w-md mx-auto">
                      {[2, 4, 6, 8, 10, 12, 15, 20].map((n) => (
                        <button key={n} onClick={() => update("guests", n)}
                          className={cn(
                            "py-2 rounded-lg text-sm font-semibold transition-all",
                            form.guests === n ? "bg-primary text-primary-foreground" : "bg-secondary/60 hover:bg-secondary"
                          )}>{n}</button>
                      ))}
                    </div>
                    {form.guests >= 12 && (
                      <p className="text-center text-xs text-primary mt-5 bg-primary/5 py-3 rounded-xl">
                        For groups of 12+, our team will reach out to confirm seating arrangements.
                      </p>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2">What's the occasion?</h2>
                    <p className="text-muted-foreground text-sm mb-6">Tell us so we can make it extra special.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {OCCASIONS.map((o) => (
                        <button key={o.id} onClick={() => update("occasion", o.id)}
                          className={cn(
                            "p-5 rounded-2xl border-2 transition-all text-left group",
                            form.occasion === o.id ? "border-primary bg-primary/5 shadow-[var(--shadow-warm)]" : "border-border hover:border-primary/40 bg-secondary/30"
                          )}>
                          <o.icon className={cn("w-7 h-7 mb-2 transition-colors", form.occasion === o.id ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                          <div className="font-semibold text-sm">{o.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2">Your details</h2>
                    <p className="text-muted-foreground text-sm mb-6">We'll send confirmation via WhatsApp.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Full name</label>
                        <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Phone number</label>
                        <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+880..."
                          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Special requests <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="High chair, allergies, decorations..."
                          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button onClick={prev} disabled={step === 1}
                className="px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-xs text-muted-foreground">Step {step} of {STEPS.length}</span>
              {step < 5 ? (
                <button onClick={next} disabled={!canProceed()}
                  className="btn-primary px-6 py-2.5 inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={submit} disabled={!canProceed()}
                  className="btn-primary px-6 py-2.5 inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
                  Confirm <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-card border border-border rounded-3xl p-6 h-fit lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold">Reservation summary</h3>
            </div>
            <div className="space-y-3 text-sm">
              <SummaryRow icon={CalendarIcon} label="Date" value={form.date ? format(form.date, "EEE, MMM d, yyyy") : "—"} active={!!form.date} />
              <SummaryRow icon={Clock} label="Time" value={form.time || "—"} active={!!form.time} />
              <SummaryRow icon={Users} label="Guests" value={`${form.guests} ${form.guests === 1 ? "guest" : "guests"}`} active />
              <SummaryRow icon={Sparkles} label="Occasion" value={form.occasion || "—"} active={!!form.occasion} />
              <SummaryRow icon={UserIcon} label="Name" value={form.name || "—"} active={!!form.name} />
            </div>
            <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground space-y-2">
              <p>📞 We confirm all bookings via WhatsApp within minutes.</p>
              <p>✨ For special décor or cake, mention it in notes.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({ icon: Icon, label, value, active }: { icon: any; label: string; value: string; active: boolean }) => (
  <div className={cn("flex items-start gap-3 p-3 rounded-xl transition-colors", active ? "bg-primary/5" : "bg-secondary/30")}>
    <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
    <div className="flex-1 min-w-0">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={cn("font-semibold truncate", active ? "text-foreground" : "text-muted-foreground")}>{value}</div>
    </div>
  </div>
);

export default ReservationPage;
