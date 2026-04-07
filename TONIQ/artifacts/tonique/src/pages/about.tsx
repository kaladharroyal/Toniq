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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-32 relative">
        <div className="absolute top-0 right-0 -mr-[200px] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="order-1"
          >
            <motion.h2 variants={fadeUp} className="text-primary tracking-widest uppercase text-sm mb-4 font-semibold">Our Heritage</motion.h2>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl text-white font-display mb-8 leading-tight">
              More Than <br className="hidden md:block" /> A Venue
            </motion.h1>

            <div className="text-white/60 font-light leading-relaxed text-lg lg:space-y-6">
              <motion.p variants={fadeUp} className="mb-6 lg:mb-0">
                Founded in 2023, TONIQE emerged from a desire to bridge the gap between high-end culinary experiences and electrifying nightlife. We believe that an evening out shouldn't require compromising on food quality or settling for a mediocre atmosphere.
              </motion.p>
              
              <motion.div variants={fadeUp} className="relative block lg:hidden float-right w-44 sm:w-56 ml-5 mb-3 mt-1">
                 <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-primary/30 rounded-lg" />
                 <PlaceholderImage label="Founders" aspectRatio="tall" className="w-full relative z-10 rounded-lg shadow-2xl" />
              </motion.div>

              <motion.p variants={fadeUp} className="mb-6 lg:mb-0">
                Our founders, veterans of the luxury hospitality industry, envisioned a space where every detail—from the bespoke lighting design to the hand-cut ice in your glass—is curated to perfection.
              </motion.p>
              <motion.p variants={fadeUp}>
                TONIQE isn't just a restaurant or a bar. It's a sanctuary for the modern connoisseur. A place where conversations flow over world-class dining, and nights escalate seamlessly into unforgettable celebrations.
              </motion.p>
              <div className="clear-both table lg:hidden"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block order-2 relative"
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 border border-primary/30 rounded-lg" />
            <PlaceholderImage label="Founders at the Bar" aspectRatio="tall" className="w-full relative z-10 rounded-lg shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Vibe Quote */}
      <section className="relative py-16 md:py-32 border-y border-white/5 mb-16 md:mb-32 bg-zinc-950/50 backdrop-blur-xl">
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
          className="flex flex-col items-center gap-16 relative z-10"
        >
          {/* Top of Triangle */}
          <div className="w-full flex justify-center">
            {[{ name: "Julian Reyes", role: "Executive Chef", img: "Chef Portrait" }].map((person, idx) => (
              <motion.div key={`top-${idx}`} variants={fadeUp} className="text-center w-full max-w-sm">
                <div className="relative mb-8 aspect-square w-64 md:w-72 mx-auto cursor-default">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-50" />
                  <div className="relative z-10 h-full w-full overflow-hidden rounded-full border border-white/10 bg-zinc-900">
                    <PlaceholderImage label={person.img} hideLabel className="w-full h-full object-cover rounded-full grayscale" />
                  </div>
                </div>
                <h4 className="text-2xl text-white font-display mb-2 drop-shadow-md">{person.name}</h4>
                <p className="text-primary tracking-widest uppercase text-xs font-semibold">{person.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom of Triangle */}
          <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-24 w-full">
            {[
              { name: "Sophia Lin", role: "Head Mixologist", img: "Mixologist Portrait" },
              { name: "Marcus Thorne", role: "Vibe Director", img: "DJ Portrait" }
            ].map((person, idx) => (
              <motion.div key={`bottom-${idx}`} variants={fadeUp} className="text-center w-full max-w-sm">
                <div className="relative mb-8 aspect-square w-64 md:w-72 mx-auto cursor-default">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-50" />
                  <div className="relative z-10 h-full w-full overflow-hidden rounded-full border border-white/10 bg-zinc-900">
                    <PlaceholderImage label={person.img} hideLabel className="w-full h-full object-cover rounded-full grayscale" />
                  </div>
                </div>
                <h4 className="text-2xl text-white font-display mb-2 drop-shadow-md">{person.name}</h4>
                <p className="text-primary tracking-widest uppercase text-xs font-semibold">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
}
