# Component Patterns

## Buttons

### Primary Button (Teal)
Main call-to-action button.

```html
<button class="btn-primary">Search Contracts</button>
```

CSS:
```css
.btn-primary {
  @apply inline-flex items-center justify-center px-5 py-3
         bg-accent-400 text-white font-bold rounded
         hover:bg-accent-500
         focus:outline-none focus:ring-4 focus:ring-focus;
}
```

### Secondary Button (Navy)
Secondary actions.

```html
<button class="btn-secondary">Apply Filters</button>
```

CSS:
```css
.btn-secondary {
  @apply inline-flex items-center justify-center px-5 py-3
         bg-primary-500 text-white font-bold rounded
         hover:bg-primary-600
         focus:outline-none focus:ring-4 focus:ring-focus;
}
```

### Tertiary Button (Outlined)
Less prominent actions.

```html
<button class="btn-tertiary">Learn More</button>
```

CSS:
```css
.btn-tertiary {
  @apply inline-flex items-center justify-center px-5 py-3
         bg-white text-primary-500 font-bold rounded
         border-2 border-primary-500
         hover:bg-primary-50
         focus:outline-none focus:ring-4 focus:ring-focus;
}
```

### Premium CTA Button
Hero-level call-to-action with animated underline on hover.

```html
<a href="/auth/register" class="btn-premium text-lg">Start Free Trial</a>
```

CSS:
```css
.btn-premium {
  @apply relative inline-flex items-center justify-center px-8 py-4
         bg-accent-400 text-white font-semibold
         overflow-hidden transition-all duration-300
         focus:outline-none focus:ring-4 focus:ring-focus;
}

.btn-premium::after {
  content: '';
  @apply absolute bottom-0 left-0 h-1 bg-white/30;
  width: 0;
  transition: width 0.3s ease;
}

.btn-premium:hover {
  @apply bg-accent-500;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
}

.btn-premium:hover::after {
  width: 100%;
}
```

### Nav CTA Button (Dark Nav)
For use in the dark navigation header.

```html
<a href="/auth/register" class="btn-nav-cta-dark">Sign Up</a>
```

---

## Cards

### Stat Card
Statistics display with animated bottom border on hover.

```html
<div class="stat-card text-center">
  <div class="text-3xl lg:text-4xl font-bold text-primary-500 font-display">1,234</div>
  <div class="mt-2 text-sm text-neutral-500 font-medium uppercase tracking-wide">Total Contracts</div>
</div>
```

CSS:
```css
.stat-card {
  @apply relative p-6 bg-white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.stat-card::after {
  content: '';
  @apply absolute bottom-0 left-1/2 h-0.5 bg-accent-400;
  width: 0;
  transform: translateX(-50%);
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stat-card:hover::after {
  width: 100%;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

### Feature Card
Feature/benefit display with dashed border and hover effects.

```html
<div class="feature-card">
  <div class="w-12 h-12 bg-accent-400/10 flex items-center justify-center mb-5">
    <svg class="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </div>
  <h3 class="text-xl font-bold mb-3">Feature Title</h3>
  <p class="text-neutral-600 leading-relaxed">
    Clear explanation of this feature and the benefit
    it provides to users.
  </p>
</div>
```

CSS:
```css
.feature-card {
  @apply relative bg-white p-8;
  border: 1px dashed #d1d5db;
  transition: all 0.3s ease;
}

.feature-card::after {
  content: '';
  @apply absolute bottom-0 left-0 h-0.5 bg-accent-400;
  width: 0;
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.feature-card:hover {
  @apply border-neutral-300;
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.08);
}

.feature-card:hover::after {
  width: 100%;
}
```

### Source Card
Data source / trust indicator card.

```html
<div class="source-card">
  <h3 class="font-bold text-lg mb-2">Data Source Name</h3>
  <p class="text-neutral-600 text-sm leading-relaxed">Description of this data source and what it provides</p>
  <div class="mt-4 flex items-center gap-2 text-xs text-accent-500 font-medium">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    </svg>
    Updated daily
  </div>
</div>
```

### Pricing Card
Premium pricing display with decorative elements.

```html
<div class="pricing-premium inline-block text-left">
  <div class="text-center mb-6">
    <div class="text-5xl font-bold font-display text-primary-500">&pound;125</div>
    <div class="text-neutral-500 mt-1">per month</div>
  </div>
  <ul class="space-y-4">
    <li class="flex items-center gap-3">
      <div class="w-5 h-5 bg-accent-400/10 flex items-center justify-center flex-shrink-0">
        <svg class="w-3 h-3 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <span class="text-neutral-700">Unlimited searches</span>
    </li>
    <!-- More list items -->
  </ul>
</div>
```

CSS:
```css
.pricing-premium {
  @apply relative bg-white p-10 border-2 border-primary-500;
  box-shadow: 0 4px 24px rgba(30, 58, 95, 0.1);
}

.pricing-premium::before {
  content: '';
  @apply absolute inset-0 pointer-events-none;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, transparent 50%);
}

.pricing-premium::after {
  content: '';
  @apply absolute -bottom-1 left-4 right-4 h-1 bg-accent-400;
}
```

### Basic Card (for content areas)
Simple card for lists, filters, etc.

```html
<div class="bg-white border border-neutral-200 rounded p-5">
  <!-- content -->
