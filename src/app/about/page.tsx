import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import CTASection from "@/components/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Productivity Catalyst",
  description: "Learn about Productivity Catalyst - our story, mission, and the team dedicated to helping SMEs achieve lasting growth.",
};

const BELIEFS = [
  {
    title: "Automation Before Headcount",
    body: "Technology should do the heavy lifting. We build systems that scale without adding overhead.",
  },
  {
    title: "Speed Over Perfection",
    body: "Good enough, shipped fast beats perfect, never released. We iterate and improve continuously.",
  },
  {
    title: "People First, Tools Second",
    body: "The best tools don't replace people—they empower them. We design for humans, not workflows.",
  },
];

const TEAM = [
  {
    initials: "RS",
    name: "Rajesh Sharma",
    role: "Founder & Principal Consultant",
    bio: "15+ years in enterprise operations across banking, tech, and consulting.",
  },
  {
    initials: "AM",
    name: "Anita Mehta",
    role: "Head of Automation",
    bio: "Former engineering lead at two unicorn startups. Certified in process excellence.",
  },
  {
    initials: "VK",
    name: "Vikram Kumar",
    role: "AI Solutions Lead",
    bio: "ML specialist with experience deploying AI for Fortune 500 supply chains.",
  },
  {
    initials: "PS",
    name: "Priya Singh",
    role: "Client Success Director",
    bio: "Ensures every engagement delivers measurable outcomes within the first 90 days.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen">
        <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.8} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 py-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-secondary mb-12">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About</span>
          </nav>

          {/* Hero */}
          <div className="max-w-3xl mb-24">
            <h1 className="text-white font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-8">
              We Help Businesses Stop Firefighting.
            </h1>
            <p className="text-secondary text-xl leading-relaxed">
              Founded in 2019, Productivity Catalyst was built on a simple observation: growing businesses spend too much time managing chaos and too little time driving growth. We&apos;re here to fix that.
            </p>
          </div>

          {/* Our Story */}
          <section className="mb-24">
            <h2 className="text-white font-bold text-3xl mb-8">Our Story</h2>
            <div className="prose prose-invert max-w-none space-y-6 text-secondary leading-relaxed">
              <p>
                After years of watching brilliant founders and executives drown in reactive work—endless status meetings, manual reporting, siloed teams, and fire drills—our founding team decided to do something about it. We&apos;d seen what world-class operational systems looked like at large enterprises. We knew they could work for SMEs too.
              </p>
              <p>
                Productivity Catalyst was born from the belief that enterprise-grade productivity tools and methodologies shouldn&apos;t be reserved for companies with dedicated ops teams and eight-figure budgets. Every growing business deserves clarity, automation, and momentum.
              </p>
              <p>
                Today, we&apos;ve helped over 120 enterprises across 12 countries break free from day-to-day firefighting and focus on what truly matters: growth, strategy, and sustainable impact.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-24">
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 md:p-12">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">Our Mission</p>
              <h2 className="text-white font-bold text-3xl mb-6">
                Democratize enterprise-grade productivity tools for growing businesses.
              </h2>
              <p className="text-secondary leading-relaxed">
                We believe that every SME deserves the operational clarity that large corporations take for granted. Our mission is to make that accessible, affordable, and lasting.
              </p>
            </div>
          </section>

          {/* What We Believe */}
          <section className="mb-24">
            <h2 className="text-white font-bold text-3xl mb-12">What We Believe</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BELIEFS.map((belief) => (
                <div
                  key={belief.title}
                  className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-8 hover:bg-white/[0.04] transition-colors"
                >
                  <h3 className="text-white font-bold text-lg mb-4">{belief.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{belief.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="mb-24">
            <h2 className="text-white font-bold text-3xl mb-12">The Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">{member.initials}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                  <p className="text-accent text-xs tracking-wide mb-3">{member.role}</p>
                  <p className="text-secondary text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="relative z-10">
          <CTASection />
        </div>
      </main>
      <Footer />
    </>
  );
}
