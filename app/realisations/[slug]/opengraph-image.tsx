import { caseStudies, getCaseStudyBySlug } from '@/app/lib/case-studies'
import { ogImageSize, renderOgCard } from '@/app/lib/og-card'

export const alt =
  'Étude de cas de Benoit Bruynbroeck, développeur web freelance à Lyon'
export const size = ogImageSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export default async function CaseStudyOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  return renderOgCard({
    eyebrow: caseStudy?.sector ?? 'Réalisation',
    title: caseStudy?.title ?? 'Réalisations',
    subtitle: caseStudy?.challenge ?? '',
    footer: 'Benoit Bruynbroeck · bbenoit.fr/realisations',
    screenshot: caseStudy?.image,
  })
}
