import { useState, useRef, useEffect } from "react";

// ⚠️ Coloca sua chave aqui — pega GRÁTIS em: https://console.groq.com
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  state: any;
}

function buildSystemPrompt(state: any): string {
  const completedArcs = state.completedArcs || [];
  const unlockedArcs = state.unlockedArcs || ["romance-dawn"];
  const currentArc = unlockedArcs.find((id: string) => !completedArcs.includes(id)) || "romance-dawn";
  const watchedCount = (state.watchedEps || []).length;
  const userName = state.userName || "Pirata";

  return `Você é o Zoro-Gato, assistente pirata do app One Piece Tracker. Personalidade do Zoro — direto, sarcástico mas leal, ocasionalmente se perde mas nunca admite.

DADOS DO USUÁRIO:
- Nome: ${userName}
- Nível: ${state.level||1} | XP: ${state.xp||0} | Streak: ${state.streak||0} dias
- Episódios assistidos: ${watchedCount}
- Arcos completados: ${completedArcs.length > 0 ? completedArcs.join(", ") : "nenhum ainda"}
- Arco atual: ${currentArc}

REGRAS:
1. NUNCA dê spoilers de arcos que o usuário ainda não desbloqueou
2. Fale como um pirata brasileiro — energia, mas sem exagerar
3. Use o progresso do usuário nas respostas
4. Dê hype SEM spoilers sobre eps que ele ainda não viu
5. Pode recomendar ordem, dicas de fillers, contexto dos arcos
6. Máximo 3-4 parágrafos curtos — é um chat mobile
7. Use emojis ocasionalmente mas sem exagerar
8. Responda sempre em português do Brasil`;
}

const SUGGESTIONS = [
  "Vou maratonar hoje, me anima!",
  "Onde eu parei mesmo?",
  "Vale a pena Skypiea?",
  "Quais fillers pular?",
  "Próximo arco sem spoiler",
  "Quanto tempo falta?",
];

