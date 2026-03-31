# Agent Internalization Schema

> **Purpose:** This document captures my internalized knowledge from all skills and the UI/UX Pro Max plugin to inform how I approach software engineering tasks.

---

## 1. Skills Architecture

### Skill System Overview

The project uses a **multi-agent skill system** with specialized agents for different phases:

| Skill | Role | Key Focus |
|-------|------|-----------|
| `planner` | Creates executable phase plans | Task breakdown, dependency analysis, goal-backward verification |
| `verifier` | Validates implementation against spec | Empirical evidence, stub detection, gap analysis |
| `plan-checker` | Pre-execution validation | Requirement coverage, task completeness, dependencies |
| `executor` | Executes plans atomically | Per-task commits, deviation handling, checkpoints |
| `empirical-validation` | Proof before marking done | No "trust me, it works" |
| `debugger` | Systematic bug diagnosis | Hypothesis testing, root cause analysis |
| `token-budget` | Token efficiency | Context optimization, progressive loading |
| `context-fetch` | Search-first file loading | Reduce unnecessary reads |
| `context-compressor` | Context compression | Summary mode, outline mode, reference mode |
| `context-health-monitor` | Quality monitoring | Detects degradation, triggers state dumps |
| `codebase-mapper` | Project analysis | Structure, patterns, technical debt |
| `ui-ux-pro-max` | Design intelligence | 67 styles, 96 palettes, 57 fonts, 99 UX guidelines |

### Execution Philosophy (from GSD)

**Solo Developer + AI Workflow:**
- No teams, stakeholders, ceremonies
- User = visionary/product owner
- AI = the builder
- Plan → Execute → Ship → Learn → Repeat

**Quality Degradation Curve:**
| Context Usage | Quality | State |
|---------------|---------|-------|
| 0-30% | PEAK | Thorough, comprehensive |
| 30-50% | GOOD | Confident, solid work |
| 50-70% | DEGRADING | Efficiency mode |
| 70%+ | POOR | Rushed, minimal |

---

## 2. UI/UX Pro Max Plugin

### Capabilities Summary

```
┌─────────────────────────────────────────────────────────┐
│ UI/UX PRO MAX                                          │
├─────────────────────────────────────────────────────────┤
│ Styles:      67 (Minimalism, Glassmorphism, Brutalism...) │
│ Color Schemes: 96 palettes by product type              │
│ Typography:   57 font pairings                           │
│ UX Rules:    99 guidelines + anti-patterns              │
│ Chart Types: 25 recommendations                         │
│ Stacks:      13 (React, Next.js, Vue, Svelte, etc.)    │
└─────────────────────────────────────────────────────────┘
```

### Product Categories (from ui-reasoning.csv)

Key categories and their recommended patterns:

| Category | Pattern | Style Priority | Color Mood |
|----------|---------|----------------|------------|
| SaaS (General) | Hero + Features + CTA | Glassmorphism + Flat | Trust blue |
| Micro SaaS | Minimal & Direct + Demo | Flat + Vibrant | White space |
| E-commerce | Feature-Rich Showcase | Vibrant & Block | Success green |
| Fintech/Crypto | Conversion-Optimized | Glassmorphism + Dark | Vibrant accents |
| Healthcare App | Social Proof-Focused | Neumorphism | Calm blue |
| B2B Service | Feature-Rich + Trust | Trust & Authority | Professional blue |
| Consulting Firm | Trust & Authority | Trust & Authority | Navy + Gold |

### Design System Generation Workflow

```bash
# Step 1: Generate complete design system
python3 .agent/skills/ui-ux-pro-max/scripts/search.py \
  "<product_type> <keywords>" \
  --design-system -p "Project Name"

# Step 2: Persist for hierarchical retrieval
python3 .agent/skills/ui-ux-pro-max/scripts/search.py \
  "<query>" \
  --design-system --persist -p "Project Name" --page "dashboard"

# Step 3: Get stack-specific guidelines
python3 .agent/skills/ui-ux-pro-max/scripts/search.py \
  "<keyword>" --stack nextjs
```

### Available Domains

