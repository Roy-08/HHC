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
          { emoji: '🚀', text: 'A story moving in the right direction', points: 4 },
          { emoji: '🧩', text: 'A story that keeps losing its plot', points: 2 },
          { emoji: '📝', text: 'A rough draft with many edits pending', points: 1 },
          { emoji: '🎬', text: 'A script that is mostly on track', points: 3 },
          { emoji: '📖', text: 'A narrative unfolding the way it should', points: 5 },
        ],
      },
      {
        id: 'q2',
        text: 'Q2/20: My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'Like a shaken soda can', points: 0 },
          { emoji: '🏠', text: 'Like a room that gets messy and then reset', points: 1 },
          { emoji: '💧', text: 'Like a pond with rare ripples', points: 2 },
          { emoji: '🌊', text: 'Like a deep lake, mostly still inside', points: 3 },
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
          { emoji: '🤖', text: 'On autopilot, just going through motions', points: 0 },
          { emoji: '🌫️', text: 'With a vague idea of what to do', points: 1 },
          { emoji: '🗺️', text: 'With a loose game plan in mind', points: 3 },
          { emoji: '🧭', text: 'With a clear inner compass for the day', points: 4 },
        ],
      },
      {
        id: 'q4',
        text: 'Q4/20: My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'Like living in a house I never chose', points: 0 },
          { emoji: '🏠', text: 'Like a house with a few right rooms', points: 2 },
          { emoji: '🏡', text: 'Like the home I had roughly imagined', points: 1 },
          { emoji: '🖼️', text: 'Like walking inside the life I once drew on paper', points: 3 },
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
          { emoji: '📢', text: 'Mostly like background criticism', points: 0 },
          { emoji: '⚖️', text: 'A mix of doubts and small pep talks', points: 1 },
          { emoji: '🧠', text: 'Often like a supportive inner coach', points: 3 },
          { emoji: '📣', text: 'Largely like a steady inner cheer squad', points: 4 },
        ],
      },
      {
        id: 'q6',
        text: 'Q6/20: I feel inspired…',
        options: [
          { emoji: '☁️', text: 'Almost never, most days feel flat', points: 0 },
          { emoji: '⚡', text: 'Small sparks show up once in a while', points: 1 },
          { emoji: '🕯️', text: 'A gentle glow is present on many days', points: 2 },
          { emoji: '🔥', text: 'Frequent bursts that move me to act', points: 3 },
          { emoji: '☀️', text: 'A steady inner fire that keeps me creating', points: 4 },
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
          { emoji: '💥', text: 'I crash emotionally when plans change', points: 0 },
          { emoji: '😰', text: 'I get badly shaken and stay upset', points: 1 },
          { emoji: '🌀', text: 'I wobble but regain balance', points: 3 },
          { emoji: '🧘', text: 'I adjust with mild discomfort', points: 2 },
          { emoji: '🎯', text: 'I stay centred and simply re-route', points: 4 },
        ],
      },
      {
        id: 'q8',
        text: 'Q8/20: I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'Mostly on mute, mind is elsewhere', points: 0 },
          { emoji: '↔️', text: 'Half here, half on the next thing', points: 1 },
          { emoji: '👁️', text: 'Generally present with a few slips', points: 2 },
          { emoji: '⏰', text: 'Immersed enough to lose track of time', points: 3 },
          { emoji: '✨', text: 'Deeply absorbed, life feels vivid', points: 4 },
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
          { emoji: '🌑', text: 'A corridor with lights switched off', points: 0 },
          { emoji: '🌫️', text: 'A foggy lane with faint outlines', points: 1 },
          { emoji: '🛣️', text: 'A winding road with lamps at intervals', points: 2 },
          { emoji: '🛤️', text: 'An open highway with clear signboards', points: 3 },
          { emoji: '🌅', text: 'A wide horizon with many bright paths', points: 4 },
        ],
      },
      {
        id: 'q10',
        text: 'Q10/20: My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'Mostly emotional losses or drains', points: 0 },
          { emoji: '💫', text: 'A few scattered moments of return', points: 2 },
          { emoji: '⚖️', text: 'A fair share of joy and fulfilment', points: 1 },
          { emoji: '📈', text: 'Consistent returns that feel worth the effort', points: 3 },
          { emoji: '💎', text: 'Rich emotional dividends in most areas', points: 4 },
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
          { emoji: '🔄', text: 'I feel stuck on repeat', points: 0 },
          { emoji: '📊', text: 'I grow only in small, rare jumps', points: 1 },
          { emoji: '🌱', text: 'I can sense steady inner growth', points: 3 },
          { emoji: '🌳', text: 'I keep evolving in noticeable ways', points: 4 },
        ],
      },
      {
        id: 'q12',
        text: 'Q12/20: Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'Mostly survival and urgency drive me', points: 0 },
          { emoji: '🤔', text: 'Sometimes I check if it truly matters', points: 2 },
          { emoji: '🧭', text: 'Often I check alignment with my why', points: 1 },
          { emoji: '⭐', text: 'Largely my choices follow a clear inner purpose', points: 3 },
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
          { emoji: '🎭', text: 'I often wear masks to get through', points: 0 },
          { emoji: '👥', text: 'I can be myself only with a few people', points: 1 },
          { emoji: '😊', text: 'I am mostly myself in most spaces', points: 3 },
          { emoji: '💯', text: 'I feel at home in my own skin almost everywhere', points: 4 },
        ],
      },
      {
        id: 'q14',
        text: 'Q14/20: I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'I avoid being alone with myself', points: 0 },
          { emoji: '⏱️', text: 'I tolerate my own company in small doses', points: 1 },
          { emoji: '👍', text: 'I generally like spending time with myself', points: 2 },
          { emoji: '💖', text: 'I genuinely look forward to my alone time', points: 3 },
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
          { emoji: '🚧', text: 'People hesitate to open up to me', points: 0 },
          { emoji: '🤐', text: 'A few share, but cautiously', points: 1 },
          { emoji: '🤗', text: 'Many people confide in me with ease', points: 3 },
          { emoji: '🛡️', text: 'I am often the person people turn to first', points: 4 },
        ],
      },
      {
        id: 'q16',
        text: 'Q16/20: When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'I struggle to recall anything pleasant', points: 0 },
          { emoji: '🌟', text: 'A few scattered good moments come up', points: 1 },
          { emoji: '😌', text: 'Several warm memories surface easily', points: 2 },
          { emoji: '🌈', text: 'Many vivid pleasant moments come to mind at once', points: 3 },
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
          { emoji: '🌪️', text: 'My moods are unstable regardless of sleep', points: 0 },
          { emoji: '🤷', text: 'Sleep helps a little but not reliably', points: 1 },
          { emoji: '😴', text: 'Good sleep usually keeps me steadier', points: 2 },
          { emoji: '⚓', text: 'Good sleep clearly anchors my emotional balance', points: 3 },
        ],
      },
      {
        id: 'q18',
        text: 'Q18/20: My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'Energy drops sharply through the day', points: 0 },
          { emoji: '📊', text: 'My energy graph is a continuous zigzag', points: 1 },
          { emoji: '➖', text: 'Energy is mostly steady with mild dips', points: 2 },
          { emoji: '🔋', text: 'I feel sustainably energised most of the day', points: 3 },
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
          { emoji: '⛓️', text: 'Mostly draining or disconnecting interactions', points: 0 },
          { emoji: '😐', text: 'Neutral exchanges without much feeling', points: 1 },
          { emoji: '🤝', text: 'Generally warm and connecting moments', points: 2 },
          { emoji: '💞', text: 'Deep, nourishing connections in many interactions', points: 3 },
        ],
      },
      {
        id: 'q20',
        text: 'Q20/20: Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'Like background wallpaper I hardly notice', points: 0 },
          { emoji: '🎬', text: 'Like a movie I watch from the side-lines', points: 1 },
          { emoji: '🎮', text: 'Like a game I join in now and then', points: 3 },
          { emoji: '🎢', text: 'Like an unfolding adventure I am fully part of', points: 4 },
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
  const [showThankYou, setShowThankYou] = useState(false);
  const [certificateDataUrl, setCertificateDataUrl] = useState('');

  // Form states
  const [countries, setCountries] = useState<Country[]>([]);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    birthdate: '',
    gender: '',
    country: '',
    occupation: '',
  });

  const [dateError, setDateError] = useState('');

  const totalPages = 10;
  const currentQuestions =
    questions.find(p => p.page === currentPage)?.questions || [];

  // Clear localStorage on mount to start fresh every time
  useEffect(() => {
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizCurrentPage');
    localStorage.removeItem('userForm');
    localStorage.removeItem('totalScore');
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
      setShowForm(true);
      scrollToTop();
    }
  };

  const movePrevious = () => {
    if (currentPage === 1) {
      router.push('/');
    } else {
      setCurrentPage(p => p - 1);
      scrollToTop();
    }
  };

  const validateBirthdate = (date: string): boolean => {
    if (!date) return false;

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      setDateError('Birthdate cannot be today or in the future');
      return false;
    }

    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();
    
    let actualAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      actualAge--;
    }

    if (actualAge < 7) {
      setDateError('You must be at least 7 years old to take this quiz');
      return false;
    }

    setDateError('');
    return true;
  };

  const validateMobile = (mobile: string): boolean => {
    const mobileRegex = /^\+?[0-9]{10,15}$/;
    return mobileRegex.test(mobile.replace(/[\s-]/g, ''));
  };

  // Calculate total score out of 100
  const calculateTotalScore = (): number => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    questions.forEach(page => {
      page.questions.forEach(question => {
        const answerIndex = answers[question.id];
        if (answerIndex !== undefined) {
          const selectedOption = question.options[answerIndex];
          totalScore += selectedOption.points || 0;
        }
        
        const maxPoints = Math.max(...question.options.map(opt => opt.points || 0));
        maxPossibleScore += maxPoints;
      });
    });
    
    if (maxPossibleScore === 0) return 0;
    const percentageScore = Math.round((totalScore / maxPossibleScore) * 100);
    return percentageScore;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateBirthdate(form.birthdate)) {
      return;
    }

    if (!validateMobile(form.mobile)) {
      alert('Please enter a valid mobile number (10-15 digits)');
      return;
    }

    // Show thank you page immediately
    setShowForm(false);
    setShowThankYou(true);
    scrollToTop();

    // Submit to API in the background
    const totalScore = calculateTotalScore();
    
    fetch('/api/submit-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        dob: form.birthdate,
        gender: form.gender,
        country: form.country,
        occupation: form.occupation,
        totalScore: totalScore,
        answers: answers,
      }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.certificateDataUrl) {
        setCertificateDataUrl(data.certificateDataUrl);
      }
    })
    .catch(error => {
      console.error('Background submission error:', error);
    });
  };

  const handleBackToHome = () => {
    setAnswers({});
    setCurrentPage(1);
    setShowForm(false);
    setShowThankYou(false);
    setCertificateDataUrl('');
    setForm({
      name: '',
      email: '',
      mobile: '',
      birthdate: '',
      gender: '',
      country: '',
      occupation: '',
    });
    setSelectedCountry(null);
    
    router.push('/');
  };

  // Convert data URL to blob for download
  const dataURLtoBlob = (dataUrl: string): Blob | null => {
    try {
      const arr = dataUrl.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      if (!mimeMatch) return null;
      
      const mime = mimeMatch[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new Blob([u8arr], { type: mime });
    } catch (error) {
      console.error('Error converting data URL to blob:', error);
      return null;
    }
  };

  // Generate filename from user's name
  const generateFilename = (name: string): string => {
    const sanitizedName = name
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
    return `${sanitizedName}/images/photo1768804922.jpg`;
  };

  // Download certificate from data URL
  const downloadCertificateFromDataUrl = (dataUrl: string, filename: string) => {
    const blob = dataURLtoBlob(dataUrl);
    if (!blob) {
      console.error('Failed to convert certificate to blob');
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // WhatsApp Share
  const handleShareWhatsApp = () => {
    if (!certificateDataUrl) {
      alert('Certificate is being generated. Please wait a moment and try again.');
      return;
    }

    const shareText = `🎉 I just completed my Happiness Index assessment!\n\nDiscover your happiness score and get personalized insights.\n\nTake the quiz: ${window.location.origin}`;
    
    // WhatsApp Web API with text
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    
    // Download certificate with user's name
    const filename = generateFilename(form.name);
    downloadCertificateFromDataUrl(certificateDataUrl, filename);
    
    setTimeout(() => {
      alert('📱 Certificate downloaded! After sending the text, you can attach the certificate image from your downloads.');
    }, 500);
  };

  // Instagram Share
  const handleShareInstagram = () => {
    if (!certificateDataUrl) {
      alert('Certificate is being generated. Please wait a moment and try again.');
      return;
    }

    const shareText = "I just completed my Happiness Index assessment! 🎉 Discover your happiness score and get personalized insights.";
    
    // Download certificate with user's name
    const filename = generateFilename(form.name);
    downloadCertificateFromDataUrl(certificateDataUrl, filename);

    // Copy text to clipboard
    navigator.clipboard.writeText(`${shareText}\n\n${window.location.origin}`)
      .catch(err => console.error('Failed to copy text:', err));

    // Detect mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Try to open Instagram app
      setTimeout(() => {
        window.location.href = 'instagram://story-camera';
      }, 500);
      
      // Fallback to Instagram web after delay
      setTimeout(() => {
        alert('📱 Certificate downloaded and text copied!\n\n1. Open Instagram\n2. Tap Your Story (+)\n3. Select the downloaded certificate\n4. Paste the copied text\n5. Share!');
      }, 1500);
    } else {
      // Desktop: show instructions
      alert('📥 Certificate downloaded and text copied to clipboard!\n\nTo share on Instagram:\n1. Open Instagram on your phone\n2. Tap Your Story (+)\n3. Select the downloaded certificate from your gallery\n4. Paste the copied text\n5. Share your story!\n\nThe text has been copied to your clipboard.');
    }
  };

  // Facebook Share
  const handleShareFacebook = () => {
    if (!certificateDataUrl) {
      alert('Certificate is being generated. Please wait a moment and try again.');
      return;
    }

    const shareText = "I just completed my Happiness Index assessment! 🎉 Discover your happiness score and get personalized insights.";
    
    // Download certificate with user's name
    const filename = generateFilename(form.name);
    downloadCertificateFromDataUrl(certificateDataUrl, filename);

    // Copy text to clipboard
    navigator.clipboard.writeText(`${shareText}\n\n${window.location.origin}`)
      .catch(err => console.error('Failed to copy text:', err));

    // Detect mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Try to open Facebook app
      setTimeout(() => {
        window.location.href = 'fb://story';
      }, 500);
      
      // Fallback message after delay
      setTimeout(() => {
        alert('📱 Certificate downloaded and text copied!\n\n1. Open Facebook\n2. Tap Create Story\n3. Select the downloaded certificate\n4. Paste the copied text\n5. Share!');
      }, 1500);
    } else {
      // Desktop: show instructions
      alert('📥 Certificate downloaded and text copied to clipboard!\n\nTo share on Facebook:\n1. Open Facebook on your phone\n2. Tap Create Story\n3. Select the downloaded certificate from your gallery\n4. Paste the copied text\n5. Share your story!\n\nThe text has been copied to your clipboard.');
    }
  };

  const progress = (currentPage / totalPages) * 100;

  // Thank You Page
  if (showThankYou) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-200/40 to-red-200/40 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-rose-200/40 to-orange-200/40 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="relative w-full max-w-lg">
          <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl md:rounded-[3rem] shadow-2xl border border-white/60 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-red-500 to-rose-500"></div>
            
            <div className="p-6 md:p-12 text-center">
              <div className="flex justify-center mb-6 md:mb-10">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-full blur-xl md:blur-2xl opacity-40"></div>
                  
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#de0f3f] via-[#ff4466] to-[#ff6b6b] rounded-full shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    
                    <div className="relative z-10">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/945/945467.png"
                        alt="Email Icon"
                        className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                    
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 text-yellow-300">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 -left-2 md:-bottom-3 md:-left-3 w-3 h-3 md:w-5 md:h-5 text-yellow-300">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#de0f3f] via-[#ff4466] to-[#ff6b6b]">
                Thank You
              </h1>

              <div className="mb-6 md:mb-8 space-y-2">
                <p className="text-lg md:text-xl text-gray-800 font-semibold px-2">
                  Your Happiness Report is on its way! 🎉
                </p>
                <p className="text-base md:text-lg text-gray-600 px-2">
                  We&apos;ve sent your personalized insights to
                </p>
              </div>

              <div className="mb-6 md:mb-10 px-2">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl md:rounded-2xl border-2 border-pink-200 shadow-lg max-w-full">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#de0f3f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm md:text-lg font-bold text-[#de0f3f] break-all">
                    {form.email}
                  </span>
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <p className="text-sm md:text-base text-gray-700 font-semibold mb-4">
                  Share your achievement with friends! 🌟
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleShareWhatsApp}
                    className="group relative flex items-center cursor-pointer gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0F7A6A] text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden text-sm md:text-base"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="relative z-10">WhatsApp</span>
                  </button>

                  <button
                    onClick={handleShareInstagram}
                    className="group relative flex items-center cursor-pointer gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden text-sm md:text-base"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="relative z-10">Instagram</span>
                  </button>

                  <button
                    onClick={handleShareFacebook}
                    className="group relative flex cursor-pointer items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-[#1877F2] hover:bg-[#0C63D4] text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden text-sm md:text-base"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="relative z-10">Facebook</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6 md:mb-10 px-4">
                <div className="h-0.5 md:h-1 w-20 md:w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent rounded-full"></div>
                <div className="mx-3 md:mx-4 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-br from-pink-400 to-red-500 rounded-full"></div>
                <div className="h-0.5 md:h-1 w-20 md:w-32 bg-gradient-to-r from-transparent via-red-300 to-transparent rounded-full"></div>
              </div>

              <button
                onClick={handleBackToHome}
                className="group relative inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#de0f3f] via-[#ff4466] to-[#ff6b6b] text-white font-bold text-base md:text-lg rounded-full shadow-2xl hover:shadow-[#de0f3f]/50 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="relative z-10">Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form Page
  if (showForm) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-red-50 to-orange-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          </div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center p-4 py-8">
          <div className="w-full max-w-2xl">
            <div className="bg-white/80 backdrop-blur-lg p-5 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl border border-white/50">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-block p-3 md:p-4 bg-gradient-to-br from-[#de0f3f] to-[#ff6b6b] rounded-full mb-3 md:mb-4">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#de0f3f] mb-2 md:mb-3">
                  Almost There!
                </h1>
                <p className="text-gray-600 text-sm md:text-base px-2">
                  Just a few details to unlock your personalized happiness insights
                </p>
              </div>

              <form className="space-y-4 md:space-y-5" onSubmit={handleFormSubmit}>
                <div className="group">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Full Name <span className="text-[#de0f3f]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-0 py-2 md:py-2.5 bg-transparent border-b-2 border-gray-300 focus:border-[#de0f3f] focus:outline-none transition-all duration-300 text-gray-800 text-sm md:text-base placeholder-gray-400"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Email Address <span className="text-[#de0f3f]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-0 py-2 md:py-2.5 bg-transparent border-b-2 border-gray-300 focus:border-[#de0f3f] focus:outline-none transition-all duration-300 text-gray-800 text-sm md:text-base placeholder-gray-400"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Mobile Number <span className="text-[#de0f3f]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1234567890"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full px-0 py-2 md:py-2.5 bg-transparent border-b-2 border-gray-300 focus:border-[#de0f3f] focus:outline-none transition-all duration-300 text-gray-800 text-sm md:text-base placeholder-gray-400"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Date of Birth <span className="text-[#de0f3f]">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.birthdate}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      setForm({ ...form, birthdate: e.target.value });
                      validateBirthdate(e.target.value);
                    }}
                    className="w-full px-0 py-2 md:py-2.5 bg-transparent border-b-2 border-gray-300 focus:border-[#de0f3f] focus:outline-none transition-all duration-300 text-gray-800 text-sm md:text-base h-10 md:h-11"
                    required
                  />
                  {dateError && (
                    <p className="mt-1.5 text-xs md:text-sm text-red-600 font-medium">{dateError}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Gender <span className="text-[#de0f3f]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className="w-full px-0 py-2 md:py-2.5 bg-transparent border-b-2 border-gray-300 focus:border-[#de0f3f] focus:outline-none transition-all duration-300 text-gray-800 text-sm md:text-base cursor-pointer appearance-none"
                      style={{ color: form.gender ? '#1f2937' : '#9ca3af' }}
                      required
                    >
                      <option value="" disabled>Select your gender</option>
                      <option value="Male" style={{ color: '#1f2937' }}>Male</option>
                      <option value="Female" style={{ color: '#1f2937' }}>Female</option>
                      <option value="Non-binary" style={{ color: '#1f2937' }}>Non-binary</option>
                    </select>
                    <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="group" ref={dropdownRef}>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Country <span className="text-[#de0f3f]">*</span>
                  </label>
                  <div className="relative">
                    <div className="flex items-center w-full px-0 py-2 md:py-2.5 border-b-2 border-gray-300 focus-within:border-[#de0f3f] transition-all duration-300 cursor-pointer">
                      {selectedCountry && (
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.name}
                          className="w-6 h-4 md:w-7 md:h-5 object-cover mr-2 md:mr-3 rounded shadow-sm"
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
                        className="flex-1 focus:outline-none text-gray-800 text-sm md:text-base bg-transparent placeholder-gray-400"
                        required
                      />
                    </div>

                    {dropdownOpen && (
                      <div className="absolute z-20 w-full bg-white border-2 border-gray-200 mt-2 max-h-48 md:max-h-60 overflow-y-auto rounded-xl md:rounded-2xl shadow-xl">
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 cursor-pointer hover:bg-gradient-to-r hover:from-[#ffe6e6] hover:to-[#fff0f0] transition-all duration-200 text-gray-800 text-sm md:text-base"
                            onClick={() => {
                              setSelectedCountry(c);
                              setForm({ ...form, country: c.name });
                              setDropdownOpen(false);
                            }}
                          >
                            <img
                              src={c.flag}
                              alt={c.name}
                              className="w-6 h-4 md:w-7 md:h-5 object-cover rounded shadow-sm"
                            />
                            <span className="font-medium">{c.name}</span>
                          </div>
                        ))}
                        {countries.length === 0 && (
                          <div className="px-4 py-3 text-gray-500 text-center text-sm">
                            No country found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Occupation <span className="text-[#de0f3f]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.occupation}
                      onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                      className="w-full px-0 py-2 md:py-2.5 bg-transparent border-b-2 border-gray-300 focus:border-[#de0f3f] focus:outline-none transition-all duration-300 text-gray-800 text-sm md:text-base cursor-pointer appearance-none"
                      style={{ color: form.occupation ? '#1f2937' : '#9ca3af' }}
                      required
                    >
                      <option value="" disabled>Select your occupation</option>
                      <option value="Student" style={{ color: '#1f2937' }}>Student</option>
                      <option value="Working Professional" style={{ color: '#1f2937' }}>Working Professional</option>
                      <option value="Self-Employed / Business" style={{ color: '#1f2937' }}>Self-Employed / Business</option>
                      <option value="Homemaker" style={{ color: '#1f2937' }}>Homemaker</option>
                      <option value="Retired" style={{ color: '#1f2937' }}>Retired</option>
                      <option value="Currently Not Working" style={{ color: '#1f2937' }}>Currently Not Working</option>
                    </select>
                    <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg text-white transition-all duration-300 transform relative overflow-hidden group mt-6 md:mt-8 bg-gradient-to-r from-[#de0f3f] to-[#ff6b6b] hover:shadow-2xl hover:shadow-[#de0f3f]/50 hover:-translate-y-1 active:translate-y-0"
                >
                  <span className="relative z-10">
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                      <span>Submit</span>
                      <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </span>
                </button>
              </form>

              <div className="mt-5 md:mt-6 text-center">
                <button
                  onClick={() => setShowForm(false)}
                  className="inline-flex cursor-pointer items-center gap-1.5 md:gap-2 text-[#de0f3f] hover:text-[#c00d37] font-semibold transition-colors group text-sm md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 cursor-pointer group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  <span>Back to Questions</span>
                </button>
              </div>

              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 flex items-center justify-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-500">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Your information is secure and confidential</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz questions view
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div
        className={`fixed top-5 px-8 py-4 rounded-full bg-white shadow-xl border transition-all duration-500 z-50 ${
          showAlert ? 'right-5' : '-right-96'
        }`}
        style={{ color: '#de0f3f' }}
      >
        Please answer all questions to proceed
      </div>

      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-[#de0f3f]">
            HAPPINESS INDEX
          </h1>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#de0f3f] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="flex-1 px-6 pb-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-5">
          {currentQuestions.map(q => (
            <div
              key={q.id}
              className="flex-1 bg-[#f8f8f8] p-6 rounded-3xl"
            >
              <h2 className="font-semibold mb-5 text-gray-800 text-base md:text-lg">{q.text}</h2>
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

      <footer className="sticky bottom-0 left-0 right-0 bg-white border-t px-6 py-4 flex gap-3 mt-6">
        <button
          onClick={movePrevious}
          className="flex-1 py-3 rounded-full text-black font-semibold text-base hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-base bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Next' : 'Next'}
        </button>
      </footer>
    </div>
  );
}
