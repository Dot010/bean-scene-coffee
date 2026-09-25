import Image from 'next/image';
import { Button } from '../ui/buttons';

import { Container } from '../ui/container';
import { Text } from '../ui/text'

import HeroBackground from '../../public/images/hero.png';
import Coffee from '../../public/images/Coffee.png'
const Hero = () => {
  return (
    <section className="min-h-[85vh] w-full items-center overflow-hidden">
      <Image
        src={HeroBackground}
        alt="Bean Scene Background"
        fill
        priority
        className="object-scenter object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-r from-black/60 via-black/30 to-black/10" />

        <Container className="relative z-10 w-full pt-40 pb-16">
          <div className="max-w-2xl">
            <Text size="lg" className='mb-8 block font-extralight'>
              We’ve got your morning covered with
          </Text>
          <div className='mb-4'>
            <Image
              src={Coffee}
              alt='CoffeeLogo'
              className='h-auto w-auto'
            />

          </div>
         

            <Text className="mb-8 max-w-xl" >
              It is best to start your day with a cup of coffee.
              Discover the <br />
              best flavours coffee you will ever have. We provide the best <br />
              for our customers.
            </Text>
        
            <div>
              <Button href="#menu" variant="primary">
                Order Now
              </Button>
            </div>
          </div>
        </Container>
      
    </section>
  );
};

export default Hero;
