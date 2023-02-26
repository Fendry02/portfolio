import Hero from './components/hero'
import Presentation from './components/presentation'
import Skills from './components/skills'
import Works from './components/works'

export default function Home() {
  return (
    <div className="bg-base-100">
      <Hero />
      <Presentation />
      <Skills />
      <Works />
    </div>
  )
}
