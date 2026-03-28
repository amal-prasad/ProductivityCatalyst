# 🔍 ADDITIVE SUPER PROMPT — Agent 0 Recon + Agents 7–12
### Site: `https://productivity-catalyst-seven.vercel.app/`
### Mode: ADDITIVE — appends to existing Agents 1–6. Does not replace them.

---

> **READ THIS FIRST — HOW THIS FITS TOGETHER**
>
> This prompt adds:
> - **Agent 0** — a Recon Agent that runs BEFORE everything else and discovers all issues
> - **Agents 7–12** — six new fix agents that run IN PARALLEL alongside the existing Agents 1–6
>
> The full execution order is:
> ```
> PHASE 1:  SPAWN(Agent-0) → AWAIT(Agent-0) → read issue report
> PHASE 2:  SPAWN_PARALLEL([Agent-1 ... Agent-12]) → AWAIT_ALL()
> PHASE 3:  SPAWN(QA-Agent) → AWAIT(QA-Agent)
> PHASE 4:  DEPLOY
> ```
> Agents 1–6 are defined in the companion prompt file. Agents 7–12 are defined here.
> The Orchestrator must run all 12 in parallel in Phase 2.

---

---

## 🔭 AGENT 0 — RECON & FULL SITE AUDIT AGENT

### Mission
You are the first agent to run. You run alone, before the orchestrator spawns anything.
Your job: crawl the site, analyze every layer, produce a structured issue report, and hand
it to the Orchestrator with recommended agent assignments.

You do NOT fix anything. You discover, document, and delegate.

---

### Subagent 0a — HTML Structure Audit

Fetch the full raw HTML of `https://productivity-catalyst-seven.vercel.app/`.
Analyze the DOM for the following and log each finding:

```
CHECKS:
[ ] Duplicate content blocks — same section rendered twice (desktop + mobile variants in DOM)
[ ] Concatenated heading text — heading words merged without spaces (CSS text-break issue)
[ ] Anchor tags with empty href or href pointing to binary assets (e.g. href="/videos/bg1.mp4")
[ ] Missing section IDs that are referenced in the nav (e.g. #contact, #testimonials)
[ ] Duplicate nav elements (desktop + hamburger mobile nav both in DOM)
[ ] Placeholder links with no href (Engineering→, Finance→, Consulting→)
[ ] Headings used out of order (h3 inside h2 parent, etc.)
[ ] Missing lang attribute on <html> tag
[ ] Form elements present or missing (is there a contact form?)
[ ] Video elements missing width/height attributes (causes CLS)
[ ] Anchor tags wrapping non-interactive content incorrectly
```

**Log format for each finding:**
```json
{
  "id": "DOM-001",
  "severity": "high|medium|low",
  "location": "section name or line description",
  "issue": "one sentence description",
  "assigned_agent": "Agent-7"
}
```

---

### Subagent 0b — JavaScript & Interactivity Audit

Without executing JS, scan all script tags and inline JS in the HTML for:

```
CHECKS:
[ ] Stat counters — elements showing "0+" or "0%" that should animate on scroll
[ ] Scroll indicator — "Scroll" text with no JS-driven animation or scroll arrow
[ ] Hamburger nav — mobile menu toggle — does open/close JS exist?
[ ] Marquee/ticker — does the infinite scroll animation have a JS fallback?
[ ] Video autoplay — any autoplay calls missing play() promise catch?
[ ] Any onclick/onsubmit handlers pointing to undefined functions?
[ ] Missing DOMContentLoaded or load event guards?
[ ] Any console.error-level issues detectable from source inspection?
```

Log each finding in the same JSON format with `"assigned_agent": "Agent-8"`.

---

### Subagent 0c — Link & Navigation Integrity Audit

```
CHECKS:
[ ] Anchor hrefs pointing to #contact — does element with id="contact" exist?
[ ] Anchor hrefs pointing to #testimonials — does element with id="testimonials" exist?
[ ] Anchor hrefs pointing to #features, #how-it-works, #industries — do these exist?
[ ] CTA buttons "Book a Call" and "Book a Discovery Call" — do they resolve?
[ ] "Privacy Policy" and "Terms of Service" — do these go anywhere?
[ ] Any nav link returning 404 when fetched?
[ ] Cross-link from footer vs header nav — do they point to same IDs?
```

Log each finding with `"assigned_agent": "Agent-9"`.

---

### Subagent 0d — SEO & Meta Audit

Fetch the `<head>` section of the page and check:

```
CHECKS:
[ ] <meta name="description"> — present and non-empty?
[ ] <meta property="og:title"> — Open Graph title?
[ ] <meta property="og:description"> — Open Graph description?
[ ] <meta property="og:image"> — OG image for social sharing?
[ ] <meta property="og:url"> — Canonical URL?
[ ] <meta name="twitter:card"> — Twitter Card?
[ ] <meta name="twitter:title"> — Twitter title?
[ ] <link rel="canonical"> — canonical URL tag?
[ ] JSON-LD structured data block — <script type="application/ld+json">?
[ ] Page title format — is it descriptive and keyword-rich?
[ ] robots meta — is indexing allowed?
[ ] hreflang — if multi-language content exists
```

