import { useState, useEffect } from 'react';
import { SkinId, MascotMood } from '../types/game';

interface ZoroCatMascotProps {
  skin: SkinId;
  mood: MascotMood;
  xp?: number;
  onClick?: () => void;
}

const DIALOGUES: Record<MascotMood, Record<string, string[]>> = {
  happy: {
    default: [
      'Isso aí! Continue assistindo! 🔥',
      'Nada vai me impedir de me tornar o melhor... gato do mundo! ⚔️',
      'XP ganho! Vamo que vamo! 🏴‍☠️',
      'Você tá melhor que o Luffy no começo... só um pouco. 😏',
    ],
    'straw-hat': [
      'Vou ser o Rei dos... gatos! 🎩',
      'Shanks me deu esse chapéu! Guarda segredo. 🤫',
    ],
    'marine-cloak': [
      'Justiça! (mas do meu jeito) ⚓',
      'Almirante Zoro-Gato, para servi-lo! 😼',
    ],
    'zoro-wano': [
      'ESSE ARCO É INCRÍVEL! ⚔️',
      'Wano me deixou mais estiloso. Admite. 🎋',
    ],
    'chopper-hat': [
      'Não sou um tanuki! Sou um gato médico! 🩺',
      'Monstro Ponto ativado! 💪',
    ],
    'enel-god': [
      'Eu sou um Deus... de gato! ⚡',
      'Maximo! MAXIMO! ⚡⚡',
    ],
    'gear-5': [
      'HAHAHAHAHA! ☁️',
      'A liberdade é divertida demais! 🌀',
    ],
  },
  sad: {
    default: [
      'Errou feio... até eu acertaria isso. 😒',
      'Isso foi embaraçoso. Não faça de novo. 😾',
      'Nem o Zoro se perde tanto quanto você erra... 🗺️',
      'Tá bem, todo mundo erra. Mas... isso foi ruim. 😅',
    ],
    'straw-hat': [
      'Luffy nunca desiste! Você vai tentar de novo né? 😩',
    ],
    'zoro-wano': [
      'Até eu me perco às vezes. Mas não nisso. 🗡️',
    ],
    'gear-5': [
      'Isso nem fez sentido errar... ☁️',
    ],
  },
  normal: {
    default: [
      'Tá dormindo ou vai assistir? 😼',
      'O Grand Line não espera ninguém. 🌊',
      'Qual ep você vai assistir hoje? 🏴‍☠️',
      'Zoro se perderia aqui. Você não pode. 🗺️',
      'Nakama, bora assistir mais um! ⚓',
    ],
    'straw-hat': [
      'Sou livre! Livre como o vento do mar! 🎩',
    ],
    'marine-cloak': [
      'A justiça sempre chega... eventualmente. ⚓',
    ],
  },
};

function getDialogue(mood: MascotMood, skin: SkinId): string {
  const moodDialogues = DIALOGUES[mood];
  const skinLines = moodDialogues[skin] || [];
  const defaultLines = moodDialogues['default'] || [];
  const all = [...defaultLines, ...skinLines];
  return all[Math.floor(Math.random() * all.length)] || 'Vai assistir One Piece! 🏴‍☠️';
}

