import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 overflow-hidden">

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative">
        <div className="absolute top-0 right-0 -mr-[200px] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            <motion.h2 variants={fadeUp} className="text-primary tracking-widest uppercase text-sm mb-4 font-semibold">Our Heritage</motion.h2>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl text-white font-display mb-8 leading-tight">
              More Than <br className="hidden md:block" /> A Venue
            </motion.h1>
            <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
              <motion.p variants={fadeUp}>
                Founded in 2023, TONIQE emerged from a desire to bridge the gap between high-end culinary experiences and electrifying nightlife. We believe that an evening out shouldn't require compromising on food quality or settling for a mediocre atmosphere.
              </motion.p>
              <motion.p variants={fadeUp}>
                Our founders, veterans of the luxury hospitality industry, envisioned a space where every detail—from the bespoke lighting design to the hand-cut ice in your glass—is curated to perfection.
              </motion.p>
              <motion.p variants={fadeUp}>
                TONIQE isn't just a restaurant or a bar. It's a sanctuary for the modern connoisseur. A place where conversations flow over world-class dining, and nights escalate seamlessly into unforgettable celebrations.
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 border border-primary/30 rounded-lg" />
            <PlaceholderImage label="Founders at the Bar" aspectRatio="tall" className="w-full relative z-10 rounded-lg shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Vibe Quote */}
      <section className="relative py-32 border-y border-white/5 mb-32 bg-zinc-950/50 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl text-white font-display leading-relaxed">
            "We serve memories, 
            <span className="block mt-2 text-primary/80 italic">glass by glass, plate by plate, beat by beat."</span>
          </motion.h2>
        </motion.div>
      </section>

      {/* The Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
         <div className="absolute left-0 bottom-0 -ml-[200px] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="text-center mb-20 relative z-10"
        >
          <motion.h2 variants={fadeUp} className="text-primary tracking-widest uppercase text-sm mb-4 font-semibold">The Masters</motion.h2>
          <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl text-white font-display">Meet The Team</motion.h3>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
        >
          {[
            { name: "Julian Reyes", role: "Executive Chef", img: "Chef Portrait" },
            { name: "Sophia Lin", role: "Head Mixologist", img: "Mixologist Portrait" },
            { name: "Marcus Thorne", role: "Vibe Director", img: "DJ Portrait" }
          ].map((person, idx) => (
            <motion.div key={idx} variants={fadeUp} className="group text-center">
              <div className="relative mb-8 aspect-square w-64 md:w-72 mx-auto cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/40 transition-colors duration-700 opacity-50 group-hover:opacity-100" />
                <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-2 border-white/10 group-hover:border-primary/50 transition-all duration-700 bg-zinc-900 group-hover:scale-105">
                  <PlaceholderImage label={person.img} hideLabel className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <span className="bg-black/80 text-white px-4 py-2 text-xs tracking-widest uppercase border border-white/20 rounded-full backdrop-blur-md">View Profile</span>
                </div>
              </div>
              <h4 className="text-2xl text-white font-display mb-2 drop-shadow-md">{person.name}</h4>
              <p className="text-primary tracking-widest uppercase text-xs font-semibold">{person.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
  );
}
