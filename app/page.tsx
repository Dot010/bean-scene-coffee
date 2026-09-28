import About from '@/components/landing/about'
import Hero from '@/components/landing/hero'
import Navbar from '@/components/landing/navbar'
import  Menu  from '@/components/landing/menu'


const Home = () => {
  return (
    <main className='min-h-screen bg-coffee-cream'>
      <Navbar />
      <Hero />
      <About />
      <Menu />
    </main>
  )
}

export default Home