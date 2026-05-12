import { useState } from 'react';

function ToolLogo({ tool, className = '' }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={`tool-logo-frame ${className}`} aria-hidden="true">
      {tool.logo && !failed ? (
        <img
          src={tool.logo}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="tool-logo-fallback">{tool.emoji}</span>
      )}
    </span>
  );
}

export default ToolLogo;
