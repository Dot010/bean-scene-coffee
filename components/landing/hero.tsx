'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Button } from '../ui/buttons';
import { Container } from '../ui/container';
import { Text } from '../ui/text';

import HeroBackground from '../../public/images/hero.png';
import Coffee from '../../public/images/Coffee.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const [particles] = useState<Particle[]>([
    { id: 0, x: 0, y: 0, size: 3 },
    { id: 1, x: 13, y: 27, size: 4 },
    { id: 2, x: 26, y: 54, size: 5 },
    { id: 3, x: 39, y: 81, size: 3 },
    { id: 4, x: 52, y: 8, size: 4 },
    { id: 5, x: 65, y: 35, size: 5 },
    { id: 6, x: 78, y: 62, size: 3 },
    { id: 7, x: 91, y: 89, size: 4 },
  ]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-bg',
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
      );

      tl.fromTo(
        '.coffee-steam',
        { opacity: 0, y: 20 },
        { opacity: 0.3, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=1.0'
      );

      tl.fromTo(
        '.hero-subtitle-inner',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8 },
        '-=0.8'
      );

      tl.fromTo(
        '.hero-title-img',
        { y: 30, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.6)' },
        '-=0.6'
      );

      tl.fromTo(
        '.hero-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      tl.fromTo(
        '.hero-btn-wrapper',
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)' },
        '-=0.5'
      );

      gsap.to('.steam-puff-1', {
        y: -40,
        x: 15,
        opacity: 0,
        scale: 1.4,
        duration: 3.5,
        repeat: -1,
        ease: 'power1.out',
      });

      gsap.to('.steam-puff-2', {
        y: -50,
        x: -12,
        opacity: 0,
        scale: 1.6,
        duration: 4,
        delay: 1.2,
        repeat: -1,
        ease: 'power1.out',
      });

      gsap.to('.hero-bg', {
        yPercent: 15,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 768 || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    if (spotlightRef.current) {
      spotlightRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
    }

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: xPos * 20,
        y: yPos * 12,
        rotateY: xPos * 8,
        rotateX: -yPos * 8,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    gsap.to('.coffee-steam', {
      x: -xPos * 25,
      y: -yPos * 15,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power2.out',
      });
    }
  };

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleButtonMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen w-full items-center justify-center md:justify-start overflow-hidden bg-coffee-dark perspective-1000 px-4 sm:px-6 lg:px-8"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -top-40 -left-40 w-72 h-72 md:w-96 md:h-96 rounded-full bg-coffee-amber/10 blur-[90px] z-20 hidden md:block transition-transform duration-75 ease-out"
      />

      <div className="hero-bg absolute inset-0 z-0 h-full w-full">
        <Image
          src={HeroBackground}
          alt="Bean Scene Coffee Background"
          fill
          sizes="100vw"
          priority
          loading="eager"
          className="object-cover object-center scale-105 md:scale-100"
        />
        <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-coffee-dark/95 via-coffee-dark/75 md:via-coffee-dark/60 to-coffee-dark/40 md:to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((p, idx) => (
          <div
            key={p.id}
            id={`particle-${idx}`}
            className="absolute rounded-full bg-coffee-amber/25 blur-[0.5px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <div className="coffee-steam pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 md:left-1/3 z-10 w-72 h-72 opacity-25">
        <div className="steam-puff-1 absolute left-6 bottom-6 w-24 h-24 bg-coffee-amber/20 rounded-full blur-2xl" />
        <div className="steam-puff-2 absolute left-20 bottom-12 w-32 h-32 bg-coffee-cream/15 rounded-full blur-2xl" />
      </div>

      <Container className="relative z-30 w-full pt-32 pb-16 text-center md:text-left">
        <div className="max-w-2xl mx-auto md:mx-0 space-y-3 md:space-y-2">

          <div className="overflow-hidden">
            <div className="hero-subtitle-inner">
              <span className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.15em] sm:tracking-[0.2em] text-coffee-amber uppercase block mb-2">
                We’ve got your morning covered with
              </span>
            </div>
          </div>

          <div ref={titleRef} className="hero-title-img relative inline-block my-1 will-change-transform max-w-[85vw] sm:max-w-md md:max-w-full">
            <Image
              src={Coffee}
              alt="Coffee"
              className="h-auto w-auto max-w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] mx-auto md:mx-0"
              priority
            />
          </div>

          <div className="hero-text pt-1">
            <Text className="mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 text-sm sm:text-base leading-relaxed text-coffee-cream/80 font-light">
              It is best to start your day with a cup of coffee. Discover the most exquisite
              flavors and crafted roasts designed to elevate your energy and daily mood.
            </Text>
          </div>

          <div
            ref={buttonRef}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            onClick={handleButtonClick}
            className="hero-btn-wrapper inline-block pt-1 will-change-transform relative overflow-hidden rounded-full"
          >
            <Button
              href="#coffee-experience"
              variant="primary"
              className="relative z-10 bg-coffee-amber text-coffee-dark hover:bg-amber-500 font-semibold px-7 py-3 sm:px-8 sm:py-3.5 text-xs uppercase tracking-wider shadow-lg shadow-coffee-amber/20 transition-colors"
            >
              Order Now
            </Button>

            {ripples.map((r) => (
              <span
                key={r.id}
                className="absolute pointer-events-none rounded-full bg-white/40 animate-ping"
                style={{
                  left: r.x,
                  top: r.y,
                  width: '20px',
                  height: '20px',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}