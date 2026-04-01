import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import PageAnimations from "@/components/PageAnimations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Productivity Catalyst",
  description: "Privacy policy for Productivity Catalyst - learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
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
            <span className="text-white">Privacy Policy</span>
          </nav>

          <h1 data-animate className="text-white font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-secondary text-sm mb-12">Last updated: March 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-secondary leading-relaxed">
            <section>
              <h2 className="text-white font-bold text-xl mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number, and company name when you submit our contact form or book a discovery call.</li>
                <li><strong className="text-white">Communication Data:</strong> Messages and content you provide when contacting us via email, phone, or our website forms.</li>
                <li><strong className="text-white">Usage Information:</strong> Basic analytics data including pages visited, time spent on site, and referring URLs. This data is aggregated and anonymized.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Respond to your inquiries and provide consultation services</li>
                <li>Schedule and confirm discovery call appointments</li>
                <li>Send you relevant information about our services (with your consent)</li>
                <li>Improve our website and service offerings</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-4">
                <strong className="text-white">We do NOT sell, trade, or rent your personal information to third parties.</strong> Your data is used solely for providing and improving our services to you.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">3. Cookies and Tracking</h2>
              <p>
                Our website uses minimal cookies for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong className="text-white">Essential Cookies:</strong> Required for basic site functionality and navigation animations</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Anonymous usage data to understand how visitors interact with our site (optional, you may opt out)</li>
              </ul>
              <p className="mt-4">
                You can control cookie preferences through your browser settings. Disabling cookies may affect some site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted communications (HTTPS) and secure data storage practices.
              </p>
              <p className="mt-4">
                While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to maintaining industry-standard protections.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">5. Third-Party Services</h2>
              <p>
                We may use third-party services for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Email delivery (for responding to your inquiries)</li>
                <li>Website analytics (aggregated, anonymized data)</li>
                <li>Video hosting (for background content)</li>
              </ul>
              <p className="mt-4">
                These third parties have their own privacy policies governing their use of your information. We carefully select service providers who maintain appropriate data protection standards.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at <a href="mailto:info@productivitycatalyst.com" className="text-accent hover:underline">info@productivitycatalyst.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">7. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Contact form submissions are typically retained for 24 months.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">8. Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">9. International Data Transfers</h2>
              <p>
                If you are located outside of India, please note that your information may be transferred to and processed in India, where our servers are located. India&apos;s data protection laws may differ from those in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a revised &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">11. Governing Law</h2>
              <p>
                This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising from this policy shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
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
