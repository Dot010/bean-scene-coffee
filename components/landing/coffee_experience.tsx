'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export interface CoffeeProduct {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  roastLevel: 'Light Roast' | 'Medium Roast' | 'Dark Roast';
  roastHex: string;
  acidity: number;
  body: number;
  sweetness: number;
  notes: string[];
  description: string;
}

export const MENU_PRODUCTS: CoffeeProduct[] = [
  {
    id: 'prod-01',
    name: 'Ritual Espresso 9g',
    subtitle: 'Ethiopia Microlot | Short Extraction',
    price: '€4.80',
    image: '/images/expresso.png',
    roastLevel: 'Light Roast',
    roastHex: '#D4A373',
    acidity: 88,
    body: 45,
    sweetness: 80,
    notes: ['Orange Blossom', 'Bergamot', 'Wild Honey'],
    description: 'Clean and aromatic shot with a crisp citrus finish and elegant sweetness.',
  },
  {
    id: 'prod-02',
    name: 'Velvet Flat White',
    subtitle: 'Huila + Microfoam Milk',
    price: '€5.40',
    image: '/images/capuccino.png',
    roastLevel: 'Medium Roast',
    roastHex: '#A47148',
    acidity: 50,
    body: 75,
    sweetness: 90,
    notes: ['Toasted Hazelnut', 'Milk Chocolate', 'Light Caramel'],
    description: 'Silky texture with a creamy body and a long-lasting sweet finish.',
  },
  {
    id: 'prod-03',
    name: 'Cold Brew Reserve',
    subtitle: 'Guatemala | 18h Maceration',
    price: '€6.20',
    image: '/images/macchiatto.png',
    roastLevel: 'Medium Roast',
    roastHex: '#7B4A2C',
    acidity: 35,
    body: 90,
    sweetness: 85,
    notes: ['Cacao Nibs', 'Brown Sugar', 'Dark Caramel'],
    description: 'Intense cold brew infusion, low acidity, and a smooth, velvety mouthfeel.',
  },
  {
    id: 'prod-04',
    name: 'Atelier V60',
    subtitle: 'Kenya AA | House Recipe',
    price: '€5.90',
    image: '/images/chai_latte.png',
    roastLevel: 'Dark Roast',
    roastHex: '#2A1810',
    acidity: 20,
    body: 95,
    sweetness: 60,
    notes: ['85% Cacao', 'Warm Spices', 'Fine Wood'],
    description: 'Hand-poured filter coffee with a bold body and rich, deep finish.',
  },
];

