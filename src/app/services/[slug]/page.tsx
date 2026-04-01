import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import VideoBackground from "@/components/VideoBackground";
import PageAnimations from "@/components/PageAnimations";
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

const SERVICE_DETAILS: Record<string, {
  whoFor: string[];
  howItWorks: { step: string; description: string }[];
  results: { metric: string; value: string; context: string }[];
}> = {
  "cxo-productivity": {
    whoFor: [
      "Founders and CEOs spending 60+ hours on transactional work",
      "VPs and Directors overwhelmed by status updates and firefighting",
      "C-suite executives needing strategic focus time",
    ],
    howItWorks: [
      { step: "Time Audit", description: "Map every hour spent over 2 weeks" },
      { step: "Delegate Design", description: "Redesign workflows to delegate low-value tasks" },
      { step: "Governance Setup", description: "Establish operating rhythm with clear decision rights" },
    ],
    results: [
      { metric: "Time Reclaimed", value: "12h/week", context: "Average executive recaptures half a day" },
      { metric: "Strategic Focus", value: "3x", context: "Increase in high-value work within 60 days" },
      { metric: "Meeting Reduction", value: "40%", context: "Fewer status updates needed" },
    ],
  },
  "business-assessment": {
    whoFor: [
      "SMEs with inconsistent team performance",
      "Growing businesses hitting operational bottlenecks",
      "Companies seeing declining margins without clear cause",
    ],
    howItWorks: [
      { step: "Workflow Audit", description: "End-to-end process mapping across departments" },
      { step: "Waste Analysis", description: "Identify bottlenecks, redundancies, and quick wins" },
      { step: "Roadmap Creation", description: "Prioritized improvement plan with timeline" },
    ],
    results: [
      { metric: "Inefficiencies Found", value: "15-25", context: "Average issues identified per assessment" },
      { metric: "Quick Win Recovery", value: "20%", context: "Immediate improvements within 2 weeks" },
      { metric: "Productivity Lift", value: "25%", context: "Measured improvement within 90 days" },
    ],
  },
  "workflow-solutions": {
    whoFor: [
      "Teams drowning in repetitive manual tasks",
      "Operations teams with high error rates from manual data entry",
      "Businesses scaling but workflows breaking down",
    ],
    howItWorks: [
      { step: "Process Mapping", description: "Document current workflows and automation opportunities" },
      { step: "Build & Integrate", description: "Implement automation with existing tools" },
      { step: "Go-Live Support", description: "30-day support to ensure adoption" },
    ],
    results: [
      { metric: "Manual Hours Saved", value: "15h/week", context: "Per team member on average" },
      { metric: "Error Reduction", value: "85%", context: "Fewer data entry mistakes" },
      { metric: "ROI Timeline", value: "45 days", context: "Average payback period" },
    ],
  },
  "business-insights": {
    whoFor: [
      "Leaders making decisions from incomplete or delayed data",
      "Companies with scattered data across multiple systems",
      "Executives needing real-time visibility into operations",
    ],
    howItWorks: [
      { step: "Data Audit", description: "Map all data sources and quality issues" },
      { step: "Pipeline Build", description: "Consolidate data into unified dashboards" },
      { step: "AI Integration", description: "Deploy predictive alerts and anomaly detection" },
    ],
    results: [
      { metric: "Decision Speed", value: "5x", context: "Faster data-driven decisions" },
      { metric: "Report Time", value: "-90%", context: "Hours saved on manual reporting" },
      { metric: "Forecast Accuracy", value: "+35%", context: "Improved predictive accuracy" },
    ],
  },
  "project-delivery": {
    whoFor: [
      "Teams with chronic project delays and budget overruns",
      "Organizations managing multiple concurrent initiatives",
      "Companies launching new products or entering new markets",
    ],
    howItWorks: [
      { step: "Scoping", description: "Define deliverables, timeline, and success metrics" },
      { step: "Track & Manage", description: "Milestone tracking with risk monitoring" },
      { step: "Govern & Report", description: "Stakeholder updates and governance" },
    ],
    results: [
      { metric: "On-Time Delivery", value: "92%", context: "Projects delivered on schedule" },
      { metric: "Budget Adherence", value: "95%", context: "Projects within budget" },
      { metric: "Stakeholder Satisfaction", value: "4.8/5", context: "Average client rating" },
    ],
  },
  "team-building": {
    whoFor: [
      "Leaders building high-performing teams from scratch",
      "Managers struggling with role clarity and accountability",
      "HR teams modernizing onboarding processes",
    ],
    howItWorks: [
      { step: "Role Design", description: "Clear accountability frameworks per role" },
      { step: "Onboarding System", description: "Structured 30/60/90-day plans" },
      { step: "Coaching", description: "Capability workshops and 1:1 coaching" },
    ],
    results: [
      { metric: "New Hire Ramp", value: "-50%", context: "Faster time to productivity" },
      { metric: "Retention", value: "+35%", context: "Improvement in first-year retention" },
      { metric: "Engagement", value: "45%", context: "Score improvement within 6 months" },
    ],
  },
  "smart-engagement": {
    whoFor: [
      "Teams spending excessive time on manual customer follow-ups",
      "Businesses with slow response times hurting conversion",
      "Companies wanting to scale customer experience without headcount",
    ],
    howItWorks: [
      { step: "Journey Mapping", description: "Map current customer touchpoints" },
      { step: "Automation Setup", description: "Implement AI-assisted responses and routing" },
      { step: "Tracking Launch", description: "Monitor engagement and satisfaction metrics" },
    ],
    results: [
      { metric: "Response Time", value: "-80%", context: "From hours to minutes" },
      { metric: "CSAT Score", value: "+25%", context: "Customer satisfaction improvement" },
      { metric: "Team Capacity", value: "3x", context: "More customers per team member" },
    ],
  },
  "custom-solutions": {
    whoFor: [
      "Organizations with unique challenges not addressed by standard offerings",
      "Companies needing integrated multi-disciplinary approaches",
      "Leaders facing transformational change requirements",
    ],
    howItWorks: [
      { step: "Discovery Workshop", description: "Deep-dive into your specific situation" },
      { step: "Prototype", description: "Proof of concept for proposed solutions" },
      { step: "Deploy", description: "Full implementation with knowledge transfer" },
    ],
    results: [
      { metric: "Solution Fit", value: "100%", context: "Custom-built for your context" },
      { metric: "Adoption Rate", value: "90%", context: "High adoption due to fit" },
      { metric: "Time to Value", value: "4-8 wks", context: "From discovery to results" },
    ],
  },
};