export default function AIChat({ state }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Oi ${state.userName || "Pirata"}! Sou o Zoro-Gato, seu guia pelo Grand Line 🐱⚔️\n\nVi que você ${(state.watchedEps||[]).length > 0 ? `já assistiu ${(state.watchedEps||[]).length} episódios` : "ainda não começou"}. Me fala — vai maratonar hoje ou quer uma dica de por onde continuar?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const noKey = GROQ_API_KEY === "SUA_CHAVE_AQUI";
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 500,
          temperature: 0.8,
          messages: [
            { role: "system", content: buildSystemPrompt(state) },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content
        || "Opa, me perdi feito o Zoro. Tenta de novo! 🗺️";

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Erro de conexão... até eu me perco às vezes. Tenta de novo! 🐱" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // Tela de configuração quando não tem chave
  if (noKey) {
    return (
      <div style={{ padding: "32px 20px", fontFamily: "Nunito, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "64px" }}>🔑</div>
        <div style={{ fontFamily: "Cinzel, serif", color: "#f0a500", fontSize: "20px", fontWeight: 700 }}>Configure o Chat IA</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.7, maxWidth: "320px" }}>
          Para usar o chat, você precisa de uma chave gratuita do Groq.
        </div>
        <div style={{ background: "rgba(240,165,0,0.08)", borderRadius: "16px", border: "1px solid rgba(240,165,0,0.2)", padding: "16px", width: "100%", textAlign: "left" }}>
          <div style={{ color: "#f0a500", fontWeight: 700, marginBottom: "12px", fontSize: "14px" }}>Passo a passo:</div>
          {[
            "Acessa console.groq.com",
            "Faz login com Google",
            "Clica em 'API Keys' → 'Create API Key'",
            "Copia a chave gerada",
            `No arquivo src/AIChat.tsx, substitui SUA_CHAVE_AQUI pela chave`,
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(240,165,0,0.2)", color: "#f0a500", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.5 }}>{step}</div>
            </div>
          ))}
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
          100% gratuito e muito rápido! 🏴‍☠️
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 60px)", fontFamily: "Nunito, sans-serif" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        .msg{animation:fadeUp 0.3s ease}
      `}</style>

      {/* Header */}
      <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(240,165,0,0.15)", background: "rgba(10,22,40,0.8)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <svg width="44" height="44" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="130" r="90" fill="#1a1a2e"/>
              <circle cx="100" cy="110" r="58" fill="#1a1a2e"/>
              <polygon points="52,72 72,108 32,108" fill="#1a1a2e"/>
              <polygon points="148,72 128,108 168,108" fill="#1a1a2e"/>
              <circle cx="128" cy="105" r="13" fill="#f0a500"/>
              <circle cx="128" cy="105" r="8" fill="#0a1628"/>
              <circle cx="131" cy="101" r="3.5" fill="white"/>
              <line x1="62" y1="92" x2="76" y2="106" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>
              <line x1="76" y1="92" x2="62" y2="106" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>
              <path d="M85 138 Q100 148 115 138" stroke="#f5f0e8" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "10px", height: "10px", borderRadius: "50%", background: "#1abc9c", border: "2px solid #0a1628" }}/>
          </div>
          <div>
            <div style={{ fontFamily: "Cinzel, serif", color: "#f0a500", fontWeight: 700, fontSize: "15px" }}>Zoro-Gato</div>
            <div style={{ color: "#1abc9c", fontSize: "11px" }}>● Online — Guia do Grand Line</div>
          </div>
          <div style={{ marginLeft: "auto", background: "rgba(240,165,0,0.1)", borderRadius: "20px", padding: "4px 10px", border: "1px solid rgba(240,165,0,0.2)" }}>
            <span style={{ color: "#f0a500", fontSize: "11px", fontWeight: 700 }}>Nv.{state.level || 1}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.map((msg, i) => (
          <div key={i} className="msg" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: "8px", alignItems: "flex-end" }}>
            {msg.role === "assistant" && (
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(240,165,0,0.15)", border: "1px solid rgba(240,165,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>🐱</div>
            )}
            <div style={{
              maxWidth: "80%", padding: "12px 14px",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.role === "user" ? "linear-gradient(135deg,#f0a500,#ffd700)" : "rgba(255,255,255,0.05)",
              border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
              color: msg.role === "user" ? "#0a1628" : "rgba(245,240,232,0.9)",
              fontSize: "14px", lineHeight: 1.6,
              fontWeight: msg.role === "user" ? 700 : 400,
              whiteSpace: "pre-wrap", wordBreak: "break-word",
            }}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#f0a500,#ffd700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>🏴‍☠️</div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(240,165,0,0.15)", border: "1px solid rgba(240,165,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🐱</div>
            <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "6px", alignItems: "center" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f0a500", animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i*0.2}s` }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Sugestões */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 16px 8px", flexShrink: 0 }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", marginBottom: "8px", fontWeight: 700 }}>SUGESTÕES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => sendMessage(s)} style={{ padding: "7px 12px", borderRadius: "20px", background: "rgba(240,165,0,0.08)", border: "1px solid rgba(240,165,0,0.2)", color: "#f0a500", fontSize: "12px", cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 600 }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(240,165,0,0.1)", background: "rgba(10,22,40,0.9)", flexShrink: 0, display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Fala com o Zoro-Gato..."
          disabled={loading}
          style={{ flex: 1, padding: "12px 16px", borderRadius: "24px", border: "1px solid rgba(240,165,0,0.25)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "14px", outline: "none", fontFamily: "Nunito, sans-serif" }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          style={{ width: "44px", height: "44px", borderRadius: "50%", background: input.trim() && !loading ? "linear-gradient(135deg,#f0a500,#ffd700)" : "rgba(255,255,255,0.05)", border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", transition: "all 0.2s", flexShrink: 0 }}
        >
          {loading ? "⏳" : "⚡"}
        </button>
      </div>
    </div>
  );
}
