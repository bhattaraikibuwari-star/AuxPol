export type KnowledgeApprovalStatus = 'approved' | 'pending_approval' | 'rejected';

export type KnowledgeCategory =
  | 'Political Theory'
  | 'Indian Constitution'
  | 'Comparative Politics'
  | 'International Relations'
  | 'Public Administration'
  | 'Indian Political Thought'
  | 'Western Political Thought'
  | 'Feminist Political Theory'
  | 'Marxist & Critical Theory'
  | 'Ecologism & Green Politics'
  | 'Post-Colonial & Subaltern Studies'
  | 'Public Policy & Governance';

export interface KnowledgeItem {
  id: string;
  title: string;
  category: KnowledgeCategory;
  unit?: string;
  summary: string;
  content: string;
  keyThinkers?: string[];
  keyArticles?: string[];
  lastUpdated: string;
  status?: KnowledgeApprovalStatus;
  submittedBy?: string;
  submissionDate?: string;
  approvedBy?: string;
  approvalDate?: string;
  reviewNotes?: string;
}

export type RobotState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'upgrading';

export type AppTheme = 'dark' | 'academic-paper';

export type ChatMode = 'scholarly' | 'debate' | 'simplified' | 'exam_prep';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini-3.8-flash' | 'knowledge-matrix-fallback' | 'preset';
}

export type QuizDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: QuizDifficulty;
  category?: string;
}

export interface QuizData {
  title: string;
  difficulty?: QuizDifficulty;
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt?: string;
  pointsRequired?: number;
}

export interface QuizAttempt {
  id: string;
  topic: string;
  score: number;
  total: number;
  difficulty: QuizDifficulty;
  date: string;
  percentage: number;
}

export interface UserProfile {
  id: string;
  name: string;
  studentId?: string;
  institution: string;
  academicLevel: 'Undergraduate Sem 1-2' | 'Undergraduate Sem 3-4' | 'Undergraduate Sem 5-6 (Honours)' | 'Postgraduate / MA' | 'UGC-NET / UPSC Aspirant';
  avatar: string;
  xp: number;
  level: number;
  badges: string[]; // badge IDs
  exploredTopics: string[]; // knowledge IDs or titles
  quizHistory: QuizAttempt[];
  streakDays: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  autoSpeakResponses: boolean;
}

export interface CreatorInfo {
  creator: string;
  designation: string;
  department: string;
  institution: string;
  location: string;
  mission: string;
  copyright: string;
  portraitUrl?: string;
}
