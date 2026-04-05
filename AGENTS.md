<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Productivity Catalyst — Agent Guidelines

## Project Overview

A Next.js 16 (App Router) marketing website for a business consulting firm. Uses React 19, TypeScript 5, Tailwind CSS v4, GSAP animations, Three.js, and Playwright for E2E tests.

---

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Start production server

# Linting & Type Checking
npm run lint         # ESLint (eslint-config-next/core-web-vitals + typescript)

# E2E Testing (Playwright)
npx playwright test                        # Run all tests
npx playwright test tests/e2e/navbar.spec.ts  # Run single test file
npx playwright test --grep "mobile"         # Run tests matching pattern
npx playwright test --ui                   # Interactive UI mode
npx playwright show-report                  # View HTML report
```

---

## Project Structure

```
src/
  app/              # Next.js App Router pages & layouts
    layout.tsx      # Root layout (fonts, providers, metadata)
    page.tsx        # Homepage (assembles all sections)
    globals.css     # Tailwind + custom CSS + animations
    services/[slug]/page.tsx  # Dynamic service pages
  components/       # React components (mostly "use client")
  context/          # React contexts (e.g., LoadingContext)
  lib/              # Utilities (gsap.ts, servicesData.ts)

tests/e2e/          # Playwright E2E tests
playwright.config.ts
```

---

## Code Style Guidelines

### Imports & Path Aliases

- Use `@/` alias for all internal imports (`@/components/...`, `@/lib/...`, `@/context/...`)
- Group imports: 1) Node built-ins, 2) External packages, 3) Internal modules
- `"use client"` directive required for any component using hooks, browser APIs, or GSAP

```tsx
// Example imports
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";
import { gsap, MOTION } from "@/lib/gsap";
import { servicesData, ServiceData } from "@/lib/servicesData";
```

### TypeScript

- **Strict mode enabled** — no implicit any, strict null checks
- Use explicit types for function parameters and return values
- Props interfaces defined inline or at top of file
- Use `Readonly<{ ... }>` for layout props per Next.js convention
- Service data uses `ServiceData` interface with: `id`, `slug`, `num`, `title`, `shortBody`, `fullDescription`, `bulletPoints`

```tsx
interface Props {
  strength?: number;
  elasticity?: number;
  children: React.ReactNode;
}

export default function Component({ children }: Props) {
  // ...
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // ...
}
```

### React Patterns

- Function components with named exports for pages, **default exports** for reusable components
- Use `useRef` for DOM elements, `useRef<HTMLElement | null>(null)` typing
- GSAP cleanup pattern (always use `gsap.context()`):

```tsx
useEffect(() => {
  let ctx = gsap.context(() => {
    // animations here
  });
  return () => ctx.revert();
}, [dependencies]);
```

- Use `sessionStorage` to survive soft reloads during animation state
- Dynamic imports with `{ ssr: false }` for Three.js/GSAP components:

```tsx
const ParticleVortex = dynamic(() => import("./ParticleVortex"), { ssr: false });
```

- Use Lenis for smooth scrolling via `SmoothScroll.tsx`

### GSAP Animation

Import from `@/lib/gsap`:

```tsx
import { gsap, MOTION, safeAnimate, IS_MOBILE, IS_REDUCED, IS_LOW_END, CAN_BLUR } from "@/lib/gsap";
```

**MOTION constants** for timing/easing:
- Durations: `instant`, `micro`, `snappy`, `standard`, `deliberate`, `cinematic`
- Eases: `out`, `inOut`, `back`, `elastic`, `smooth`

**Animation utilities:**
- `animateHeroWords(container)` — word-by-word hero reveal
- `animateOnScroll(selector, opts)` — scroll-triggered fade/slide
- `animatePinnedScroll(container, items, opts)` — pinned crossfade panels
- `animateCounter(el, target, opts)` — animated number counters
- `animateLineDraw(el)` — SVG line draw
- `animateMobileScrollFocus(items, opts)` — mobile scrub focus effect

**Device detection:**
- `IS_MOBILE()` — window width < 768px
- `IS_REDUCED()` — prefers-reduced-motion
- `IS_LOW_END()` — hardwareConcurrency <= 4
- `CAN_BLUR()` — capable device + no reduced motion

Use `safeAnimate(fn, fallbackFn)` to respect `prefers-reduced-motion`.

### Tailwind CSS v4

- Uses `@import "tailwindcss"` (no config file)
- CSS variables in `:root` and `@theme inline`
- Custom utilities via `@apply` in `globals.css`
- Responsive fonts with `clamp()`: `text-[clamp(2.5rem,6.5vw,6rem)]`
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)

### CSS Custom Properties

```css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --text-secondary: #a0a0a0;
  --accent: #00e5cc;
  --border: rgba(255, 255, 255, 0.08);
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Hero.tsx`, `Navbar.tsx` |
| Functions/hooks | camelCase | `useLoading`, `safeAnimate` |
| Constants | SCREAMING_SNAKE_CASE | `MOTION`, `NAV_LINKS` |
| CSS classes | kebab-case | `.carousel-card`, `.hero-headline` |
| Utility files | kebab-case | `services-data.ts` |

### Error Handling

- Context providers throw descriptive errors for misused hooks
- LoadingContext has 6s timeout fallback to prevent infinite loading
- GSAP operations guarded with null checks: `if (!element) return`
- Browser APIs guarded: `typeof window !== 'undefined'`
- Use `notFound()` from `next/navigation` for 404 pages

### Accessibility

- Always include `aria-label` on icon-only buttons
- Use `focus-visible` for custom focus rings (accent color)
- Support `prefers-reduced-motion` — use `safeAnimate()` or instant reveals
- Custom cursor hidden on touch devices (`@media (pointer: fine)`)
- All interactive elements keyboard accessible

### ESLint Configuration

- Extends `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
- Run `npm run lint` before committing

---

## Testing Guidelines (Playwright)

- Tests located in `tests/e2e/`
- Use `test.skip()` for conditional tests based on device
- Use `page.getByLabel()` for accessible element queries
- Test mobile with `isMobile` fixture check
- View reports with `npx playwright show-report`

---

## Common Patterns

**Navbar animation with sessionStorage persistence:**
```tsx
const hasAnimated = useRef(false);
useEffect(() => {
  const sessionAnimated = sessionStorage.getItem("navAnimated");
  if (hasAnimated.current || sessionAnimated) {
    // Instantly show, skip animation
    return;
  }
  hasAnimated.current = true;
  sessionStorage.setItem("navAnimated", "true");
  // ... GSAP animation
}, []);
```

**Client/server component split:**
```tsx
// Server component (page.tsx) - handles data fetching, metadata
// Client components - handle interactivity, animations
```

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes � gives risk-scored analysis |
| `get_review_context` | Need source snippets for review � token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
