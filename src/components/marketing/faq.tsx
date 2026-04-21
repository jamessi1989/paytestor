import { JsonLd } from "./json-ld";

export type FaqItem = { q: string; a: string };

// Static FAQ list. Emits schema.org FAQPage JSON-LD so LLM and search crawlers
// can ingest each question/answer pair verbatim.
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <>
      <dl className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
        {items.map((item) => (
          <div key={item.q} className="grid gap-2 p-6 md:grid-cols-3 md:gap-8">
            <dt className="font-display text-base font-bold text-neutral-900">
              {item.q}
            </dt>
            <dd className="text-sm leading-relaxed text-neutral-700 md:col-span-2">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />
    </>
  );
}
