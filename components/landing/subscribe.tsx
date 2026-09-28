'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Container } from '../ui/container';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Button } from '../ui/buttons';

import coffeeBeansOverlay from '../../public/images/Rectangle 14.png';

gsap.registerPlugin(ScrollTrigger);

export default function Subscribe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        cardRef.current,
        { scale: 0.96, opacity: 0, y: 35 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(cardRef.current, { clearProps: 'all' });
          },
        }
      );

      const handleMouseMove = (e: MouseEvent) => {
        const card = cardRef.current;
        const glow = glowRef.current;
        if (!card || !glow) return;

        const rect = card.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          gsap.to(glow, { opacity: 0, duration: 0.4 });
          return;
        }

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(glow, {
          x: x - 150,
          y: y - 150,
          opacity: 0.15,
          duration: 0.2,
          ease: 'power2.out',
        });

        const xNorm = x / rect.width - 0.5;
        const yNorm = y / rect.height - 0.5;

        gsap.to('.subscribe-bg', {
          x: -xNorm * 20,
          y: -yNorm * 20,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      const btn = buttonRef.current;
      const handleButtonMouseMove = (e: MouseEvent) => {
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const hx = rect.left + rect.width / 2;
        const hy = rect.top + rect.height / 2;
        const distanceX = (e.clientX - hx) * 0.22;
        const distanceY = (e.clientY - hy) * 0.22;

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

  const handleInputFocus = () => {
    gsap.to(formWrapperRef.current, {
      scale: 1.015,
      boxShadow: '0 12px 30px -8px rgba(249, 192, 103, 0.35)',
      borderColor: 'rgba(249, 192, 103, 0.8)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleInputBlur = () => {
    gsap.to(formWrapperRef.current, {
      scale: 1,
      boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.15)',
      borderColor: 'rgba(249, 192, 103, 0.2)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const tl = gsap.timeline();

    tl.to(formWrapperRef.current, {
      scale: 0.95,
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsSubscribed(true);
      },
    }).fromTo(
      successRef.current,
      { scale: 0.9, opacity: 0, y: 15 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.7)' }
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white py-16 md:py-24"
    >
      <Container>
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl bg-[#24130D] px-6 py-14 text-center text-white shadow-2xl md:px-16 md:py-20 border border-amber-900/40"
        >
          <div
            ref={glowRef}
            className="pointer-events-none absolute -left-32 -top-32 h-75 w-75 rounded-full bg-[#F9C067] opacity-0 blur-3xl transition-opacity duration-300 z-0"
          />

          <div className="subscribe-bg pointer-events-none absolute -inset-6 z-0 opacity-15">
            <Image
              src={coffeeBeansOverlay}
              alt=""
              width={1200}
              height={800}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover scale-105"
            />
          </div>

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
            <Heading as="h2" className="text-3xl font-bold tracking-tight text-[#FFF3E0] md:text-4xl lg:text-5xl">
              Subscribe to get the Latest News
            </Heading>

            <Text variant="subtle" className="mt-3 text-sm text-[#E0C0A8] md:text-base max-w-lg">
              Don’t miss out on our latest news, updates, tips and special offers crafted just for coffee lovers.
            </Text>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="mt-10 w-full max-w-xl">
                <div
                  ref={formWrapperRef}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-[#FFFBF0] p-1.5 shadow-xl border border-amber-200/40 transition-colors sm:flex-row sm:gap-0 sm:rounded-full"
                >
                  <label htmlFor="subscribe-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="subscribe-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Enter your mail"
                    required
                    className="w-full rounded-full bg-transparent px-6 py-4 text-gray-950 placeholder-gray-400 outline-none transition-all sm:rounded-none text-sm md:text-base font-medium"
                  />
                  <div ref={buttonRef} className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-full whitespace-nowrap rounded-full bg-[#F9C067] px-8 py-3.5 text-sm font-bold text-[#24130D] shadow-md transition-all hover:bg-amber-400 active:scale-95"
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div
                ref={successRef}
                className="mt-10 flex w-full max-w-xl items-center justify-center gap-3 rounded-2xl bg-[#FFFBF0]/10 px-6 py-5 border border-amber-500/30 backdrop-blur-md sm:rounded-full shadow-inner"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F9C067] text-[#24130D] text-sm font-bold">
                  ✓
                </span>
                <Text className="text-sm font-medium text-[#FFF3E0] md:text-base">
                  Thank you! You are now subscribed to our exclusive updates.
                </Text>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}