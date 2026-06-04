import { useState } from "react";

const ADMIN_PASSWORD = "nakama123";

const SKINS = [
  { id: "default", name: "Default", icon: "🐱" },
  { id: "straw-hat", name: "Chapéu de Palha", icon: "🎩" },
  { id: "chopper-hat", name: "Chapéu do Chopper", icon: "🩺" },
  { id: "gear-5", name: "Gear 5", icon: "☁️" },
];

const THEMES = [
  { id: "classic", name: "Classic", color: "#f0a500" },
  { id: "wano-sakura", name: "Wano Sakura", color: "#ff69b4" },
  { id: "blackbeard-dark", name: "Barba Negra", color: "#8b0000" },
  { id: "marine-blue", name: "Marinha Azul", color: "#00bfff" },
];

const TITLES = ["Recruta", "Supernova", "Shichibukai", "Yonkou", "Rei dos Piratas"];

const ARCS = [
  { id: "romance-dawn", name: "Romance Dawn" },
  { id: "orange-town", name: "Orange Town" },
  { id: "syrup-village", name: "Syrup Village" },
  { id: "baratie", name: "Baratie" },
  { id: "arlong-park", name: "Arlong Park" },
  { id: "loguetown", name: "Loguetown" },
  { id: "alabasta", name: "Alabasta" },
  { id: "skypiea", name: "Skypiea" },
  { id: "water-7", name: "Water 7" },
  { id: "enies-lobby", name: "Enies Lobby" },
  { id: "thriller-bark", name: "Thriller Bark" },
  { id: "sabaody", name: "Sabaody" },
  { id: "marineford", name: "Marineford" },
  { id: "fishman-island", name: "Fishman Island" },
  { id: "punk-hazard", name: "Punk Hazard" },
  { id: "dressrosa", name: "Dressrosa" },
  { id: "zou", name: "Zou" },
  { id: "whole-cake-island", name: "Whole Cake Island" },
  { id: "wano", name: "Wano" },
];

interface Props {
  state: any;
  onUpdate: (s: any) => void;
  onClose: () => void;
}

