'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, getTotalItems, clearCart, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cart.map(item => ({
            name: item.name,
            price: item.price,
            image_url: item.image_url,
            quantity: item.quantity
          }))
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Clear cart before redirecting to Stripe
        clearCart();
        window.location.href = data.url;
      } else {
        alert('Checkout failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-32 text-center">
          <div className="text-[var(--text-secondary)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto mb-6 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Your cart is empty</h2>
            <p className="mb-8">Add some products to your cart to proceed with checkout.</p>
            <button
              onClick={() => router.push('/products')}
              className="px-8 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold rounded-xl hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300"
            >
              Browse Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--glass-border)]">
                <div className="w-20 h-20 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image_url || '/images/placeholder.png'} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{item.name}</h3>
                  <p className="text-[var(--accent-secondary)] font-bold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-[var(--text-primary)]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--glass-border)] sticky top-24">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Items ({getTotalItems()})</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="border-t border-[var(--glass-border)] pt-3 flex justify-between text-[var(--text-primary)] font-bold text-lg">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold text-lg hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Pay $${getTotalPrice().toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