Log each finding with `"assigned_agent": "Agent-10"`.

---

### Subagent 0e — Accessibility Audit

```
CHECKS:
[ ] Skip navigation link at top of page — present?
[ ] All <img> tags have non-empty alt attributes?
[ ] Marquee/ticker — duplicate text visible to screen readers (aria-hidden on clone)?
[ ] Icon-only links (nav icons, social links) — have aria-label?
[ ] Color contrast — headings against video background: likely failing WCAG AA
[ ] Focus styles — are :focus-visible styles present or removed?
[ ] Interactive elements minimum touch target: 44×44px on mobile?
[ ] Form inputs (if any) have associated <label> elements?
[ ] Video elements have no audio, so no captions needed — confirm muted
[ ] Heading hierarchy — h1 → h2 → h3 without skipping levels?
[ ] Role landmarks — <main>, <nav>, <footer>, <section> with aria-label?
```

Log each finding with `"assigned_agent": "Agent-11"`.

---

### Subagent 0f — Performance & CLS Audit

```
CHECKS:
[ ] <video> elements missing width and height attributes — causes layout shift
[ ] Web fonts loaded without preload <link rel="preload"> hints
[ ] LCP image or video — is it hinted with fetchpriority="high"?
[ ] Large CSS/JS bundles without defer or async attributes?
[ ] render-blocking <script> tags in <head> without defer?
[ ] Images (if any) missing width/height or loading="lazy"?
[ ] Third-party scripts loaded synchronously?
[ ] Total page weight estimation (HTML + inline CSS + inline JS)
[ ] No <link rel="preconnect"> to CDN or font origins?
[ ] Unused CSS — any large global stylesheets?
```

Log each finding with `"assigned_agent": "Agent-12"`.

---

### Agent 0 — Output Format

Produce a structured Recon Report in this exact format and pass it to the Orchestrator:

```json
{
  "recon_complete": true,
  "site": "https://productivity-catalyst-seven.vercel.app/",
  "audit_timestamp": "<ISO 8601>",
  "total_issues_found": 0,
  "issues_by_agent": {
    "Agent-7":  [],
    "Agent-8":  [],
    "Agent-9":  [],
    "Agent-10": [],
    "Agent-11": [],
    "Agent-12": []
  },
  "pre_confirmed_issues": [
    "DOM-001: Duplicate feature cards section rendered twice in DOM (desktop + mobile)",
    "DOM-002: Heading text concatenated — FiveSteps.ToLastingImpact. EnterpriseTeamsTrustUs. etc.",
    "DOM-003: Anchor tags wrapping <video> elements with href pointing to raw .mp4 file",
    "JS-001:  Stat counters frozen at 0 — no scroll-triggered counter animation JS",
    "JS-002:  Scroll indicator text present but no animated scroll arrow or JS",
    "JS-003:  Hamburger mobile nav has no visible toggle JS",
    "NAV-001: #contact anchor referenced in nav but no element with id='contact' exists",
    "NAV-002: #testimonials referenced in footer nav — section ID may not match",
    "NAV-003: Engineering, Finance, Consulting CTA links have no href target",
    "SEO-001: No <meta name='description'> tag",
    "SEO-002: No Open Graph tags (og:title, og:description, og:image)",
    "SEO-003: No Twitter Card meta tags",
    "SEO-004: No JSON-LD structured data",
    "A11Y-001: No skip navigation link",
    "A11Y-002: Marquee clone text not aria-hidden — screen readers read it twice",
    "A11Y-003: No ARIA labels on icon-only nav links",
    "PERF-001: <video> elements missing width/height — causes CLS",
    "PERF-002: No font preload <link> hints",
    "PERF-003: No fetchpriority='high' on LCP element"
  ],
  "orchestrator_instruction": "Spawn Agents 7–12 in parallel, each working their assigned domain. Also spawn Agents 1–6 in parallel. Await all 12 before QA Agent."
}
```

### Agent 0 — Done Condition
Recon Report delivered to Orchestrator. All findings categorized. No fixes made.
Handoff confirmed. Orchestrator may now spawn Agents 1–12.

---

---

## ⚡ AGENT 7 — DOM Structure & Duplicate Content Agent

### Mission
Fix broken HTML structure, deduplicate DOM content, and repair heading text.
Owns ONLY markup/HTML files. Does NOT touch CSS, JS, or config files.

**Pre-confirmed issues from Agent 0 to fix:**
- DOM-001, DOM-002, DOM-003

---

### Subagent 7a — Deduplicate Feature & Steps Sections

