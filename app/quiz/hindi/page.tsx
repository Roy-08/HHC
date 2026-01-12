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
        text: 'प्रश्न 1/20: जब मैं अपने जीवन को देखता हूं, तो यह ऐसा लगता है...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: 'एक कहानी जो अपना कथानक खोती रहती है', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: 'एक मसौदा जिसमें कई संपादन बाकी हैं', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'एक स्क्रिप्ट जो ज्यादातर सही रास्ते पर है', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'एक कथा जो वैसे ही सामने आ रही है जैसी होनी चाहिए', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: 'प्रश्न 2/20: बाहरी परिस्थितियों की परवाह किए बिना मेरी आंतरिक दुनिया शांत और स्थिर महसूस होती है।',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: 'एक हिले हुए सोडा कैन की तरह', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: 'एक कमरे की तरह जो गंदा हो जाता है और फिर रीसेट हो जाता है', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'दुर्लभ लहरों वाले तालाब की तरह', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: 'एक गहरी झील की तरह, अंदर से ज्यादातर शांत', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: 'प्रश्न 3/20: मैं आने वाले दिन के लिए दिशा की भावना के साथ जागता हूं।',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: 'ऑटोपायलट पर, बस गतिविधियों से गुजर रहा हूं', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: 'क्या करना है इसका अस्पष्ट विचार के साथ', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: 'दिमाग में एक ढीली गेम प्लान के साथ', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: 'दिन के लिए एक स्पष्ट आंतरिक कम्पास के साथ', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: 'प्रश्न 4/20: मेरा वर्तमान जीवन उस जीवन से मिलता-जुलता है जिसकी मैंने कभी कामना की थी।',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: 'एक ऐसे घर में रहने जैसा जिसे मैंने कभी नहीं चुना', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'कुछ सही कमरों वाले घर की तरह', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: 'उस घर की तरह जिसकी मैंने मोटे तौर पर कल्पना की थी', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'उस जीवन के अंदर चलने जैसा जिसे मैंने कभी कागज पर खींचा था', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: 'प्रश्न 5/20: मेरे विचार मुझे थकाने से ज्यादा सशक्त बनाते हैं।',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'ज्यादातर पृष्ठभूमि आलोचना की तरह', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: 'संदेह और छोटी प्रेरक बातों का मिश्रण', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'अक्सर एक सहायक आंतरिक कोच की तरह', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: 'काफी हद तक एक स्थिर आंतरिक चीयर स्क्वाड की तरह', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: 'प्रश्न 6/20: मैं प्रेरित महसूस करता हूं...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'लगभग कभी नहीं, अधिकांश दिन सपाट लगते हैं', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: 'छोटी चिंगारियां कभी-कभी दिखाई देती हैं', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: 'कई दिनों में एक कोमल चमक मौजूद रहती है', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: 'बार-बार फटने वाली चिंगारियां जो मुझे कार्य करने के लिए प्रेरित करती हैं', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: 'एक स्थिर आंतरिक आग जो मुझे रचना करती रहती है', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: 'प्रश्न 7/20: जब योजनाएं बदलती या टूटती हैं, तो मेरी शांति की भावना प्रभावित होती है',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: 'योजनाएं बदलने पर मैं भावनात्मक रूप से टूट जाता हूं', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'मैं बुरी तरह हिल जाता हूं और परेशान रहता हूं', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'मैं डगमगाता हूं लेकिन संतुलन पुनः प्राप्त कर लेता हूं', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: 'मैं हल्की असुविधा के साथ समायोजित हो जाता हूं', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: 'मैं केंद्रित रहता हूं और बस फिर से रास्ता बनाता हूं', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: 'प्रश्न 8/20: मैं जो करता हूं उसमें मानसिक रूप से उपस्थित और तल्लीन महसूस करता हूं।',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'ज्यादातर म्यूट पर, दिमाग कहीं और है', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: 'आधा यहां, आधा अगली चीज पर', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'आम तौर पर कुछ चूक के साथ उपस्थित', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: 'समय का ट्रैक खोने के लिए पर्याप्त तल्लीन', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: 'गहराई से तल्लीन, जीवन जीवंत लगता है', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: 'प्रश्न 9/20: मेरा भविष्य दिखता है...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: 'एक गलियारे की तरह जिसकी रोशनी बंद है', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'धुंधली रूपरेखा वाली धुंधली गली की तरह', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: 'अंतराल पर लैंप के साथ एक घुमावदार सड़क की तरह', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: 'स्पष्ट साइनबोर्ड के साथ एक खुले राजमार्ग की तरह', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: 'कई उज्ज्वल रास्तों के साथ एक विस्तृत क्षितिज की तरह', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: 'प्रश्न 10/20: मेरा जीवन मुझे भावनात्मक रिटर्न देता है — खुशी, गर्व, पूर्णता।',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'ज्यादातर भावनात्मक नुकसान या थकावट', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'रिटर्न के कुछ बिखरे हुए क्षण', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: 'खुशी और पूर्णता का उचित हिस्सा', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: 'लगातार रिटर्न जो प्रयास के लायक लगता है', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'अधिकांश क्षेत्रों में समृद्ध भावनात्मक लाभांश', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: 'प्रश्न 11/20: मैं समय के साथ एक व्यक्ति के रूप में बढ़ता हूं।',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: 'मैं दोहराव में फंसा हुआ महसूस करता हूं', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: 'मैं केवल छोटी, दुर्लभ छलांगों में बढ़ता हूं', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: 'मैं स्थिर आंतरिक विकास को महसूस कर सकता हूं', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: 'मैं ध्यान देने योग्य तरीकों से विकसित होता रहता हूं', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: 'प्रश्न 12/20: अर्थ और उद्देश्य मेरे निर्णयों का मार्गदर्शन करते हैं।',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'ज्यादातर जीवित रहना और तात्कालिकता मुझे चलाती है', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: 'कभी-कभी मैं जांचता हूं कि क्या यह वास्तव में मायने रखता है', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'अक्सर मैं अपने "क्यों" के साथ संरेखण की जांच करता हूं', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: 'काफी हद तक मेरे विकल्प एक स्पष्ट आंतरिक उद्देश्य का पालन करते हैं', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: 'प्रश्न 13/20: खुद होना आरामदायक लगता है।',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: 'मैं अक्सर गुजरने के लिए मुखौटे पहनता हूं', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: 'मैं केवल कुछ लोगों के साथ खुद हो सकता हूं', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'मैं ज्यादातर जगहों पर ज्यादातर खुद हूं', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'मैं लगभग हर जगह अपनी त्वचा में घर पर महसूस करता हूं', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: 'प्रश्न 14/20: मैं अपनी खुद की संगति का आनंद लेता हूं।',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: 'मैं अपने साथ अकेले रहने से बचता हूं', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: 'मैं अपनी खुद की संगति को छोटी खुराक में सहन करता हूं', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: 'मैं आम तौर पर अपने साथ समय बिताना पसंद करता हूं', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: 'मैं वास्तव में अपने अकेले समय की प्रतीक्षा करता हूं', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: 'प्रश्न 15/20: लोग मेरे आसपास भावनात्मक रूप से सुरक्षित महसूस करते हैं।',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: 'लोग मेरे सामने खुलने में संकोच करते हैं', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: 'कुछ साझा करते हैं, लेकिन सावधानी से', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: 'कई लोग आसानी से मुझमें विश्वास करते हैं', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: 'मैं अक्सर वह व्यक्ति हूं जिसके पास लोग सबसे पहले आते हैं', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: 'प्रश्न 16/20: जब मैं हाल के दिनों के बारे में सोचता हूं, तो मुझे सुखद क्षण याद आते हैं।',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: 'मुझे कुछ भी सुखद याद करने में संघर्ष करना पड़ता है', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'कुछ बिखरे हुए अच्छे क्षण सामने आते हैं', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'कई गर्म यादें आसानी से सामने आती हैं', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: 'कई जीवंत सुखद क्षण एक साथ दिमाग में आते हैं', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: 'प्रश्न 17/20: जब मेरी नींद की गुणवत्ता अच्छी होती है तो मेरी भावनात्मक स्थिरता बेहतर होती है।',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: 'नींद की परवाह किए बिना मेरा मूड अस्थिर है', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: 'नींद थोड़ी मदद करती है लेकिन विश्वसनीय रूप से नहीं', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: 'अच्छी नींद आमतौर पर मुझे अधिक स्थिर रखती है', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: 'अच्छी नींद स्पष्ट रूप से मेरे भावनात्मक संतुलन को लंगर डालती है', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: 'प्रश्न 18/20: मेरी ऊर्जा का स्तर दिन भर स्थिर रहता है।',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: 'दिन भर ऊर्जा तेजी से गिरती है', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: 'मेरा ऊर्जा ग्राफ एक निरंतर जिगजैग है', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'ऊर्जा हल्की गिरावट के साथ ज्यादातर स्थिर है', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: 'मैं दिन के अधिकांश समय स्थायी रूप से ऊर्जावान महसूस करता हूं', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: 'प्रश्न 19/20: मेरी हाल की बातचीत ने मुझे दूसरों से जुड़ा हुआ महसूस कराया है।',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'ज्यादातर थकाऊ या डिस्कनेक्टिंग इंटरैक्शन', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'बिना किसी भावना के तटस्थ आदान-प्रदान', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: 'आम तौर पर गर्म और जुड़ने वाले क्षण', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: 'कई इंटरैक्शन में गहरे, पोषण करने वाले कनेक्शन', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: 'प्रश्न 20/20: जीवन एक अनुभव की तरह महसूस होता है जिसमें मैं लगा हुआ हूं, बजाय इसके कि मैं बस गुजर रहा हूं।',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'पृष्ठभूमि वॉलपेपर की तरह जिसे मैं शायद ही नोटिस करता हूं', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: 'एक फिल्म की तरह जिसे मैं साइड-लाइन से देखता हूं', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: 'एक गेम की तरह जिसमें मैं कभी-कभी शामिल होता हूं', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: 'एक सामने आने वाले रोमांच की तरह जिसका मैं पूरी तरह से हिस्सा हूं', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function HindiQuizPage() {
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
    const savedAnswers = localStorage.getItem('quizAnswersHindi');
    const savedPage = localStorage.getItem('quizCurrentPageHindi');
    
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
      localStorage.setItem('quizAnswersHindi', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPageHindi', currentPage.toString());
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
      localStorage.removeItem('quizAnswersHindi');
      localStorage.removeItem('quizCurrentPageHindi');
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
        कृपया आगे बढ़ने के लिए सभी प्रश्नों का उत्तर दें
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              प्रश्नोत्तरी पूर्ण 🎉
            </h2>
            <p className="text-gray-600">
              आपका खुशी स्कोर अगले चरण में गणना की जाएगी।
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
            <span>होम पर वापस जाएं</span>
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
          पीछे
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'समाप्त' : 'अगला कदम'}
        </button>
      </footer>
    </div>
  );
}