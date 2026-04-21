# Layout Patterns & Animations

## Page Structure

### Standard Page Layout
```html
{% extends "base.html" %}

{% block title %}Page Title - Site Name{% endblock %}

{% block content %}
<!-- Page Header -->
<div class="bg-primary-500 text-white">
  <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <h1 class="text-2xl md:text-3xl font-bold font-display text-white">Page Title</h1>
    <p class="mt-2 text-primary-100">Page description</p>
  </div>
</div>

<!-- Main Content -->
<div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
  <!-- content -->
</div>
{% endblock %}
```

### Landing Page Structure
```html
{% extends "base.html" %}

{% block content %}
<!-- Hero Section -->
<div class="hero-premium text-white">...</div>

<!-- Stats Section -->
<div class="bg-white border-t border-neutral-100">...</div>

<!-- Feature Section -->
<div class="bg-white py-20">...</div>

<!-- Alt Background Section -->
<div class="bg-neutral-50 py-20">...</div>

<!-- CTA Section -->
<div class="cta-premium text-white py-20">...</div>
{% endblock %}
```

---

## Section Layouts

### Centered Header + Grid
```html
<div class="bg-white py-20" data-gsap-section="features">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Centered header -->
    <div class="text-center mb-14 gsap-section-header" style="opacity: 0;">
      <h2 class="text-3xl lg:text-4xl font-bold font-display">Section Title</h2>
      <p class="mt-3 text-neutral-500">Supporting description text</p>
    </div>

    <!-- 3-column grid -->
    <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
      <!-- items -->
    </div>
  </div>
</div>
```

### Left-Aligned Header + Grid
```html
<div class="bg-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-14">
      <h2 class="text-3xl lg:text-4xl font-bold font-display">Section Title</h2>
      <p class="mt-3 text-neutral-500">Supporting description</p>
    </div>
    <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
      <!-- items -->
    </div>
  </div>
</div>
```

### Two-Column Layout (Sidebar + Content)
```html
<div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
  <div class="flex flex-col lg:flex-row gap-8">
    <!-- Sidebar -->
    <aside class="lg:w-64 flex-shrink-0">
      <div class="bg-white border border-neutral-200 rounded p-5 sticky top-4">
        <!-- sidebar content -->
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 min-w-0">
      <!-- main content -->
    </div>
  </div>
</div>
```

### Centered Content (Pricing/CTA)
```html
<div class="bg-white py-20">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="text-3xl lg:text-4xl font-bold font-display mb-4">Heading</h2>
    <p class="text-neutral-500 mb-10">Description</p>
    <!-- content -->
  </div>
</div>
```

---

## Grid Patterns

### 4-Column Stats Grid
```html
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
```

### 3-Column Feature Grid
```html
<div class="grid md:grid-cols-3 gap-6 lg:gap-8">
```

### 2-Column Source Cards
```html
<div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
```

### 3-Column Steps (wider gaps)
```html
<div class="grid md:grid-cols-3 gap-8 lg:gap-12">
```

---

## Responsive Breakpoints

| Breakpoint | Width | Common Uses |
|------------|-------|-------------|
| Default | < 640px | Mobile: single column, stacked elements |
| `sm:` | >= 640px | Horizontal form layouts |
| `md:` | >= 768px | 2-3 column grids |
| `lg:` | >= 1024px | Sidebar layouts, 4-column grids |

### Common Responsive Patterns

**Typography scaling:**
```html
<h1 class="text-4xl md:text-5xl lg:text-6xl">
```

**Grid columns:**
```html
<div class="grid grid-cols-2 lg:grid-cols-4">
```

**Flex direction:**
```html
<form class="flex flex-col sm:flex-row gap-0">
```

**Spacing scaling:**
```html
<div class="gap-4 lg:gap-6">
```

**Hide on mobile:**
```html
<div class="hidden lg:block">
```

---

## GSAP Animations

### Setup
Include in base template:
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

### Animation Pattern
Elements start invisible and animate in on scroll:

