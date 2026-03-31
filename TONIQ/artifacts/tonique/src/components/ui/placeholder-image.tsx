import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  label?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "wide" | "tall" | "auto";
  hideLabel?: boolean;
  src?: string;
}

export function PlaceholderImage({ label, className, aspectRatio = "auto", hideLabel = false, src }: PlaceholderImageProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    tall: "aspect-[3/4]",
    auto: "h-full w-full min-h-[200px]"
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/5 group",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {src && (
        <img 
          src={src} 
          alt={label || "Menu Image"} 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
      )}
      
      {/* Subtle overlay gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-t z-10", src ? "from-black/60 via-black/10 to-transparent opacity-80" : "from-black/80 via-black/20 to-transparent opacity-80")} />
      
      {/* Hover effect glow */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)] transition-opacity duration-700 ease-out" />
      
      {/* Content */}
      {!hideLabel && !src && label && (
        <div className="relative z-20 flex flex-col items-center gap-3 text-center p-4 transform group-hover:scale-105 transition-transform duration-500 ease-out">
          <ImageIcon className="w-8 h-8 text-primary/40 mb-1" strokeWidth={1} />
          <span className="font-display tracking-[0.2em] text-sm md:text-base text-white/70 uppercase">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
