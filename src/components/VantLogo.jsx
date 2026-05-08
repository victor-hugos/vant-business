function VantLogo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* fundo quadrado arredondado */}
      <rect width="40" height="40" rx="10" fill="#0f172a" />
      <rect width="40" height="40" rx="10" fill="url(#grad)" fillOpacity="0.15" />

      {/* letra V estilizada com traço duplo */}
      <polyline
        points="8,10 16,28 20,18 24,28 32,10"
        stroke="#22d3ee"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* ponto de destaque */}
      <circle cx="20" cy="18" r="2" fill="#22d3ee" />

      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default VantLogo;
