import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-9xl text-primary font-display mb-6">404</h1>
      <h2 className="text-3xl text-white font-display mb-4">Page Not Found</h2>
      <p className="text-white/50 max-w-md mx-auto mb-8">
        The page you are looking for has vanished into the night. It might have been moved or deleted.
      </p>
      <Link 
        href="/" 
        className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-display tracking-widest uppercase transition-colors duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
}
