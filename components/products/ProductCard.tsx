'use client';

import { useState } from 'react';
import BuyNowButton from '../ui/BuyNowButton';
import AddToCartButton from '../ui/AddToCartButton';
import QuickViewModal from './QuickViewModal';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onBuyNow: (priceId: string) => void;
}

export default function ProductCard({ product, onBuyNow }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Determine the correct image source
  const displayImage = product.image_url || product.image || '/images/headphone.png';

  // Determine the correct Price ID for Stripe
  const stripeId = product.stripe_price_id || product.price_id || product.id;

  return (
    <>
      <div className="group relative rounded-2xl overflow-hidden bg-transparent border-none transition-all duration-500 hover:-translate-y-2">
        {/* Image Container with Glow Effect */}
        <div className="relative h-80 w-full bg-[var(--bg-tertiary)] overflow-hidden rounded-2xl mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

          {/* Subtle Background Glow behind image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--accent-glow)] to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out relative z-10"
          />

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm z-20 gap-3">
            <button
              onClick={(e) => { e.preventDefault(); setIsQuickViewOpen(true); }}
              className="w-3/4 bg-white/10 border border-white/20 text-white backdrop-blur-md px-6 py-2.5 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95"
            >
              Quick View
            </button>

            {/* Buy Now Button */}
            <button
              onClick={() => onBuyNow(stripeId)}
              className="w-3/4 bg-[var(--accent-primary)] text-white px-6 py-2.5 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-[var(--accent-secondary)] hover:shadow-[0_0_15px_var(--accent-glow)] hover:scale-105 active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-2 text-center sm:text-left">
          <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors line-clamp-1 tracking-wide">
            {product.name}
          </h3>
          <p className="text-[var(--text-secondary)] font-medium mt-1">
            ${Number(product.price).toFixed(2)}
          </p>
          {/* Add to Cart Button */}
          <div className="mt-3">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          isOpen={isQuickViewOpen}
          product={product}
          onClose={() => setIsQuickViewOpen(false)}
          onBuyNow={() => {
            setIsQuickViewOpen(false);
            onBuyNow(stripeId);
          }}
        />
      )}
    </>
  );
}