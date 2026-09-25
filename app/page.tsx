import Hero from '@/components/landing/hero'
import Navbar from '@/components/landing/navbar'


const Home = () => {
  return (
    <main className='min-h-screen bg-coffee-cream'>
      <Navbar />
      <Hero/>
    </main>
  )
}

export default Home