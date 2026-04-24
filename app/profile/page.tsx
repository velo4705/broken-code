'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface UserProfile {
  email: string;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setUser({
        email: user.email || '',
        created_at: user.created_at || '',
      });

      // TODO: Fetch order history from your orders table
      // const { data: orders } = await supabase
      //   .from('orders')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .order('created_at', { ascending: false });
      // setOrderHistory(orders || []);

      setLoading(false);
    }

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Navbar />
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-2">
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--glass-border)] mb-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Account Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Email</label>
                  <p className="text-[var(--text-primary)] font-medium">{user.email}</p>
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Member Since</label>
                  <p className="text-[var(--text-primary)] font-medium">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--glass-border)]">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Order History</h2>

              {orderHistory.length === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)] opacity-50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-[var(--text-secondary)] text-lg">No orders yet</p>
                  <button
                    onClick={() => router.push('/products')}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-medium rounded-lg hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Order history items would go here */}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--glass-border)] sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl font-bold text-white">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-[var(--text-primary)] font-semibold">{user.email}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push('/track-order')}
                  className="w-full py-3 rounded-lg border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all duration-300 text-sm font-medium"
                >
                  Track Order
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-all duration-300 text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