</div>
```

With hover:
```html
<article class="bg-white border border-neutral-200 rounded p-5 hover:border-neutral-400 transition-colors">
  <!-- content -->
</article>
```

---

## Badges

### Badge Base
```html
<span class="badge">Label</span>
```

### Badge Variants

```html
<!-- Primary (blue) - CPV codes -->
<span class="badge-primary">CPV: 72000000</span>

<!-- Success (green) - Active status -->
<span class="badge-success">Active</span>

<!-- Warning (amber) -->
<span class="badge-warning">Expiring Soon</span>

<!-- Error (red) -->
<span class="badge-error">Cancelled</span>

<!-- Neutral (gray) - Categories -->
<span class="badge-neutral">Services</span>

<!-- Purple - Data source -->
<span class="badge-purple">FTS</span>

<!-- Highlight (yellow) - Bookmarked -->
<span class="badge-highlight">Bookmarked</span>
```

CSS:
```css
.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium;
}

.badge-primary { @apply badge bg-primary-100 text-primary-600; }
.badge-success { @apply badge bg-green-100 text-green-700; }
.badge-warning { @apply badge bg-amber-100 text-amber-700; }
.badge-error { @apply badge bg-red-100 text-red-700; }
.badge-neutral { @apply badge bg-neutral-100 text-neutral-700; }
.badge-purple { @apply badge bg-purple-100 text-purple-700; }
.badge-highlight { @apply badge bg-highlight-400/10 text-highlight-500; }
```

---

## Form Elements

### Text Input
```html
<div>
  <label class="label">Email Address</label>
  <input type="email" class="input" placeholder="you@example.com">
</div>
```

CSS:
```css
.label {
  @apply block text-sm font-medium text-neutral-700 mb-1;
}

.input {
  @apply w-full px-3 py-2 border-2 border-neutral-300 rounded text-neutral-900
         focus:outline-none focus:ring-4 focus:ring-focus focus:border-focus
         placeholder:text-neutral-400;
}
```

### Select
```html
<div>
  <label class="label">Category</label>
  <select class="select">
    <option value="">All categories</option>
    <option value="goods">Goods</option>
    <option value="services">Services</option>
  </select>
</div>
```

CSS:
```css
.select {
  @apply w-full px-3 py-2 border-2 border-neutral-300 rounded text-neutral-900 bg-white
         focus:outline-none focus:ring-4 focus:ring-focus focus:border-focus;
}
```

### Hero Search Input
```html
<div class="search-premium">
  <form action="/search" method="GET" class="flex flex-col sm:flex-row gap-0">
    <input type="text" name="q"
      class="flex-1 px-5 py-4 text-lg text-neutral-900 bg-white border-2 border-white
             focus:outline-none focus:border-accent-400
             placeholder:text-neutral-400 transition-all duration-300"
      placeholder="Search contracts...">
    <button type="submit"
      class="search-btn px-8 py-4 bg-accent-400 text-white font-semibold text-lg
             hover:bg-accent-500 transition-colors duration-200
             focus:outline-none focus:ring-4 focus:ring-focus">
      Search
    </button>
  </form>
</div>
```

---

## Navigation

### Dark Header Nav Link
```html
<a href="/search" class="text-primary-100 hover:text-white px-3 py-2 font-medium rounded focus:outline-none focus:ring-4 focus:ring-focus">
  Search
</a>
```

### Animated Underline Link
```html
<a href="#" class="link-animated text-accent-500 hover:text-accent-600">
  Learn more
</a>
```

CSS:
```css
.link-animated {
  @apply relative inline-block;
}

.link-animated::after {
  content: '';
  @apply absolute bottom-0 left-0 h-0.5 bg-current;
  width: 0;
  transition: width 0.3s ease;
}

.link-animated:hover::after {
  width: 100%;
}
```

---

## Step Numbers (How It Works)

```html
<div class="step-number mx-auto mb-6">1</div>
```

CSS:
```css
.step-number {
  @apply relative w-14 h-14 bg-primary-500 text-white flex items-center justify-center text-xl font-bold font-display;
}

.step-number::after {
  content: '';
  @apply absolute -bottom-2 left-1/2 w-6 h-0.5 bg-accent-400;
  transform: translateX(-50%);
}
```

---

## Live Indicator

Pulsing dot indicator for live data.

```html
<span class="live-indicator">Live data from official sources</span>
```

CSS:
```css
.live-indicator {
  @apply inline-flex items-center gap-2 text-sm font-medium text-accent-400;
}

.live-indicator::before {
  content: '';
  @apply w-2 h-2 bg-accent-400 rounded-full;
  animation: liveFlash 1.5s ease-in-out infinite;
}

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

---

## Icons

Use Heroicons (outline style) with these standard sizes:

| Context | Size |
|---------|------|
| Feature card icon | `w-6 h-6` (in `w-12 h-12` container) |
| Badge checkmarks | `w-3 h-3` or `w-4 h-4` |
| Button icons | `w-4 h-4` or `w-5 h-5` |
| Empty state | `w-12 h-12` |

Icon container pattern:
```html
<div class="w-12 h-12 bg-accent-400/10 flex items-center justify-center">
  <svg class="w-6 h-6 text-accent-500" ...>
</div>
```
