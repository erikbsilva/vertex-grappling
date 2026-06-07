import Hero from '@/components/sections/Hero'
import Agitation from '@/components/sections/Agitation'
import Solution from '@/components/sections/Solution'
import ForWhom from '@/components/sections/ForWhom'
import HowItWorks from '@/components/sections/HowItWorks'
import Authority from '@/components/sections/Authority'
import Book from '@/components/sections/Book'
import Testimonials from '@/components/sections/Testimonials'
import LeadForm from '@/components/sections/LeadForm'
import Footer from '@/components/sections/Footer'
import StickyBar from '@/components/ui/StickyBar'

export default function Home() {
  return (
    <main>
      <StickyBar />
      <Hero />
      <Agitation />
      <Solution />
      <ForWhom />
      <HowItWorks />
      <Authority />
      <Book />
      <Testimonials />
      <LeadForm />
      <Footer />
    </main>
  )
}
