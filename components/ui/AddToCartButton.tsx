'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import type { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCart((state) => state.addToCart);

  const handleClick = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-full overflow-hidden group rounded-xl font-semibold py-3 px-6 transition-all duration-300 hover:shadow-lg active:scale-95 ${
        isAdded
          ? 'bg-green-600 text-white'
          : 'bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[var(--text-primary)]'
      }`}
    >
      <span className="relative z-10 flex items-center justify-center">
        {isAdded ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Added!
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:-rotate-12 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Add to Cart
          </>
        )}
      </span>
      {/* Hover Background Animation */}
      {!isAdded && (
        <div className="absolute inset-0 bg-[var(--text-primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      )}
    </button>
  );
}