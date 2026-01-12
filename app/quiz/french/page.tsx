"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

type AnswerMap = Record<string, number>;

const STORAGE_KEY = 'happiness-index-french-answers';

const questions = [
  {
    page: 1,
    questions: [
      {
        id: 'q1',
        text: 'Q 1/20 : Quand je regarde ma vie, elle ressemble à...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: 'Une histoire qui perd constamment son intrigue', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'Un brouillon avec de nombreuses modifications en attente', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'Un scénario qui est principalement sur la bonne voie', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'Un récit qui se déroule comme il se doit', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'Q 2/20 : Mon monde intérieur se sent calme et stable, indépendamment des situations extérieures.',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'Comme une canette de soda secouée', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'Comme une pièce qui se salit puis se réinitialise', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'Comme un étang avec de rares ondulations', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'Comme un lac profond, principalement calme à l\'intérieur', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'Q 3/20 : Je me réveille avec un sens de direction pour la journée à venir.',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'En pilote automatique, je passe simplement par les mouvements', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'Avec une idée vague de ce qu\'il faut faire', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'Avec un plan de jeu approximatif en tête', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'Avec une boussole intérieure claire pour la journée', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'Q 4/20 : Ma vie actuelle ressemble à la vie que j\'ai autrefois souhaitée.',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'Comme vivre dans une maison que je n\'ai jamais choisie', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'Comme une maison avec quelques bonnes pièces', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'Comme la maison que j\'avais grossièrement imaginée', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'Comme entrer dans la vie que j\'ai autrefois dessinée sur papier', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'Q 5/20 : Mes pensées me donnent plus de pouvoir qu\'elles ne m\'épuisent.',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'Principalement comme une critique de fond', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'Un mélange de doutes et de petits discours d\'encouragement', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'Souvent comme un coach intérieur de soutien', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'En grande partie comme une équipe d\'encouragement intérieure stable', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'Q 6/20 : Je me sens inspiré...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'Presque jamais, la plupart des jours semblent plats', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'De petites étincelles apparaissent de temps en temps', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'Une lueur douce est présente plusieurs jours', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'Des éclats fréquents qui me poussent à agir', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'Un feu intérieur constant qui me maintient en création', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'Q 7/20 : Lorsque les plans changent ou se brisent, mon sentiment de calme est affecté',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'Je m\'effondre émotionnellement quand les plans changent', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'Je suis gravement secoué et reste contrarié', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'Je vacille mais retrouve l\'équilibre', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'Je m\'adapte avec un léger inconfort', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'Je reste centré et je trace simplement une nouvelle route', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'Q 8/20 : Je me sens mentalement présent et absorbé dans ce que je fais.',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'Principalement en sourdine, l\'esprit est ailleurs', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'Moitié ici, moitié sur la prochaine chose', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'Généralement présent avec quelques oublis', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'Suffisamment immergé pour perdre la notion du temps', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'Profondément absorbé, la vie semble vivante', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'Q 9/20 : Mon avenir apparaît comme...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: 'Un couloir avec les lumières éteintes', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'Une ruelle brumeuse avec des contours faibles', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'Une route sinueuse avec des lampes à intervalles', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'Une autoroute ouverte avec des panneaux clairs', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'Un large horizon avec de nombreux chemins lumineux', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'Q 10/20 : Ma vie me donne des retours émotionnels — joie, fierté, accomplissement.',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'Principalement des pertes émotionnelles ou des drains', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'Quelques moments dispersés de retour', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'Une part équitable de joie et d\'accomplissement', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'Des retours constants qui semblent valoir l\'effort', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'De riches dividendes émotionnels dans la plupart des domaines', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'Q 11/20 : Je grandis en tant que personne avec le temps.',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'Je me sens coincé en répétition', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'Je ne grandis que par petits sauts rares', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'Je peux sentir une croissance intérieure constante', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'Je continue d\'évoluer de manière notable', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'Q 12/20 : Le sens et le but guident mes décisions.',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'Principalement la survie et l\'urgence me conduisent', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'Parfois je vérifie si cela compte vraiment', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'Souvent je vérifie l\'alignement avec mon pourquoi', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'En grande partie mes choix suivent un but intérieur clair', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'Q 13/20 : Être moi-même semble confortable.',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'Je porte souvent des masques pour passer', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: 'Je ne peux être moi-même qu\'avec quelques personnes', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'Je suis principalement moi-même dans la plupart des espaces', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'Je me sens chez moi dans ma peau presque partout', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'Q 14/20 : J\'apprécie ma propre compagnie.',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'J\'évite d\'être seul avec moi-même', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'Je tolère ma propre compagnie à petites doses', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'J\'aime généralement passer du temps avec moi-même', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'J\'attends vraiment avec impatience mon temps seul', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'Q 15/20 : Les gens se sentent émotionnellement en sécurité autour de moi.',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'Les gens hésitent à s\'ouvrir à moi', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'Quelques-uns partagent, mais avec prudence', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'Beaucoup de gens me font confiance facilement', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'Je suis souvent la personne vers qui les gens se tournent en premier', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'Q 16/20 : Quand je pense aux jours récents, je me souviens de moments agréables.',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'Je lutte pour me souvenir de quelque chose d\'agréable', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'Quelques bons moments dispersés me viennent', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'Plusieurs souvenirs chaleureux surgissent facilement', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'De nombreux moments agréables vifs me viennent à l\'esprit à la fois', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'Q 17/20 : Ma stabilité émotionnelle est meilleure lorsque ma qualité de sommeil est bonne.',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'Mes humeurs sont instables indépendamment du sommeil', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'Le sommeil aide un peu mais pas de manière fiable', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'Un bon sommeil me maintient généralement plus stable', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'Un bon sommeil ancre clairement mon équilibre émotionnel', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'Q 18/20 : Mes niveaux d\'énergie restent stables tout au long de la journée.',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'L\'énergie chute fortement tout au long de la journée', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'Mon graphique d\'énergie est un zigzag continu', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'L\'énergie est principalement stable avec de légères baisses', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'Je me sens durablement énergisé la plupart de la journée', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'Q 19/20 : Mes interactions récentes m\'ont laissé me sentir connecté aux autres.',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'Principalement des interactions épuisantes ou déconnectantes', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'Échanges neutres sans beaucoup de sentiment', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'Généralement des moments chaleureux et connectants', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'Connexions profondes et nourrissantes dans de nombreuses interactions', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'Q 20/20 : La vie ressemble plus à une expérience dans laquelle je suis engagé, plutôt qu\'à quelque chose que je traverse simplement.',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'Comme un papier peint de fond que je remarque à peine', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'Comme un film que je regarde depuis la touche', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'Comme un jeu auquel je participe de temps en temps', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'Comme une aventure qui se déroule dont je fais pleinement partie', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function FrenchQuizPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showAlert, setShowAlert] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const totalPages = 10;
  const currentQuestions =
    questions.find(p => p.page === currentPage)?.questions || [];

  // Load saved answers from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem(STORAGE_KEY);
      if (savedAnswers) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setAnswers(JSON.parse(savedAnswers));
        } catch (e) {
          console.error('Failed to load saved answers:', e);
        }
      }
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

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
    }
  };

  const movePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(p => p - 1);
      scrollToTop();
    }
  };

  const handleBackToHome = () => {
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
        Veuillez répondre à toutes les questions pour continuer
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              Quiz Terminé 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              Votre score de bonheur sera calculé lors de la prochaine étape, en fonction de vos réponses.
            </p>
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-[#de0f3f] hover:bg-[#c00d37] text-white rounded-full font-semibold transition-colors"
            >
              Retour à l&apos;accueil
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
            onClick={handleBackToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
          >
            <span>←</span>
            <span>Accueil</span>
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
          Précédent
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Terminer' : 'Suivant'}
        </button>
      </footer>
    </div>
  );
}