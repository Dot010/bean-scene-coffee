'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Button } from '../ui/buttons';
import { Container } from '../ui/container';
import { Text } from '../ui/text';

import HeroBackground from '../../public/images/hero.png';
import Coffee from '../../public/images/Coffee.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // 1. Revelação da Imagem de Fundo (Efeito Slow Zoom / Scale In)
      tl.fromTo(
        '.hero-bg',
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
      );

      // 2. Animação da legenda inicial
      tl.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.9'
      );

      // 3. Imagem do Título "Coffee" com efeito elástico / pop-in
      tl.fromTo(
        '.hero-title-img',
        { y: 40, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.6)',
        },
        '-=0.6'
      );

      // 4. Parágrafo descritivo
      tl.fromTo(
        '.hero-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      // 5. Botão "Order Now" com impulso elástico no final
      tl.fromTo(
        '.hero-btn',
        { y: 25, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.8)',
          onComplete: () => {
            gsap.set('.hero-subtitle, .hero-title-img, .hero-text, .hero-btn', {
              clearProps: 'transform,opacity',
            });
          },
        },
        '-=0.5'
      );

      // 6. Efeito Parallax na imagem de fundo ao fazer scroll na página
      gsap.to('.hero-bg', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Wrapper da Imagem de Fundo (Necessário para a animação .hero-bg e Parallax) */}
      <div className="hero-bg absolute inset-0 z-0 h-full w-full">
        <Image
          src={HeroBackground}
          alt="Bean Scene Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay escuro para garantir legibilidade dos textos */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10" />
      </div>

      <Container className="relative z-10 w-full pt-40 pb-16">
        <div className="max-w-2xl">
          {/* Subtítulo */}
          <div className="hero-subtitle">
            <Text size="lg" className="mb-6 block font-extralight text-amber-100/90">
              We’ve got your morning covered with
            </Text>
          </div>

          {/* Imagem do Título "Coffee" */}
          <div className="hero-title-img mb-6">
            <Image
              src={Coffee}
              alt="Coffee"
              className="h-auto w-auto max-w-full drop-shadow-lg"
              priority
            />
          </div>

          {/* Texto Descritivo */}
          <div className="hero-text">
            <Text className="mb-8 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
              It is best to start your day with a cup of coffee. Discover the best
              flavours coffee you will ever have. We provide the best for our
              customers.
            </Text>
          </div>

          {/* Botão de Ação */}
          <div className="hero-btn">
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