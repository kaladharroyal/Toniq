import { useState } from "react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import imgBarWhatsapp from "@/assets/gallery/bar_whatsapp.jpeg";
import imgBarBig from "@/assets/gallery/bar.jpg";
import imgBar1 from "@/assets/gallery/bar.jpeg";
import imgBar3 from "@/assets/gallery/bar3.jpeg";
import imgOpenDining from "@/assets/gallery/open dining.jpg";
import imgSeating from "@/assets/gallery/seating.jpeg";
import imgSofa from "@/assets/gallery/sofa.jpeg";
import imgPartyHall from "@/assets/gallery/party_hall.png";
import imgParkingIn from "@/assets/gallery/IN.jpeg";
import imgParkingOut from "@/assets/gallery/OUT.jpeg";
import imgParkingOut2 from "@/assets/gallery/OUT2.jpeg";

type GallerySection = {
  title: string;
  images: { label: string; img?: string }[];
};

const gallerySections: GallerySection[] = [
  {
    title: "Dining Area",
    images: [
      { label: "Main Floor", img: imgOpenDining },
      { label: "Opulent Tables", img: imgSeating },
      { label: "Intimate Booths", img: imgSofa },
      { label: "Party Hall", img: imgPartyHall }
    ]
  },
  {
    title: "The Bar",
    images: [
      { label: "Mixology in Action", img: imgBarWhatsapp },
      { label: "Liquor Shelf", img: imgBarBig },
      { label: "Bar Seating", img: imgBar1 },
      { label: "Cocktail Prep", img: imgBar3 }
    ]
  },
  {
    title: "Ambiance",
    images: [
      { label: "Party Hall", img: imgPartyHall },
      { label: "Lounge Area", img: imgSofa },
      { label: "Vibe", img: imgBar3 },
      { label: "Live DJ", img: imgBarWhatsapp }
    ]
  },
  {
    title: "Parking",
    images: [
      { label: "Arrival IN", img: imgParkingIn },
      { label: "Departure OUT", img: imgParkingOut },
      { label: "Valet Service", img: imgParkingOut2 },
      { label: "Parking Zone", img: imgParkingIn }
    ]
  }
];

const getGridSpan = (sectionIdx: number, imgIdx: number) => {
  const isEven = sectionIdx % 2 === 0;

  if (isEven) {
    // Left-heavy large block
    if (imgIdx === 0) return "col-span-2 row-span-2"; 
    if (imgIdx === 1) return "col-span-1";           
    if (imgIdx === 2) return "col-span-1";           
    if (imgIdx === 3) return "col-span-2";         
  } else {
    // Right-heavy large block (Desktop) / Bottom-heavy (Mobile)
    if (imgIdx === 0) return "col-span-2 md:col-span-1"; 
    if (imgIdx === 1) return "col-span-1 md:col-span-1";           
    if (imgIdx === 2) return "col-span-1 md:col-span-2 md:row-span-2";           
    if (imgIdx === 3) return "col-span-2 row-span-2 md:row-span-1";         
  }
  return "";
};

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<{ img?: string, label: string } | null>(null);

  // Lock scroll when modal is open
  if (typeof document !== "undefined") {
    if (selectedImg) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl text-white font-display mb-6"
          >
            The Visual Experience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
            className="text-white/60 text-lg font-light max-w-2xl mx-auto"
          >
            Explore the sophisticated aesthetic and electrifying atmosphere that makes TONIQE incredibly unique.
          </motion.p>
        </div>

        <div className="space-y-32">
          {gallerySections.map((section, idx) => (
            <div key={idx}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-6 mb-10"
              >
                <h2 className="text-3xl text-primary font-display tracking-widest uppercase shrink-0">
                  {section.title}
                </h2>
                <div className="h-px bg-white/10 w-full" />
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[300px]">
                {section.images.map((item, imgIdx) => (
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: imgIdx * 0.15, ease: "easeOut" }}
                    className={getGridSpan(idx, imgIdx)}
                  >
                    <div 
                      className="w-full h-full relative overflow-hidden rounded-xl border border-white/10 group cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black"
                      onClick={() => setSelectedImg(item)}
                    >
                      <PlaceholderImage
                        label={item.label}
                        src={item.img}
                        hideLabel
                        className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-primary font-display tracking-widest uppercase text-sm">{item.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-10 cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full border border-white/10">
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              src={selectedImg.img} 
              alt={selectedImg.label} 
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking the image
            />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-10 inset-x-0 text-center"
            >
              <h4 className="text-white font-display uppercase tracking-widest text-xl">{selectedImg.label}</h4>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