const TESTIMONIALS: Record<string, { quote: string; name: string; title: string }> = {
  "cxo-productivity": {
    quote: "I went from drowning in Slack messages to having two hours every morning for strategic thinking. The ROI was immediate.",
    name: "Michael Torres",
    title: "CEO, GrowthStage Ventures",
  },
  "business-assessment": {
    quote: "They found 18 inefficiencies in our first week. By month two, we were already 15% more productive.",
    name: "Sarah Okonkwo",
    title: "COO, Meridian Logistics",
  },
  "workflow-solutions": {
    quote: "Our order processing went from 4 hours to 15 minutes. The team now focuses on customer relationships instead of data entry.",
    name: "James Nakamura",
    title: "Operations Director, SupplyPro Asia",
  },
  "business-insights": {
    quote: "For the first time, I can see exactly what's happening across all departments in real-time. Decision-making changed completely.",
    name: "Elena Kowalski",
    title: "CFO, GlobalTrade Partners",
  },
  "project-delivery": {
    quote: "Our product launches used to be chaotic. Now they're methodical. We've shipped 3x more features this year.",
    name: "Arjun Patel",
    title: "VP Product, Nexus Software",
  },
  "team-building": {
    quote: "New hires now ramp in 30 days instead of 90. The structured onboarding reduced our training burden dramatically.",
    name: "Lisa Chen",
    title: "Head of People, ScaleUp Inc",
  },
  "smart-engagement": {
    quote: "Customer response time dropped from 4 hours to 12 minutes. Our conversion rate improved 30% within 60 days.",
    name: "David Fernandez",
    title: "Customer Success Lead, OmniServe",
  },
  "custom-solutions": {
    quote: "We had a uniquely complex situation. They designed a solution that addressed everything—nothing was left on the table.",
    name: "Rachel Morrison",
    title: "Managing Director, Vertex Group",
  },
};

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
  
  const details = SERVICE_DETAILS[slug] || {
    whoFor: ["Growing businesses looking to improve operations"],
    howItWorks: [
      { step: "Discovery", description: "Understand your specific needs" },
      { step: "Design", description: "Create tailored solution" },
      { step: "Deploy", description: "Implement and measure" },
    ],
    results: [
      { metric: "Efficiency", value: "25%", context: "Average improvement" },
    ],
  };
  
  const testimonial = TESTIMONIALS[slug] || TESTIMONIALS["cxo-productivity"];

  return (
    <>
      <Navbar />
      <PageAnimations />
      <main className="relative min-h-screen pt-32 pb-0 flex flex-col justify-between">
        <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.8} />

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12 flex-1 w-full mt-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-secondary mb-12">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#features" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </nav>

          {/* Hero */}
          <span data-animate className="block text-accent text-lg font-mono mb-4">
            {service.num}
          </span>
          <h1 className="text-white font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-6">
            {service.title}
          </h1>
          <p className="text-secondary text-xl leading-relaxed max-w-2xl">
            {service.shortBody}
          </p>

          {/* What It Is */}
          <div data-animate className="p-8 md:p-12 mt-12 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md shadow-2xl">
            <h2 className="text-white font-semibold text-xl mb-6 tracking-wide">What It Is</h2>
            <p className="text-secondary/90 text-lg leading-relaxed mb-10 border-b border-white/[0.08] pb-10">
              {service.fullDescription}
            </p>

            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">
              Key Elements & Outputs
            </h3>
            <ul className="space-y-4">
              {service.bulletPoints.map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-accent mr-4 text-xl leading-none mt-1">•</span>
                  <span className="text-secondary/80 text-lg leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Two Column Layout */}
          <div data-animate className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Who It's For */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8">
              <h2 className="text-white font-semibold text-xl mb-6 tracking-wide">Who It&apos;s For</h2>
              <ul className="space-y-4">
                {details.whoFor.map((person, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-secondary">{person}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How It Works */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8">
              <h2 className="text-white font-semibold text-xl mb-6 tracking-wide">How It Works</h2>
              <div className="space-y-6">
                {details.howItWorks.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-accent text-sm font-bold">{i + 1}</span>
                    </span>
                    <div>
                      <h4 className="text-white font-medium">{item.step}</h4>
                      <p className="text-secondary text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expected Results */}
          <div data-animate className="mt-12">
            <h2 className="text-white font-semibold text-xl mb-8 tracking-wide">Expected Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {details.results.map((result, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 text-center">
                  <div className="text-accent text-4xl font-bold mb-2">{result.value}</div>
                  <div className="text-white font-medium mb-2">{result.metric}</div>
                  <div className="text-secondary text-sm">{result.context}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div data-animate className="mt-12 p-8 md:p-12 rounded-2xl bg-accent/5 border border-accent/20">
            <div className="text-accent text-5xl mb-4">&ldquo;</div>
            <p className="text-white text-lg leading-relaxed mb-6">{testimonial.quote}</p>
            <div>
              <p className="text-white font-medium">{testimonial.name}</p>
              <p className="text-secondary text-sm">{testimonial.title}</p>
            </div>
          </div>

          {/* CTA */}
          <div data-animate className="mt-12 text-center">
            <h3 className="text-white text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-secondary mb-8">Book a discovery call and let&apos;s discuss how we can help.</p>
            <Link
              href="/#contact"
              className="inline-block bg-accent text-background font-semibold tracking-[0.1em] uppercase px-8 py-4 rounded-lg hover:bg-accent/90 transition-all duration-300"
            >
              Book a Discovery Call →
            </Link>
          </div>

          {/* Navigation */}
          <div data-animate className="flex flex-col md:flex-row justify-between items-stretch gap-6 mt-16 mb-12">
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

          {/* Back to Services */}
          <div className="text-center mb-12">
            <Link
              href="/#features"
              className="inline-flex items-center text-secondary hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              ← Back to All Services
            </Link>
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
