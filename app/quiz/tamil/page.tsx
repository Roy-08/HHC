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
        textTa: 'கே1/20: நான் என் வாழ்க்கையைப் பார்க்கும்போது, அது இப்படி உணர்கிறது...',
        textEn: 'Q1/20: When I look at my life, it feels like...',
        options: [
          { emoji: '🚀', textTa: 'சரியான திசையில் நகரும் ஒரு கதை', textEn: 'A story moving in the right direction' },
          { emoji: '🧩', textTa: 'அதன் கதைக்களத்தை இழந்துகொண்டே இருக்கும் ஒரு கதை', textEn: 'A story that keeps losing its plot' },
          { emoji: '📝', textTa: 'பல திருத்தங்கள் நிலுவையில் உள்ள ஒரு கரடு வரைவு', textEn: 'A rough draft with many edits pending' },
          { emoji: '🎬', textTa: 'பெரும்பாலும் பாதையில் இருக்கும் ஒரு ஸ்கிரிப்ட்', textEn: 'A script that is mostly on track' },
          { emoji: '📖', textTa: 'இருக்க வேண்டிய விதத்தில் விரிவடையும் ஒரு கதை', textEn: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        textTa: 'கே2/20: வெளிப்புற சூழ்நிலைகளைப் பொருட்படுத்தாமல் என் உள் உலகம் அமைதியாகவும் நிலையாகவும் உணர்கிறது.',
        textEn: 'Q2/20: My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', textTa: 'குலுக்கப்பட்ட சோடா கேன் போல', textEn: 'Like a shaken soda can' },
          { emoji: '🏠', textTa: 'குழப்பமடைந்து பின்னர் மீட்டமைக்கப்படும் ஒரு அறை போல', textEn: 'Like a room that gets messy and then reset' },
          { emoji: '💧', textTa: 'அரிதான அலைகளுடன் கூடிய குளம் போல', textEn: 'Like a pond with rare ripples' },
          { emoji: '🌊', textTa: 'ஆழமான ஏரி போல, உள்ளே பெரும்பாலும் அமைதியானது', textEn: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        textTa: 'கே3/20: முன்னால் உள்ள நாளுக்கான திசை உணர்வுடன் நான் எழுகிறேன்.',
        textEn: 'Q3/20: I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', textTa: 'தானியங்கி பயன்முறையில், வெறும் இயக்கங்களை கடந்து செல்கிறேன்', textEn: 'On autopilot, just going through motions' },
          { emoji: '🌫️', textTa: 'என்ன செய்ய வேண்டும் என்பதைப் பற்றிய தெளிவற்ற யோசனையுடன்', textEn: 'With a vague idea of what to do' },
          { emoji: '🗺️', textTa: 'மனதில் ஒரு தளர்வான விளையாட்டுத் திட்டத்துடன்', textEn: 'With a loose game plan in mind' },
          { emoji: '🧭', textTa: 'நாளுக்கான தெளிவான உள் திசைகாட்டியுடன்', textEn: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        textTa: 'கே4/20: என் தற்போதைய வாழ்க்கை நான் ஒருமுறை விரும்பிய வாழ்க்கையை ஒத்திருக்கிறது.',
        textEn: 'Q4/20: My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', textTa: 'நான் ஒருபோதும் தேர்ந்தெடுக்காத வீட்டில் வாழ்வது போல', textEn: 'Like living in a house I never chose' },
          { emoji: '🏠', textTa: 'சில சரியான அறைகள் கொண்ட வீடு போல', textEn: 'Like a house with a few right rooms' },
          { emoji: '🏡', textTa: 'நான் தோராயமாக கற்பனை செய்த வீடு போல', textEn: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', textTa: 'நான் ஒருமுறை காகிதத்தில் வரைந்த வாழ்க்கைக்குள் நடப்பது போல', textEn: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        textTa: 'கே5/20: என் எண்ணங்கள் என்னை வடிகட்டுவதை விட அதிகமாக அதிகாரம் அளிக்கின்றன.',
        textEn: 'Q5/20: My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', textTa: 'பெரும்பாலும் பின்னணி விமர்சனம் போல', textEn: 'Mostly like background criticism' },
          { emoji: '⚖️', textTa: 'சந்தேகங்கள் மற்றும் சிறிய ஊக்க உரைகளின் கலவை', textEn: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', textTa: 'பெரும்பாலும் ஆதரவான உள் பயிற்சியாளர் போல', textEn: 'Often like a supportive inner coach' },
          { emoji: '📣', textTa: 'பெரும்பாலும் நிலையான உள் உற்சாக அணி போல', textEn: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        textTa: 'கே6/20: நான் உத்வேகம் பெறுகிறேன்...',
        textEn: 'Q6/20: I feel inspired…',
        options: [
          { emoji: '☁️', textTa: 'கிட்டத்தட்ட ஒருபோதும் இல்லை, பெரும்பாலான நாட்கள் சமமாக உணர்கின்றன', textEn: 'Almost never, most days feel flat' },
          { emoji: '⚡', textTa: 'சிறிய தீப்பொறிகள் எப்போதாவது தோன்றும்', textEn: 'Small sparks show up once in a while' },
          { emoji: '🕯️', textTa: 'பல நாட்களில் மென்மையான பிரகாசம் உள்ளது', textEn: 'A gentle glow is present on many days' },
          { emoji: '🔥', textTa: 'என்னை செயல்பட தூண்டும் அடிக்கடி வெடிப்புகள்', textEn: 'Frequent bursts that move me to act' },
          { emoji: '☀️', textTa: 'என்னை உருவாக்கிக் கொண்டிருக்கும் நிலையான உள் நெருப்பு', textEn: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        textTa: 'கே7/20: திட்டங்கள் மாறும்போது அல்லது உடையும்போது, என் அமைதி உணர்வு பாதிக்கப்படுகிறது',
        textEn: 'Q7/20: When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', textTa: 'திட்டங்கள் மாறும்போது நான் உணர்ச்சிவசப்பட்டு விழுகிறேன்', textEn: 'I crash emotionally when plans change' },
          { emoji: '😰', textTa: 'நான் மோசமாக அதிர்ந்து மன உளைச்சலில் இருக்கிறேன்', textEn: 'I get badly shaken and stay upset' },
          { emoji: '🌀', textTa: 'நான் தள்ளாடுகிறேன் ஆனால் சமநிலையை மீண்டும் பெறுகிறேன்', textEn: 'I wobble but regain balance' },
          { emoji: '🧘', textTa: 'லேசான அசௌகரியத்துடன் நான் சரிசெய்கிறேன்', textEn: 'I adjust with mild discomfort' },
          { emoji: '🎯', textTa: 'நான் மையமாக இருக்கிறேன் மற்றும் வெறுமனே மறுபாதையை அமைக்கிறேன்', textEn: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        textTa: 'கே8/20: நான் செய்வதில் மனரீதியாக இருப்பதாகவும் உள்வாங்கப்பட்டதாகவும் உணர்கிறேன்.',
        textEn: 'Q8/20: I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', textTa: 'பெரும்பாலும் ஒலியடக்கத்தில், மனம் வேறு இடத்தில் உள்ளது', textEn: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', textTa: 'பாதி இங்கே, பாதி அடுத்த விஷயத்தில்', textEn: 'Half here, half on the next thing' },
          { emoji: '👁️', textTa: 'பொதுவாக சில தவறுகளுடன் இருக்கிறேன்', textEn: 'Generally present with a few slips' },
          { emoji: '⏰', textTa: 'நேரத்தின் தடத்தை இழக்கும் அளவுக்கு மூழ்கியிருக்கிறேன்', textEn: 'Immersed enough to lose track of time' },
          { emoji: '✨', textTa: 'ஆழமாக உள்வாங்கப்பட்டுள்ளேன், வாழ்க்கை தெளிவாக உணர்கிறது', textEn: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        textTa: 'கே9/20: என் எதிர்காலம் தோன்றுகிறது...',
        textEn: 'Q9/20: My future appears as…',
        options: [
          { emoji: '🌑', textTa: 'விளக்குகள் அணைக்கப்பட்ட ஒரு நடைபாதை போல', textEn: 'A corridor with lights switched off' },
          { emoji: '🌫️', textTa: 'மங்கலான வெளிப்புறங்களுடன் மூடுபனி நிறைந்த பாதை போல', textEn: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', textTa: 'இடைவெளியில் விளக்குகள் கொண்ட வளைந்த சாலை போல', textEn: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', textTa: 'தெளிவான பலகைகள் கொண்ட திறந்த நெடுஞ்சாலை போல', textEn: 'An open highway with clear signboards' },
          { emoji: '🌅', textTa: 'பல பிரகாசமான பாதைகள் கொண்ட பரந்த அடிவானம் போல', textEn: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        textTa: 'கே10/20: என் வாழ்க்கை எனக்கு உணர்ச்சி வருமானத்தை தருகிறது — மகிழ்ச்சி, பெருமை, நிறைவு.',
        textEn: 'Q10/20: My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', textTa: 'பெரும்பாலும் உணர்ச்சி இழப்புகள் அல்லது வடிகால்கள்', textEn: 'Mostly emotional losses or drains' },
          { emoji: '💫', textTa: 'திரும்பப் பெறுவதற்கான சில சிதறிய தருணங்கள்', textEn: 'A few scattered moments of return' },
          { emoji: '⚖️', textTa: 'மகிழ்ச்சி மற்றும் நிறைவின் நியாயமான பங்கு', textEn: 'A fair share of joy and fulfilment' },
          { emoji: '📈', textTa: 'முயற்சிக்கு மதிப்புள்ளதாக உணரும் நிலையான வருமானம்', textEn: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', textTa: 'பெரும்பாலான பகுதிகளில் வளமான உணர்ச்சி ஈவுத்தொகை', textEn: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        textTa: 'கே11/20: காலப்போக்கில் நான் ஒரு நபராக வளர்கிறேன்.',
        textEn: 'Q11/20: I grow as a person with time.',
        options: [
          { emoji: '🔄', textTa: 'நான் மீண்டும் மீண்டும் சிக்கியிருப்பதாக உணர்கிறேன்', textEn: 'I feel stuck on repeat' },
          { emoji: '📊', textTa: 'நான் சிறிய, அரிதான தாவல்களில் மட்டுமே வளர்கிறேன்', textEn: 'I grow only in small, rare jumps' },
          { emoji: '🌱', textTa: 'நிலையான உள் வளர்ச்சியை என்னால் உணர முடிகிறது', textEn: 'I can sense steady inner growth' },
          { emoji: '🌳', textTa: 'நான் குறிப்பிடத்தக்க வழிகளில் தொடர்ந்து வளர்கிறேன்', textEn: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        textTa: 'கே12/20: அர்த்தமும் நோக்கமும் என் முடிவுகளை வழிநடத்துகின்றன.',
        textEn: 'Q12/20: Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', textTa: 'பெரும்பாலும் உயிர்வாழ்வு மற்றும் அவசரம் என்னை இயக்குகிறது', textEn: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', textTa: 'சில நேரங்களில் இது உண்மையில் முக்கியமா என்று சரிபார்க்கிறேன்', textEn: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', textTa: 'பெரும்பாலும் என் "ஏன்" உடன் சீரமைப்பை சரிபார்க்கிறேன்', textEn: 'Often I check alignment with my why' },
          { emoji: '⭐', textTa: 'பெரும்பாலும் என் தேர்வுகள் தெளிவான உள் நோக்கத்தை பின்பற்றுகின்றன', textEn: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        textTa: 'கே13/20: நானாக இருப்பது வசதியாக உணர்கிறது.',
        textEn: 'Q13/20: Being myself feels comfortable.',
        options: [
          { emoji: '🎭', textTa: 'நான் அடிக்கடி கடந்து செல்ல முகமூடிகளை அணிகிறேன்', textEn: 'I often wear masks to get through' },
          { emoji: '👥', textTa: 'நான் சில நபர்களுடன் மட்டுமே நானாக இருக்க முடியும்', textEn: 'I can be myself only with a few people' },
          { emoji: '😊', textTa: 'நான் பெரும்பாலான இடங்களில் பெரும்பாலும் நானாக இருக்கிறேன்', textEn: 'I am mostly myself in most spaces' },
          { emoji: '💯', textTa: 'கிட்டத்தட்ட எல்லா இடங்களிலும் என் சொந்த தோலில் வீட்டில் இருப்பது போல உணர்கிறேன்', textEn: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        textTa: 'கே14/20: நான் என் சொந்த நிறுவனத்தை ரசிக்கிறேன்.',
        textEn: 'Q14/20: I enjoy my own company.',
        options: [
          { emoji: '🚫', textTa: 'என்னுடன் தனியாக இருப்பதை நான் தவிர்க்கிறேன்', textEn: 'I avoid being alone with myself' },
          { emoji: '⏱️', textTa: 'சிறிய அளவுகளில் என் சொந்த நிறுவனத்தை பொறுத்துக்கொள்கிறேன்', textEn: 'I tolerate my own company in small doses' },
          { emoji: '👍', textTa: 'பொதுவாக என்னுடன் நேரத்தை செலவிட விரும்புகிறேன்', textEn: 'I generally like spending time with myself' },
          { emoji: '💖', textTa: 'நான் உண்மையாக என் தனி நேரத்தை எதிர்நோக்குகிறேன்', textEn: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        textTa: 'கே15/20: மக்கள் என்னைச் சுற்றி உணர்ச்சி ரீதியாக பாதுகாப்பாக உணர்கிறார்கள்.',
        textEn: 'Q15/20: People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', textTa: 'மக்கள் என்னிடம் திறக்க தயங்குகிறார்கள்', textEn: 'People hesitate to open up to me' },
          { emoji: '🤐', textTa: 'சிலர் பகிர்ந்துகொள்கிறார்கள், ஆனால் எச்சரிக்கையுடன்', textEn: 'A few share, but cautiously' },
          { emoji: '🤗', textTa: 'பல மக்கள் எளிதில் என்னிடம் நம்பிக்கை வைக்கிறார்கள்', textEn: 'Many people confide in me with ease' },
          { emoji: '🛡️', textTa: 'நான் அடிக்கடி மக்கள் முதலில் திரும்பும் நபர்', textEn: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        textTa: 'கே16/20: சமீபத்திய நாட்களைப் பற்றி நினைக்கும்போது, இனிமையான தருணங்களை நினைவு கூருகிறேன்.',
        textEn: 'Q16/20: When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', textTa: 'இனிமையான எதையும் நினைவுபடுத்த நான் போராடுகிறேன்', textEn: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', textTa: 'சில சிதறிய நல்ல தருணங்கள் வருகின்றன', textEn: 'A few scattered good moments come up' },
          { emoji: '😌', textTa: 'பல சூடான நினைவுகள் எளிதில் மேலே வருகின்றன', textEn: 'Several warm memories surface easily' },
          { emoji: '🌈', textTa: 'பல தெளிவான இனிமையான தருணங்கள் ஒரே நேரத்தில் மனதில் வருகின்றன', textEn: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        textTa: 'கே17/20: என் தூக்கத்தின் தரம் நன்றாக இருக்கும்போது என் உணர்ச்சி நிலைத்தன்மை சிறப்பாக இருக்கும்.',
        textEn: 'Q17/20: My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', textTa: 'தூக்கத்தைப் பொருட்படுத்தாமல் என் மனநிலைகள் நிலையற்றவை', textEn: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', textTa: 'தூக்கம் கொஞ்சம் உதவுகிறது ஆனால் நம்பகமாக இல்லை', textEn: 'Sleep helps a little but not reliably' },
          { emoji: '😴', textTa: 'நல்ல தூக்கம் பொதுவாக என்னை நிலையாக வைத்திருக்கிறது', textEn: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', textTa: 'நல்ல தூக்கம் தெளிவாக என் உணர்ச்சி சமநிலையை நங்கூரமிடுகிறது', textEn: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        textTa: 'கே18/20: என் ஆற்றல் நிலைகள் நாள் முழுவதும் நிலையாக இருக்கும்.',
        textEn: 'Q18/20: My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', textTa: 'ஆற்றல் நாள் முழுவதும் கூர்மையாக குறைகிறது', textEn: 'Energy drops sharply through the day' },
          { emoji: '📊', textTa: 'என் ஆற்றல் வரைபடம் தொடர்ச்சியான ஜிக்ஜாக் ஆகும்', textEn: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', textTa: 'ஆற்றல் லேசான வீழ்ச்சிகளுடன் பெரும்பாலும் நிலையானது', textEn: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', textTa: 'நான் நாளின் பெரும்பகுதியை நிலையான முறையில் ஆற்றல் பெறுகிறேன்', textEn: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        textTa: 'கே19/20: என் சமீபத்திய தொடர்புகள் என்னை மற்றவர்களுடன் இணைக்கப்பட்டதாக உணர வைத்துள்ளன.',
        textEn: 'Q19/20: My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', textTa: 'பெரும்பாலும் வடிகட்டும் அல்லது துண்டிக்கும் தொடர்புகள்', textEn: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', textTa: 'அதிக உணர்வு இல்லாமல் நடுநிலை பரிமாற்றங்கள்', textEn: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', textTa: 'பொதுவாக சூடான மற்றும் இணைக்கும் தருணங்கள்', textEn: 'Generally warm and connecting moments' },
          { emoji: '💞', textTa: 'பல தொடர்புகளில் ஆழமான, ஊட்டமளிக்கும் இணைப்புகள்', textEn: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        textTa: 'கே20/20: வாழ்க்கை நான் ஈடுபட்டிருக்கும் ஒரு அனுபவம் போல அதிகம் உணர்கிறது, நான் வெறுமனே கடந்து செல்லும் ஒன்று அல்ல.',
        textEn: 'Q20/20: Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', textTa: 'நான் அரிதாகவே கவனிக்கும் பின்னணி வால்பேப்பர் போல', textEn: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', textTa: 'நான் பக்கவாட்டில் இருந்து பார்க்கும் திரைப்படம் போல', textEn: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', textTa: 'நான் அவ்வப்போது சேரும் விளையாட்டு போல', textEn: 'Like a game I join in now and then' },
          { emoji: '🎢', textTa: 'நான் முழுமையாக பங்கேற்கும் விரிவடையும் சாகசம் போல', textEn: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function TamilQuizPage() {
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
    const savedAnswers = localStorage.getItem('quizAnswersTamil');
    const savedPage = localStorage.getItem('quizCurrentPageTamil');
    
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
      localStorage.setItem('quizAnswersTamil', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPageTamil', currentPage.toString());
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
      localStorage.removeItem('quizAnswersTamil');
      localStorage.removeItem('quizCurrentPageTamil');
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
        தொடர அனைத்து கேள்விகளுக்கும் பதிலளிக்கவும்
      </div>

      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              வினாடி வினா முடிந்தது 🎉
            </h2>
            <p className="text-gray-600">
              உங்கள் மகிழ்ச்சி மதிப்பெண் அடுத்த கட்டத்தில் கணக்கிடப்படும்.
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
            <span>வீடு திரும்பு</span>
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
                <h2 className="font-bold text-gray-900 text-base mb-1">{q.textTa}</h2>
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
                        <div className="text-sm font-medium">{opt.textTa}</div>
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
          பின்னால்
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? 'முடி' : 'அடுத்த படி'}
        </button>
      </footer>
    </div>
  );
}