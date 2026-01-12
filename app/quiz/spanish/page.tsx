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
        textEs: 'P1/20: Cuando miro mi vida, se siente como...',
        textEn: 'Q1/20: When I look at my life, it feels like...',
        options: [
          { emoji: '🚀', textEs: 'Una historia que avanza en la dirección correcta', textEn: 'A story moving in the right direction' },
          { emoji: '🧩', textEs: 'Una historia que sigue perdiendo su trama', textEn: 'A story that keeps losing its plot' },
          { emoji: '📝', textEs: 'Un borrador con muchas ediciones pendientes', textEn: 'A rough draft with many edits pending' },
          { emoji: '🎬', textEs: 'Un guion que está mayormente en el camino correcto', textEn: 'A script that is mostly on track' },
          { emoji: '📖', textEs: 'Una narrativa que se desarrolla como debería', textEn: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        textEs: 'P2/20: Mi mundo interior se siente tranquilo y asentado independientemente de las situaciones externas.',
        textEn: 'Q2/20: My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', textEs: 'Como una lata de refresco agitada', textEn: 'Like a shaken soda can' },
          { emoji: '🏠', textEs: 'Como una habitación que se desordena y luego se reinicia', textEn: 'Like a room that gets messy and then reset' },
          { emoji: '💧', textEs: 'Como un estanque con ondas raras', textEn: 'Like a pond with rare ripples' },
          { emoji: '🌊', textEs: 'Como un lago profundo, mayormente quieto por dentro', textEn: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        textEs: 'P3/20: Me despierto con un sentido de dirección para el día que viene.',
        textEn: 'Q3/20: I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', textEs: 'En piloto automático, solo pasando por los movimientos', textEn: 'On autopilot, just going through motions' },
          { emoji: '🌫️', textEs: 'Con una idea vaga de qué hacer', textEn: 'With a vague idea of what to do' },
          { emoji: '🗺️', textEs: 'Con un plan de juego suelto en mente', textEn: 'With a loose game plan in mind' },
          { emoji: '🧭', textEs: 'Con una brújula interior clara para el día', textEn: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        textEs: 'P4/20: Mi vida actual se parece a la vida que una vez deseé.',
        textEn: 'Q4/20: My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', textEs: 'Como vivir en una casa que nunca elegí', textEn: 'Like living in a house I never chose' },
          { emoji: '🏠', textEs: 'Como una casa con algunas habitaciones correctas', textEn: 'Like a house with a few right rooms' },
          { emoji: '🏡', textEs: 'Como el hogar que había imaginado aproximadamente', textEn: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', textEs: 'Como caminar dentro de la vida que una vez dibujé en papel', textEn: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        textEs: 'P5/20: Mis pensamientos me empoderan más de lo que me agotan.',
        textEn: 'Q5/20: My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', textEs: 'Mayormente como crítica de fondo', textEn: 'Mostly like background criticism' },
          { emoji: '⚖️', textEs: 'Una mezcla de dudas y pequeñas charlas de ánimo', textEn: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', textEs: 'A menudo como un entrenador interior de apoyo', textEn: 'Often like a supportive inner coach' },
          { emoji: '📣', textEs: 'En gran medida como un equipo de animadoras interior constante', textEn: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        textEs: 'P6/20: Me siento inspirado...',
        textEn: 'Q6/20: I feel inspired…',
        options: [
          { emoji: '☁️', textEs: 'Casi nunca, la mayoría de los días se sienten planos', textEn: 'Almost never, most days feel flat' },
          { emoji: '⚡', textEs: 'Pequeñas chispas aparecen de vez en cuando', textEn: 'Small sparks show up once in a while' },
          { emoji: '🕯️', textEs: 'Un brillo suave está presente en muchos días', textEn: 'A gentle glow is present on many days' },
          { emoji: '🔥', textEs: 'Estallidos frecuentes que me mueven a actuar', textEn: 'Frequent bursts that move me to act' },
          { emoji: '☀️', textEs: 'Un fuego interior constante que me mantiene creando', textEn: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        textEs: 'P7/20: Cuando los planes cambian o se rompen, mi sentido de calma se ve afectado',
        textEn: 'Q7/20: When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', textEs: 'Me derrumbo emocionalmente cuando los planes cambian', textEn: 'I crash emotionally when plans change' },
          { emoji: '😰', textEs: 'Me sacudo mucho y permanezco molesto', textEn: 'I get badly shaken and stay upset' },
          { emoji: '🌀', textEs: 'Me tambaleo pero recupero el equilibrio', textEn: 'I wobble but regain balance' },
          { emoji: '🧘', textEs: 'Me ajusto con leve incomodidad', textEn: 'I adjust with mild discomfort' },
          { emoji: '🎯', textEs: 'Me mantengo centrado y simplemente reencamino', textEn: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        textEs: 'P8/20: Me siento mentalmente presente y absorto en lo que hago.',
        textEn: 'Q8/20: I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', textEs: 'Mayormente en silencio, la mente está en otra parte', textEn: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', textEs: 'Mitad aquí, mitad en lo siguiente', textEn: 'Half here, half on the next thing' },
          { emoji: '👁️', textEs: 'Generalmente presente con algunos deslices', textEn: 'Generally present with a few slips' },
          { emoji: '⏰', textEs: 'Inmerso lo suficiente como para perder la noción del tiempo', textEn: 'Immersed enough to lose track of time' },
          { emoji: '✨', textEs: 'Profundamente absorto, la vida se siente vívida', textEn: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        textEs: 'P9/20: Mi futuro aparece como...',
        textEn: 'Q9/20: My future appears as…',
        options: [
          { emoji: '🌑', textEs: 'Un corredor con las luces apagadas', textEn: 'A corridor with lights switched off' },
          { emoji: '🌫️', textEs: 'Un carril neblinoso con contornos tenues', textEn: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', textEs: 'Un camino sinuoso con lámparas a intervalos', textEn: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', textEs: 'Una autopista abierta con señales claras', textEn: 'An open highway with clear signboards' },
          { emoji: '🌅', textEs: 'Un horizonte amplio con muchos caminos brillantes', textEn: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        textEs: 'P10/20: Mi vida me da retornos emocionales — alegría, orgullo, plenitud.',
        textEn: 'Q10/20: My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', textEs: 'Mayormente pérdidas emocionales o drenajes', textEn: 'Mostly emotional losses or drains' },
          { emoji: '💫', textEs: 'Algunos momentos dispersos de retorno', textEn: 'A few scattered moments of return' },
          { emoji: '⚖️', textEs: 'Una parte justa de alegría y plenitud', textEn: 'A fair share of joy and fulfilment' },
          { emoji: '📈', textEs: 'Retornos consistentes que se sienten valen el esfuerzo', textEn: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', textEs: 'Ricos dividendos emocionales en la mayoría de las áreas', textEn: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        textEs: 'P11/20: Crezco como persona con el tiempo.',
        textEn: 'Q11/20: I grow as a person with time.',
        options: [
          { emoji: '🔄', textEs: 'Me siento atrapado en repetición', textEn: 'I feel stuck on repeat' },
          { emoji: '📊', textEs: 'Solo crezco en saltos pequeños y raros', textEn: 'I grow only in small, rare jumps' },
          { emoji: '🌱', textEs: 'Puedo sentir un crecimiento interior constante', textEn: 'I can sense steady inner growth' },
          { emoji: '🌳', textEs: 'Sigo evolucionando de maneras notables', textEn: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        textEs: 'P12/20: El significado y el propósito guían mis decisiones.',
        textEn: 'Q12/20: Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', textEs: 'Mayormente la supervivencia y la urgencia me impulsan', textEn: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', textEs: 'A veces verifico si realmente importa', textEn: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', textEs: 'A menudo verifico la alineación con mi porqué', textEn: 'Often I check alignment with my why' },
          { emoji: '⭐', textEs: 'En gran medida mis elecciones siguen un propósito interior claro', textEn: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        textEs: 'P13/20: Ser yo mismo se siente cómodo.',
        textEn: 'Q13/20: Being myself feels comfortable.',
        options: [
          { emoji: '🎭', textEs: 'A menudo uso máscaras para pasar', textEn: 'I often wear masks to get through' },
          { emoji: '👥', textEs: 'Solo puedo ser yo mismo con unas pocas personas', textEn: 'I can be myself only with a few people' },
          { emoji: '😊', textEs: 'Soy mayormente yo mismo en la mayoría de los espacios', textEn: 'I am mostly myself in most spaces' },
          { emoji: '💯', textEs: 'Me siento como en casa en mi propia piel casi en todas partes', textEn: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        textEs: 'P14/20: Disfruto de mi propia compañía.',
        textEn: 'Q14/20: I enjoy my own company.',
        options: [
          { emoji: '🚫', textEs: 'Evito estar solo conmigo mismo', textEn: 'I avoid being alone with myself' },
          { emoji: '⏱️', textEs: 'Tolero mi propia compañía en pequeñas dosis', textEn: 'I tolerate my own company in small doses' },
          { emoji: '👍', textEs: 'Generalmente me gusta pasar tiempo conmigo mismo', textEn: 'I generally like spending time with myself' },
          { emoji: '💖', textEs: 'Genuinamente espero con ansias mi tiempo a solas', textEn: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        textEs: 'P15/20: Las personas se sienten emocionalmente seguras a mi alrededor.',
        textEn: 'Q15/20: People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', textEs: 'Las personas dudan en abrirse conmigo', textEn: 'People hesitate to open up to me' },
          { emoji: '🤐', textEs: 'Algunos comparten, pero con cautela', textEn: 'A few share, but cautiously' },
          { emoji: '🤗', textEs: 'Muchas personas confían en mí con facilidad', textEn: 'Many people confide in me with ease' },
          { emoji: '🛡️', textEs: 'A menudo soy la persona a la que la gente recurre primero', textEn: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        textEs: 'P16/20: Cuando pienso en días recientes, recuerdo momentos agradables.',
        textEn: 'Q16/20: When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', textEs: 'Lucho por recordar algo agradable', textEn: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', textEs: 'Algunos buenos momentos dispersos surgen', textEn: 'A few scattered good moments come up' },
          { emoji: '😌', textEs: 'Varios recuerdos cálidos surgen fácilmente', textEn: 'Several warm memories surface easily' },
          { emoji: '🌈', textEs: 'Muchos momentos agradables vívidos vienen a la mente a la vez', textEn: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        textEs: 'P17/20: Mi estabilidad emocional es mejor cuando mi calidad de sueño es buena.',
        textEn: 'Q17/20: My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', textEs: 'Mis estados de ánimo son inestables independientemente del sueño', textEn: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', textEs: 'El sueño ayuda un poco pero no de manera confiable', textEn: 'Sleep helps a little but not reliably' },
          { emoji: '😴', textEs: 'El buen sueño generalmente me mantiene más estable', textEn: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', textEs: 'El buen sueño claramente ancla mi equilibrio emocional', textEn: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        textEs: 'P18/20: Mis niveles de energía se mantienen estables durante el día.',
        textEn: 'Q18/20: My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', textEs: 'La energía cae bruscamente durante el día', textEn: 'Energy drops sharply through the day' },
          { emoji: '📊', textEs: 'Mi gráfico de energía es un zigzag continuo', textEn: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', textEs: 'La energía es mayormente estable con caídas leves', textEn: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', textEs: 'Me siento sosteniblemente energizado la mayor parte del día', textEn: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        textEs: 'P19/20: Mis interacciones recientes me han dejado sintiéndome conectado con otros.',
        textEn: 'Q19/20: My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', textEs: 'Mayormente interacciones agotadoras o desconectantes', textEn: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', textEs: 'Intercambios neutrales sin mucho sentimiento', textEn: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', textEs: 'Generalmente momentos cálidos y conectores', textEn: 'Generally warm and connecting moments' },
          { emoji: '💞', textEs: 'Conexiones profundas y nutritivas en muchas interacciones', textEn: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        textEs: 'P20/20: La vida se siente más como una experiencia en la que estoy comprometido, en lugar de algo por lo que simplemente paso.',
        textEn: 'Q20/20: Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', textEs: 'Como papel tapiz de fondo que apenas noto', textEn: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', textEs: 'Como una película que veo desde las líneas laterales', textEn: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', textEs: 'Como un juego al que me uno de vez en cuando', textEn: 'Like a game I join in now and then' },
          { emoji: '🎢', textEs: 'Como una aventura que se desarrolla de la que soy completamente parte', textEn: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function SpanishQuizPage() {
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
    const savedAnswers = localStorage.getItem('quizAnswersSpanish');
    const savedPage = localStorage.getItem('quizCurrentPageSpanish');
    
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
      localStorage.setItem('quizAnswersSpanish', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPageSpanish', currentPage.toString());
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
      localStorage.removeItem('quizAnswersSpanish');
      localStorage.removeItem('quizCurrentPageSpanish');
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
        Por favor responde todas las preguntas para continuar
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              Cuestionario Completado 🎉
            </h2>
            <p className="text-gray-600">
              Tu puntuación de felicidad se calculará a continuación.
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
            <span>Volver al Inicio</span>
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
              <div className="mb-5">
                <h2 className="font-bold text-gray-900 text-base mb-1">{q.textEs}</h2>
                <p className="text-gray-500 text-xs">{q.textEn}</p>
              </div>
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
                        <div className="text-sm font-medium">{opt.textEs}</div>
                        <div className={`text-xs mt-0.5 ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                          {opt.textEn}
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
          Atrás
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Finalizar' : 'Siguiente Paso'}
        </button>
      </footer>
    </div>
  );
}