export default function AdminPanel({ state, onUpdate, onClose }: Props) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [activeTab, setActiveTab] = useState("xp");
  const [xpAmount, setXpAmount] = useState(100);
  const [notif, setNotif] = useState<{ msg: string; ok: boolean } | null>(null);

  const showNotif = (msg: string, ok = true) => {
    setNotif({ msg, ok });
    setTimeout(() => setNotif(null), 2500);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { setAuthed(true); setWrongPass(false); }
    else setWrongPass(true);
  };

  const addXP = (amount: number) => {
    const newXP = Math.max(0, state.xp + amount);
    onUpdate({ ...state, xp: newXP, level: Math.floor(newXP / 200) + 1, bountyBerries: Math.floor(newXP * 1.5) });
    showNotif(`${amount > 0 ? "+" : ""}${amount} XP aplicado! Total: ${newXP} XP`);
  };

  const setLevel = (level: number) => {
    const newXP = (level - 1) * 200;
    onUpdate({ ...state, xp: newXP, level });
    showNotif(`Nível definido para ${level}!`);
  };

  const equipSkin = (skinId: string) => {
    const unlocked = [...new Set([...(state.unlockedSkins || ["default"]), skinId])];
    onUpdate({ ...state, currentSkin: skinId, unlockedSkins: unlocked });
    showNotif(`Skin "${skinId}" equipada!`);
  };

  const unlockAllSkins = () => {
    const all = SKINS.map(s => s.id);
    onUpdate({ ...state, unlockedSkins: all, currentSkin: state.currentSkin });
    showNotif("Todas as skins desbloqueadas!");
  };

  const setTheme = (themeId: string) => {
    onUpdate({ ...state, currentTheme: themeId });
    showNotif(`Tema "${themeId}" aplicado!`);
  };

  const setTitle = (title: string) => {
    const unlocked = [...new Set([...(state.unlockedTitles || ["Recruta"]), title])];
    onUpdate({ ...state, currentTitle: title, unlockedTitles: unlocked });
    showNotif(`Título "${title}" equipado!`);
  };

  const setStreak = (n: number) => {
    onUpdate({ ...state, streak: n, maxStreak: Math.max(state.maxStreak || 0, n) });
    showNotif(`Streak definido para ${n} dias!`);
  };

  const unlockArc = (arcId: string) => {
    const unlocked = [...new Set([...(state.unlockedArcs || ["romance-dawn"]), arcId])];
    onUpdate({ ...state, unlockedArcs: unlocked });
    showNotif(`Arco "${arcId}" desbloqueado!`);
  };

  const completeArc = (arcId: string) => {
    const idx = ARCS.findIndex(a => a.id === arcId);
    const nextArc = ARCS[idx + 1]?.id;
    const completed = [...new Set([...(state.completedArcs || []), arcId])];
    const unlocked = [...new Set([...(state.unlockedArcs || []), arcId, ...(nextArc ? [nextArc] : [])])];
    onUpdate({ ...state, completedArcs: completed, unlockedArcs: unlocked });
    showNotif(`Arco "${arcId}" marcado como completo!`);
  };

  const resetAll = () => {
    if (!confirm("Tem certeza? Isso apaga TODO o progresso!")) return;
    localStorage.removeItem("op-tracker-v2");
    window.location.reload();
  };

  const resetDiagnostic = () => {
    onUpdate({ ...state, diagnosticDone: false, completedArcs: [], unlockedArcs: ["romance-dawn"] });
    showNotif("Diagnóstico resetado! Vai aparecer na próxima vez.");
  };

  // LOGIN SCREEN
  if (!authed) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(5,10,20,0.98)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif" }}>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "24px", border: "2px solid rgba(240,165,0,0.3)", padding: "32px", width: "100%", maxWidth: "340px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔐</div>
          <div style={{ fontFamily: "Cinzel, serif", color: "#f0a500", fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>Painel Admin</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "24px" }}>Acesso restrito ao capitão!</div>
          <input
            type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Senha secreta..."
            style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: `2px solid ${wrongPass ? "#c0392b" : "rgba(240,165,0,0.3)"}`, background: "rgba(255,255,255,0.05)", color: "white", fontSize: "16px", outline: "none", marginBottom: "12px", boxSizing: "border-box", fontFamily: "Nunito, sans-serif" }}
          />
          {wrongPass && <div style={{ color: "#e74c3c", fontSize: "13px", marginBottom: "12px" }}>Senha errada! Tente novamente.</div>}
          <button onClick={handleLogin} style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "linear-gradient(135deg,#f0a500,#ffd700)", color: "#0a1628", border: "none", cursor: "pointer", fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "16px", marginBottom: "12px" }}>
            Entrar
          </button>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "13px" }}>Cancelar</button>
          <div style={{ marginTop: "16px", color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>Dica: nakama123</div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "xp", label: "⭐ XP" },
    { id: "skins", label: "🐱 Skins" },
    { id: "themes", label: "🎨 Temas" },
    { id: "titles", label: "👑 Títulos" },
    { id: "arcs", label: "🗺️ Arcos" },
    { id: "danger", label: "⚠️ Reset" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(5,10,20,0.98)", display: "flex", flexDirection: "column", fontFamily: "Nunito, sans-serif" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {notif && (
        <div style={{ position: "fixed", top: "16px", left: "50%", transform: "translateX(-50%)", zIndex: 2000, background: notif.ok ? "linear-gradient(135deg,#1abc9c,#2ecc71)" : "linear-gradient(135deg,#c0392b,#e74c3c)", color: "white", padding: "10px 24px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", animation: "fadeIn 0.3s ease", whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          {notif.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ background: "rgba(10,22,40,0.98)", borderBottom: "2px solid rgba(240,165,0,0.2)", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🛠️</span>
          <div>
            <div style={{ fontFamily: "Cinzel, serif", color: "#f0a500", fontWeight: 700, fontSize: "16px" }}>Painel Admin</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>XP: {state.xp} • Nv: {state.level} • Skin: {state.currentSkin}</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "16px" }}>✕</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,22,40,0.5)", flexShrink: 0, padding: "0 8px" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "12px 14px", background: "none", border: "none", cursor: "pointer", color: activeTab === t.id ? "#f0a500" : "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: "13px", borderBottom: activeTab === t.id ? "2px solid #f0a500" : "2px solid transparent", whiteSpace: "nowrap", fontFamily: "Nunito, sans-serif" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>

        {/* XP TAB */}
        {activeTab === "xp" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "rgba(240,165,0,0.08)", borderRadius: "20px", border: "1px solid rgba(240,165,0,0.2)", padding: "20px", marginBottom: "16px", textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "4px" }}>XP Atual</div>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: "48px", fontWeight: 900, color: "#f0a500" }}>{state.xp}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Nível {state.level} • {state.xp % 200}/200 para próximo nível</div>
            </div>

            {/* XP rápido */}
            <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "8px" }}>ADICIONAR XP RÁPIDO</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "16px" }}>
              {[10, 50, 100, 200, 500, 1000].map(v => (
                <button key={v} onClick={() => addXP(v)} style={{ padding: "12px", borderRadius: "14px", border: "1px solid rgba(240,165,0,0.2)", background: "rgba(240,165,0,0.06)", cursor: "pointer", color: "#f0a500", fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "14px", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(240,165,0,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(240,165,0,0.06)"}
                >
                  +{v}
                </button>
              ))}
            </div>

            {/* XP custom */}
            <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "8px" }}>VALOR CUSTOMIZADO</div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input type="number" value={xpAmount} onChange={e => setXpAmount(Number(e.target.value))} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(240,165,0,0.3)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "16px", outline: "none", fontFamily: "Nunito, sans-serif" }} />
              <button onClick={() => addXP(xpAmount)} style={{ padding: "12px 20px", borderRadius: "12px", background: "linear-gradient(135deg,#f0a500,#ffd700)", color: "#0a1628", border: "none", cursor: "pointer", fontWeight: 700, fontFamily: "Cinzel, serif" }}>+XP</button>
              <button onClick={() => addXP(-xpAmount)} style={{ padding: "12px 20px", borderRadius: "12px", background: "rgba(192,57,43,0.2)", color: "#e74c3c", border: "1px solid rgba(192,57,43,0.3)", cursor: "pointer", fontWeight: 700, fontFamily: "Cinzel, serif" }}>-XP</button>
            </div>

            {/* Nível direto */}
            <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "8px" }}>IR DIRETO PARA O NÍVEL</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "16px" }}>
              {[1, 5, 10, 20, 35, 51].map(lv => (
                <button key={lv} onClick={() => setLevel(lv)} style={{ padding: "10px", borderRadius: "12px", border: `1px solid ${state.level === lv ? "#f0a500" : "rgba(255,255,255,0.1)"}`, background: state.level === lv ? "rgba(240,165,0,0.15)" : "rgba(255,255,255,0.03)", cursor: "pointer", color: state.level === lv ? "#f0a500" : "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "13px", fontFamily: "Cinzel, serif" }}>
                  Nv.{lv}
                </button>
              ))}
            </div>

            {/* Streak */}
            <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "8px" }}>STREAK ATUAL: {state.streak} dias</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }}>
              {[0, 3, 7, 30].map(n => (
                <button key={n} onClick={() => setStreak(n)} style={{ padding: "10px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "13px" }}>
                  🔥 {n}d
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SKINS TAB */}
        {activeTab === "skins" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <button onClick={unlockAllSkins} style={{ width: "100%", padding: "12px", borderRadius: "14px", background: "linear-gradient(135deg,#f0a500,#ffd700)", color: "#0a1628", border: "none", cursor: "pointer", fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "14px", marginBottom: "16px" }}>
              🎁 Desbloquear Todas as Skins
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {SKINS.map(skin => {
                const isEquipped = state.currentSkin === skin.id;
                const isOwned = (state.unlockedSkins || []).includes(skin.id);
                return (
                  <div key={skin.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px", borderRadius: "16px", background: isEquipped ? "rgba(240,165,0,0.1)" : "rgba(255,255,255,0.03)", border: `2px solid ${isEquipped ? "#f0a500" : "rgba(255,255,255,0.06)"}` }}>
                    <div style={{ fontSize: "36px" }}>{skin.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: isEquipped ? "#f0a500" : "white", fontWeight: 700, fontSize: "15px" }}>{skin.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{isEquipped ? "✓ Equipada" : isOwned ? "Desbloqueada" : "Bloqueada"}</div>
                    </div>
                    <button onClick={() => equipSkin(skin.id)} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", cursor: "pointer", background: isEquipped ? "rgba(240,165,0,0.2)" : "linear-gradient(135deg,#f0a500,#ffd700)", color: isEquipped ? "#f0a500" : "#0a1628", fontWeight: 700, fontSize: "13px", fontFamily: "Nunito, sans-serif" }}>
                      {isEquipped ? "Equipada" : "Equipar"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* THEMES TAB */}
        {activeTab === "themes" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "16px" }}>Tema atual: <strong style={{ color: "#f0a500" }}>{state.currentTheme || "classic"}</strong></div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {THEMES.map(theme => {
                const isActive = (state.currentTheme || "classic") === theme.id;
                return (
                  <div key={theme.id} onClick={() => setTheme(theme.id)} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px", borderRadius: "16px", background: isActive ? `${theme.color}15` : "rgba(255,255,255,0.03)", border: `2px solid ${isActive ? theme.color : "rgba(255,255,255,0.06)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: theme.color, boxShadow: `0 0 12px ${theme.color}60` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: isActive ? theme.color : "white", fontWeight: 700, fontSize: "15px" }}>{theme.name}</div>
                      {isActive && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>✓ Ativo</div>}
                    </div>
                    {isActive && <span style={{ color: theme.color, fontSize: "20px" }}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TITLES TAB */}
        {activeTab === "titles" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "16px" }}>Título atual: <strong style={{ color: "#f0a500" }}>{state.currentTitle || "Recruta"}</strong></div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {TITLES.map(title => {
                const isActive = state.currentTitle === title;
                return (
                  <button key={title} onClick={() => setTitle(title)} style={{ padding: "16px", borderRadius: "16px", border: `2px solid ${isActive ? "#f0a500" : "rgba(255,255,255,0.06)"}`, background: isActive ? "rgba(240,165,0,0.1)" : "rgba(255,255,255,0.03)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", color: isActive ? "#f0a500" : "white", fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "15px", transition: "all 0.2s" }}>
                    <span>{title}</span>
                    {isActive && <span>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ARCS TAB */}
        {activeTab === "arcs" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
              <button onClick={() => { const all = ARCS.map(a => a.id); onUpdate({ ...state, unlockedArcs: all }); showNotif("Todos os arcos desbloqueados!"); }} style={{ padding: "12px", borderRadius: "12px", background: "rgba(26,188,156,0.1)", border: "1px solid rgba(26,188,156,0.3)", color: "#1abc9c", cursor: "pointer", fontWeight: 700, fontSize: "13px" }}>
                🔓 Desbloquear Todos
              </button>
              <button onClick={() => { const all = ARCS.map(a => a.id); onUpdate({ ...state, completedArcs: all, unlockedArcs: all }); showNotif("Todos os arcos completados!"); }} style={{ padding: "12px", borderRadius: "12px", background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.3)", color: "#f0a500", cursor: "pointer", fontWeight: 700, fontSize: "13px" }}>
                ✅ Completar Todos
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {ARCS.map(arc => {
                const isCompleted = (state.completedArcs || []).includes(arc.id);
                const isUnlocked = (state.unlockedArcs || []).includes(arc.id);
                return (
                  <div key={arc.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", borderRadius: "14px", background: isCompleted ? "rgba(26,188,156,0.06)" : isUnlocked ? "rgba(240,165,0,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${isCompleted ? "rgba(26,188,156,0.2)" : isUnlocked ? "rgba(240,165,0,0.2)" : "rgba(255,255,255,0.05)"}` }}>
                    <div style={{ fontSize: "18px" }}>{isCompleted ? "✅" : isUnlocked ? "⚓" : "🔒"}</div>
                    <div style={{ flex: 1, color: isCompleted ? "#1abc9c" : isUnlocked ? "#f0a500" : "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: "14px" }}>{arc.name}</div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {!isUnlocked && (
                        <button onClick={() => unlockArc(arc.id)} style={{ padding: "6px 10px", borderRadius: "8px", background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.3)", color: "#f0a500", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}>
                          Unlock
                        </button>
                      )}
                      {!isCompleted && isUnlocked && (
                        <button onClick={() => completeArc(arc.id)} style={{ padding: "6px 10px", borderRadius: "8px", background: "rgba(26,188,156,0.1)", border: "1px solid rgba(26,188,156,0.3)", color: "#1abc9c", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}>
                          Completar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DANGER TAB */}
        {activeTab === "danger" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "rgba(192,57,43,0.08)", borderRadius: "20px", border: "2px solid rgba(192,57,43,0.2)", padding: "20px", marginBottom: "16px" }}>
              <div style={{ color: "#e74c3c", fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "16px", marginBottom: "16px" }}>⚠️ Zona de Perigo</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button onClick={resetDiagnostic} style={{ padding: "14px", borderRadius: "14px", background: "rgba(255,165,0,0.1)", border: "1px solid rgba(255,165,0,0.3)", color: "#f0a500", cursor: "pointer", fontWeight: 700, fontSize: "14px", fontFamily: "Nunito, sans-serif" }}>
                  🧭 Resetar Quiz de Diagnóstico
                </button>
                <button onClick={() => { onUpdate({ ...state, streak: 0, dailyEpsToday: 0, lastCheckin: null }); showNotif("Progresso diário resetado!"); }} style={{ padding: "14px", borderRadius: "14px", background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.2)", color: "#e74c3c", cursor: "pointer", fontWeight: 700, fontSize: "14px", fontFamily: "Nunito, sans-serif" }}>
                  🔥 Resetar Streak e Diário
                </button>
                <button onClick={() => { onUpdate({ ...state, watchedEps: [], completedArcs: [], unlockedArcs: ["romance-dawn"], xp: 0, level: 1 }); showNotif("Progresso de episódios resetado!"); }} style={{ padding: "14px", borderRadius: "14px", background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.2)", color: "#e74c3c", cursor: "pointer", fontWeight: 700, fontSize: "14px", fontFamily: "Nunito, sans-serif" }}>
                  📺 Resetar Episódios e Arcos
                </button>
                <button onClick={resetAll} style={{ padding: "14px", borderRadius: "14px", background: "rgba(192,57,43,0.2)", border: "2px solid rgba(192,57,43,0.5)", color: "#e74c3c", cursor: "pointer", fontWeight: 700, fontSize: "14px", fontFamily: "Cinzel, serif" }}>
                  💀 RESET TOTAL — Apagar Tudo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