export default function InteractiveCoffeeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct>(MENU_PRODUCTS[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    const handleResize = () => setupCanvasSize();
    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const beans = Array.from({ length: 30 }, () => {
      const z = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: z * 14 + 6,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.25 - 0.1,
        opacity: z * 0.6 + 0.2,
      };
    });

    const smokeParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 100,
      radius: Math.random() * 70 + 30,
      vy: -Math.random() * 0.5 - 0.2,
      vx: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.12 + 0.03,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      smokeParticles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -100) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(242, 235, 217, ${p.alpha})`);
        gradient.addColorStop(1, 'rgba(242, 235, 217, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      beans.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.rotation += b.rotSpeed;

        if (b.y < -30) {
          b.y = height + 30;
          b.x = Math.random() * width;
        }

        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          b.x -= (dx / dist) * force * 2.5;
          b.y -= (dy / dist) * force * 2.5;
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);
        ctx.globalAlpha = b.opacity;

        ctx.beginPath();
        ctx.ellipse(0, 0, b.size, b.size * 0.65, 0, 0, Math.PI * 2);
        ctx.fillStyle = selectedProduct.roastHex;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-b.size * 0.7, 0);
        ctx.quadraticCurveTo(0, b.size * 0.2, b.size * 0.7, 0);
        ctx.strokeStyle = '#0A0908';
        ctx.lineWidth = b.size * 0.15;
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedProduct]);

  useGSAP(
    () => {
      gsap.to('.bar-acidity', { width: `${selectedProduct.acidity}%`, duration: 0.7, ease: 'power2.out' });
      gsap.to('.bar-body', { width: `${selectedProduct.body}%`, duration: 0.7, ease: 'power2.out' });
      gsap.to('.bar-sweetness', { width: `${selectedProduct.sweetness}%`, duration: 0.7, ease: 'power2.out' });

      gsap.fromTo(
        '.product-preview-img',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }
      );
    },
    { dependencies: [selectedProduct], scope: containerRef }
  );

  const scrollToMenuProduct = (productId: string) => {
    const targetElement = document.getElementById(productId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      gsap.fromTo(
        targetElement,
        { outline: '2px solid var(--coffee-amber, #C9A270)', outlineOffset: '8px' },
        { outline: '0px solid transparent', outlineOffset: '0px', duration: 1.5 }
      );
    }
  };

  return (
    <section 
      id="coffee-experience"
      ref={containerRef} 
      className="relative min-h-screen bg-coffee-dark text-coffee-cream py-20 px-6 md:px-16 overflow-hidden"
    >
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 w-full h-full" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-[11px] font-mono tracking-[0.28em] text-coffee-amber uppercase">
            PRODUCT EXPERIENCE
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight leading-[0.95]">
            Your <span className="italic text-coffee-amber">Ideal Coffee</span>,
            <br className="hidden sm:block" />
            in Real Time
          </h2>
          <p className="text-sm text-coffee-cream/65 max-w-2xl mx-auto font-light leading-relaxed">
            Browse through roast profiles, compare mouthfeel, and choose the perfect beverage for your moment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-coffee-dark/85 border border-coffee-amber/20 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-[0_20px_70px_rgba(0,0,0,0.5)]">

          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-mono text-coffee-cream/40 uppercase tracking-[0.2em] block mb-2">
              CHOOSE PROFILE
            </span>

            {MENU_PRODUCTS.map((prod) => {
              const isSelected = selectedProduct.id === prod.id;
              return (
                <button
                  key={prod.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedProduct(prod)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-coffee-amber bg-linear-to-r from-coffee-amber/20 to-transparent text-coffee-cream'
                      : 'border-coffee-cream/10 bg-black/20 text-coffee-cream/60 hover:border-coffee-cream/30'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-coffee-amber block uppercase tracking-wider">{prod.roastLevel}</span>
                    <h4 className="text-base font-serif mt-0.5 truncate">{prod.name}</h4>
                    <p className="text-[11px] text-coffee-cream/55 mt-1 truncate">{prod.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-mono text-coffee-amber">{prod.price}</span>
                    <span className={`text-[10px] font-mono mt-2 uppercase tracking-wide ${isSelected ? 'text-coffee-cream' : 'text-coffee-cream/45'}`}>
                      {isSelected ? 'Selected' : 'Select'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-coffee-cream/10 pt-8 lg:pt-0 lg:pl-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-linear-to-b from-[#1E1A17] to-[#14110F] rounded-3xl border border-coffee-cream/10 flex items-center justify-center p-4 shadow-[0_14px_32px_rgba(0,0,0,0.45)]">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={160}
                  height={160}
                  priority
                  style={{ width: 'auto', height: 'auto' }}
                  className="product-preview-img object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] max-h-40"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <button
                  type="button"
                  aria-label="Scroll to selected product in menu"
                  onClick={() => scrollToMenuProduct(selectedProduct.id)}
                  className="w-full text-xs font-mono tracking-[0.14em] uppercase py-3 px-4 rounded-xl bg-coffee-amber text-coffee-dark font-bold hover:bg-amber-500 transition-colors shadow-lg"
                >
                  View Item on Menu
                </button>
                <button
                  type="button"
                  aria-label="Reset product selection"
                  onClick={() => setSelectedProduct(MENU_PRODUCTS[0])}
                  className="w-full text-xs font-mono tracking-[0.14em] uppercase py-3 px-4 rounded-xl border border-coffee-cream/20 text-coffee-cream/85 hover:border-coffee-amber hover:text-coffee-cream transition-colors"
                >
                  Reset Selection
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-coffee-amber uppercase tracking-[0.14em]">
                  {selectedProduct.subtitle}
                </span>
                <h3 className="text-3xl font-serif text-coffee-cream mt-1 leading-tight">{selectedProduct.name}</h3>
                <p className="text-sm text-coffee-cream/65 font-light mt-3 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="space-y-3 font-mono text-[11px]">
                <div>
                  <div className="flex justify-between text-coffee-cream/70 mb-1">
                    <span>ACIDITY</span>
                    <span>{selectedProduct.acidity}%</span>
                  </div>
                  <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                    <div className="bar-acidity h-full bg-linear-to-r from-coffee-amber to-amber-300 w-0" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-coffee-cream/70 mb-1">
                    <span>BODY / TEXTURE</span>
                    <span>{selectedProduct.body}%</span>
                  </div>
                  <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                    <div className="bar-body h-full bg-linear-to-r from-coffee-amber to-amber-300 w-0" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-coffee-cream/70 mb-1">
                    <span>NATURAL SWEETNESS</span>
                    <span>{selectedProduct.sweetness}%</span>
                  </div>
                  <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                    <div className="bar-sweetness h-full bg-linear-to-r from-coffee-amber to-amber-300 w-0" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-coffee-cream/40 uppercase tracking-[0.18em] block mb-2">
                  FLAVOR PROFILE
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.notes.map((note) => (
                    <span
                      key={note}
                      className="text-[10px] font-mono bg-coffee-cream/5 border border-coffee-cream/10 px-2.5 py-1 rounded-md text-coffee-cream/80"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-coffee-cream/10">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[11px] font-mono tracking-[0.2em] text-coffee-amber uppercase">
              FEATURED PRODUCTS
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif mt-1">Select and Build Your Order</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENU_PRODUCTS.map((item) => {
              const isSelected = selectedProduct.id === item.id;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  onClick={() => setSelectedProduct(item)}
                  className={`cursor-pointer rounded-2xl border p-6 bg-linear-to-b from-[#171411] to-[#12100E] transition-all duration-300 hover:border-coffee-amber flex flex-col justify-between ${
                    isSelected ? 'border-coffee-amber ring-1 ring-coffee-amber/50 -translate-y-0.5' : 'border-coffee-cream/10'
                  }`}
                >
                  <div>
                    <div className="relative h-40 w-full mb-4 bg-black/30 rounded-xl p-2">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={320}
                        height={160}
                        loading="lazy"
                        className="h-full w-full object-contain p-2" 
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono text-coffee-amber uppercase tracking-wider">{item.roastLevel}</span>
                      <span className="text-sm font-mono text-coffee-amber font-bold">{item.price}</span>
                    </div>
                    <h4 className="text-xl font-serif mt-2 text-coffee-cream leading-tight">{item.name}</h4>
                    <p className="text-xs text-coffee-cream/55 font-light mt-1">{item.subtitle}</p>
                    <p className="text-xs text-coffee-cream/50 font-light mt-3 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="mt-6 border-t border-coffee-cream/10 pt-4">
                    <span className="inline-flex w-full justify-center text-[10px] font-mono text-coffee-dark bg-coffee-amber rounded-md py-2 uppercase tracking-[0.16em] font-semibold">
                      {isSelected ? 'Active Product' : 'Select Product'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}