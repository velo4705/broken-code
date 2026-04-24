'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
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
    // Attempt to find the product by matching ANY possible ID field
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

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-[var(--text-primary)] mb-4">Discover Amazing Products</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Shop the latest tech, fashion, and lifestyle products with secure checkout powered by Stripe.
          </p>
        </div>
        <ProductGrid products={products} onBuyNow={handleCheckout} />
      </main>
      <Footer />
    </div>
  )
}