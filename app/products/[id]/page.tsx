'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AddToCartButton from '@/components/ui/AddToCartButton';
import BuyNowButton from '@/components/ui/BuyNowButton';
import type { Product } from '@/types';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      setProduct(data as Product);
      setLoading(false);
    }
    if (id) getProduct();
  }, [id]);

  const handleBuyNow = async () => {
    if (!product) return;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: [{
            name: product.name,
            price: product.price,
            image_url: product.image_url || product.image,
            quantity: 1
          }]
        }),
      });

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  if (loading) return null;

  if (!product) return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Product not found</h1>
          <button
            onClick={() => router.push('/products')}
            className="text-[var(--accent-secondary)] hover:underline"
          >
            Back to Products
          </button>
        </div>
      </main>
      <Footer />
    </>
  );

  const displayImage = product.image_url || product.image || '/images/headphone.png';

  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-12">
        <button
          onClick={() => router.back()}
          className="mb-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-[var(--bg-secondary)] rounded-2xl overflow-hidden p-8 flex items-center justify-center">
            <img src={displayImage} alt={product.name} className="rounded-xl w-full max-h-[500px] object-contain" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {product.category && (
              <span className="inline-block px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--accent-secondary)] text-xs font-bold tracking-wider rounded-full uppercase mb-4 w-max">
                {product.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-[var(--accent-secondary)] mb-6">
              ${Number(product.price).toFixed(2)}
            </p>

            {product.description && (
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <AddToCartButton product={product} />
              <BuyNowButton onClick={handleBuyNow} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
