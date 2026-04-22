"use client";

import { useEffect, useRef } from "react";
import { Lock, Rocket, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Tester = {
  initials: string;
  region: string;
  color: string;
};

const TESTERS: Tester[] = [
  { initials: "AM", region: "US", color: "from-primary-400 to-primary-600" },
  { initials: "PR", region: "BR", color: "from-primary-500 to-primary-700" },
  { initials: "KS", region: "IN", color: "from-primary-400 to-primary-600" },
  { initials: "LE", region: "DE", color: "from-primary-500 to-primary-700" },
  { initials: "NJ", region: "NG", color: "from-primary-400 to-primary-600" },
  { initials: "YM", region: "JP", color: "from-primary-500 to-primary-700" },
  { initials: "RO", region: "PL", color: "from-primary-400 to-primary-600" },
  { initials: "MA", region: "EG", color: "from-primary-500 to-primary-700" },
  { initials: "CL", region: "FR", color: "from-primary-400 to-primary-600" },
  { initials: "TH", region: "UK", color: "from-primary-500 to-primary-700" },
  { initials: "DV", region: "MX", color: "from-primary-400 to-primary-600" },
  { initials: "SW", region: "ZA", color: "from-accent-400 to-accent-500" },
];

const MILESTONES = [
  { day: "D1", label: "Install" },
  { day: "D4", label: "Review" },
  { day: "D9", label: "Recording" },
  { day: "D13", label: "Bug report" },
];

export function JourneyAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Skip animation entirely; elements are rendered in their final state
      // via CSS fallback below.
      gsap.set(
        [
          ".j-stuck",
          ".j-shipped",
          ".j-tile",
          ".j-milestone",
          ".j-live",
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      gsap.set(".j-rail-fill", { scaleX: 1 });
      gsap.set(".j-rail", { scaleX: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".j-stuck", { opacity: 0, x: -40 });
      gsap.set(".j-shipped", { opacity: 0, x: 40, scale: 0.9 });
      gsap.set(".j-tile", { opacity: 0, y: 24, scale: 0.5 });
      gsap.set(".j-rail", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".j-rail-fill", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".j-milestone", { opacity: 0, y: 10, scale: 0.8 });
      gsap.set(".j-live", { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(".j-stuck", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          ".j-rail",
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
          "-=0.2"
        )
        .to(
          ".j-tile",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: { each: 0.06, from: "start" },
            ease: "back.out(1.6)",
          },
          "-=0.3"
        )
        .to(
          ".j-milestone",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.12,
            ease: "back.out(1.8)",
          },
          "-=0.6"
        )
        .to(
          ".j-rail-fill",
          { scaleX: 1, duration: 1.2, ease: "power1.inOut" },
          "-=0.8"
        )
        .to(
          ".j-shipped",
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        )
        .to(
          ".j-live",
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
          },
          "-=0.2"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-neutral-50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="section-heading">
            From stuck to shipped in fourteen days.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            Twelve verified testers. Four structured deliverables. One
            exportable report Google will accept.
          </p>
        </div>

        <div
          ref={rootRef}
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8"
        >
          {/* ---------- LEFT: Stuck ---------- */}
          <div className="j-stuck lg:col-span-3">
            <div className="flex h-full flex-col border border-dashed border-neutral-300 bg-white p-6">
              <span className="eyebrow !mb-2 !text-neutral-500">Day 0</span>
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-neutral-100">
                <Lock className="h-6 w-6 text-neutral-500" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                Locked out of production
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Needs 12 opted-in testers for 14 continuous days. No crew, no
                ship.
              </p>
              <div className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Review blocked
              </div>
            </div>
          </div>

          {/* ---------- CENTER: Crew + Rail ---------- */}
          <div className="lg:col-span-6">
            <div className="flex h-full flex-col justify-between bg-white p-6 shadow-sm ring-1 ring-neutral-200/60">
              {/* Tester grid */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="eyebrow !mb-0">Your crew</span>
                  <span className="text-xs font-medium text-neutral-500">
                    12 / 12 verified
                  </span>
                </div>
                <div
                  className="grid grid-cols-4 gap-2"
                  aria-label="Twelve verified testers"
                >
                  {TESTERS.map((t, i) => (
                    <div
                      key={i}
                      className={`j-tile relative aspect-square bg-gradient-to-br ${t.color} overflow-hidden`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://api.dicebear.com/9.x/personas/svg?seed=${t.initials}-${t.region}&backgroundType=solid&backgroundColor=transparent`}
                        alt={`Tester ${t.initials} from ${t.region}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/50 px-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                        {t.region}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress rail */}
              <div className="mt-8">
                <div className="relative h-1 bg-neutral-100">
                  <div className="j-rail absolute inset-0 bg-neutral-200" />
                  <div className="j-rail-fill absolute inset-0 bg-accent-400" />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {MILESTONES.map((m) => (
                    <div
                      key={m.day}
                      className="j-milestone flex flex-col items-start"
                    >
                      <span className="font-display text-xs font-bold text-accent-500">
                        {m.day}
                      </span>
                      <span className="text-xs text-neutral-600">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT: Shipped ---------- */}
          <div className="j-shipped lg:col-span-3">
            <div className="relative flex h-full flex-col overflow-hidden bg-primary-500 p-6 text-white">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-400/20 blur-2xl"
                aria-hidden
              />
              <span className="eyebrow !mb-2 !text-accent-300">Day 14</span>
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-accent-400">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold">Live on the Play Store</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-100">
                Exportable report attached to your production questionnaire.
                Reviewer nods. You ship.
              </p>
              <div className="j-live mt-auto pt-4">
                <span className="inline-flex items-center gap-2 bg-accent-400 px-3 py-1.5 text-xs font-semibold text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping bg-white/70" />
                    <span className="relative inline-flex h-2 w-2 bg-white" />
                  </span>
                  <Check className="h-3 w-3" />
                  Published
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
