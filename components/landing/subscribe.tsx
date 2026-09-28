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

import coffeeBeansOverlay from '../../public/images/Rectangle 14.png'; // Opcional: imagem de fundo

gsap.registerPlugin(ScrollTrigger);

export default function Subscribe() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animação de entrada com GSAP ao fazer scroll
  useGSAP(
    () => {
      gsap.fromTo(
        '.subscribe-card',
        { scale: 0.95, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
          onComplete: () => {
            gsap.set('.subscribe-card', { clearProps: 'all' });
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white py-16 md:py-24"
    >
      <Container>
        {/* Card Principal da Newsletter */}
        <div className="subscribe-card relative overflow-hidden rounded-3xl bg-[#24130D] px-6 py-12 text-center text-white shadow-2xl md:px-12 md:py-16">
          {/* Textura de Fundo Decorativa */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-15">
            <Image
              src={coffeeBeansOverlay}
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
            {/* Título */}
            <Heading as="h2" className="text-3xl font-bold text-[#FFF3E0] md:text-4xl">
              Subscribe to get the Latest News
            </Heading>

            {/* Subtítulo */}
            <Text variant="subtle" className="mt-3 text-sm text-[#E0C0A8] md:text-base">
              Don’t miss out on our latest news, updates, tips and special offers
            </Text>

            {/* Formulário Estilo Capsule (Input + Button) */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row sm:gap-0 sm:rounded-full sm:bg-[#FFFBF0] sm:p-1.5 sm:shadow-lg"
            >
              <input
                type="email"
                placeholder="Enter your mail"
                required
                className="w-full rounded-full bg-[#FFFBF0] px-6 py-3.5 text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-amber-500 sm:rounded-none sm:bg-transparent sm:focus:ring-0"
              />
              <Button
                variant="primary"
                type="submit"
                className="w-full whitespace-nowrap rounded-full bg-[#F9C067] px-8 py-3.5 text-sm font-semibold text-coffee-brown shadow-md transition-all hover:bg-amber-400 active:scale-95 sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}