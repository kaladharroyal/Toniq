import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Contact() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      // Open daily 10:00 AM – 11:00 PM (hours 10 to 22 inclusive)
      const open = hours >= 10 && hours < 23;
      setIsOpen(open);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLocationClick = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=Tonique+Restaurant+and+Bar+Guntur", "_blank");
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919989777077";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:info@tonique.com";
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl text-white font-display mb-6">Get in Touch</h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            We are here to assist with reservations, private events, and any inquiries you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              id="contact-card-location"
              onClick={handleLocationClick}
              className="glass-panel p-8 text-center md:text-left flex flex-col items-center md:items-start"
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label="Open Tonique location in Google Maps"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLocationClick(); }}
            >
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl text-white font-display mb-2">Location</h3>
              <p className="text-white/60 font-light">8CJ9+2G5, JKC College Rd<br/>Bapaiaha Nagar, Guntur, AP 522006</p>
            </div>
            
            <div
              id="contact-card-phone"
              onClick={handlePhoneClick}
              className="glass-panel p-8 text-center md:text-left flex flex-col items-center md:items-start"
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label="Call Tonique at +91 99897 77077"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePhoneClick(); }}
            >
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl text-white font-display mb-2">Phone</h3>
              <p className="text-white/60 font-light">+91 99897 77077<br/>Available daily 10AM – 11PM</p>
            </div>

            <div
              id="contact-card-email"
              onClick={handleEmailClick}
              className="glass-panel p-8 text-center md:text-left flex flex-col items-center md:items-start"
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label="Send an email to Tonique at info@tonique.com"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleEmailClick(); }}
            >
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl text-white font-display mb-2">Email</h3>
              <p className="text-white/60 font-light">info@tonique.com<br/>events@tonique.com</p>
            </div>

            <div
              id="contact-card-hours"
              className="glass-panel p-8 text-center md:text-left flex flex-col items-center md:items-start"
              aria-label={`Tonique hours – ${isOpen === null ? 'loading' : isOpen ? 'Open Now' : 'Closed'}`}
            >
              <Clock className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl text-white font-display mb-2">
                Hours{isOpen !== null && (
                  <span aria-live="polite" style={{ marginLeft: '0.5rem' }}>
                    {isOpen ? '🟢 Open Now' : '🔴 Closed'}
                  </span>
                )}
              </h3>
              <p className="text-white/60 font-light">Open daily<br/>10:00 AM – 11:00 PM</p>
            </div>
          </div>

          {/* Map Area */}
          <div className="h-full min-h-[400px] border border-white/10 rounded-sm overflow-hidden relative group">
            <iframe
              id="contact-map-embed"
              title="Tonique Restaurant & Bar — Guntur location"
              src="https://maps.google.com/maps?q=Tonique+Restaurant+and+Bar+Guntur&output=embed&z=17"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Maps showing Tonique Restaurant & Bar in Guntur"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 right-6">
              <a
                id="contact-map-directions"
                href="https://www.google.com/maps/search/?api=1&query=Tonique+Restaurant+and+Bar+Guntur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Tonique Restaurant & Bar on Google Maps"
                className="block w-full py-4 bg-white text-black font-display text-center tracking-widest uppercase text-sm hover:bg-primary transition-colors duration-300"
              >
                Get Directions
              </a>
            </div>
          </div>

        </div>

        {/* Private Events Banner */}
        {/* <div className="border border-primary/30 bg-primary/5 p-12 text-center rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1)_0%,transparent_100%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl text-white font-display mb-4">Host A Private Event</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 font-light">
              Elevate your next corporate gathering, birthday, or celebration with Tonique's exclusive VIP lounges and custom catering packages.
            </p>
            <Link 
              href="/reservation" 
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-display tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 box-glow"
            >
              Inquire Now
            </Link>
          </div>
        </div> */}

      </div>
    </div>
  );
}
