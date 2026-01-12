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
        text: 'Frage 1/20: Wenn ich auf mein Leben schaue, fühlt es sich an wie...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: 'Eine Geschichte, die ständig ihre Handlung verliert', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'Ein Entwurf mit vielen ausstehenden Bearbeitungen', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'Ein Drehbuch, das größtenteils auf Kurs ist', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'Eine Erzählung, die sich so entfaltet, wie sie sollte', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'Frage 2/20: Meine innere Welt fühlt sich ruhig und gefestigt an, unabhängig von äußeren Situationen.',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'Wie eine geschüttelte Limonadendose', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'Wie ein Raum, der unordentlich wird und dann zurückgesetzt wird', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'Wie ein Teich mit seltenen Wellen', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'Wie ein tiefer See, innerlich meist still', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'Frage 3/20: Ich wache mit einem Richtungsgefühl für den bevorstehenden Tag auf.',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'Auf Autopilot, gehe nur durch Bewegungen', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'Mit einer vagen Vorstellung, was zu tun ist', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'Mit einem lockeren Spielplan im Kopf', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'Mit einem klaren inneren Kompass für den Tag', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'Frage 4/20: Mein gegenwärtiges Leben ähnelt dem Leben, das ich mir einst gewünscht habe.',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'Wie in einem Haus zu leben, das ich nie gewählt habe', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'Wie ein Haus mit ein paar richtigen Räumen', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'Wie das Zuhause, das ich mir grob vorgestellt hatte', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'Wie in das Leben zu gehen, das ich einst auf Papier gezeichnet habe', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'Frage 5/20: Meine Gedanken stärken mich mehr, als dass sie mich erschöpfen.',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'Meist wie Hintergrundkritik', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'Eine Mischung aus Zweifeln und kleinen Aufmunterungen', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'Oft wie ein unterstützender innerer Coach', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'Weitgehend wie ein stetiges inneres Cheerleader-Team', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'Frage 6/20: Ich fühle mich inspiriert...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'Fast nie, die meisten Tage fühlen sich flach an', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'Kleine Funken tauchen ab und zu auf', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'An vielen Tagen ist ein sanftes Leuchten vorhanden', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'Häufige Ausbrüche, die mich zum Handeln bewegen', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'Ein stetiges inneres Feuer, das mich am Schaffen hält', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'Frage 7/20: Wenn sich Pläne verschieben oder brechen, wird mein Gefühl der Ruhe beeinflusst',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'Ich breche emotional zusammen, wenn sich Pläne ändern', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'Ich werde stark erschüttert und bleibe aufgewühlt', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'Ich wackle, aber gewinne das Gleichgewicht zurück', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'Ich passe mich mit leichtem Unbehagen an', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'Ich bleibe zentriert und plane einfach neu', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'Frage 8/20: Ich fühle mich geistig präsent und vertieft in das, was ich tue.',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'Meist stumm geschaltet, Geist ist woanders', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'Halb hier, halb beim nächsten Ding', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'Allgemein präsent mit ein paar Aussetzern', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'Vertieft genug, um die Zeit zu verlieren', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'Tief versunken, das Leben fühlt sich lebendig an', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'Frage 9/20: Meine Zukunft erscheint als...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: 'Ein Korridor mit ausgeschalteten Lichtern', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'Eine neblige Gasse mit schwachen Umrissen', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'Eine kurvenreiche Straße mit Lampen in Abständen', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'Eine offene Autobahn mit klaren Schildern', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'Ein weiter Horizont mit vielen hellen Wegen', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'Frage 10/20: Mein Leben gibt mir emotionale Erträge — Freude, Stolz, Erfüllung.',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'Meist emotionale Verluste oder Erschöpfung', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'Ein paar verstreute Momente der Rückkehr', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'Ein fairer Anteil an Freude und Erfüllung', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'Beständige Erträge, die sich lohnen', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'Reiche emotionale Dividenden in den meisten Bereichen', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'Frage 11/20: Ich wachse als Person mit der Zeit.',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'Ich fühle mich auf Wiederholung festgefahren', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'Ich wachse nur in kleinen, seltenen Sprüngen', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'Ich kann stetiges inneres Wachstum spüren', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'Ich entwickle mich auf bemerkenswerte Weise weiter', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'Frage 12/20: Bedeutung und Zweck leiten meine Entscheidungen.',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'Meist treiben mich Überleben und Dringlichkeit an', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'Manchmal überprüfe ich, ob es wirklich wichtig ist', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'Oft überprüfe ich die Ausrichtung mit meinem Warum', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'Weitgehend folgen meine Entscheidungen einem klaren inneren Zweck', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'Frage 13/20: Ich selbst zu sein fühlt sich bequem an.',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'Ich trage oft Masken, um durchzukommen', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: 'Ich kann nur bei wenigen Menschen ich selbst sein', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'Ich bin in den meisten Räumen meist ich selbst', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'Ich fühle mich fast überall in meiner Haut zu Hause', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'Frage 14/20: Ich genieße meine eigene Gesellschaft.',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'Ich vermeide es, allein mit mir selbst zu sein', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'Ich toleriere meine eigene Gesellschaft in kleinen Dosen', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'Ich verbringe im Allgemeinen gerne Zeit mit mir selbst', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'Ich freue mich wirklich auf meine Alleinzeit', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'Frage 15/20: Menschen fühlen sich in meiner Nähe emotional sicher.',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'Menschen zögern, sich mir zu öffnen', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'Einige teilen, aber vorsichtig', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'Viele Menschen vertrauen mir leicht', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'Ich bin oft die Person, an die sich Menschen zuerst wenden', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'Frage 16/20: Wenn ich an die letzten Tage denke, erinnere ich mich an angenehme Momente.',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'Ich habe Schwierigkeiten, mich an etwas Angenehmes zu erinnern', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'Ein paar verstreute gute Momente tauchen auf', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'Mehrere warme Erinnerungen tauchen leicht auf', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'Viele lebendige angenehme Momente kommen gleichzeitig in den Sinn', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'Frage 17/20: Meine emotionale Stabilität ist besser, wenn meine Schlafqualität gut ist.',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'Meine Stimmungen sind unabhängig vom Schlaf instabil', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'Schlaf hilft ein wenig, aber nicht zuverlässig', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'Guter Schlaf hält mich normalerweise stabiler', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'Guter Schlaf verankert eindeutig meine emotionale Balance', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'Frage 18/20: Mein Energieniveau bleibt den ganzen Tag über stabil.',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'Energie fällt im Laufe des Tages stark ab', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'Mein Energiegraph ist ein kontinuierliches Zickzack', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'Energie ist meist stabil mit leichten Einbrüchen', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'Ich fühle mich den größten Teil des Tages nachhaltig energiegeladen', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'Frage 19/20: Meine Interaktionen haben mich in letzter Zeit mit anderen verbunden fühlen lassen.',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'Meist erschöpfende oder trennende Interaktionen', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'Neutrale Austausche ohne viel Gefühl', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'Allgemein warme und verbindende Momente', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'Tiefe, nährende Verbindungen in vielen Interaktionen', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'Frage 20/20: Das Leben fühlt sich mehr wie eine Erfahrung an, an der ich beteiligt bin, als etwas, durch das ich einfach hindurchgehe.',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'Wie Hintergrundtapete, die ich kaum bemerke', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'Wie ein Film, den ich von der Seitenlinie aus beobachte', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'Wie ein Spiel, an dem ich ab und zu teilnehme', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'Wie ein sich entfaltendes Abenteuer, an dem ich voll teilhabe', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function GermanQuizPage() {
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
    const savedAnswers = localStorage.getItem('germanQuizAnswers');
    const savedPage = localStorage.getItem('germanQuizCurrentPage');
    
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
      localStorage.setItem('germanQuizAnswers', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('germanQuizCurrentPage', currentPage.toString());
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
      localStorage.removeItem('germanQuizAnswers');
      localStorage.removeItem('germanQuizCurrentPage');
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
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ALERT */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-white shadow-xl border transition-all duration-500 z-50 ${
          showAlert ? 'top-5' : '-top-32'
        }`}
        style={{ color: '#de0f3f' }}
      >
        Bitte beantworten Sie alle Fragen, um fortzufahren
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              Quiz abgeschlossen 🎉
            </h2>
            <p className="text-gray-600">
              Ihr Glücksindex wird im nächsten Schritt berechnet.
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
            <span>Zurück zur Startseite</span>
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
          Zurück
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Fertig' : 'Weiter'}
        </button>
      </footer>
    </div>
  );
}