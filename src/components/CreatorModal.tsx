import React from 'react';
import { Award, GraduationCap, ShieldCheck, Copyright, BookOpen, Bot, Building2, MapPin, CheckCircle } from 'lucide-react';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-amber-600/50 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] relative">
        {/* Top Glow & Badge */}
        <div className="absolute -top-12 -right-12 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
        >
          ✕
        </button>

        {/* Creator Hero Header with Photograph */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 border-b border-slate-800 pb-6 text-center sm:text-left">
          {/* Creator Official Photograph */}
          <div className="relative shrink-0">
            <div className="w-28 h-36 sm:w-32 sm:h-44 rounded-2xl bg-slate-950 p-1 border-2 border-amber-500/60 shadow-2xl overflow-hidden">
              <img
                src="/src/assets/images/creator_ranjit_1790705301760.jpg"
                alt="Mr. Ranjit Bhattarai Chetry - Assistant Professor, Department of Political Science, Auxilium College, Udalguri"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span
              className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-500 text-slate-950 shadow-md"
              title="Verified Academic Creator"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Creator & Author
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mr. Ranjit Bhattarai Chetry
            </h2>

            <p className="text-sm font-semibold text-cyan-300 tracking-wide">
              Assistant Professor, Department of Political Science
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Auxilium College
              </span>
              <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Udalguri, BTR, Assam
              </span>
            </div>
          </div>
        </div>

        {/* Vision & Pedagogy Card */}
        <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2 text-sm text-amber-300">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Academic Leadership & Department of Political Science
            </h3>
            <p className="leading-relaxed">
              <strong>Mr. Ranjit Bhattarai Chetry</strong> is Assistant Professor in the Department of Political Science at <strong>Auxilium College, Udalguri</strong>. His pedagogical vision focuses on making complex political theory, international relations, comparative political systems, and constitutional jurisprudence intuitive, engaging, and directly accessible for students and scholars through modern interactive technology.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2 text-sm text-cyan-300">
              <Bot className="w-4 h-4 text-cyan-400" />
              Dynamic Knowledge Matrix & Curriculum Upgrades
            </h3>
            <p className="leading-relaxed">
              To ensure that PolitiBot remains continuously aligned with changing undergraduate and postgraduate syllabi, Professor Chetry architected the <strong>Knowledge Input & Upgradation Engine</strong>. This enables faculty and students to upload new academic notes, seminal case laws, and local governance case studies directly into the virtual robot's reasoning core.
            </p>
          </div>
        </div>

        {/* Official Copyright & Attribution Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-indigo-950/40 border border-amber-600/30 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold text-xs">
            <Copyright className="w-4 h-4" />
            <span>COPYRIGHT & INTELLECTUAL PROPERTY NOTICE</span>
          </div>

          <p className="text-xs text-white font-mono font-medium">
            © 2026 Mr. Ranjit Bhattarai Chetry. All Rights Reserved.
          </p>

          <p className="text-[11px] text-slate-400 max-w-lg mx-auto">
            PolitiBot - Virtual Political Science Robot. Conceptualized, designed, and authored by Mr. Ranjit Bhattarai Chetry, Assistant Professor, Department of Political Science, Auxilium College, Udalguri. Unauthorized reproduction, distribution, or commercial exploitation is strictly prohibited under applicable copyright laws.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-cyan-600 hover:from-amber-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg transition"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
