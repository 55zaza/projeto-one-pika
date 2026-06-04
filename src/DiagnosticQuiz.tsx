import { useState } from "react";

// ============================================================
// QUIZ DE DIAGNÓSTICO — Onde começar em One Piece
// ============================================================

interface DiagnosticResult {
  arcId: string;
  arcName: string;
  startEp: number;
  level: string;
  coveredArcs: string[];
  reason: string;
  hype: string;
  tip: string;
}

const DIAGNOSTIC_STEPS = [
  // PASSO 1 — Perfil inicial
  {
    id: "profile",
    type: "single",
    question: "Qual é sua situação com One Piece?",
    subtitle: "Seja honesto — o app vai personalizar tudo pra você!",
    icon: "🏴‍☠️",
    options: [
      { id: "never", label: "Nunca assisti nada", icon: "🌊", sub: "Sou um completo novato" },
      { id: "liveaction", label: "Vi o Live Action da Netflix", icon: "🎬", sub: "Vi a adaptação, não o anime" },
      { id: "few", label: "Vi alguns eps soltos", icon: "📺", sub: "Aqui e ali, sem sequência" },
      { id: "stopped", label: "Comecei mas parei", icon: "⏸️", sub: "Travei em algum ponto" },
      { id: "partial", label: "Já assisti bastante", icon: "⚓", sub: "Mas não sei onde parei" },
    ],
  },
];

const SCENE_QUESTIONS = [
  {
    id: "shanks",
    question: "Você reconhece essa cena?",
    scene: "🍶 Um homem ruivo de chapéu de palha bebe sake com um menino numa taverna e diz: 'Este chapéu é meu tesouro — devolva quando se tornar um grande pirata.'",
    arc: "romance-dawn",
    ep: 1,
    yesPoints: 1,
  },
  {
    id: "zoro-promise",
    question: "E essa cena você já viu?",
    scene: "⚔️ Um espadachim de cabelo verde está amarrado a um poste no sol escaldante. Quando libertado, ele diz: 'Nada aconteceu.' — e está coberto de sangue.",
    arc: "thriller-bark",
    ep: 377,
    yesPoints: 8,
  },
  {
    id: "nami-help",
    question: "Essa cena te é familiar?",
    scene: "🎩 Uma garota de cabelo laranja corre até um jovem de chapéu de palha, cai de joelhos e implora com lágrimas nos olhos: 'Por favor... me ajude!'",
    arc: "arlong-park",
    ep: 37,
    yesPoints: 3,
  },
  {
    id: "robin-live",
    question: "Você já assistiu essa cena?",
    scene: "🌸 Uma mulher de cabelo escuro, rodeada por soldados do governo, grita com toda a força: 'EU QUERO VIVER!'",
    arc: "enies-lobby",
    ep: 263,
    yesPoints: 6,
  },
  {
    id: "gear2",
    question: "E essa aqui?",
    scene: "💨 Luffy bomba o sangue pelo corpo, seu braço emite vapor, e ele diz: 'Gear... Second!' — antes de desaparecer em velocidade impossível.",
    arc: "enies-lobby",
    ep: 302,
    yesPoints: 6,
  },
  {
    id: "ace-death",
    question: "Essa cena você conhece?",
    scene: "🔥 Um homem de chapéu de cangaceiro com tatuagem nas costas cai nos braços de Luffy em meio a uma guerra. O mundo para. Luffy chora.",
    arc: "marineford",
    ep: 483,
    yesPoints: 10,
  },
  {
    id: "gear5",
    question: "E a mais recente — você já viu?",
    scene: "☁️ Luffy ri de forma absurda, seu cabelo fica branco, nuvens de fumaça surgem ao redor — e ele estica o inimigo como se fosse uma marionete de borracha.",
    arc: "wano",
    ep: 1071,
    yesPoints: 15,
  },
];

