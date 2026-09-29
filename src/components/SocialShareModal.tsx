import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Download,
  ExternalLink,
  MessageCircle,
  Twitter,
  Linkedin,
  Send,
  GraduationCap,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  type: 'insight' | 'conversation';
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  type,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://politibot-auxilium.web.app';
  const cleanSnippet = content.replace(/###/g, '').replace(/\*\*/g, '').trim();
  const previewSnippet = cleanSnippet.length > 280 ? cleanSnippet.substring(0, 277) + '...' : cleanSnippet;

  const academicCitation = `"${cleanSnippet}"

— Synthesized by PolitiBot (Virtual Political Science Robot)
Academic Patronage: Mr. Ranjit Bhattarai Chetry, Assistant Professor, Department of Political Science, Auxilium College, Udalguri.
Source: ${appUrl} [Accessed: ${new Date().toLocaleDateString()}]`;

  // Native Web Share API
  const handleNativeShare = async () => {
    soundEffects.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: type === 'insight' ? 'Political Science Insight • PolitiBot' : 'Scholarly Dialogue • PolitiBot',
          text: `Scholarly Political Science Insight from PolitiBot (Created by Mr. Ranjit Bhattarai Chetry, Auxilium College):\n\n${previewSnippet}\n\n`,
          url: appUrl,
        });
      } catch (err) {
        // User cancelled or share failed silently
      }
    }
  };

  // WhatsApp Share
  const handleWhatsAppShare = () => {
    soundEffects.playClick();
    const shareText = encodeURIComponent(
      `🏛️ *PolitiBot Scholarly Insight* (Auxilium College, Udalguri)\n\n"${previewSnippet}"\n\nCurated by *Mr. Ranjit Bhattarai Chetry* (Assistant Professor, Dept of Political Science).\nExplore here: ${appUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  // X / Twitter Share
  const handleTwitterShare = () => {
    soundEffects.playClick();
    const tweetText = encodeURIComponent(
      `Scholarly insight from #PolitiBot (Civitas-V1), created by Prof. Ranjit Bhattarai Chetry @ Auxilium College:\n\n"${previewSnippet.substring(0, 150)}..."\n\n#PoliticalScience #Civics`
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(appUrl)}`, '_blank');
  };

  // LinkedIn Share
  const handleLinkedInShare = () => {
    soundEffects.playClick();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`, '_blank');
  };

  // Telegram Share
  const handleTelegramShare = () => {
    soundEffects.playClick();
    const teleText = encodeURIComponent(
      `📚 Political Science Analysis from PolitiBot:\n\n"${previewSnippet}"\n\nCurated by Mr. Ranjit Bhattarai Chetry, Auxilium College.`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${teleText}`, '_blank');
  };

  // Copy Plain Text
  const handleCopyText = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Copy Formatted Academic Citation
  const handleCopyCitation = () => {
    soundEffects.playCorrectChime();
    navigator.clipboard.writeText(academicCitation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  // Download Transcript as .txt
  const handleDownloadTranscript = () => {
    soundEffects.playClick();
    const element = document.createElement('a');
    const file = new Blob([academicCitation], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `politibot_scholarly_${type}_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {type === 'insight' ? 'Share Scholarly Insight' : 'Share Academic Dialogue'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Disseminate political science wisdom across external channels
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Creator & Academic Attribution Badge */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30 border border-amber-500/30 flex items-center gap-3">
            <img
              src="/src/assets/images/creator_ranjit_1790705301760.jpg"
              alt="Mr. Ranjit Bhattarai Chetry"
              referrerPolicy="no-referrer"
              className="w-11 h-14 rounded-xl object-cover border border-amber-400 shrink-0 shadow-sm"
            />
            <div className="text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <span>Mr. Ranjit Bhattarai Chetry</span>
                <Award className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Assistant Professor, Dept. of Political Science
              </p>
              <p className="text-[10px] text-slate-400">
                Auxilium College, Udalguri (BTR, Assam)
              </p>
            </div>
          </div>

          {/* Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Insight Snippet Preview
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {cleanSnippet.length} characters
              </span>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-300 max-h-36 overflow-y-auto font-sans leading-relaxed whitespace-pre-wrap scrollbar-thin">
              {content}
            </div>
          </div>

          {/* Social Platform Action Buttons */}
          <div>
            <span className="text-xs font-semibold text-slate-300 block mb-2">
              Share to External Platforms
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 transition cursor-pointer group shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-xs font-semibold">WhatsApp</span>
              </button>

              {/* Twitter / X */}
              <button
                onClick={handleTwitterShare}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-950/40 hover:bg-sky-900/60 border border-sky-600/40 text-sky-300 transition cursor-pointer group shadow-sm"
              >
                <Twitter className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-xs font-semibold">Twitter / X</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={handleLinkedInShare}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-600/40 text-blue-300 transition cursor-pointer group shadow-sm"
              >
                <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-xs font-semibold">LinkedIn</span>
              </button>

              {/* Telegram */}
              <button
                onClick={handleTelegramShare}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-600/40 text-indigo-300 transition cursor-pointer group shadow-sm"
              >
                <Send className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-xs font-semibold">Telegram</span>
              </button>
            </div>

            {/* Native Mobile Share Sheet if available */}
            {hasNativeShare && (
              <button
                onClick={handleNativeShare}
                className="w-full mt-2.5 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer shadow-sm"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Share via System Share Sheet (AirDrop / Apps)</span>
              </button>
            )}
          </div>

          {/* Academic Export Options */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Academic Citation & Offline Export
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleCopyCitation}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-medium transition cursor-pointer"
              >
                {copiedCitation ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                )}
                <span>{copiedCitation ? 'Citation Copied!' : 'Copy Academic Citation'}</span>
              </button>

              <button
                onClick={handleDownloadTranscript}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download .TXT File</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/70 flex items-center justify-between">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied full text' : 'Copy raw content'}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