The codebase renders the "Why Productivity Catalyst" feature cards (01/06 through 06/06)
and the "How It Works" steps twice — once for desktop, once for mobile — as separate DOM
elements toggled by CSS visibility. This is a pattern that harms SEO (duplicate content)
and accessibility (screen readers read both).

**Fix: Use a single DOM instance + CSS-only responsive layout instead.**

1. Find all pairs of desktop/mobile duplicate sections. Common class patterns:
   ```
   .features-desktop / .features-mobile
   .steps-desktop / .steps-mobile
   .cards-grid / .cards-list
   ```
2. Keep ONLY the desktop version's DOM structure.
3. Make it responsive using CSS Grid/Flexbox with `@media` breakpoints.
4. Delete the mobile-only duplicate DOM blocks entirely.

**Responsive pattern to apply:**
```css
/* Desktop: grid of cards */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Mobile: single column stack */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

---

### Subagent 7b — Fix Concatenated Heading Text

The following headings have words merged without spaces due to a CSS/markup issue.
Each heading is built from multiple elements (likely `<span>` or nested `<h2>` tags)
that collapse without whitespace between them.

**Affected headings (found in HTML source):**
```
"FiveSteps. ToLastingImpact."   → should read: "Five Steps. To Lasting Impact."
"EnterpriseTeamsTrustUs."       → should read: "Enterprise Teams Trust Us."
"FocusonGrowth. NotFirefighting." → should read: "Focus on Growth. Not Firefighting."
```

**Root cause:** Usually a flex/grid layout where multiple `<h2>` or `<div>` elements
containing word fragments are adjacent with no space nodes between them.

**Fix:** In the HTML/JSX source, find the component that generates each heading.
Add a literal space or `&nbsp;` between adjacent word-fragment elements, OR consolidate
the heading into a single element with proper text content:

```html
<!-- WRONG: -->
<h2>Five</h2><h2>Steps</h2>

<!-- CORRECT: -->
<h2>Five Steps. To Lasting Impact.</h2>

<!-- OR if spans are needed for styling: -->
<h2><span>Five Steps.</span> <span>To Lasting Impact.</span></h2>
```

---

### Subagent 7c — Fix Anchor Tags Wrapping Video Elements

Found in HTML: `<a href="/videos/bg1.mp4"><video ...></video></a>`

This wraps the background video in a clickable anchor that navigates the user to the raw
video file if clicked — completely unintended behavior.

**Fix:** Remove the wrapping `<a>` element from around every `<video>` background element.
The video should be a standalone element inside its section wrapper div.

```html
<!-- WRONG: -->
<a href="/videos/bg1.mp4">
  <video autoplay muted loop>...</video>
</a>

<!-- CORRECT: -->
<video autoplay muted loop playsinline preload="metadata" poster="/videos/bg1-poster.jpg">
  <source src="/videos/bg1.webm" type="video/webm" />
  <source src="/videos/bg1.mp4#t=0.001" type="video/mp4" />
</video>
```

Search for ALL instances across bg1, bg2, bg3 sections.

### Agent 7 — Done Condition
- [ ] Zero duplicate DOM sections (one DOM tree per section, responsive via CSS)
- [ ] All 3 heading texts read correctly with spaces
- [ ] Zero `<a href="*.mp4">` wrappers around video elements

---

---

## ⚡ AGENT 8 — JavaScript Interactivity Agent

### Mission
Implement missing JavaScript interactions that are currently broken or absent.
Owns ONLY new JS/TS utility files and the entry wiring. Does NOT touch HTML or CSS.

**Pre-confirmed issues from Agent 0 to fix:**
- JS-001, JS-002, JS-003

---

### Subagent 8a — Animated Stat Counters

The "Impact at Scale" section shows `0+`, `0%`, `0h`, `0` — static zeros.
These should animate up to their real values when the section scrolls into view.

Create `src/utils/counterAnimation.js`:

```javascript
/**
 * counterAnimation
 * Animates numeric stat counters from 0 to their target value
 * when they scroll into the viewport.
 */

