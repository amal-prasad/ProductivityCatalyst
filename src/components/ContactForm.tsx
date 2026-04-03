"use client";

import { useState, useRef, useEffect } from "react";
import { servicesData } from "@/lib/servicesData";
import { animateOnScroll, MOTION } from "@/lib/gsap";
import gsap from "gsap";

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mq = window.matchMedia("(max-width: 767px)");
      
      if (mq.matches) {
        gsap.fromTo(".contact-section .section-headline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: MOTION.standard, ease: MOTION.out,
            scrollTrigger: { trigger: ".contact-section .section-headline", start: MOTION.triggerStartMobile }
          }
        );
        
        gsap.fromTo(".contact-form-container",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: MOTION.snappy, ease: MOTION.out,
            scrollTrigger: { trigger: ".contact-form-container", start: MOTION.triggerStartMobile }
          }
        );
      } else {
        animateOnScroll(".contact-section .section-headline", { y: 30 });
        animateOnScroll(".contact-form-container", { y: 40, stagger: 0.1 });
      }
    });
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Full name is required";
    if (!formState.company.trim()) newErrors.company = "Company name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formState.service) newErrors.service = "Please select an option";
    if (!formState.message.trim()) newErrors.message = "Please tell us about your needs";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const mailtoLink = `mailto:info@productivitycatalyst.com?subject=Discovery Call Request - ${encodeURIComponent(formState.name)} from ${encodeURIComponent(formState.company)}&body=${encodeURIComponent(
      `Name: ${formState.name}\nCompany: ${formState.company}\nEmail: ${formState.email}\nPhone: ${formState.phone || "Not provided"}\n\nInterested in: ${formState.service}\n\nMessage:\n${formState.message}`
    )}`;

    window.location.href = mailtoLink;
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section relative w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0a0a] to-background" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        <div className="section-headline text-center mb-16">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            Let&apos;s Connect
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            Book a Discovery Call
          </h2>
          <p className="text-secondary mt-4 text-lg max-w-md mx-auto">
            Tell us about your challenges. We&apos;ll help you find the right solution.
          </p>
        </div>

        <div className="contact-form-container bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 md:p-12">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Thanks!</h3>
              <p className="text-secondary">
                We&apos;ll reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[0.75rem] tracking-[0.1em] uppercase text-secondary mb-2">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full bg-white/[0.03] border ${errors.name ? "border-red-500" : "border-white/[0.08]"} rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors`}
                    placeholder="Jane Smith"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block text-[0.75rem] tracking-[0.1em] uppercase text-secondary mb-2">
                    Company Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className={`w-full bg-white/[0.03] border ${errors.company ? "border-red-500" : "border-white/[0.08]"} rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors`}
                    placeholder="Acme Corp"
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-[0.75rem] tracking-[0.1em] uppercase text-secondary mb-2">
                    Work Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full bg-white/[0.03] border ${errors.email ? "border-red-500" : "border-white/[0.08]"} rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors`}
                    placeholder="jane@acmecorp.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[0.75rem] tracking-[0.1em] uppercase text-secondary mb-2">
                    Phone <span className="text-white/30">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    placeholder="+1 555 123 4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-[0.75rem] tracking-[0.1em] uppercase text-secondary mb-2">
                  What are you looking for? <span className="text-accent">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  className={`w-full bg-white/[0.03] border ${errors.service ? "border-red-500" : "border-white/[0.08]"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer ${
                    !formState.service ? "text-white/30" : ""
                  }`}
                >
                  <option value="" disabled>Select an option</option>
                  {servicesData.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                  <option value="general">General Inquiry</option>
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-[0.75rem] tracking-[0.1em] uppercase text-secondary mb-2">
                  Tell us about your challenges <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className={`w-full bg-white/[0.03] border ${errors.message ? "border-red-500" : "border-white/[0.08]"} rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors resize-none`}
                  placeholder="What specific problems are you trying to solve?"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-background font-semibold tracking-[0.1em] uppercase py-4 rounded-lg hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Book a Call →"
                )}
              </button>

              <p className="text-center text-white/30 text-xs">
                We typically respond within 24 hours. Your information is kept confidential.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
