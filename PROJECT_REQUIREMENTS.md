# 📋 PROJECT REQUIREMENTS — Productivity Catalyst

> ⚠️ This is the first file to read before any work, prompt, or contribution to this project.
> Every session, every AI prompt, every collaborator — start here.

---

## 🏷️ Project Identity

| Field            | Detail                                                   |
|------------------|----------------------------------------------------------|
| **Project Name** | Productivity Catalyst                                    |
| **Type**         | Responsive Web Platform (Desktop + Mobile)               |
| **GitHub**       | https://github.com/amal-prasad/productivity-catalyst     |
| **Owner**        | Amal Prasad (@amal-prasad)                               |
| **Design Ref**   | https://www.worldquantfoundry.com/                       |
| **Agentic IDE**  | Google Antigravity                                       |
| **Status**       | In Development                                           |

---

## 🎯 Mission Statement

**Productivity Catalyst** exists to eliminate team fragmentation in organizations.

In IT companies, merchant banks, consulting firms, and any large organization, teams operate in silos — they don't know what other departments are doing. This causes duplicated work, missed dependencies, and misaligned priorities.

**Our solution:** Custom-built cross-team trackers that give every team real-time visibility into what every other team is working on.

> One sentence: *We make fragmented teams transparent to each other.*

---

## 👥 Target Users

- Team leads and project managers in large organizations
- Departments in IT companies (Dev, QA, DevOps, Product, Design, Support)
- Teams in merchant/investment banks (Trading, Risk, Compliance, IT, Operations)
- Any company where teams work in silos and lack cross-functional visibility

---

## 🌐 Website Purpose

This is the **marketing and product website** for Productivity Catalyst. It should:

1. Clearly explain what the product does and who it's for
2. Build trust with enterprise clients (professional, dark, premium design)
3. Convert visitors into signups or demo requests
4. Work flawlessly on both desktop and mobile — no breakage, no compromise

---

## 🎨 Design Direction

