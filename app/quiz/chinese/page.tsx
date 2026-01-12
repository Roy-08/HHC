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
        text: '问题 1/20：当我审视自己的生活时，感觉就像...',
        subtext: 'When I look at my life, it feels like...',
        options: [
          { emoji: '🧩', text: '一个不断失去情节的故事', subtext: 'A story that keeps losing its plot' },
          { emoji: '📝', text: '一份有许多待编辑内容的草稿', subtext: 'A rough draft with many edits pending' },
          { emoji: '🎬', text: '一个大致走在正轨上的剧本', subtext: 'A script that is mostly on track' },
          { emoji: '📖', text: '一个按应有方式展开的叙事', subtext: 'A narrative unfolding the way it should' },
        ],
      },
      {
        id: 'q2',
        text: '问题 2/20：无论外部环境如何,我的内心世界都感到平静和安定。',
        subtext: 'My inner world feels calm and settled irrespective of outer situations.',
        options: [
          { emoji: '🥤', text: '像一罐被摇晃的汽水', subtext: 'Like a shaken soda can' },
          { emoji: '🏠', text: '像一个变乱然后重置的房间', subtext: 'Like a room that gets messy and then reset' },
          { emoji: '💧', text: '像一个偶有涟漪的池塘', subtext: 'Like a pond with rare ripples' },
          { emoji: '🌊', text: '像一个深湖,内部大多平静', subtext: 'Like a deep lake, mostly still inside' },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: 'q3',
        text: '问题 3/20：我醒来时对即将到来的一天有方向感。',
        subtext: 'I wake up with a sense of direction for the day ahead.',
        options: [
          { emoji: '🤖', text: '自动驾驶模式,只是走过场', subtext: 'On autopilot, just going through motions' },
          { emoji: '🌫️', text: '对要做什么有模糊的想法', subtext: 'With a vague idea of what to do' },
          { emoji: '🗺️', text: '心中有一个宽松的游戏计划', subtext: 'With a loose game plan in mind' },
          { emoji: '🧭', text: '对这一天有清晰的内在指南针', subtext: 'With a clear inner compass for the day' },
        ],
      },
      {
        id: 'q4',
        text: '问题 4/20：我现在的生活与我曾经希望的生活相似。',
        subtext: 'My present life resembles the life I once wished for.',
        options: [
          { emoji: '🏚️', text: '像住在一个我从未选择的房子里', subtext: 'Like living in a house I never chose' },
          { emoji: '🏠', text: '像一个有几个正确房间的房子', subtext: 'Like a house with a few right rooms' },
          { emoji: '🏡', text: '像我大致想象的家', subtext: 'Like the home I had roughly imagined' },
          { emoji: '🖼️', text: '像走进我曾在纸上画过的生活', subtext: 'Like walking inside the life I once drew on paper' },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: 'q5',
        text: '问题 5/20：我的想法赋予我力量多于消耗我。',
        subtext: 'My thoughts empower me more than they drain me.',
        options: [
          { emoji: '📢', text: '主要像背景批评', subtext: 'Mostly like background criticism' },
          { emoji: '⚖️', text: '怀疑和小鼓励的混合', subtext: 'A mix of doubts and small pep talks' },
          { emoji: '🧠', text: '经常像一个支持性的内在教练', subtext: 'Often like a supportive inner coach' },
          { emoji: '📣', text: '很大程度上像一个稳定的内在啦啦队', subtext: 'Largely like a steady inner cheer squad' },
        ],
      },
      {
        id: 'q6',
        text: '问题 6/20：我感到受到启发...',
        subtext: 'I feel inspired…',
        options: [
          { emoji: '☁️', text: '几乎从不,大多数日子感觉平淡', subtext: 'Almost never, most days feel flat' },
          { emoji: '⚡', text: '偶尔会出现小火花', subtext: 'Small sparks show up once in a while' },
          { emoji: '🕯️', text: '许多日子里都有温和的光芒', subtext: 'A gentle glow is present on many days' },
          { emoji: '🔥', text: '频繁的爆发促使我行动', subtext: 'Frequent bursts that move me to act' },
          { emoji: '☀️', text: '一个稳定的内在火焰让我不断创造', subtext: 'A steady inner fire that keeps me creating' },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: 'q7',
        text: '问题 7/20：当计划改变或破裂时,我的平静感会受到影响',
        subtext: 'When plans shift or break, my sense of calm is affected',
        options: [
          { emoji: '💥', text: '计划改变时我情绪崩溃', subtext: 'I crash emotionally when plans change' },
          { emoji: '😰', text: '我严重动摇并保持不安', subtext: 'I get badly shaken and stay upset' },
          { emoji: '🌀', text: '我摇摆但重新获得平衡', subtext: 'I wobble but regain balance' },
          { emoji: '🧘', text: '我以轻微的不适进行调整', subtext: 'I adjust with mild discomfort' },
          { emoji: '🎯', text: '我保持专注并简单地重新规划路线', subtext: 'I stay centred and simply re-route' },
        ],
      },
      {
        id: 'q8',
        text: '问题 8/20：我在做的事情中感到精神上的存在和投入。',
        subtext: 'I feel mentally present and absorbed in what I do.',
        options: [
          { emoji: '🔇', text: '大多数时候静音,心思在别处', subtext: 'Mostly on mute, mind is elsewhere' },
          { emoji: '↔️', text: '一半在这里,一半在下一件事上', subtext: 'Half here, half on the next thing' },
          { emoji: '👁️', text: '通常存在但有一些失误', subtext: 'Generally present with a few slips' },
          { emoji: '⏰', text: '沉浸到足以忘记时间', subtext: 'Immersed enough to lose track of time' },
          { emoji: '✨', text: '深深投入,生活感觉生动', subtext: 'Deeply absorbed, life feels vivid' },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: 'q9',
        text: '问题 9/20：我的未来看起来像...',
        subtext: 'My future appears as…',
        options: [
          { emoji: '🌑', text: '一条灯光关闭的走廊', subtext: 'A corridor with lights switched off' },
          { emoji: '🌫️', text: '一条有模糊轮廓的雾蒙蒙的小巷', subtext: 'A foggy lane with faint outlines' },
          { emoji: '🛣️', text: '一条有间隔灯的蜿蜒道路', subtext: 'A winding road with lamps at intervals' },
          { emoji: '🛤️', text: '一条有清晰路标的开阔高速公路', subtext: 'An open highway with clear signboards' },
          { emoji: '🌅', text: '一个有许多明亮道路的广阔地平线', subtext: 'A wide horizon with many bright paths' },
        ],
      },
      {
        id: 'q10',
        text: '问题 10/20：我的生活给我情感回报——快乐、自豪、满足。',
        subtext: 'My life gives me emotional returns — joy, pride, fulfilment.',
        options: [
          { emoji: '📉', text: '主要是情感损失或消耗', subtext: 'Mostly emotional losses or drains' },
          { emoji: '💫', text: '一些零散的回报时刻', subtext: 'A few scattered moments of return' },
          { emoji: '⚖️', text: '相当份额的快乐和满足', subtext: 'A fair share of joy and fulfilment' },
          { emoji: '📈', text: '持续的回报感觉值得努力', subtext: 'Consistent returns that feel worth the effort' },
          { emoji: '💎', text: '大多数领域的丰富情感红利', subtext: 'Rich emotional dividends in most areas' },
        ],
      },
    ],
  },
  {
    page: 6,
    questions: [
      {
        id: 'q11',
        text: '问题 11/20：随着时间的推移,我作为一个人在成长。',
        subtext: 'I grow as a person with time.',
        options: [
          { emoji: '🔄', text: '我感觉被困在重复中', subtext: 'I feel stuck on repeat' },
          { emoji: '📊', text: '我只在小而罕见的跳跃中成长', subtext: 'I grow only in small, rare jumps' },
          { emoji: '🌱', text: '我能感觉到稳定的内在成长', subtext: 'I can sense steady inner growth' },
          { emoji: '🌳', text: '我以明显的方式不断进化', subtext: 'I keep evolving in noticeable ways' },
        ],
      },
      {
        id: 'q12',
        text: '问题 12/20：意义和目的指导我的决定。',
        subtext: 'Meaning and purpose guide my decisions.',
        options: [
          { emoji: '🚨', text: '主要是生存和紧迫性驱使我', subtext: 'Mostly survival and urgency drive me' },
          { emoji: '🤔', text: '有时我检查它是否真的重要', subtext: 'Sometimes I check if it truly matters' },
          { emoji: '🧭', text: '我经常检查与我的"为什么"的一致性', subtext: 'Often I check alignment with my why' },
          { emoji: '⭐', text: '很大程度上我的选择遵循明确的内在目的', subtext: 'Largely my choices follow a clear inner purpose' },
        ],
      },
    ],
  },
  {
    page: 7,
    questions: [
      {
        id: 'q13',
        text: '问题 13/20：做自己感觉很舒服。',
        subtext: 'Being myself feels comfortable.',
        options: [
          { emoji: '🎭', text: '我经常戴着面具度过', subtext: 'I often wear masks to get through' },
          { emoji: '👥', text: '我只能和少数人做自己', subtext: 'I can be myself only with a few people' },
          { emoji: '😊', text: '我在大多数空间里大多是自己', subtext: 'I am mostly myself in most spaces' },
          { emoji: '💯', text: '我几乎在任何地方都感到自在', subtext: 'I feel at home in my own skin almost everywhere' },
        ],
      },
      {
        id: 'q14',
        text: '问题 14/20：我享受自己的陪伴。',
        subtext: 'I enjoy my own company.',
        options: [
          { emoji: '🚫', text: '我避免独自与自己在一起', subtext: 'I avoid being alone with myself' },
          { emoji: '⏱️', text: '我以小剂量容忍自己的陪伴', subtext: 'I tolerate my own company in small doses' },
          { emoji: '👍', text: '我通常喜欢与自己共度时光', subtext: 'I generally like spending time with myself' },
          { emoji: '💖', text: '我真正期待我的独处时间', subtext: 'I genuinely look forward to my alone time' },
        ],
      },
    ],
  },
  {
    page: 8,
    questions: [
      {
        id: 'q15',
        text: '问题 15/20：人们在我身边感到情感上的安全。',
        subtext: 'People feel emotionally safe around me.',
        options: [
          { emoji: '🚧', text: '人们犹豫向我敞开心扉', subtext: 'People hesitate to open up to me' },
          { emoji: '🤐', text: '少数人分享,但很谨慎', subtext: 'A few share, but cautiously' },
          { emoji: '🤗', text: '许多人轻松地向我倾诉', subtext: 'Many people confide in me with ease' },
          { emoji: '🛡️', text: '我经常是人们首先求助的人', subtext: 'I am often the person people turn to first' },
        ],
      },
      {
        id: 'q16',
        text: '问题 16/20：当我想起最近的日子时,我回忆起愉快的时刻。',
        subtext: 'When I think of recent days, I recall pleasant moments.',
        options: [
          { emoji: '😶', text: '我很难回忆起任何愉快的事情', subtext: 'I struggle to recall anything pleasant' },
          { emoji: '🌟', text: '一些零散的美好时刻浮现', subtext: 'A few scattered good moments come up' },
          { emoji: '😌', text: '几个温暖的回忆很容易浮现', subtext: 'Several warm memories surface easily' },
          { emoji: '🌈', text: '许多生动的愉快时刻同时浮现在脑海中', subtext: 'Many vivid pleasant moments come to mind at once' },
        ],
      },
    ],
  },
  {
    page: 9,
    questions: [
      {
        id: 'q17',
        text: '问题 17/20：当我的睡眠质量好时,我的情绪稳定性更好。',
        subtext: 'My emotional stability is better when my quality of sleep is good.',
        options: [
          { emoji: '🌪️', text: '无论睡眠如何,我的情绪都不稳定', subtext: 'My moods are unstable regardless of sleep' },
          { emoji: '🤷', text: '睡眠有点帮助但不可靠', subtext: 'Sleep helps a little but not reliably' },
          { emoji: '😴', text: '良好的睡眠通常让我更稳定', subtext: 'Good sleep usually keeps me steadier' },
          { emoji: '⚓', text: '良好的睡眠明显稳定我的情绪平衡', subtext: 'Good sleep clearly anchors my emotional balance' },
        ],
      },
      {
        id: 'q18',
        text: '问题 18/20：我的能量水平全天保持稳定。',
        subtext: 'My energy levels stay steady through the day.',
        options: [
          { emoji: '📉', text: '能量在一天中急剧下降', subtext: 'Energy drops sharply through the day' },
          { emoji: '📊', text: '我的能量图是一个持续的锯齿', subtext: 'My energy graph is a continuous zigzag' },
          { emoji: '➖', text: '能量大多稳定,有轻微下降', subtext: 'Energy is mostly steady with mild dips' },
          { emoji: '🔋', text: '我一天中大部分时间感到持续充满活力', subtext: 'I feel sustainably energised most of the day' },
        ],
      },
    ],
  },
  {
    page: 10,
    questions: [
      {
        id: 'q19',
        text: '问题 19/20：我最近的互动让我感到与他人有联系。',
        subtext: 'My interactions recently have left me feeling connected to others.',
        options: [
          { emoji: '⛓️', text: '主要是消耗或断开连接的互动', subtext: 'Mostly draining or disconnecting interactions' },
          { emoji: '😐', text: '中性的交流,没有太多感觉', subtext: 'Neutral exchanges without much feeling' },
          { emoji: '🤝', text: '通常是温暖和连接的时刻', subtext: 'Generally warm and connecting moments' },
          { emoji: '💞', text: '许多互动中的深刻、滋养的联系', subtext: 'Deep, nourishing connections in many interactions' },
        ],
      },
      {
        id: 'q20',
        text: '问题 20/20：生活更像是我参与的体验,而不是我只是经过的东西。',
        subtext: 'Life feels more like an experience I am engaged in, rather than something I simply pass through.',
        options: [
          { emoji: '🖼️', text: '像我几乎没注意到的背景壁纸', subtext: 'Like background wallpaper I hardly notice' },
          { emoji: '🎬', text: '像我从旁观看的电影', subtext: 'Like a movie I watch from the side-lines' },
          { emoji: '🎮', text: '像我偶尔参与的游戏', subtext: 'Like a game I join in now and then' },
          { emoji: '🎢', text: '像我完全参与的展开冒险', subtext: 'Like an unfolding adventure I am fully part of' },
        ],
      },
    ],
  },
];

export default function ChineseQuizPage() {
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
    const savedAnswers = localStorage.getItem('quizAnswersChinese');
    const savedPage = localStorage.getItem('quizCurrentPageChinese');
    
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
      localStorage.setItem('quizAnswersChinese', JSON.stringify(answers));
    }
  }, [answers]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizCurrentPageChinese', currentPage.toString());
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
      localStorage.removeItem('quizAnswersChinese');
      localStorage.removeItem('quizCurrentPageChinese');
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
        请回答所有问题以继续
      </div>

      {/* COMPLETE MODAL */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#de0f3f] mb-3">
              测验完成 🎉
            </h2>
            <p className="text-gray-600">
              您的幸福指数将在下一步计算。
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
            <span>返回主页</span>
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
          上一页
        </button>
        <button
          onClick={validateAndMove}
          className="flex-1 py-3 rounded-full text-white font-semibold text-sm bg-[#de0f3f] hover:bg-[#c00d37] transition-colors"
        >
          {currentPage === totalPages ? '完成' : '下一页'}
        </button>
      </footer>
    </div>
  );
}