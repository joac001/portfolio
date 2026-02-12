Audit the file or component specified by the user for SEO, accessibility, and design system compliance. If no file is specified, audit the current page (src/app/page.tsx).

## What to check

### Semantic HTML

- No `<div>` or `<span>` used where semantic tags should be (`<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`, `<main>`)
- `<span>` never used as a layout container (only inline within text)
- `<div>` used for spacers instead of `<span>` (spacers are block-level)
- Heading hierarchy is correct (h1 > h2 > h3, no skipped levels)
- Only one `<h1>` per page
- Typography component uses correct variant (not `as` override to break semantics)

### Accessibility

- All buttons have `type="button"` (unless intentionally submit/reset)
- Icon-only buttons have `aria-label`
- Interactive elements have visible `focus-visible` styles
- Images have `alt` text
- Form inputs have associated labels
- Color contrast meets WCAG AA (check semantic color tokens)
- `aria-labelledby` links articles/sections to their headings (use `useId()` for stable IDs)
- Decorative elements have `aria-hidden="true"`
- No keyboard traps (tab order is logical)
- Modals/drawers have: `role="dialog"`, `aria-modal="true"`, focus trap, Escape key to close
- Animated text (TypeWriter) uses `aria-label` with full text + `aria-hidden` on visual content
- Backdrop overlays are `aria-hidden="true"` (click-to-dismiss is a mouse convenience, not keyboard)

### Design System Compliance

- Uses semantic color tokens (bg-primary, text-surface-contrast) not hardcoded colors
- Backdrop overlays use `bg-background/60` not `bg-black/50`
- Uses Typography component for text (not raw tags with manual classes)
- Uses Button component for primary actions (icon-only utility buttons like close/X are exceptions)
- Fonts use `style` prop (`formal` or `mono`) not manual font classes — no `futuristic` style exists
- Responsive: has `md:` and `lg:` breakpoints for mobile-first design
- Animations use framer-motion (not CSS animations or raw transitions)
- Data comes from `src/data/experiences.json` — types from `experience-timeline/types.ts`

### SEO (page-level only)

- Page has meaningful `<h1>`
- Content is inside `<main>` (Container with `id`)
- Metadata exports exist if it's a page file
- No empty alt attributes (use descriptive text or `alt=""` only for decorative images)

### CSS / Layout

- `flex` is always paired with direction (`flex-col`, `flex-row`) when needed
- `flex-col` is never used without `flex` (it's a no-op otherwise)
- `space-y-*` used with `flex flex-col`, not bare `flex` (which defaults to row)

## Output format

Present findings as a checklist:

- ✅ for passing checks
- ❌ for failures (with specific line numbers and fix suggestions)
- ⚠️ for warnings (technically ok but could be improved)

End with a summary: X passed, Y failed, Z warnings.
