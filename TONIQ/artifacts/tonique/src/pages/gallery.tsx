import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { motion } from "framer-motion";

const gallerySections = [
  {
    title: "Dining Area",
    images: ["Opulent Tables", "Chandelier View", "Intimate Booths", "Main Floor"]
  },
  {
    title: "The Bar",
    images: ["Mixology in Action", "Liquor Shelf", "Bar Seating", "Cocktail Prep"]
  },
  {
    title: "Ambiance",
    images: ["Live DJ", "Lighting Details", "Lounge Area", "Vibe"]
  }
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl text-white font-display mb-6">The Visual Experience</h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Explore the sophisticated aesthetic and electrifying atmosphere that makes Tonique unique.
          </p>
        </div>

        <div className="space-y-32">
          {gallerySections.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-3xl text-primary font-display tracking-widest uppercase shrink-0">
                  {section.title}
                </h2>
                <div className="h-px bg-white/10 w-full" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.images.map((label, imgIdx) => (
                  <motion.div 
                    key={imgIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: imgIdx * 0.1 }}
                    className={imgIdx === 0 ? "md:col-span-2 md:row-span-2" : ""}
                  >
                    <div className="w-full h-full min-h-[300px] border border-white/5 overflow-hidden rounded-sm group relative">
                       <PlaceholderImage 
                         label={label} 
                         className="w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
                       />
                       {/* Glassmorphic overlay label on hover */}
                       <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black/60 backdrop-blur-md border-t border-white/10">
                          <p className="text-white font-display tracking-widest uppercase text-sm">{label}</p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
