import React, { useState } from 'react';
import { Scale, Shield, Globe, Award, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SystemModel {
  id: string;
  name: string;
  countryExample: string;
  executiveType: string;
  legislativeRelationship: string;
  headOfState: string;
  tenureStability: string;
  checksAndBalances: string;
  keyTheorists: string[];
  merits: string[];
  demerits: string[];
}

const SYSTEMS: SystemModel[] = [
  {
    id: 'parliamentary',
    name: 'Parliamentary System (Westminster Model)',
    countryExample: 'India, United Kingdom, Canada, Japan',
    executiveType: 'Bicephalous / Dual Executive (Nominal President/Monarch + Real Prime Minister and Cabinet)',
    legislativeRelationship: 'Fusion of Powers. Executive is drawn directly from and collectively responsible to the Legislature (Lok Sabha / House of Commons).',
    headOfState: 'Titular / Constitutional Head (President in India, King in the UK)',
    tenureStability: 'Flexible tenure dependent on majority support; can be dissolved via No-Confidence Motion or floor-crossing.',
    checksAndBalances: 'Question hour, zero hour, parliamentary committees, judicial review under basic structure.',
    keyTheorists: ['Walter Bagehot', 'A.V. Dicey', 'Dr. B.R. Ambedkar', 'Harold Laski'],
    merits: [
      'Harmony between Legislature and Executive minimizes government deadlock.',
      'Continuous accountability through parliamentary question hours and debate.',
      'Flexible leadership changes during crises without constitutional paralysis.',
      'Wide representation of diverse societal factions through cabinet coalitions.',
    ],
    demerits: [
      'Cabinet dictatorship when a single party holds an overwhelming legislative majority.',
      'Tenure instability during fragile multi-party coalitions.',
      'Violation of strict separation of powers doctrine.',
    ],
  },
  {
    id: 'presidential',
    name: 'Presidential System',
    countryExample: 'United States of America, Brazil, Philippines',
    executiveType: 'Monistic / Single Executive. The President is both Head of State and Head of Government.',
    legislativeRelationship: 'Strict Separation of Powers. Executive is independently elected and neither sits in nor is politically accountable to Congress.',
    headOfState: 'The President (Elected directly or via Electoral College)',
    tenureStability: 'Fixed four-year term; executive cannot dissolve Congress and Congress can only remove via high-threshold Impeachment.',
    checksAndBalances: 'Presidential veto, Congressional confirmation of appointments/treaties, Congressional power of the purse, Judicial Review.',
    keyTheorists: ['Montesquieu', 'James Madison', 'Alexander Hamilton', 'Woodrow Wilson'],
    merits: [
      'Stable executive tenure unaffected by shifting legislative factions.',
      'Cabinet can recruit external technocratic and domain experts rather than elected politicians.',
      'Strict fidelity to Montesquieu’s Trias Politica separation of powers.',
    ],
    demerits: [
      'Prone to legislative gridlock and government shutdowns during "divided government".',
      'Rigid fixed terms make rapid replacement of inept or unpopular leaders difficult.',
      'Risk of executive aggrandizement and personalistic authoritarianism.',
    ],
  },
  {
    id: 'semi-presidential',
    name: 'Semi-Presidential / Dual Executive System',
    countryExample: 'France (Fifth Republic), Finland, Portugal',
    executiveType: 'Dual Executive with variable power distribution: Popularly elected President + Prime Minister accountable to Parliament.',
    legislativeRelationship: 'Hybrid: President handles foreign affairs and defense, while Prime Minister commands domestic administration and is accountable to the National Assembly.',
    headOfState: 'Directly elected President with substantial executive reserve powers.',
    tenureStability: 'Cohabitation occurs when President and Parliamentary majority belong to opposing political parties.',
    checksAndBalances: 'Constitutional Council, parliamentary votes of censure, presidential power of assembly dissolution.',
    keyTheorists: ['Charles de Gaulle', 'Maurice Duverger'],
    merits: [
      'Combines presidential crisis decisiveness with parliamentary responsiveness.',
      'Electoral legitimacy through direct universal suffrage for the head of state.',
    ],
    demerits: [
      'Cohabitation friction can paralyze policy coordination between President and Prime Minister.',
      'Confusion of ultimate executive accountability in public perception.',
    ],
  },
  {
    id: 'swiss-direct',
    name: 'Direct Democratic Collegiate Directory',
    countryExample: 'Switzerland (Swiss Confederation)',
    executiveType: 'Collegiate Federal Council of 7 equal members elected by the Federal Assembly, with rotating nominal presidency.',
    legislativeRelationship: 'Neither Parliamentary nor Presidential. Federal Council does not dissolve Parliament, and Parliament cannot oust the Council mid-term.',
    headOfState: 'Collective Federal Council (President of Confederation is primus inter pares for 1 year).',
    tenureStability: 'Extremely high stability governed by traditional consensus (Magic Formula).',
    checksAndBalances: 'Mandatory and optional Referendums, Popular Citizen Initiatives, cantonal federalism.',
    keyTheorists: ['Jean-Jacques Rousseau', 'Alexis de Tocqueville'],
    merits: [
      'Maximum citizen sovereignty through direct democracy tools (Referendums & Initiatives).',
      'Consensus-based coalition prevents majoritarian tyranny over linguistic/religious minorities.',
    ],
    demerits: [
      'Slow decision-making due to pervasive public referendums and consultation procedures.',
      'Voter fatigue from frequent nationwide ballots.',
    ],
  },
];

export const ComparativeSimulator: React.FC = () => {
  const [selectedIdA, setSelectedIdA] = useState<string>('parliamentary');
  const [selectedIdB, setSelectedIdB] = useState<string>('presidential');

  const systemA = SYSTEMS.find((s) => s.id === selectedIdA) || SYSTEMS[0];
  const systemB = SYSTEMS.find((s) => s.id === selectedIdB) || SYSTEMS[1];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 mb-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Scale className="w-4 h-4" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Comparative Political Systems Lab
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          Simulate and analyze divergent constitutional models across executive arrangements, legislative interdependence, accountability mechanisms, and institutional stability.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900/80 border border-cyan-800/40 rounded-2xl p-4">
          <label className="block text-xs font-semibold text-cyan-300 mb-2">
            Model Alpha (Primary System):
          </label>
          <select
            value={selectedIdA}
            onChange={(e) => setSelectedIdA(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
          >
            {SYSTEMS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-900/80 border border-indigo-800/40 rounded-2xl p-4">
          <label className="block text-xs font-semibold text-indigo-300 mb-2">
            Model Beta (Comparative System):
          </label>
          <select
            value={selectedIdB}
            onChange={(e) => setSelectedIdB(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400 font-medium"
          >
            {SYSTEMS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparative Matrix Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* System A Card */}
          <div className="p-6 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 rounded">
                Model Alpha
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{systemA.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                <strong className="text-slate-300">Exemplar States:</strong> {systemA.countryExample}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                Executive Architecture
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
                {systemA.executiveType}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                Executive - Legislative Nexus
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
                {systemA.legislativeRelationship}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                Tenure Stability & Removal
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
                {systemA.tenureStability}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                Key Thinkers
              </h4>
              <div className="flex flex-wrap gap-1">
                {systemA.keyTheorists.map((th, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60"
                  >
                    👤 {th}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Core Strengths
              </h4>
              <ul className="space-y-1">
                {systemA.merits.map((m, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* System B Card */}
          <div className="p-6 space-y-5 bg-slate-950/30">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/70 border border-indigo-800/40 px-2 py-0.5 rounded">
                Model Beta
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{systemB.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                <strong className="text-slate-300">Exemplar States:</strong> {systemB.countryExample}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                Executive Architecture
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
                {systemB.executiveType}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                Executive - Legislative Nexus
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
                {systemB.legislativeRelationship}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                Tenure Stability & Removal
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
                {systemB.tenureStability}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                Key Thinkers
              </h4>
              <div className="flex flex-wrap gap-1">
                {systemB.keyTheorists.map((th, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60"
                  >
                    👤 {th}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Core Strengths
              </h4>
              <ul className="space-y-1">
                {systemB.merits.map((m, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
