# Code Examples

Complete, copy-paste-ready templates for common page sections.

## Hero Section

```html
<!-- Hero Section - Premium gradient with decorative elements -->
<div class="hero-premium text-white">
    <!-- Corner accents (desktop only) -->
    <div class="corner-accent corner-accent-tl hidden lg:block" data-gsap="corner"></div>
    <div class="corner-accent corner-accent-br hidden lg:block" data-gsap="corner"></div>

    <!-- Floating shapes (desktop only) - add as many as needed -->
    <div class="hero-dot hidden lg:block" style="top: 12%; left: 8%;" data-gsap="dot"></div>
    <div class="hero-circle hidden lg:block" style="top: 18%; right: 20%;" data-gsap="circle"></div>
    <div class="hero-plus hidden lg:block" style="top: 15%; right: 30%;" data-gsap="plus"></div>

    <div class="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight text-white gsap-hero-content" style="opacity: 0;">
                Your Hero Headline Here
            </h1>
            <p class="mt-6 text-xl text-primary-100 leading-relaxed gsap-hero-content" style="opacity: 0;">
                Supporting description that explains the value proposition
                in one or two clear sentences.
            </p>

            <!-- Search or CTA -->
            <div class="mt-10 gsap-hero-content" style="opacity: 0;">
                <a href="/register" class="btn-premium text-lg">
                    Get Started Free
                </a>
            </div>

            <!-- Trust indicator -->
            <div class="mt-6 gsap-hero-content" style="opacity: 0;">
                <span class="live-indicator">Live data from official sources</span>
            </div>
        </div>
    </div>
</div>
```

**GSAP animation for hero:**
```javascript
gsap.to('.gsap-hero-content', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.2
});
gsap.set('.gsap-hero-content', { y: 20 });
```

---

## Stats Section

```html
<div class="bg-white border-t border-neutral-100" data-gsap-section="stats">
    <div class="max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div class="stat-card text-center gsap-stat" style="opacity: 0;">
                <div class="text-3xl lg:text-4xl font-bold text-primary-500 font-display"
                     data-count="12500">0</div>
                <div class="mt-2 text-sm text-neutral-500 font-medium uppercase tracking-wide">Total Items</div>
            </div>
            <div class="stat-card text-center gsap-stat" style="opacity: 0;">
                <div class="text-3xl lg:text-4xl font-bold text-primary-500 font-display"
                     data-count="450">0</div>
                <div class="mt-2 text-sm text-neutral-500 font-medium uppercase tracking-wide">Active Now</div>
            </div>
            <div class="stat-card text-center gsap-stat" style="opacity: 0;">
                <div class="text-3xl lg:text-4xl font-bold text-primary-500 font-display"
                     data-count="28">0</div>
                <div class="mt-2 text-sm text-neutral-500 font-medium uppercase tracking-wide">Expiring Soon</div>
            </div>
            <div class="stat-card text-center gsap-stat" style="opacity: 0;">
                <div class="text-3xl lg:text-4xl font-bold text-primary-500 font-display"
                     data-count="156">0</div>
                <div class="mt-2 text-sm text-neutral-500 font-medium uppercase tracking-wide">New This Week</div>
            </div>
        </div>
    </div>
</div>
```

**GSAP animation with counter:**
```javascript
const statsSection = document.querySelector('[data-gsap-section="stats"]');
if (statsSection) {
    gsap.to('.gsap-stat', {
        scrollTrigger: {
            trigger: statsSection,
            start: 'top 80%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        onStart: function() {
            document.querySelectorAll('[data-count]').forEach((counter, i) => {
                const target = parseInt(counter.dataset.count) || 0;
                if (target === 0) return;
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: 'power1.out',
                    onUpdate: function() {
                        counter.textContent = Math.floor(this.targets()[0].val).toLocaleString();
                    }
                });
            });
        }
    });
    gsap.set('.gsap-stat', { y: 20 });
}
```

