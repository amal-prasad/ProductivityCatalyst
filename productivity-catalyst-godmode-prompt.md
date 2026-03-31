# ⚡ GOD MODE PROMPT — Productivity Catalyst
### From 3/10 → 10/10 | Full Transformation Brief

> You are a world-class senior full-stack developer, UI/UX designer, and conversion rate optimization (CRO) expert.
>
> I am giving you the COMPLETE codebase of my website: **"Productivity Catalyst"** — a B2B consulting, automation, and AI solutions brand targeting SME CXOs and senior leaders.
>
> **TECH STACK:** Identify from the codebase (likely Next.js / React). Work within whatever framework is already being used.
>
> Your job: Transform this from a 3/10 to a 10/10 — flawless, fast, credible, and conversion-optimized. Execute everything below with zero placeholders. Do not ask questions. Ship it.

---

## PART 1 — CRITICAL BUG FIXES

### 1.1 Fix All Broken Word Spacing in Headings
These headings have words smashed together — fix ALL of them:
- `"FiveSteps. ToLastingImpact."` → `"Five Steps. To Lasting Impact."`
- `"EnterpriseTeamsTrustUs."` → `"Enterprise Teams Trust Us."`
- `"FocusonGrowth."` → `"Focus on Growth."`
- `"NotFirefighting."` → `"Not Firefighting."`

Audit the entire codebase for any other instances of CamelCase display text and fix them.

---

### 1.2 Fix Stat Counters (Stuck at 0)
The "Impact at Scale" section shows `0+`, `0%`, `0h`, `0` for all stats.
- Implement `IntersectionObserver`-based count-up animation
- Trigger only when section enters viewport
- Use these real values:
  - **120+** Enterprise Teams Onboarded
  - **70%** Reduction in Cross-Team Conflicts
  - **48h** Average Deployment Time
  - **12** Countries Served
- Easing: `ease-out`, duration `2s`

---

### 1.3 Fix Scroll Progress Bar
Top progress bar is frozen at 0%. Wire it to real scroll position:

```js
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrolled + '%';
});
```

---

### 1.4 Fix Duplicate DOM Sections
"Why Productivity Catalyst" and "How It Works" sections render content twice.
- Remove duplicated HTML entirely
- Use a single responsive layout with CSS media queries
- Never duplicate DOM nodes for responsive purposes

---

### 1.5 Fix Doubled Step Numbers
Steps show `"0101"`, `"0202"` etc. — two number elements stacking.
- Remove one number element per step
- Keep only the styled display number, remove the stacked duplicate

---

### 1.6 Add Real Contact Form at `#contact`
Replace the dead anchor with a fully functional section:

- Fields: Full Name, Company Name, Email, Phone (optional)
- Dropdown: "What are you looking for?" → all 8 services as options + "General Inquiry"
- Message textarea
- CTA Button: `"Book a Discovery Call →"`
- On submit: inline success message `"Thanks! We'll reach out within 24 hours."`
- Integrate with [Formspree](https://formspree.io) OR implement a `mailto:` fallback
- Add basic form validation (required fields, email format)

---

### 1.7 Fix All Dead Links
- `Privacy Policy` → `/privacy`
- `Terms of Service` → `/terms`
- `"Engineering→"`, `"Finance→"`, `"Consulting→"` in Use Cases → link to relevant service pages
- All footer nav links must resolve to real pages

---

## PART 2 — SCROLL BEHAVIOR

### 2.1 Always Scroll to Top on Every Page Load, Reload & Navigation
Add this globally in root layout or `_app.js`:

```js
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}
```

Add to router events (Next.js):

```js
router.events.on('routeChangeComplete', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});
```

This must work for:
- Hard refresh / reload on any page
- Browser back button from service page → landing page
- Any internal navigation link click
- **Never** drop the user mid-page on load

---

### 2.2 Smooth Internal Anchor Scrolling
All `#features`, `#how-it-works`, `#contact` links must scroll smoothly:

```css
html { scroll-behavior: smooth; }
```

Override with `behavior: 'instant'` for page loads only.

---

### 2.3 Service Page → Back to Home
On every service page, the logo and `"← Back"` button must:
- Navigate to `/#` (root, top of page)
- **NOT** restore previous scroll position
- Always land at the very top of the homepage

---

## PART 3 — BUILD ALL MISSING PAGES

> Every page must: match the design system, include navbar + footer, and scroll to top on load.

---

### 3.1 About Page — `/about`
Sections:
- **Hero:** "We Help Businesses Stop Firefighting." + subheading
- **Our Story:** 2–3 paragraphs about founding philosophy of Productivity Catalyst
- **Our Mission:** "Democratize enterprise-grade productivity tools for growing businesses."
- **What We Believe:** 3 belief cards:
  - "Automation before headcount"
  - "Speed over perfection"
  - "People first, tools second"
- **The Team:** 4 placeholder team cards with initials avatars, roles, and 1-line bios
- **CTA:** "Want to work with us? Book a Discovery Call →"

---

### 3.2 All 8 Service Pages — `/services/[slug]`
Build individual pages for all 8 services:

| # | Slug | Title |
|---|---|---|
| 1 | `/services/cxo-productivity` | CXO Productivity Enhancement |
| 2 | `/services/business-assessment` | Business Improvement Assessment |
| 3 | `/services/workflow-solutions` | Automation & Workflow Solutions |
| 4 | `/services/business-insights` | AI-Enabled Business Insights |
| 5 | `/services/project-delivery` | Project & Delivery Management |
| 6 | `/services/team-building` | Team Building & People Development |
| 7 | `/services/smart-engagement` | Smart Customer Engagement |
| 8 | `/services/custom-solutions` | Custom Solutions |

**Each service page must include:**
- Hero: service name + 1-line tagline
- "What It Is" — 2-paragraph description
- "What You Get" — 4–6 bullet outcomes
- "Who It's For" — 2–3 ideal client profiles
- "How It Works" — 3-step mini process
- "Expected Results" — 2–3 stat callouts (realistic, specific)
- Relevant testimonial
- CTA Section: "Ready to get started? Book a Discovery Call →"
- "← Back to All Services" button → goes to `/#services`
- Breadcrumb: `Home > Services > [Service Name]`

---

### 3.3 Privacy Policy Page — `/privacy`
Write a real, complete privacy policy covering:
- What data is collected (name, email, phone from contact form)
- How it's used (respond to inquiries, no selling to third parties)
- Cookie usage
- Contact info for data requests
- Governed by Indian law
- Last updated: 2026

---

### 3.4 Terms of Service Page — `/terms`
Write a complete ToS covering:
- Services are consulting/advisory in nature
- Payment and engagement terms (general)
- IP ownership
- Limitation of liability
- Governing law
- Contact for disputes

---

### 3.5 404 Not Found Page — `/404`
- Headline: "You're lost. Let's get you back."
- Subtext: "The page you're looking for doesn't exist."
- Button: "Back to Home →"
- Match the site's visual design exactly

---

## PART 4 — PERFORMANCE (Target: Mobile PageSpeed 90+)

### 4.1 Kill Video Backgrounds on Mobile
- All `.mp4` backgrounds: load **only** on desktop (`min-width: 1024px`)
- On mobile/tablet: replace with static CSS gradient backgrounds matching the video's color tone
- Use conditional rendering — **NOT** `display: none` (browser still loads the video)
- In Next.js: detect viewport and conditionally render the video element entirely

---

### 4.2 Lazy Load Everything
- All images: `loading="lazy"` + `decoding="async"`
- Below-fold components: dynamic import with `{ ssr: false }`
- Fonts: `font-display: swap`

---

### 4.3 Video Optimization
- Add `preload="none"` on all background videos
- Correct attributes: `playsinline`, `muted`, `autoplay`, `loop`
- Add `poster` image attribute on every video element (show a static frame while loading)

---

### 4.4 Bundle Optimization
- Purge all unused CSS (PurgeCSS or Tailwind built-in)
- Split JS chunks by route
- Inline critical CSS for above-the-fold content
- Use `next/image` for all images

---

### 4.5 Caching — `vercel.json`
Add cache headers for static assets:
```json
{
  "headers": [
    {
      "source": "/videos/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

---

## PART 5 — ANIMATIONS (Mobile-First)

### 5.1 Scroll-Triggered Entrance Animations (All Devices)
Use `IntersectionObserver` only — no GSAP, no heavy libraries.
- Every section: `fade-in` + `translateY(30px → 0)` on enter
- Grid cards: stagger `80ms` per card
- Headings: `fade-in` + `scale(0.97 → 1.0)`
- Duration: `0.5s`, easing: `cubic-bezier(0.16, 1, 0.3, 1)`

---

### 5.2 Respect Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 5.3 Hero Text Animation
- Stagger "LESS CHAOS." and "MORE GROWTH." — each word fades in with `60ms` delay
- Subtitle fades in after `400ms`
- CTA button slides up after `600ms`

---

### 5.4 Navbar Behavior
- On scroll down `80px`: frosted glass effect (`backdrop-filter: blur(12px)`, semi-transparent background)
- On scroll back to top: returns to original transparent style
- Active section highlighted in nav as user scrolls (use `IntersectionObserver` on all sections)

---

### 5.5 Service Cards
- Hover: `transform: translateY(-6px)`, `box-shadow` deepens
- `"Explore Service →"` arrow slides `4px` right on hover

---

## PART 6 — UX & DESIGN UPGRADES

### 6.1 Add Logo / Brand Mark
- Create a minimal SVG logomark: a stylized `"PC"` monogram or abstract spark/catalyst icon
- Place left of `"ProductivityCatalyst"` wordmark in navbar and footer
- Inline the SVG for zero load overhead

---

### 6.2 Upgrade Testimonials
- Circular avatar with colored background + initials (e.g. `"SC"` for Sarah Chen)
- 5-star rating above each quote
- Cards: subtle border, white background, `12px` radius, soft shadow
- Desktop: `2×2` grid. Mobile: vertical stack with CSS scroll snap

---

### 6.3 Add Comparison Table
Insert between Services and How It Works:

| Feature | Productivity Catalyst | Traditional Consulting |
|---|---|---|
| SME-focused pricing | ✅ | ❌ |
| Results in 4–8 weeks | ✅ | ❌ |
| Automation-first approach | ✅ | Rarely |
| No long-term retainer lock-in | ✅ | ❌ |
| Hands-on implementation | ✅ | ❌ |
| AI-enabled delivery | ✅ | ❌ |

Style: clean, alternating row shading, green ✅ / red ❌ icons, centered.

---

### 6.4 Industries Marquee Fix
- Remove duplicate HTML items — use CSS animation only
- Pure CSS infinite marquee:
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```
- Add small industry icons before each name

---

### 6.5 Hero Scroll Indicator
- Replace plain `"Scroll"` text with an animated SVG chevron bouncing up-down
- On click: smooth scroll to first section

---

### 6.6 Unify ALL CTAs
Replace every variation across the entire site with one single label:

> **"Book a Discovery Call →"**

Replace: `"Book structured call →"`, `"Book a Call"`, `"Book My Discovery Call →"` — ALL become the same string.

---

### 6.7 Upgrade Footer
Structure into 4 columns:
- **Col 1:** Logo + tagline + LinkedIn + Twitter icons
- **Col 2:** Navigation (Home, About, Services, How It Works)
- **Col 3:** All 8 services, each linked to their page
- **Col 4:** Email, phone, "Book a Discovery Call →" button
- **Bottom bar:** Copyright + Privacy Policy + Terms of Service + "Back to Top ↑"

---

### 6.8 Favicon
Generate from the logomark (6.1). Export as `32×32` and `180×180` (Apple touch icon).

---

## PART 7 — SEO & META

### 7.1 Meta Tags on Every Page
```html
<!-- Homepage -->
<title>Productivity Catalyst | Less Chaos. More Growth.</title>
<meta name="description" content="Business Consulting, Automation & AI solutions for SMEs. CXO-focused, results in 4–8 weeks. Book a discovery call today." />

<!-- Open Graph -->
<meta property="og:title" content="Productivity Catalyst | Less Chaos. More Growth." />
<meta property="og:description" content="Consulting, automation & AI for growing businesses." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://productivity-catalyst-seven.vercel.app/" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Productivity Catalyst" />
<meta name="twitter:description" content="Less Chaos. More Growth." />
<meta name="twitter:image" content="/og-image.png" />
```

Create `/og-image.png` — a `1200×630` branded image with logo and tagline.

---

### 7.2 Canonical URLs
Add `<link rel="canonical" href="[page-url]" />` to every page.

---

### 7.3 Structured Data (JSON-LD)
Add to homepage `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Productivity Catalyst",
  "description": "Business Consulting, Automation & AI Solutions for SMEs",
  "url": "https://productivity-catalyst-seven.vercel.app",
  "telephone": "+919232136211",
  "email": "info@productivitycatalyst.com",
  "areaServed": "Worldwide",
  "serviceType": "Business Consulting"
}
```

---

### 7.4 Generate `sitemap.xml` and `robots.txt`
Include all pages: homepage, /about, all 8 service pages, /privacy, /terms.

---

## PART 8 — FINAL CHECKLIST

Verify every item before finishing:

- [ ] Zero console errors on all pages
- [ ] Zero broken links across entire site
- [ ] ALL pages scroll to top on load, reload, and navigation
- [ ] Browser back button always returns to top of destination page
- [ ] Forms validate and show success/error states
- [ ] Fully responsive at: `320px`, `375px`, `768px`, `1024px`, `1440px`, `2560px`
- [ ] Mobile PageSpeed score: **90+**
- [ ] No videos loading on mobile
- [ ] All animations work on mobile
- [ ] `prefers-reduced-motion` respected
- [ ] All 8 service pages built and linked correctly
- [ ] About, Privacy, Terms, and 404 pages exist and are linked
- [ ] Favicon set correctly (32×32 + 180×180)
- [ ] OG image exists at `/og-image.png`
- [ ] `sitemap.xml` and `robots.txt` generated
- [ ] CTA text is `"Book a Discovery Call →"` everywhere, no exceptions
- [ ] Navbar highlights active section on scroll
- [ ] Footer complete with all 4 columns and working links

---

> **Execute everything.** Start with Part 1 (critical fixes) → Part 2 (scroll behavior) → Part 3 (new pages) → Parts 4–7 (performance, animations, design, SEO). Deliver all modified and new files.