```html
<!-- Mark section for GSAP -->
<div data-gsap-section="features">

  <!-- Header animation -->
  <div class="gsap-section-header" style="opacity: 0;">
    <h2>Title</h2>
  </div>

  <!-- Staggered items -->
  <div class="gsap-feature" style="opacity: 0;">Item 1</div>
  <div class="gsap-feature" style="opacity: 0;">Item 2</div>
  <div class="gsap-feature" style="opacity: 0;">Item 3</div>
</div>
```

```javascript
// In {% block scripts %}
const section = document.querySelector('[data-gsap-section="features"]');
if (section) {
  // Animate header
  gsap.to(section.querySelector('.gsap-section-header'), {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      once: true
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  });
  gsap.set(section.querySelector('.gsap-section-header'), { y: 20 });

  // Animate items with stagger
  gsap.to('.gsap-feature', {
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      once: true
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out'
  });
  gsap.set('.gsap-feature', { y: 30 });
}
```

### Animation Timing
| Element Type | Duration | Stagger | Start Offset (y) |
|--------------|----------|---------|------------------|
| Section headers | 0.6s | - | 20px |
| Cards/Features | 0.6s | 0.12s | 30px |
| Stats | 0.6s | 0.1s | 20px |
| Steps | 0.6s | 0.15s | 30px |
| Hero content | 0.8s | 0.1s | 20px |

### Counter Animation
```javascript
gsap.to({ val: 0 }, {
  val: targetNumber,
  duration: 1.5,
  delay: i * 0.1,
  ease: 'power1.out',
  onUpdate: function() {
    counter.textContent = Math.floor(this.targets()[0].val).toLocaleString();
  }
});
```

---

## Hero Decorative Elements

The hero section includes floating geometric shapes for visual interest (desktop only):

```html
<!-- Dots -->
<div class="hero-dot hidden lg:block" style="top: 12%; left: 8%;" data-gsap="dot"></div>

<!-- Circles (rings) -->
<div class="hero-circle hidden lg:block" style="top: 18%; right: 20%;" data-gsap="circle"></div>

<!-- Plus signs -->
<div class="hero-plus hidden lg:block" style="top: 15%; right: 30%;" data-gsap="plus"></div>

<!-- Squares -->
<div class="hero-square hidden lg:block" style="top: 35%; right: 8%;" data-gsap="square"></div>

<!-- Lines -->
<div class="hero-line-h hidden lg:block" style="top: 15%; left: 5%; width: 120px;" data-gsap="line-h"></div>
<div class="hero-line-v hidden lg:block" style="top: 20%; right: 15%; height: 100px;" data-gsap="line-v"></div>

<!-- Crosshairs -->
<div class="hero-crosshair hidden lg:block" style="top: 25%; right: 10%;" data-gsap="crosshair"></div>

<!-- Corner accents -->
<div class="corner-accent corner-accent-tl hidden lg:block" data-gsap="corner"></div>
<div class="corner-accent corner-accent-br hidden lg:block" data-gsap="corner"></div>
```

These are animated with subtle floating/pulsing effects and respond to mouse movement on desktop.

---

## Accessibility Requirements

### Focus States
All interactive elements must have visible focus indicators:
```html
focus:outline-none focus:ring-4 focus:ring-focus
```

### Skip Link
Include at top of body:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### Semantic HTML
- Use `<nav>` for navigation
- Use `<main id="main-content">` for main content
- Use `<article>` for list items
- Use `<aside>` for sidebars
- Use `<footer>` for footer

### Color Contrast
- Primary text: `text-neutral-700` on white (passes WCAG AA)
- Hero text: `text-white` on `bg-primary-500` (passes WCAG AA)
- Link text: `text-accent-500` is sufficient contrast on white

### Form Labels
Always associate labels with inputs:
```html
<label for="email" class="label">Email</label>
<input id="email" type="email" class="input">
```

---

## CSS Animations (Non-GSAP)

### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
```

### Live Flash (Pulsing Dot)
```css
@keyframes liveFlash {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7);
  }
  50% {
    opacity: 0.4;
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0);
  }
}
```

### Transition Timing
Standard transitions use `0.3s ease` or `0.2s`:
```html
transition-colors duration-200
transition-all duration-300
```