---

## How It Works (Steps)

```html
<div class="bg-neutral-50 py-20" data-gsap-section="steps">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14 gsap-section-header" style="opacity: 0;">
            <h2 class="text-3xl lg:text-4xl font-bold font-display">How It Works</h2>
            <p class="mt-3 text-neutral-500">Three simple steps to get started</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div class="text-center step-item gsap-step" style="opacity: 0;">
                <div class="step-number mx-auto mb-6">1</div>
                <h3 class="text-xl font-bold mb-3">Step One</h3>
                <p class="text-neutral-600 leading-relaxed">Description of the first step and what the user needs to do.</p>
            </div>
            <div class="text-center step-item gsap-step" style="opacity: 0;">
                <div class="step-number mx-auto mb-6">2</div>
                <h3 class="text-xl font-bold mb-3">Step Two</h3>
                <p class="text-neutral-600 leading-relaxed">Description of the second step in the process.</p>
            </div>
            <div class="text-center step-item gsap-step" style="opacity: 0;">
                <div class="step-number mx-auto mb-6">3</div>
                <h3 class="text-xl font-bold mb-3">Step Three</h3>
                <p class="text-neutral-600 leading-relaxed">Description of the final step and outcome.</p>
            </div>
        </div>
    </div>
</div>
```

---

## Feature Grid

```html
<div class="bg-white py-20" data-gsap-section="features">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-14 gsap-section-header" style="opacity: 0;">
            <h2 class="text-3xl lg:text-4xl font-bold font-display">Why Choose Us?</h2>
            <p class="mt-3 text-neutral-500">Everything you need in one platform</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div class="feature-card gsap-feature" style="opacity: 0;">
                <div class="w-12 h-12 bg-accent-400/10 flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3">Feature One</h3>
                <p class="text-neutral-600 leading-relaxed">
                    Clear explanation of this feature and the benefit it provides to users.
                </p>
            </div>
            <div class="feature-card gsap-feature" style="opacity: 0;">
                <div class="w-12 h-12 bg-accent-400/10 flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3">Feature Two</h3>
                <p class="text-neutral-600 leading-relaxed">
                    Description of the second key feature and its value.
                </p>
            </div>
            <div class="feature-card gsap-feature" style="opacity: 0;">
                <div class="w-12 h-12 bg-accent-400/10 flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3">Feature Three</h3>
                <p class="text-neutral-600 leading-relaxed">
                    Description of the third feature highlighting speed or efficiency.
                </p>
            </div>
        </div>
    </div>
</div>
```

---

## Two-Column Trust/Source Section

```html
<div class="bg-neutral-50 py-20 border-t border-neutral-100" data-gsap-section="sources">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 gsap-section-header" style="opacity: 0;">
            <h2 class="text-2xl lg:text-3xl font-bold font-display mb-3">Trusted Data Sources</h2>
            <p class="text-neutral-500">We aggregate from official sources</p>
        </div>
        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div class="source-card gsap-source" style="opacity: 0;">
                <h3 class="font-bold text-lg mb-2">Source One</h3>
                <p class="text-neutral-600 text-sm leading-relaxed">Description of this data source and what it provides.</p>
                <div class="mt-4 flex items-center gap-2 text-xs text-accent-500 font-medium">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Updated daily
                </div>
            </div>
            <div class="source-card gsap-source" style="opacity: 0;">
                <h3 class="font-bold text-lg mb-2">Source Two</h3>
                <p class="text-neutral-600 text-sm leading-relaxed">Description of this data source and what it provides.</p>
                <div class="mt-4 flex items-center gap-2 text-xs text-accent-500 font-medium">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Updated daily
                </div>
            </div>
        </div>
    </div>
</div>
```

---

## Pricing Section

