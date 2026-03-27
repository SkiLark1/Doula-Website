import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import ServiceArea from './components/ServiceArea'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <ServiceArea />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
