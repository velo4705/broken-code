'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SuccessPage() {
  const router = useRouter();
  const clearCart = useCart((state) => state.clearCart);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    clearCart();

    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    if (id) {
      setSessionId(id);
    }
  }, [clearCart]);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-32">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Payment Successful! 🎉</h1>
            <p className="text-lg text-[var(--text-secondary)] mb-2">
              Thank you for your purchase. Your order is being processed.
            </p>
            {sessionId && (
              <p className="text-sm text-[var(--text-secondary)] opacity-60">
                Order ID: {sessionId}
              </p>
            )}
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--glass-border)] mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">What's Next?</h2>
            <ul className="text-left text-[var(--text-secondary)] space-y-2">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                </svg>
                You will receive an order confirmation email shortly
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                </svg>
                Track your order status in your profile
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                </svg>
                Expected delivery: 3-5 business days
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/products')}
              className="px-8 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold rounded-xl hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push('/profile')}
              className="px-8 py-3 border border-[var(--glass-border)] text-[var(--text-primary)] font-bold rounded-xl hover:bg-[var(--bg-tertiary)] transition-all duration-300"
            >
              View Order
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
