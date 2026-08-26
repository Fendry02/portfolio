import Image from 'next/image'

import JsonLd from '@/app/components/json-ld'
import {
  buildPageMetadata,
  createJsonLdGraph,
  createWebPageJsonLd,
} from '@/app/lib/seo'

const pagePath = '/quoiporter'
const appStoreUrl = 'https://apps.apple.com/fr/app/quoiporter/id6801611537'
const pageTitle = 'Quoi porter selon la météo ?'
const pageDescription =
  'QuoiPorter vous dit quoi mettre selon la météo de votre ville : vêtements, couche, chaussures et ce qu’il faut emporter.'

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const softwareApplication = {
  '@type': 'SoftwareApplication',
  name: 'QuoiPorter',
  applicationCategory: 'WeatherApplication',
  operatingSystem: 'iOS',
  description: pageDescription,
  downloadUrl: appStoreUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
}

const appLink =
  'inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950'

const sectionTitle =
  'font-display text-[clamp(1.85rem,3.6vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950'

export default function QuoiPorterPage() {
  return (
    <main className="overflow-hidden bg-[#f6fafb] text-slate-950">
      <JsonLd
        data={createJsonLdGraph([
          createWebPageJsonLd({
            path: pagePath,
            name: pageTitle,
            description: pageDescription,
          }),
          softwareApplication,
        ])}
      />

      <section className="relative isolate overflow-hidden bg-[linear-gradient(145deg,#b8ebf6_0%,#8ed8ed_42%,#c7f0f1_70%,#f6fafb_100%)] px-6 pb-20 pt-28 sm:px-10 lg:px-16 lg:pb-28 lg:pt-36">
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#20588b]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.96fr_0.72fr] lg:gap-20">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700/70">
              QuoiPorter · gratuit · iPhone
            </p>
            <h1 className="font-display mt-5 text-[clamp(3.4rem,7.4vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-slate-950">
              Sachez quoi mettre.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-800/80 sm:text-xl">
              QuoiPorter lit la météo de votre ville et donne une tenue claire :
              vêtements, couche, chaussures et ce qu’il faut emporter.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href={appStoreUrl} className={appLink}>
                Télécharger sur l’App Store
              </a>
              <a
                href="#comment-ca-marche"
                className="text-sm font-semibold text-slate-800 underline decoration-slate-800/35 underline-offset-4 hover:decoration-slate-800"
              >
                Voir comment ça marche
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-700/75">
              Sans compte. Sans publicité.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[24rem] lg:max-w-[26rem]">
            <div className="absolute inset-x-10 bottom-0 h-14 rounded-full bg-slate-900/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.65rem] border-[7px] border-slate-950 bg-slate-950 shadow-[0_28px_70px_rgba(16,48,75,0.35)]">
              <Image
                alt="La tenue conseillée par QuoiPorter pour une journée de chaleur"
                className="h-[34rem] w-full object-cover object-top sm:h-[39rem]"
                height={2868}
                priority
                src="/quoiporter/tenue-du-jour.png"
                width={1320}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="comment-ca-marche"
        className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-800">
            Avant de sortir
          </p>
          <h2 className={`${sectionTitle} mt-4`}>
            La météo devient une réponse.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Ouvrez l’app le matin. La tenue du jour arrive avant le bulletin :
            vous savez quoi porter, puis vous regardez les détails seulement si
            vous en avez besoin.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-slate-200 sm:grid-cols-3">
          <article className="bg-white p-8 sm:p-9">
            <p className="text-sm font-semibold text-sky-800">01</p>
            <h3 className="font-display mt-10 text-3xl font-semibold tracking-[-0.045em] text-slate-950">
              Tenue du jour
            </h3>
            <p className="mt-4 leading-7 text-slate-700">
              Haut, bas, couche extérieure, chaussures et l’accessoire utile.
            </p>
          </article>
          <article className="bg-white p-8 sm:p-9">
            <p className="text-sm font-semibold text-sky-800">02</p>
            <h3 className="font-display mt-10 text-3xl font-semibold tracking-[-0.045em] text-slate-950">
              Météo utile
            </h3>
            <p className="mt-4 leading-7 text-slate-700">
              Ressenti, pluie, vent et UV n’apparaissent que lorsqu’ils changent
              vraiment la journée.
            </p>
          </article>
          <article className="bg-white p-8 sm:p-9">
            <p className="text-sm font-semibold text-sky-800">03</p>
            <h3 className="font-display mt-10 text-3xl font-semibold tracking-[-0.045em] text-slate-950">
              Semaine prévue
            </h3>
            <p className="mt-4 leading-7 text-slate-700">
              Faites glisser les sept prochains jours avant une averse ou un
              coup de froid.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[22rem]">
            <div className="absolute inset-8 rounded-[2rem] bg-sky-400/40 blur-3xl" />
            <Image
              alt="Le widget QuoiPorter affiche la tenue du jour sur un écran d’accueil"
              className="relative rounded-[2rem] shadow-2xl"
              height={2868}
              src="/quoiporter/widget.png"
              width={1320}
            />
          </div>
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">
              Widget
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
              La réponse reste là.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Ajoutez « Tenue du jour » à l’écran d’accueil et consultez la
              recommandation sans ouvrir l’app. Parce qu’à 8 h 12, vous avez
              autre chose à faire que déchiffrer une météo.
            </p>
            <a
              href={appStoreUrl}
              className={`${appLink} mt-9 bg-white text-slate-950 hover:bg-sky-50`}
            >
              Télécharger QuoiPorter
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-800">
          Questions fréquentes
        </p>
        <h2 className={`${sectionTitle} mt-4`}>Simple dès l’ouverture.</h2>
        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          <details className="group py-6">
            <summary className="list-none pr-8 text-lg font-semibold marker:hidden">
              QuoiPorter a besoin d’un compte ?
            </summary>
            <p className="mt-4 max-w-2xl leading-7 text-slate-700">
              Non. Autorisez votre position ou recherchez une ville ; elle reste
              enregistrée sur votre téléphone.
            </p>
          </details>
          <details className="group py-6">
            <summary className="list-none pr-8 text-lg font-semibold marker:hidden">
              L’app peut-elle afficher mon planning de la semaine ?
            </summary>
            <p className="mt-4 max-w-2xl leading-7 text-slate-700">
              Oui. Les sept prochains jours sont accessibles par un simple
              glissement afin de préparer une journée pluvieuse ou fraîche.
            </p>
          </details>
          <details className="group py-6">
            <summary className="list-none pr-8 text-lg font-semibold marker:hidden">
              Mes données servent-elles à la publicité ?
            </summary>
            <p className="mt-4 max-w-2xl leading-7 text-slate-700">
              Non. QuoiPorter ne contient ni publicité ni pistage. Consultez la
              politique de confidentialité dans l’app ou sur le site.
            </p>
          </details>
        </div>
      </section>
    </main>
  )
}
