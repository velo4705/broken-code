export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--glass-border)] pt-16 pb-8 mt-24 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[var(--accent-primary)] blur-[120px] opacity-10 rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold tracking-wider text-gradient mb-4 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[var(--accent-primary)]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a2.25 2.25 0 002.25-2.25v-.75a.75.75 0 00-.75-.75h-9a.75.75 0 00-.75.75v.75a2.25 2.25 0 002.25 2.25h3a.75.75 0 01.75.75V21m-4.5 0H21M4.5 4.5h15M4.5 4.5v15M4.5 4.5A2.25 2.25 0 002.25 6.75v10.5a2.25 2.25 0 002.25 2.25" />
              </svg>
              <span>E-STORE</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Experience the future of online shopping. Premium products, seamless design, and unparalleled user experience.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Featured</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[var(--glass-border)] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[var(--text-secondary)]">
            &copy; {new Date().getFullYear()} E-Store. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}