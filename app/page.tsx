'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Sparkles } from 'lucide-react';
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
        <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        {/* Main Content Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 border border-pink-100">
          {/* Header */}
          <div className="text-center space-y-3 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
                Welcome!
              </h1>
              <Sparkles className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
          </div>

          {/* Description - Updated Content */}
          <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            <p className="text-center">
              This <span className="font-semibold text-pink-600">Happiness Index</span> helps you pause and check in with your emotional well-being.
            </p>
            <p className="text-center">
              There are <span className="font-semibold">no right or wrong answers</span>, only your honest feelings.
            </p>
            <p className="text-center">
              The test is available in <span className="font-semibold text-red-600">15 languages</span>, so choose the one you&apos;re most comfortable with.
            </p>
            <p className="text-center text-xs sm:text-sm italic text-gray-600 mt-4 pt-3 border-t border-gray-200">
              English is the primary language of communication. In case of any difference in translated text, please refer to the English version only.
            </p>
            <p className="text-center text-xs sm:text-sm italic text-gray-600">
              All reports would be generated in English language only.
            </p>
            <p className="text-center font-medium text-pink-600 mt-4">
              A few minutes today can bring clarity, awareness, and a happier you.
            </p>
            <p className="text-center text-sm font-semibold text-gray-800 mt-2">
              Small step, big insight. Let&apos;s start.
            </p>
          </div>

          {/* Language Selection */}
          <div className="mb-8">
            <label className="text-lg sm:text-xl font-semibold text-gray-800 block text-center mb-4 flex items-center justify-center gap-2">
              <Globe className="w-5 h-5 text-pink-500" />
              Choose Your Language
            </label>
            
            <div ref={dropdownRef} className="relative w-full max-w-sm mx-auto">
              {/* Dropdown Menu - Smaller and More Attractive */}
              <div
                className={`absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-out border-2 border-pink-200 ${
                  isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}
                style={{ maxHeight: isOpen ? '240px' : '0' }}
              >
                <div className="overflow-y-auto max-h-[240px] custom-scrollbar p-2">
                  {languages.map((language, index) => (
                    <button
                      key={language.code}
                      onClick={() => handleSelect(language)}
                      className={`w-full px-4 py-2 text-left transition-all duration-300 rounded-xl mb-1 transform hover:scale-[1.03] relative overflow-hidden group ${
                        selectedLanguage.code === language.code 
                          ? 'bg-gradient-to-r from-pink-500 via-pink-600 to-red-500 text-white shadow-lg scale-[1.03]' 
                          : 'hover:bg-gradient-to-r hover:from-pink-50 hover:via-pink-100 hover:to-red-50 text-gray-800'
                      }`}
                      style={{
                        animationDelay: `${index * 25}ms`,
                        animation: isOpen ? 'slideInScale 0.3s ease-out forwards' : 'none',
                      }}
                    >
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      <div className="flex items-center justify-between relative z-10">
                        <span className={`font-medium text-sm ${selectedLanguage.code === language.code ? 'text-white' : 'text-gray-800'}`}>
                          {language.name}
                        </span>
                        {selectedLanguage.code === language.code && (
                          <span className="text-lg animate-pulse">✨</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger Button - Smaller and More Attractive */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-5 py-3 bg-gradient-to-r from-pink-100 via-pink-50 to-red-100 hover:from-pink-200 hover:via-pink-100 hover:to-red-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group border-2 border-pink-200 hover:border-pink-300 transform hover:scale-[1.02] relative overflow-hidden"
              >
                {/* Animated background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 via-pink-600 to-red-600 flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-gray-800 font-bold text-base">{selectedLanguage.name}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-700 transition-all duration-500 relative z-10 ${
                    isOpen ? 'rotate-180 text-pink-600' : 'group-hover:animate-bounce'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Start Button */}
          <div className="mt-8">
            <button
              onClick={handleStartTest}
              className="w-full py-4 px-8 bg-gradient-to-r from-pink-500 via-pink-600 to-red-600 hover:from-pink-600 hover:via-red-500 hover:to-red-700 text-white text-lg sm:text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <span className="relative z-10">Start the Test</span>
              <span className="text-xl group-hover:translate-x-2 transition-transform duration-300 relative z-10">→</span>
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs sm:text-sm text-gray-500 mt-6">
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
            transform: translateX(-20px) scale(0.95);
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
          width: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 192, 203, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #ef4444);
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #dc2626);
        }

        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ec4899 rgba(255, 192, 203, 0.1);
        }
      `}</style>
    </div>
  );
}
