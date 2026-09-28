'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Experience', href: '#coffee-experience' },
  { name: 'About Us', href: '#about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 right-0 left-0 z-50 bg-transparent py-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-3 relative z-50">
          <div className="relative h-10 w-32 sm:h-12 sm:w-40">
            <Image
              src="/images/beanscene.png"
              alt="Bean Scene Logo"
              fill
              sizes="160px"
              className="object-contain"
              priority
              loading="eager"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 font-serif text-sm text-coffee-cream md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-coffee-amber"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" href="#subscribe" className="text-coffee-cream hover:text-coffee-amber">
            Sign In
          </Button>
          <Button
            variant="primary"
            href="#coffee-experience"
            className="bg-coffee-amber text-coffee-dark hover:bg-amber-500 font-semibold text-xs uppercase tracking-wider"
          >
            Sign Up
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-0.5 bg-coffee-cream transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-coffee-cream transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-coffee-cream transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>

      </div>

      <div
        className={`fixed inset-0 bg-coffee-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center space-y-6 font-serif text-xl text-coffee-cream">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-coffee-amber transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center space-y-4 pt-4 w-48">
          <Button
            variant="ghost"
            href="#subscribe"
            onClick={() => setMobileMenuOpen(false)}
            className="text-coffee-cream w-full text-center"
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            href="#coffee-experience"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-coffee-amber text-coffee-dark hover:bg-amber-500 font-semibold text-xs uppercase tracking-wider w-full text-center"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}