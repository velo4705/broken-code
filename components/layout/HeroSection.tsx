'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-tertiary)] to-black"></div>

      {/* Animated glow circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent-primary)] opacity-20 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-secondary)] opacity-15 blur-[120px] animate-pulse delay-1000"></div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
          Discover
          <span className="text-gradient"> Amazing </span>
          Products
        </h1>
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed">
          Shop the latest tech, fashion, and lifestyle products with secure checkout powered by Stripe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold text-lg rounded-xl hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 border-2 border-[var(--glass-border)] text-[var(--text-primary)] font-bold text-lg rounded-xl hover:bg-[var(--bg-tertiary)] transition-all duration-300"
          >
            Browse Categories
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[var(--text-secondary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </section>
  );
}
