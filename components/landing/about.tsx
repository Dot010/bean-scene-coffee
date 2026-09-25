import Image from 'next/image';
import cofeeblast from "../../public/images/coffeeblast.png"
import { Text } from '../ui/text';
import { Heading } from '../ui/heading';
import { Button } from '../ui/buttons';
import coupcaffee from '../../public/images/coupcoffee.png';
import { Container } from '../ui/container';

const about = () => {
  return (
    <section className= "relative bg-coffee-sand/10 w-full py-20 md:py-28">
     <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-16">
          
   
          <div className="flex flex-col items-start space-y-6">
            <Heading as="h2" className="text-coffee-brown font-semibold">
              Discover the best coffee
            </Heading>

            <Text variant="subtle" className="mb-8 max-w-xl">
              Bean Scene is a coffee shop that provides you with quality coffee
              that helps boost your productivity and helps build your mood.
              Having a cup of coffee is good, but having a cup of real coffee is
              greater. There is no doubt that you will enjoy this coffee more
              than others you have ever tasted.
            </Text>

            <div className="pt-2">
              <Button href="#learnmore" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center overflow-hidden rounded-2xl p-6 lg:p-12">
            <Image
              src={coupcaffee}
              alt="Xícara de grãos de café"
              className="h-auto w-full max-w-md object-contain"
            />
          </div>

        </div>
          </Container>
          <div className='absolute -bottom-16 -left-8 z-20 w-44 md:w-72 pointer-events-none'>
              <Image
                  src={cofeeblast}
                  alt=''
                  aria-hidden="true"
              className='h-auto w-full object-contain'    
              />
          </div>

    </section>
  );
};

export default about;
