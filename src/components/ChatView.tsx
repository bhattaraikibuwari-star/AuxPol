import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatMode, RobotState, KnowledgeItem } from '../types';
import { RobotAvatar } from './RobotAvatar';
import { SocialShareModal } from './SocialShareModal';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface ChatViewProps {
  messages: ChatMessage[];
  robotState: RobotState;
  chatMode: ChatMode;
  setChatMode: (mode: ChatMode) => void;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  isSpeaking: boolean;
  onSpeak: (text: string) => void;
  onStopSpeaking: () => void;
  isMuted: boolean;
  knowledgeBase: KnowledgeItem[];
  onOpenCreator: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  robotState,
  chatMode,
  setChatMode,
  onSendMessage,
  isLoading,
  isListening,
  onStartListening,
  onStopListening,
  isSpeaking,
  onSpeak,
  onStopSpeaking,
  isMuted,
  knowledgeBase,
  onOpenCreator,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Social Share Modal state
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
    type: 'insight' | 'conversation';
  }>({
    isOpen: false,
    title: '',
    content: '',
    type: 'insight',
  });

  const handleShareInsight = (content: string) => {
    soundEffects.playClick();
    setShareModal({
      isOpen: true,
      title: 'Scholarly Insight',
      content,
      type: 'insight',
    });
  };

  const handleShareConversation = () => {
    soundEffects.playClick();
    const formattedDialogue = messages
      .map(
        (m) =>
          `[${m.role === 'user' ? 'SCHOLAR INQUIRY' : 'POLITIBOT (PROF. CHETRY CANON)'}]\n${m.content}`
      )
      .join('\n\n========================================\n\n');
    setShareModal({
      isOpen: true,
      title: 'Academic Dialogue Transcript',
      content: formattedDialogue,
      type: 'conversation',
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const samplePrompts = [
    'Tell me about your creator, Mr. Ranjit Bhattarai Chetry.',
    'Explain the feminist critique of the state and Carole Pateman’s Sexual Contract.',
    'How does Vandana Shiva connect ecofeminism with Earth Democracy?',
    "Explain Kautilya's Saptanga Theory of State.",
    'What is Antonio Gramsci’s concept of Hegemony and Organic Intellectuals?',
    'What is the difference between Deep Ecology and Shallow Environmentalism?',
    'Explain Duverger’s Law and how electoral systems shape party politics.',
    'Explain the Kesavananda Bharati Basic Structure Doctrine.',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 flex flex-col h-[calc(100vh-140px)]">
      {/* Robot Stage & Mode Bar */}
      <div className="flex flex-col items-center mb-3">
        <RobotAvatar
          state={robotState}
          onClick={() => {
            if (isSpeaking) {
              onStopSpeaking();
            } else if (messages.length > 0) {
              const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
              if (lastAssistant) onSpeak(lastAssistant.content);
            }
          }}
        />

        {/* Mode Selector */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 px-2 py-0.5">
            Dialogue Mode:
          </span>
          <button
            onClick={() => setChatMode('scholarly')}
            className={`px-2.5 py-1 rounded-lg transition font-medium ${
              chatMode === 'scholarly'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Scholarly & Theoretical
          </button>
          <button
            onClick={() => setChatMode('debate')}
            className={`px-2.5 py-1 rounded-lg transition font-medium ${
              chatMode === 'debate'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dialectic Debate
          </button>
          <button
            onClick={() => setChatMode('exam_prep')}
            className={`px-2.5 py-1 rounded-lg transition font-medium ${
              chatMode === 'exam_prep'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Auxilium Exam Prep
          </button>
          <button
            onClick={() => setChatMode('simplified')}
            className={`px-2.5 py-1 rounded-lg transition font-medium ${
              chatMode === 'simplified'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Simplified Concepts
          </button>

          {/* Share Full Dialogue Button */}
          {messages.length > 1 && (
            <button
              onClick={handleShareConversation}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 hover:text-white border border-indigo-600/50 transition font-semibold cursor-pointer shadow-sm ml-1"
              title="Share entire scholarly discussion to WhatsApp, Twitter/X, LinkedIn, etc."
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Share Discussion</span>
            </button>
          )}
        </div>

        {/* Canon Verification Indicator */}
        <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-600/30 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {knowledgeBase.filter((k) => k.status === 'approved' || !k.status).length} Approved Canon Modules
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            Canon finalized upon Prof. Ranjit Bhattarai Chetry's approval
          </span>
          {knowledgeBase.some((k) => k.status === 'pending_approval') && (
            <span className="flex items-center gap-1 text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
              <Clock className="w-3 h-3 text-amber-400" />
              {knowledgeBase.filter((k) => k.status === 'pending_approval').length} awaiting approval
            </span>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            } animate-fade-in`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              {msg.role === 'assistant' ? (
                <div className="flex items-center gap-1.5">
                  <img
                    src="/src/assets/images/creator_ranjit_1790705301760.jpg"
                    alt="Mr. Ranjit Bhattarai Chetry"
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover border border-amber-400 shrink-0"
                  />
                  <span className="text-[10px] text-amber-300 font-semibold">
                    PolitiBot (Prof. Chetry Avatar)
                  </span>
                </div>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono">
                  You (Scholar / Student)
                </span>
              )}
              <span className="text-[10px] text-slate-500">• {msg.timestamp}</span>
              {msg.source && (
                <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800/40 px-1 rounded">
                  {msg.source === 'gemini-3.8-flash' ? 'Neural AI' : 'Active Matrix'}
                </span>
              )}
            </div>

            <div
              className={`relative max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 shadow-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {/* Creator highlight badge inside bot messages if referring to creator */}
              {msg.role === 'assistant' && msg.content.includes('Ranjit Bhattarai Chetry') && (
                <div
                  onClick={onOpenCreator}
                  className="mb-2.5 inline-flex items-center gap-2 text-xs font-semibold text-amber-300 bg-amber-950/70 border border-amber-600/50 px-2.5 py-1 rounded-xl cursor-pointer hover:bg-amber-900/70 transition shadow-sm"
                >
                  <img
                    src="/src/assets/images/creator_ranjit_1790705301760.jpg"
                    alt="Mr. Ranjit Bhattarai Chetry"
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover border border-amber-400 shrink-0"
                  />
                  <span>Creator: Mr. Ranjit Bhattarai Chetry (Assistant Professor, Dept of Political Science, Auxilium College, Udalguri)</span>
                </div>
              )}

              {/* Message Content rendered cleanly */}
              <div className="whitespace-pre-wrap font-sans text-[13.5px] space-y-2">
                {msg.content}
              </div>

              {/* Action Buttons on Bot message */}
              {msg.role === 'assistant' && (
                <div className="mt-3 pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => (isSpeaking ? onStopSpeaking() : onSpeak(msg.content))}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition"
                      title={isSpeaking ? 'Stop Voice' : 'Read Aloud'}
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-3.5 h-3.5 text-sky-400" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(msg.id, msg.content)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShareInsight(msg.content)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition cursor-pointer"
                      title="Share scholarly insight to WhatsApp, Twitter/X, etc."
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">
                    Knowledge Base: {knowledgeBase.length} Modules Synced
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 max-w-[80%] flex items-center gap-3">
              <img
                src="/src/assets/images/creator_ranjit_1790705301760.jpg"
                alt="Mr. Ranjit Bhattarai Chetry"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border-2 border-cyan-400 shrink-0 animate-pulse"
              />
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-300">
                  PolitiBot is synthesizing political science doctrines...
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Cross-referencing Professor Chetry's knowledge matrix & constitutional archives
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Inquiry Prompts */}
      {messages.length <= 2 && (
        <div className="my-2 py-1">
          <p className="text-[11px] text-slate-400 font-medium mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Suggested Political Science Inquiries:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(prompt)}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 rounded-lg px-2.5 py-1 text-left transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Bar */}
      <div className="mt-2 pt-2 border-t border-slate-800">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Voice input button */}
          <button
            type="button"
            onClick={isListening ? onStopListening : onStartListening}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              isListening
                ? 'bg-rose-950 border-rose-500 text-rose-400 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
            }`}
            title={isListening ? 'Stop recording voice' : 'Speak your question (Voice Input)'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isListening
                ? 'Listening to your voice...'
                : 'Ask PolitiBot about any political doctrine, thinker, constitution, or theory...'
            }
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition shadow-inner"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-600/20 transition cursor-pointer"
            title="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Social Share Modal for Academic Insights & Conversations */}
      <SocialShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal((prev) => ({ ...prev, isOpen: false }))}
        title={shareModal.title}
        content={shareModal.content}
        type={shareModal.type}
      />
    </div>
  );
};
