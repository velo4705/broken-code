'use client';

import { useEffect } from 'react';
import AddToCartButton from '@/components/ui/AddToCartButton';
import BuyNowButton from '@/components/ui/BuyNowButton';
import type { Product } from '@/types';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onBuyNow?: () => void;
}

export default function QuickViewModal({ isOpen, onClose, product, onBuyNow }: QuickViewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const displayImage = product.image_url || product.image || '/images/headphone.png';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-[var(--bg-secondary)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] animate-[scaleUp_0.4s_ease-out] flex flex-col md:flex-row">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[var(--accent-primary)] transition-colors backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-[var(--bg-tertiary)] relative min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--accent-glow)] to-transparent opacity-20"></div>
          <img
            src={displayImage}
            alt={product.name}
            className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="inline-block px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--accent-secondary)] text-xs font-bold tracking-wider rounded-full uppercase mb-4 w-max">
            New Arrival
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-2 tracking-tight">
            {product.name}
          </h2>
          <p className="text-2xl font-bold text-gradient mb-6">${Number(product.price).toFixed(2)}</p>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            {product.description || 'No description available.'}
          </p>

          {/* Actions */}
          <div className="space-y-4 mt-auto">
            <AddToCartButton product={product} />
            <button
              onClick={onBuyNow}
              className="w-full py-4 rounded-xl glass border-[var(--glass-border)] text-[var(--text-primary)] font-bold text-lg hover:bg-[var(--bg-tertiary)] transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
