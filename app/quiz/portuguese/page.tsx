'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type AnswerMap = Record<string, number>;

const questions = [
  {
    page: 1,
    questions: [
      {
        id: 'q1',
        text: 'Pergunta 1/20: Quando olho para minha vida, parece...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: 'Uma história que continua perdendo seu enredo', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'Um rascunho com muitas edições pendentes', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'Um roteiro que está principalmente no caminho certo', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'Uma narrativa se desenrolando como deveria', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'Pergunta 2/20: Meu mundo interior se sente calmo e estável independentemente das situações externas.',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'Como uma lata de refrigerante agitada', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'Como um quarto que fica bagunçado e depois é reorganizado', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'Como uma lagoa com ondulações raras', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'Como um lago profundo, principalmente calmo por dentro', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'Pergunta 3/20: Acordo com um senso de direção para o dia seguinte.',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'No piloto automático, apenas passando pelos movimentos', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'Com uma ideia vaga do que fazer', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'Com um plano de jogo solto em mente', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'Com uma bússola interna clara para o dia', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'Pergunta 4/20: Minha vida atual se assemelha à vida que uma vez desejei.',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'Como viver em uma casa que nunca escolhi', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'Como uma casa com alguns quartos certos', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'Como a casa que imaginei aproximadamente', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'Como caminhar dentro da vida que uma vez desenhei no papel', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'Pergunta 5/20: Meus pensamentos me capacitam mais do que me drenam.',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'Principalmente como crítica de fundo', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'Uma mistura de dúvidas e pequenas conversas motivacionais', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'Frequentemente como um treinador interno de apoio', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'Em grande parte como uma torcida interna constante', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'Pergunta 6/20: Sinto-me inspirado...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'Quase nunca, a maioria dos dias parece plana', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'Pequenas faíscas aparecem de vez em quando', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'Um brilho suave está presente em muitos dias', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'Explosões frequentes que me movem para agir', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'Um fogo interno constante que me mantém criando', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'Pergunta 7/20: Quando os planos mudam ou quebram, meu senso de calma é afetado',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'Eu desmorono emocionalmente quando os planos mudam', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'Fico muito abalado e permaneço chateado', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'Eu vacilo mas recupero o equilíbrio', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'Eu me ajusto com leve desconforto', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'Permaneço centrado e simplesmente redefino a rota', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'Pergunta 8/20: Sinto-me mentalmente presente e absorvido no que faço.',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'Principalmente no mudo, mente está em outro lugar', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'Metade aqui, metade na próxima coisa', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'Geralmente presente com alguns deslizes', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'Imerso o suficiente para perder a noção do tempo', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'Profundamente absorvido, a vida parece vívida', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'Pergunta 9/20: Meu futuro aparece como...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: 'Um corredor com luzes apagadas', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'Uma pista nebulosa com contornos fracos', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'Uma estrada sinuosa com lâmpadas em intervalos', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'Uma rodovia aberta com placas claras', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'Um horizonte amplo com muitos caminhos brilhantes', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'Pergunta 10/20: Minha vida me dá retornos emocionais — alegria, orgulho, realização.',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'Principalmente perdas emocionais ou drenos', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'Alguns momentos dispersos de retorno', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'Uma parcela justa de alegria e realização', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'Retornos consistentes que parecem valer o esforço', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'Dividendos emocionais ricos na maioria das áreas', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'Pergunta 11/20: Eu cresço como pessoa com o tempo.',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'Sinto-me preso na repetição', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'Cresço apenas em pequenos saltos raros', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'Posso sentir crescimento interno constante', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'Continuo evoluindo de maneiras perceptíveis', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'Pergunta 12/20: Significado e propósito guiam minhas decisões.',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'Principalmente sobrevivência e urgência me impulsionam', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'Às vezes verifico se realmente importa', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'Frequentemente verifico o alinhamento com meu "porquê"', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'Em grande parte minhas escolhas seguem um propósito interno claro', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'Pergunta 13/20: Ser eu mesmo parece confortável.',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'Frequentemente uso máscaras para passar', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: 'Posso ser eu mesmo apenas com algumas pessoas', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'Sou principalmente eu mesmo na maioria dos espaços', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'Sinto-me em casa na minha própria pele em quase todos os lugares', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'Pergunta 14/20: Eu aprecio minha própria companhia.',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'Evito ficar sozinho comigo mesmo', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'Tolero minha própria companhia em pequenas doses', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'Geralmente gosto de passar tempo comigo mesmo', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'Realmente espero ansiosamente meu tempo sozinho', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'Pergunta 15/20: As pessoas se sentem emocionalmente seguras ao meu redor.',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'As pessoas hesitam em se abrir comigo', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'Alguns compartilham, mas com cautela', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'Muitas pessoas confiam em mim com facilidade', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'Frequentemente sou a pessoa a quem as pessoas recorrem primeiro', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'Pergunta 16/20: Quando penso nos dias recentes, recordo momentos agradáveis.',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'Luto para recordar qualquer coisa agradável', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'Alguns bons momentos dispersos surgem', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'Várias memórias calorosas surgem facilmente', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'Muitos momentos agradáveis vívidos vêm à mente de uma vez', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'Pergunta 17/20: Minha estabilidade emocional é melhor quando minha qualidade de sono é boa.',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'Meus humores são instáveis independentemente do sono', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'O sono ajuda um pouco, mas não de forma confiável', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'Bom sono geralmente me mantém mais estável', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'Bom sono claramente ancora meu equilíbrio emocional', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'Pergunta 18/20: Meus níveis de energia permanecem estáveis ao longo do dia.',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'A energia cai drasticamente ao longo do dia', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'Meu gráfico de energia é um zigue-zague contínuo', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'A energia é principalmente estável com quedas leves', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'Sinto-me energizado de forma sustentável a maior parte do dia', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'Pergunta 19/20: Minhas interações recentemente me deixaram sentindo conectado aos outros.',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'Principalmente interações desgastantes ou desconectantes', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'Trocas neutras sem muito sentimento', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'Geralmente momentos calorosos e conectivos', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'Conexões profundas e nutritivas em muitas interações', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'Pergunta 20/20: A vida parece mais uma experiência na qual estou engajado, em vez de algo pelo qual simplesmente passo.',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'Como papel de parede de fundo que mal noto', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'Como um filme que assisto das laterais', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'Como um jogo no qual participo de vez em quando', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'Como uma aventura se desenrolando da qual faço parte completamente', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function PortugueseQuizPage() {
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
    const savedAnswers = localStorage.getItem('quizAnswers_pt');
    const savedPage = localStorage.getItem('quizCurrentPage_pt');
    
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
      localStorage.setItem('quizAnswers_pt', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPage_pt', currentPage.toString());
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
      localStorage.removeItem('quizAnswers_pt');
      localStorage.removeItem('quizCurrentPage_pt');
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
        Por favor, responda todas as perguntas para continuar
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              Questionário Completo 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              Sua pontuação de felicidade será calculada na próxima etapa.
            </p>
            <button
              onClick={goBackHome}
              className="px-6 py-3 rounded-full bg-[#de0f3f] text-white font-semibold hover:bg-[#c00d37] transition-colors"
            >
              Voltar para Início
            </button>
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
            <span>Voltar para Início</span>
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
          Anterior
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Concluir' : 'Próximo'}
        </button>
      </footer>
    </div>
  );
}