const ARC_CONFIRMATIONS = [
  { id: "alabasta", name: "Alabasta", icon: "🏜️", ep: 92, question: "Você chegou a ver a saga de Alabasta — o reino do deserto com a princesa Vivi e o vilão Crocodile?" },
  { id: "enies-lobby", name: "Enies Lobby", icon: "⚖️", ep: 264, question: "Você assistiu Enies Lobby — onde a tripulação invade o governo pra salvar Robin?" },
  { id: "marineford", name: "Marineford", icon: "⚔️", ep: 457, question: "Você viu a Guerra de Marineford — a maior batalha da história de One Piece?" },
  { id: "dressrosa", name: "Dressrosa", icon: "🌹", ep: 629, question: "Você viu Dressrosa — com Doflamingo e o Gear Fourth de Luffy?" },
  { id: "wano", name: "Wano", icon: "🏯", ep: 890, question: "Você chegou a ver Wano — o arco dos samurais com o Gear 5?" },
];

const RESULT_MAP: Record<number, DiagnosticResult> = {
  0: {
    arcId: "romance-dawn", arcName: "Romance Dawn", startEp: 1, level: "Novato Absoluto",
    coveredArcs: [],
    reason: "Você não viu nada ainda — e isso é INCRÍVEL! Você vai viver tudo pela primeira vez.",
    hype: "Prepare-se para a maior aventura da sua vida. O episódio 1 vai te prender imediatamente.",
    tip: "Assista pelo menos até o ep 45 (Arlong Park) antes de desistir. A série decola rápido!",
  },
  1: {
    arcId: "romance-dawn", arcName: "Romance Dawn", startEp: 1, level: "Live Action Fan",
    coveredArcs: ["romance-dawn", "orange-town", "syrup-village", "baratie", "arlong-park"],
    reason: "O Live Action cobriu os arcos da East Blue (eps 1-53) de forma resumida. Você já conhece os personagens mas perdeu muita coisa boa!",
    hype: "Recomendamos começar do ep 1 mesmo — o anime tem uma profundidade emocional que o Live Action não capturou. Mas se quiser pular, vá para Alabasta (ep 92).",
    tip: "O arco de Arlong Park no anime (eps 31-45) é muito mais intenso que no Live Action. Vale assistir!",
  },
  3: {
    arcId: "arlong-park", arcName: "Arlong Park", startEp: 31, level: "Iniciante",
    coveredArcs: ["romance-dawn", "orange-town", "syrup-village"],
    reason: "Você viu o começo mas ainda não chegou nos melhores momentos da East Blue.",
    hype: "Arlong Park (eps 31-45) é onde One Piece mostra seu verdadeiro potencial pela primeira vez. Não pule!",
    tip: "Se já viu os eps 1-30, vá direto pro 31. A saga de Nami vai te destruir emocionalmente.",
  },
  6: {
    arcId: "alabasta", arcName: "Alabasta", startEp: 92, level: "Pirata Iniciante",
    coveredArcs: ["romance-dawn", "orange-town", "syrup-village", "baratie", "arlong-park", "loguetown"],
    reason: "Você completou a East Blue — a melhor saga de introdução do anime. Agora começa o Grand Line!",
    hype: "Alabasta é onde One Piece escala. Um reino inteiro em jogo, um vilão brilhante e uma princesa guerreira.",
    tip: "Pule os eps 62-91 (muito filler). Comece direto no ep 92 com a saga de Alabasta.",
  },
  8: {
    arcId: "water-7", arcName: "Water 7", startEp: 229, level: "Capitão",
    coveredArcs: ["romance-dawn", "orange-town", "syrup-village", "baratie", "arlong-park", "loguetown", "alabasta", "skypiea"],
    reason: "Você já passou pelo Grand Line inicial e está pronto para a melhor dupla de arcos da série.",
    hype: "Water 7 e Enies Lobby juntos são considerados o pico absoluto de One Piece. Prepare os lenços.",
    tip: "Assista Water 7 e Enies Lobby sem parar — são arcos conectados que formam uma história única.",
  },
  10: {
    arcId: "sabaody", arcName: "Sabaody", startEp: 385, level: "Supernova",
    coveredArcs: ["romance-dawn","orange-town","syrup-village","baratie","arlong-park","loguetown","alabasta","skypiea","water-7","enies-lobby","thriller-bark"],
    reason: "Você completou a primeira metade de One Piece — Sabaody é o portal pro New World.",
    hype: "Sabaody + Marineford formam a maior virada de roteiro da série. O que vem a seguir vai te chocar.",
    tip: "Não pule os eps de Amazon Lily e Impel Down — são essenciais para Marineford fazer sentido.",
  },
  13: {
    arcId: "fishman-island", arcName: "Fishman Island", startEp: 517, level: "Veterano de Guerra",
    coveredArcs: ["romance-dawn","orange-town","syrup-village","baratie","arlong-park","loguetown","alabasta","skypiea","water-7","enies-lobby","thriller-bark","sabaody","marineford"],
    reason: "Você sobreviveu à Guerra de Marineford — um dos momentos mais devastadores da série.",
    hype: "O timeskip chegou. A tripulação está de volta, mais forte, mais madura. O New World aguarda.",
    tip: "Fishman Island é uma transição — importante para a lore mas mais lenta. Punk Hazard logo em seguida vale!",
  },
  15: {
    arcId: "dressrosa", arcName: "Dressrosa", startEp: 629, level: "Yonkou",
    coveredArcs: ["romance-dawn","orange-town","syrup-village","baratie","arlong-park","loguetown","alabasta","skypiea","water-7","enies-lobby","thriller-bark","sabaody","marineford","fishman-island","punk-hazard"],
    reason: "Você está no New World! Dressrosa é onde Gear Fourth muda tudo.",
    hype: "Doflamingo é um dos vilões mais carismáticos da série. E Gear Fourth vai te deixar sem fôlego.",
    tip: "Dressrosa é longo (118 eps) mas vale cada segundo. Wano logo depois é ainda mais épico.",
  },
  20: {
    arcId: "wano", arcName: "Wano", startEp: 890, level: "Imperador do Mar",
    coveredArcs: ["romance-dawn","orange-town","syrup-village","baratie","arlong-park","loguetown","alabasta","skypiea","water-7","enies-lobby","thriller-bark","sabaody","marineford","fishman-island","punk-hazard","dressrosa","zou","whole-cake-island"],
    reason: "Você está quase no topo! Wano é One Piece no seu absoluto auge.",
    hype: "Gear 5 (ep 1071) é o episódio mais aguardado da história da série. Você vai entender quando chegar lá.",
    tip: "Wano tem alguns eps mais lentos no início mas a partir do ep 1000 é não-para-mais.",
  },
};

