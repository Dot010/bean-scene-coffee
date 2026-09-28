'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Container } from '../ui/container';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';

import coffeeSplashRight from '../../public/images/coffee_blast_r.png';
import coffeeSplashDown from '../../public/images/coffeeblastd.png';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    id: 1,
    name: 'Jonny Thomas',
    role: 'Project Manager',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    avatarInitials: 'JT',
  },
  {
    id: 2,
    name: 'Sofia Oliveira',
    role: 'UX Designer',
    text: 'The Cappuccino is smooth and perfectly balanced. Bean Scene became my default place to work and meet friends. The atmosphere and attention to detail in every roast make it a truly unique coffee experience.',
    avatarInitials: 'SO',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animação de entrada inicial — Roda APENAS UMA VEZ no Scroll
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Entrada do cabeçalho
      tl.fromTo(
        '.testimonial-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Entrada do card principal
      tl.fromTo(
        '.testimonial-card',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set('.testimonial-header, .testimonial-card', {
              clearProps: 'all',
            });
          },
        },
        '-=0.4'
      );

      // Entrada dos salpicos de café (executada apenas 1 vez)
      gsap.fromTo(
        '.splash-left',
        { x: -80, opacity: 0 },
          {
              x: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.3,
              onComplete: () => {
                gsap.set('.splash-left', { clearProps: 'all'})
            }
         }
      );

      gsap.fromTo(
        '.splash-right',
        { x: 80, opacity: 0 },
          {
              x: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.3,
              onComplete: () => {
                gsap.set('.splash-right', {clearProps: 'all' })
            }
          }
      );
    },

    { scope: containerRef, dependencies: [] }
  );

  // Animação apenas no CONTEÚDO ao trocar de testemunho
  const handleSlideChange = (newIndex: number) => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        setCurrentIndex(newIndex);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      },
    });
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % REVIEWS.length;
    handleSlideChange(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + REVIEWS.length) % REVIEWS.length;
    handleSlideChange(prevIndex);
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white py-16 md:py-24"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Cabeçalho */}
        <div className="testimonial-header flex flex-col items-center space-y-2">
          <Heading
            as="h2"
            className="text-coffee-brown text-3xl font-bold md:text-4xl"
          >
            Our coffee perfection feedback
          </Heading>
          <Text variant="subtle" className="mt-2 max-w-xl text-gray-500">
            Our customers has amazing things to say about us
          </Text>
        </div>

        {/* ÁREA DO CARD E BOTÕES DE NAVEGAÇÃO */}
        <div className="relative mt-12 w-full max-w-3xl">
          {/* Salpico de Café - Canto Inferior Esquerdo */}
          <div className="splash-left pointer-events-none select-none absolute  -left-20 z-20 w-48 md:-left-80 md:w-64">
            <Image
              src={coffeeSplashDown}
              alt=""
              aria-hidden="true"
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Salpico de Café - Canto Superior Direito */}
          <div className="splash-right pointer-events-none select-none absolute -top-10 -right-20 z-20 w-48 md:-right-80 md:w-64">
            <Image
              src={coffeeSplashRight}
              alt=""
              aria-hidden="true"
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Card Principal */}
          <div className="testimonial-card relative z-10 rounded-xl border border-amber-200/50 bg-[#FFFBF0]/80 p-8 pt-6 shadow-sm backdrop-blur-sm md:p-12">
            {/* Aspas decorativas */}
            <div className="text-left font-serif text-6xl leading-none font-bold text-[#3e2723] opacity-80">
              “
            </div>

            {/* Conteúdo Dinâmico do Testemunho */}
            <div ref={contentRef} className="mt-2 flex flex-col items-center">
              <div className="itemx-center flex min-h-30 justify-center md:min-h-25">
                <Text className="max-w-2xl text-center text-sm leading-relaxed text-gray-600 md:text-base">
                  {currentReview.text}
                </Text>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <Heading
                  as="h3"
                  className="text-coffee-brown text-lg font-bold"
                >
                  {currentReview.name}
                </Heading>
                <Text variant="subtle" className="mt-1 text-xs text-gray-500">
                  {currentReview.role}
                </Text>

                {/* Avatar Centralizado */}
                <div className="mt-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-amber-900 text-base font-bold text-amber-100 shadow-md">
                  {currentReview.avatarInitials}
                </div>
              </div>
            </div>
          </div>

          {/* Botão Anterior (Esquerda) */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="text-coffee-brown absolute top-1/2 -left-5 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-[#F9C067] shadow-md transition-all hover:scale-105 hover:bg-amber-400 active:scale-95 md:-left-6 md:h-12 md:w-12"
          >
            &#8592;
          </button>

          {/* Botão Próximo (Direita) */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="text-coffee-brown absolute top-1/2 -right-5 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-[#F9C067] shadow-md transition-all hover:scale-105 hover:bg-amber-400 active:scale-95 md:-right-6 md:h-12 md:w-12"
          >
            &#8594;
          </button>
        </div>
      </Container>
    </section>
  );
}
