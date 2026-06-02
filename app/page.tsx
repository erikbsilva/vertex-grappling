import Hero from '@/components/sections/Hero'
import Agitation from '@/components/sections/Agitation'
import Solution from '@/components/sections/Solution'
import ForWhom from '@/components/sections/ForWhom'
import HowItWorks from '@/components/sections/HowItWorks'
import Authority from '@/components/sections/Authority'
import LeadForm from '@/components/sections/LeadForm'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Agitation />
      <Solution />
      <ForWhom />
      <HowItWorks />
      <Authority />
      <LeadForm />
      <Footer />
    </main>
  )
}
