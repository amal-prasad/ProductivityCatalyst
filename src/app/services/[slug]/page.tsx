import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import VideoBackground from "@/components/VideoBackground";
import { servicesData } from "@/lib/servicesData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.title} | Productivity Catalyst`,
    description: service.shortBody,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = servicesData.findIndex((s) => s.slug === slug);
  const service = servicesData[currentIndex];

  if (!service) {
    notFound();
  }

  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null;
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-0 flex flex-col justify-between">
        <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.8} />

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12 flex-1 w-full mt-10">
          <Link
            href="/#features"
            className="inline-flex items-center text-secondary hover:text-white transition-colors text-sm uppercase tracking-widest mb-12"
          >
            ← Back to Services
          </Link>

          <span className="block text-accent text-lg font-mono mb-4">
            {service.num}
          </span>
          <h1 className="text-white font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-8">
            {service.title}
          </h1>

          <div className="p-8 md:p-12 mb-20 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md shadow-2xl">
            <p className="text-secondary/90 text-[clamp(1.1rem,2vw,1.3rem)] leading-relaxed mb-10 border-b border-white/[0.08] pb-10">
              {service.fullDescription}
            </p>

            <h3 className="text-white font-semibold text-xl mb-6 tracking-wide">
              Key Elements & Outputs
            </h3>
            <ul className="space-y-4">
              {service.bulletPoints.map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-accent mr-4 text-xl leading-none mt-1">
                    •
                  </span>
                  <span className="text-secondary/80 text-lg leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pagination Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 mt-10 mb-20">
            {prevService ? (
              <Link
                href={`/services/${prevService.slug}`}
                className="group flex flex-col items-start w-full md:w-1/2 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all backdrop-blur-sm"
              >
                <span className="text-secondary/60 text-xs uppercase tracking-widest mb-3 group-hover:text-accent transition-colors flex items-center gap-2">
                  <span>←</span> Previous Service
                </span>
                <span className="text-white font-medium text-lg leading-tight group-hover:text-white/90">
                  {prevService.title}
                </span>
              </Link>
            ) : (
              <div className="w-full md:w-1/2 hidden md:block" />
            )}

            {nextService ? (
              <Link
                href={`/services/${nextService.slug}`}
                className="group flex flex-col items-end text-right w-full md:w-1/2 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all backdrop-blur-sm"
              >
                <span className="text-secondary/60 text-xs uppercase tracking-widest mb-3 group-hover:text-accent transition-colors flex items-center gap-2">
                  Next Service <span>→</span>
                </span>
                <span className="text-white font-medium text-lg leading-tight group-hover:text-white/90">
                  {nextService.title}
                </span>
              </Link>
            ) : (
              <div className="w-full md:w-1/2 hidden md:block" />
            )}
          </div>
        </div>

        <div className="relative z-10 w-full">
          <CTASection />
        </div>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}