const COUNTERS = [
  { selector: '[data-counter="teams"]',    target: 120, suffix: '+',  duration: 1800 },
  { selector: '[data-counter="conflicts"]', target: 70,  suffix: '%',  duration: 1600 },
  { selector: '[data-counter="hours"]',    target: 48,  suffix: 'h',  duration: 1400 },
  { selector: '[data-counter="countries"]', target: 18,  suffix: '',   duration: 1200 },
];

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCounter(el, target, suffix, duration) {
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(easeOutQuart(progress) * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function initCounters() {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = COUNTERS.find(c => entry.target.matches(c.selector));
        if (!counter) return;
        animateCounter(entry.target, counter.target, counter.suffix, counter.duration);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  COUNTERS.forEach(({ selector }) => {
    const el = document.querySelector(selector);
    if (el) observer.observe(el);
  });
}
```

**Add data attributes to the stat counter HTML elements (coordinate with Agent 7 if needed):**
```html
<span data-counter="teams">0</span>+
<span data-counter="conflicts">0</span>%
<span data-counter="hours">0</span>h
<span data-counter="countries">0</span>
```

> **Note:** Update `target` values in the COUNTERS array to match the real numbers
> from the business content before deploying.

---

### Subagent 8b — Scroll Indicator Animation

The hero section has a static "Scroll" text. Add a pulsing animated arrow beneath it.

Create `src/utils/scrollIndicator.js`:

```javascript
/**
 * scrollIndicator
 * Fades out the scroll indicator once the user has scrolled past the hero.
 */

export function initScrollIndicator() {
  if (typeof window === 'undefined') return;

  const indicator = document.querySelector('[data-scroll-indicator]');
  if (!indicator) return;

  // Fade out on scroll
  const onScroll = () => {
    const scrolled = window.scrollY > 80;
    indicator.style.opacity = scrolled ? '0' : '1';
    indicator.style.pointerEvents = scrolled ? 'none' : 'auto';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
```

**CSS to add for the scroll arrow animation:**
```css
[data-scroll-indicator] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: opacity 0.4s ease;
}

[data-scroll-indicator]::after {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
  animation: scrollBounce 1.4s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%, 100% { transform: rotate(45deg) translateY(0);   opacity: 1; }
  50%       { transform: rotate(45deg) translateY(6px); opacity: 0.5; }
}
```

**Add `data-scroll-indicator` to the scroll element in HTML:**
```html
<div data-scroll-indicator>Scroll</div>
```

---

### Subagent 8c — Hamburger Mobile Nav Toggle

The mobile hamburger nav button has no JS toggle logic. It likely shows/hides
a `.nav-menu` or `.mobile-menu` element on click.

Create `src/utils/mobileNav.js`:

```javascript
/**
 * mobileNav
 * Handles open/close toggle for the hamburger navigation.
 */

export function initMobileNav() {
  if (typeof window === 'undefined') return;

  const toggle = document.querySelector('[data-nav-toggle]');
  const menu   = document.querySelector('[data-nav-menu]');
  const body   = document.body;

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    body.style.overflow = isOpen ? 'hidden' : '';   // prevent scroll when menu open
  });

  // Close menu on nav link click
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
      toggle.focus();
    }
  });
}
```

**CSS for mobile menu open state:**
```css
[data-nav-menu] {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--nav-bg, #0a0a0f);
  padding: 80px 24px 40px;
  overflow-y: auto;
  transition: opacity 0.25s ease;
}

