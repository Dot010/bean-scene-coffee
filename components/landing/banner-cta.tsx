'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Container } from '../ui/container';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Button } from '../ui/buttons';

import bgCoffeeCup from '../../public/images/Rectangle 14.png';
import paperCup from '../../public/images/cup.png';
import coffeeBeansOverlay from '../../public/images/coffee_bean.png';

gsap.registerPlugin(ScrollTrigger);

export default function BannerCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

  
      gsap.to('.cta-bg', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });


      gsap.to('.cta-beans', {
        y: -30,
        rotation: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

   
      tl.from('.cta-animate-item', {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power4.out',
      });

  
      tl.from(
        '.cta-cup',
        {
          x: 90,
          scale: 0.75,
          rotation: 12,
          opacity: 0,
          duration: 1.2,
          ease: 'back.out(1.5)',
        },
        '-=0.6'
      );

  
      gsap.to('.cta-cup', {
        y: -14,
        rotation: -2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#24130D] py-20 text-white md:py-28"
    >

      <div className="cta-bg absolute inset-0 -top-12 -bottom-12 z-0">
        <Image
          src={bgCoffeeCup}
          alt="Fundo de café"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#24130D] via-[#24130D]/85 to-[#24130D]/40" />
      </div>


      <div className="cta-beans pointer-events-none absolute -bottom-10 right-0 z-0 w-64 opacity-40 md:w-96">
        <Image
          src={coffeeBeansOverlay}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain mix-blend-screen"
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
  
        <div className="max-w-xl text-center md:text-left">
          <div className="cta-animate-item">
            <Heading
              as="h2"
              className="text-3xl font-bold text-[#FFF3E0] md:text-4xl lg:text-5xl leading-tight"
            >
              Get a chance to have an Amazing morning
            </Heading>
          </div>

          <div className="cta-animate-item">
            <Text className="mt-4 text-[#E0C0A8] text-base md:text-lg leading-relaxed">
              We are giving you are one time opportunity to experience a better life with coffee.
            </Text>
          </div>

          <div className="cta-animate-item mt-8">
            <Button variant="primary" className="shadow-lg transition-transform hover:scale-105">
              Order Now
            </Button>
          </div>
        </div>

    
        <div className="cta-cup relative h-72 w-56 sm:h-80 sm:w-64 md:h-105 md:w-75 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]">
          <Image
            src={paperCup}
            alt="Coffee cup"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Container>
    </section>
  );
}