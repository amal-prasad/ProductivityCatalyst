export interface ServiceData {
  id: string;
  slug: string;
  num: string;
  title: string;
  shortBody: string;
  fullDescription: string;
  bulletPoints: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: "1",
    slug: "cxo-productivity",
    num: "01",
    title: "CXO Productivity Enhancement",
    shortBody: "Reclaim time from transactional work and focus on strategy.",
    fullDescription: "Help founders & senior leaders reclaim time from transactional work — so they focus on strategy, growth, and high-impact decisions.",
    bulletPoints: [
      "CXO time audit & priority reset",
      "Delegation & workflow redesign",
      "Operating rhythm & governance setup"
    ]
  },
  {
    id: "2",
    slug: "business-assessment",
    num: "02",
    title: "Business Improvement Assessment",
    shortBody: "Audit operations to find and fix bottlenecks effectively.",
    fullDescription: "A structured review of your operations to find where time, money and effort are being lost — delivered as a clear, actionable improvement roadmap.",
    bulletPoints: [
      "End-to-end workflow audit",
      "Bottleneck & waste analysis",
      "Prioritised improvement roadmap"
    ]
  },
  {
    id: "3",
    slug: "workflow-solutions",
    num: "03",
    title: "Automation & Workflow Solutions",
    shortBody: "Eliminate repetitive manual tasks and reduce errors.",
    fullDescription: "Eliminate repetitive manual tasks using smart automation tools — reducing errors, cutting costs, and freeing your team for higher-value work.",
    bulletPoints: [
      "Process mapping & automation design",
      "ERP / CRM integration",
      "30-day post-go-live support"
    ]
  },
  {
    id: "4",
    slug: "business-insights",
    num: "04",
    title: "AI-Enabled Business Insights",
    shortBody: "Turn scattered data into clear dashboards and alerts.",
    fullDescription: "Harness the power of AI to turn scattered data into clear dashboards, automated reports and intelligent alerts — enabling faster, fact-based decisions.",
    bulletPoints: [
      "Data consolidation & pipelines",
      "AI-powered dashboards & reporting",
      "KPI alerts & anomaly detection"
    ]
  },
  {
    id: "5",
    slug: "project-delivery",
    num: "05",
    title: "Project & Delivery Management",
    shortBody: "Bring structure and accountability to key initiatives.",
    fullDescription: "Drawing on rich experience in project & delivery management, we bring structure and accountability to your key initiatives — on time, within scope.",
    bulletPoints: [
      "Project scoping & planning",
      "Milestone tracking & risk management",
      "Stakeholder reporting & governance"
    ]
  },
  {
    id: "6",
    slug: "team-building",
    num: "06",
    title: "Team Building & People Development",
    shortBody: "Build high-performing teams through role clarity.",
    fullDescription: "Build high-performing teams through role clarity, structured onboarding, and capability development tailored to the realities of growing SMEs.",
    bulletPoints: [
      "Role design & team structuring",
      "Onboarding & performance frameworks",
      "Coaching & capability workshops"
    ]
  },
  {
    id: "7",
    slug: "smart-engagement",
    num: "07",
    title: "Smart Customer Engagement",
    shortBody: "Respond faster and serve better with AI-assisted tools.",
    fullDescription: "AI-assisted tools to respond faster, serve better, and stay connected with customers — improving satisfaction without adding headcount.",
    bulletPoints: [
      "Automated enquiry & lead handling",
      "WhatsApp / web / email automation",
      "Engagement tracking dashboard"
    ]
  },
  {
    id: "8",
    slug: "custom-solutions",
    num: "08",
    title: "Custom Solutions",
    shortBody: "Design custom solutions combining automation and tech.",
    fullDescription: "If your challenge doesn't fit a standard offering, we design a tailored solution — combining consulting expertise, automation, and smart technology.",
    bulletPoints: [
      "Discovery & scoping workshop",
      "Prototype / proof of concept",
      "Full deployment & handover"
    ]
  }
];
