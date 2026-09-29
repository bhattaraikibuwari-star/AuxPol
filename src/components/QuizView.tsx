import React, { useState } from 'react';
import { QuizQuestion, KnowledgeItem, QuizDifficulty, UserProfile } from '../types';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Award, BookOpen, ArrowRight, Zap, Target, Flame, Trophy } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface QuizViewProps {
  knowledgeBase: KnowledgeItem[];
  userProfile: UserProfile;
  onUpdateScore: (xpGained: number, attemptData: { topic: string; score: number; total: number; difficulty: QuizDifficulty }) => void;
  onUnlockBadge: (badgeId: string) => void;
}

const COMPREHENSIVE_QUESTIONS: (QuizQuestion & { difficulty: QuizDifficulty; category: string })[] = [
  // Beginner Questions
  {
    id: 1,
    question: "Who among the following political thinkers is celebrated as the author of 'The Republic' and the creator of the Allegory of the Cave?",
    options: ["Aristotle", "Plato", "Niccolò Machiavelli", "Thomas Hobbes"],
    correctIndex: 1,
    explanation: "Plato authored 'The Republic', outlining the ideal state ruled by philosopher-kings possessing supreme dialectical wisdom.",
    difficulty: 'beginner',
    category: 'Western Political Thought',
  },
  {
    id: 2,
    question: "Under the Constitution of India, which Article guarantees the Right to Constitutional Remedies, called by Dr. B.R. Ambedkar the 'Heart and Soul' of the Constitution?",
    options: ["Article 14", "Article 19", "Article 32", "Article 21"],
    correctIndex: 2,
    explanation: "Article 32 empowers citizens to petition the Supreme Court directly for the enforcement of Fundamental Rights via prerogative writs.",
    difficulty: 'beginner',
    category: 'Indian Constitution',
  },
  {
    id: 3,
    question: "In Kautilya's Arthashastra, which limb of the Saptanga theory corresponds to the sovereign King or executive head of state?",
    options: ["Amatya", "Swami", "Durga", "Kosha"],
    correctIndex: 1,
    explanation: "Swami represents the King/Ruler, the foremost limb who commands the moral authority and executive direction of the state.",
    difficulty: 'beginner',
    category: 'Indian Political Thought',
  },
  {
    id: 4,
    question: "Which of the following forms of government is characterized by Montesquieu's principle of the strict separation of executive and legislative powers?",
    options: ["Parliamentary System", "Presidential System", "Constitutional Monarchy", "Direct Assembly"],
    correctIndex: 1,
    explanation: "In a Presidential system (such as the United States), the executive is independently elected and separate from the legislative body.",
    difficulty: 'beginner',
    category: 'Comparative Politics',
  },

  // Intermediate Questions
  {
    id: 5,
    question: "In which historic judgment did the Supreme Court of India propound the 'Basic Structure Doctrine', restricting Parliament's amending power under Article 368?",
    options: [
      "Golak Nath v. State of Punjab (1967)",
      "Kesavananda Bharati v. State of Kerala (1973)",
      "Minerva Mills v. Union of India (1980)",
      "Maneka Gandhi v. Union of India (1978)"
    ],
    correctIndex: 1,
    explanation: "The 13-judge bench in Kesavananda Bharati (1973) held by 7:6 that while Parliament can amend any article, it cannot alter the essential Basic Structure of the Constitution.",
    difficulty: 'intermediate',
    category: 'Indian Constitution',
  },
  {
    id: 6,
    question: "According to John Rawls in 'A Theory of Justice', what principle governs the distribution of social and economic inequalities behind the Veil of Ignorance?",
    options: [
      "Utilitarian Greatest Happiness Principle",
      "The Difference Principle (benefiting the least-advantaged)",
      "Nozickian Historical Entitlement Principle",
      "Pareto Optimality Principle"
    ],
    correctIndex: 1,
    explanation: "Rawls's Difference Principle specifies that inequalities are permissible only if they work to the maximum benefit of the least advantaged members of society.",
    difficulty: 'intermediate',
    category: 'Political Theory',
  },
  {
    id: 7,
    question: "Which classical sociologist identified 'Rational-Legal Authority' and codified the ideal-type characteristics of modern bureaucracy?",
    options: ["Karl Marx", "Max Weber", "Émile Durkheim", "F.W. Taylor"],
    correctIndex: 1,
    explanation: "Max Weber conceptualized the rational-legal bureaucratic model founded upon written rules, jurisdictional hierarchy, and impersonal procedural conduct.",
    difficulty: 'intermediate',
    category: 'Public Administration',
  },
  {
    id: 8,
    question: "In International Relations, which paradigm views sovereign nation-states as unitary rational actors struggling for survival within an anarchical international structure?",
    options: ["Neoliberal Institutionalism", "Structural Realism (Neorealism)", "Constructivism", "Critical Theory"],
    correctIndex: 1,
    explanation: "Structural Realism, formulated by Kenneth Waltz in 'Theory of International Politics' (1979), explains state competition primarily through the anarchic distribution of capabilities.",
    difficulty: 'intermediate',
    category: 'International Relations',
  },

  // Advanced Questions (Honours & NET level)
  {
    id: 9,
    question: "According to Antonio Gramsci, how does the ruling bourgeois class maintain dominance in advanced capitalist societies beyond coercive state machinery?",
    options: [
      "Through Hegemony (cultural and moral consensus engineered in civil society)",
      "Exclusively through the military and police apparatus",
      "Via theological feudal dogmas",
      "Through spontaneous economic trade unionism"
    ],
    correctIndex: 0,
    explanation: "Gramsci in the 'Prison Notebooks' argued that bourgeois supremacy relies upon cultural 'hegemony'—manufacturing intellectual and moral consent through schools, churches, and media.",
    difficulty: 'advanced',
    category: 'Political Theory',
  },
  {
    id: 10,
    question: "In the context of the Indian Constituent Assembly, who warned on November 25, 1949 that India was entering a life of contradictions: 'equality in politics and inequality in social and economic life'?",
    options: ["Pandit Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Dr. B.R. Ambedkar", "Dr. Rajendra Prasad"],
    correctIndex: 2,
    explanation: "Dr. B.R. Ambedkar delivered this prophetic closing address, emphasizing that political democracy cannot survive without foundational social and economic democracy.",
    difficulty: 'advanced',
    category: 'Indian Political Thought',
  },
  {
    id: 11,
    question: "What is Duverger's Law in Comparative Electoral Systems?",
    options: [
      "Proportional representation systematically creates stable two-party systems",
      "Single-member simple majority (FPTP) electoral systems tend to produce a two-party system",
      "Direct democracy always produces coalition instability",
      "Federal systems require unicameral legislatures"
    ],
    correctIndex: 1,
    explanation: "French political scientist Maurice Duverger demonstrated that First-Past-The-Post (FPTP) pluralistic voting rules favor a two-party equilibrium due to the mechanical and psychological factors of wasted votes.",
    difficulty: 'advanced',
    category: 'Comparative Politics',
  },
  {
    id: 12,
    question: "Which landmark Treaty concluded in 1648 established the modern foundation of state sovereignty, non-intervention, and the international state system?",
    options: ["Treaty of Versailles", "Peace of Westphalia", "Treaty of Utrecht", "Congress of Vienna"],
    correctIndex: 1,
    explanation: "The Peace of Westphalia (1648) ended the Thirty Years' War and codified the principle of cuius regio, eius religio, creating the modern Westphalian sovereign state system.",
    difficulty: 'advanced',
    category: 'International Relations',
  },
];

