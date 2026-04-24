interface BuyNowProps {
  onClick: () => void; // Add an onClick prop
}

export default function BuyNowButton({ onClick }: BuyNowProps) {
  return (
    <button
      onClick={onClick} // 3. Wire the button to the function
      className="relative w-full overflow-hidden group rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold py-3 px-6 transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-primary)] active:scale-95 border-none"
    >
      <span className="relative z-10 flex items-center justify-center">
        Buy Now
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shine_1s]"></div>

      <style jsx>{`
        @keyframes shine { 100% { left: 125%; } }
      `}</style>
    </button>
  );
}