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
  {
    id: 3,
    name: 'Carlos Mendez',
    role: 'Software Engineer',
    text: 'Absolute perfection! The rich aroma and exceptional quality of their beans give me the exact energy boost I need every single morning before coding.',
    avatarInitials: 'CM',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.testimonial-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

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

      gsap.fromTo(
        '.splash-left',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.3,
          onComplete: () => {
            gsap.set('.splash-left', { clearProps: 'all' });
          },
        }
      );

      gsap.fromTo(
        '.splash-right',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.3,
          onComplete: () => {
            gsap.set('.splash-right', { clearProps: 'all' });
          },
        }
      );

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xNorm = clientX / window.innerWidth - 0.5;
        const yNorm = clientY / window.innerHeight - 0.5;

        gsap.to('.splash-left', {
          x: xNorm * 25,
          y: yNorm * 20,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.to('.splash-right', {
          x: -xNorm * 25,
          y: -yNorm * 20,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    },
    { scope: containerRef, dependencies: [] }
  );

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white py-16 md:py-24"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="testimonial-header flex flex-col items-center space-y-2">
          <Heading
            as="h2"
            className="text-coffee-brown text-3xl font-bold md:text-4xl"
          >
            Our coffee perfection feedback
          </Heading>
          <Text variant="subtle" className="mt-2 max-w-xl text-gray-500">
            Our customers have amazing things to say about us
          </Text>
        </div>

        <div className="relative mt-12 w-full max-w-3xl">
          <div className="splash-left pointer-events-none select-none absolute -left-20 z-20 w-48 md:-left-80 md:w-64">
            <Image
              src={coffeeSplashDown}
              alt=""
              aria-hidden="true"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="splash-right pointer-events-none select-none absolute -top-10 -right-20 z-20 w-48 md:-right-80 md:w-64">
            <Image
              src={coffeeSplashRight}
              alt=""
              aria-hidden="true"
              className="h-auto w-full object-contain"
            />
          </div>

          <div
            className="testimonial-card relative z-10 rounded-xl border border-amber-200/50 bg-[#FFFBF0]/80 p-8 pt-6 shadow-sm backdrop-blur-sm md:p-12 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="text-left font-serif text-6xl leading-none font-bold text-[#3e2723] opacity-80">
              “
            </div>

            <div ref={contentRef} className="mt-2 flex flex-col items-center">
              <div className="flex min-h-30 items-center justify-center md:min-h-25">
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

                <div className="mt-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-amber-900 text-base font-bold text-amber-100 shadow-md">
                  {currentReview.avatarInitials}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-8 bg-amber-800'
                      : 'w-2.5 bg-amber-900/20 hover:bg-amber-900/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="text-coffee-brown absolute top-1/2 -left-5 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-[#F9C067] shadow-md transition-all hover:scale-105 hover:bg-amber-400 active:scale-95 md:-left-6 md:h-12 md:w-12"
          >
            &#8592;
          </button>

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