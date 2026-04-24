import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TrackOrderPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6 text-[var(--text-primary)] text-center">Track Order</h1>
          <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--glass-border)]">
            <p className="text-[var(--text-secondary)] text-center">Enter your order ID to track your shipment.</p>
            {/* Tracking form will go here */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}