function getResult(points: number, profile: string, confirmedArcs: string[]): DiagnosticResult {
  if (profile === "liveaction") return { ...RESULT_MAP[1], arcId: "alabasta", startEp: 92 };
  if (profile === "never") return RESULT_MAP[0];

  // Baseado em arcos confirmados
  if (confirmedArcs.includes("wano")) return RESULT_MAP[20];
  if (confirmedArcs.includes("dressrosa")) return RESULT_MAP[15];
  if (confirmedArcs.includes("marineford")) return RESULT_MAP[13];
  if (confirmedArcs.includes("enies-lobby")) return RESULT_MAP[10];
  if (confirmedArcs.includes("alabasta")) return RESULT_MAP[8];

  // Baseado em pontos das cenas
  if (points >= 15) return RESULT_MAP[15];
  if (points >= 10) return RESULT_MAP[13];
  if (points >= 8) return RESULT_MAP[8];
  if (points >= 6) return RESULT_MAP[6];
  if (points >= 3) return RESULT_MAP[3];
  return RESULT_MAP[0];
}

const ALL_ARCS = [
  { id: "romance-dawn", name: "Romance Dawn", icon: "🌅", ep: 1 },
  { id: "arlong-park", name: "Arlong Park", icon: "🦈", ep: 31 },
  { id: "loguetown", name: "Loguetown", icon: "⚓", ep: 52 },
  { id: "alabasta", name: "Alabasta", icon: "🏜️", ep: 92 },
  { id: "skypiea", name: "Skypiea", icon: "☁️", ep: 153 },
  { id: "enies-lobby", name: "Enies Lobby", icon: "⚖️", ep: 264 },
  { id: "thriller-bark", name: "Thriller Bark", icon: "👻", ep: 337 },
  { id: "sabaody", name: "Sabaody", icon: "🫧", ep: 385 },
  { id: "marineford", name: "Marineford", icon: "⚔️", ep: 457 },
  { id: "fishman-island", name: "Fishman Island", icon: "🐠", ep: 517 },
  { id: "punk-hazard", name: "Punk Hazard", icon: "🧪", ep: 579 },
  { id: "dressrosa", name: "Dressrosa", icon: "🌹", ep: 629 },
  { id: "zou", name: "Zou", icon: "🐘", ep: 751 },
  { id: "whole-cake-island", name: "Whole Cake Island", icon: "🎂", ep: 783 },
  { id: "wano", name: "Wano", icon: "🏯", ep: 890 },
];

