import { useCallback } from 'react';
import { GameState, SkinId, ThemeId, TitleId, SHOP_ITEMS } from '../types/game';

const LEAGUE_BOTS = [
  { name: 'Buggy_Fan', avatar: '🤡', baseXP: 80 },
  { name: 'Sogeking_King', avatar: '🎯', baseXP: 120 },
  { name: 'Nami_Navigator', avatar: '🗺️', baseXP: 95 },
  { name: 'Brook_Yohoho', avatar: '💀', baseXP: 110 },
];

const DAILY_CHALLENGES_POOL = [
  { id: 1, desc: 'Assista 3 episódios hoje', target: 3, reward: 50, type: 'watch' },
  { id: 2, desc: 'Complete um quiz sem errar', target: 1, reward: 80, type: 'perfect_quiz' },
  { id: 3, desc: 'Assista 5 episódios hoje', target: 5, reward: 100, type: 'watch' },
  { id: 4, desc: 'Complete 2 quizzes', target: 2, reward: 60, type: 'quiz' },
  { id: 5, desc: 'Marque 10 episódios no total', target: 10, reward: 120, type: 'watch' },
  { id: 6, desc: 'Ganhe 200 XP hoje', target: 200, reward: 70, type: 'xp' },
  { id: 7, desc: 'Assista 1 episódio essencial', target: 1, reward: 30, type: 'essential' },
  { id: 8, desc: 'Complete um arco inteiro', target: 1, reward: 150, type: 'arc' },
];

