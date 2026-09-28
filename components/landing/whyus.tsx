import Image from 'next/image';
import { Text } from '../ui/text';
import { Heading } from '../ui/heading';
import { Button } from '../ui/buttons';
import { Container } from '../ui/container';

import badge from '../../public/images/badge 1.png';
import coffesplasr from '../../public/images/coffee_blast_r.png';
import beans from '../../public/images/coffee-beans 1.png';
import coffeecup from '../../public/images/coffee-cup 1.png';
import bestprice from '../../public/images/best-price 1.png';

const WHY_US_FEATURES = [
  {
    id: 'supreme-beans',
    title: 'Supreme Beans',
    description: (
      <>
        Beans that provides <br /> great taste
      </>
    ),
    icon: beans,
    alt: 'Supreme coffee beans icon',
    highlighted: true, 
  },
  {
    id: 'high-quality',
    title: 'High Quality',
    description: (
      <>
        We provide the <br /> highest quality
      </>
    ),
    icon: badge,
    alt: 'High quality badge icon',
  },
  {
    id: 'extraordinary',
    title: 'Extraordinary',
    description: 'Coffee like you have never tasted',
    icon: coffeecup,
    alt: 'Extraordinary coffee cup icon',
  },
  {
    id: 'affordable-price',
    title: 'Affordable Price',
    description: 'Our Coffee prices are easy to afford',
    icon: bestprice,
    alt: 'Affordable price tag icon',
  },
];

export default function WhyUs() {
  return (
    <section className="relative w-full bg-coffee-sand/10 py-16 md:py-24 overflow-hidden">
   
      <div className="pointer-events-none absolute top-0 right-0 z-0 w-44 -translate-y-1/2 sm:w-64 md:w-80">
        <Image
          src={coffesplasr}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain"
          priority
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
   
        <div className="flex flex-col items-center space-y-2">
          <Heading as="h2" className="mt-8 text-3xl md:text-4xl font-bold text-coffee-brown">
            Why are we different?
          </Heading>
          <Text variant="subtle" className="mt-2 max-w-xl text-gray-600">
            We don’t just make your coffee, we make your day!
          </Text>
        </div>

   
        <div className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className={`flex flex-col items-center rounded-2xl border-2 border-amber-200/50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                feature.highlighted
                  ? 'bg-amber-300/40 shadow-sm'
                  : 'bg-amber-100/60'
              }`}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100/80 p-4 mb-4">
                <Image
                  src={feature.icon}
                  alt={feature.alt}
                  className="h-12 w-12 object-contain"
                />
              </div>

              <Heading as="h3" className="text-xl font-bold text-coffee-brown">
                {feature.title}
              </Heading>

              <Text variant="subtle" className="mt-3 text-sm leading-relaxed text-gray-600">
                {feature.description}
              </Text>
            </div>
          ))}
        </div>

     
        <div className="mt-16 flex flex-col items-center space-y-4">
          <Text variant="subtle" className="text-base text-gray-600">
            Great ideas start with great coffee, Lets help you achieve that
          </Text>
          <Heading as="h2" className="text-2xl md:text-3xl font-bold text-coffee-brown">
            Get started today.
          </Heading>
          <div className="pt-2">
            <Button variant="primary">Join Us</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}