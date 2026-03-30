'use client';

import { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Capture the volunteer ref parameter
  const volunteerRef = searchParams.get('ref') || '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // nothing now (dropdown removed)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStartTest = () => {
    const refParam = volunteerRef
      ? `?ref=${encodeURIComponent(volunteerRef)}`
      : '';

    router.push(`/quiz${refParam}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-red-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-pink-200 rounded-full blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-red-200 rounded-full blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-44 h-44 bg-purple-200 rounded-full blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-yellow-200 rounded-full blur-xl opacity-20 animate-float"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 border border-pink-100">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-red-600">
                Welcome!
              </h1>
              <Sparkles className="w-6 h-6 text-red-500 animate-pulse" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 mb-8 max-w-2xl mx-auto">
            <p className="text-center text-gray-700 text-sm sm:text-base leading-relaxed">
              The <span className="font-bold text-pink-600">Happiness Index</span> helps you check in with how you&apos;re actually doing — <span className="font-semibold">emotionally</span>, <span className="font-semibold">mentally</span>, <span className="font-semibold">internally</span>. Answer honestly. No judgment. No labels. Just clarity.
            </p>


            <p className="text-center text-gray-600 text-sm sm:text-base leading-relaxed">
              This isn&apos;t a test to pass or fail. It&apos;s a pause you rarely take.
            </p>

            <p className="text-center text-pink-600 text-sm sm:text-base font-semibold">
              A few minutes today can bring clarity, awareness, and a happier you.
            </p>

            <p className="text-center text-gray-800 text-xs sm:text-sm font-bold">
              Small step, big insight. Let&apos;s begin.
            </p>
          </div>

          {/* Start Button */}
          <div className="mb-6">
            <button
              onClick={handleStartTest}
              className="w-full max-w-md mx-auto block px-4 py-3 bg-linear-to-r from-pink-500 via-pink-600 to-red-600 hover:from-pink-600 hover:via-red-500 hover:to-red-700 text-white text-base font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Start the Test</span>
                <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
            </button>
          </div>

          {/* Disclaimer */}
         

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-500 text-xs font-medium">
              It takes around 8–10 minutes to complete.
            </p>
          </div>

        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-red-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
