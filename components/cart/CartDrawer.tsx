'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  // Prevent scrolling when drawer is open
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

  if (!isOpen) return null;

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg-secondary)] border-l border-[var(--glass-border)] shadow-2xl z-[101] transform transition-transform duration-500 ease-in-out flex flex-col animate-[slideInRight_0.4s_ease-out]">

        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--glass-border)] flex justify-between items-center glass">
          <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-wide">Your Cart ({totalItems})</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-[var(--text-secondary)] py-12">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p className="text-lg">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-[var(--accent-secondary)] hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex space-x-4 group">
                <div className="w-20 h-20 bg-[var(--bg-primary)] rounded-xl overflow-hidden border border-[var(--glass-border)] flex-shrink-0">
                  <img src={item.image_url || '/images/placeholder.png'} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--text-primary)] truncate">{item.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">${item.price.toFixed(2)} each</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-[var(--accent-secondary)]">${(item.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center space-x-2 text-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-400 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[var(--glass-border)] glass mt-auto">
            <div className="flex justify-between items-center mb-2 text-[var(--text-secondary)]">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-[var(--text-primary)] font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link href="/checkout" onClick={onClose} className="w-full block text-center py-4 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300">
              Proceed to Checkout
            </Link>
            <Link href="/cart" onClick={onClose} className="w-full block text-center py-3 mt-3 rounded-xl border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors text-sm">
              View Full Cart
            </Link>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