interface Props {
  onComplete: (result: DiagnosticResult & { unlockedArcs: string[]; completedArcs: string[] }) => void;
  onSkip: () => void;
}

export default function DiagnosticQuiz({ onComplete, onSkip }: Props) {
  const [phase, setPhase] = useState<"intro" | "profile" | "scenes" | "arcs" | "result">("intro");
  const [profile, setProfile] = useState<string>("");
  const [sceneIdx, setSceneIdx] = useState(0);
  const [arcIdx, setArcIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const [confirmedArcs, setConfirmedArcs] = useState<string[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [animating, setAnimating] = useState(false);

  const transition = (fn: () => void) => {
    setAnimating(true);
    setTimeout(() => { fn(); setAnimating(false); }, 300);
  };

  const handleProfile = (id: string) => {
    setProfile(id);
    if (id === "never" || id === "liveaction") {
      transition(() => setPhase("result"));
      setResult(getResult(0, id, []));
    } else {
      transition(() => setPhase("scenes"));
    }
  };

  const handleScene = (yes: boolean) => {
    const q = SCENE_QUESTIONS[sceneIdx];
    if (yes) setPoints(p => p + q.yesPoints);
    if (sceneIdx < SCENE_QUESTIONS.length - 1) {
      transition(() => setSceneIdx(i => i + 1));
    } else {
      transition(() => { setPhase("arcs"); setArcIdx(0); });
    }
  };

  const handleArc = (yes: boolean) => {
    if (yes) setConfirmedArcs(a => [...a, ARC_CONFIRMATIONS[arcIdx].id]);
    if (arcIdx < ARC_CONFIRMATIONS.length - 1) {
      transition(() => setArcIdx(i => i + 1));
    } else {
      const finalResult = getResult(points, profile, yes ? [...confirmedArcs, ARC_CONFIRMATIONS[arcIdx].id] : confirmedArcs);
      setResult(finalResult);
      transition(() => setPhase("result"));
    }
  };

  const handleComplete = () => {
    if (!result) return;
    const coveredIds = result.coveredArcs;
    const allIds = ALL_ARCS.map(a => a.id);
    const unlocked = [result.arcId, ...allIds.filter(id => !coveredIds.includes(id) && id !== result.arcId).slice(0, 1)];
    onComplete({
      ...result,
      unlockedArcs: [...coveredIds, result.arcId],
      completedArcs: coveredIds,
    });
  };

  const progress = phase === "scenes"
    ? (sceneIdx / SCENE_QUESTIONS.length) * 100
    : phase === "arcs"
    ? (arcIdx / ARC_CONFIRMATIONS.length) * 100
    : phase === "result" ? 100 : 0;

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      background: "linear-gradient(135deg,#0a1628 0%,#0d2137 50%,#0a1628 100%)",
      fontFamily: "Nunito, sans-serif", color: "white",
      opacity: animating ? 0 : 1, transition: "opacity 0.3s ease",
    }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
      `}</style>

      {/* Progress bar */}
      {phase !== "intro" && phase !== "result" && (
        <div style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#f0a500,#ffd700)", transition: "width 0.4s ease" }} />
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", maxWidth: "520px", margin: "0 auto", width: "100%" }}>

        {/* INTRO */}
        {phase === "intro" && (
          <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease" }}>
            <div style={{ fontSize: "80px", marginBottom: "16px", animation: "float 3s ease-in-out infinite" }}>🧭</div>
            <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(22px,5vw,32px)", fontWeight: 900, background: "linear-gradient(135deg,#f0a500,#ffd700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "12px" }}>
              Onde você está na jornada?
            </h1>
            <p style={{ color: "rgba(245,240,232,0.7)", fontSize: "15px", lineHeight: 1.7, marginBottom: "8px" }}>
              Responda algumas perguntas rápidas e o app descobre <strong style={{ color: "#f0a500" }}>exatamente</strong> de onde você deve começar.
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "32px" }}>
              Serve pra quem nunca viu, pra quem parou no meio e até pra quem só viu o Live Action!
            </p>
            <button onClick={() => transition(() => setPhase("profile"))} style={{
              background: "linear-gradient(135deg,#f0a500,#ffd700)", color: "#0a1628",
              padding: "16px 48px", borderRadius: "50px", border: "none", cursor: "pointer",
              fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "18px",
              boxShadow: "0 8px 32px rgba(240,165,0,0.4)", marginBottom: "16px",
              display: "block", width: "100%", animation: "pulse 2s ease-in-out infinite",
            }}>
              🧭 Iniciar Diagnóstico
            </button>
            <button onClick={onSkip} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "13px", textDecoration: "underline" }}>
              Pular — começar do ep 1
            </button>
          </div>
        )}

        {/* PROFILE */}
        {phase === "profile" && (
          <div style={{ width: "100%", animation: "fadeUp 0.5s ease" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏴‍☠️</div>
              <h2 style={{ fontFamily: "Cinzel, serif", color: "#f0a500", fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
                Qual é sua situação com One Piece?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Seja honesto — o app vai personalizar tudo!</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { id: "never", label: "Nunca assisti nada", icon: "🌊", sub: "Sou um completo novato no Grand Line" },
                { id: "liveaction", label: "Vi o Live Action da Netflix", icon: "🎬", sub: "Conheço os personagens mas não o anime" },
                { id: "few", label: "Vi alguns eps soltos", icon: "📺", sub: "Aqui e ali, sem muita sequência" },
                { id: "stopped", label: "Comecei mas parei em algum ponto", icon: "⏸️", sub: "Perdi o fio da meada" },
                { id: "partial", label: "Assisti bastante mas não sei onde parei", icon: "🗺️", sub: "Lembro de cenas mas não dos eps" },
              ].map(opt => (
                <button key={opt.id} onClick={() => handleProfile(opt.id)} style={{
                  padding: "16px 18px", borderRadius: "18px",
                  border: "2px solid rgba(240,165,0,0.2)",
                  background: "rgba(255,255,255,0.03)", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "14px", textAlign: "left",
                  transition: "all 0.2s", color: "white",
                }}
                  onMouseEnter={e => { e.currentTarget.style.border = "2px solid rgba(240,165,0,0.5)"; e.currentTarget.style.background = "rgba(240,165,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.border = "2px solid rgba(240,165,0,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <span style={{ fontSize: "32px", flexShrink: 0 }}>{opt.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "15px", color: "white", marginBottom: "2px" }}>{opt.label}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>{opt.sub}</div>
                  </div>
                  <span style={{ color: "rgba(240,165,0,0.4)", fontSize: "18px", flexShrink: 0 }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCENES */}
        {phase === "scenes" && (
          <div style={{ width: "100%", animation: "fadeUp 0.5s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Reconhecimento de cenas</div>
              <div style={{ color: "#f0a500", fontWeight: 700, fontSize: "13px", fontFamily: "Cinzel, serif" }}>{sceneIdx + 1} / {SCENE_QUESTIONS.length}</div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "24px", border: "2px solid rgba(240,165,0,0.15)", padding: "24px", marginBottom: "20px" }}>
              <div style={{ color: "rgba(240,165,0,0.7)", fontSize: "12px", fontWeight: 700, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                🎬 {SCENE_QUESTIONS[sceneIdx].question}
              </div>
              <div style={{
                background: "linear-gradient(135deg,rgba(240,165,0,0.06),rgba(10,22,40,0.8))",
                borderRadius: "16px", padding: "20px",
                border: "1px solid rgba(240,165,0,0.1)",
                color: "rgba(245,240,232,0.9)", fontSize: "15px", lineHeight: 1.8,
                fontStyle: "italic",
              }}>
                {SCENE_QUESTIONS[sceneIdx].scene}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <button onClick={() => handleScene(true)} style={{
                padding: "18px", borderRadius: "18px", border: "2px solid rgba(26,188,156,0.3)",
                background: "rgba(26,188,156,0.08)", cursor: "pointer", color: "#1abc9c",
                fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "16px", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(26,188,156,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(26,188,156,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                ✅ Sim, conheço!
              </button>
              <button onClick={() => handleScene(false)} style={{
                padding: "18px", borderRadius: "18px", border: "2px solid rgba(192,57,43,0.3)",
                background: "rgba(192,57,43,0.08)", cursor: "pointer", color: "#e74c3c",
                fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "16px", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,57,43,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(192,57,43,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                ❌ Nunca vi
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: "16px", color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
              Não precisa ter certeza — aproximado já ajuda!
            </div>
          </div>
        )}

        {/* ARC CONFIRMATIONS */}
        {phase === "arcs" && (
          <div style={{ width: "100%", animation: "fadeUp 0.5s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Confirmação de arcos</div>
              <div style={{ color: "#f0a500", fontWeight: 700, fontSize: "13px", fontFamily: "Cinzel, serif" }}>{arcIdx + 1} / {ARC_CONFIRMATIONS.length}</div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "24px", border: "2px solid rgba(240,165,0,0.15)", padding: "28px", marginBottom: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "56px", marginBottom: "12px" }}>{ARC_CONFIRMATIONS[arcIdx].icon}</div>
              <div style={{ fontFamily: "Cinzel, serif", color: "#f0a500", fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>
                {ARC_CONFIRMATIONS[arcIdx].name}
              </div>
              <div style={{ color: "rgba(245,240,232,0.8)", fontSize: "15px", lineHeight: 1.7 }}>
                {ARC_CONFIRMATIONS[arcIdx].question}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <button onClick={() => handleArc(true)} style={{
                padding: "18px", borderRadius: "18px", border: "2px solid rgba(26,188,156,0.3)",
                background: "rgba(26,188,156,0.08)", cursor: "pointer", color: "#1abc9c",
                fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "16px", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(26,188,156,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(26,188,156,0.08)"; }}
              >
                ✅ Sim, vi!
              </button>
              <button onClick={() => handleArc(false)} style={{
                padding: "18px", borderRadius: "18px", border: "2px solid rgba(192,57,43,0.3)",
                background: "rgba(192,57,43,0.08)", cursor: "pointer", color: "#e74c3c",
                fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "16px", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,57,43,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(192,57,43,0.08)"; }}
              >
                ❌ Não cheguei lá
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && result && (
          <div style={{ width: "100%", animation: "fadeUp 0.6s ease" }}>
            {/* Título épico */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "64px", marginBottom: "12px", animation: "float 3s ease-in-out infinite" }}>🎯</div>
              <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(18px,4vw,26px)", fontWeight: 900, background: "linear-gradient(135deg,#f0a500,#ffd700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "6px" }}>
                Diagnóstico Completo!
              </h2>
              <div style={{ display: "inline-block", background: "rgba(240,165,0,0.15)", borderRadius: "50px", padding: "6px 20px", border: "1px solid rgba(240,165,0,0.3)", color: "#ffd700", fontWeight: 700, fontSize: "14px" }}>
                {result.level}
              </div>
            </div>

            {/* Card principal — onde começar */}
            <div style={{
              background: "linear-gradient(135deg,rgba(240,165,0,0.12),rgba(10,22,40,0.8))",
              borderRadius: "24px", border: "2px solid rgba(240,165,0,0.4)",
              padding: "24px", marginBottom: "16px",
              boxShadow: "0 8px 32px rgba(240,165,0,0.15)",
            }}>
              <div style={{ color: "rgba(240,165,0,0.7)", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px" }}>COMECE AQUI</div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <div style={{ fontSize: "48px" }}>{ALL_ARCS.find(a => a.id === result.arcId)?.icon || "⚓"}</div>
                <div>
                  <div style={{ fontFamily: "Cinzel, serif", color: "#f0a500", fontSize: "22px", fontWeight: 700 }}>{result.arcName}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Episódio {result.startEp}</div>
                </div>
              </div>
              <div style={{ color: "rgba(245,240,232,0.8)", fontSize: "14px", lineHeight: 1.7, marginBottom: "12px" }}>{result.reason}</div>
              <div style={{ background: "rgba(240,165,0,0.08)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(240,165,0,0.15)" }}>
                <div style={{ color: "#f0a500", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>🔥 Por que esse ponto?</div>
                <div style={{ color: "rgba(245,240,232,0.75)", fontSize: "13px", lineHeight: 1.6 }}>{result.hype}</div>
              </div>
            </div>

            {/* Mapa de progresso */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.06)", padding: "16px", marginBottom: "16px" }}>
              <div style={{ fontFamily: "Cinzel, serif", color: "#f0a500", fontSize: "14px", fontWeight: 700, marginBottom: "12px" }}>🗺️ Sua jornada até aqui</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {ALL_ARCS.map(arc => {
                  const isDone = result.coveredArcs.includes(arc.id);
                  const isCurrent = arc.id === result.arcId;
                  return (
                    <div key={arc.id} style={{
                      padding: "5px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700,
                      background: isCurrent ? "linear-gradient(135deg,#f0a500,#ffd700)" : isDone ? "rgba(26,188,156,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isCurrent ? "#f0a500" : isDone ? "rgba(26,188,156,0.3)" : "rgba(255,255,255,0.06)"}`,
                      color: isCurrent ? "#0a1628" : isDone ? "#1abc9c" : "rgba(255,255,255,0.25)",
                    }}>
                      {arc.icon} {isCurrent ? "▶ " : isDone ? "✓ " : ""}{arc.name}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: "16px", marginTop: "12px", fontSize: "11px" }}>
                <span style={{ color: "#1abc9c" }}>✓ Já viu</span>
                <span style={{ color: "#f0a500" }}>▶ Começar aqui</span>
                <span style={{ color: "rgba(255,255,255,0.25)" }}>◯ Ainda vem</span>
              </div>
            </div>

            {/* Dica */}
            <div style={{ background: "rgba(26,188,156,0.06)", borderRadius: "16px", border: "1px solid rgba(26,188,156,0.15)", padding: "14px", marginBottom: "24px" }}>
              <div style={{ color: "#1abc9c", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>💡 Dica do Navegante</div>
              <div style={{ color: "rgba(245,240,232,0.7)", fontSize: "13px", lineHeight: 1.6 }}>{result.tip}</div>
            </div>

            {/* Botão */}
            <button onClick={handleComplete} style={{
              width: "100%", padding: "18px", borderRadius: "20px", border: "none",
              background: "linear-gradient(135deg,#f0a500,#ffd700)", color: "#0a1628",
              fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "18px", cursor: "pointer",
              boxShadow: "0 8px 32px rgba(240,165,0,0.4)", marginBottom: "12px",
              animation: "pulse 2s ease-in-out infinite",
            }}>
              ⚓ Zarpar daqui! Ep {result.startEp}
            </button>
            <button onClick={onSkip} style={{ width: "100%", background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "13px", padding: "8px" }}>
              Começar do ep 1 mesmo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