[data-nav-menu].is-open {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
```

**Add data attributes to the nav elements in HTML:**
```html
<button data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation">
  <!-- hamburger icon -->
</button>
<nav id="mobile-nav" data-nav-menu aria-label="Mobile navigation">
  <!-- nav links -->
</nav>
```

---

### Subagent 8d — Wire All Initialisers

In your main entry (`main.js`, `App.tsx`, `layout.tsx`), add alongside Agent 5's initialisers:

```javascript
import { initCounters }        from '@/utils/counterAnimation';
import { initScrollIndicator } from '@/utils/scrollIndicator';
import { initMobileNav }       from '@/utils/mobileNav';

// In your DOMContentLoaded or useEffect:
initCounters();
initScrollIndicator();
initMobileNav();
```

### Agent 8 — Done Condition
- [ ] Stat counters animate 0 → real value on scroll, with easing
- [ ] Scroll indicator pulses and fades out on scroll
- [ ] Hamburger opens/closes menu, Escape closes it, body scroll locks

---

---

## ⚡ AGENT 9 — Broken Links & Navigation Agent

### Mission
Fix all broken anchor targets, create missing sections, and wire placeholder CTA links.
Owns HTML and creates the missing contact section markup. Coordinates with Agent 8 if
the contact section needs a form submission handler.

**Pre-confirmed issues from Agent 0 to fix:**
- NAV-001, NAV-002, NAV-003

---

### Subagent 9a — Create the Missing #contact Section

Nav links point to `#contact` but no element with `id="contact"` exists in the page.
Create a contact/booking section immediately before the `<footer>` element:

```html
<section id="contact" aria-labelledby="contact-heading">
  <div class="contact-inner">
    <h2 id="contact-heading">Book a Discovery Call</h2>
    <p>
      Tell us about your business challenges. We'll follow up within one business day
      to schedule a structured 30-minute discovery call.
    </p>

    <form class="contact-form" data-contact-form novalidate>
      <div class="form-row">
        <label for="contact-name">Full name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autocomplete="name"
          required
          placeholder="Jane Smith"
        />
      </div>

      <div class="form-row">
        <label for="contact-email">Work email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autocomplete="email"
          required
          placeholder="jane@company.com"
        />
      </div>

      <div class="form-row">
        <label for="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autocomplete="organization"
          placeholder="Acme Corp"
        />
      </div>

      <div class="form-row">
        <label for="contact-message">What's your biggest operational challenge?</label>
        <textarea
          id="contact-message"
          name="message"
          rows="4"
          placeholder="We're struggling with..."
        ></textarea>
      </div>

      <button type="submit" class="btn-primary">
        Request a discovery call →
      </button>
    </form>

    <p class="contact-alt">
      Prefer to call directly?
      <a href="tel:+919232136211">+91 92321 36211</a> ·
      <a href="mailto:info@productivitycatalyst.com">info@productivitycatalyst.com</a>
    </p>
  </div>
</section>
```

---

### Subagent 9b — Fix #testimonials ID Mismatch

Footer nav links to `#testimonials`. Find the Social Proof / testimonials section
and ensure it has `id="testimonials"`:

```html
<!-- Find the testimonials section and add/correct the id -->
<section id="testimonials" aria-labelledby="testimonials-heading">
  <!-- existing testimonial content -->
</section>
```

Also verify that `#features`, `#how-it-works`, and `#industries` section IDs exist
and match exactly what the nav links use (case-sensitive, hyphen-separated).

**Check and fix all nav target IDs:**
```
Nav link href    →   Required section id
#features        →   id="features"
#how-it-works    →   id="how-it-works"
#industries      →   id="industries"
#contact         →   id="contact"    ← created by Subagent 9a
#testimonials    →   id="testimonials"
```

---

### Subagent 9c — Fix Placeholder CTA Links

The use-case cards contain dead links:
```
"Engineering→"   → href is empty or "#"
"Finance→"       → href is empty or "#"
"Consulting→"    → href is empty or "#"
```

**Fix:** Point these to the contact section and add descriptive aria-labels:

```html
<a href="#contact" class="use-case-cta" aria-label="Book a call for IT & Software Teams">
  Engineering →
</a>
<a href="#contact" class="use-case-cta" aria-label="Book a call for Banking & Financial Services">
  Finance →
</a>
<a href="#contact" class="use-case-cta" aria-label="Book a call for Consulting & Professional Services">
  Consulting →
</a>
```

Also fix Privacy Policy and Terms of Service if they point to `#`:
```html
<!-- Option A: Real pages (preferred) -->
<a href="/privacy">Privacy Policy</a>
<a href="/terms">Terms of Service</a>

<!-- Option B: If pages don't exist yet, create placeholder pages -->
<!-- Create public/privacy.html and public/terms.html with "Coming soon" content -->
```

### Agent 9 — Done Condition
- [ ] `id="contact"` section exists before footer with form
- [ ] `id="testimonials"` exists and matches footer nav link
- [ ] All 5 nav link anchors resolve to existing section IDs
- [ ] Engineering, Finance, Consulting links point to #contact
- [ ] Privacy/Terms links go somewhere real

---

---

## ⚡ AGENT 10 — SEO & Meta Tags Agent

### Mission
Add all missing SEO metadata, Open Graph tags, Twitter Card, and JSON-LD structured data.
Owns ONLY the `<head>` section of the HTML / `_document.tsx` / `layout.tsx` / `index.html`.
Does NOT touch body markup or JS.

**Pre-confirmed issues from Agent 0 to fix:**
- SEO-001, SEO-002, SEO-003, SEO-004

---

### Subagent 10a — Core Meta Tags

Add to `<head>`:

```html
<!-- Primary SEO -->
<meta name="description" content="Productivity Catalyst helps SMEs break free from operational firefighting. Business consulting, workflow automation, and AI-enabled solutions for CXOs and senior leaders." />
<meta name="keywords" content="business consulting, workflow automation, AI solutions, CXO productivity, SME consulting, operational efficiency" />
<meta name="author" content="Productivity Catalyst" />
<link rel="canonical" href="https://productivity-catalyst-seven.vercel.app/" />
<meta name="robots" content="index, follow" />

<!-- Language -->
<!-- Also add lang="en" to the <html> tag if missing -->
```

---

### Subagent 10b — Open Graph & Twitter Card

```html
<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:type"        content="website" />
<meta property="og:url"         content="https://productivity-catalyst-seven.vercel.app/" />
<meta property="og:title"       content="Productivity Catalyst — Less Chaos, More Growth" />
<meta property="og:description" content="Business consulting, automation & AI-enabled solutions for SMEs. Break free from day-to-day firefighting." />
<meta property="og:image"       content="https://productivity-catalyst-seven.vercel.app/og-image.jpg" />
<meta property="og:image:width"  content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name"   content="Productivity Catalyst" />
<meta property="og:locale"      content="en_GB" />

<!-- Twitter Card -->
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="Productivity Catalyst — Less Chaos, More Growth" />
<meta name="twitter:description" content="Business consulting, automation & AI for SMEs. Most clients see results in 4–8 weeks." />
<meta name="twitter:image"       content="https://productivity-catalyst-seven.vercel.app/og-image.jpg" />
```

**Create the OG image:** Generate `public/og-image.jpg` at 1200×630px using the site's
brand colors and headline "Less Chaos. More Growth." — this is the image shown in
link previews on LinkedIn, Twitter/X, and WhatsApp.

---

### Subagent 10c — JSON-LD Structured Data

Add immediately before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Productivity Catalyst",
  "description": "Business consulting, workflow automation and AI-enabled solutions for SMEs and growing businesses.",
  "url": "https://productivity-catalyst-seven.vercel.app/",
  "telephone": "+919232136211",
  "email": "info@productivitycatalyst.com",
  "areaServed": "Worldwide",
  "serviceType": [
    "Business Consulting",
    "Workflow Automation",
    "AI Solutions",
    "CXO Productivity",
    "Business Assessment"
  ],
  "sameAs": [],
  "offers": {
    "@type": "Offer",
    "description": "Free discovery call for SMEs looking to improve operational efficiency"
  }
}
</script>
```

Also add WebPage schema:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Productivity Catalyst | Business Consulting & Automation for SMEs",
  "description": "Break free from operational firefighting. CXO-focused consulting, automation, and AI solutions.",
  "url": "https://productivity-catalyst-seven.vercel.app/",
  "inLanguage": "en",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Productivity Catalyst",
    "url": "https://productivity-catalyst-seven.vercel.app/"
  }
}
</script>
```

