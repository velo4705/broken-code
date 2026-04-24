'use client' // Necessary for the button click and redirect logic

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 1. Fetch products on the client side for this demo
  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase.from('products').select('*')
      if (!error && data) setProducts(data)
      setLoading(false)
    }
    getProducts()
  }, [])

  // 2. The Backend "Handshake" Function
  const handleCheckout = async (product: any) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // We send a single item cart for this test
        body: JSON.stringify({
          cartItems: [{
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            quantity: 1
          }]
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url // Redirection to Stripe
      } else {
        alert("Backend Error: " + (data.error || "Unknown error"))
      }
    } catch (err) {
      console.error("Checkout failed", err)
    }
  }

  if (loading) return <div className="p-8 text-white">Loading Store...</div>

  return (
    <main className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Our Store (Backend Test Mode)</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-zinc-800 p-4 rounded-lg bg-zinc-900 shadow-xl">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-4 text-xl font-semibold">{product.name}</h2>
            <p className="text-zinc-400">${Number(product.price).toFixed(2)}</p>

            <button
              onClick={() => handleCheckout(product)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
            >
              Buy Now (Test Stripe)
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}