'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'zh', name: 'Mandarin Chinese' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Standard Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'id', name: 'Indonesian' },
  { code: 'la', name: 'Latin' },
];

export default function Page() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const handleStartTest = () => {
    const routes: Record<string, string> = {
      en: '/quiz',
      hi: '/quiz/hindi',
      mr: '/quiz/marathi',
      ur: '/quiz/urdu',
      ta: '/quiz/tamil',
      es: '/quiz/spanish',
      fr: '/quiz/french',
      zh: '/quiz/chinese',
      de: '/quiz/german',
      ja: '/quiz/japanese',
      ar: '/quiz/arabic',
      pt: '/quiz/portuguese',
      ru: '/quiz/russian',
      id: '/quiz/indonesian',
      la: '/quiz/latin',
    };

    const route = routes[selectedLanguage.code] || '/quiz';
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center p-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-44 h-44 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 backdrop-blur-sm bg-opacity-95">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
              Welcome to Happiness Index
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Check in with your emotional well-being
            </p>
          </div>

          {/* Description - Condensed */}
          <div className="space-y-3 text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
            <p className="text-center">
              This <span className="font-semibold text-pink-600">Happiness Index</span> helps you understand your emotional state.
            </p>
            <p className="text-center">
              <span className="font-semibold">No right or wrong answers</span>, only your honest feelings matter.
            </p>
            <p className="text-center">
              Available in <span className="font-semibold text-red-600">15 languages</span>. Choose the one you&apos;re most comfortable with.
            </p>
          </div>

          {/* Language Selection */}
          <div className="mb-8">
            <label className="text-xl sm:text-2xl font-semibold text-gray-800 block text-center mb-4">
              Choose Your Language
            </label>
            
            <div ref={dropdownRef} className="relative w-full max-w-lg mx-auto">
              {/* Dropdown Menu - Appears Above with exciting animations */}
              <div
                className={`absolute bottom-full left-0 right-0 mb-3 bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ease-out border-2 border-pink-200 ${
                  isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
                style={{ maxHeight: isOpen ? '360px' : '0' }}
              >
                <div className="overflow-y-auto max-h-[360px] custom-scrollbar p-2">
                  {languages.map((language, index) => (
                    <button
                      key={language.code}
                      onClick={() => handleSelect(language)}
                      className={`w-full px-6 py-4 text-left transition-all duration-300 rounded-2xl mb-2 transform hover:scale-105 hover:shadow-md ${
                        selectedLanguage.code === language.code 
                          ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg scale-105' 
                          : 'hover:bg-gradient-to-r hover:from-pink-100 hover:to-red-100'
                      }`}
                      style={{
                        animationDelay: `${index * 40}ms`,
                        animation: isOpen ? 'slideInScale 0.4s ease-out forwards' : 'none',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium text-lg ${selectedLanguage.code === language.code ? 'text-white' : 'text-gray-800'}`}>
                          {language.name}
                        </span>
                        {selectedLanguage.code === language.code && (
                          <span className="text-2xl animate-pulse">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger Button - More exciting */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-6 bg-gradient-to-r from-pink-100 to-red-100 hover:from-pink-200 hover:to-red-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-between group border-2 border-pink-300 hover:border-pink-400 transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    {selectedLanguage.name.charAt(0)}
                  </div>
                  <span className="text-gray-800 font-bold text-xl">{selectedLanguage.name}</span>
                </div>
                <ChevronDown
                  className={`w-7 h-7 text-gray-700 transition-all duration-500 ${
                    isOpen ? 'rotate-180 text-pink-600' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Start Button */}
          <div className="mt-8">
            <button
              onClick={handleStartTest}
              className="w-full py-5 px-8 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white text-xl sm:text-2xl font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Start the Test</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm sm:text-base text-gray-500 mt-6">
            <p>Takes approximately 5-10 minutes</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(-10px);
          }
        }

        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FF6B9D, #FF1744);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #FF1744, #FF6B9D);
        }
      `}</style>
    </div>
  );
}