| Domain | Use For | Example Keywords |
|--------|---------|-----------------|
| `product` | Product type recommendations | SaaS, e-commerce, healthcare |
| `style` | UI styles, colors, effects | glassmorphism, minimalism |
| `typography` | Font pairings | elegant, playful, professional |
| `color` | Color palettes by product | saas, ecommerce, healthcare |
| `landing` | Page structure, CTA | hero, pricing, social-proof |
| `chart` | Chart types, libraries | trend, comparison, funnel |
| `ux` | Best practices, anti-patterns | animation, accessibility |
| `react` | React/Next.js performance | waterfall, bundle, memo |

### Available Stacks

| Stack | Focus |
|-------|-------|
| `html-tailwind` | Tailwind utilities, responsive, a11y (DEFAULT) |
| `react` | State, hooks, performance |
| `nextjs` | SSR, routing, images, API routes |
| `vue` | Composition API, Pinia, Vue Router |
| `svelte` | Runes, stores, SvelteKit |
| `swiftui` | Views, State, Navigation |
| `react-native` | Components, Navigation, Lists |
| `flutter` | Widgets, State, Layout |
| `shadcn` | shadcn/ui components, theming |
| `jetpack-compose` | Composables, Modifiers, State Hoisting |

### Pre-Delivery Checklist (from SKILL.md)

**Visual Quality:**
- [ ] No emojis used as icons (use SVG: Heroicons/Lucide)
- [ ] All icons from consistent icon set
- [ ] Hover states don't cause layout shift
- [ ] Use theme colors directly, not var() wrapper

**Interaction:**
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover states provide clear visual feedback
- [ ] Transitions are smooth (150-300ms)
- [ ] Focus states visible for keyboard navigation

**Light/Dark Mode:**
- [ ] Light mode text has sufficient contrast (4.5:1 minimum)
- [ ] Glass/transparent elements visible in light mode
- [ ] Borders visible in both modes

**Layout:**
- [ ] Floating elements have proper spacing
- [ ] No content hidden behind fixed navbars
- [ ] Responsive at 375px, 768px, 1024px, 1440px

---

## 3. Planning & Execution Patterns

### Task Anatomy

Every task requires:
- `<files>` — Exact file paths
- `<action>` — Specific implementation with avoid clauses
- `<verify>` — Executable verification
- `<done>` — Measurable acceptance criteria

### Discovery Protocol

| Level | When | Time | Action |
|-------|------|------|--------|
| 0 | Internal work only | - | Skip |
| 1 | Quick verification | 2-5 min | Docs check |
| 2 | Standard research | 15-30 min | Route to research |
| 3 | Deep dive | 1+ hour | Full research |

### Dependency Management

- **Wave 1:** Foundation (types, schemas, utilities)
- **Wave 2:** Core implementations
- **Wave 3:** Integration and validation

**Rule:** Plans in the same wave MUST NOT modify the same files.

### Vertical Slices Over Horizontal Layers

```
✅ Vertical (preferred):
  Plan 1: User registration (API + DB + validation)
  Plan 2: User login (API + session + cookie)

❌ Horizontal (avoid):
  Plan 1: All database models
  Plan 2: All API endpoints
```

---

## 4. Verification & Quality

### Empirical Validation Rules

> "The code looks correct" is NOT validation.

| Change Type | Required Validation |
|-------------|-------------------|
| UI Changes | Screenshot showing expected state |
| API Endpoints | Command showing correct response |
| Build/Config | Successful build or test output |
| Data Changes | Query showing expected state |

**Forbidden Phrases:**
- "This should work"
- "The code looks correct"
- "Based on my understanding"

### Stub Detection Patterns

**React Component Stubs:**
```tsx
return <div>Component</div>
return <div>{/* TODO */}</div>
onClick={() => {}}
```

**API Route Stubs:**
```typescript
return Response.json({ message: "Not implemented" });
return Response.json([]);  // Empty array, no DB query
```

### Verifier Checkpoints

1. **Existence** — File exists at path
2. **Substantive** — Not a stub/placeholder
3. **Wired** — Imports used, exports consumed

---

## 5. Error Handling & Debugging

### Debugger Rules

**3-Strike Rule:** After 3 failed fix attempts:
1. STOP current approach
2. Document in DEBUG.md
3. Summarize to STATE.md
4. Recommend fresh session

