import Image from 'next/image';
import { Container } from '../ui/container';
import CoffeeSplash from '../../public/images/coffeeblast.png';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import cappucino from '../../public/images/capuccino.png';
import chaiLatte from '../../public/images/chai_latte.png';
import macchiatto from '../../public/images/macchiatto.png';
import expresso from '../../public/images/expresso.png';
import { Button } from '../ui/buttons';
import CoffeeSplashr from '../../public/images/coffee_blast_r.png';
export default function Menu() {
  return (
    <section className="relative w-full bg-coffee-sand/10 py-16 md:py-24 overflow-hidden">
    
      <div className="pointer-events-none absolute top-0 left-0 z-0 w-44 -translate-y-1/2 sm:w-64 md:w-80">
        <Image
          src={CoffeeSplash}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain"
          priority
        />    
      </div>

   
      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center space-y-2">
          <Heading as="h2" className="mt-8 block text-2xl font-bold">
            Enjoy a new blend of coffee style
          </Heading>
          <Text variant="subtle" className="mt-2">
            Explore all flavours of coffee with us. There is always a new cup
            worth experiencing
          </Text>
        </div>

        <div className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1 card */}
          <div className="space-y-2 bg-amber-100/60 border-2 border-amber-200/50">
            <Image src={cappucino} alt="cappucino cafe" />
            <Heading as="h3" className="font-extralight">
              Capuccino
            </Heading>
            <Text variant="subtle">Coffee 50% | Milk 50</Text>
            <Text variant="subtle">$8.50</Text>
            <Button variant="primary">Order now</Button>
          </div>

                {/* 2 card */}
          <div className="space-y-2 bg-amber-100/60 border-2 border-amber-200/50">
            <Image src={chaiLatte} alt="Chai Latte cafe" />
               <Heading as="h3" className="font-extralight">
             Chai Latte
            </Heading>
            <Text variant="subtle">Coffee 50% | Milk 50</Text>
            <Text variant="subtle">$8.50</Text>
            <Button variant="primary">Order now</Button>
          </div>

          {/* 3 card */}
          <div className="space-y-2 bg-amber-100/60 border-2 border-amber-200/50">
            <Image src={macchiatto} alt="Machiatto cafe" />
               <Heading as="h3" className="font-extralight">
             Machiatto
            </Heading>
            <Text variant="subtle">Coffee 50% | Milk 50</Text>
            <Text variant="subtle">$8.50</Text>
            <Button variant="primary">Order now</Button>
          </div>
            {/* 4 card */}
          <div className="space-y-2 bg-amber-100/60 border-2 border-amber-200/50">
            <Image src={expresso} alt="Expresso cafe" />
               <Heading as="h3" className="font-extralight">
              Expresso
            </Heading>
            <Text variant="subtle">Coffee 50% | Milk 50</Text>
            <Text variant="subtle">$8.50</Text>
            <Button variant="primary">Order now</Button>
          </div>


        </div>
      </Container>

          <div className="pointer-events-none absolute -bottom-16 -right-8 z-20 w-44 md:w-72">
        <Image
          src={CoffeeSplashr}
          alt=""    
          aria-hidden="true"
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}
