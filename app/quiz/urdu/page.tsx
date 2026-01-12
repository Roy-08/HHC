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
        textUr: 'سوال 1/20: جب میں اپنی زندگی کو دیکھتا ہوں تو ایسا لگتا ہے...',
        textEn: 'Q1/20: When I look at my life, it feels like...',
        options: [
          { emoji: '🚀', textUr: 'ایک کہانی جو صحیح سمت میں آگے بڑھ رہی ہے', textEn: 'A story moving in the right direction' },
          { emoji: '🧩', textUr: 'ایک کہانی جو اپنا پلاٹ کھوتی رہتی ہے', textEn: 'A story that keeps losing its plot' },
          { emoji: '📝', textUr: 'بہت سی ترامیم کے ساتھ ایک خام مسودہ', textEn: 'A rough draft with many edits pending' },
          { emoji: '🎬', textUr: 'ایک اسکرپٹ جو زیادہ تر ٹریک پر ہے', textEn: 'A script that is mostly on track' },
          { emoji: '📖', textUr: 'ایک بیانیہ جو اسی طرح سامنے آ رہا ہے جیسا ہونا چاہیے', textEn: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        textUr: 'سوال 2/20: میری اندرونی دنیا بیرونی حالات سے قطع نظر پرسکون اور مستحکم محسوس ہوتی ہے۔',
        textEn: 'Q2/20: My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', textUr: 'ہلائے ہوئے سوڈا کین کی طرح', textEn: 'Like a shaken soda can' },
          { emoji: '🏠', textUr: 'ایک کمرے کی طرح جو گندا ہو جاتا ہے اور پھر ری سیٹ ہو جاتا ہے', textEn: 'Like a room that gets messy and then reset' },
          { emoji: '💧', textUr: 'نایاب لہروں والے تالاب کی طرح', textEn: 'Like a pond with rare ripples' },
          { emoji: '🌊', textUr: 'گہری جھیل کی طرح، اندر سے زیادہ تر ساکن', textEn: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        textUr: 'سوال 3/20: میں آنے والے دن کے لیے سمت کے احساس کے ساتھ جاگتا ہوں۔',
        textEn: 'Q3/20: I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', textUr: 'آٹو پائلٹ پر، صرف حرکات سے گزر رہا ہوں', textEn: 'On autopilot, just going through motions' },
          { emoji: '🌫️', textUr: 'کیا کرنا ہے کا مبہم خیال کے ساتھ', textEn: 'With a vague idea of what to do' },
          { emoji: '🗺️', textUr: 'ذہن میں ایک ڈھیلے گیم پلان کے ساتھ', textEn: 'With a loose game plan in mind' },
          { emoji: '🧭', textUr: 'دن کے لیے واضح اندرونی کمپاس کے ساتھ', textEn: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        textUr: 'سوال 4/20: میری موجودہ زندگی اس زندگی سے ملتی جلتی ہے جس کی میں نے کبھی خواہش کی تھی۔',
        textEn: 'Q4/20: My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', textUr: 'ایسے گھر میں رہنے کی طرح جو میں نے کبھی نہیں چنا', textEn: 'Like living in a house I never chose' },
          { emoji: '🏠', textUr: 'کچھ صحیح کمروں والے گھر کی طرح', textEn: 'Like a house with a few right rooms' },
          { emoji: '🏡', textUr: 'اس گھر کی طرح جس کا میں نے تقریباً تصور کیا تھا', textEn: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', textUr: 'اس زندگی کے اندر چلنے کی طرح جو میں نے کبھی کاغذ پر بنائی تھی', textEn: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        textUr: 'سوال 5/20: میرے خیالات مجھے تھکانے سے زیادہ بااختیار بناتے ہیں۔',
        textEn: 'Q5/20: My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', textUr: 'زیادہ تر پس منظر کی تنقید کی طرح', textEn: 'Mostly like background criticism' },
          { emoji: '⚖️', textUr: 'شکوک اور چھوٹی حوصلہ افزائی کی باتوں کا مرکب', textEn: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', textUr: 'اکثر معاون اندرونی کوچ کی طرح', textEn: 'Often like a supportive inner coach' },
          { emoji: '📣', textUr: 'بڑی حد تک مستحکم اندرونی چیئر اسکواڈ کی طرح', textEn: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        textUr: 'سوال 6/20: میں متاثر محسوس کرتا ہوں...',
        textEn: 'Q6/20: I feel inspired…',
        options: [
          { emoji: '☁️', textUr: 'تقریباً کبھی نہیں، زیادہ تر دن سپاٹ محسوس ہوتے ہیں', textEn: 'Almost never, most days feel flat' },
          { emoji: '⚡', textUr: 'چھوٹی چنگاریاں کبھی کبھار ظاہر ہوتی ہیں', textEn: 'Small sparks show up once in a while' },
          { emoji: '🕯️', textUr: 'بہت سے دنوں میں نرم چمک موجود ہوتی ہے', textEn: 'A gentle glow is present on many days' },
          { emoji: '🔥', textUr: 'بار بار پھٹنے والی لہریں جو مجھے عمل کرنے پر مجبور کرتی ہیں', textEn: 'Frequent bursts that move me to act' },
          { emoji: '☀️', textUr: 'ایک مستحکم اندرونی آگ جو مجھے تخلیق کرتی رہتی ہے', textEn: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        textUr: 'سوال 7/20: جب منصوبے بدلتے یا ٹوٹتے ہیں تو میرے سکون کا احساس متاثر ہوتا ہے',
        textEn: 'Q7/20: When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', textUr: 'جب منصوبے بدلتے ہیں تو میں جذباتی طور پر کریش ہو جاتا ہوں', textEn: 'I crash emotionally when plans change' },
          { emoji: '😰', textUr: 'میں بری طرح ہل جاتا ہوں اور پریشان رہتا ہوں', textEn: 'I get badly shaken and stay upset' },
          { emoji: '🌀', textUr: 'میں لڑکھڑاتا ہوں لیکن توازن دوبارہ حاصل کر لیتا ہوں', textEn: 'I wobble but regain balance' },
          { emoji: '🧘', textUr: 'میں ہلکی بے چینی کے ساتھ ایڈجسٹ کرتا ہوں', textEn: 'I adjust with mild discomfort' },
          { emoji: '🎯', textUr: 'میں مرکوز رہتا ہوں اور صرف دوبارہ راستہ بناتا ہوں', textEn: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        textUr: 'سوال 8/20: میں جو کرتا ہوں اس میں ذہنی طور پر موجود اور جذب محسوس کرتا ہوں۔',
        textEn: 'Q8/20: I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', textUr: 'زیادہ تر خاموش، ذہن کہیں اور ہے', textEn: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', textUr: 'آدھا یہاں، آدھا اگلی چیز پر', textEn: 'Half here, half on the next thing' },
          { emoji: '👁️', textUr: 'عام طور پر کچھ غلطیوں کے ساتھ موجود', textEn: 'Generally present with a few slips' },
          { emoji: '⏰', textUr: 'وقت کا سراغ کھونے کے لیے کافی جذب', textEn: 'Immersed enough to lose track of time' },
          { emoji: '✨', textUr: 'گہرائی سے جذب، زندگی واضح محسوس ہوتی ہے', textEn: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        textUr: 'سوال 9/20: میرا مستقبل نظر آتا ہے...',
        textEn: 'Q9/20: My future appears as…',
        options: [
          { emoji: '🌑', textUr: 'بتیاں بند کوریڈور کی طرح', textEn: 'A corridor with lights switched off' },
          { emoji: '🌫️', textUr: 'دھندلی خاکوں والی دھندلی گلی کی طرح', textEn: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', textUr: 'وقفوں پر لیمپ والی گھماؤ والی سڑک کی طرح', textEn: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', textUr: 'واضح سائن بورڈز والی کھلی شاہراہ کی طرح', textEn: 'An open highway with clear signboards' },
          { emoji: '🌅', textUr: 'بہت سے روشن راستوں والے وسیع افق کی طرح', textEn: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        textUr: 'سوال 10/20: میری زندگی مجھے جذباتی منافع دیتی ہے — خوشی، فخر، تکمیل۔',
        textEn: 'Q10/20: My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', textUr: 'زیادہ تر جذباتی نقصانات یا نکاسی', textEn: 'Mostly emotional losses or drains' },
          { emoji: '💫', textUr: 'واپسی کے کچھ بکھرے ہوئے لمحات', textEn: 'A few scattered moments of return' },
          { emoji: '⚖️', textUr: 'خوشی اور تکمیل کا منصفانہ حصہ', textEn: 'A fair share of joy and fulfilment' },
          { emoji: '📈', textUr: 'مستقل منافع جو کوشش کے قابل محسوس ہوتا ہے', textEn: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', textUr: 'زیادہ تر شعبوں میں بھرپور جذباتی منافع', textEn: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        textUr: 'سوال 11/20: میں وقت کے ساتھ ایک شخص کے طور پر بڑھتا ہوں۔',
        textEn: 'Q11/20: I grow as a person with time.',
        options: [
          { emoji: '🔄', textUr: 'مجھے دہرانے پر پھنسا ہوا محسوس ہوتا ہے', textEn: 'I feel stuck on repeat' },
          { emoji: '📊', textUr: 'میں صرف چھوٹی، نایاب چھلانگوں میں بڑھتا ہوں', textEn: 'I grow only in small, rare jumps' },
          { emoji: '🌱', textUr: 'میں مستحکم اندرونی ترقی کو محسوس کر سکتا ہوں', textEn: 'I can sense steady inner growth' },
          { emoji: '🌳', textUr: 'میں قابل ذکر طریقوں سے ترقی کرتا رہتا ہوں', textEn: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        textUr: 'سوال 12/20: معنی اور مقصد میرے فیصلوں کی رہنمائی کرتے ہیں۔',
        textEn: 'Q12/20: Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', textUr: 'زیادہ تر بقا اور عجلت مجھے چلاتی ہے', textEn: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', textUr: 'کبھی کبھی میں چیک کرتا ہوں کہ کیا یہ واقعی اہم ہے', textEn: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', textUr: 'اکثر میں اپنے "کیوں" کے ساتھ صف بندی چیک کرتا ہوں', textEn: 'Often I check alignment with my why' },
          { emoji: '⭐', textUr: 'بڑی حد تک میری پسند واضح اندرونی مقصد کی پیروی کرتی ہے', textEn: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        textUr: 'سوال 13/20: خود ہونا آرام دہ محسوس ہوتا ہے۔',
        textEn: 'Q13/20: Being myself feels comfortable.',
        options: [
          { emoji: '🎭', textUr: 'میں اکثر گزرنے کے لیے ماسک پہنتا ہوں', textEn: 'I often wear masks to get through' },
          { emoji: '👥', textUr: 'میں صرف چند لوگوں کے ساتھ خود ہو سکتا ہوں', textEn: 'I can be myself only with a few people' },
          { emoji: '😊', textUr: 'میں زیادہ تر جگہوں پر زیادہ تر خود ہوں', textEn: 'I am mostly myself in most spaces' },
          { emoji: '💯', textUr: 'مجھے تقریباً ہر جگہ اپنی جلد میں گھر جیسا محسوس ہوتا ہے', textEn: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        textUr: 'سوال 14/20: میں اپنی صحبت سے لطف اندوز ہوتا ہوں۔',
        textEn: 'Q14/20: I enjoy my own company.',
        options: [
          { emoji: '🚫', textUr: 'میں اپنے ساتھ اکیلے رہنے سے گریز کرتا ہوں', textEn: 'I avoid being alone with myself' },
          { emoji: '⏱️', textUr: 'میں چھوٹی خوراکوں میں اپنی صحبت برداشت کرتا ہوں', textEn: 'I tolerate my own company in small doses' },
          { emoji: '👍', textUr: 'مجھے عام طور پر اپنے ساتھ وقت گزارنا پسند ہے', textEn: 'I generally like spending time with myself' },
          { emoji: '💖', textUr: 'میں واقعی اپنے اکیلے وقت کا انتظار کرتا ہوں', textEn: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        textUr: 'سوال 15/20: لوگ میرے ارد گرد جذباتی طور پر محفوظ محسوس کرتے ہیں۔',
        textEn: 'Q15/20: People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', textUr: 'لوگ مجھ سے کھلنے میں ہچکچاتے ہیں', textEn: 'People hesitate to open up to me' },
          { emoji: '🤐', textUr: 'کچھ شیئر کرتے ہیں، لیکن احتیاط سے', textEn: 'A few share, but cautiously' },
          { emoji: '🤗', textUr: 'بہت سے لوگ آسانی سے مجھ پر اعتماد کرتے ہیں', textEn: 'Many people confide in me with ease' },
          { emoji: '🛡️', textUr: 'میں اکثر وہ شخص ہوں جس کی طرف لوگ پہلے رجوع کرتے ہیں', textEn: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        textUr: 'سوال 16/20: جب میں حالیہ دنوں کے بارے میں سوچتا ہوں تو مجھے خوشگوار لمحات یاد آتے ہیں۔',
        textEn: 'Q16/20: When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', textUr: 'میں کچھ بھی خوشگوار یاد کرنے کے لیے جدوجہد کرتا ہوں', textEn: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', textUr: 'کچھ بکھرے ہوئے اچھے لمحات سامنے آتے ہیں', textEn: 'A few scattered good moments come up' },
          { emoji: '😌', textUr: 'کئی گرم یادیں آسانی سے سامنے آتی ہیں', textEn: 'Several warm memories surface easily' },
          { emoji: '🌈', textUr: 'بہت سے واضح خوشگوار لمحات ایک ساتھ ذہن میں آتے ہیں', textEn: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        textUr: 'سوال 17/20: جب میری نیند کا معیار اچھا ہوتا ہے تو میری جذباتی استحکام بہتر ہوتی ہے۔',
        textEn: 'Q17/20: My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', textUr: 'نیند سے قطع نظر میرے موڈ غیر مستحکم ہیں', textEn: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', textUr: 'نیند تھوڑی مدد کرتی ہے لیکن قابل اعتماد نہیں', textEn: 'Sleep helps a little but not reliably' },
          { emoji: '😴', textUr: 'اچھی نیند عام طور پر مجھے زیادہ مستحکم رکھتی ہے', textEn: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', textUr: 'اچھی نیند واضح طور پر میرے جذباتی توازن کو لنگر انداز کرتی ہے', textEn: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        textUr: 'سوال 18/20: میری توانائی کی سطح دن بھر مستحکم رہتی ہے۔',
        textEn: 'Q18/20: My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', textUr: 'توانائی دن بھر تیزی سے گرتی ہے', textEn: 'Energy drops sharply through the day' },
          { emoji: '📊', textUr: 'میرا توانائی گراف مسلسل زگ زیگ ہے', textEn: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', textUr: 'توانائی ہلکی کمی کے ساتھ زیادہ تر مستحکم ہے', textEn: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', textUr: 'مجھے دن کے زیادہ تر حصے میں پائیدار طور پر توانائی محسوس ہوتی ہے', textEn: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        textUr: 'سوال 19/20: میرے حالیہ تعاملات نے مجھے دوسروں سے جڑا ہوا محسوس کرایا ہے۔',
        textEn: 'Q19/20: My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', textUr: 'زیادہ تر تھکا دینے والے یا منقطع کرنے والے تعاملات', textEn: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', textUr: 'زیادہ احساس کے بغیر غیر جانبدار تبادلے', textEn: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', textUr: 'عام طور پر گرم اور جوڑنے والے لمحات', textEn: 'Generally warm and connecting moments' },
          { emoji: '💞', textUr: 'بہت سے تعاملات میں گہرے، پرورش کرنے والے روابط', textEn: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        textUr: 'سوال 20/20: زندگی ایک تجربے کی طرح زیادہ محسوس ہوتی ہے جس میں میں مصروف ہوں، نہ کہ کچھ ایسا جس سے میں صرف گزرتا ہوں۔',
        textEn: 'Q20/20: Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', textUr: 'پس منظر والپیپر کی طرح جس کی میں شاید ہی نوٹس لیتا ہوں', textEn: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', textUr: 'ایک فلم کی طرح جو میں سائیڈ لائنز سے دیکھتا ہوں', textEn: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', textUr: 'ایک گیم کی طرح جس میں میں اب اور پھر شامل ہوتا ہوں', textEn: 'Like a game I join in now and then' },
          { emoji: '🎢', textUr: 'ایک کھلتے ہوئے مہم جوئی کی طرح جس کا میں مکمل طور پر حصہ ہوں', textEn: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function UrduQuizPage() {
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
    const savedAnswers = localStorage.getItem('quizAnswersUrdu');
    const savedPage = localStorage.getItem('quizCurrentPageUrdu');
    
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
      localStorage.setItem('quizAnswersUrdu', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPageUrdu', currentPage.toString());
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
      localStorage.removeItem('quizAnswersUrdu');
      localStorage.removeItem('quizCurrentPageUrdu');
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
      <div
        className={`fixed left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-white shadow-xl border transition-all duration-500 z-50 ${
          showAlert ? 'top-5' : '-top-32'
        }`}
        style={{ color: '#de0f3f' }}
      >
        براہ کرم آگے بڑھنے کے لیے تمام سوالات کے جوابات دیں
      </div>

      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              کوئز مکمل 🎉
            </h2>
            <p className="text-gray-600">
              آپ کا خوشی کا سکور اگلے مرحلے میں شمار کیا جائے گا۔
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
            <span>گھر واپس</span>
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

      <main className="flex-1 px-6 pb-32">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-5">
          {currentQuestions.map(q => (
            <div
              key={q.id}
              className="flex-1 bg-[#f8f8f8] p-6 rounded-3xl"
            >
              <div className="mb-5">
                <h2 className="font-bold text-gray-900 text-base mb-1">{q.textUr}</h2>
                <p className="text-gray-500 text-xs" dir="ltr">{q.textEn}</p>
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
                        <div className="text-sm font-medium">{opt.textUr}</div>
                        <div className={`text-xs mt-0.5 ${selected ? 'text-white/80' : 'text-gray-500'}`} dir="ltr">
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
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'ختم' : 'اگلا قدم'}
        </button>
        <button
          onClick={movePrevious}
          disabled={currentPage === 1}
          className="flex-1 py-3 rounded-full text-black font-semibold text-sm disabled:opacity-40 hover:bg-gray-200 transition-colors"
        >
          پیچھے
        </button>
      </footer>
    </div>
  );
}