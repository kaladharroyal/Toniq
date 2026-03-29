import { PlaceholderImage } from "@/components/ui/placeholder-image";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      
      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-primary tracking-widest uppercase text-sm mb-4">Our Heritage</h2>
            <h1 className="text-5xl md:text-7xl text-white font-display mb-8">More Than A Venue</h1>
            <div className="space-y-6 text-white/60 font-light leading-relaxed">
              <p>
                Founded in 2023, Tonique emerged from a desire to bridge the gap between high-end culinary experiences and electrifying nightlife. We believe that an evening out shouldn't require compromising on food quality or settling for a mediocre atmosphere.
              </p>
              <p>
                Our founders, veterans of the luxury hospitality industry, envisioned a space where every detail—from the bespoke lighting design to the hand-cut ice in your glass—is curated to perfection.
              </p>
              <p>
                Tonique isn't just a restaurant or a bar. It's a sanctuary for the modern connoisseur. A place where conversations flow over world-class dining, and nights escalate seamlessly into unforgettable celebrations.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <PlaceholderImage label="Founders at the Bar" aspectRatio="tall" className="w-full border border-white/10 shadow-[20px_20px_0px_0px_rgba(245,158,11,0.1)]" />
          </div>
        </div>
      </section>

      {/* Vibe Quote */}
      <section className="bg-zinc-950 py-24 border-y border-white/5 mb-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl text-white font-display leading-relaxed">
            "We serve memories, glass by glass, plate by plate, beat by beat."
          </h2>
        </div>
      </section>

      {/* The Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary tracking-widest uppercase text-sm mb-4">The Masters</h2>
          <h3 className="text-4xl md:text-5xl text-white font-display">Meet The Team</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: "Julian Reyes", role: "Executive Chef", img: "Chef Portrait" },
            { name: "Sophia Lin", role: "Head Mixologist", img: "Mixologist Portrait" },
            { name: "Marcus Thorne", role: "Vibe Director", img: "DJ Portrait" }
          ].map((person, idx) => (
            <div key={idx} className="group text-center">
              <div className="mb-6 overflow-hidden rounded-full border-2 border-white/5 p-2 transition-colors duration-500 group-hover:border-primary/50 aspect-square w-64 mx-auto">
                <PlaceholderImage label={person.img} className="w-full h-full rounded-full" />
              </div>
              <h4 className="text-2xl text-white font-display mb-2">{person.name}</h4>
              <p className="text-primary tracking-widest uppercase text-xs">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
