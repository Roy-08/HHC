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
        text: '質問 1/20: 自分の人生を振り返ると、それは...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: '筋書きを失い続ける物語', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: '多くの編集が必要な下書き', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: 'ほぼ正しい軌道に乗っている脚本', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: 'あるべき姿で展開する物語', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: '質問 2/20: 外部の状況に関係なく、私の内面世界は穏やかで落ち着いていると感じます。',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: '振られた炭酸飲料の缶のように', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: '散らかってはリセットされる部屋のように', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: 'まれに波紋が立つ池のように', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: '深い湖のように、内部はほとんど静か', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: '質問 3/20: 私は一日の方向性を持って目覚めます。',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: '自動操縦で、ただ動作をこなしている', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: '何をすべきか漠然としたアイデアで', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: '大まかなゲームプランを持って', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: '一日の明確な内なる羅針盤を持って', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: '質問 4/20: 私の現在の生活は、かつて望んでいた生活に似ています。',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: '選んだことのない家に住んでいるよう', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: 'いくつか正しい部屋がある家のよう', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: '大まかに想像していた家のよう', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: 'かつて紙に描いた人生の中を歩いているよう', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: '質問 5/20: 私の思考は、私を消耗させるよりも力を与えてくれます。',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: 'ほとんど背景の批判のよう', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: '疑いと小さな励ましの言葉の混合', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: 'しばしば支援的な内なるコーチのよう', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: '主に安定した内なる応援団のよう', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: '質問 6/20: 私はインスピレーションを感じます...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: 'ほとんどなく、ほとんどの日が平坦に感じる', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: '小さな火花が時々現れる', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: '多くの日に穏やかな輝きが存在する', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: '行動を促す頻繁な爆発', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: '創造し続ける安定した内なる炎', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: '質問 7/20: 計画が変更または中断されると、私の平静さが影響を受けます',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: '計画が変わると感情的に崩壊する', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: 'ひどく動揺し、動揺したままになる', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: 'よろめくがバランスを取り戻す', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: '軽い不快感で調整する', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: '集中したままで、単に再ルート化する', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: '質問 8/20: 私は自分がしていることに精神的に存在し、没頭していると感じます。',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: 'ほとんどミュート、心は他の場所にある', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: '半分ここ、半分次のことに', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: 'いくつかの見落としはあるが一般的に存在', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: '時間の経過を忘れるほど没頭', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: '深く没頭し、人生が鮮やかに感じる', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: '質問 9/20: 私の未来は見えます...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: '照明が消された廊下のよう', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: 'かすかな輪郭のある霧の小道のよう', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: '間隔をあけてランプがある曲がりくねった道のよう', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: '明確な標識のある開けた高速道路のよう', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: '多くの明るい道のある広い地平線のよう', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: '質問 10/20: 私の人生は感情的なリターンを与えてくれます — 喜び、誇り、充実感。',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: 'ほとんど感情的な損失または消耗', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: 'リターンのいくつかの散在する瞬間', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: '喜びと充実感の公正な分け前', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: '努力に値すると感じる一貫したリターン', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: 'ほとんどの分野で豊かな感情的配当', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: '質問 11/20: 私は時間とともに人として成長します。',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: '繰り返しに閉じ込められていると感じる', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: '小さな、まれなジャンプでのみ成長する', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: '着実な内面の成長を感じることができる', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: '顕著な方法で進化し続ける', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: '質問 12/20: 意味と目的が私の決定を導きます。',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: 'ほとんど生存と緊急性が私を動かす', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: '時々それが本当に重要かどうかをチェックする', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: 'しばしば私の「なぜ」との整合性をチェックする', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: '主に私の選択は明確な内なる目的に従う', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: '質問 13/20: 自分自身でいることが快適に感じます。',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: '通り抜けるためにしばしば仮面をつける', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: '少数の人とだけ自分自身でいられる', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: 'ほとんどの場所でほとんど自分自身', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: 'ほぼどこでも自分の肌で家にいるように感じる', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: '質問 14/20: 私は自分自身の会社を楽しんでいます。',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: '自分自身と一緒にいることを避ける', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: '少量で自分自身の会社を我慢する', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: '一般的に自分自身と時間を過ごすのが好き', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: '本当に自分の一人の時間を楽しみにしている', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: '質問 15/20: 人々は私の周りで感情的に安全だと感じます。',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: '人々は私に心を開くことをためらう', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: '少数が共有するが、慎重に', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: '多くの人が簡単に私に打ち明ける', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: '私はしばしば人々が最初に頼る人', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: '質問 16/20: 最近の日々について考えると、楽しい瞬間を思い出します。',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: '何か楽しいことを思い出すのに苦労する', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: 'いくつかの散在する良い瞬間が浮かぶ', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: 'いくつかの温かい記憶が簡単に浮かぶ', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: '多くの鮮やかな楽しい瞬間が一度に思い浮かぶ', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: '質問 17/20: 睡眠の質が良いとき、私の感情的安定性は良くなります。',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: '睡眠に関係なく気分が不安定', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: '睡眠は少し助けるが確実ではない', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: '良い睡眠は通常私をより安定させる', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: '良い睡眠は明らかに私の感情的バランスを固定する', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: '質問 18/20: 私のエネルギーレベルは一日中安定しています。',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: '一日を通してエネルギーが急激に低下', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: '私のエネルギーグラフは連続的なジグザグ', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: 'エネルギーは軽い低下でほとんど安定', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: '一日のほとんどを持続的に元気に感じる', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: '質問 19/20: 最近の私の交流は、他者とつながっていると感じさせてくれました。',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: 'ほとんど消耗または切断する交流', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: 'あまり感情のない中立的な交換', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: '一般的に温かくつながる瞬間', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: '多くの交流で深く、栄養を与えるつながり', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: '質問 20/20: 人生は、私が単に通り過ぎるものではなく、私が関与している体験のように感じます。',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: 'ほとんど気づかない背景の壁紙のよう', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: '傍観者から見ている映画のよう', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: '時々参加するゲームのよう', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: '私が完全に一部である展開する冒険のよう', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function JapaneseQuizPage() {
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
    const savedAnswers = localStorage.getItem('japaneseQuizAnswers');
    const savedPage = localStorage.getItem('japaneseQuizCurrentPage');
    
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
      localStorage.setItem('japaneseQuizAnswers', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('japaneseQuizCurrentPage', currentPage.toString());
  }, [currentPage]);

  /** ✅ SAFE SCROLL (NO window ERROR) */
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
      localStorage.removeItem('japaneseQuizAnswers');
      localStorage.removeItem('japaneseQuizCurrentPage');
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
        続行するにはすべての質問に答えてください
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              クイズ完了 🎉
            </h2>
            <p className="text-gray-600">
              あなたの幸福スコアは次のステップで計算されます。
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
            <span>ホームに戻る</span>
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
          戻る
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? '完了' : '次へ'}
        </button>
      </footer>
    </div>
  );
}