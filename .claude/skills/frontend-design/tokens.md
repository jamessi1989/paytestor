# Design Tokens

## Color Palette

### Primary (Navy/Slate)
Deep authoritative blues for headers, nav, dark sections.

| Token | Hex | Tailwind | Use Case |
|-------|-----|----------|----------|
| primary-50 | #f8fafc | `bg-primary-50` | Light backgrounds |
| primary-100 | #e8eef4 | `text-primary-100` | Hero subtext |
| primary-200 | #cbd5e1 | `text-primary-200` | Footer text |
| primary-300 | #94a3b8 | `text-primary-300` | Muted text on dark |
| primary-400 | #64748b | `text-primary-400` | Secondary text |
| **primary-500** | **#1e3a5f** | `bg-primary-500` | **Hero backgrounds, nav** |
| primary-600 | #172d4a | `bg-primary-600` | Hover state for navy |
| primary-700 | #0f2a45 | `bg-primary-700` | Footer background |
| primary-800 | #0a1f35 | `bg-primary-800` | Darkest variant |
| primary-900 | #061525 | `bg-primary-900` | Ultra dark |

### Accent (Teal)
Vibrant teal for CTAs, interactive elements, success states.

| Token | Hex | Tailwind | Use Case |
|-------|-----|----------|----------|
| accent-300 | #5eead4 | `text-accent-300` | Light teal text |
| **accent-400** | **#14b8a6** | `bg-accent-400` | **Primary CTAs, buttons** |
| accent-500 | #0d9488 | `bg-accent-500` | Hover state for teal |
| accent-600 | #0f766e | `bg-accent-600` | Dark teal |

### Focus (Amber)
High-contrast amber for accessibility focus rings.

| Token | Hex | Tailwind | Use Case |
|-------|-----|----------|----------|
| focus | #f59e0b | `focus:ring-focus` | All focus states |

### Highlight (Yellow)
Bright yellow for bookmarks, emphasis, special badges.

| Token | Hex | Tailwind | Use Case |
|-------|-----|----------|----------|
| highlight-300 | #FEF08A | `bg-highlight-300` | Light yellow bg |
| **highlight-400** | **#FACC15** | `text-highlight-400` | **Bookmarks, emphasis** |
| highlight-500 | #EAB308 | `text-highlight-500` | Darker yellow |

### Neutral (Gray)
Balanced grays for text, borders, backgrounds.

| Token | Hex | Tailwind | Use Case |
|-------|-----|----------|----------|
| neutral-50 | #fafaf9 | `bg-neutral-50` | Alt section backgrounds |
| neutral-100 | #f5f5f4 | `bg-neutral-100` | Page background |
| neutral-200 | #e5e7eb | `border-neutral-200` | Card borders |
| neutral-300 | #d1d5db | `border-neutral-300` | Input borders |
| neutral-400 | #9ca3af | `text-neutral-400` | Placeholder text |
| neutral-500 | #6b7280 | `text-neutral-500` | Secondary text |
| neutral-600 | #4a5568 | `text-neutral-600` | Body text |
| neutral-700 | #374151 | `text-neutral-700` | Primary body text |
| neutral-800 | #1f2937 | `text-neutral-800` | Dark text |
| neutral-900 | #1a1a1a | `text-neutral-900` | Headings |

---

## Typography

### Font Families
```css
/* Display headings */
font-family: 'DM Sans', sans-serif;  /* Tailwind: font-display */

/* Body text */
font-family: 'Inter', sans-serif;  /* Tailwind: font-body */
```

Loaded via Next.js `next/font/google` in layout.tsx.

### Type Scale

| Size | Tailwind | Use Case |
|------|----------|----------|
| 6xl | `text-6xl` (60px) | Hero headline (desktop) |
| 5xl | `text-5xl` (48px) | Hero headline (tablet) |
| 4xl | `text-4xl` (36px) | Hero headline (mobile), section headers |
| 3xl | `text-3xl` (30px) | Section headers (mobile) |
| 2xl | `text-2xl` (24px) | Page titles |
| xl | `text-xl` (20px) | Card titles, feature headings |
| lg | `text-lg` (18px) | Large body text, CTAs |
| base | `text-base` (16px) | Body text |
| sm | `text-sm` (14px) | Labels, secondary text |
| xs | `text-xs` (12px) | Badges, timestamps |

### Heading Patterns

```html
<!-- Hero heading -->
<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight text-white">
  Your Hero Headline Here
</h1>

<!-- Section heading (centered) -->
<h2 class="text-3xl lg:text-4xl font-bold font-display">How It Works</h2>
<p class="mt-3 text-neutral-500">Supporting description</p>

<!-- Section heading (left-aligned) -->
<h2 class="text-3xl lg:text-4xl font-bold font-display">Why Choose Us?</h2>
<p class="mt-3 text-neutral-500">Everything you need in one platform</p>

<!-- Card heading -->
<h3 class="text-xl font-bold mb-3">Complete Coverage</h3>
```

---

## Spacing

### Section Padding
```html
<!-- Standard section -->
<div class="py-20">

<!-- Stats section (tighter) -->
<div class="py-14">
```

### Container
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Section Header Margin
```html
<div class="mb-14">  <!-- After header, before grid -->
```

### Grid Gaps
```html
<!-- Feature/card grids -->
gap-6 lg:gap-8

<!-- Stat grids -->
gap-4 lg:gap-6

<!-- Step grids -->
gap-8 lg:gap-12
```

### Common Spacing
| Use | Class |
|-----|-------|
| Icon container | `mb-5` |
| Heading to description | `mb-3` |
| Description line height | `leading-relaxed` |
| Hero subtext | `mt-6` |
| Hero search | `mt-10` |
| Inline elements | `gap-2` or `gap-3` |

---

## Shadows

| Use | Value |
|-----|-------|
| Card default | `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04)` |
| Card hover | `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)` |
| Feature card hover | `box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.08)` |
| Premium button hover | `box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3)` |
| Pricing card | `box-shadow: 0 4px 24px rgba(30, 58, 95, 0.1)` |
| Nav scrolled | `shadow-lg backdrop-blur-md` |

---

## Border Radius

| Element | Class |
|---------|-------|
| Buttons | `rounded` (4px) |
| Badges | `rounded` (4px) |
| Cards | Square (no radius) |
| Modals | `rounded-xl` |
| Form inputs | `rounded` (4px) |

---

## Focus States

All interactive elements must have visible focus states for accessibility:

```html
<!-- Standard focus ring (amber) -->
focus:outline-none focus:ring-4 focus:ring-focus

<!-- On dark backgrounds (with offset) -->
focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-500
```
