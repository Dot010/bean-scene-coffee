'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Container } from '../ui/container';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_NAV = {
  about: [
    { label: 'Menu', href: '#menu' },
    { label: 'Features', href: '#features' },
    { label: 'News & Blogs', href: '#news' },
    { label: 'Help & Supports', href: '#help' },
  ],
  company: [
    { label: 'How We Work', href: '#how-it-works' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  contact: [
    { label: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016' },
    { label: '+1 202-918-2132' },
    { label: 'beanscene@gmail.com' },
    { label: 'www.beanscene.com' },
  ],
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.footer-column',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
          onComplete: () => {
            gsap.set('.footer-column', { clearProps: 'all' });
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <footer
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#1E0E07] pt-20 pb-10 text-[#FFFBF0] border-t border-amber-950"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 border-b border-amber-900/40 pb-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="footer-column flex flex-col space-y-4 lg:col-span-2">
            <Link href="/" className="font-serif text-3xl font-bold tracking-wide text-[#F9C067] transition-opacity hover:opacity-90">
              Bean Scene
            </Link>
            <Text className="max-w-sm text-sm leading-relaxed text-amber-100/70">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
            </Text>
            <div className="flex items-center gap-3 pt-3">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9C067] text-[#1E0E07] shadow-md transition-all hover:scale-110 hover:bg-amber-400 active:scale-95"
                  aria-label={`Open ${social} in a new tab`}
                >
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column flex flex-col space-y-4">
            <Heading as="h3" className="text-lg font-bold text-[#F9C067]">
              About
            </Heading>
            <ul className="flex flex-col space-y-2.5 text-sm text-amber-100/70">
              {FOOTER_NAV.about.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[#F9C067]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column flex flex-col space-y-4">
            <Heading as="h3" className="text-lg font-bold text-[#F9C067]">
              Company
            </Heading>
            <ul className="flex flex-col space-y-2.5 text-sm text-amber-100/70">
              {FOOTER_NAV.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[#F9C067]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column flex flex-col space-y-4">
            <Heading as="h3" className="text-lg font-bold text-[#F9C067]">
              Contact Us
            </Heading>
            <ul className="flex flex-col space-y-3 text-sm text-amber-100/70">
              {FOOTER_NAV.contact.map((item, idx) => (
                <li key={idx} className="leading-snug">
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-column mt-8 flex flex-col items-center justify-between gap-4 text-xs text-amber-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Bean Scene. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#privacy" className="transition-colors hover:text-amber-100/80">
              Privacy Policy
            </Link>
            <Link href="#terms" className="transition-colors hover:text-amber-100/80">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}