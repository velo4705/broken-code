'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';

export default function CartPage() {
  const router = useRouter();
  const { cart, getTotalItems, getTotalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-32 text-center">
          <div className="text-[var(--text-secondary)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto mb-6 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Your cart is empty</h2>
            <p className="mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
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
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Shopping Cart ({getTotalItems()} items)
          </h1>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
              }
            }}
            className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--glass-border)]">
                <div className="w-24 h-24 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image_url || '/images/placeholder.png'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--text-primary)] text-lg truncate">{item.name}</h3>
                  <p className="text-[var(--accent-secondary)] font-bold text-lg mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-[var(--text-primary)] font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--glass-border)] sticky top-24">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Shipping</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Estimated Tax</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-[var(--glass-border)] pt-4 flex justify-between text-[var(--text-primary)] font-bold text-xl">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold text-lg hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300 transform active:scale-95"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => router.push('/products')}
                className="w-full mt-3 py-3 rounded-xl border border-[var(--glass-border)] text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