// Skin overlays em SVG
function SkinOverlay({ skin }: { skin: SkinId }) {
  switch (skin) {
    case 'straw-hat':
      return (
        <g>
          {/* Aba do chapéu */}
          <ellipse cx="100" cy="52" rx="58" ry="11" fill="#f5e642" stroke="#c47f00" strokeWidth="2"/>
          {/* Copa do chapéu */}
          <path d="M55 52 Q58 20 100 18 Q142 20 145 52 Z" fill="#f5e642" stroke="#c47f00" strokeWidth="2"/>
          {/* Fita vermelha */}
          <path d="M62 48 Q100 38 138 48" stroke="#c0392b" strokeWidth="7" fill="none" strokeLinecap="round"/>
        </g>
      );
    case 'marine-cloak':
      return (
        <g>
          {/* Capa branca */}
          <path d="M40 120 Q30 180 50 220 Q100 240 150 220 Q170 180 160 120 Q130 130 100 130 Q70 130 40 120Z" fill="white" opacity="0.9" stroke="#ddd" strokeWidth="1"/>
          {/* Ideograma 正義 (Justiça) */}
          <text x="85" y="185" fontSize="16" fill="#1a1a2e" fontWeight="bold" fontFamily="serif">正義</text>
        </g>
      );
    case 'zoro-wano':
      return (
        <g>
          {/* Robe verde */}
          <path d="M45 115 Q35 175 55 215 Q100 230 145 215 Q165 175 155 115 Q125 125 100 125 Q75 125 45 115Z" fill="#2d6a2d" opacity="0.85" stroke="#1a4a1a" strokeWidth="1.5"/>
          {/* Mini espada */}
          <rect x="148" y="140" width="4" height="45" rx="2" fill="#888" stroke="#555" strokeWidth="0.5"/>
          <rect x="143" y="140" width="14" height="7" rx="2" fill="#c47f00"/>
        </g>
      );
    case 'chopper-hat':
      return (
        <g>
          {/* Chapéu rosa do Chopper */}
          <ellipse cx="100" cy="50" rx="48" ry="10" fill="#ff9eb5" stroke="#cc7799" strokeWidth="1.5"/>
          <path d="M58 50 Q60 22 100 20 Q140 22 142 50 Z" fill="#ff9eb5" stroke="#cc7799" strokeWidth="1.5"/>
          {/* Cruz médica */}
          <rect x="91" y="25" width="18" height="6" rx="2" fill="white"/>
          <rect x="97" y="19" width="6" height="18" rx="2" fill="white"/>
        </g>
      );
    case 'enel-god':
      return (
        <g>
          {/* Tambores flutuantes */}
          <ellipse cx="25" cy="100" rx="15" ry="22" fill="#f0a500" stroke="#c47f00" strokeWidth="2"/>
          <ellipse cx="175" cy="100" rx="15" ry="22" fill="#f0a500" stroke="#c47f00" strokeWidth="2"/>
          <ellipse cx="25" cy="155" rx="15" ry="22" fill="#f0a500" stroke="#c47f00" strokeWidth="2"/>
          <ellipse cx="175" cy="155" rx="15" ry="22" fill="#f0a500" stroke="#c47f00" strokeWidth="2"/>
          {/* Raios */}
          <path d="M30 90 L20 105 L28 105 L18 120" stroke="#fff176" strokeWidth="2.5" fill="none"/>
          <path d="M170 90 L180 105 L172 105 L182 120" stroke="#fff176" strokeWidth="2.5" fill="none"/>
        </g>
      );
    case 'gear-5':
      return (
        <g>
          {/* Nuvem de fumaça branca */}
          <ellipse cx="100" cy="235" rx="55" ry="18" fill="white" opacity="0.7"/>
          <ellipse cx="68" cy="228" rx="22" ry="16" fill="white" opacity="0.6"/>
          <ellipse cx="132" cy="228" rx="22" ry="16" fill="white" opacity="0.6"/>
          {/* Sobrancelhas encaracoladas */}
          <path d="M68 88 Q78 78 88 85" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M112 85 Q122 78 132 88" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </g>
      );
    default:
      return null;
  }
}

