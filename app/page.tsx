'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/layout/HeroSection'
import type { Product } from '@/types'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase.from('products').select('*')
      if (!error && data) setProducts(data as Product[])
      setLoading(false)
    }
    getProducts()
  }, [])

  const handleCheckout = async (priceId: string) => {
    const product = products.find(p =>
      p.stripe_price_id === priceId ||
      p.price_id === priceId ||
      p.id === priceId
    );

    if (!product) {
      alert(`Product Not Found. Looking for: ${priceId}`);
      return;
    }

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
      })

      const data = await response.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error("Checkout failed", err)
    }
  }

  if (loading) return null;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="container mx-auto px-6 py-12">
          <ProductGrid products={products} onBuyNow={handleCheckout} />
        </div>
      </main>
      <Footer />
    </>
  )
}