### Agent 10 — Done Condition
- [ ] `<meta name="description">` present and 150–160 chars
- [ ] All 6 Open Graph tags present
- [ ] All 4 Twitter Card tags present
- [ ] Both JSON-LD blocks present and valid JSON
- [ ] `lang="en"` on `<html>` tag
- [ ] `public/og-image.jpg` exists at 1200×630px

---

---

## ⚡ AGENT 11 — Accessibility Agent

### Mission
Bring the site to WCAG 2.1 AA compliance for accessibility.
Owns: HTML attribute additions, ARIA roles, CSS focus styles. No JS logic, no new sections.

**Pre-confirmed issues from Agent 0 to fix:**
- A11Y-001, A11Y-002, A11Y-003

---

### Subagent 11a — Skip Navigation Link

Add as the very FIRST element inside `<body>`:

```html
<a
  href="#main-content"
  class="skip-nav"
  tabindex="0"
>
  Skip to main content
</a>
```

CSS (must be visible when focused):
```css
.skip-nav {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: 8px 16px;
  background: #ffffff;
  color: #000000;
  font-weight: 500;
  text-decoration: none;
  border-radius: 4px;
  transition: top 0.1s;
}

.skip-nav:focus {
  top: 16px;
}
```

Add `id="main-content"` to the `<main>` element (or first `<section>` if no `<main>`):
```html
<main id="main-content">
```

---

### Subagent 11b — Marquee / Ticker aria-hidden

The industries ticker repeats text twice (for infinite scroll CSS animation).
The duplicate clone must be hidden from screen readers:

```html
<!-- Original — visible AND readable -->
<div class="marquee-track" aria-label="Industries served">
  <span>IT Companies</span>
  <span>Merchant Banks</span>
  <!-- ... all items ... -->
</div>

<!-- Clone — visual only, hidden from screen readers -->
<div class="marquee-track" aria-hidden="true">
  <span>IT Companies</span>
  <!-- ... same items duplicated ... -->
</div>
```

Also add a `role="marquee"` wrapper with a label:
```html
<div role="marquee" aria-label="Scrolling list of industries served" aria-live="off">
  <!-- both tracks inside -->
</div>
```

---

### Subagent 11c — ARIA Labels, Focus Styles & Touch Targets

**Icon-only links (nav logo, social icons, hamburger):**
```html
<!-- Logo -->
<a href="/" aria-label="Productivity Catalyst — home">
  <img src="/logo.svg" alt="Productivity Catalyst logo" width="180" height="40" />
</a>

<!-- Hamburger button -->
<button
  aria-label="Open navigation menu"
  aria-expanded="false"
  aria-controls="mobile-nav"
  data-nav-toggle
>
  <!-- icon -->
</button>
```

