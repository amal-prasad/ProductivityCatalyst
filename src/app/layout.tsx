import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Productivity Catalyst",
  "description": "Enterprise cross-team visibility platform to eliminate silos and transform how organizations operate.",
  "url": "https://productivitycatalyst.co",
  "logo": "https://productivitycatalyst.co/logo.svg",
  "image": "https://productivitycatalyst.co/og-image.svg",
  "telephone": "+1-555-CATALYST",
  "email": "hello@productivitycatalyst.co",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "areaServed": "Worldwide",
  "serviceType": ["Business Consulting", "Process Optimization", "Workflow Automation", "Cross-Team Visibility"],
  "sameAs": [
    "https://linkedin.com/company/productivitycatalyst"
  ]
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Productivity Catalyst | Cross-Team Visibility",
  description: "Enterprise cross-team visibility platform to eliminate silos. Transform how your organization operates with our proven methodology.",
  keywords: ["business consulting", "cross-team visibility", "process optimization", "workflow automation", "enterprise productivity"],
  authors: [{ name: "Productivity Catalyst" }],
  openGraph: {
    title: "Productivity Catalyst | Cross-Team Visibility",
    description: "Enterprise cross-team visibility platform to eliminate silos. Transform how your organization operates with our proven methodology.",
    url: "https://productivitycatalyst.co",
    siteName: "Productivity Catalyst",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Productivity Catalyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productivity Catalyst | Cross-Team Visibility",
    description: "Enterprise cross-team visibility platform to eliminate silos.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-secondary font-sans group">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingProvider>
          <LoadingScreen />
          <ScrollProgress />
          <ScrollToTop />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LoadingProvider>
      </body>
    </html>
  );
}
