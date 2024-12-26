import Hero from './components/hero'
import Presentation from './components/presentation'
import Skills from './components/skills'
import Works from './components/works'
import Experience from './components/experience'
import Benefits from './components/benefits'

export default function Home() {
  return (
    <main>
      <Hero />
      <Presentation />
      <Skills />
      <Works />
      <Experience />
      <Benefits />
    </main>
  )
}
