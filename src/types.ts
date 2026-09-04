export type GameMode = 'intro' | 'sorting' | 'machine' | 'detective' | 'quiz' | 'creator' | 'certificate';

export type ItemClassification = 'dado' | 'informacao';

export interface SortingItem {
  id: string;
  content: string;
  type: ItemClassification;
  category: 'numero' | 'palavra' | 'simbolo' | 'frase_contextualizada';
  themeGroup?: 'escola' | 'ciencia' | 'cotidiano' | 'esporte';
  explanation: string;
  iconName: string;
  colorHint: string;
}

export interface RawDataPiece {
  id: string;
  key: string;
  value: string;
  category: string;
  icon: string;
}

export interface MachineChallenge {
  id: string;
  title: string;
  theme: string;
  story: string;
  rawItems: RawDataPiece[];
  targetSlots: {
    key: string;
    label: string;
    expectedPieceId: string;
  }[];
  resultingInformation: string;
  whyItIsInformation: string;
  decisionImpact: string;
}

export interface DetectiveCaseOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface DetectiveCase {
  id: string;
  title: string;
  scenario: string;
  rawFacts: {
    label: string;
    value: string;
    icon: string;
  }[];
  synthesizedInformation: string;
  decisionPrompt: string;
  options: DetectiveCaseOption[];
  learningTakeaway: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  focusSkill: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category?: string;
  missionName?: string;
  missionTarget?: GameMode;
  colorScheme?: 'amber' | 'indigo' | 'teal' | 'fuchsia' | 'violet' | 'emerald' | 'rose' | 'sky';
  howToUnlock?: string;
  pedagogicalSkill?: string;
}

export interface CreativeTheme {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: {
    key: string;
    label: string;
    placeholder: string;
  }[];
  generateSentence: (vals: Record<string, string>) => string;
  impact: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  simpleDefinition: string;
  analogy: string;
  example: string;
  iconName: string;
  tag: 'fundamento' | 'processamento' | 'aplicacao';
}

export interface UserProgress {
  score: number;
  stars: number;
  studentName: string;
  soundEnabled: boolean;
  voiceReadEnabled: boolean;
  sortingCompletedCount: number;
  machineCompletedCount: number;
  detectiveCompletedCount: number;
  quizScore: number;
  creatorCompletedCount?: number;
  unlockedBadges: string[];
}
