'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  onBuyNow: (priceId: string) => void;
}

export default function ProductGrid({ products, onBuyNow }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  );
}