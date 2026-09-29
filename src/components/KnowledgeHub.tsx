import React, { useState } from 'react';
import { KnowledgeItem, KnowledgeApprovalStatus } from '../types';
import {
  BookOpen,
  PlusCircle,
  Search,
  Tag,
  GraduationCap,
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  FileText,
  Clock,
  ShieldCheck,
  Check,
  X,
  Award,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { INITIAL_KNOWLEDGE_BASE } from '../data/defaultKnowledge';
import { soundEffects } from '../utils/soundEffects';

interface KnowledgeHubProps {
  knowledgeBase: KnowledgeItem[];
  onAddKnowledge: (item: KnowledgeItem) => void;
  onUpdateKnowledge: (item: KnowledgeItem) => void;
  onDeleteKnowledge: (id: string) => void;
  onResetToDefault: () => void;
  onImportKnowledge: (items: KnowledgeItem[]) => void;
  onTriggerUpgradeAnimation: () => void;
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({
  knowledgeBase,
  onAddKnowledge,
  onUpdateKnowledge,
  onDeleteKnowledge,
  onResetToDefault,
  onImportKnowledge,
  onTriggerUpgradeAnimation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [approvalFilter, setApprovalFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Faculty Review Mode (Professor Ranjit Bhattarai Chetry's Desk)
  const [isFacultyDeskOpen, setIsFacultyDeskOpen] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<KnowledgeItem['category']>('Political Theory');
  const [formUnit, setFormUnit] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formThinkers, setFormThinkers] = useState('');
  const [formArticles, setFormArticles] = useState('');
  const [formDirectApprove, setFormDirectApprove] = useState(false);

  const categories: string[] = [
    'All',
    'Political Theory',
    'Feminist Political Theory',
    'Marxist & Critical Theory',
    'Ecologism & Green Politics',
    'Indian Constitution',
    'Comparative Politics',
    'International Relations',
    'Public Administration',
    'Indian Political Thought',
    'Western Political Thought',
    'Post-Colonial & Subaltern Studies',
    'Public Policy & Governance',
  ];

  // Counts
  const approvedCount = knowledgeBase.filter(
    (k) => k.status === 'approved' || !k.status || k.status === undefined
  ).length;
  const pendingCount = knowledgeBase.filter((k) => k.status === 'pending_approval').length;
  const rejectedCount = knowledgeBase.filter((k) => k.status === 'rejected').length;

  // Open Form for Adding New Knowledge
  const openAddForm = () => {
    soundEffects.playClick();
    setEditingItem(null);
    setFormTitle('');
    setFormCategory('Political Theory');
    setFormUnit('');
    setFormSummary('');
    setFormContent('');
    setFormThinkers('');
    setFormArticles('');
    setFormDirectApprove(isFacultyDeskOpen);
    setIsFormOpen(true);
  };

  // Open Form for Editing Knowledge
  const openEditForm = (item: KnowledgeItem) => {
    soundEffects.playClick();
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormUnit(item.unit || '');
    setFormSummary(item.summary);
    setFormContent(item.content);
    setFormThinkers(item.keyThinkers ? item.keyThinkers.join(', ') : '');
    setFormArticles(item.keyArticles ? item.keyArticles.join(', ') : '');
    setFormDirectApprove(item.status === 'approved');
    setIsFormOpen(true);
  };

  // Save Knowledge Module
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();

    if (!formTitle.trim() || !formContent.trim()) {
      alert('Please provide at least a title and academic content for the knowledge module.');
      return;
    }

    const thinkersArray = formThinkers
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const articlesArray = formArticles
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const isApproved = formDirectApprove || (isFacultyDeskOpen && formDirectApprove);

    const updatedItem: KnowledgeItem = {
      id: editingItem ? editingItem.id : `kb-${Date.now()}`,
      title: formTitle.trim(),
      category: formCategory,
      unit: formUnit.trim() || 'General Curriculum',
      summary: formSummary.trim() || formContent.trim().substring(0, 140) + '...',
      content: formContent.trim(),
      keyThinkers: thinkersArray.length > 0 ? thinkersArray : undefined,
      keyArticles: articlesArray.length > 0 ? articlesArray : undefined,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: isApproved ? 'approved' : 'pending_approval',
      submittedBy: editingItem?.submittedBy || 'Auxilium Scholar / Student',
      submissionDate: editingItem?.submissionDate || new Date().toISOString().split('T')[0],
      approvedBy: isApproved
        ? 'Mr. Ranjit Bhattarai Chetry'
        : editingItem?.approvedBy,
      approvalDate: isApproved
        ? new Date().toISOString().split('T')[0]
        : editingItem?.approvalDate,
    };

    if (editingItem) {
      onUpdateKnowledge(updatedItem);
      if (isApproved) {
        setSaveSuccessMessage(`Updated and approved canon: "${updatedItem.title}"`);
      } else {
        setSaveSuccessMessage(
          `Module updated! Awaiting approval from Mr. Ranjit Bhattarai Chetry before becoming final.`
        );
      }
    } else {
      onAddKnowledge(updatedItem);
      if (isApproved) {
        setSaveSuccessMessage(
          `Module approved and activated in PolitiBot's official canon: "${updatedItem.title}"`
        );
      } else {
        setSaveSuccessMessage(
          `Module submitted! In accordance with department standards, PolitiBot will consider it final and integrate it into live reasoning ONLY after approval by Mr. Ranjit Bhattarai Chetry.`
        );
      }
    }

    onTriggerUpgradeAnimation();
    setIsFormOpen(false);
    setTimeout(() => setSaveSuccessMessage(null), 5000);
  };

  // Faculty Approval Action by Professor Ranjit Bhattarai Chetry
  const handleApproveItem = (item: KnowledgeItem) => {
    soundEffects.playCorrectChime();
    const approvedItem: KnowledgeItem = {
      ...item,
      status: 'approved',
      approvedBy: 'Mr. Ranjit Bhattarai Chetry',
      approvalDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    onUpdateKnowledge(approvedItem);
    onTriggerUpgradeAnimation();
    setSaveSuccessMessage(
      `Approved! "${item.title}" is now part of PolitiBot's official live reasoning canon.`
    );
    setTimeout(() => setSaveSuccessMessage(null), 4500);
  };

  // Faculty Reject / Request Revisions
  const handleRejectItem = (item: KnowledgeItem) => {
    soundEffects.playClick();
    const rejectedItem: KnowledgeItem = {
      ...item,
      status: 'rejected',
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    onUpdateKnowledge(rejectedItem);
    setSaveSuccessMessage(`Returned for revision: "${item.title}"`);
    setTimeout(() => setSaveSuccessMessage(null), 3500);
  };

  // Approve all pending items at once
  const handleApproveAllPending = () => {
    soundEffects.playCorrectChime();
    const pendingItems = knowledgeBase.filter((k) => k.status === 'pending_approval');
    if (pendingItems.length === 0) return;

    pendingItems.forEach((item) => {
      onUpdateKnowledge({
        ...item,
        status: 'approved',
        approvedBy: 'Mr. Ranjit Bhattarai Chetry',
        approvalDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
      });
    });

    onTriggerUpgradeAnimation();
    setSaveSuccessMessage(
      `All ${pendingItems.length} pending modules approved by Mr. Ranjit Bhattarai Chetry and added to official canon!`
    );
    setTimeout(() => setSaveSuccessMessage(null), 5000);
  };

  // Export knowledge matrix to JSON file
  const handleExport = () => {
    soundEffects.playClick();
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(knowledgeBase, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `auxilium_pol_sci_knowledge_matrix_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import knowledge matrix from JSON file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Tag imported items as pending approval if not already approved
          const sanitized = parsed.map((item: any) => ({
            ...item,
            status: item.status || 'pending_approval',
            submittedBy: item.submittedBy || 'Imported Syllabus File',
            submissionDate: item.submissionDate || new Date().toISOString().split('T')[0],
          }));
          onImportKnowledge(sanitized);
          onTriggerUpgradeAnimation();
          setSaveSuccessMessage(
            `Imported ${sanitized.length} modules! Unverified items are placed in queue for Mr. Ranjit Bhattarai Chetry's approval.`
          );
          setTimeout(() => setSaveSuccessMessage(null), 5000);
        } else {
          alert('Invalid knowledge file format. Expected a JSON array of knowledge modules.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Filtered knowledge base
  const filteredKnowledge = knowledgeBase.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    const itemStatus = item.status || 'approved';
    const matchesApproval =
      approvalFilter === 'all' ||
      (approvalFilter === 'approved' && itemStatus === 'approved') ||
      (approvalFilter === 'pending' && itemStatus === 'pending_approval') ||
      (approvalFilter === 'rejected' && itemStatus === 'rejected');

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.keyThinkers &&
        item.keyThinkers.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (item.keyArticles &&
        item.keyArticles.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesApproval && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Official Academic Approval Protocol Banner */}
      <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border-2 border-amber-500/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <img
              src="/src/assets/images/creator_ranjit_1790705301760.jpg"
              alt="Mr. Ranjit Bhattarai Chetry"
              referrerPolicy="no-referrer"
              className="w-12 h-16 rounded-xl object-cover border-2 border-amber-400 shrink-0 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-600/50 text-[10px] font-bold uppercase tracking-wider">
                  Academic Governance Protocol
                </span>
                <span className="text-xs text-slate-400">Auxilium College, Udalguri</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                Faculty Approval & Canon Validation Gate
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed max-w-3xl">
                Users and scholars can submit lecture notes, syllabus units, and constitutional case studies.
                However, <strong>PolitiBot considers knowledge final and integrates it into live reasoning ONLY after approval by Mr. Ranjit Bhattarai Chetry</strong> (Assistant Professor, Department of Political Science).
              </p>
            </div>
          </div>

          {/* Toggle Faculty Approval Desk */}
          <div className="shrink-0 w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsFacultyDeskOpen(!isFacultyDeskOpen);
              }}
              className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer shadow-md ${
                isFacultyDeskOpen
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isFacultyDeskOpen
                  ? 'Prof. Chetry Desk: Active'
                  : `Prof. Chetry Approval Desk (${pendingCount})`}
              </span>
            </button>
          </div>
        </div>

        {/* Expanded Faculty Desk Controls */}
        {isFacultyDeskOpen && (
          <div className="mt-4 pt-3 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs bg-amber-950/30 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-amber-200">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>
                <strong>Academic Lead Mode:</strong> You can review submitted proposals, certify them as canon, or request student revisions.
              </span>
            </div>

            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <button
                  onClick={handleApproveAllPending}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow transition cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve All {pendingCount} Pending</span>
                </button>
              )}
              <span className="text-[11px] text-slate-400 font-mono">
                {pendingCount} Pending • {approvedCount} Approved Canon
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Header Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-950/70 border border-amber-500/40 text-amber-400">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Knowledge Input & Upgradation Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed flex items-center gap-2 mt-1">
              <img
                src="/src/assets/images/creator_ranjit_1790705301760.jpg"
                alt="Mr. Ranjit Bhattarai Chetry"
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover border border-amber-400 shrink-0"
              />
              <span>
                Curated under the academic guidance of{' '}
                <strong className="text-slate-200">Mr. Ranjit Bhattarai Chetry</strong>, Assistant Professor, Department of Political Science, Auxilium College, Udalguri.
                Input lecture notes and syllabi to propose updates to the robot’s memory bank.
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={openAddForm}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/30 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Propose / Add Knowledge
            </button>

            <button
              onClick={() => {
                soundEffects.playRobotChirp();
                onTriggerUpgradeAnimation();
              }}
              title="Synchronize all approved canon modules into active robot memory"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-medium transition cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              Sync Approved Canon ({approvedCount})
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={handleExport}
                title="Export Knowledge Database as JSON for students and backups"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>

              <label
                title="Import Syllabus / Knowledge JSON file"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer flex items-center justify-center"
              >
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  if (
                    confirm(
                      'Reset knowledge base to Auxilium College default curriculum? Any unapproved or custom items will be reset.'
                    )
                  ) {
                    onResetToDefault();
                  }
                }}
                title="Reset to default Auxilium curriculum"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Notification Banner */}
        {saveSuccessMessage && (
          <div className="mt-4 flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Approval Status Tabs & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setApprovalFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              approvalFilter === 'all'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Modules ({knowledgeBase.length})
          </button>

          <button
            onClick={() => setApprovalFilter('approved')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              approvalFilter === 'approved'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-400 hover:bg-emerald-950/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved Canon ({approvedCount})</span>
          </button>

          <button
            onClick={() => setApprovalFilter('pending')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer relative ${
              approvalFilter === 'pending'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-400 hover:bg-amber-950/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Review ({pendingCount})</span>
            {pendingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
            )}
          </button>

          {rejectedCount > 0 && (
            <button
              onClick={() => setApprovalFilter('rejected')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                approvalFilter === 'rejected'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-400 hover:bg-rose-950/40'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Needs Revision ({rejectedCount})</span>
            </button>
          )}
        </div>

        {/* Academic Note */}
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>PolitiBot reasoning uses <strong>Approved Canon</strong> exclusively.</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctrines, thinkers, or articles..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredKnowledge.map((item) => {
          const isApproved = item.status === 'approved' || !item.status || item.status === undefined;
          const isPending = item.status === 'pending_approval';
          const isRejected = item.status === 'rejected';

          return (
            <div
              key={item.id}
              className={`bg-slate-900/80 border rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group ${
                isApproved
                  ? 'border-slate-800/90 hover:border-emerald-500/40'
                  : isPending
                  ? 'border-amber-600/60 bg-amber-950/10 hover:border-amber-500'
                  : 'border-rose-800/60 bg-rose-950/10'
              }`}
            >
              <div>
                {/* Status Badge & Meta */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>

                    {/* Prominent Verification Badge */}
                    {isApproved ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-600/40 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Approved Canon
                      </span>
                    ) : isPending ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-300 bg-amber-950/80 border border-amber-500/50 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Pending Prof. Chetry Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-300 bg-rose-950/70 border border-rose-600/40 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3 h-3 text-rose-400" />
                        Needs Revision
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openEditForm(item)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition cursor-pointer"
                      title="Edit knowledge module"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete knowledge module "${item.title}"?`)) {
                          onDeleteKnowledge(item.id);
                        }
                      }}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Unit */}
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-200 transition">
                  {item.title}
                </h3>
                {item.unit && (
                  <p className="text-[11px] text-amber-400 font-medium mb-2 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    {item.unit}
                  </p>
                )}

                {/* Summary */}
                <p className="text-xs text-slate-300 mb-3 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Thinkers and Articles Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.keyThinkers?.map((thinker, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60"
                    >
                      👤 {thinker}
                    </span>
                  ))}
                  {item.keyArticles?.map((art, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-indigo-950/50 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-700/50"
                    >
                      📜 {art}
                    </span>
                  ))}
                </div>

                {/* Faculty Approval Desk Action Row (Quick Action when Desk is Open) */}
                {isFacultyDeskOpen && isPending && (
                  <div className="mb-3 p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-amber-200">
                      <span>Submitted by: <strong>{item.submittedBy || 'Scholar'}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleRejectItem(item)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-rose-950 text-rose-300 border border-rose-700/40 text-[10px] font-semibold transition cursor-pointer"
                        title="Return to student for revision"
                      >
                        Request Edit
                      </button>
                      <button
                        onClick={() => handleApproveItem(item)}
                        className="flex items-center gap-1 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-md transition cursor-pointer"
                        title="Certify as official PolitiBot canon"
                      >
                        <Check className="w-3 h-3" />
                        <span>Approve Canon</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with status details & certification */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                {isApproved ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Active in Robot (Approved by Prof. Chetry)</span>
                  </span>
                ) : isPending ? (
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Awaiting Prof. Chetry's Approval</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Revision Requested</span>
                  </span>
                )}

                <span className="text-[10px] text-slate-500">
                  {item.approvalDate
                    ? `Certified: ${item.approvalDate}`
                    : `Updated: ${item.lastUpdated}`}
                </span>
              </div>
            </div>
          );
        })}

        {filteredKnowledge.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">
              No knowledge modules match your filter.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query, selecting another category, or proposing a new module.
            </p>
            <button
              onClick={openAddForm}
              className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Propose a new module now
            </button>
          </div>
        )}
      </div>

      {/* Input / Upgrade Knowledge Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingItem ? 'Edit Knowledge Proposal' : 'Propose / Input Knowledge Module'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Proposals enter PolitiBot's official live matrix upon Professor Ranjit Bhattarai Chetry's approval
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Academic Notice in Form */}
            <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 text-xs text-amber-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Academic Governance Policy:</strong> You are welcome to input syllabus modules, case briefs, and theory notes.
                To preserve academic rigor, <strong>PolitiBot will consider this module final and canonical only after formal approval by Mr. Ranjit Bhattarai Chetry</strong>.
              </span>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. John Rawls' Theory of Justice and Original Position"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Political Theory">Political Theory</option>
                    <option value="Feminist Political Theory">Feminist Political Theory</option>
                    <option value="Marxist & Critical Theory">Marxist & Critical Theory</option>
                    <option value="Ecologism & Green Politics">Ecologism & Green Politics</option>
                    <option value="Indian Constitution">Indian Constitution</option>
                    <option value="Comparative Politics">Comparative Politics</option>
                    <option value="International Relations">International Relations</option>
                    <option value="Public Administration">Public Administration</option>
                    <option value="Indian Political Thought">Indian Political Thought</option>
                    <option value="Western Political Thought">Western Political Thought</option>
                    <option value="Post-Colonial & Subaltern Studies">Post-Colonial & Subaltern Studies</option>
                    <option value="Public Policy & Governance">Public Policy & Governance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Syllabus Unit / Paper Reference
                  </label>
                  <input
                    type="text"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="e.g. Auxilium Sem III - Unit 2"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Quick Summary (Core Thesis)
                </label>
                <input
                  type="text"
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Concise 1-2 sentence core thesis for rapid robot synthesis"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Comprehensive Academic Content & Lecture Notes *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Detail the key arguments, historical context, philosophical debates, criticisms, and constitutional ramifications..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Key Thinkers (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formThinkers}
                    onChange={(e) => setFormThinkers(e.target.value)}
                    placeholder="e.g. John Rawls, Robert Nozick, Amartya Sen"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Key Articles / Treaties (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formArticles}
                    onChange={(e) => setFormArticles(e.target.value)}
                    placeholder="e.g. Article 14, Article 21, UN Charter"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Faculty Immediate Approval Checkbox if Faculty Desk is Open */}
              {isFacultyDeskOpen && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-300 block">
                      Direct Faculty Approval (Mr. Ranjit Bhattarai Chetry)
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Bypass review queue and activate immediately into PolitiBot's official live canon.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formDirectApprove}
                    onChange={(e) => setFormDirectApprove(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {formDirectApprove
                    ? 'Approve & Activate in Robot Memory'
                    : 'Submit for Professor Chetry Approval'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