export function useGameFeatures(state: GameState, onUpdate: (s: GameState) => void) {

  // ─── STREAK ───────────────────────────────────────────────
  const checkAndUpdateStreak = useCallback(() => {
    const today = new Date().toDateString();
    if (state.lastActiveDate === today) return state;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let newStreak = state.streak;
    let newFreeze = state.streakFreeze;

    if (state.lastActiveDate === yesterday) {
      newStreak = state.streak + 1;
    } else if (state.lastActiveDate !== today) {
      if (state.streakFreeze) {
        newFreeze = false; // usa o congelamento
      } else {
        newStreak = 0;
      }
    }

    const updated = { ...state, streak: newStreak, lastActiveDate: today, streakFreeze: newFreeze };
    onUpdate(updated);
    return updated;
  }, [state, onUpdate]);

  // ─── XP ───────────────────────────────────────────────────
  const addXP = useCallback((amount: number) => {
    let multiplied = amount;
    if (state.xpMultiplier.active && state.xpMultiplier.expiresAt) {
      if (Date.now() < state.xpMultiplier.expiresAt) {
        multiplied = amount * 2;
      }
    }
    const newXP = state.xp + multiplied;
    const newLevel = Math.floor(newXP / 200) + 1;
    const newBounty = Math.floor(newXP * 1.5);
    const newWeeklyXP = state.weeklyXP + multiplied;
    onUpdate({ ...state, xp: newXP, level: newLevel, bountyBerries: newBounty, weeklyXP: newWeeklyXP });
  }, [state, onUpdate]);

  // ─── DAILY CHALLENGES ────────────────────────────────────
  const generateDailyChallenges = useCallback(() => {
    const today = new Date().toDateString();
    if (state.lastChallengeDate === today) return state.dailyChallengesStatus;

    const shuffled = [...DAILY_CHALLENGES_POOL].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, 3).map(c => ({
      ...c, current: 0, done: false,
    }));
    const updated = { ...state, dailyChallengesStatus: picked, lastChallengeDate: today };
    onUpdate(updated);
    return picked;
  }, [state, onUpdate]);

  const progressChallenge = useCallback((type: string, amount = 1) => {
    const challenges = state.dailyChallengesStatus.map(c => {
      if (c.done) return c;
      const matches =
        (type === 'watch' && (c.type === 'watch' || c.type === 'essential')) ||
        (type === c.type);
      if (!matches) return c;
      const newCurrent = Math.min(c.current + amount, c.target);
      const done = newCurrent >= c.target;
      if (done && !c.done) {
        // recompensa
        setTimeout(() => addXP(c.reward), 100);
      }
      return { ...c, current: newCurrent, done };
    });
    onUpdate({ ...state, dailyChallengesStatus: challenges });
  }, [state, onUpdate, addXP]);

  // ─── LEAGUE BOTS ─────────────────────────────────────────
  const getLeagueBots = useCallback(() => {
    return LEAGUE_BOTS.map(bot => {
      const variance = Math.floor(Math.random() * 40) - 20;
      const targetXP = Math.max(10, state.weeklyXP + bot.baseXP + variance - 60);
      return { ...bot, xp: targetXP };
    }).sort((a, b) => b.xp - a.xp);
  }, [state.weeklyXP]);

  // ─── WEEKLY RESET ─────────────────────────────────────────
  const checkWeeklyReset = useCallback(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const lastReset = state.lastWeekReset ? new Date(state.lastWeekReset) : null;
    const weekAgo = new Date(Date.now() - 7 * 86400000);
    if (!lastReset || lastReset < weekAgo) {
      onUpdate({ ...state, weeklyXP: 0, lastWeekReset: now.toISOString() });
    }
  }, [state, onUpdate]);

  // ─── WRONG QUESTIONS ─────────────────────────────────────
  const saveWrongQuestion = useCallback((arcId: string, q: string, opts: string[], correct: number) => {
    const already = state.wrongQuestions.find(w => w.arcId === arcId && w.q === q);
    if (already) return;
    const updated = [...state.wrongQuestions, { arcId, q, opts, correct }];
    onUpdate({ ...state, wrongQuestions: updated.slice(-50) }); // máx 50
  }, [state, onUpdate]);

  const removeWrongQuestion = useCallback((q: string) => {
    const updated = state.wrongQuestions.filter(w => w.q !== q);
    onUpdate({ ...state, wrongQuestions: updated });
  }, [state, onUpdate]);

  // ─── SHOP ─────────────────────────────────────────────────
  const purchaseItem = useCallback((itemId: string): { success: boolean; message: string } => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return { success: false, message: 'Item não encontrado.' };
    if (state.xp < item.cost) return { success: false, message: `XP insuficiente! Precisa de ${item.cost} XP.` };

    let updated = { ...state, xp: state.xp - item.cost };

    if (item.type === 'skin') {
      if (state.unlockedSkins.includes(item.id as SkinId)) {
        updated = { ...updated, currentSkin: item.id as SkinId };
      } else {
        updated = {
          ...updated,
          unlockedSkins: [...state.unlockedSkins, item.id as SkinId],
          currentSkin: item.id as SkinId,
        };
      }
    } else if (item.type === 'theme') {
      updated = { ...updated, currentTheme: item.id as ThemeId };
    } else if (item.type === 'title') {
      const titleMap: Record<string, TitleId> = {
        'title-supernova': 'Supernova',
        'title-shichibukai': 'Shichibukai',
        'title-yonkou': 'Yonkou',
      };
      const title = titleMap[item.id];
      if (title) {
        if (!state.unlockedTitles.includes(title)) {
          updated = { ...updated, unlockedTitles: [...state.unlockedTitles, title] };
        }
        updated = { ...updated, currentTitle: title };
      }
    } else if (item.id === 'streak-freeze') {
      updated = { ...updated, streakFreeze: true };
    } else if (item.id === 'xp-double') {
      updated = {
        ...updated,
        xpMultiplier: { active: true, expiresAt: Date.now() + 15 * 60 * 1000 },
      };
    }

    onUpdate(updated);
    return { success: true, message: `${item.name} adquirido!` };
  }, [state, onUpdate]);

  const equipSkin = useCallback((skin: SkinId) => {
    if (state.unlockedSkins.includes(skin)) {
      onUpdate({ ...state, currentSkin: skin });
    }
  }, [state, onUpdate]);

  const equipTitle = useCallback((title: TitleId) => {
    if (state.unlockedTitles.includes(title)) {
      onUpdate({ ...state, currentTitle: title });
    }
  }, [state, onUpdate]);

  // ─── PIRATE WAGER ─────────────────────────────────────────
  const activateWager = useCallback(() => {
    if (state.xp < 50) return { success: false, message: 'XP insuficiente para apostar! (50 XP)' };
    onUpdate({ ...state, xp: state.xp - 50, pirateWager: { active: true, amount: 50 } });
    return { success: true, message: 'Aposta ativada! Gabarite o quiz para dobrar!' };
  }, [state, onUpdate]);

  const resolveWager = useCallback((won: boolean) => {
    if (!state.pirateWager.active) return;
    const bonus = won ? state.pirateWager.amount * 2 : 0;
    onUpdate({
      ...state,
      xp: state.xp + bonus,
      pirateWager: { active: false, amount: 0 },
    });
  }, [state, onUpdate]);

  // ─── FISHING MINIGAME ─────────────────────────────────────
  const FISH_COOLDOWN = 60 * 1000; // 1 minuto

  const canFish = useCallback(() => {
    return Date.now() - state.lastFishTime >= FISH_COOLDOWN;
  }, [state.lastFishTime]);

  const fish = useCallback((): { xpGained: number; message: string } | null => {
    if (!canFish()) return null;
    const catches = [
      { xp: 1, msg: 'Pescou um peixinho pequeno! +1 XP 🐟' },
      { xp: 2, msg: 'Um peixe médio! +2 XP 🐠' },
      { xp: 3, msg: 'Peixe grande! +3 XP 🐡' },
      { xp: 5, msg: 'PEIXE ÉPICO! +5 XP 🦈' },
      { xp: 0, msg: 'Não pescou nada... Tente de novo! 🎣' },
    ];
    const weights = [30, 30, 25, 10, 5];
    let rand = Math.random() * 100;
    let idx = 0;
    for (let i = 0; i < weights.length; i++) {
      rand -= weights[i];
      if (rand <= 0) { idx = i; break; }
    }
    const result = catches[idx];
    onUpdate({ ...state, xp: state.xp + result.xp, lastFishTime: Date.now() });
    return { xpGained: result.xp, message: result.msg };
  }, [state, onUpdate, canFish]);

  // ─── TODAY WATCHED ────────────────────────────────────────
  const markEpWatched = useCallback((arcId: string, ep: number, xpAmount: number) => {
    const today = new Date().toDateString();
    const arcWatched = state.watchedEps[arcId] || [];
    if (arcWatched.includes(ep)) return;

    const newWatched = { ...state.watchedEps, [arcId]: [...arcWatched, ep] };
    const todayCount = state.lastWatchDate === today ? state.todayWatched + 1 : 1;

    let newXP = state.xp + xpAmount;
    if (state.xpMultiplier.active && state.xpMultiplier.expiresAt && Date.now() < state.xpMultiplier.expiresAt) {
      newXP = state.xp + xpAmount * 2;
    }

    const updated = {
      ...state,
      watchedEps: newWatched,
      xp: newXP,
      level: Math.floor(newXP / 200) + 1,
      bountyBerries: Math.floor(newXP * 1.5),
      lastActiveDate: today,
      lastWatchDate: today,
      todayWatched: todayCount,
      weeklyXP: state.weeklyXP + xpAmount,
    };
    onUpdate(updated);
    progressChallenge('watch');
  }, [state, onUpdate, progressChallenge]);

  return {
    checkAndUpdateStreak,
    addXP,
    generateDailyChallenges,
    progressChallenge,
    getLeagueBots,
    checkWeeklyReset,
    saveWrongQuestion,
    removeWrongQuestion,
    purchaseItem,
    equipSkin,
    equipTitle,
    activateWager,
    resolveWager,
    canFish,
    fish,
    markEpWatched,
    SHOP_ITEMS,
  };
}
