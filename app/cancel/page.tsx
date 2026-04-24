'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CancelPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-32">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Payment Cancelled</h1>
            <p className="text-lg text-[var(--text-secondary)] mb-2">
              No worries! Your cart is still waiting for you.
            </p>
            <p className="text-[var(--text-secondary)] opacity-60">
              You can try checking out again whenever you're ready.
            </p>
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--glass-border)] mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">What would you like to do?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/checkout')}
                className="px-8 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold rounded-xl hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/cart')}
                className="px-8 py-3 border border-[var(--glass-border)] text-[var(--text-secondary)] font-bold rounded-xl hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all duration-300"
              >
                View Cart
              </button>
            </div>
          </div>

          <button
            onClick={() => router.push('/products')}
            className="text-[var(--accent-secondary)] hover:underline"
          >
            Continue Shopping          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
