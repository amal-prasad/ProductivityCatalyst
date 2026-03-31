import Link from "next/link";
import VideoBackground from "@/components/VideoBackground";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.9} />
      
      <div className="relative z-10 text-center px-6">
        <div className="mb-8">
          <span className="text-accent text-8xl md:text-9xl font-bold">404</span>
        </div>
        
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
          You&apos;re lost. Let&apos;s get you back.
        </h1>
        
        <p className="text-secondary text-lg mb-12 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent text-background font-semibold tracking-[0.1em] uppercase px-8 py-4 rounded-lg hover:bg-accent/90 transition-all duration-300"
        >
          Back to Home →
        </Link>
      </div>
    </main>
  );
}
