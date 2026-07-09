const logoSources = {
  primary: '/assets/brand/vant-logo-primary.png',
  reversed: '/assets/brand/vant-logo-reversed.png',
  symbolReversed: '/assets/brand/vant-symbol-reversed.png',
  favicon: '/assets/brand/vant-favicon.png',
  white: '/assets/vant-logo-white.png',
  black: '/assets/vant-logo-black.png',
};

function VantLogo({
  size = 40,
  width,
  height,
  variant = 'symbolReversed',
  alt = '',
  className = '',
}) {
  const source = logoSources[variant] || logoSources.symbolReversed;
  const resolvedSize = typeof size === 'number' ? `${size}px` : size;
  const resolvedWidth = width || resolvedSize;
  const resolvedHeight = height || resolvedSize;

  return (
    <img
      src={source}
      alt={alt}
      width={typeof width === 'number' ? width : typeof size === 'number' ? size : undefined}
      height={typeof height === 'number' ? height : typeof size === 'number' ? size : undefined}
      decoding="async"
      className={`shrink-0 object-contain ${className}`.trim()}
      style={{ width: resolvedWidth, height: resolvedHeight }}
    />
  );
}

export default VantLogo;
