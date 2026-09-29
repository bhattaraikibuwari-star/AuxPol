import React from 'react';
import { UserProfile, KnowledgeItem } from '../types';
import {
  Compass,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  Target,
  GraduationCap
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface LearningJourneyViewProps {
  userProfile: UserProfile;
  knowledgeBase: KnowledgeItem[];
  onSelectTopicToExplore: (topicTitle: string) => void;
  onOpenKnowledgeHub: () => void;
  onStartQuiz: () => void;
}

export const LearningJourneyView: React.FC<LearningJourneyViewProps> = ({
  userProfile,
  knowledgeBase,
  onSelectTopicToExplore,
  onOpenKnowledgeHub,
  onStartQuiz,
}) => {
  const domains = [
    'Political Theory',
    'Indian Constitution',
    'Comparative Politics',
    'International Relations',
    'Public Administration',
    'Indian Political Thought',
    'Western Political Thought',
  ];

  // Calculate domain progress based on knowledge modules explored
  const domainStats = domains.map((domain) => {
    const totalInDomain = knowledgeBase.filter((k) => k.category === domain).length;
    const exploredInDomain = knowledgeBase.filter(
      (k) => k.category === domain && userProfile.exploredTopics.includes(k.title)
    ).length;
    const percentage = totalInDomain > 0 ? Math.round((exploredInDomain / totalInDomain) * 100) : 0;
    return {
      domain,
      total: totalInDomain,
      explored: exploredInDomain,
      percentage: Math.min(percentage, 100),
    };
  });

  // Calculate intelligent recommendations for future exploration
  const unexploredModules = knowledgeBase.filter(
    (k) => !userProfile.exploredTopics.includes(k.title)
  );

  const recommendations = unexploredModules.slice(0, 4).length > 0
    ? unexploredModules.slice(0, 4)
    : knowledgeBase.slice(0, 4);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                <Compass className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Curriculum Learning Journey & Analytics
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Personalized political science progression mapped against Auxilium College academic curriculum.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Curriculum Covered</span>
              <span className="text-base font-bold text-cyan-400">
                {Math.round(
                  (userProfile.exploredTopics.length / Math.max(1, knowledgeBase.length)) * 100
                )}%
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Scholar Level</span>
              <span className="text-base font-bold text-amber-400 flex items-center justify-center gap-1">
                <GraduationCap className="w-4 h-4" />
                Lvl {userProfile.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Mastery Matrix */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Political Science Domain Mastery
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domainStats.map((stat) => (
            <div
              key={stat.domain}
              className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">{stat.domain}</span>
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  {stat.percentage}%
                </span>
              </div>

              <div className="w-full bg-slate-900 rounded-full h-1.5 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-1.5 transition-all duration-500"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>

              <span className="text-[11px] text-slate-500">
                {stat.explored} of {stat.total} modules mastered
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Recommended Exploration Areas */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-cyan-950/40 border border-indigo-700/40 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Suggested Areas for Future Exploration
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalized suggestions to round out your political theory and constitutional foundations.
            </p>
          </div>

          <button
            onClick={onOpenKnowledgeHub}
            className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            View All Knowledge Modules →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between transition group"
            >
              <div>
                <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-700/50 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>

                <h4 className="text-sm font-bold text-white mt-1.5 group-hover:text-cyan-200 transition">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-amber-400/90 font-medium">
                  {item.unit || 'Core Syllabus'}
                </span>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectTopicToExplore(item.title);
                  }}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold group-hover:translate-x-0.5 transition cursor-pointer"
                >
                  <span>Explore with PolitiBot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Assessment History */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Recent Assessment History
          </h3>

          <button
            onClick={onStartQuiz}
            className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-xl font-semibold transition"
          >
            Take New Assessment
          </button>
        </div>

        {userProfile.quizHistory.length > 0 ? (
          <div className="space-y-2">
            {userProfile.quizHistory.slice(-5).reverse().map((att, i) => (
              <div
                key={i}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white block">{att.topic}</span>
                  <span className="text-[11px] text-slate-400">
                    {att.date} • {att.difficulty.toUpperCase()} Tier
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-cyan-400">
                    {att.score} / {att.total} ({Math.round(att.percentage)}%)
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      att.percentage >= 75
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                        : 'bg-amber-950 text-amber-300 border border-amber-700/50'
                    }`}
                  >
                    {att.percentage >= 75 ? 'Distinction' : 'Completed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs italic">
            No quiz attempts recorded yet. Jump into the Quiz Arena to build your academic scorecard!
          </div>
        )}
      </div>
    </div>
  );
};