```html
<div class="bg-white py-20" data-gsap-section="pricing">
    <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold font-display mb-4 gsap-section-header" style="opacity: 0;">Simple Pricing</h2>
        <p class="text-neutral-500 mb-10 gsap-section-header" style="opacity: 0;">One plan. Full access. No hidden fees.</p>
        <div class="pricing-premium inline-block text-left gsap-pricing" style="opacity: 0;">
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
                    <span class="text-neutral-700">Feature one</span>
                </li>
                <li class="flex items-center gap-3">
                    <div class="w-5 h-5 bg-accent-400/10 flex items-center justify-center flex-shrink-0">
                        <svg class="w-3 h-3 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <span class="text-neutral-700">Feature two</span>
                </li>
                <li class="flex items-center gap-3">
                    <div class="w-5 h-5 bg-accent-400/10 flex items-center justify-center flex-shrink-0">
                        <svg class="w-3 h-3 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <span class="text-neutral-700">Feature three</span>
                </li>
            </ul>
        </div>
        <p class="mt-8 text-neutral-400 text-sm gsap-section-header" style="opacity: 0;">14-day free trial included</p>
    </div>
</div>
```

---

## Final CTA Section

```html
<div class="cta-premium text-white py-20" data-gsap-section="cta">
    <div class="relative max-w-3xl mx-auto text-center px-4">
        <h2 class="text-3xl lg:text-4xl font-bold font-display mb-4 text-white gsap-cta" style="opacity: 0;">
            Ready to Get Started?
        </h2>
        <p class="text-primary-200 mb-10 text-lg gsap-cta" style="opacity: 0;">
            14-day free trial. No credit card required.
        </p>
        <a href="/auth/register" class="btn-premium text-lg gsap-cta" style="opacity: 0;">
            Start Free Trial
        </a>
    </div>
</div>
```

---

## List Item Card

```html
<article class="bg-white border border-neutral-200 rounded p-5 hover:border-neutral-400 transition-colors">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div class="flex-1 min-w-0">
            <div class="flex items-start gap-2">
                <a href="/items/{{ item.id }}"
                   class="flex-1 text-base font-bold text-accent-500 hover:text-accent-600 focus:outline-none focus:ring-2 focus:ring-focus rounded transition-colors line-clamp-2">
                    {{ item.title }}
                </a>
                <!-- Action button if needed -->
            </div>
            <p class="text-neutral-600 text-sm mt-1">{{ item.subtitle }}</p>

            <div class="flex flex-wrap gap-1.5 mt-2">
                <span class="badge-neutral text-xs">Category</span>
                <span class="badge-primary text-xs">Tag</span>
                <span class="badge-success text-xs">Active</span>
            </div>
        </div>

        <div class="sm:text-right flex-shrink-0">
            <div class="text-lg font-bold text-primary-500 font-display">
                &pound;500,000
            </div>
            <div class="text-xs text-neutral-500 mt-1">
                Due: 15 Feb 2026
            </div>
        </div>
    </div>
</article>
```

---

## Empty State

```html
<div class="bg-white border border-neutral-200 rounded p-12 text-center">
    <svg class="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
    <p class="text-neutral-700 font-medium">No results found</p>
    <p class="text-neutral-500 mt-2">Try adjusting your filters or search terms.</p>
</div>
```

---

## Pagination

```html
<nav class="flex justify-center mt-8 gap-2" aria-label="Pagination">
    <a href="?page=1"
       class="px-4 py-2 bg-white border-2 border-neutral-300 rounded font-medium text-neutral-700
              hover:border-neutral-400 focus:outline-none focus:ring-4 focus:ring-focus transition-colors">
        Previous
    </a>

    <span class="px-4 py-2 bg-primary-500 text-white font-bold rounded">
        2 / 10
    </span>

    <a href="?page=3"
       class="px-4 py-2 bg-white border-2 border-neutral-300 rounded font-medium text-neutral-700
              hover:border-neutral-400 focus:outline-none focus:ring-4 focus:ring-focus transition-colors">
        Next
    </a>
</nav>
```
