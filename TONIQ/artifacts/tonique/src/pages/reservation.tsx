import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Clock, Users, User, Phone, CheckCircle2, Mail } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

const timeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
];

const disabledSlots = ["18:30", "19:00", "20:30"]; // Mock unavailable times

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [date, setDate] = useState("");
  const [bookedTables, setBookedTables] = useState<string[]>([]);

  useEffect(() => {
    if (date && selectedTime) {
      fetch(`http://localhost:3000/api/reservations/booked?date=${date}&time=${selectedTime}`)
        .then(res => res.json())
        .then(data => {
          if (data.bookedTables) {
            setBookedTables(data.bookedTables);
          }
        })
        .catch(err => console.error("Failed to check availability"));
    } else {
      setBookedTables([]);
    }
  }, [date, selectedTime]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const tableNumber = formData.get("tableNumber") as string;

    if (!tableNumber) {
      alert("Please select a table.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        date: formData.get("date"),
        guests: formData.get("guests"),
        tableNumber,
        time: selectedTime,
      };

      const res = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to book");
      setSubmitted(true);
    } catch (err) {
      alert("Failed to confirm reservation. Is your API server running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full glass-panel p-12 text-center rounded-sm"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl text-white font-display mb-4">Reservation Confirmed</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Thank you for booking with Tonique. A confirmation email has been sent to you. We look forward to hosting you for an unforgettable evening.
          </p>
          <Link 
            to="/"
            className="px-8 py-3 border border-white/20 text-white font-display tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 inline-block"
          >
            Go to Home Page
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 pt-10">
          <h1 className="text-5xl md:text-7xl text-white font-display mb-6">Book Your Table</h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Secure your evening at Tonique. For parties larger than 6, please contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Decorative Side */}
          <div className="hidden lg:block relative h-full min-h-[600px] border border-white/10 rounded-sm overflow-hidden">
            <PlaceholderImage label="Table Setup & Ambiance" className="w-full h-full absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 p-8 glass-panel text-center">
              <h3 className="text-2xl text-primary font-display tracking-widest uppercase mb-2">Dress Code</h3>
              <p className="text-white/80 font-light text-sm">Smart elegant attire is required. We kindly ask our guests to refrain from wearing athletic wear or beachwear.</p>
            </div>
          </div>

          {/* Form */}
          <div className="glass-panel p-8 md:p-12 rounded-sm border-t-2 border-t-primary">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-display tracking-widest text-white/60 uppercase flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input 
                    name="name"
                    required
                    type="text" 
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-display tracking-widest text-white/60 uppercase flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </label>
                  <input 
                    name="phone"
                    required
                    type="tel" 
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-display tracking-widest text-white/60 uppercase flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <input 
                  name="email"
                  required
                  type="email" 
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/30"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-display tracking-widest text-white/60 uppercase flex items-center gap-2">
                    <Calendar size={14} /> Date
                  </label>
                  <input 
                    name="date"
                    required
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors color-scheme-dark"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-display tracking-widest text-white/60 uppercase flex items-center gap-2">
                    <Users size={14} /> Guests
                  </label>
                  <select 
                    name="guests"
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num} className="bg-zinc-900">{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-display tracking-widest text-white/60 uppercase flex items-center gap-2 mb-4">
                  <Clock size={14} /> Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => {
                    const isDisabled = disabledSlots.includes(time);
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "py-3 text-sm font-display tracking-widest transition-all duration-300 border rounded-sm",
                          isDisabled 
                            ? "border-white/5 text-white/20 cursor-not-allowed bg-black/20 line-through" 
                            : isSelected 
                              ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                              : "border-white/20 text-white hover:border-primary/50 hover:text-primary"
                        )}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-display tracking-widest text-white/60 uppercase flex items-center gap-2">
                    <Users size={14} /> Table Number
                  </label>
                  <select 
                    name="tableNumber"
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="" disabled selected className="bg-zinc-900">Select Table</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => {
                      const tableName = `Table ${num}`;
                      const isBooked = bookedTables.includes(tableName);
                      return (
                        <option 
                          key={num} 
                          value={tableName} 
                          disabled={isBooked}
                          className={cn("bg-zinc-900", isBooked && "text-white/30")}
                        >
                          {tableName} {isBooked ? "(Booked)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground font-display text-lg tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 box-glow disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? "Processing..." : "Confirm Reservation"}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
