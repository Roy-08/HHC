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
        text: 'Вопрос 1/20: Когда я смотрю на свою жизнь, она кажется...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: 'История, которая продолжает терять свой сюжет', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'Черновик с множеством ожидающих правок', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'Сценарий, который в основном на правильном пути', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'Повествование, разворачивающееся так, как должно', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'Вопрос 2/20: Мой внутренний мир ощущается спокойным и устойчивым независимо от внешних ситуаций.',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'Как встряхнутая банка газировки', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'Как комната, которая становится грязной, а затем сбрасывается', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'Как пруд с редкой рябью', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'Как глубокое озеро, в основном спокойное внутри', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'Вопрос 3/20: Я просыпаюсь с чувством направления на предстоящий день.',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'На автопилоте, просто проходя через движения', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'С расплывчатым представлением о том, что делать', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'С неплотным игровым планом в уме', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'С четким внутренним компасом на день', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'Вопрос 4/20: Моя нынешняя жизнь напоминает жизнь, о которой я когда-то мечтал.',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'Как жить в доме, который я никогда не выбирал', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'Как дом с несколькими правильными комнатами', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'Как дом, который я примерно представлял', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'Как прогулка внутри жизни, которую я когда-то нарисовал на бумаге', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'Вопрос 5/20: Мои мысли дают мне силы больше, чем истощают меня.',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'В основном как фоновая критика', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'Смесь сомнений и небольших мотивационных разговоров', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'Часто как поддерживающий внутренний тренер', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'В основном как устойчивая внутренняя группа поддержки', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'Вопрос 6/20: Я чувствую вдохновение...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'Почти никогда, большинство дней кажутся плоскими', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'Маленькие искры появляются время от времени', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'Нежное свечение присутствует во многие дни', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'Частые всплески, которые побуждают меня действовать', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'Устойчивый внутренний огонь, который заставляет меня творить', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'Вопрос 7/20: Когда планы меняются или ломаются, мое чувство спокойствия затрагивается',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'Я эмоционально разрушаюсь, когда планы меняются', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'Я сильно потрясен и остаюсь расстроенным', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'Я колеблюсь, но восстанавливаю баланс', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'Я приспосабливаюсь с легким дискомфортом', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'Я остаюсь сосредоточенным и просто перенаправляюсь', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'Вопрос 8/20: Я чувствую себя ментально присутствующим и поглощенным тем, что делаю.',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'В основном на беззвучном режиме, ум где-то еще', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'Наполовину здесь, наполовину на следующем деле', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'Обычно присутствую с несколькими промахами', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'Достаточно погружен, чтобы потерять счет времени', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'Глубоко поглощен, жизнь кажется яркой', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'Вопрос 9/20: Мое будущее выглядит как...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: 'Коридор с выключенным светом', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'Туманная дорожка с слабыми очертаниями', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'Извилистая дорога с лампами через интервалы', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'Открытое шоссе с четкими указателями', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'Широкий горизонт со многими яркими путями', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'Вопрос 10/20: Моя жизнь дает мне эмоциональные возвраты — радость, гордость, удовлетворение.',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'В основном эмоциональные потери или истощение', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'Несколько разрозненных моментов возврата', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'Справедливая доля радости и удовлетворения', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'Последовательные возвраты, которые кажутся стоящими усилий', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'Богатые эмоциональные дивиденды в большинстве областей', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'Вопрос 11/20: Я расту как личность со временем.',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'Я чувствую себя застрявшим в повторении', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'Я расту только небольшими редкими скачками', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'Я могу ощутить устойчивый внутренний рост', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'Я продолжаю развиваться заметными способами', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'Вопрос 12/20: Смысл и цель направляют мои решения.',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'В основном выживание и срочность движут мной', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'Иногда я проверяю, действительно ли это важно', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'Часто я проверяю соответствие с моим "почему"', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'В основном мои выборы следуют четкой внутренней цели', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'Вопрос 13/20: Быть собой кажется комфортным.',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'Я часто ношу маски, чтобы пройти', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: 'Я могу быть собой только с несколькими людьми', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'Я в основном сам в большинстве пространств', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'Я чувствую себя как дома в своей собственной коже почти везде', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'Вопрос 14/20: Мне нравится моя собственная компания.',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'Я избегаю быть наедине с собой', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'Я терплю свою собственную компанию в небольших дозах', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'Мне обычно нравится проводить время с собой', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'Я искренне с нетерпением жду своего времени в одиночестве', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'Вопрос 15/20: Люди чувствуют себя эмоционально безопасно рядом со мной.',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'Люди колеблются открыться мне', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'Немногие делятся, но осторожно', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'Многие люди доверяют мне с легкостью', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'Я часто человек, к которому люди обращаются в первую очередь', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'Вопрос 16/20: Когда я думаю о последних днях, я вспоминаю приятные моменты.',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'Мне трудно вспомнить что-либо приятное', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'Несколько разрозненных хороших моментов появляются', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'Несколько теплых воспоминаний всплывают легко', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'Многие яркие приятные моменты приходят на ум сразу', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'Вопрос 17/20: Моя эмоциональная стабильность лучше, когда качество моего сна хорошее.',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'Мои настроения нестабильны независимо от сна', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'Сон помогает немного, но не надежно', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'Хороший сон обычно держит меня более устойчивым', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'Хороший сон явно закрепляет мой эмоциональный баланс', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'Вопрос 18/20: Мои уровни энергии остаются стабильными в течение дня.',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'Энергия резко падает в течение дня', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'Мой график энергии - это непрерывный зигзаг', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'Энергия в основном стабильна с легкими падениями', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'Я чувствую себя устойчиво энергичным большую часть дня', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'Вопрос 19/20: Мои взаимодействия недавно оставили меня чувствующим связь с другими.',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'В основном истощающие или разъединяющие взаимодействия', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'Нейтральные обмены без особого чувства', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'Обычно теплые и соединяющие моменты', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'Глубокие, питательные связи во многих взаимодействиях', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'Вопрос 20/20: Жизнь кажется больше опытом, в который я вовлечен, а не чем-то, через что я просто прохожу.',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'Как фоновые обои, которые я едва замечаю', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'Как фильм, который я смотрю со стороны', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'Как игра, в которую я присоединяюсь время от времени', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'Как разворачивающееся приключение, частью которого я полностью являюсь', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function RussianQuizPage() {
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
    const savedAnswers = localStorage.getItem('quizAnswersRussian');
    const savedPage = localStorage.getItem('quizCurrentPageRussian');
    
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
      localStorage.setItem('quizAnswersRussian', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPageRussian', currentPage.toString());
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
      setShowComplete(true);
      // Clear saved data when quiz is completed
      localStorage.removeItem('quizAnswersRussian');
      localStorage.removeItem('quizCurrentPageRussian');
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
        Пожалуйста, ответьте на все вопросы, чтобы продолжить
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              Викторина завершена 🎉
            </h2>
            <p className="text-gray-600">
              Ваш показатель счастья будет рассчитан на следующем этапе.
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
            <span>Вернуться на главную</span>
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
          Назад
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Завершить' : 'Далее'}
        </button>
      </footer>
    </div>
  );
}