import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  rating: number;
  text: string;
  author: string;
  source: string;
}

const reviews: Review[] = [
  {
    rating: 5,
    text: "Cocktails are amazing and the ambience is perfect for parties. One of the best spots in Guntur.",
    author: "Harikishore Reddy",
    source: "Google Review",
  },
  {
    rating: 4,
    text: "Good place for drinks and chill. Food quantity is decent and seating is comfortable.",
    author: "Prem Sekhar",
    source: "Google Review",
  },
  {
    rating: 4,
    text: "Nice indoor and outdoor seating. Ambience is great, but prices are slightly high.",
    author: "Achyuthanand",
    source: "Google Review",
  },
  {
    rating: 5,
    text: "Loved the vibe! Perfect place for night outings with friends.",
    author: "Local Customer",
    source: "Google Review",
  },
  {
    rating: 4,
    text: "Pepper chicken was really good. Service was quick and staff was polite.",
    author: "Customer Review",
    source: "Google Review",
  },
  {
    rating: 5,
    text: "Great cocktails and music. Ideal place for weekend hangouts.",
    author: "Google User",
    source: "Google Review",
  },
  {
    rating: 4,
    text: "Clean environment and good seating arrangement. Overall nice experience.",
    author: "Visitor",
    source: "Google Review",
  },
];

const STAR_FILLED = "★";
const STAR_EMPTY = "☆";
const AUTO_DELAY = 3500; // ms between auto-advances

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`${rating} out of 5 stars`}
      style={{ color: "#f59e0b", fontSize: "1.1rem", letterSpacing: "0.04em", marginBottom: "0.8rem" }}
    >
      {Array.from({ length: 5 }, (_, i) => (i < rating ? STAR_FILLED : STAR_EMPTY)).join("")}
    </div>
  );
}

/** How many cards to show at once based on container width */
function useVisibleCount(ref: React.RefObject<HTMLDivElement>) {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setCount(w < 600 ? 1 : w < 960 ? 2 : 3);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return count;
}


export default function Reviews() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const visible = useVisibleCount(containerRef);
  const total = reviews.length;
  const maxIndex = total - visible;

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTO_DELAY);
    return () => clearInterval(timer);
  }, [paused, maxIndex]);

  const goTo = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(Math.max(0, Math.min(idx, maxIndex)));
  };
  const prev = () => { setDirection(-1); setActive((p) => (p <= 0 ? maxIndex : p - 1)); };
  const next = () => { setDirection(1); setActive((p) => (p >= maxIndex ? 0 : p + 1)); };

  // Slice to show `visible` cards starting from `active`
  const visibleReviews = reviews.slice(active, active + visible);


  return (
    <section
      id="reviews"
      style={{
        padding: "4rem 1rem",
        background: "linear-gradient(to bottom, #09090b, #111111)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "320px",
          background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{
            color: "#f59e0b", fontSize: "0.72rem", letterSpacing: "0.28em",
            textTransform: "uppercase", fontWeight: 600, marginBottom: "0.6rem",
          }}>
            What Guests Say
          </p>
          <h2
            className="font-display"
            style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 400, margin: 0 }}
          >
            Guest Reviews
          </h2>
        </div>

        {/* Carousel wrapper */}
        <div
          ref={containerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ position: "relative" }}
        >
          {/* Cards row */}
          <div style={{ overflow: "hidden", padding: "0.5rem 0" }}>
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={active}
                initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } }}
                exit={{ x: direction > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${visible}, 1fr)`,
                  gap: "1rem",
                }}
              >
                {visibleReviews.map((review, i) => (
                  <div
                    key={active + i}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "4px",
                      padding: "1.4rem 1.5rem",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "200px",
                      transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(245,158,11,0.14)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,158,11,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.09)";
                    }}
                  >
                    <StarRow rating={review.rating} />
                    <p style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.87rem",
                      lineHeight: 1.7,
                      fontStyle: "italic",
                      flexGrow: 1,
                      margin: 0,
                    }}>
                      "{review.text}"
                    </p>
                    <div style={{
                      marginTop: "1rem",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                      paddingTop: "0.75rem",
                    }}>
                      <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600, margin: 0 }}>
                        {review.author}
                      </p>
                      <p style={{
                        color: "rgba(245,158,11,0.7)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        margin: "0.15rem 0 0",
                      }}>
                        {review.source}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next arrow buttons */}
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              onClick={dir === "prev" ? prev : next}
              aria-label={dir === "prev" ? "Previous reviews" : "Next reviews"}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                [dir === "prev" ? "left" : "right"]: "-2.2rem",
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.25)",
                color: "#f59e0b",
                borderRadius: "50%",
                width: "2.2rem",
                height: "2.2rem",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                zIndex: 2,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(245,158,11,0.25)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(245,158,11,0.12)")}
            >
              {dir === "prev" ? "‹" : "›"}
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.45rem", marginTop: "1.8rem" }}>
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              style={{
                width: i === active ? "1.6rem" : "0.45rem",
                height: "0.45rem",
                borderRadius: "99px",
                background: i === active ? "#f59e0b" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s ease, background 0.35s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
