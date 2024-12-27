import Hero from './components/hero'
import Presentation from './components/presentation'
import Skills from './components/skills'
import Works from './components/works'
import Experience from './components/experience'
import Timeline from './components/timeline'
import Benefits from './components/benefits'
import Contact from './components/contact'
const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Presentation />
      <Skills />
      <Works />
      <Experience />
      <Timeline />
      <Benefits />
      <Contact />
    </main>
  )
}

export default Home
