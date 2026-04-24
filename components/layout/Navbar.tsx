'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchInput from '../ui/SearchInput';
import CartDrawer from '../cart/CartDrawer';
import QuickViewModal from '@/components/products/QuickViewModal';
import { useCart } from '@/lib/store';
import type { Product } from '@/types';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const getTotalItems = useCart((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  return (
    <>
      <nav className="fixed w-full top-0 z-[60] px-4 py-3 transition-all duration-300">
        <div className="container mx-auto">
          <div className="glass rounded-full px-6 py-3 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-wider text-gradient flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-[var(--accent-secondary)] drop-shadow-[0_0_10px_var(--accent-secondary)]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span>E-STORE</span>
            </Link>
            
            <div className="hidden md:flex flex-1 max-w-md mx-8">
               <SearchInput onQuickView={(product) => setQuickViewProduct(product)} />
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 font-medium text-[var(--text-secondary)]">
              <Link href="/products" className="hover:text-[var(--text-primary)] transition-colors relative group hidden sm:inline-block">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-secondary)] transition-all group-hover:w-full"></span>
              </Link>
              
              <button onClick={() => setIsCartOpen(true)} className="hover:text-[var(--text-primary)] transition-colors relative group flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 group-hover:-rotate-12 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[var(--accent-primary)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_var(--accent-primary)]">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link href="/login" className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 sm:px-5 py-2 rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 text-sm sm:text-base">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Quick View Modal from Search */}
      {quickViewProduct && (
        <QuickViewModal
          isOpen={true}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
