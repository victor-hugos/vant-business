function EbookCover({ title = '7 Ferramentas de IA', subtitle = 'que uso todo dia', width = 280 }) {
  const h = Math.round(width * 1.41); // proporção A4

  return (
    <svg
      width={width}
      height={h}
      viewBox={`0 0 280 395`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: 12, display: 'block' }}
    >
      {/* fundo */}
      <rect width="280" height="395" rx="12" fill="#0a0a0f" />

      {/* gradiente lateral esquerdo */}
      <rect width="280" height="395" rx="12" fill="url(#bgGrad)" fillOpacity="0.4" />

      {/* linha decorativa superior */}
      <rect x="0" y="0" width="280" height="3" rx="1.5" fill="url(#lineGrad)" />

      {/* círculo glow de fundo */}
      <circle cx="200" cy="120" r="100" fill="#22d3ee" fillOpacity="0.06" />
      <circle cx="200" cy="120" r="60" fill="#22d3ee" fillOpacity="0.06" />

      {/* logo V */}
      <g transform="translate(24, 28)">
        <polyline
          points="0,0 8,18 12,8 16,18 24,0"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="12" cy="8" r="1.5" fill="#22d3ee" />
      </g>

      {/* VANT.business */}
      <text x="52" y="46" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">
        VANT
        <tspan fill="#22d3ee">.business</tspan>
      </text>

      {/* ícone central — cérebro/IA abstrato */}
      <g transform="translate(90, 90)">
        {/* nós de rede neural */}
        <circle cx="50" cy="20" r="5" fill="#22d3ee" fillOpacity="0.9" />
        <circle cx="20" cy="50" r="4" fill="#22d3ee" fillOpacity="0.7" />
        <circle cx="80" cy="50" r="4" fill="#22d3ee" fillOpacity="0.7" />
        <circle cx="10" cy="85" r="3.5" fill="#6366f1" fillOpacity="0.8" />
        <circle cx="50" cy="90" r="5" fill="#22d3ee" fillOpacity="0.9" />
        <circle cx="90" cy="85" r="3.5" fill="#6366f1" fillOpacity="0.8" />
        <circle cx="35" cy="115" r="3" fill="#22d3ee" fillOpacity="0.6" />
        <circle cx="65" cy="115" r="3" fill="#22d3ee" fillOpacity="0.6" />
        {/* conexões */}
        <line x1="50" y1="20" x2="20" y2="50" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="50" y1="20" x2="80" y2="50" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="20" y1="50" x2="10" y2="85" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="20" y1="50" x2="50" y2="90" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="80" y1="50" x2="50" y2="90" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="80" y1="50" x2="90" y2="85" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="50" y1="90" x2="35" y2="115" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="50" y1="90" x2="65" y2="115" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="10" y1="85" x2="35" y2="115" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="90" y1="85" x2="65" y2="115" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.25" />
      </g>

      {/* badge GRÁTIS */}
      <rect x="24" y="248" width="52" height="20" rx="10" fill="#22d3ee" fillOpacity="0.15" />
      <rect x="24" y="248" width="52" height="20" rx="10" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.4" />
      <text x="50" y="262" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#22d3ee" textAnchor="middle">
        GRÁTIS
      </text>

      {/* título principal */}
      <text x="24" y="296" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#ffffff">
        {title}
      </text>
      <text x="24" y="322" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="400" fill="#94a3b8">
        {subtitle}
      </text>

      {/* linha separadora */}
      <line x1="24" y1="342" x2="256" y2="342" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />

      {/* rodapé */}
      <text x="24" y="368" fontFamily="Inter, sans-serif" fontSize="10" fill="#475569">
        Victor Hugo · vant.business
      </text>
      <text x="24" y="384" fontFamily="Inter, sans-serif" fontSize="9" fill="#334155">
        IA · Automação · Ferramentas
      </text>

      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="280" y2="395" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="60%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default EbookCover;
