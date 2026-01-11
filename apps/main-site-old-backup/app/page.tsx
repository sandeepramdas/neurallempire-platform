import Navbar from './components/navigation/Navbar'
import Hero from './components/hero/Hero'
import ProductsShowcase from './components/products/ProductsShowcase'
import Stats from './components/stats/Stats'
import Testimonials from './components/testimonials/Testimonials'
import CaseStudiesPreview from './components/case-studies/CaseStudiesPreview'
import Footer from './components/footer/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <ProductsShowcase />
        <Testimonials />
        <CaseStudiesPreview />
      </main>

      <Footer />
    </div>
  )
}
