"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type AnswerMap = Record<string, number>;

interface Country {
  code: string;
  name: string;
  flag: string;
}

const questions = [
  {
    page: 1,
    questions: [
      {
        id: 'q1',
        text: 'Q1/20: When I look at my life, it feels like...',
        options: [
          { emoji: '🚀', text: 'A story moving in the right direction' },
          { emoji: '🧩', text: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'A script that is mostly on track' },
          { emoji: '📖', text: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'Q2/20: My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'Q3/20: I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'Q4/20: My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'Q5/20: My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'Q6/20: I feel inspired…',
        options: [
          { emoji: '☁️', text: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'Q7/20: When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'Q8/20: I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'Q9/20: My future appears as…',
        options: [
          { emoji: '🌑', text: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'Q10/20: My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'Q11/20: I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'Q12/20: Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'Q13/20: Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'I often wear masks to get through' },
          { emoji: '👥', text: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'Q14/20: I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'Q15/20: People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'Q16/20: When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'Q17/20: My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'Q18/20: My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'Q19/20: My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'Q20/20: Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [countries, setCountries] = useState<Country[]>([]);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    birthdate: '',
    country: '',
    occupation: '',
  });

  const totalPages = 10;
  const currentQuestions =
    questions.find(p => p.page === currentPage)?.questions || [];

  // Load saved answers and current page from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    const savedPage = localStorage.getItem('quizCurrentPage');
    
    if (savedAnswers) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }
    
    if (savedPage) {
      try {
        setCurrentPage(parseInt(savedPage, 10));
      } catch (e) {
        console.error('Failed to load saved page:', e);
      }
    }
  }, []);

  // Fetch countries
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=cca2,name,flags')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((c: any) => ({
            code: c.cca2,
            name: c.name.common,
            flag: c.flags?.png || '',
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(sorted);
        setAllCountries(sorted);
      })
      .catch(console.error);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPage', currentPage.toString());
  }, [currentPage]);

  const scrollToTop = () => {
    if ('scrollTo' in globalThis) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnswer = (qid: string, index: number) => {
    setAnswers(prev => ({ ...prev, [qid]: index }));
  };

  const validateAndMove = () => {
    const allAnswered = currentQuestions.every(
      q => answers[q.id] !== undefined
    );

    if (!allAnswered) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
      return;
    }

    if (currentPage < totalPages) {
      setCurrentPage(p => p + 1);
      scrollToTop();
    } else {
      // Show form after completing all questions
      setShowForm(true);
      scrollToTop();
    }
  };

  const movePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(p => p - 1);
      scrollToTop();
    }
  };

  const goBackHome = () => {
    router.push('/');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save form data and answers to localStorage
      localStorage.setItem('userForm', JSON.stringify(form));
      localStorage.setItem('quizAnswers', JSON.stringify(answers));

      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear saved data
      localStorage.removeItem('quizAnswers');
      localStorage.removeItem('quizCurrentPage');

      // Redirect or show success message
      alert('Thank you! Your responses have been submitted successfully.');
      
      // Reset form
      setForm({
        name: '',
        email: '',
        birthdate: '',
        country: '',
        occupation: '',
      });
      setSelectedCountry(null);
      setLoading(false);

      // You can redirect to results page here
      // router.push('/results');
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const progress = (currentPage / totalPages) * 100;

  // Show form after completing all questions
  if (showForm) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-red-50 to-orange-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center p-4 py-12">
          <div className="w-full max-w-3xl">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">✨</div>
            <div className="absolute top-20 right-20 text-5xl opacity-20 animate-float animation-delay-2000">💫</div>
            <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-float animation-delay-4000">🌟</div>

            {/* Main form card */}
            <div className="bg-white/80 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50 transform transition-all duration-500 hover:shadow-3xl">
              {/* Header with icon */}
              <div className="text-center mb-10">
                <div className="inline-block p-4 bg-gradient-to-br from-[#de0f3f] to-[#ff6b6b] rounded-full mb-4 animate-bounce-slow">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#de0f3f] to-[#ff6b6b] bg-clip-text text-transparent mb-3">
                  Almost There!
                </h1>
                <p className="text-gray-600 text-lg">
                  Just a few details to unlock your personalized happiness insights
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-1 w-12 bg-[#de0f3f] rounded-full"></div>
                  <div className="h-1 w-12 bg-[#ff6b6b] rounded-full"></div>
                  <div className="h-1 w-12 bg-[#de0f3f] rounded-full"></div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleFormSubmit}>
                {/* NAME */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">👤</span>
                    Full Name <span className="text-[#de0f3f]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#de0f3f] focus:ring-4 focus:ring-[#de0f3f]/10 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 group-hover:border-gray-300"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-[#de0f3f] rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">✉️</span>
                    Email Address <span className="text-[#de0f3f]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#de0f3f] focus:ring-4 focus:ring-[#de0f3f]/10 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 group-hover:border-gray-300"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-[#de0f3f] rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>

                {/* BIRTHDATE */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">🎂</span>
                    Date of Birth <span className="text-[#de0f3f]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={form.birthdate}
                      onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
                      className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#de0f3f] focus:ring-4 focus:ring-[#de0f3f]/10 focus:outline-none transition-all duration-300 text-gray-800 group-hover:border-gray-300"
                      required
                    />
                  </div>
                </div>

                {/* COUNTRY */}
                <div className="group" ref={dropdownRef}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">🌍</span>
                    Country <span className="text-[#de0f3f]">*</span>
                  </label>
                  <div className="relative">
                    <div className="flex items-center w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus-within:border-[#de0f3f] focus-within:ring-4 focus-within:ring-[#de0f3f]/10 transition-all duration-300 group-hover:border-gray-300 cursor-pointer">
                      {selectedCountry && (
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.name}
                          className="w-8 h-6 object-cover mr-3 rounded shadow-sm"
                        />
                      )}
                      <input
                        type="text"
                        placeholder="Select your country"
                        value={selectedCountry?.name || form.country}
                        onClick={() => setDropdownOpen(true)}
                        onChange={(e) => {
                          const val = e.target.value;
                          setForm({ ...form, country: val });
                          setDropdownOpen(true);
                          setSelectedCountry(null);
                          const filtered = allCountries.filter((c) =>
                            c.name.toLowerCase().includes(val.toLowerCase())
                          );
                          setCountries(filtered);
                        }}
                        className="flex-1 focus:outline-none text-gray-800 bg-transparent placeholder-gray-400"
                        required
                      />
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {dropdownOpen && (
                      <div className="absolute z-20 w-full bg-white border-2 border-gray-200 mt-2 max-h-60 overflow-y-auto rounded-2xl shadow-xl animate-slide-down">
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-[#ffe6e6] hover:to-[#fff0f0] transition-all duration-200 text-gray-800 first:rounded-t-2xl last:rounded-b-2xl"
                            onClick={() => {
                              setSelectedCountry(c);
                              setForm({ ...form, country: c.name });
                              setDropdownOpen(false);
                            }}
                          >
                            <img
                              src={c.flag}
                              alt={c.name}
                              className="w-8 h-6 object-cover rounded shadow-sm"
                            />
                            <span className="font-medium">{c.name}</span>
                          </div>
                        ))}
                        {countries.length === 0 && (
                          <div className="px-5 py-4 text-gray-500 text-center">
                            No country found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* OCCUPATION */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">💼</span>
                    Occupation <span className="text-[#de0f3f]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.occupation}
                      onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                      className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#de0f3f] focus:ring-4 focus:ring-[#de0f3f]/10 focus:outline-none transition-all duration-300 appearance-none text-gray-800 cursor-pointer group-hover:border-gray-300 font-medium"
                      required
                    >
                      <option value="" disabled className="text-gray-400">
                        Select your occupation
                      </option>
                      <option value="Student">🎓 Student</option>
                      <option value="Working Professional">💻 Working Professional</option>
                      <option value="Self-Employed / Business">🚀 Self-Employed / Business</option>
                      <option value="Homemaker">🏡 Homemaker</option>
                      <option value="Retired">🌴 Retired</option>
                      <option value="Currently Not Working">🔍 Currently Not Working</option>
                    </select>
                    <div className="pointer-events-none absolute right-5 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 transform relative overflow-hidden group ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#de0f3f] to-[#ff6b6b] hover:shadow-2xl hover:shadow-[#de0f3f]/50 hover:-translate-y-1 active:translate-y-0'
                  }`}
                >
                  <span className="relative z-10">
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Submit & View Results</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}
                  </span>
                  {!loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#de0f3f] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowForm(false)}
                  className="inline-flex items-center gap-2 text-[#de0f3f] hover:text-[#c00d37] font-semibold transition-colors group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  <span>Back to Questions</span>
                </button>
              </div>

              {/* Security badge */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Your information is secure and confidential</span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
          .animate-slide-down {
            animation: slide-down 0.3s ease-out;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    );
  }

  // Quiz questions view
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ALERT */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-white shadow-xl border transition-all duration-500 z-50 ${
          showAlert ? 'top-5' : '-top-32'
        }`}
        style={{ color: '#de0f3f' }}
      >
        Please answer all questions to proceed
      </div>

      {/* HEADER */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-[#de0f3f]">
            HAPPINESS INDEX
          </h1>
          <button
            onClick={goBackHome}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#de0f3f] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* QUESTIONS */}
      <main className="flex-1 px-6 pb-32">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-5">
          {currentQuestions.map(q => (
            <div
              key={q.id}
              className="flex-1 bg-[#f8f8f8] p-6 rounded-3xl"
            >
              <h2 className="font-semibold mb-5 text-gray-800">{q.text}</h2>
              <div className="flex flex-col gap-3">
                {q.options.map((opt, idx) => {
                  const selected = answers[q.id] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleAnswer(q.id, idx)}
                      className="cursor-pointer px-4 py-2.5 rounded-2xl border flex gap-3 items-center transition-all hover:shadow-md"
                      style={{
                        backgroundColor: selected ? '#de0f3f' : '#fff',
                        color: selected ? '#fff' : '#333',
                        borderColor: selected ? '#de0f3f' : '#ddd',
                      }}
                    >
                      <span className="text-lg">{opt.emoji}</span>
                      <span className="text-sm">{opt.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 flex gap-3">
        <button
          onClick={movePrevious}
          disabled={currentPage === 1}
          className="flex-1 py-3 rounded-full text-black font-semibold text-sm disabled:opacity-40 hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Next Step' : 'Next Step'}
        </button>
      </footer>
    </div>
  );
}
