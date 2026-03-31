import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PinnedScrollFeatures from "@/components/PinnedScrollFeatures";
import Features from "@/components/Features";
import DynamicMetrics from "@/components/DynamicMetrics";
import HowItWorks from "@/components/HowItWorks";
import CardGrid from "@/components/CardGrid";
import Industries from "@/components/Industries";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PinnedScrollFeatures />
        <Features />
        <DynamicMetrics />
        <HowItWorks />
        <CardGrid />
        <Industries />
        <ComparisonTable />
        <Testimonials />
        <CTASection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
