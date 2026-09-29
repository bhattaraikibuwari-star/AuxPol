import React from 'react';
import { RobotState } from '../types';
import {
  Volume2,
  Mic,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Cpu,
  GraduationCap,
  Award
} from 'lucide-react';

interface RobotAvatarProps {
  state: RobotState;
  creatorName?: string;
  onClick?: () => void;
  showStatusBadge?: boolean;
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({
  state,
  creatorName = 'Mr. Ranjit Bhattarai Chetry',
  onClick,
  showStatusBadge = true,
}) => {
  const getStateGlow = () => {
    switch (state) {
      case 'listening':
        return 'from-emerald-500 via-teal-400 to-emerald-600 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)]';
      case 'thinking':
        return 'from-cyan-500 via-indigo-500 to-sky-400 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)]';
      case 'speaking':
        return 'from-sky-400 via-blue-500 to-indigo-600 border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.45)]';
      case 'upgrading':
        return 'from-amber-400 via-orange-500 to-amber-600 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.45)]';
      case 'idle':
      default:
        return 'from-amber-500 via-cyan-500 to-indigo-500 border-slate-700/80 shadow-xl';
    }
  };

  const getStatusText = () => {
    switch (state) {
      case 'listening':
        return 'Listening to your question...';
      case 'thinking':
        return 'Synthesizing theoretical matrix...';
      case 'speaking':
        return 'Delivering lecture response (Audio Active)...';
      case 'upgrading':
        return 'Integrating curriculum upgrades...';
      case 'idle':
      default:
        return 'PolitiBot Ready • Mentored by Prof. Ranjit Bhattarai Chetry';
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center p-2 select-none cursor-pointer group"
      title="PolitiBot - Virtual Political Science Mentor (Created by Mr. Ranjit Bhattarai Chetry)"
    >
      {/* Dynamic Animated State Halo */}
      <div
        className={`absolute w-36 h-48 sm:w-44 sm:h-56 rounded-3xl opacity-40 blur-xl transition-all duration-500 bg-gradient-to-tr ${getStateGlow()} ${
          state !== 'idle' ? 'scale-110 opacity-70 animate-pulse' : 'group-hover:opacity-60'
        }`}
      />

      {/* Main Creator Scholar Avatar Card */}
      <div
        className={`relative w-36 sm:w-44 rounded-3xl bg-slate-900/90 border-2 p-1.5 shadow-2xl backdrop-blur-md flex flex-col items-center overflow-hidden transition-all duration-300 ${
          state === 'listening'
            ? 'border-emerald-400/90'
            : state === 'thinking'
            ? 'border-cyan-400/90'
            : state === 'speaking'
            ? 'border-sky-400/90'
            : state === 'upgrading'
            ? 'border-amber-400/90'
            : 'border-amber-500/50 hover:border-amber-400'
        }`}
      >
        {/* Creator Portrait Frame */}
        <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
          <img
            src="/src/assets/images/creator_ranjit_1790705301760.jpg"
            alt="Mr. Ranjit Bhattarai Chetry - Creator of PolitiBot"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-500 ${
              state === 'speaking' ? 'scale-105' : 'group-hover:scale-105'
            }`}
          />

          {/* Neural / Thinking Scanline Overlay */}
          {(state === 'thinking' || state === 'upgrading') && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent animate-scan pointer-events-none" />
          )}

          {/* Soundwave Equalizer Overlay for Speaking State */}
          {state === 'speaking' && (
            <div className="absolute inset-x-0 bottom-0 py-1.5 px-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-end justify-center gap-1">
              {[6, 12, 18, 24, 16, 22, 10, 15, 20, 8].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-gradient-to-t from-sky-400 to-cyan-300 rounded-full animate-pulse"
                  style={{
                    height: `${Math.max(4, (i % 4 + 1) * 5)}px`,
                    animationDelay: `${i * 75}ms`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Listening Pulsing Mic Overlay */}
          {state === 'listening' && (
            <div className="absolute inset-x-0 bottom-0 py-1.5 px-3 bg-gradient-to-t from-slate-950 to-transparent flex items-center justify-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Listening to voice...</span>
            </div>
          )}

          {/* Top Verification Badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/50 text-[10px] font-semibold text-amber-300 shadow-md">
            <Award className="w-3 h-3 text-amber-400" />
            <span>Creator Avatar</span>
          </div>

          {/* Live Signal Indicator Orb */}
          <div className="absolute top-2 right-2">
            <span
              className={`block w-3 h-3 rounded-full border-2 border-slate-950 shadow-md transition-colors ${
                state === 'listening'
                  ? 'bg-emerald-400 animate-ping'
                  : state === 'thinking'
                  ? 'bg-cyan-400 animate-pulse'
                  : state === 'speaking'
                  ? 'bg-sky-400 animate-bounce'
                  : state === 'upgrading'
                  ? 'bg-amber-400 animate-spin'
                  : 'bg-emerald-500'
              }`}
            />
          </div>
        </div>

        {/* Creator Identity & Department Attribution Bar */}
        <div className="w-full pt-1.5 pb-0.5 px-1 text-center">
          <div className="text-xs font-bold text-white tracking-tight flex items-center justify-center gap-1">
            <span>Mr. Ranjit Bhattarai Chetry</span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          </div>
          <div className="text-[10px] text-cyan-400 font-medium truncate">
            Asst. Professor • Pol. Science
          </div>
          <div className="text-[9px] text-slate-400 font-normal truncate">
            Auxilium College, Udalguri
          </div>
        </div>
      </div>

      {/* State Status Pill */}
      {showStatusBadge && (
        <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 shadow-lg backdrop-blur-sm text-xs font-medium text-slate-200">
          {state === 'speaking' && <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />}
          {state === 'listening' && <Mic className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />}
          {state === 'thinking' && <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />}
          {state === 'upgrading' && <BookOpen className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
          {state === 'idle' && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
          <span>{getStatusText()}</span>
        </div>
      )}
    </div>
  );
};
