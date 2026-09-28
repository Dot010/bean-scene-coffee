import About from '@/components/landing/about'
import Hero from '@/components/landing/hero'
import Navbar from '@/components/landing/navbar'
import Menu from '@/components/landing/menu'
import WhyUs from '@/components/landing/whyus'
import BannerCTA from '@/components/landing/banner-cta'
import Testimonials from '@/components/landing/testimonials'

import Subscribe from '@/components/landing/subscribe'


const Home = () => {
  return (
    <main className='min-h-screen bg-coffee-cream'>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <WhyUs />
      <BannerCTA />
      <Testimonials />
      <Subscribe/>
    </main>
  )
}

export default Home