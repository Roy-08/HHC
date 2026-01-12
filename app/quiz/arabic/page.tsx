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
        text: 'السؤال 1/20: عندما أنظر إلى حياتي، تبدو وكأنها...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: 'قصة تستمر في فقدان حبكتها', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'مسودة أولية مع العديد من التعديلات المعلقة', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'نص على المسار الصحيح في الغالب', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'سرد يتكشف كما ينبغي أن يكون', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'السؤال 2/20: عالمي الداخلي يشعر بالهدوء والاستقرار بغض النظر عن الظروف الخارجية.',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'مثل علبة صودا مهزوزة', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'مثل غرفة تصبح فوضوية ثم تعاد ضبطها', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'مثل بركة ذات تموجات نادرة', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'مثل بحيرة عميقة، ساكنة في الداخل في الغالب', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'السؤال 3/20: أستيقظ بإحساس بالاتجاه لليوم المقبل.',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'على الطيار الآلي، أمر فقط بالحركات', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'مع فكرة غامضة عما يجب القيام به', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'مع خطة لعبة فضفاضة في الاعتبار', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'مع بوصلة داخلية واضحة لليوم', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'السؤال 4/20: حياتي الحالية تشبه الحياة التي تمنيتها ذات مرة.',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'مثل العيش في منزل لم أختره أبداً', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'مثل منزل به بعض الغرف الصحيحة', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'مثل المنزل الذي تخيلته بشكل تقريبي', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'مثل المشي داخل الحياة التي رسمتها على الورق', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'السؤال 5/20: أفكاري تمكنني أكثر مما تستنزفني.',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'في الغالب مثل النقد الخلفي', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'مزيج من الشكوك والأحاديث التحفيزية الصغيرة', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'غالباً مثل مدرب داخلي داعم', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'إلى حد كبير مثل فرقة تشجيع داخلية ثابتة', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'السؤال 6/20: أشعر بالإلهام...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'تقريباً أبداً، معظم الأيام تبدو مسطحة', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'شرارات صغيرة تظهر بين الحين والآخر', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'توهج لطيف موجود في أيام كثيرة', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'انفجارات متكررة تحركني للعمل', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'نار داخلية ثابتة تبقيني أبدع', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'السؤال 7/20: عندما تتغير الخطط أو تنكسر، يتأثر شعوري بالهدوء',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'أنهار عاطفياً عندما تتغير الخطط', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'أتزعزع بشدة وأبقى منزعجاً', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'أترنح لكني أستعيد التوازن', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'أتكيف مع إزعاج خفيف', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'أبقى متمركزاً وأعيد التوجيه ببساطة', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'السؤال 8/20: أشعر بالحضور الذهني والانغماس فيما أفعله.',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'في الغالب على كتم الصوت، العقل في مكان آخر', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'نصف هنا، نصف على الشيء التالي', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'حاضر بشكل عام مع بعض الهفوات', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'منغمس بما يكفي لفقدان تتبع الوقت', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'منغمس بعمق، الحياة تبدو حية', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'السؤال 9/20: مستقبلي يبدو...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: 'مثل ممر مع إطفاء الأضواء', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'مثل زقاق ضبابي مع خطوط خافتة', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'مثل طريق متعرج مع مصابيح على فترات', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'مثل طريق سريع مفتوح مع لافتات واضحة', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'مثل أفق واسع مع العديد من المسارات المشرقة', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'السؤال 10/20: حياتي تعطيني عوائد عاطفية — الفرح والفخر والإنجاز.',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'في الغالب خسائر عاطفية أو استنزاف', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'بضع لحظات متناثرة من العائد', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'حصة عادلة من الفرح والإنجاز', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'عوائد متسقة تبدو تستحق الجهد', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'أرباح عاطفية غنية في معظم المجالات', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'السؤال 11/20: أنمو كشخص مع الوقت.',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'أشعر بأنني عالق في التكرار', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'أنمو فقط في قفزات صغيرة ونادرة', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'يمكنني الشعور بنمو داخلي ثابت', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'أستمر في التطور بطرق ملحوظة', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'السؤال 12/20: المعنى والهدف يوجهان قراراتي.',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'في الغالب البقاء والإلحاح يدفعني', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'أحياناً أتحقق مما إذا كان يهم حقاً', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'غالباً أتحقق من التوافق مع "لماذا" الخاص بي', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'إلى حد كبير خياراتي تتبع هدفاً داخلياً واضحاً', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'السؤال 13/20: كوني نفسي يبدو مريحاً.',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'غالباً أرتدي أقنعة للمرور', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: 'يمكنني أن أكون نفسي فقط مع عدد قليل من الناس', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'أنا في الغالب نفسي في معظم الأماكن', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'أشعر بالراحة في جلدي تقريباً في كل مكان', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'السؤال 14/20: أستمتع بصحبتي الخاصة.',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'أتجنب أن أكون وحيداً مع نفسي', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'أتحمل صحبتي الخاصة بجرعات صغيرة', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'أحب بشكل عام قضاء الوقت مع نفسي', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'أتطلع حقاً إلى وقتي بمفردي', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'السؤال 15/20: يشعر الناس بالأمان العاطفي من حولي.',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'يتردد الناس في الانفتاح علي', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'يشارك القليل، ولكن بحذر', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'يثق بي كثير من الناس بسهولة', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'غالباً ما أكون الشخص الذي يلجأ إليه الناس أولاً', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'السؤال 16/20: عندما أفكر في الأيام الأخيرة، أتذكر لحظات سارة.',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'أكافح لتذكر أي شيء سار', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'بضع لحظات جيدة متناثرة تظهر', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'عدة ذكريات دافئة تظهر بسهولة', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'العديد من اللحظات السارة الحية تتبادر إلى الذهن دفعة واحدة', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'السؤال 17/20: استقراري العاطفي أفضل عندما تكون جودة نومي جيدة.',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'حالاتي المزاجية غير مستقرة بغض النظر عن النوم', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'النوم يساعد قليلاً ولكن ليس بشكل موثوق', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'النوم الجيد عادة يبقيني أكثر استقراراً', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'النوم الجيد يرسخ توازني العاطفي بوضوح', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'السؤال 18/20: مستويات طاقتي تبقى ثابتة طوال اليوم.',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'الطاقة تنخفض بشكل حاد خلال اليوم', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'رسم الطاقة الخاص بي هو متعرج مستمر', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'الطاقة ثابتة في الغالب مع انخفاضات خفيفة', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'أشعر بالنشاط المستدام معظم اليوم', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'السؤال 19/20: تفاعلاتي مؤخراً تركتني أشعر بالارتباط بالآخرين.',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'في الغالب تفاعلات مستنزفة أو منفصلة', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'تبادلات محايدة دون الكثير من الشعور', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'لحظات دافئة ومتصلة بشكل عام', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'روابط عميقة ومغذية في العديد من التفاعلات', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'السؤال 20/20: الحياة تبدو أكثر كتجربة أنا منخرط فيها، بدلاً من شيء أمر به ببساطة.',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'مثل ورق الجدران الخلفي الذي بالكاد ألاحظه', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'مثل فيلم أشاهده من الخطوط الجانبية', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'مثل لعبة أنضم إليها بين الحين والآخر', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'مثل مغامرة متكشفة أنا جزء منها بالكامل', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function ArabicQuizPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showAlert, setShowAlert] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const totalPages = 10;
  const currentQuestions =
    questions.find(p => p.page === currentPage)?.questions || [];

 
  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswersArabic');
    const savedPage = localStorage.getItem('quizCurrentPageArabic');
    
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
      localStorage.setItem('quizAnswersArabic', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPageArabic', currentPage.toString());
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
      localStorage.removeItem('quizAnswersArabic');
      localStorage.removeItem('quizCurrentPageArabic');
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
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      {/* ALERT */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-white shadow-xl border transition-all duration-500 z-50 ${
          showAlert ? 'top-5' : '-top-32'
        }`}
        style={{ color: '#de0f3f' }}
      >
        يرجى الإجابة على جميع الأسئلة للمتابعة
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              الاختبار مكتمل 🎉
            </h2>
            <p className="text-gray-600">
              سيتم حساب درجة سعادتك في الخطوة التالية.
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
            <span>العودة إلى الصفحة الرئيسية</span>
            <span>←</span>
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
              <p className="text-sm text-gray-500 mb-5" dir="ltr">{q.subtext}</p>
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
                          dir="ltr"
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
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'إنهاء' : 'التالي'}
        </button>
        <button
          onClick={movePrevious}
          disabled={currentPage === 1}
          className="flex-1 py-3 rounded-full text-black font-semibold text-sm disabled:opacity-40 hover:bg-gray-200 transition-colors"
        >
          السابق
        </button>
      </footer>
    </div>
  );
}