**When to Restart:**
- 2+ hours with no progress
- 3+ "fixes" that didn't work
- Fix works but don't know why

### Executor Deviation Rules

| Rule | Trigger | Action |
|------|---------|--------|
| 1 | Bug in code | Auto-fix inline |
| 2 | Missing critical functionality | Auto-add |
| 3 | Blocking issue | Auto-fix |
| 4 | Architectural change needed | Ask user |

**Rule Priority:** 4 > 1-3 (if unsure, ask)

### Authentication Gates

Recognize auth errors:
- "Not authenticated", "Unauthorized", "401"
- "Please run {tool} login"

**Protocol:** STOP → Return checkpoint with steps

---

## 6. Context Management

### Token Budget Thresholds

| Usage | Action |
|-------|--------|
| 0-30% | Proceed freely |
| 30-50% | Prefer search-first |
| 50-70% | Outline-only mode |
| 70%+ | Trigger state dump |

### Compression Strategies

| Strategy | When | Tokens Saved |
|----------|------|--------------|
| Summary Mode | After understanding file | ~60% |
| Outline Mode | Need structure only | ~80% |
| Diff-Only Mode | After changes | ~70% |
| Reference Mode | Track without loading | ~95% |

### Context Health Monitoring

**Warning Signs:**
- 3+ failed debugging attempts
- Same approach tried twice
- "I'm not sure" indicators
- Extended session length

---

## 7. Codebase Patterns

### This Project (ProductivityCatalyst)

**Tech Stack:**
- Next.js 16 (App Router)
- React 19, TypeScript 5
- Tailwind CSS v4
- GSAP animations, Three.js
- Playwright E2E tests

**Key Patterns:**

1. **GSAP Cleanup Pattern:**
   ```tsx
   useEffect(() => {
     let ctx = gsap.context(() => {
       // animations here
     });
     return () => ctx.revert();
   }, [dependencies]);
   ```

2. **Device Detection:**
   ```tsx
   IS_MOBILE()    // < 768px
   IS_REDUCED()   // prefers-reduced-motion
   IS_LOW_END()   // hardwareConcurrency <= 4
   CAN_BLUR()     // capable + not reduced
   ```

3. **Dynamic Imports:**
   ```tsx
   const ParticleVortex = dynamic(() => import("./ParticleVortex"), { ssr: false });
   ```

4. **SessionStorage for Animation State:**
   ```tsx
   const hasAnimated = useRef(false);
   useEffect(() => {
     const sessionAnimated = sessionStorage.getItem("navAnimated");
     if (hasAnimated.current || sessionAnimated) return;
     // ... animation
     sessionStorage.setItem("navAnimated", "true");
   }, []);
   ```

**CSS Variables:**
```css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --text-secondary: #a0a0a0;
  --accent: #00e5cc;
  --border: rgba(255, 255, 255, 0.08);
}
```

---

## 8. Summary: How I Approach Tasks

### Decision Tree

```
User Request
    │
    ├─► UI/UX Work?
    │       │
    │       └─► Run ui-ux-pro-max --design-system
    │               │
    │               └─► Get pattern, style, colors, typography
    │
    ├─► New Feature?
    │       │
    │       ├─► Discovery Level? (0-3)
    │       │
    │       └─► Create PLAN.md with:
    │               - Must-haves (goal-backward)
    │               - Tasks (2-3 per plan)
    │               - Exact file paths
    │               - Executable verify steps
    │
    ├─► Bug Fix?
    │       │
    │       ├─► Hypothesis formation
    │       ├─► Systematic testing
    │       └─► 3-strike rule applies
    │
    └─► Code Review/Refactor?
            │
            ├─► Follow existing patterns
            ├─► Run lint
            └─► Verify tests pass
```

### Quality Gates

1. **Before Planning:** Discovery level assessed
2. **Before Execution:** Plan checker validates
3. **During Execution:** Empirical validation for each task
4. **After Execution:** Verifier confirms must-haves
5. **Pre-Delivery:** Checklist completed

---

*Last updated: Internalized from all skills and ui-ux-pro-max plugin*
