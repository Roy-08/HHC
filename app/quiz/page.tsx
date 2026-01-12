"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type AnswerMap = Record<string, number>;

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
  const [showComplete, setShowComplete] = useState(false);

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

  /** ✅ SAFE SCROLL (NO window ERROR) */
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
      setShowComplete(true);
      // Clear saved data when quiz is completed
      localStorage.removeItem('quizAnswers');
      localStorage.removeItem('quizCurrentPage');
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

  const progress = (currentPage / totalPages) * 100;

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

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              Quiz Completed 🎉
            </h2>
            <p className="text-gray-600">
              Your happiness score will be calculated next.
            </p>
          </div>
        </div>
      )}

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
          {currentPage === totalPages ? 'Finish' : 'Next Step'}
        </button>
      </footer>
    </div>
  );
}