**Primary inspiration:** [WorldQuant Foundry](https://www.worldquantfoundry.com/)

| Element             | Direction                                                         |
|---------------------|-------------------------------------------------------------------|
| **Background**      | Near-black (`#0a0a0a` or similar)                                 |
| **Text**            | Stark white, high contrast                                        |
| **Typography**      | Oversized bold headlines, tight line-height, Inter or Geist font  |
| **Navigation**      | Minimal, all-caps, spaced lettering, sticky on scroll             |
| **Feature Lists**   | Numbered style — 01 / 04, 02 / 04 etc.                           |
| **Animations**      | Scroll-triggered entrance — elements drift/fade into view         |
| **Scroll**          | Buttery smooth (Lenis)                                            |
| **Cursor**          | Custom interactive cursor (GSAP)                                  |
| **CTAs**            | Repeated throughout the page, bold, high contrast                 |
| **Cards**           | Dark cards with subtle borders, clean grid layout                 |
| **Tone**            | Premium, authoritative, enterprise-grade — not startup playful    |

---

## 📱 Responsive Design Rules

- **Mobile-first** CSS approach using Tailwind CSS
- **One codebase** — no separate mobile/desktop versions
- **No breakage** between screen sizes — seamless transitions
- Breakpoints: Mobile < 768px | Tablet ≥ 768px | Desktop ≥ 1024px

---

## 🗂️ Key Pages / Sections

| Section        | Purpose                                                        |
|----------------|----------------------------------------------------------------|
| Hero           | First impression — bold headline + CTA (video to be added later)|
| Features       | Numbered list — what cross-team tracking solves (01/04 style)  |
| How It Works   | Step-by-step: set up, connect teams, track live                |
| Industries     | IT companies, banks, consulting — tailored messaging           |
| Testimonials   | Social proof from real enterprise clients                      |
| CTA / Signup   | Convert visitors — demo request or free trial                  |
| Footer         | Links, legal, contact                                          |

---

## 🛠️ Tech Stack

| Layer           | Tool                     | Purpose                                       |
|-----------------|--------------------------|-----------------------------------------------|
| Framework       | **Next.js 16+**          | Routing, SSR, performance, SEO                |
| Styling         | **Tailwind CSS**         | Utility-first styling, responsive design       |
| Animations      | **GSAP + ScrollTrigger** | Scroll-driven animations, entrance effects     |
| Smooth Scroll   | **Lenis**                | Buttery smooth scrolling (as seen on WQF)      |
| Custom Cursor   | **GSAP + Custom JS**     | Interactive cursor effect                      |
| Typography      | **Inter / Geist**        | Clean, modern enterprise sans-serif            |
| Deployment      | **Vercel**               | Native Next.js hosting, fast global CDN        |
| Version Control | **Git + GitHub**         | Source control and backup                      |

---

## 🔌 MCP Servers (Website Design + Testing Only)

MCPs connect Google Antigravity directly to real tools so the agent can act autonomously.
Install these inside Antigravity via: Agent Pane → `···` menu → MCP Servers.

> ⚠️ "Google Stretch" does not exist. The correct tool is **Google Stitch** — Google Labs' AI-native UI design tool with a live MCP server. This is the design-to-code MCP for this project.

---

### 1. 🎨 Google Stitch MCP ⭐ (Design → Code, replaces Figma)

Google's own AI-native UI design canvas. Create high-fidelity designs from natural language, export a `DESIGN.md` with your full design system, then push directly into Antigravity. No Figma needed.

```
Install: In Antigravity → Agent Pane → MCP Servers → Stitch → Install
SDK: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/
```

- Generates dark-theme UI components matching WQF-inspired aesthetic
- Exports `DESIGN.md` — an agent-readable design rules file — directly into the project
- Stitch → Antigravity pipeline is native and zero-friction

---

### 2. 📚 Google Developer Knowledge MCP (Live Docs)

Connects Antigravity directly to Google's official documentation — Firebase, Google Cloud, Android, Maps, and more. Eliminates hallucinated APIs by grounding every answer in current, authoritative docs.

```bash
gcloud beta services mcp enable developerknowledge.googleapis.com --project=PROJECT_ID
```

- Use when asking about Firebase Hosting, Google Cloud deployment, or any Google service
- Always fetches the latest docs — no training-data cutoff issues

---

### 3. 🧪 Playwright MCP ⭐ (Browser Testing)

Lets Antigravity control a real browser to verify that animations, scroll effects, and responsive layouts actually work — not just in theory, but live in Chrome.

```bash
npx -y @playwright/mcp@latest
```

- Tests GSAP scroll-trigger animations fire correctly at each breakpoint
- Verifies mobile/desktop layout switches render as designed
- Catches visual regressions after any CSS or layout change
- Works with structured accessibility trees — fast, no screenshot overhead

---

### 4. 🌐 WebMCP — Chrome Web Standard (Browser-Side MCP)

A new W3C web standard co-built by Google and Microsoft, available now in Chrome 146 Canary. Lets AI agents interact directly with the live website DOM through `navigator.modelContext` — no backend server needed.

```
Enable in Chrome: chrome://flags → "WebMCP for testing"
Join: Chrome Early Preview Program
```

- Lets Antigravity interact with the live running website as a user would
- Test form submissions, button interactions, and nav flows in real session context
- Complementary to Playwright — WebMCP for live user-session testing, Playwright for automated CI

---

### 5. 🔥 Firebase MCP (Hosting + Deployment)

If using Firebase Hosting or any Firebase service for deployment, this MCP gives Antigravity full control over your Firebase project — deploy, manage, configure — via natural language.

```bash
# Add to .agent/mcp.json
{
  "servers": {
    "firebase": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "firebase-tools@latest", "mcp"]
    }
  }
}
```

- Antigravity can deploy to Firebase Hosting with a single natural language prompt
- Works alongside the Firebase Agent Skills (see Skills section below)

---

## 🧠 Google Antigravity Skills (Website Design + Testing)

Skills are SKILL.md packages loaded on-demand only when your request matches their description. They do NOT bloat the context window — they activate only when needed.

**Install the community aggregator first:**

```bash
# Install targeted skills only (recommended — don't install all 1,304+)
npx antigravity-awesome-skills install <skill-name>

# Or copy manually into workspace scope:
# .agent/skills/<skill-name>/SKILL.md
```

Source: [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) — 27k+ GitHub stars, 1,304+ skills

---

### 🎨 Design Skills

| Skill | Install Name | Activates When |
|-------|-------------|----------------|
| **React UI Patterns & Design Systems** | `react-ui-patterns` | Building components, cards, layouts |
| **Frontend Guidelines** | `frontend-guidelines` | Writing HTML/CSS/Tailwind |
| **CSS Architecture** | `css-architecture` | Structuring Tailwind or custom CSS |
| **Dark Theme UI** | `dark-theme-ui` | Building dark-background enterprise UI |
| **Responsive Design** | `responsive-design` | Working on mobile/desktop breakpoints |
| **GSAP Animation** | `gsap-animation` | Writing scroll-trigger or motion code |

Source credits: `ChrisWiles/claude-code-showcase` (React UI), `diet103/claude-code-infrastructure-showcase` (Frontend Guidelines)

---

### 🧪 Testing Skills

| Skill | Install Name | Activates When |
|-------|-------------|----------------|
| **Playwright Integration** | `playwright-integration` | Writing or debugging E2E tests |
| **TDD Architect** | `tdd-architect` | Starting any new component or feature |
| **Visual Regression** | `visual-regression` | Checking layout didn't break after changes |
| **Accessibility Auditor** | `accessibility-auditor` | Reviewing components for WCAG compliance |

Source credits: `travisvn/awesome-claude-skills` (Loki Mode + Playwright integration)

---

### 🔧 Workflow Skills

| Skill | Install Name | Activates When |
|-------|-------------|----------------|
| **Git Commit Formatter** | `git-commit-formatter` | Running `git commit` — auto-formats message |
| **Changelog Generator** | `changelog-generator` | Generating release notes from git history |
| **Security Hardening** | `security-hardening` | Reviewing any component that handles user data |
| **Performance Auditor** | `performance-auditor` | Optimising page load or animation performance |

---

### 📁 Skill Directory Structure (Workspace Scope)

```
productivity-catalyst/
└── .agent/
    ├── mcp.json              ← MCP server configuration
    └── skills/
        ├── react-ui-patterns/
        │   └── SKILL.md
        ├── gsap-animation/
        │   └── SKILL.md
        ├── playwright-integration/
        │   └── SKILL.md
        ├── tdd-architect/
        │   └── SKILL.md
        ├── responsive-design/
        │   └── SKILL.md
        └── git-commit-formatter/
            └── SKILL.md
```

> 💡 Skills in `.agent/skills/` are workspace-scoped — active only for this project.
> Global skills (available across all projects) live at `~/.gemini/antigravity/skills/`

---

## 🔁 Git Workflow (Mandatory)

```bash
# Before EVERY session — pull first
git pull origin main

# After EVERY session — push your work
git add .
git commit -m "prefix: what you did"
git push origin main
```

If the project breaks mid-session → `git pull origin main` to restore.

See `README.md` for the full Git workflow and commit message conventions.

> ⚠️ Never store passwords in any file. Use a GitHub Personal Access Token (PAT) for authentication.

---

## 🚫 What This Project Is NOT

- Not a project management tool (like Jira or Asana)
- Not a chat/communication tool (like Slack)
- Not a time tracker
- It is purely a **cross-team visibility and tracking platform** — showing what each team is doing, not managing tasks

---

## 📌 Open Decisions (To Be Finalized)

- [ ] Final color palette (near-black base confirmed — accent TBD)
- [ ] CTA type: Demo request form vs. direct signup
- [ ] Whether to include a live product demo/preview on the site
- [ ] Hero video assets (to be added in a future update)
- [ ] Firebase Hosting vs Vercel for deployment

---

## 📝 Notes for AI Prompts (Antigravity)

When starting a new Antigravity session, paste or reference this file first. It provides full context so the agent doesn't need re-explaining each session.

Example prompt opener:
> "I'm working on Productivity Catalyst. See PROJECT_REQUIREMENTS.md for context. Today I need to..."

---

*Last updated: Antigravity Skills + Google Stitch MCP + Testing stack defined.*
