import { FadeIn, SectionHeader } from './ui'

const STATS = [
  { value: '9+', label: 'Years shipping' },
  { value: '4+', label: 'Devs led' },
  { value: '€500K+', label: 'Projects scoped' },
  { value: '40 / 60', label: 'Perf · deploys (% gained)' },
] as const

export default function Experience() {
  return (
    <section className="px-6 md:px-12 py-[var(--space-section)] bg-ink-2/40 border-y border-line">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <SectionHeader
            num="04"
            eyebrow="Experience"
            title={
              <>
                Numbers, <span className="italic text-accent">in context</span>
              </>
            }
          />
        </div>
        <FadeIn delay={200} className="lg:col-span-8">
          <p className="text-lg text-paper-dim leading-relaxed max-w-3xl">
            Nine years of professional experience in startup environments, with
            a focus on identifying pain points, shipping high-quality features
            and growing the engineers around me. As Tech Lead at CitizenPlane I
            architect platforms, mentor 4+ developers and ship at sustainable
            pace.
          </p>
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {STATS.map((s) => (
              <div key={s.label} className="bg-ink-2 p-6">
                <dt className="eyebrow">{s.label}</dt>
                <dd className="font-display text-paper text-4xl md:text-5xl mt-2 tabular-nums">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  )
}
