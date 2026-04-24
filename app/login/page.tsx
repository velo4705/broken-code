import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6 text-[var(--text-primary)] text-center">Login / Register</h1>
          <AuthForm />
        </div>
      </main>
      <Footer />
    </>
  );
}