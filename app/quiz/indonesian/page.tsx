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
        text: 'Pertanyaan 1/20: Ketika saya melihat hidup saya, rasanya seperti...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: 'Sebuah cerita yang terus kehilangan alurnya', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'Draf kasar dengan banyak pengeditan yang tertunda', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'Skrip yang sebagian besar berada di jalur yang benar', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'Narasi yang terungkap sebagaimana mestinya', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'Pertanyaan 2/20: Dunia batin saya terasa tenang dan stabil terlepas dari situasi luar.',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'Seperti kaleng soda yang dikocok', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'Seperti ruangan yang berantakan lalu direset', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'Seperti kolam dengan riak yang jarang', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'Seperti danau dalam, sebagian besar tenang di dalam', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'Pertanyaan 3/20: Saya bangun dengan rasa arah untuk hari yang akan datang.',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'Autopilot, hanya menjalani gerakan', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'Dengan ide samar tentang apa yang harus dilakukan', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'Dengan rencana permainan longgar dalam pikiran', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'Dengan kompas batin yang jelas untuk hari ini', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'Pertanyaan 4/20: Kehidupan saya saat ini menyerupai kehidupan yang pernah saya inginkan.',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'Seperti tinggal di rumah yang tidak pernah saya pilih', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'Seperti rumah dengan beberapa ruangan yang tepat', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'Seperti rumah yang saya bayangkan secara kasar', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'Seperti berjalan di dalam kehidupan yang pernah saya gambar di atas kertas', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'Pertanyaan 5/20: Pikiran saya memberdayakan saya lebih dari menguras saya.',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'Kebanyakan seperti kritik latar belakang', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'Campuran keraguan dan pep talk kecil', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'Sering seperti pelatih batin yang mendukung', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'Sebagian besar seperti regu sorak batin yang stabil', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'Pertanyaan 6/20: Saya merasa terinspirasi...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'Hampir tidak pernah, sebagian besar hari terasa datar', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'Percikan kecil muncul sesekali', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'Cahaya lembut hadir di banyak hari', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'Ledakan sering yang menggerakkan saya untuk bertindak', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'Api batin yang stabil yang membuat saya terus berkarya', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'Pertanyaan 7/20: Ketika rencana berubah atau rusak, rasa tenang saya terpengaruh',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'Saya hancur secara emosional ketika rencana berubah', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'Saya sangat terguncang dan tetap kesal', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'Saya goyah tapi mendapatkan kembali keseimbangan', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'Saya menyesuaikan dengan ketidaknyamanan ringan', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'Saya tetap terpusat dan hanya mengalihkan rute', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'Pertanyaan 8/20: Saya merasa hadir secara mental dan terserap dalam apa yang saya lakukan.',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'Kebanyakan dalam mode diam, pikiran ada di tempat lain', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'Setengah di sini, setengah pada hal berikutnya', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'Umumnya hadir dengan beberapa kesalahan', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'Cukup terbenam untuk kehilangan jejak waktu', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'Sangat terserap, hidup terasa jelas', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'Pertanyaan 9/20: Masa depan saya tampak sebagai...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: 'Koridor dengan lampu dimatikan', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'Jalur berkabut dengan garis samar', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'Jalan berliku dengan lampu di interval', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'Jalan raya terbuka dengan papan tanda yang jelas', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'Cakrawala luas dengan banyak jalur cerah', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'Pertanyaan 10/20: Hidup saya memberi saya pengembalian emosional — kegembiraan, kebanggaan, pemenuhan.',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'Kebanyakan kerugian emosional atau pengurasan', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'Beberapa momen pengembalian yang tersebar', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'Bagian yang adil dari kegembiraan dan pemenuhan', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'Pengembalian konsisten yang terasa layak untuk usaha', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'Dividen emosional yang kaya di sebagian besar area', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'Pertanyaan 11/20: Saya tumbuh sebagai pribadi seiring waktu.',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'Saya merasa terjebak dalam pengulangan', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'Saya tumbuh hanya dalam lompatan kecil yang jarang', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'Saya dapat merasakan pertumbuhan batin yang stabil', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'Saya terus berkembang dengan cara yang terlihat', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'Pertanyaan 12/20: Makna dan tujuan memandu keputusan saya.',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'Kebanyakan kelangsungan hidup dan urgensi yang mendorong saya', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'Kadang-kadang saya memeriksa apakah itu benar-benar penting', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'Sering saya memeriksa keselarasan dengan "mengapa" saya', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'Sebagian besar pilihan saya mengikuti tujuan batin yang jelas', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'Pertanyaan 13/20: Menjadi diri sendiri terasa nyaman.',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'Saya sering memakai topeng untuk melewati', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: 'Saya hanya bisa menjadi diri sendiri dengan beberapa orang', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'Saya sebagian besar diri sendiri di sebagian besar ruang', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'Saya merasa di rumah dalam kulit saya sendiri hampir di mana-mana', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'Pertanyaan 14/20: Saya menikmati kebersamaan saya sendiri.',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'Saya menghindari sendirian dengan diri sendiri', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'Saya mentolerir kebersamaan saya sendiri dalam dosis kecil', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'Saya umumnya suka menghabiskan waktu dengan diri sendiri', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'Saya benar-benar menantikan waktu sendirian saya', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'Pertanyaan 15/20: Orang-orang merasa aman secara emosional di sekitar saya.',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'Orang-orang ragu untuk terbuka kepada saya', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'Beberapa berbagi, tetapi dengan hati-hati', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'Banyak orang mempercayai saya dengan mudah', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'Saya sering menjadi orang yang pertama kali didatangi orang', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'Pertanyaan 16/20: Ketika saya memikirkan hari-hari terakhir, saya mengingat momen-momen menyenangkan.',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'Saya kesulitan mengingat sesuatu yang menyenangkan', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'Beberapa momen baik yang tersebar muncul', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'Beberapa kenangan hangat muncul dengan mudah', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'Banyak momen menyenangkan yang jelas terlintas sekaligus', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'Pertanyaan 17/20: Stabilitas emosional saya lebih baik ketika kualitas tidur saya baik.',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'Suasana hati saya tidak stabil terlepas dari tidur', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'Tidur membantu sedikit tetapi tidak dapat diandalkan', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'Tidur yang baik biasanya membuat saya lebih stabil', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'Tidur yang baik jelas menambatkan keseimbangan emosional saya', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'Pertanyaan 18/20: Tingkat energi saya tetap stabil sepanjang hari.',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'Energi turun tajam sepanjang hari', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'Grafik energi saya adalah zigzag berkelanjutan', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'Energi sebagian besar stabil dengan penurunan ringan', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'Saya merasa berenergi secara berkelanjutan sebagian besar hari', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'Pertanyaan 19/20: Interaksi saya baru-baru ini membuat saya merasa terhubung dengan orang lain.',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'Kebanyakan interaksi yang menguras atau memutuskan', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'Pertukaran netral tanpa banyak perasaan', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'Umumnya momen hangat dan menghubungkan', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'Koneksi yang dalam dan bergizi dalam banyak interaksi', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'Pertanyaan 20/20: Hidup terasa lebih seperti pengalaman yang saya jalani, daripada sesuatu yang saya lewati begitu saja.',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'Seperti wallpaper latar belakang yang hampir tidak saya perhatikan', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'Seperti film yang saya tonton dari pinggir', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'Seperti permainan yang saya ikuti sesekali', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'Seperti petualangan yang terungkap yang saya menjadi bagian penuhnya', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function IndonesianQuizPage() {
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
    const savedAnswers = localStorage.getItem('indonesianQuizAnswers');
    const savedPage = localStorage.getItem('indonesianQuizCurrentPage');
    
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
      localStorage.setItem('indonesianQuizAnswers', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('indonesianQuizCurrentPage', currentPage.toString());
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
      localStorage.removeItem('indonesianQuizAnswers');
      localStorage.removeItem('indonesianQuizCurrentPage');
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
        Silakan jawab semua pertanyaan untuk melanjutkan
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              Kuis Selesai 🎉
            </h2>
            <p className="text-gray-600">
              Skor kebahagiaan Anda akan dihitung di langkah berikutnya.
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
            <span>Kembali ke Beranda</span>
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
              <h2 className="font-semibold mb-1 text-gray-800">{q.text}</h2>
              <p className="text-sm text-gray-500 mb-5">{q.subtext}</p>
              <div className="flex flex-col gap-3">
                {q.options.map((opt, idx) => {
                  const selected = answers[q.id] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleAnswer(q.id, idx)}
                      className="cursor-pointer px-4 py-2.5 rounded-2xl border flex gap-3 items-start transition-all hover:shadow-md"
                      style={{
                        backgroundColor: selected ? '#de0f3f' : '#fff',
                        color: selected ? '#fff' : '#333',
                        borderColor: selected ? '#de0f3f' : '#ddd',
                      }}
                    >
                      <span className="text-lg mt-0.5">{opt.emoji}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{opt.text}</div>
                        <div 
                          className="text-xs mt-0.5" 
                          style={{ 
                            color: selected ? 'rgba(255,255,255,0.8)' : '#888' 
                          }}
                        >
                          {opt.subtext}
                        </div>
                      </div>
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
          Kembali
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Selesai' : 'Berikutnya'}
        </button>
      </footer>
    </div>
  );
}