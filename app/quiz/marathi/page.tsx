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
        textMr: 'प्र1/20: जेव्हा मी माझ्या आयुष्याकडे पाहतो, तेव्हा असे वाटते...',
        textEn: 'Q1/20: When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', textMr: 'एक कथा जी आपली कथानक गमावत राहते', textEn: 'A story that keeps losing its plot' },
          { emoji: '📝', textMr: 'अनेक संपादनांसह एक मसुदा', textEn: 'A rough draft with many edits pending' },
          { emoji: '🎬', textMr: 'एक स्क्रिप्ट जी बहुतेक योग्य मार्गावर आहे', textEn: 'A script that is mostly on track' },
          { emoji: '📖', textMr: 'एक कथा जी तशीच उलगडत आहे जशी असावी', textEn: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        textMr: 'प्र2/20: माझे आंतरिक जग बाह्य परिस्थितींकडे दुर्लक्ष करून शांत आणि स्थिर वाटते.',
        textEn: 'Q2/20: My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', textMr: 'हलवलेल्या सोडा कॅनसारखे', textEn: 'Like a shaken soda can' },
          { emoji: '🏠', textMr: 'एक खोलीसारखे जी गोंधळलेली होते आणि नंतर रीसेट होते', textEn: 'Like a room that gets messy and then reset' },
          { emoji: '💧', textMr: 'दुर्मिळ लाटांसह तलावासारखे', textEn: 'Like a pond with rare ripples' },
          { emoji: '🌊', textMr: 'खोल तलावासारखे, आतून बहुतेक शांत', textEn: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        textMr: 'प्र3/20: मी पुढील दिवसासाठी दिशेच्या भावनेसह जागे होतो.',
        textEn: 'Q3/20: I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', textMr: 'ऑटोपायलटवर, फक्त हालचालींमधून जात आहे', textEn: 'On autopilot, just going through motions' },
          { emoji: '🌫️', textMr: 'काय करायचे याची अस्पष्ट कल्पना घेऊन', textEn: 'With a vague idea of what to do' },
          { emoji: '🗺️', textMr: 'मनात एक ढिलाईशी गेम प्लॅनसह', textEn: 'With a loose game plan in mind' },
          { emoji: '🧭', textMr: 'दिवसासाठी स्पष्ट आंतरिक कंपासासह', textEn: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        textMr: 'प्र4/20: माझे वर्तमान जीवन त्या जीवनासारखे आहे ज्याची मी कधी इच्छा केली होती.',
        textEn: 'Q4/20: My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', textMr: 'अशा घरात राहण्यासारखे जे मी कधीच निवडले नाही', textEn: 'Like living in a house I never chose' },
          { emoji: '🏠', textMr: 'काही योग्य खोल्यांसह घरासारखे', textEn: 'Like a house with a few right rooms' },
          { emoji: '🏡', textMr: 'त्या घरासारखे ज्याची मी अंदाजे कल्पना केली होती', textEn: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', textMr: 'त्या जीवनात चालण्यासारखे जे मी कधी कागदावर काढले होते', textEn: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        textMr: 'प्र5/20: माझे विचार मला थकवण्यापेक्षा अधिक सशक्त करतात.',
        textEn: 'Q5/20: My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', textMr: 'बहुतेक पार्श्वभूमी टीकेसारखे', textEn: 'Mostly like background criticism' },
          { emoji: '⚖️', textMr: 'शंका आणि लहान प्रोत्साहन चर्चांचे मिश्रण', textEn: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', textMr: 'अनेकदा सहाय्यक आंतरिक प्रशिक्षकासारखे', textEn: 'Often like a supportive inner coach' },
          { emoji: '📣', textMr: 'मोठ्या प्रमाणात स्थिर आंतरिक चीअर स्क्वॉडसारखे', textEn: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        textMr: 'प्र6/20: मला प्रेरणा वाटते...',
        textEn: 'Q6/20: I feel inspired…',
        options: [
          { emoji: '☁️', textMr: 'जवळजवळ कधीच नाही, बहुतेक दिवस सपाट वाटतात', textEn: 'Almost never, most days feel flat' },
          { emoji: '⚡', textMr: 'लहान ठिणग्या कधीतरी दिसतात', textEn: 'Small sparks show up once in a while' },
          { emoji: '🕯️', textMr: 'अनेक दिवसांत एक सौम्य चमक उपस्थित असते', textEn: 'A gentle glow is present on many days' },
          { emoji: '🔥', textMr: 'वारंवार स्फोट जे मला कृती करण्यास प्रवृत्त करतात', textEn: 'Frequent bursts that move me to act' },
          { emoji: '☀️', textMr: 'एक स्थिर आंतरिक आग जी मला निर्माण करत राहते', textEn: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        textMr: 'प्र7/20: जेव्हा योजना बदलतात किंवा तुटतात, तेव्हा माझ्या शांततेची भावना प्रभावित होते',
        textEn: 'Q7/20: When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', textMr: 'योजना बदलल्यावर मी भावनिकरित्या क्रॅश होतो', textEn: 'I crash emotionally when plans change' },
          { emoji: '😰', textMr: 'मी वाईटरीत्या हादरतो आणि अस्वस्थ राहतो', textEn: 'I get badly shaken and stay upset' },
          { emoji: '🌀', textMr: 'मी डगमगतो पण संतुलन पुन्हा मिळवतो', textEn: 'I wobble but regain balance' },
          { emoji: '🧘', textMr: 'मी हलक्या अस्वस्थतेसह समायोजित करतो', textEn: 'I adjust with mild discomfort' },
          { emoji: '🎯', textMr: 'मी केंद्रित राहतो आणि फक्त पुन्हा मार्ग तयार करतो', textEn: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        textMr: 'प्र8/20: मी जे करतो त्यात मानसिकरित्या उपस्थित आणि गढून गेलेले वाटते.',
        textEn: 'Q8/20: I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', textMr: 'बहुतेक म्यूटवर, मन दुसरीकडे आहे', textEn: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', textMr: 'अर्धे येथे, अर्धे पुढच्या गोष्टीवर', textEn: 'Half here, half on the next thing' },
          { emoji: '👁️', textMr: 'सामान्यतः काही चुकांसह उपस्थित', textEn: 'Generally present with a few slips' },
          { emoji: '⏰', textMr: 'वेळेचा मागोवा गमावण्यासाठी पुरेसे गढून गेलेले', textEn: 'Immersed enough to lose track of time' },
          { emoji: '✨', textMr: 'खोलवर गढून गेलेले, जीवन जीवंत वाटते', textEn: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        textMr: 'प्र9/20: माझे भविष्य दिसते...',
        textEn: 'Q9/20: My future appears as…',
        options: [
          { emoji: '🌑', textMr: 'दिवे बंद असलेल्या कॉरिडॉरसारखे', textEn: 'A corridor with lights switched off' },
          { emoji: '🌫️', textMr: 'अस्पष्ट रूपरेषांसह धुके असलेल्या गल्लीसारखे', textEn: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', textMr: 'अंतरावर दिवे असलेल्या वळणदार रस्त्यासारखे', textEn: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', textMr: 'स्पष्ट साइनबोर्डसह खुल्या महामार्गासारखे', textEn: 'An open highway with clear signboards' },
          { emoji: '🌅', textMr: 'अनेक उज्ज्वल मार्गांसह विस्तृत क्षितिजासारखे', textEn: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        textMr: 'प्र10/20: माझे जीवन मला भावनिक परतावा देते — आनंद, अभिमान, पूर्णता.',
        textEn: 'Q10/20: My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', textMr: 'बहुतेक भावनिक नुकसान किंवा निचरा', textEn: 'Mostly emotional losses or drains' },
          { emoji: '💫', textMr: 'परताव्याचे काही विखुरलेले क्षण', textEn: 'A few scattered moments of return' },
          { emoji: '⚖️', textMr: 'आनंद आणि पूर्णतेचा योग्य वाटा', textEn: 'A fair share of joy and fulfilment' },
          { emoji: '📈', textMr: 'सातत्यपूर्ण परतावा जो प्रयत्नांना योग्य वाटतो', textEn: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', textMr: 'बहुतेक क्षेत्रांमध्ये समृद्ध भावनिक लाभांश', textEn: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        textMr: 'प्र11/20: मी वेळेसह एक व्यक्ती म्हणून वाढतो.',
        textEn: 'Q11/20: I grow as a person with time.',
        options: [
          { emoji: '🔄', textMr: 'मी पुनरावृत्तीवर अडकल्यासारखे वाटते', textEn: 'I feel stuck on repeat' },
          { emoji: '📊', textMr: 'मी फक्त लहान, दुर्मिळ उड्यांमध्ये वाढतो', textEn: 'I grow only in small, rare jumps' },
          { emoji: '🌱', textMr: 'मी स्थिर आंतरिक वाढ जाणू शकतो', textEn: 'I can sense steady inner growth' },
          { emoji: '🌳', textMr: 'मी लक्षणीय मार्गांनी विकसित होत राहतो', textEn: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        textMr: 'प्र12/20: अर्थ आणि उद्देश माझ्या निर्णयांचे मार्गदर्शन करतात.',
        textEn: 'Q12/20: Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', textMr: 'बहुतेक अस्तित्व आणि तातडी मला चालवते', textEn: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', textMr: 'कधीकधी मी तपासतो की ते खरोखर महत्त्वाचे आहे का', textEn: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', textMr: 'अनेकदा मी माझ्या "का" सह संरेखन तपासतो', textEn: 'Often I check alignment with my why' },
          { emoji: '⭐', textMr: 'मोठ्या प्रमाणात माझ्या निवडी स्पष्ट आंतरिक उद्देशाचे अनुसरण करतात', textEn: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        textMr: 'प्र13/20: स्वतः असणे आरामदायक वाटते.',
        textEn: 'Q13/20: Being myself feels comfortable.',
        options: [
          { emoji: '🎭', textMr: 'मी अनेकदा जाण्यासाठी मुखवटे घालतो', textEn: 'I often wear masks to get through' },
          { emoji: '👥', textMr: 'मी फक्त काही लोकांसोबत स्वतः असू शकतो', textEn: 'I can be myself only with a few people' },
          { emoji: '😊', textMr: 'मी बहुतेक ठिकाणी बहुतेक स्वतः आहे', textEn: 'I am mostly myself in most spaces' },
          { emoji: '💯', textMr: 'मला जवळजवळ सर्वत्र माझ्या त्वचेत घरासारखे वाटते', textEn: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        textMr: 'प्र14/20: मला माझ्या स्वतःच्या सहवासाचा आनंद घेतो.',
        textEn: 'Q14/20: I enjoy my own company.',
        options: [
          { emoji: '🚫', textMr: 'मी स्वतःसोबत एकटे राहणे टाळतो', textEn: 'I avoid being alone with myself' },
          { emoji: '⏱️', textMr: 'मी लहान डोसमध्ये माझ्या स्वतःच्या सहवासाला सहन करतो', textEn: 'I tolerate my own company in small doses' },
          { emoji: '👍', textMr: 'मला सामान्यतः स्वतःसोबत वेळ घालवणे आवडते', textEn: 'I generally like spending time with myself' },
          { emoji: '💖', textMr: 'मी खरोखर माझ्या एकट्या वेळेची वाट पाहतो', textEn: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        textMr: 'प्र15/20: लोक माझ्या आसपास भावनिकरित्या सुरक्षित वाटतात.',
        textEn: 'Q15/20: People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', textMr: 'लोक माझ्यासमोर उघडण्यास संकोच करतात', textEn: 'People hesitate to open up to me' },
          { emoji: '🤐', textMr: 'काही शेअर करतात, परंतु सावधपणे', textEn: 'A few share, but cautiously' },
          { emoji: '🤗', textMr: 'अनेक लोक सहजपणे माझ्यावर विश्वास ठेवतात', textEn: 'Many people confide in me with ease' },
          { emoji: '🛡️', textMr: 'मी अनेकदा ती व्यक्ती आहे ज्याकडे लोक प्रथम वळतात', textEn: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        textMr: 'प्र16/20: जेव्हा मी अलीकडील दिवसांचा विचार करतो, तेव्हा मला आनंददायक क्षण आठवतात.',
        textEn: 'Q16/20: When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', textMr: 'मी काहीही आनंददायक आठवण्यासाठी संघर्ष करतो', textEn: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', textMr: 'काही विखुरलेले चांगले क्षण समोर येतात', textEn: 'A few scattered good moments come up' },
          { emoji: '😌', textMr: 'अनेक उबदार आठवणी सहजपणे समोर येतात', textEn: 'Several warm memories surface easily' },
          { emoji: '🌈', textMr: 'अनेक जीवंत आनंददायक क्षण एकाच वेळी मनात येतात', textEn: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        textMr: 'प्र17/20: जेव्हा माझ्या झोपेची गुणवत्ता चांगली असते तेव्हा माझी भावनिक स्थिरता चांगली असते.',
        textEn: 'Q17/20: My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', textMr: 'झोपेकडे दुर्लक्ष करून माझे मूड अस्थिर आहेत', textEn: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', textMr: 'झोप थोडी मदत करते परंतु विश्वासार्हपणे नाही', textEn: 'Sleep helps a little but not reliably' },
          { emoji: '😴', textMr: 'चांगली झोप सामान्यतः मला अधिक स्थिर ठेवते', textEn: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', textMr: 'चांगली झोप स्पष्टपणे माझ्या भावनिक संतुलनाला नांगर घालते', textEn: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        textMr: 'प्र18/20: माझी ऊर्जा पातळी दिवसभर स्थिर राहते.',
        textEn: 'Q18/20: My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', textMr: 'ऊर्जा दिवसभर झपाट्याने घसरते', textEn: 'Energy drops sharply through the day' },
          { emoji: '📊', textMr: 'माझा ऊर्जा आलेख सतत झिगझॅग आहे', textEn: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', textMr: 'ऊर्जा हलक्या घसरणीसह बहुतेक स्थिर आहे', textEn: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', textMr: 'मला दिवसाचा बहुतेक वेळ शाश्वतपणे ऊर्जावान वाटते', textEn: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        textMr: 'प्र19/20: माझ्या अलीकडील परस्परसंवादांनी मला इतरांशी जोडलेले वाटले आहे.',
        textEn: 'Q19/20: My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', textMr: 'बहुतेक थकवणारे किंवा डिस्कनेक्ट करणारे परस्परसंवाद', textEn: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', textMr: 'कोणत्याही भावनेशिवाय तटस्थ देवाणघेवाण', textEn: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', textMr: 'सामान्यतः उबदार आणि जोडणारे क्षण', textEn: 'Generally warm and connecting moments' },
          { emoji: '💞', textMr: 'अनेक परस्परसंवादांमध्ये खोल, पोषण करणारे कनेक्शन', textEn: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        textMr: 'प्र20/20: जीवन एक अनुभवासारखे अधिक वाटते ज्यात मी गुंतलेलो आहे, फक्त मी त्यातून जात आहे असे नाही.',
        textEn: 'Q20/20: Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', textMr: 'पार्श्वभूमी वॉलपेपरसारखे ज्याची मी क्वचितच दखल घेतो', textEn: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', textMr: 'एक चित्रपटासारखे जो मी साइड-लाइनवरून पाहतो', textEn: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', textMr: 'एक गेमसारखे ज्यात मी आता आणि नंतर सामील होतो', textEn: 'Like a game I join in now and then' },
          { emoji: '🎢', textMr: 'एक उलगडणाऱ्या साहसासारखे ज्याचा मी पूर्णपणे भाग आहे', textEn: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function MarathiQuizPage() {
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
    const savedAnswers = localStorage.getItem('quizAnswersMarathi');
    const savedPage = localStorage.getItem('quizCurrentPageMarathi');
    
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
      localStorage.setItem('quizAnswersMarathi', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPageMarathi', currentPage.toString());
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
      localStorage.removeItem('quizAnswersMarathi');
      localStorage.removeItem('quizCurrentPageMarathi');
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
      <div
        className={`fixed left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-white shadow-xl border transition-all duration-500 z-50 ${
          showAlert ? 'top-5' : '-top-32'
        }`}
        style={{ color: '#de0f3f' }}
      >
        कृपया पुढे जाण्यासाठी सर्व प्रश्नांची उत्तरे द्या
      </div>

      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              प्रश्नमंजुषा पूर्ण 🎉
            </h2>
            <p className="text-gray-600">
              तुमचा आनंद स्कोअर पुढील चरणात मोजला जाईल.
            </p>
          </div>
        </div>
      )}

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
            <span>मुख्यपृष्ठावर परत</span>
          </button>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#de0f3f] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="flex-1 px-6 pb-32">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-5">
          {currentQuestions.map(q => (
            <div
              key={q.id}
              className="flex-1 bg-[#f8f8f8] p-6 rounded-3xl"
            >
              <div className="mb-5">
                <h2 className="font-bold text-gray-900 text-base mb-1">{q.textMr}</h2>
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
                        <div className="text-sm font-medium">{opt.textMr}</div>
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

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 flex gap-3">
        <button
          onClick={movePrevious}
          disabled={currentPage === 1}
          className="flex-1 py-3 rounded-full text-black font-semibold text-sm disabled:opacity-40 hover:bg-gray-200 transition-colors"
        >
          मागे
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'समाप्त' : 'पुढील पायरी'}
        </button>
      </footer>
    </div>
  );
}