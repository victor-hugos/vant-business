const logoSources = {
  white: '/assets/vant-logo-white.png',
  black: '/assets/vant-logo-black.png',
};

function VantLogo({ size = 40, variant = 'white', alt = '', className = '' }) {
  const source = logoSources[variant] || logoSources.white;
  const resolvedSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <img
      src={source}
      alt={alt}
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      decoding="async"
      className={`shrink-0 object-contain ${className}`.trim()}
      style={{ width: resolvedSize, height: resolvedSize }}
    />
  );
}

export default VantLogo;
