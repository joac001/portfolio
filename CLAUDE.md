# Portfolio - Joaquín Ordóñez

## Stack

- Next.js 16 (App Router, SSR-first)
- React 19
- TypeScript
- Tailwind CSS v4 (`@theme inline` for design tokens)
- Framer Motion (animations)
- Lucide React (icons)
- pnpm

## Project Structure

```
src/
  app/              → Pages, layout, metadata, globals.css
  components/
    shared/         → Reusable design system components
      index.ts      → Barrel exports (update when adding components)
      types.tsx     → Shared types (TextStyle, styleClasses)
  contexts/         → React contexts (ThemeContext)
```

## Design System

### Color Palette (CSS variables in globals.css)

Light/dark mode via `.dark` class on `<html>`. Colors: background, primary/contrast, accent/contrast, surface/contrast, muted/contrast, border, success/contrast, error/contrast, warning/contrast.

### Fonts (next/font/google)

- `font-formal` → Inter (default)
- `font-mono` → JetBrains Mono

### Components

All shared components follow these rules:

- **Semantic HTML**: Use correct tags (`<article>`, `<header>`, `<main>`, `<nav>`, NOT `<div>`/`<span>` for structure)
- **TypeScript interfaces**: All props typed, no `any`
- **Accessibility**: `type="button"` on buttons, `aria-label` on icon-only buttons, `aria-labelledby` linking titles
- **Responsive**: Mobile-first with `md:` and `lg:` breakpoints
- **Dark mode ready**: Use semantic color tokens (bg-primary, text-surface-contrast, etc.)

### Component Reference

| Component   | Renders as                                       | Key props                                                                           |
| ----------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Typography  | h1-h6, p, span, label (auto-mapped from variant) | `variant`, `style`, `as` (override), `id`                                           |
| Button      | motion.button                                    | `variant`, `style`, `type` (default: button), `disabled`, `aria-label`, `className` |
| Card        | article                                          | `title` (required), `subtitle`, `actions` (Button[])                                |
| Container   | main (default)                                   | `as` (main/section/div), `id` (required), `className`                               |
| AppBar      | header + nav                                     | —                                                                                   |
| ThemeToggle | button                                           | Internal component (not exported)                                                   |

### Animations (Framer Motion)

- Button: `whileHover` (scale 1.05, y -2, boxShadow glow), `whileTap` (scale 0.97)
- ThemeToggle: AnimatePresence with y-axis slide (moon up, sun down)
- Transition: `tween` type, no spring (avoids border flickering)
- CSS: `prefers-reduced-motion` disables all animations globally

## SEO

- Metadata with Open Graph + Twitter Cards in layout.tsx
- JSON-LD Person schema in layout.tsx head
- robots.ts and sitemap.ts in app/
- Skip-to-content link targeting `#main-content`
- Domain placeholder: `https://joaquinordonez.dev` (update on deploy)
- GitHub/LinkedIn URLs in JSON-LD marked as TODO

## Rules

- Always use semantic HTML tags over `<div>`/`<span>` for structure
- Never use `<span>` as layout container (use `<div>` or semantic tags)
- Components that use browser APIs or hooks → `"use client"`
- Keep shared components SSR-compatible (children as props pattern)
- Barrel export every new shared component in index.ts
- Use CSS variables for colors, never hardcoded hex values
- User communicates in Spanish
