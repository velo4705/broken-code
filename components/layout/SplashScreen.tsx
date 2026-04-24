'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after 1.5 seconds (quicker)
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // Completely remove from DOM after 2 seconds (allowing 0.5s for fade out animation)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing orb behind the logo */}
        <div className="absolute inset-0 bg-[var(--accent-primary)] blur-[60px] opacity-30 rounded-full animate-pulse w-32 h-32 m-auto"></div>
        
        {/* Logo Icon */}
        <div className="animate-float z-10 text-[var(--accent-primary)] mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a2.25 2.25 0 002.25-2.25v-.75a.75.75 0 00-.75-.75h-9a.75.75 0 00-.75.75v.75a2.25 2.25 0 002.25 2.25h3a.75.75 0 01.75.75V21m-4.5 0H21M4.5 4.5h15M4.5 4.5v15M4.5 4.5A2.25 2.25 0 002.25 6.75v10.5a2.25 2.25 0 002.25 2.25" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold tracking-widest text-gradient animate-slide-up">
          E-STORE
        </h1>
        <div className="mt-4 w-48 h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
          <div className="w-full h-full bg-[var(--accent-primary)] rounded-full animate-[progress_1.5s_ease-in-out]"></div>
        </div>
      </div>
      
      {/* Adding an inline style for the progress bar animation since it's specific to the splash screen */}
      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
