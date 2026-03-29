import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
          isScrolled 
            ? "bg-black/80 backdrop-blur-md border-white/10 py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2 outline-none">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-[0.2em] text-white group-hover:text-primary transition-colors duration-300">
                TONIQUE
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => {
                const isActive = location === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={cn(
                      "text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-primary outline-none focus-visible:text-primary",
                      isActive ? "text-primary text-glow" : "text-white/70"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/reservation"
                className="ml-4 px-6 py-2.5 bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-display tracking-widest uppercase text-sm transition-all duration-300 box-glow"
              >
                Reserve
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 pb-8 px-4 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-6 mt-12 items-center">
              {links.map((link) => {
                const isActive = location === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={cn(
                      "text-2xl font-display tracking-[0.2em] uppercase transition-all duration-300",
                      isActive ? "text-primary" : "text-white/70"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="w-12 h-px bg-white/20 my-4" />
              <Link
                href="/reservation"
                className="px-8 py-4 bg-primary text-primary-foreground font-display tracking-widest uppercase text-lg w-full max-w-xs text-center"
              >
                Book a Table
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
