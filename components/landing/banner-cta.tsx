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
  const cupWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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

      tl.from('.cta-animate-item', {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power4.out',
      });

      tl.from(
        cupWrapperRef.current,
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

      gsap.to(cupWrapperRef.current, {
        y: -12,
        rotation: -1,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });

      let lastParticleTime = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          return;
        }

        const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
        const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(cupWrapperRef.current, {
          rotateY: xNorm * 35,
          rotateX: -yNorm * 35,
          x: xNorm * 30,
          y: yNorm * 30,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000,
        });

        gsap.to('.cta-spotlight', {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          duration: 0.2,
          ease: 'power2.out',
        });

        const now = Date.now();
        if (now - lastParticleTime > 120) {
          lastParticleTime = now;
          createParticle(e.clientX - rect.left, e.clientY - rect.top, container);
        }
      };

      const createParticle = (x: number, y: number, parent: HTMLElement) => {
        const particle = document.createElement('div');
        particle.className = 'absolute pointer-events-none w-3 h-3 bg-coffee-amber/40 rounded-full blur-[1px] z-20';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        parent.appendChild(particle);

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 60,
          y: -40 - Math.random() * 40,
          scale: Math.random() * 1.5 + 0.5,
          opacity: 0,
          duration: 0.8,
          ease: 'power1.out',
          onComplete: () => particle.remove(),
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      const btn = buttonRef.current;
      const handleButtonMouseMove = (e: MouseEvent) => {
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const hx = rect.left + rect.width / 2;
        const hy = rect.top + rect.height / 2;
        const distanceX = (e.clientX - hx) * 0.35;
        const distanceY = (e.clientY - hy) * 0.35;

        gsap.to(btn, {
          x: distanceX,
          y: distanceY,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleButtonMouseLeave = () => {
        if (!btn) return;
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      };

      btn?.addEventListener('mousemove', handleButtonMouseMove);
      btn?.addEventListener('mouseleave', handleButtonMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        btn?.removeEventListener('mousemove', handleButtonMouseMove);
        btn?.removeEventListener('mouseleave', handleButtonMouseLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-coffee-dark py-20 text-coffee-cream md:py-28"
    >
      <div className="cta-spotlight pointer-events-none absolute -inset-20 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coffee-amber/15 blur-[120px]" />

      <div className="cta-bg absolute inset-0 -top-12 -bottom-12 z-0">
        <Image
          src={bgCoffeeCup}
          alt="Coffee background"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-r from-coffee-dark via-coffee-dark/85 to-coffee-dark/40" />
      </div>

      <div className="pointer-events-none absolute -bottom-10 right-0 z-0 w-64 opacity-40 md:w-96">
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
              className="text-3xl font-bold text-coffee-cream md:text-4xl lg:text-5xl leading-tight"
            >
              Get a chance to have an <span className="text-coffee-amber italic">Amazing morning</span>
            </Heading>
          </div>

          <div className="cta-animate-item">
            <Text className="mt-4 text-coffee-cream/75 text-base md:text-lg leading-relaxed font-light">
              We are giving you a one-time opportunity to experience a better life with coffee.
            </Text>
          </div>

          <div className="cta-animate-item mt-8 inline-block" ref={buttonRef}>
            <Button variant="primary" className="shadow-lg transition-transform hover:scale-105">
              Order Now
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center py-6">
          <div 
            ref={cupWrapperRef}
            className="relative h-72 w-56 sm:h-80 sm:w-64 md:h-105 md:w-75 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Image
              src={paperCup}
              alt="Coffee cup"
              fill
              sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 300px"
              className="object-contain pointer-events-none"
              priority
              loading="eager"
            />
          </div>
        </div>

      </Container>
    </section>
  );
} 