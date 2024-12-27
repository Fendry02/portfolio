import Hero from './components/hero'
import Presentation from './components/presentation'
import Skills from './components/skills'
import Works from './components/works'
import Experience from './components/experience'
import Benefits from './components/benefits'
import Timeline from './components/timeline'

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Presentation />
      <Skills />
      <Works />
      <Experience />
      <Benefits />
      <Timeline />
    </main>
  )
}

export default Home