export default function ZoroCatMascot({ skin, mood, xp = 0, onClick }: ZoroCatMascotProps) {
  const [dialogue, setDialogue] = useState(() => getDialogue(mood, skin));
  const [showBubble, setShowBubble] = useState(true);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    setDialogue(getDialogue(mood, skin));
    setShowBubble(true);
    const t = setTimeout(() => setShowBubble(false), 4000);
    return () => clearTimeout(t);
  }, [mood, skin]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDialogue(getDialogue(mood, skin));
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 12000);
    return () => clearInterval(interval);
  }, [mood, skin]);

  const handleClick = () => {
    setBouncing(true);
    setDialogue(getDialogue(mood, skin));
    setShowBubble(true);
    setTimeout(() => setBouncing(false), 600);
    setTimeout(() => setShowBubble(false), 4000);
    onClick?.();
  };

  const eyeColor = mood === 'happy' ? '#f0a500' : mood === 'sad' ? '#888' : '#f0a500';
  const mouthPath = mood === 'happy'
    ? 'M82 148 Q100 162 118 148'
    : mood === 'sad'
    ? 'M82 158 Q100 148 118 158'
    : 'M85 153 Q100 158 115 153';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      {/* Balão de fala */}
      {showBubble && (
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          color: '#0a1628',
          borderRadius: '16px',
          padding: '10px 14px',
          fontSize: '13px',
          fontWeight: 700,
          maxWidth: '200px',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          animation: 'fadeIn 0.3s ease',
          fontFamily: 'Nunito, sans-serif',
        }}>
          {dialogue}
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid rgba(255,255,255,0.95)',
          }}/>
        </div>
      )}

      {/* SVG do gato */}
      <div
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          transform: bouncing ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.68,-0.55,0.265,1.55)',
          filter: mood === 'happy' ? 'drop-shadow(0 0 8px #f0a500)' : 'none',
        }}
      >
        <svg width="120" height="140" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
          {/* Skin overlay atrás do corpo */}
          {(skin === 'marine-cloak' || skin === 'zoro-wano') && <SkinOverlay skin={skin}/>}

          {/* Corpo do gato */}
          <ellipse cx="100" cy="185" rx="52" ry="58" fill="#1a1a2e"/>

          {/* Cabeça */}
          <circle cx="100" cy="110" r="58" fill="#1a1a2e"/>

          {/* Orelhas */}
          <polygon points="52,72 72,108 32,108" fill="#1a1a2e"/>
          <polygon points="148,72 128,108 168,108" fill="#1a1a2e"/>
          {/* Orelhas internas */}
          <polygon points="52,80 67,105 40,105" fill="#c0392b" opacity="0.5"/>
          <polygon points="148,80 133,105 160,105" fill="#c0392b" opacity="0.5"/>

          {/* Brincos dourados (orelha direita) */}
          <circle cx="158" cy="95" r="4" fill="#f0a500"/>
          <circle cx="162" cy="108" r="3.5" fill="#f0a500"/>
          <circle cx="158" cy="120" r="3" fill="#f0a500"/>

          {/* Cicatriz em X no olho esquerdo */}
          <line x1="62" y1="92" x2="76" y2="106" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>
          <line x1="76" y1="92" x2="62" y2="106" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>

          {/* Olho direito */}
          <circle cx="128" cy="105" r="13" fill={eyeColor}/>
          <circle cx="128" cy="105" r="8" fill="#0a1628"/>
          <circle cx="131" cy="101" r="3.5" fill="white"/>

          {/* Nariz */}
          <ellipse cx="100" cy="128" rx="5" ry="3.5" fill="#c0392b"/>

          {/* Boca */}
          <path d={mouthPath} stroke="#f5f0e8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

          {/* Bigodes */}
          <line x1="45" y1="122" x2="84" y2="128" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7"/>
          <line x1="45" y1="132" x2="84" y2="132" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7"/>
          <line x1="116" y1="128" x2="155" y2="122" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7"/>
          <line x1="116" y1="132" x2="155" y2="132" stroke="#f5f0e8" strokeWidth="1.5" opacity="0.7"/>

          {/* Patinha direita */}
          <ellipse cx="138" cy="230" rx="18" ry="12" fill="#1a1a2e"/>
          {/* Sem patinha esquerda — stump */}
          <path d="M62 218 Q55 228 60 238" stroke="#1a1a2e" strokeWidth="8" fill="none" strokeLinecap="round"/>

          {/* Cauda */}
          <path d="M148 225 Q185 215 188 195 Q190 178 170 172" stroke="#1a1a2e" strokeWidth="10" fill="none" strokeLinecap="round"/>

          {/* Skin overlay na frente */}
          {skin !== 'marine-cloak' && skin !== 'zoro-wano' && <SkinOverlay skin={skin}/>}
        </svg>
      </div>

      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Nunito, sans-serif' }}>
        Toque para interagir
      </div>
    </div>
  );
}
