import About from '@/components/landing/about'
import Hero from '@/components/landing/hero'
import Navbar from '@/components/landing/navbar'

import WhyUs from '@/components/landing/whyus'
import BannerCTA from '@/components/landing/banner-cta'
import Testimonials from '@/components/landing/testimonials'

import Subscribe from '@/components/landing/subscribe'
import Footer from '@/components/landing/footer'
import CoffeeExperience from '@/components/landing/coffee_experience'


const Home = () => {
  return (
    <main className='min-h-screen bg-coffee-cream'>
      <Navbar />
      <Hero />
      <About />
    
      <CoffeeExperience/>
      <WhyUs />
      <BannerCTA />
      <Testimonials />
      <Subscribe />
      <Footer />
    </main>
  )
}

export default Home