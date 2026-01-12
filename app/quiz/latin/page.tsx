"use client";

import { useState } from 'react';

type AnswerMap = Record<string, number>;

const questions = [
  {
    page: 1,
    questions: [
      {
        id: 'q1',
        text: 'Quaestio 1/20: Cum vitam meam aspicio, videtur...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: 'Fabula quae argumentum suum amittere pergit', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'Exemplar asperum cum multis emendationibus pendentibus', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'Scriptum quod maxime in via recta est', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'Narratio quae explicatur sicut debet', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'Quaestio 2/20: Mundus meus interior tranquillus et stabilis sentitur sine respectu rerum exteriorum.',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'Sicut pyxis sodae agitata', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'Sicut camera quae sordida fit et deinde restituitur', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'Sicut stagnum cum raris undulis', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'Sicut lacus profundus, maxime quietus intus', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'Quaestio 3/20: Expergiscor cum sensu directionis pro die futuro.',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'In autopiloto, tantum per motus transiens', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'Cum vaga idea quid facere', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'Cum laxo consilio ludi in mente', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'Cum clara pyxide interiore pro die', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'Quaestio 4/20: Vita mea praesens similatur vitae quam olim optavi.',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'Sicut vivere in domo quam numquam elegi', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'Sicut domus cum paucis cameris rectis', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'Sicut domus quam aspere imaginatus sum', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'Sicut ambulare intra vitam quam olim in charta pinxi', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'Quaestio 5/20: Cogitationes meae me potentiorem faciunt quam exhauriunt.',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'Maxime sicut critica in fundo', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'Mixtura dubitationum et parvarum exhortationum', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'Saepe sicut magister interior sustinens', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'Magna ex parte sicut stabilis cohors interior exhortans', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'Quaestio 6/20: Inspiratus sentio...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'Fere numquam, plurimi dies plani videntur', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'Parvae scintillae interdum apparent', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'Lenis fulgor multis diebus adest', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'Frequentes eruptiones quae me ad agendum movent', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'Stabilis ignis interior qui me creantem servat', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'Quaestio 7/20: Cum consilia mutantur vel franguntur, sensus meus tranquillitatis afficitur',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'Emotionaliter corruo cum consilia mutantur', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'Graviter concutior et turbatus maneo', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'Vacillo sed aequilibrium recupero', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'Me accommodo cum levi incommodo', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'Centratus maneo et simpliciter viam muto', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'Quaestio 8/20: Mentaliter praesens et absorptus in eo quod facio sentio.',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'Maxime in silentio, mens alibi est', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'Dimidium hic, dimidium in re proxima', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'Generaliter praesens cum paucis lapsis', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'Satis immersus ut notionem temporis amittam', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'Profunde absorptus, vita vivida videtur', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'Quaestio 9/20: Futurum meum apparet sicut...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: 'Corridor cum luminibus exstinctis', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'Via nebulosa cum tenuibus lineamentis', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'Via tortuosa cum lucernis per intervalla', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'Via publica aperta cum claris titulis', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'Horizon latus cum multis viis claris', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'Quaestio 10/20: Vita mea mihi reditus emotionales dat — gaudium, superbiam, completionem.',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'Maxime damna emotionalia vel exhausta', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'Pauca momenta dispersa reditus', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'Aequa pars gaudii et completionis', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'Constantes reditus qui digni conatu videntur', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'Divitiae dividenda emotionalia in plurimis partibus', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'Quaestio 11/20: Cresco ut persona cum tempore.',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'Sentio me haerere in iteratione', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'Cresco tantum in parvis raris saltibus', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'Possum sentire stabilem incrementum interius', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'Pergo evolvere modis notabilibus', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'Quaestio 12/20: Significatio et propositum decisiones meas ducunt.',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'Maxime superviventia et urgentia me impellunt', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'Interdum examino an vere referat', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'Saepe examino consonantiam cum meo "cur"', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'Magna ex parte electiones meae sequuntur clarum propositum interius', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'Quaestio 13/20: Esse me ipsum commodum videtur.',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'Saepe personas gero ut transeam', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: 'Possum esse me ipsum tantum cum paucis hominibus', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'Sum maxime me ipsum in plurimis spatiis', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'Sentio me domi in mea ipsius cute fere ubique', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'Quaestio 14/20: Fruor mea ipsius comitatu.',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'Vito esse solus mecum ipso', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'Tolero meum ipsum comitatum in parvis dosibus', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'Generaliter amo tempus consumere mecum ipso', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'Vere exspecto meum tempus solum', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'Quaestio 15/20: Homines se emotionaliter tutos circa me sentiunt.',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'Homines dubitant se aperire mihi', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'Pauci communicant, sed caute', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'Multi homines mihi confidunt cum facilitate', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'Saepe sum persona ad quam homines primo se vertunt', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'Quaestio 16/20: Cum de diebus recentibus cogito, momenta iucunda recordor.',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'Luctor recordari quidquam iucundum', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'Pauca momenta bona dispersa surgunt', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'Plures calidae memoriae facile emergunt', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'Multa vivida momenta iucunda simul in mentem veniunt', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'Quaestio 17/20: Stabilitas mea emotionalis melior est cum qualitas somni mei bona est.',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'Modi mei instabiles sunt sine respectu somni', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'Somnus paulum adiuvat sed non fideliter', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'Bonus somnus me stabilem servat', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'Bonus somnus clare aequilibrium meum emotionale ancora', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'Quaestio 18/20: Gradus energiae meae stabiles per diem manent.',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'Energia acriter cadit per diem', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'Graphicum energiae meae est continuum zigzag', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'Energia maxime stabilis est cum levibus descensibus', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'Sentio me sustentabiliter energicum plurimam partem diei', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'Quaestio 19/20: Interactiones meae nuper me conexum cum aliis sentientem reliquerunt.',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'Maxime interactiones exhaurientes vel disconectentes', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'Mutationes neutrales sine multo sensu', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'Generaliter momenta calida et conectentia', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'Conexiones profundae et nutrientes in multis interactionibus', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'Quaestio 20/20: Vita magis videtur sicut experientia in qua sum occupatus, potius quam res per quam simpliciter transeo.',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'Sicut tapetum in fundo quod vix animadverto', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'Sicut cinematographum quod specto a lateribus', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'Sicut ludus cui interdum me iungo', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'Sicut explicans adventura cuius pars plena sum', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function LatinQuizPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showAlert, setShowAlert] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const totalPages = 10;
  const currentQuestions =
    questions.find(p => p.page === currentPage)?.questions || [];

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
        Quaeso responde omnibus quaestionibus ut procedas
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              Quaestiones Completae 🎉
            </h2>
            <p className="text-gray-600">
              Nota felicitatis tuae in gradu proximo computabitur.
            </p>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold tracking-[0.2em] text-[#de0f3f] mb-4">
          HAPPINESS INDEX
        </h1>
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
          Retro
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'Finis' : 'Proximus'}
        </button>
      </footer>
    </div>
  );
}