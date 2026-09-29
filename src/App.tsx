import React, { useState, useEffect } from 'react';
import {
  KnowledgeItem,
  RobotState,
  ChatMode,
  ChatMessage,
  UserProfile,
  QuizDifficulty,
  AppTheme,
} from './types';
import { INITIAL_KNOWLEDGE_BASE } from './data/defaultKnowledge';
import { Header } from './components/Header';
import { ChatView } from './components/ChatView';
import { KnowledgeHub } from './components/KnowledgeHub';
import { ComparativeSimulator } from './components/ComparativeSimulator';
import { QuizView } from './components/QuizView';
import { LearningJourneyView } from './components/LearningJourneyView';
import { UserProfileModal } from './components/UserProfileModal';
import { CreatorModal } from './components/CreatorModal';
import { ApkGuideModal } from './components/ApkGuideModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useSpeech } from './hooks/useSpeech';
import { soundEffects } from './utils/soundEffects';

const STORAGE_KEYS = {
  KNOWLEDGE: 'politibot_knowledge_base_v2',
  PROFILE: 'politibot_user_profile_v2',
  MESSAGES: 'politibot_chat_history_v2',
  MODE: 'politibot_chat_mode_v2',
  THEME: 'politibot_theme_v2',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'user-default',
  name: 'Auxilium Scholar',
  studentId: 'AUX-POL-2026',
  institution: 'Auxilium College, Udalguri',
  academicLevel: 'Undergraduate Sem 3-4',
  avatar: '🎓',
  xp: 120,
  level: 2,
  badges: ['first_inquiry'],
  exploredTopics: [
    "Kautilya's Saptanga Theory of State",
    "Fundamental Rights vs Directive Principles (DPSPs)",
  ],
  quizHistory: [
    {
      id: 'att-1',
      topic: 'Indian Constitution & Basic Structure (Intermediate)',
      score: 3,
      total: 4,
      difficulty: 'intermediate',
      date: '2026-09-29',
      percentage: 75,
    },
  ],
  streakDays: 3,
  lastActiveDate: '2026-09-29',
  soundEnabled: true,
  autoSpeakResponses: false,
};

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `Greetings! I am **PolitiBot**, your interactive Political Science Virtual Robot conceptualized and authored under the academic patronage of:

🏛️ **Mr. Ranjit Bhattarai Chetry**
🎓 **Assistant Professor, Department of Political Science**
📍 **Auxilium College, Udalguri**
📜 *© 2026 Mr. Ranjit Bhattarai Chetry. All Rights Reserved.*

I am equipped with a dedicated **Knowledge Hub & Upgradation Engine** where Professor Chetry and students can input custom syllabus units, constitutional amendments, and lecture notes to dynamically expand my active reasoning matrix.

You can ask me about classical thinkers (Plato, Aristotle, Kautilya), constitutional case laws (Kesavananda Bharati, Fundamental Rights vs DPSPs), or compare world governance systems. What would you like to explore today?`,
  timestamp: 'Just now',
  source: 'preset',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge' | 'simulator' | 'quiz' | 'journey'>('chat');
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const [chatMode, setChatMode] = useState<ChatMode>('scholarly');
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Global Theme: 'dark' (default) or 'academic-paper' (high-contrast light mode)
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved === 'academic-paper' ? 'academic-paper' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Apply theme class to document root
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      if (theme === 'academic-paper') {
        document.documentElement.classList.add('academic-paper');
      } else {
        document.documentElement.classList.remove('academic-paper');
      }
    } catch (e) {
      console.warn('Failed to save theme:', e);
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'academic-paper' : 'dark'));
  };

  // Modals state
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isApkGuideOpen, setIsApkGuideOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Persistent Knowledge Base (automatically merging new curriculum sub-disciplines)
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.KNOWLEDGE);
      if (saved) {
        const parsed: KnowledgeItem[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((k) => k.id));
        const missingDefaults = INITIAL_KNOWLEDGE_BASE.filter((k) => !existingIds.has(k.id));
        if (missingDefaults.length > 0) {
          return [...parsed, ...missingDefaults];
        }
        return parsed;
      }
      return INITIAL_KNOWLEDGE_BASE;
    } catch {
      return INITIAL_KNOWLEDGE_BASE;
    }
  });

  // Persistent User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Persistent Messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : [INITIAL_WELCOME_MESSAGE];
    } catch {
      return [INITIAL_WELCOME_MESSAGE];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.KNOWLEDGE, JSON.stringify(knowledgeBase));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }, [knowledgeBase]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Profile save failed:', e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.warn('Messages save failed:', e);
    }
  }, [messages]);

  // Speech Hook
  const {
    isSpeaking,
    isListening,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
  } = useSpeech((transcript) => {
    handleSendMessage(transcript);
  });

  // Keep robot avatar animation synced with speech state
  useEffect(() => {
    if (isSpeaking) {
      setRobotState('speaking');
    } else if (isListening) {
      setRobotState('listening');
    } else if (isLoading) {
      setRobotState('thinking');
    } else {
      setRobotState('idle');
    }
  }, [isSpeaking, isListening, isLoading]);

  // Send message to PolitiBot
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    soundEffects.playClick();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setRobotState('thinking');

    // Add explored topic to user profile if matching knowledge item
    const matchedKB = knowledgeBase.find((k) =>
      text.toLowerCase().includes(k.title.toLowerCase())
    );
    if (matchedKB && !userProfile.exploredTopics.includes(matchedKB.title)) {
      setUserProfile((prev) => ({
        ...prev,
        xp: prev.xp + 15,
        exploredTopics: [...prev.exploredTopics, matchedKB.title],
      }));
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          knowledgeBase,
          mode: chatMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || 'Analysis completed.';

      const assistantMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setRobotState('speaking');

      // Auto-speak if not muted
      if (!isMuted) {
        speak(botReply);
      } else {
        setRobotState('idle');
      }

      // Check first inquiry badge
      if (!userProfile.badges.includes('first_inquiry')) {
        unlockBadge('first_inquiry');
      }
    } catch (err: any) {
      console.warn('Chat request failed, providing local synthesis:', err);
      const fallbackText = `### [PolitiBot Academic Engine Output]
Regarding your inquiry: "${text}"

*Academic Foundation:* Under the curriculum framework designed by **Mr. Ranjit Bhattarai Chetry** at Auxilium College, this concept touches on core governance principles. 

Key pillars include institutional balance of power, constitutional supremacy, and normative political philosophy. You can upgrade my knowledge on this exact subject using the **Knowledge Hub**!`;

      const assistantMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'knowledge-matrix-fallback',
      };

      setMessages((prev) => [...prev, assistantMessage]);
      if (!isMuted) speak(fallbackText);
    } finally {
      setIsLoading(false);
    }
  };

  // Knowledge Hub handlers
  const handleAddKnowledge = (item: KnowledgeItem) => {
    setKnowledgeBase((prev) => [item, ...prev]);
    // Award XP for contributing to the knowledge matrix
    setUserProfile((prev) => ({
      ...prev,
      xp: prev.xp + 50,
      badges: prev.badges.includes('knowledge_architect')
        ? prev.badges
        : [...prev.badges, 'knowledge_architect'],
    }));
    soundEffects.playBadgeUnlock();
  };

  const handleUpdateKnowledge = (item: KnowledgeItem) => {
    setKnowledgeBase((prev) => prev.map((k) => (k.id === item.id ? item : k)));
    soundEffects.playUpgradeSweep();
  };

  const handleDeleteKnowledge = (id: string) => {
    setKnowledgeBase((prev) => prev.filter((k) => k.id !== id));
    soundEffects.playClick();
  };

  const handleResetToDefault = () => {
    setKnowledgeBase(INITIAL_KNOWLEDGE_BASE);
    soundEffects.playUpgradeSweep();
  };

  const handleImportKnowledge = (items: KnowledgeItem[]) => {
    setKnowledgeBase(items);
    soundEffects.playBadgeUnlock();
  };

  const handleTriggerUpgradeAnimation = () => {
    soundEffects.playUpgradeSweep();
    setRobotState('upgrading');
    setTimeout(() => {
      setRobotState('idle');
    }, 2000);
  };

  // User Profile & Quiz scoring handlers
  const handleUpdateScore = (
    xpGained: number,
    attemptData: { topic: string; score: number; total: number; difficulty: QuizDifficulty }
  ) => {
    setUserProfile((prev) => {
      const newXp = prev.xp + xpGained;
      const newLevel = Math.floor(newXp / 150) + 1;
      const newAttempt = {
        id: `att-${Date.now()}`,
        topic: attemptData.topic,
        score: attemptData.score,
        total: attemptData.total,
        difficulty: attemptData.difficulty,
        date: new Date().toISOString().split('T')[0],
        percentage: (attemptData.score / attemptData.total) * 100,
      };

      const updatedHistory = [...prev.quizHistory, newAttempt];
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        quizHistory: updatedHistory,
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setUserProfile((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      soundEffects.playBadgeUnlock();
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
        xp: prev.xp + 30,
      };
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === 'academic-paper'
          ? 'academic-paper bg-[#f7f6f2] text-slate-900 selection:bg-amber-300 selection:text-slate-950'
          : 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950'
      }`}
    >
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenCreator={() => setIsCreatorOpen(true)}
        onOpenApkGuide={() => setIsApkGuideOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        knowledgeCount={knowledgeBase.length}
        userProfile={userProfile}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 lg:pb-8">
        {activeTab === 'chat' && (
          <ChatView
            messages={messages}
            robotState={robotState}
            chatMode={chatMode}
            setChatMode={setChatMode}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
            isSpeaking={isSpeaking}
            onSpeak={speak}
            onStopSpeaking={stopSpeaking}
            isMuted={isMuted}
            knowledgeBase={knowledgeBase}
            onOpenCreator={() => setIsCreatorOpen(true)}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeHub
            knowledgeBase={knowledgeBase}
            onAddKnowledge={handleAddKnowledge}
            onUpdateKnowledge={handleUpdateKnowledge}
            onDeleteKnowledge={handleDeleteKnowledge}
            onResetToDefault={handleResetToDefault}
            onImportKnowledge={handleImportKnowledge}
            onTriggerUpgradeAnimation={handleTriggerUpgradeAnimation}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            knowledgeBase={knowledgeBase}
            userProfile={userProfile}
            onUpdateScore={handleUpdateScore}
            onUnlockBadge={unlockBadge}
          />
        )}

        {activeTab === 'journey' && (
          <LearningJourneyView
            userProfile={userProfile}
            knowledgeBase={knowledgeBase}
            onSelectTopicToExplore={(topic) => {
              setActiveTab('chat');
              handleSendMessage(`Explain the political doctrine and significance of: ${topic}`);
            }}
            onOpenKnowledgeHub={() => setActiveTab('knowledge')}
            onStartQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'simulator' && <ComparativeSimulator />}
      </main>

      {/* Footer with Creator & Copyright Notice */}
      <footer className="hidden sm:block border-t border-slate-900 bg-slate-950/90 py-3 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5">
            <img
              src="/src/assets/images/creator_ranjit_1790705301760.jpg"
              alt="Mr. Ranjit Bhattarai Chetry"
              referrerPolicy="no-referrer"
              className="w-4 h-4 rounded-full object-cover border border-amber-400 shrink-0"
            />
            <span>
              PolitiBot • Created by <strong>Mr. Ranjit Bhattarai Chetry</strong>, Assistant Professor, Department of Political Science, Auxilium College, Udalguri.
            </span>
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            © 2026 Mr. Ranjit Bhattarai Chetry. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Modals & Offline Indicator */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        onUpdateProfile={setUserProfile}
        onOpenCreator={() => {
          setIsProfileOpen(false);
          setIsCreatorOpen(true);
        }}
      />

      <CreatorModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
      />

      <ApkGuideModal
        isOpen={isApkGuideOpen}
        onClose={() => setIsApkGuideOpen(false)}
      />

      <OfflineIndicator />
    </div>
  );
}
