'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CategoryPills from '@/components/products/CategoryPills'
import type { Product } from '@/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase.from('products').select('*')
      if (!error && data) {
        setProducts(data as Product[])
        setFilteredProducts(data as Product[])
      }
      setLoading(false)
    }
    getProducts()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory))
    }
  }, [selectedCategory, products])

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

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter((c): c is string => Boolean(c))))]

  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">All Products</h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)]">
            Browse our complete collection of premium products.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="mb-8">
            <CategoryPills
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} onBuyNow={handleCheckout} />
        ) : (
          <div className="text-center py-16 text-[var(--text-secondary)]">
            <p className="text-xl">No products found in this category.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
