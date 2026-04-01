import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import PageAnimations from "@/components/PageAnimations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Productivity Catalyst",
  description: "Terms of Service for Productivity Catalyst - consulting, automation, and AI solutions for SMEs.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <PageAnimations />
      <main className="relative min-h-screen">
        <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.85} />

        <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 py-32">
          {/* Breadcrumb */}
          <nav data-animate className="flex items-center gap-2 text-sm text-secondary mb-12">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Terms of Service</span>
          </nav>

          <h1 data-animate className="text-white font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-secondary text-sm mb-12">Last updated: March 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-secondary leading-relaxed">
            <section>
              <h2 className="text-white font-bold text-xl mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Productivity Catalyst website and services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our services.
              </p>
              <p className="mt-4">
                These Terms constitute a legally binding agreement between you (&quot;Client&quot;, &quot;you&quot;, or &quot;your&quot;) and Productivity Catalyst (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">2. Nature of Services</h2>
              <p>
                Productivity Catalyst provides business consulting, automation, and AI-enabled solutions services. Our services are:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Advisory and consulting in nature</li>
                <li>Focused on process improvement, automation design, and operational excellence</li>
                <li>Delivered through analysis, recommendations, and hands-on implementation support</li>
                <li>Customized to each client&apos;s specific needs and circumstances</li>
              </ul>
              <p className="mt-4">
                <strong className="text-white">Important:</strong> We do not guarantee specific business outcomes. Results depend on many factors including client implementation, market conditions, and organizational readiness.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">3. Engagement Process</h2>
              <h3 className="text-white font-semibold mt-6 mb-3">3.1 Discovery & Assessment</h3>
              <p>
                Initial engagements typically begin with a discovery call and/or assessment phase to understand your business needs, challenges, and goals. This phase helps us determine if our services are appropriate for your situation.
              </p>
              
              <h3 className="text-white font-semibold mt-6 mb-3">3.2 Proposal & Agreement</h3>
              <p>
                Following assessment, we provide a detailed proposal outlining scope, deliverables, timeline, and fees. Engagements commence upon your written acceptance of the proposal.
              </p>
              
              <h3 className="text-white font-semibold mt-6 mb-3">3.3 Scope</h3>
              <p>
                Services are delivered within the agreed scope. Changes to scope require mutual written agreement and may affect timeline and fees.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">4. Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Fees:</strong> As specified in your engagement proposal. Payment schedules are outlined in individual contracts.</li>
                <li><strong className="text-white">Invoicing:</strong> We invoice according to agreed milestones or monthly in advance for retainer arrangements.</li>
                <li><strong className="text-white">Payment Terms:</strong> Net 30 days from invoice date unless otherwise agreed.</li>
                <li><strong className="text-white">Late Payments:</strong> Interest may accrue on overdue amounts at 1.5% per month.</li>
                <li><strong className="text-white">Currency:</strong> All fees are quoted and payable in INR unless specified otherwise.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">5. Intellectual Property</h2>
              <h3 className="text-white font-semibold mt-6 mb-3">5.1 Client Materials</h3>
              <p>
                You retain ownership of all data, information, and materials (&quot;Client Materials&quot;) you provide to us. You grant us a limited license to use Client Materials solely for providing services to you.
              </p>
              
              <h3 className="text-white font-semibold mt-6 mb-3">5.2 Deliverables</h3>
              <p>
                Upon full payment, you receive ownership of custom deliverables created specifically for you, including documents, templates, and configurations. Standard methodologies, frameworks, tools, and pre-existing intellectual property remain our property or that of respective third parties.
              </p>
              
              <h3 className="text-white font-semibold mt-6 mb-3">5.3 License to Use</h3>
              <p>
                We grant you a non-exclusive, non-transferable license to use any tools, templates, or frameworks provided during the engagement, solely for your internal business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">6. Confidentiality</h2>
              <p>
                Both parties agree to maintain the confidentiality of proprietary information disclosed during the engagement. Confidential information does not include information that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Is or becomes publicly available through no fault of the receiving party</li>
                <li>Was rightfully possessed prior to disclosure</li>
                <li>Is independently developed without use of confidential information</li>
                <li>Is required to be disclosed by law</li>
              </ul>
              <p className="mt-4">
                Confidentiality obligations survive termination of the engagement for a period of 3 years.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">7. Warranties & Disclaimers</h2>
              <h3 className="text-white font-semibold mt-6 mb-3">7.1 Our Warranties</h3>
              <p>
                We warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Services will be performed with reasonable skill and care</li>
                <li>We have the right to enter into this agreement</li>
                <li>Our deliverables will not infringe third-party intellectual property rights</li>
              </ul>
              
              <h3 className="text-white font-semibold mt-6 mb-3">7.2 Disclaimers</h3>
              <p>
                <strong className="text-white">EXCEPT AS EXPRESSLY SET FORTH IN THESE TERMS, WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</strong> We do not warrant specific results, outcomes, or business improvements.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">8. Limitation of Liability</h2>
              <p>
                <strong className="text-white">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong className="text-white">Aggregate Liability:</strong> Our total liability under these Terms shall not exceed the fees paid by you in the 12 months preceding the claim.</li>
                <li><strong className="text-white">Consequential Damages:</strong> We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or business interruption.</li>
                <li><strong className="text-white">Basis of Bargain:</strong> These limitations reflect the allocation of risk between parties and form an essential basis of the bargain.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">9. Termination</h2>
              <h3 className="text-white font-semibold mt-6 mb-3">9.1 Termination for Convenience</h3>
              <p>
                Either party may terminate an engagement with 30 days&apos; written notice. Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>You pay for all services rendered through the termination date</li>
                <li>We deliver all completed work product</li>
                <li>Both parties return or destroy confidential information</li>
              </ul>
              
              <h3 className="text-white font-semibold mt-6 mb-3">9.2 Termination for Breach</h3>
              <p>
                Either party may terminate immediately if the other party materially breaches these Terms and fails to cure within 15 days of written notice.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">10. Independent Contractor</h2>
              <p>
                We are independent contractors. Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship. Neither party has authority to bind the other or incur obligations on behalf of the other.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">11. Force Majeure</h2>
              <p>
                Neither party shall be liable for failures or delays in performance due to circumstances beyond its reasonable control, including natural disasters, war, terrorism, pandemic, government actions, or infrastructure failures.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">12. Governing Law & Disputes</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.
              </p>
              <p className="mt-4">
                Before initiating legal action, parties agree to attempt good-faith resolution through direct negotiation. If unresolved within 30 days, either party may pursue legal remedies.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">13. General Provisions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Entire Agreement:</strong> These Terms, together with your engagement proposal, constitute the entire agreement between parties.</li>
                <li><strong className="text-white">Amendments:</strong> Modifications require written agreement signed by both parties.</li>
                <li><strong className="text-white">Waiver:</strong> Failure to enforce any provision shall not constitute a waiver.</li>
                <li><strong className="text-white">Severability:</strong> If any provision is found unenforceable, the remainder shall continue in effect.</li>
                <li><strong className="text-white">Assignment:</strong> You may not assign these Terms without our written consent. We may assign upon notice.</li>
                <li><strong className="text-white">Notices:</strong> All notices shall be in writing and delivered to the contact information provided.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">14. Contact Information</h2>
              <p>For questions regarding these Terms of Service, please contact us:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Email:</strong> <a href="mailto:info@productivitycatalyst.com" className="text-accent hover:underline">info@productivitycatalyst.com</a></p>
                <p><strong className="text-white">Phone:</strong> +91 92321 36211</p>
                <p><strong className="text-white">Location:</strong> Mumbai, India</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