**Focus styles — add to global CSS:**
```css
:focus-visible {
  outline: 2px solid #4F8EF7;
  outline-offset: 3px;
  border-radius: 3px;
}

/* Remove default outline only when :focus-visible is used */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Touch targets — minimum 44×44px on mobile:**
```css
@media (max-width: 768px) {
  nav a,
  button,
  [role="button"],
  .use-case-cta,
  .btn-primary {
    min-height: 44px;
    min-width: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
```

**Landmark roles (if not already present):**
```html
<header role="banner">...</header>
<nav aria-label="Primary navigation">...</nav>
<main id="main-content" role="main">...</main>
<footer role="contentinfo">...</footer>
```

**Section labels (add aria-labelledby to each section):**
```html
<section id="features" aria-labelledby="features-heading">
  <h2 id="features-heading">Why Productivity Catalyst</h2>
</section>
<section id="how-it-works" aria-labelledby="steps-heading">
  <h2 id="steps-heading">Five Steps to Lasting Impact</h2>
</section>
<!-- etc. -->
```

### Agent 11 — Done Condition
- [ ] Skip nav link present as first body child, visible on focus
- [ ] Marquee clone has `aria-hidden="true"`
- [ ] All icon-only interactive elements have `aria-label`
- [ ] `:focus-visible` styles present and visible (2px outline)
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] All sections have `aria-labelledby` pointing to their heading

---

---

## ⚡ AGENT 12 — Performance & CLS Agent

### Mission
Eliminate Cumulative Layout Shift (CLS), add resource hints, and remove render-blocking
resources. Owns ONLY `<head>` resource hints and HTML attribute additions (width/height).
Does NOT create new files or add new sections.

**Pre-confirmed issues from Agent 0 to fix:**
- PERF-001, PERF-002, PERF-003

---

### Subagent 12a — Fix Video CLS (Missing width/height)

Every `<video>` element must have explicit `width` and `height` to prevent layout shift.
The browser needs these to reserve space before the video loads.

```html
<!-- Add width and height to ALL video elements -->
<video
  width="1920"
  height="1080"
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  poster="/videos/bg1-poster.jpg"
  class="video-bg"
  style="aspect-ratio: 16/9"
>
  <source src="/videos/bg1.webm" type="video/webm" />
  <source src="/videos/bg1.mp4#t=0.001" type="video/mp4" />
</video>
```

Also add CSS to prevent layout shift from video loading:
```css
.video-bg {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Reserve space in the section before video loads */
.video-section {
  min-height: 100vh;    /* or the specific height of the section */
  contain: layout;      /* prevent child layout from affecting parent */
}
```

---

### Subagent 12b — Font Preload Hints

Add font preload links to `<head>` to prevent FOUT (Flash of Unstyled Text).
First, identify which fonts are actually used (check CSS for @font-face declarations
or Google Fonts imports).

**If using Google Fonts:**
```html
<!-- Preconnect to Google Fonts origin -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Preload the most critical font weight (usually regular 400) -->
<link
  rel="preload"
  href="https://fonts.gstatic.com/s/FONTNAME/v1/FONTFILE.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**If using self-hosted fonts:**
```html
<link
  rel="preload"
  href="/fonts/your-font-regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/fonts/your-font-bold.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

---

### Subagent 12c — LCP & Resource Hints

Add these to `<head>` to speed up the Largest Contentful Paint:

```html
<!-- DNS prefetch for any third-party origins used -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.gstatic.com" />

<!-- Preload the hero poster image (the LCP element on first load) -->
<link
  rel="preload"
  href="/videos/bg1-poster.jpg"
  as="image"
  fetchpriority="high"
/>

<!-- If there's a hero image (not video), add fetchpriority directly -->
<!-- <img src="/hero.jpg" fetchpriority="high" loading="eager" /> -->
```

**Defer non-critical JS:**
```html
<!-- Any non-critical third-party scripts -->
<script src="..." defer></script>
<!-- NOT: <script src="..."> — synchronous scripts block rendering -->
```

**Add `font-display: swap` to all @font-face declarations:**
```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/your-font.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;   /* ← prevents invisible text while font loads */
}
```

### Agent 12 — Done Condition
- [ ] All `<video>` elements have `width="1920" height="1080"` attributes
- [ ] `.video-section` has `contain: layout` and `min-height` set
- [ ] Font preload `<link>` tags in `<head>` for primary font files
- [ ] `<link rel="preload" as="image">` for hero poster
- [ ] All third-party scripts have `defer` attribute
- [ ] `font-display: swap` on all @font-face rules

---

---

## ✅ QA / VALIDATION AGENT — EXPANDED SCOPE

**Runs after ALL 12 agents complete. Read-only. No writes.**

This QA Agent now covers the full 12-agent scope. In addition to the original
video/performance tests, run these additional checks:

### DOM & Structure QA
- [ ] No duplicate sections in DOM (use browser DevTools → Elements search)
- [ ] All heading texts have spaces between words
- [ ] No `<a href="*.mp4">` wrappers exist in DOM
- [ ] `id="contact"` exists and is a section with a form inside it
- [ ] All nav anchor hrefs resolve to existing section IDs

### Interactivity QA
- [ ] Scroll down to "Impact at Scale" — counters animate from 0 to real values
- [ ] Hero "Scroll" indicator pulses and fades after scrolling 80px
- [ ] Mobile (≤768px): hamburger opens full-screen nav, Escape closes it
- [ ] Body scroll locked when mobile nav open

### SEO QA
```bash
# Check meta tags are present
curl -s https://productivity-catalyst-seven.vercel.app/ | grep -i "og:title\|description\|twitter:card\|ld+json"
```
- [ ] All 4 types of meta present in output
- [ ] OG image resolves: `curl -I https://productivity-catalyst-seven.vercel.app/og-image.jpg`

### Accessibility QA
- [ ] Tab to first element on page — skip nav appears
- [ ] Screen reader test (VoiceOver/NVDA): marquee reads once, not twice
- [ ] All interactive elements reachable and operable by keyboard alone
- [ ] Lighthouse → Accessibility score ≥ 90

### Performance QA
```
DevTools → Performance → Record → Reload
Check: Layout Shift annotations in timeline — should be near zero
Check: CLS score in Lighthouse < 0.1
Check: LCP < 2.5s on Slow 3G
Check: Network tab → Fonts load with WOFF2 format
```

### Full Lighthouse Run
```
Lighthouse → Mobile → All categories
Target scores:
  Performance:   ≥ 85
  Accessibility: ≥ 90
  Best Practices: ≥ 90
  SEO:           ≥ 95
```

---

---

## 📁 COMPLETE ADDITIVE FILE TREE

Files created or modified by Agents 7–12 (additive to Agents 1–6):

```
project/
├── src/
│   └── utils/
│       ├── counterAnimation.js    ← Agent 8
│       ├── scrollIndicator.js     ← Agent 8
│       └── mobileNav.js           ← Agent 8
│
├── public/
│   └── og-image.jpg               ← Agent 10 (1200×630px)
│
└── [your HTML / component files]
     ├── <head>
     │    ├── meta description      ← Agent 10
     │    ├── Open Graph tags       ← Agent 10
     │    ├── Twitter Card tags     ← Agent 10
     │    ├── JSON-LD scripts       ← Agent 10
     │    ├── font preload links    ← Agent 12
     │    └── LCP preload link      ← Agent 12
     │
     ├── <body>
     │    ├── skip nav link         ← Agent 11
     │    ├── id="main-content"     ← Agent 11
     │    ├── deduped sections      ← Agent 7
     │    ├── fixed headings        ← Agent 7
     │    ├── video width/height    ← Agent 12
     │    ├── data-counter attrs    ← Agent 8
     │    ├── data-scroll-indicator ← Agent 8
     │    ├── data-nav-toggle       ← Agent 8
     │    ├── aria-hidden marquee   ← Agent 11
     │    ├── aria-label links      ← Agent 11
     │    ├── aria-labelledby sects ← Agent 11
     │    ├── id="contact" section  ← Agent 9
     │    ├── id="testimonials"     ← Agent 9
     │    └── fixed CTA hrefs       ← Agent 9
     │
     └── [CSS files]
          ├── skip nav styles       ← Agent 11
          ├── :focus-visible        ← Agent 11
          ├── touch target rules    ← Agent 11
          ├── scroll indicator anim ← Agent 8
          ├── mobile nav open state ← Agent 8
          ├── font-display: swap    ← Agent 12
          └── video CLS containment ← Agent 12
```

---

## 🧩 COMPLETE AGENT OWNERSHIP MAP (all 12 agents)

| Agent | Role | Owns | Pre-confirmed issues |
|---|---|---|---|
| Agent 0  | Recon         | Read-only crawl                  | Discovers + categorizes all |
| Agent 1  | Video Assets  | `/public/videos/*`               | First-load video failure |
| Agent 2  | Vercel Config | `vercel.json`                    | Missing byte-range headers |
| Agent 3  | Video HTML    | `<video>` markup                 | Missing playsInline, iOS fix |
| Agent 4  | CSS Fallback  | CSS/styles only                  | Black screen flash |
| Agent 5  | Lazy Load     | `videoLazyLoader.js`             | All videos loading at once |
| Agent 6  | Mobile/Data   | `connectionAware.js`             | No slow-connection fallback |
| Agent 7  | DOM Structure | HTML markup                      | DOM-001, DOM-002, DOM-003 |
| Agent 8  | JS Interact.  | JS utility files                 | JS-001, JS-002, JS-003 |
| Agent 9  | Links/Nav     | HTML + new contact section       | NAV-001, NAV-002, NAV-003 |
| Agent 10 | SEO & Meta    | `<head>` tags only               | SEO-001 through SEO-004 |
| Agent 11 | Accessibility | HTML attrs + CSS focus/roles     | A11Y-001, A11Y-002, A11Y-003 |
| Agent 12 | Perf & CLS    | `<head>` hints + HTML attrs      | PERF-001, PERF-002, PERF-003 |
| QA Agent | Validation    | Read-only                        | Full 12-domain audit |

**Zero file conflicts. Full parallelism across all 12 agents in Phase 2.**
