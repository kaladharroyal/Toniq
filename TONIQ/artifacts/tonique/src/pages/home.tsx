import { useState, useEffect, useRef, Children } from "react";
import { Link } from "wouter";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ArrowRight, GlassWater, Music, Utensils } from "lucide-react";
import Reviews from "@/components/ui/Reviews";
import heroBg from "@/assets/hero-bg.png";
import imgChicken555 from "@/assets/menu/Chicken 555.jpg";
import imgRamboBiryani from "@/assets/menu/Rambo Biryani.jpg";
import imgChickenManchowSoup from "@/assets/menu/Chicken Manchow Soup.jpg";
import imgButterNaan from "@/assets/menu/Butter Naan.jpg";

import imgBarBig from "@/assets/gallery/bar.jpg";
import imgOpenDining from "@/assets/gallery/open dining.jpg";
import imgSofa from "@/assets/gallery/sofa.jpeg";
import imgBar3 from "@/assets/gallery/bar3.jpeg";
import imgBarWhatsapp from "@/assets/gallery/bar_whatsapp.jpeg";
import imgPartyHall from "@/assets/gallery/party_hall.png";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

function MobileAutoSlider({ children, desktopClass }: { children: React.ReactNode, desktopClass: string }) {
  const childArray = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % childArray.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isMobile, childArray.length]);

  if (!isMobile) {
    return <div className={desktopClass}>{children}</div>;
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const delta = touchEnd - touchStart.current;

    // Minimum swipe distance
    if (delta < -30) {
      setActive((prev) => (prev + 1) % childArray.length);
    } else if (delta > 30) {
      setActive((prev) => (prev - 1 + childArray.length) % childArray.length);
    }
    touchStart.current = null;
  };

  return (
    <div 
      className="relative w-full py-4 flex flex-col items-center justify-center overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-[400px] flex justify-center items-center perspective-[1000px]">
        <AnimatePresence mode="popLayout">
          {[-1, 0, 1].map((slotOffset) => {
            // Find the true child index
            const index = (active + slotOffset + childArray.length) % childArray.length;
            const child = childArray[index];
            const isCenter = slotOffset === 0;

            const x = slotOffset * 65; 
            const rotateY = slotOffset * -35; 
            const scale = isCenter ? 1 : 0.85; 
            const zIndex = isCenter ? 10 : 8; 
            
            return (
              <motion.div
                key={index}
                layout
                initial={{ 
                  opacity: 0, 
                  x: `${slotOffset > 0 ? 130 : -130}%`, 
                  scale: 0.7 
                }}
                animate={{
                  opacity: 1,
                  x: `${x}%`,
                  rotateY: rotateY,
                  scale: scale,
                  zIndex: zIndex,
                  filter: isCenter ? "brightness(1) blur(0px)" : "brightness(0.35) blur(1.5px)",
                }}
                exit={{ 
                  opacity: 0, 
                  x: `${slotOffset > 0 ? 130 : -130}%`, 
                  scale: 0.7,
                  zIndex: 0
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-[68%] sm:w-[50%] h-[360px] shadow-2xl rounded-xl cursor-pointer"
                onClick={() => {
                  if (!isCenter) setActive(index);
                }}
              >
                <div 
                  className="w-full h-full rounded-xl overflow-hidden" 
                  style={{ pointerEvents: isCenter ? "auto" : "none" }}
                >
                  {child}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Dynamic Dot Indicators */}
      <div className="flex gap-2 mt-6">
        {childArray.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20"
        >
          <motion.h2 variants={fadeUp} className="text-primary tracking-[0.3em] uppercase text-sm md:text-base mb-6 font-semibold">
            Welcome to TONIQE
          </motion.h2>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl text-white font-display leading-snug mb-8">
            Craft Cocktails.<br />
            <span className="text-primary">Unforgettable Nights.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
            An immersive dining and nightlife experience blending culinary excellence with electrifying ambiance.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* <Link
              href="/reservation"
              className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground font-display tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 box-glow-strong"
            >
              Reserve Table
            </Link> */}
            <Link
              href="/menu"
              className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/20 text-white font-display tracking-widest uppercase hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              View Menu
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="pt-4 pb-20 md:py-24 -mt-16 md:mt-0 relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <MobileAutoSlider desktopClass="md:grid md:grid-cols-3 md:gap-12 md:flex-none">
              {[
                { icon: GlassWater, title: "Master Mixology", desc: "Award-winning bartenders crafting signature libations with premium spirits." },
                { icon: Utensils, title: "Culinary Art", desc: "A modern fusion menu designed to delight the palate and complement your drinks." },
                { icon: Music, title: "Electric Vibe", desc: "Curated soundtracks and live DJs setting the perfect tone for your evening." }
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeUp} className="glass-panel p-10 text-center flex flex-col items-center group h-full md:hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                    <feature.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl text-white font-display tracking-widest uppercase mb-4">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </MobileAutoSlider>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 bg-zinc-950 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-primary tracking-widest uppercase text-sm mb-3">Taste The Excellence</h2>
              <h3 className="text-4xl md:text-5xl text-white font-display">Chef's Signatures</h3>
            </div>
            <Link href="/menu" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors tracking-widest uppercase text-sm mt-6">
              Full Menu <ArrowRight size={16} />
            </Link>
          </div>

          <MobileAutoSlider desktopClass="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:flex-none max-w-full">
            {[
              { name: "Chicken 555", desc: "Spicy deep-fried chicken with fiery seasoning", tag: "Appetizer", cat: "Appetizer", img: imgChicken555 },
              { name: "Rambo Biryani", desc: "Extra-loaded signature biryani with bold flavors", tag: "Main Course", cat: "Main Course", img: imgRamboBiryani },
              { name: "Chicken Manchow Soup", desc: "Spiced chicken broth topped with crispy fried noodles", tag: "Soup", cat: "Soups", img: imgChickenManchowSoup },
              { name: "Butter Naan", desc: "Soft leavened bread slathered with rich butter", tag: "Breads", cat: "Breads", img: imgButterNaan }
            ].map((item, i) => (
              <Link href={`/menu#${item.cat}`} key={i} className="group relative overflow-hidden bg-black border border-white/10 hover:border-primary/50 transition-colors duration-500 block w-full h-full">
                <PlaceholderImage label={`Menu Item: ${item.name}`} src={item.img} aspectRatio="tall" className="w-full" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-primary uppercase tracking-widest border border-white/10 group-hover:bg-primary/20 transition-colors">
                  {item.tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6 transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl text-white font-display tracking-wide mb-2">{item.name}</h4>
                  <p className="text-white/60 text-sm md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:delay-100">{item.desc}</p>
                </div>
              </Link>
            ))}
          </MobileAutoSlider>

          <div className="mt-10 md:hidden flex justify-center">
            <Link href="/menu" className="flex items-center gap-2 text-primary hover:text-white transition-colors tracking-widest uppercase text-sm">
              Explore Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary tracking-widest uppercase text-sm mb-3">The Atmosphere</h2>
            <h3 className="text-4xl md:text-5xl text-white font-display">A Glimpse Inside</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[250px] overflow-hidden">
            <PlaceholderImage src={imgOpenDining} label="Dining Room" className="col-span-2 row-span-2" />
            <PlaceholderImage src={imgBarBig} label="Main Bar" />
            <PlaceholderImage src={imgSofa} label="VIP Lounge" />
            <PlaceholderImage src={imgBar3} label="Cocktail Detail" />
            <PlaceholderImage src={imgBarWhatsapp} label="Mixology in Action" className="col-span-1 md:col-span-2" />
          </div>

          <div className="mt-12 text-center">
            <Link href="/gallery" className="inline-block px-8 py-4 border border-white/20 text-white font-display tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Reviews />

      {/* CTA Section */}
      {/* <section className="py-32 relative">
        <div className="absolute inset-0 z-0 opacity-40">
          <PlaceholderImage src={imgPartyHall} label="Party Hall" hideLabel className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl text-white font-display mb-8">Join The Night</h2>
          <p className="text-xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
            Secure your spot at the most exclusive venue in town. Reservations are highly recommended.
          </p>
          <Link
            href="/reservation"
            className="inline-block px-12 py-5 bg-primary text-primary-foreground font-display text-lg tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_40px_rgba(245,158,11,0.4)]"
          >
            Book Your Table
          </Link>
        </div>
      </section> */}
    </div>
  );
}
