'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Container } from '../ui/container';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Button } from '../ui/buttons';

import coffeeBlast from '../../public/images/coffeeblast.png';
import cupCoffee from '../../public/images/coupcoffee.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from('.about-content', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.about-content'),
          start: 'top 85%',
        },
      });

      gsap.from('.about-image', {
        y: -30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.about-image'),
          start: 'top 85%',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-linear-to-b from-[#1c120c] via-coffee-dark to-coffee-dark py-16 sm:py-20 md:py-32 text-coffee-cream scroll-mt-20"
    >
      <Container className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-16 gap-10">

          <div className="about-content flex flex-col items-center text-center lg:items-start lg:text-left space-y-5 sm:space-y-6">
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-coffee-amber uppercase">
              Our Craft & Story
            </span>

            <Heading as="h2" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-coffee-cream leading-tight">
              Discover the <span className="italic text-coffee-amber">Best Coffee</span>
            </Heading>

            <Text variant="subtle" className="text-sm sm:text-base leading-relaxed text-coffee-cream/70 max-w-xl font-light">
              Bean Scene is an artisan coffee shop dedicated to providing meticulously extracted 
              coffee that elevates your daily ritual and boosts productivity. Having a cup of coffee 
              is good, but experiencing true specialty coffee is extraordinary.
            </Text>

            <div className="pt-2 w-full sm:w-auto">
              <Button 
                href="#learnmore" 
                variant="primary" 
                className="bg-coffee-amber text-coffee-dark hover:bg-amber-500 font-semibold px-8 py-3 text-xs uppercase tracking-wider transition-all w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="about-image relative flex items-center justify-center p-2 sm:p-6 lg:p-8">
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-coffee-amber/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 bg-[#141210]/80 border border-coffee-amber/15 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-sm w-full max-w-sm sm:max-w-md mx-auto flex items-center justify-center">
              <Image
                src={cupCoffee}
                alt="Artisan coffee cup with roasted beans"
                className="h-auto w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]"
                priority
              />
            </div>
          </div>

        </div>
      </Container>

      <div className="pointer-events-none absolute -bottom-10 -left-6 z-20 w-32 sm:w-44 md:w-64 opacity-20">
        <Image
          src={coffeeBlast}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}