export const QuizView: React.FC<QuizViewProps> = ({
  knowledgeBase,
  userProfile,
  onUpdateScore,
  onUnlockBadge,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>('intermediate');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAdaptiveMode, setIsAdaptiveMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  // Filter questions based on difficulty & category
  const filteredQuestions = COMPREHENSIVE_QUESTIONS.filter((q) => {
    const matchesDiff = isAdaptiveMode ? true : q.difficulty === selectedDifficulty;
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    return matchesDiff && matchesCat;
  });

  const activeQuestions = filteredQuestions.length > 0 ? filteredQuestions : COMPREHENSIVE_QUESTIONS.slice(0, 4);
  const currentQ = activeQuestions[currentIndex] || activeQuestions[0];
  const userSelection = selectedAnswers[currentIndex];
  const isAnswered = userSelection !== undefined;

  const categories = [
    'All',
    'Political Theory',
    'Indian Constitution',
    'Comparative Politics',
    'International Relations',
    'Public Administration',
    'Indian Political Thought',
    'Western Political Thought',
  ];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    const isCorrect = idx === currentQ.correctIndex;
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: idx });
    setShowExplanation(true);

    if (isCorrect) {
      soundEffects.playCorrectChime();
      setEarnedXP((prev) => prev + 25);
    } else {
      soundEffects.playWrongTone();
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    setShowExplanation(false);
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const totalCorrect = activeQuestions.reduce((acc, q, idx) => {
      return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
    }, 0);

    const bonusXP = totalCorrect === activeQuestions.length ? 50 : 10;
    const finalXP = totalCorrect * 25 + bonusXP;
    setEarnedXP(finalXP);
    setQuizFinished(true);

    soundEffects.playBadgeUnlock();

    // Send attempt to profile
    onUpdateScore(finalXP, {
      topic: `${selectedCategory === 'All' ? 'Political Science Arena' : selectedCategory} (${selectedDifficulty})`,
      score: totalCorrect,
      total: activeQuestions.length,
      difficulty: selectedDifficulty,
    });

    // Check badges
    if (totalCorrect === activeQuestions.length && currentQ.category === 'Indian Constitution') {
      onUnlockBadge('constitutional_guardian');
    }
    if (totalCorrect === activeQuestions.length && currentQ.category === 'Indian Political Thought') {
      onUnlockBadge('kautilya_scholar');
    }
    if (totalCorrect === activeQuestions.length && currentQ.category === 'Comparative Politics') {
      onUnlockBadge('aristotle_logician');
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
    setEarnedXP(0);
  };

  const calculateScore = () => {
    return activeQuestions.reduce((acc, q, idx) => {
      return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
    }, 0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Header & Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-400">
                <Trophy className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Political Science Challenge Arena
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Adaptive tests curated under Auxilium College Political Science standards. Earn XP and unlock badges!
            </p>
          </div>

          {/* User XP Badge */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-300 font-medium">Scholar XP:</span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1 font-mono">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {userProfile.xp} XP
            </span>
          </div>
        </div>

        {/* Filters & Difficulty Switcher */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Difficulty selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-400 px-2 font-medium">Difficulty:</span>
            {(['beginner', 'intermediate', 'advanced'] as QuizDifficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedDifficulty(d);
                  setIsAdaptiveMode(false);
                  handleRestart();
                }}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition ${
                  selectedDifficulty === d && !isAdaptiveMode
                    ? d === 'beginner'
                      ? 'bg-emerald-600 text-white'
                      : d === 'intermediate'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d === 'beginner' ? 'UG Foundation' : d === 'intermediate' ? 'Honours Level' : 'Master’s / NET'}
              </button>
            ))}

            <button
              onClick={() => {
                soundEffects.playClick();
                setIsAdaptiveMode(true);
                handleRestart();
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
                isAdaptiveMode
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-300" />
              Adaptive Mode
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Domain:</span>
            <select
              value={selectedCategory}
              onChange={(e) => {
                soundEffects.playClick();
                setSelectedCategory(e.target.value);
                handleRestart();
              }}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Quiz Flow */}
      {!quizFinished ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          {/* Card meta */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-cyan-400 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 rounded-full text-[10px]">
                {currentQ.category}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                {currentQ.difficulty} Tier
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">
                Question {currentIndex + 1} / {activeQuestions.length}
              </span>
              <span className="text-amber-400 font-bold">
                Score: {calculateScore()}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-950 rounded-full h-1.5 mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = userSelection === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let optionStyle =
                'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800/50';

              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold shadow-sm shadow-emerald-950';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                } else {
                  optionStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs sm:text-sm cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs leading-relaxed animate-fade-in mb-6">
              <div className="font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Scholarly Analysis & Thinker Context:
              </div>
              <p className="text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              +25 XP per correct answer
            </span>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-600/20 transition cursor-pointer"
            >
              <span>{currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'Complete Assessment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-950/60 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-white mb-1">
            Political Science Assessment Completed!
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Evaluated under Professor Ranjit Bhattarai Chetry’s Academic Standards
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-w-36">
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">
                {calculateScore()} / {activeQuestions.length}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Accuracy: {Math.round((calculateScore() / activeQuestions.length) * 100)}%
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-w-36">
              <div className="text-3xl font-extrabold text-amber-400 font-mono flex items-center justify-center gap-1">
                <Zap className="w-6 h-6 fill-amber-400" />
                +{earnedXP}
              </div>
              <p className="text-xs text-slate-400 mt-1">Scholar XP Awarded</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
            {calculateScore() === activeQuestions.length
              ? 'Outstanding Mastery! You demonstrated exceptional academic command across theoretical frameworks and constitutional doctrines.'
              : calculateScore() >= activeQuestions.length / 2
              ? 'Strong Performance! Review the Knowledge Hub modules to refine nuances in comparative politics and statecraft.'
              : 'Scholarly Persistence Required! Consult the Knowledge Matrix and ask PolitiBot to break down challenging doctrines.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Challenge
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setSelectedDifficulty('advanced');
                handleRestart();
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-cyan-600 hover:from-amber-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Try Advanced NET Tier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
