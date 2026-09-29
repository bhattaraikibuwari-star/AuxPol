import React from 'react';
import {
  Bot,
  BookOpen,
  GraduationCap,
  Download,
  Volume2,
  VolumeX,
  Sparkles,
  Scale,
  Smartphone,
  Award,
  User,
  Compass,
  Zap,
  Sun,
  Moon,
  FileText
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { UserProfile, AppTheme } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface HeaderProps {
  activeTab: 'chat' | 'knowledge' | 'simulator' | 'quiz' | 'journey';
  setActiveTab: (tab: 'chat' | 'knowledge' | 'simulator' | 'quiz' | 'journey') => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  theme: AppTheme;
  onToggleTheme: () => void;
  onOpenCreator: () => void;
  onOpenApkGuide: () => void;
  onOpenProfile: () => void;
  knowledgeCount: number;
  userProfile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  theme,
  onToggleTheme,
  onOpenCreator,
  onOpenApkGuide,
  onOpenProfile,
  knowledgeCount,
  userProfile,
}) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner highlighting Creator & Auxilium College with Copyright Credit */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 px-3 py-1.5 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div
            onClick={() => {
              soundEffects.playClick();
              onOpenCreator();
            }}
            className="flex items-center gap-2 text-slate-300 cursor-pointer group"
          >
            <span className="flex items-center gap-1 font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40 text-[11px]">
              <img
                src="/src/assets/images/creator_ranjit_1790705301760.jpg"
                alt="Mr. Ranjit Bhattarai Chetry"
                referrerPolicy="no-referrer"
                className="w-4 h-4 rounded-full object-cover border border-amber-400 shrink-0"
              />
              Creator
            </span>
            <span className="text-slate-100 font-semibold group-hover:text-amber-300 transition">
              Mr. Ranjit Bhattarai Chetry
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-cyan-300 font-normal">
              Assistant Professor, Department of Political Science, Auxilium College, Udalguri
            </span>
            <span className="hidden lg:inline text-[10px] text-amber-400/90 font-mono">
              © 2026 All Rights Reserved
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenCreator();
              }}
              className="text-[11px] text-amber-300 hover:text-amber-200 underline font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Creator & Copyright
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenApkGuide();
              }}
              className="text-[11px] bg-sky-900/40 hover:bg-sky-800/60 text-sky-200 border border-sky-700/50 px-2.5 py-0.5 rounded-md flex items-center gap-1 transition cursor-pointer"
            >
              <Smartphone className="w-3 h-3 text-sky-400" />
              APK Download
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <div
          onClick={() => {
            soundEffects.playRobotChirp();
            setActiveTab('chat');
          }}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-cyan-400 p-0.5 shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src="/src/assets/images/creator_ranjit_1790705301760.jpg"
              alt="Mr. Ranjit Bhattarai Chetry"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-[10px]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                PolitiBot
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                  Virtual Robot
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 leading-none">
              Auxilium College Political Science Interactive Scholar
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('chat');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Robot Dialogue
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('knowledge');
            }}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeTab === 'knowledge'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Knowledge Hub
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-amber-300 font-semibold border border-amber-500/30">
              {knowledgeCount}
            </span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('quiz');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Quiz Arena
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('journey');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeTab === 'journey'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Learning Journey
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('simulator');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Systems Lab
          </button>
        </nav>

        {/* Action Controls: Theme Toggle, Sound Toggle, User Profile, APK Button */}
        <div className="flex items-center gap-2">
          {/* Global Theme Toggle: Dark Mode vs Academic Paper */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleTheme();
            }}
            title={
              theme === 'dark'
                ? "Switch to High-Contrast 'Academic Paper' Light Mode"
                : 'Switch to Default Dark Mode'
            }
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-900 shadow-sm'
            }`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden xl:inline text-xs font-medium">Academic Paper</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-700" />
                <span className="hidden xl:inline text-xs font-semibold">Dark Mode</span>
              </>
            )}
          </button>

          {/* Audio Mute / Unmute */}
          <button
            onClick={() => {
              const newMuted = !isMuted;
              setIsMuted(newMuted);
              soundEffects.enabled = !newMuted;
              if (!newMuted) soundEffects.playRobotChirp();
            }}
            title={isMuted ? 'Unmute Sound Effects & Voice' : 'Mute Sound Effects & Voice'}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isMuted
                ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                : 'bg-cyan-950/60 border-cyan-700/60 text-cyan-300 hover:bg-cyan-900/60'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* User Profile Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-white transition cursor-pointer"
            title="Open Scholar Profile & Settings"
          >
            <span className="text-sm">{userProfile.avatar}</span>
            <span className="hidden sm:inline font-semibold">{userProfile.name.split(' ')[0]}</span>
            <span className="text-[10px] text-amber-400 font-mono bg-amber-950 px-1 rounded border border-amber-600/30">
              {userProfile.xp} XP
            </span>
          </button>

          {/* In-App PWA / APK Install Button */}
          {!isInstalled && (
            <button
              onClick={() => {
                soundEffects.playClick();
                if (isInstallable) {
                  install();
                } else {
                  onOpenApkGuide();
                }
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 py-1.5 text-xs font-semibold shadow-md shadow-emerald-700/20 transition cursor-pointer"
              title="Install PolitiBot as standalone Android APK or PWA app"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isInstallable ? 'Install APK' : isIOS ? 'Install iOS' : 'Get APK'}</span>
            </button>
          )}

          {isInstalled && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-[11px] font-medium text-emerald-300">
              <Smartphone className="w-3 h-3 text-emerald-400" />
              APK Installed
            </span>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950/95 py-2 px-1">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('chat');
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activeTab === 'chat' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Bot className="w-4 h-4" />
          Dialogue
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('knowledge');
          }}
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activeTab === 'knowledge' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Knowledge
          <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('quiz');
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activeTab === 'quiz' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Quiz
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('journey');
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activeTab === 'journey' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          Journey
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('simulator');
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            activeTab === 'simulator' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Scale className="w-4 h-4" />
          Systems
        </button>
      </div>
    </header>
  );
};
