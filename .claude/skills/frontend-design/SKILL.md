---
name: frontend-design
description: Design system for generating pages, sections, and components with consistent styling. Use when updating UI, creating new pages, or styling components.
---

# Frontend Design System

Use this skill when generating pages, sections, or components. It ensures visual consistency with the existing design language.

## Design Philosophy

- **Premium but accessible** - Clean, authoritative aesthetic inspired by GOV.UK
- **Sharp corners** - No rounded corners on main UI elements (cards, buttons have `rounded` for subtle rounding only)
- **Animated interactions** - GSAP scroll-triggered reveals, hover effects with animated bottom borders
- **High contrast** - Dark navy hero sections, white content areas, teal accents

## Quick Reference

### Colors (Tailwind classes)
| Use Case | Class |
|----------|-------|
| Hero backgrounds | `bg-primary-500` (#1e3a5f) |
| CTAs/buttons | `bg-accent-400` (#14b8a6) |
| Focus rings | `focus:ring-focus` (#f59e0b amber) |
| Bookmarks/highlights | `text-highlight-400` (#FACC15) |
| Body text | `text-neutral-700` |
| Section backgrounds | `bg-white` or `bg-neutral-50` |

### Typography
| Element | Classes |
|---------|---------|
| Hero heading | `text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white` |
| Section heading | `text-3xl lg:text-4xl font-bold font-display` |
| Body text | `text-neutral-600 leading-relaxed` |
| Labels | `text-sm font-medium text-neutral-700` |

### Layout
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
```

### Buttons
```html
<!-- Primary (teal) -->
<button class="btn-primary">Action</button>

<!-- Secondary (navy) -->
<button class="btn-secondary">Secondary</button>

<!-- Premium CTA with animated underline -->
<a href="#" class="btn-premium text-lg">Start Free Trial</a>
```

### Cards
```html
<!-- Feature card with dashed border and hover effect -->
<div class="feature-card">
  <div class="w-12 h-12 bg-accent-400/10 flex items-center justify-center mb-5">
    <!-- icon -->
  </div>
  <h3 class="text-xl font-bold mb-3">Title</h3>
  <p class="text-neutral-600 leading-relaxed">Description</p>
</div>
```

## Supporting Files

- **tokens.md** - Full color palette, typography scale, spacing
- **components.md** - All component patterns with code
- **patterns.md** - Layout structures, animations, accessibility
- **examples.md** - Complete section templates

## GSAP Animation Pattern

All animated elements start with `opacity: 0` and use scroll triggers:
```html
<div class="gsap-feature" style="opacity: 0;">Content</div>
```

```javascript
gsap.to('.gsap-feature', {
  scrollTrigger: { trigger: section, start: 'top 70%', once: true },
  opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out'
});
gsap.set('.gsap-feature', { y: 30 });
```
