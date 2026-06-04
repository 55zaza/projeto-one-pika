// ============================================================
// TIPOS EXPANDIDOS DO JOGO — ONE PIECE TRACKER
// ============================================================

export interface DailyChallenge {
  id: number;
  desc: string;
  target: number;
  current: number;
  done: boolean;
  reward: number;
}

export interface XPMultiplier {
  active: boolean;
  expiresAt: number | null;
}

export interface PirateWager {
  active: boolean;
  amount: number;
}

export interface WrongQuestion {
  arcId: string;
  q: string;
  opts: string[];
  correct: number;
}

export type SkinId =
  | 'default'
  | 'straw-hat'
  | 'marine-cloak'
  | 'zoro-wano'
  | 'chopper-hat'
  | 'enel-god'
  | 'gear-5';

export type ThemeId =
  | 'classic'
  | 'wano-sakura'
  | 'blackbeard-dark'
  | 'marine-blue';

export type TitleId =
  | 'Recruta'
  | 'Supernova'
  | 'Shichibukai'
  | 'Yonkou'
  | 'Rei dos Piratas';

export type MascotMood = 'normal' | 'happy' | 'sad';

export interface ShopItem {
  id: string;
  name: string;
  cost: number;
  type: 'skin' | 'theme' | 'title' | 'item';
  description: string;
}

export interface LeagueBot {
  name: string;
  avatar: string;
  xp: number;
}

export interface GameState {
  // Core
  onboarded: boolean;
  username: string;
  mode: string;
  dailyGoal: number;
  mascot: string;

  // Progress
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  watchedEps: Record<string, number[]>;
  completedArcs: string[];
  completedQuizzes: string[];

  // Streak protection
  streakFreeze: boolean;

  // XP Multiplier
  xpMultiplier: XPMultiplier;

  // Wrong questions bank
  wrongQuestions: WrongQuestion[];

  // Economy
  bountyBerries: number;

  // Cosmetics
  unlockedSkins: SkinId[];
  currentSkin: SkinId;
  currentTheme: ThemeId;

  // Titles
  unlockedTitles: TitleId[];
  currentTitle: TitleId;

  // Encyclopedia
  unlockedCharacters: string[];

  // Daily challenges
  dailyChallengesStatus: DailyChallenge[];
  lastChallengeDate: string;

  // Spoiler filter
  spoilerFilterEp: number;

  // Wager
  pirateWager: PirateWager;

  // Achievements
  achievements: string[];

  // Weekly ranking
  weeklyXP: number;
  lastWeekReset: string;

  // Fishing minigame
  lastFishTime: number;

  // Today's watched count
  todayWatched: number;
  lastWatchDate: string;
}

export const INITIAL_GAME_STATE: GameState = {
  onboarded: false,
  username: '',
  mode: 'turbo',
  dailyGoal: 3,
  mascot: 'Luffy',

  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: '',
  watchedEps: {},
  completedArcs: [],
  completedQuizzes: [],

  streakFreeze: false,
  xpMultiplier: { active: false, expiresAt: null },
  wrongQuestions: [],
  bountyBerries: 0,

  unlockedSkins: ['default'],
  currentSkin: 'default',
  currentTheme: 'classic',

  unlockedTitles: ['Recruta'],
  currentTitle: 'Recruta',

  unlockedCharacters: [],
  dailyChallengesStatus: [],
  lastChallengeDate: '',

  spoilerFilterEp: 9999,
  pirateWager: { active: false, amount: 0 },
  achievements: [],

  weeklyXP: 0,
  lastWeekReset: '',

  lastFishTime: 0,
  todayWatched: 0,
  lastWatchDate: '',
};

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'straw-hat', name: '🎩 Chapéu de Palha', cost: 300, type: 'skin', description: 'O chapéu do Rei dos Piratas!' },
  { id: 'marine-cloak', name: '⚓ Capa de Almirante', cost: 500, type: 'skin', description: 'Vista a capa da Marinha!' },
  { id: 'zoro-wano', name: '⚔️ Robe de Wano', cost: 400, type: 'skin', description: 'O estilo de Zoro em Wano!' },
  { id: 'chopper-hat', name: '🩺 Chapéu do Chopper', cost: 250, type: 'skin', description: 'Fofo e poderoso!' },
  { id: 'enel-god', name: '⚡ Tambores de Enel', cost: 600, type: 'skin', description: 'O poder de um Deus!' },
  { id: 'gear-5', name: '☁️ Gear 5', cost: 1000, type: 'skin', description: 'O poder mais absurdo do mundo!' },
  { id: 'wano-sakura', name: '🌸 Tema Wano Sakura', cost: 400, type: 'theme', description: 'Flores de cerejeira de Wano' },
  { id: 'blackbeard-dark', name: '🌑 Tema Barba Negra', cost: 450, type: 'theme', description: 'O lado sombrio do Grand Line' },
  { id: 'marine-blue', name: '🌊 Tema Marinha Azul', cost: 350, type: 'theme', description: 'A força da Marinha' },
  { id: 'title-supernova', name: '💫 Título: Supernova', cost: 200, type: 'title', description: 'Recompensa acima de 100M!' },
  { id: 'title-shichibukai', name: '🏴 Título: Shichibukai', cost: 500, type: 'title', description: 'Um dos 7 Guerreiros do Mar' },
  { id: 'title-yonkou', name: '👑 Título: Yonkou', cost: 1000, type: 'title', description: 'Um dos 4 Imperadores!' },
  { id: 'streak-freeze', name: '🧊 Proteção de Streak', cost: 150, type: 'item', description: 'Protege seu streak por 1 dia' },
  { id: 'xp-double', name: '⚡ XP Duplo (15min)', cost: 100, type: 'item', description: 'Dobra o XP por 15 minutos!' },
];

export const THEMES: Record<ThemeId, { bg: string; accent: string; border: string }> = {
  'classic': {
    bg: 'linear-gradient(180deg,#0a1628 0%,#0d2137 60%,#0a1628 100%)',
    accent: '#f0a500',
    border: 'rgba(240,165,0,0.2)',
  },
  'wano-sakura': {
    bg: 'linear-gradient(180deg,#1a0a1e 0%,#2d0a2e 60%,#1a0a1e 100%)',
    accent: '#ff69b4',
    border: 'rgba(255,105,180,0.2)',
  },
  'blackbeard-dark': {
    bg: 'linear-gradient(180deg,#050505 0%,#0d0d0d 60%,#050505 100%)',
    accent: '#8b0000',
    border: 'rgba(139,0,0,0.3)',
  },
  'marine-blue': {
    bg: 'linear-gradient(180deg,#001a33 0%,#002a4d 60%,#001a33 100%)',
    accent: '#00bfff',
    border: 'rgba(0,191,255,0.2)',
  },
};
