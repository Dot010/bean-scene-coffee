import About from '@/components/landing/about'
import Hero from '@/components/landing/hero'
import Navbar from '@/components/landing/navbar'
import Menu from '@/components/landing/menu'
import WhyUs from '@/components/landing/whyus'
import BannerCTA from '@/components/landing/banner-cta'


const Home = () => {
  return (
    <main className='min-h-screen bg-coffee-cream'>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <WhyUs />
      <BannerCTA/>
    </main>
  )
}

export default Home