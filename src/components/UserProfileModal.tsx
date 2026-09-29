import React, { useState } from 'react';
import { UserProfile, Badge } from '../types';
import { SYSTEM_BADGES } from '../data/badges';
import {
  User,
  GraduationCap,
  Award,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Flame,
  CheckCircle2,
  Lock,
  Save,
  Shield,
  Clock,
  Download,
  FileText,
  Printer,
  FileJson,
  Building2,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenCreator: () => void;
}

const AVATARS = ['🎓', '🤖', '🏛️', '⚖️', '📜', '🦁', '🦉', '🌐'];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onOpenCreator,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [studentId, setStudentId] = useState(profile.studentId || '');
  const [institution, setInstitution] = useState(profile.institution || 'Auxilium College, Udalguri');
  const [academicLevel, setAcademicLevel] = useState(profile.academicLevel);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [soundEnabled, setSoundEnabled] = useState(profile.soundEnabled);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: name.trim() || 'Auxilium Scholar',
      studentId: studentId.trim(),
      institution: institution.trim() || 'Auxilium College, Udalguri',
      academicLevel,
      avatar,
      soundEnabled,
    };
    soundEffects.enabled = soundEnabled;
    soundEffects.playClick();
    onUpdateProfile(updated);
    setIsEditing(false);
  };

  const getRankTitle = (xp: number) => {
    if (xp >= 600) return 'Distinguished Laureate (Level 5)';
    if (xp >= 400) return 'Diplomatic Strategist (Level 4)';
    if (xp >= 250) return 'Political Analyst (Level 3)';
    if (xp >= 100) return 'Constitutional Apprentice (Level 2)';
    return 'Novice Citizen (Level 1)';
  };

  // 1. Export as JSON
  const handleExportJSON = () => {
    soundEffects.playClick();
    const safeName = (profile.name || 'student').toLowerCase().replace(/[^a-z0-9]/g, '_');
    const exportData = {
      institution: profile.institution || 'Auxilium College, Udalguri',
      department: 'Department of Political Science',
      academicLead: 'Mr. Ranjit Bhattarai Chetry, Assistant Professor, Department of Political Science, Auxilium College, Udalguri',
      copyright: '© 2026 Mr. Ranjit Bhattarai Chetry. All Rights Reserved.',
      system: 'PolitiBot - Virtual Political Science Robot (PWA & APK)',
      exportTimestamp: new Date().toISOString(),
      studentProfile: {
        fullName: profile.name,
        studentId: profile.studentId || 'N/A',
        academicLevel: profile.academicLevel,
        rankTitle: getRankTitle(profile.xp),
        xpPoints: profile.xp,
        activeLevel: profile.level,
        studyStreakDays: profile.streakDays,
        lastActiveDate: profile.lastActiveDate,
      },
      academicRecord: {
        totalExploredTopicsCount: profile.exploredTopics.length,
        exploredTopicsList: profile.exploredTopics,
        totalQuizzesCompleted: profile.quizHistory.length,
        averageQuizScorePercentage:
          profile.quizHistory.length > 0
            ? Math.round(
                profile.quizHistory.reduce((acc, q) => acc + q.percentage, 0) /
                  profile.quizHistory.length
              )
            : 0,
        earnedBadges: profile.badges.map((bId) => {
          const found = SYSTEM_BADGES.find((sb) => sb.id === bId);
          return found
            ? { id: found.id, name: found.name, category: found.category, description: found.description }
            : { id: bId };
        }),
        quizHistory: profile.quizHistory,
      },
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `auxilium_pol_sci_record_${safeName}_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportMessage('Learning record exported as JSON successfully!');
    setTimeout(() => setExportMessage(null), 3500);
  };

  // 2. Export as PDF Academic Transcript
  const handleExportPDF = () => {
    soundEffects.playClick();
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate and print your PDF academic transcript.');
      return;
    }

    const avgScore =
      profile.quizHistory.length > 0
        ? Math.round(
            profile.quizHistory.reduce((acc, q) => acc + q.percentage, 0) /
              profile.quizHistory.length
          )
        : 0;

    const quizRowsHtml =
      profile.quizHistory.length > 0
        ? profile.quizHistory
            .map(
              (q, idx) => `
          <tr style="border-bottom: 1px solid #e2e8f0; font-size: 11px;">
            <td style="padding: 8px 10px;">${idx + 1}</td>
            <td style="padding: 8px 10px; font-weight: 600;">${q.topic}</td>
            <td style="padding: 8px 10px; text-transform: uppercase;">${q.difficulty}</td>
            <td style="padding: 8px 10px; text-align: center;">${q.score} / ${q.total}</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 700; color: ${
              q.percentage >= 75 ? '#047857' : '#b45309'
            };">${Math.round(q.percentage)}%</td>
            <td style="padding: 8px 10px; text-align: right; color: #64748b;">${q.date}</td>
          </tr>
        `
            )
            .join('')
        : '<tr><td colspan="6" style="padding: 12px; text-align: center; color: #64748b; font-style: italic;">No quiz assessments recorded yet.</td></tr>';

    const exploredTopicsHtml =
      profile.exploredTopics.length > 0
        ? profile.exploredTopics
            .map(
              (t) => `
          <span style="display: inline-block; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px 8px; font-size: 11px; margin: 3px 4px 3px 0; color: #334155;">
            ✓ ${t}
          </span>
        `
            )
            .join('')
        : '<p style="color: #64748b; font-size: 11px; font-style: italic;">No topics explored yet.</p>';

    const badgesHtml =
      profile.badges.length > 0
        ? profile.badges
            .map((bId) => {
              const badgeObj = SYSTEM_BADGES.find((b) => b.id === bId);
              return `
            <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 10px; font-size: 11px; display: inline-flex; align-items: center; gap: 6px; margin: 3px; background: #fffbeb;">
              <span>${badgeObj?.icon || '🏆'}</span>
              <strong>${badgeObj?.name || bId}</strong>
            </div>
          `;
            })
            .join('')
        : '<span style="color: #64748b; font-size: 11px;">No badges unlocked yet.</span>';

    const transcriptHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Academic Record - ${profile.name} - Auxilium College Udalguri</title>
        <style>
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 20px;
            line-height: 1.4;
          }
          .header-box {
            text-align: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          .college-title {
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 0.5px;
            color: #0f172a;
            margin: 0;
          }
          .department-title {
            font-size: 14px;
            font-weight: 600;
            color: #0284c7;
            margin: 4px 0 2px 0;
          }
          .subtitle {
            font-size: 12px;
            color: #475569;
            margin: 0;
          }
          .doc-name {
            display: inline-block;
            background: #0f172a;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            padding: 4px 14px;
            border-radius: 4px;
            margin-top: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .student-meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }
          .student-meta-table td {
            padding: 8px 12px;
            font-size: 12px;
          }
          .section-title {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #0f172a;
            border-bottom: 1.5px solid #cbd5e1;
            padding-bottom: 4px;
            margin-top: 18px;
            margin-bottom: 10px;
          }
          table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          table.data-table th {
            background: #f1f5f9;
            color: #334155;
            font-size: 11px;
            font-weight: 700;
            text-align: left;
            padding: 8px 10px;
            border-bottom: 2px solid #cbd5e1;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 15px;
          }
          .stat-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 10px;
            text-align: center;
          }
          .stat-val {
            font-size: 18px;
            font-weight: 800;
            color: #0284c7;
          }
          .stat-lbl {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
          }
          .signature-box {
            margin-top: 35px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 20px;
            border-top: 1px dashed #cbd5e1;
          }
          .sig-line {
            width: 220px;
            text-align: center;
            font-size: 11px;
            color: #334155;
          }
          .sig-line hr {
            border: 0;
            border-top: 1px solid #0f172a;
            margin-bottom: 6px;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 15px; text-align: right;">
          <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer;">
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div class="header-box">
          <h1 class="college-title">AUXILIUM COLLEGE, UDALGURI</h1>
          <h2 class="department-title">DEPARTMENT OF POLITICAL SCIENCE</h2>
          <p class="subtitle">BTR, Assam • Affiliated Academic Assessment Record</p>
          <div class="doc-name">Official Learning Journey & Assessment Transcript</div>
        </div>

        <table class="student-meta-table">
          <tr>
            <td><strong>Student Name:</strong> ${profile.name}</td>
            <td><strong>Scholar ID:</strong> ${profile.studentId || 'AUX-POL-RECORD'}</td>
          </tr>
          <tr>
            <td><strong>Academic Level:</strong> ${profile.academicLevel}</td>
            <td><strong>Institution:</strong> ${profile.institution || 'Auxilium College, Udalguri'}</td>
          </tr>
          <tr>
            <td><strong>Academic Supervisor:</strong> Mr. Ranjit Bhattarai Chetry</td>
            <td><strong>Date of Issue:</strong> ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
          </tr>
        </table>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-val">${profile.xp}</div>
            <div class="stat-lbl">Accumulated XP</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">Lvl ${profile.level}</div>
            <div class="stat-lbl">${getRankTitle(profile.xp).split('(')[0]}</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">${profile.exploredTopics.length}</div>
            <div class="stat-lbl">Explored Units</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">${avgScore}%</div>
            <div class="stat-lbl">Assessment Average</div>
          </div>
        </div>

        <div class="section-title">Assessment & Challenge History</div>
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Topic / Curriculum Domain</th>
              <th>Tier</th>
              <th style="text-align: center;">Score</th>
              <th style="text-align: right;">Accuracy</th>
              <th style="text-align: right;">Date</th>
            </tr>
          </thead>
          <tbody>
            ${quizRowsHtml}
          </tbody>
        </table>

        <div class="section-title">Explored Political Science Curriculum Modules</div>
        <div style="margin-bottom: 15px;">
          ${exploredTopicsHtml}
        </div>

        <div class="section-title">Academic Distinctions & Badges Earned</div>
        <div style="margin-bottom: 20px;">
          ${badgesHtml}
        </div>

        <div class="signature-box">
          <div class="sig-line">
            <hr>
            <strong>${profile.name}</strong><br>
            Student Scholar Signature
          </div>

          <div style="text-align: center; font-size: 10px; color: #64748b;">
            PolitiBot Learning Management Matrix<br>
            System Verification Code: <strong>AUX-POL-${profile.xp}-${Date.now().toString().slice(-5)}</strong>
          </div>

          <div class="sig-line">
            <hr>
            <strong>Mr. Ranjit Bhattarai Chetry</strong><br>
            Assistant Professor, Department of Political Science<br>
            Auxilium College, Udalguri
          </div>
        </div>

        <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #94a3b8;">
          © 2026 Mr. Ranjit Bhattarai Chetry. All Rights Reserved. Auxilium College, Udalguri, Assam.
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(transcriptHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);

    setExportMessage('Generating printable academic transcript (Save as PDF)...');
    setTimeout(() => setExportMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl p-2 rounded-2xl bg-cyan-950 border border-cyan-500/40">
              {profile.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {profile.name}
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-600/40">
                  {profile.xp} XP
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {profile.academicLevel} • {profile.institution}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 text-lg transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Live Export Notification Banner */}
        {exportMessage && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{exportMessage}</span>
          </div>
        )}

        {/* Edit or View Details */}
        {!isEditing ? (
          <div className="space-y-6">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-slate-400 text-[11px] block font-medium">Rank Level</span>
                <span className="text-sm font-bold text-cyan-400 block mt-0.5">
                  Lvl {profile.level}
                </span>
                <span className="text-[10px] text-slate-500">
                  {getRankTitle(profile.xp).split('(')[0]}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-slate-400 text-[11px] block font-medium">Quizzes Completed</span>
                <span className="text-sm font-bold text-indigo-400 block mt-0.5">
                  {profile.quizHistory.length}
                </span>
                <span className="text-[10px] text-slate-500">Assessments</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-slate-400 text-[11px] block font-medium">Topics Explored</span>
                <span className="text-sm font-bold text-emerald-400 block mt-0.5">
                  {profile.exploredTopics.length}
                </span>
                <span className="text-[10px] text-slate-500">Curriculum Units</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-slate-400 text-[11px] block font-medium">Study Streak</span>
                <span className="text-sm font-bold text-amber-400 block mt-0.5 flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {profile.streakDays}
                </span>
                <span className="text-[10px] text-slate-500">Active Days</span>
              </div>
            </div>

            {/* Academic Data Export Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-950 to-indigo-950/40 border border-cyan-700/40 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    Export Academic Records & Learning Journey
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Download complete assessment transcripts, scores, and explored syllabus units for Auxilium College record-keeping.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Export JSON Button */}
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow transition cursor-pointer"
                    title="Download learning journey & quiz data as JSON file"
                  >
                    <FileJson className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export JSON</span>
                  </button>

                  {/* Export PDF / Print Button */}
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-600/30 transition cursor-pointer"
                    title="Generate and print official Auxilium College PDF academic transcript"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Badges & Achievements Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Scholarly Badges & Achievements
                </h3>
                <span className="text-[11px] text-slate-400">
                  {profile.badges.length} / {SYSTEM_BADGES.length} Unlocked
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SYSTEM_BADGES.map((b) => {
                  const isUnlocked = profile.badges.includes(b.id) || profile.xp >= (b.pointsRequired || 9999);
                  return (
                    <div
                      key={b.id}
                      className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                        isUnlocked
                          ? 'bg-amber-950/20 border-amber-500/40 shadow-sm shadow-amber-900/10'
                          : 'bg-slate-950/40 border-slate-800/80 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{b.icon}</div>
                      <div className="text-xs font-bold text-white">{b.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1 leading-tight line-clamp-2">
                        {b.description}
                      </div>

                      <div className="mt-2 text-[9px] font-mono">
                        {isUnlocked ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Unlocked
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-0.5">
                            <Lock className="w-2.5 h-2.5" /> {b.pointsRequired} XP
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explored Topics Timeline */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Explored Political Science Topics
              </h3>

              {profile.exploredTopics.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                  {profile.exploredTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-950 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg"
                    >
                      ✓ {topic}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  No topics explored yet. Ask PolitiBot a question or complete a quiz to begin tracking your learning journey!
                </p>
              )}
            </div>

            {/* Profile Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
              >
                Edit Scholar Profile & Preferences
              </button>

              <button
                onClick={onOpenCreator}
                className="text-xs text-amber-300 hover:text-amber-200 underline font-medium cursor-pointer"
              >
                Creator & Copyright (Prof. Ranjit Bhattarai Chetry)
              </button>
            </div>
          </div>
        ) : (
          /* Profile Edit Form */
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name / Scholar Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Auxilium Student / Scholar ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. AUX-POL-2026-08"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Institution / Department
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Auxilium College, Udalguri"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Academic Level & Program
              </label>
              <select
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Undergraduate Sem 1-2">Undergraduate Sem 1-2 (Foundation)</option>
                <option value="Undergraduate Sem 3-4">Undergraduate Sem 3-4 (Intermediate)</option>
                <option value="Undergraduate Sem 5-6 (Honours)">Undergraduate Sem 5-6 (Honours Degree)</option>
                <option value="Postgraduate / MA">Postgraduate / MA Political Science</option>
                <option value="UGC-NET / UPSC Aspirant">UGC-NET / Civil Services Aspirant</option>
              </select>
            </div>

            {/* Choose Avatar */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Choose Scholar Avatar
              </label>
              <div className="flex gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition cursor-pointer ${
                      avatar === av
                        ? 'bg-cyan-950 border-cyan-400 scale-110 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  Synthesized Sound Effects (Bleeps & Chimes)
                </span>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Save Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
