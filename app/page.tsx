import Hero from './components/hero'
import Presentation from './components/presentation'
import Skills from './components/skills'
import Works from './components/works'
import Experience from './components/experience'
import Timeline from './components/timeline'
import Philosophy from './components/philosophy'
import Benefits from './components/benefits'
import Testimonials from './components/testimonials'
import Contact from './components/contact'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Presentation />
      <Skills />
      <Works />
      <Experience />
      <Timeline />
      <Philosophy />
      <Benefits />
      <Testimonials />
      <Contact />
    </main>
  )
}
