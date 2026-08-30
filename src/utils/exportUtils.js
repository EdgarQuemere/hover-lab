/**
 * Generator utilities for multi-format hover code export
 * Formats: HTML, Vanilla CSS, Tailwind CSS v3/v4, React Framer Motion, Design Tokens
 */

// Mapping of Phosphor icon SVG paths for self-contained HTML export
const SVG_ICONS = {
  ArrowRight: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>',
  Sparkle: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M213.66,122.34l-48-16a8,8,0,0,1-5.06-5.06l-16-48a8,8,0,0,0-15.18,0l-16,48a8,8,0,0,1-5.06,5.06l-48,16a8,8,0,0,0,0,15.18l48,16a8,8,0,0,1,5.06,5.06l16,48a8,8,0,0,0,15.18,0l16-48a8,8,0,0,1,5.06-5.06l48-16A8,8,0,0,0,213.66,122.34Z"></path></svg>',
  Lightning: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M215.79,118.17a8,8,0,0,0-7.79-6.17H144V32a8,8,0,0,0-13.82-5.46l-88,96A8,8,0,0,0,48,136h64v88a8,8,0,0,0,13.82,5.46l88-96A8,8,0,0,0,215.79,118.17Z"></path></svg>',
  Compass: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,74.34-24,56a8,8,0,0,1-4.32,4.32l-56,24a8,8,0,0,1-10-10l24-56a8,8,0,0,1,4.32-4.32l56-24A8,8,0,0,1,173.66,98.34Z"></path></svg>',
  Plus: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>',
  ShoppingBag: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-88,48a32,32,0,0,1-32-32H160A32,32,0,0,1,128,88Z"></path></svg>',
  Heart: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32Z"></path></svg>',
  PaperPlane: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M236.42,26.79a16,16,0,0,0-16.63-3.64l-184,72a16,16,0,0,0-1.89,29.35l77,41.49,41.49,77A16,16,0,0,0,166.7,248a16.27,16.27,0,0,0,7.16-1.66l72-184A16,16,0,0,0,236.42,26.79Z"></path></svg>',
  Lock: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96Z"></path></svg>',
  Code: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M69.66,162.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,69.66,162.34Zm-40-80,40-40A8,8,0,0,0,58.34,31l-40,40a8,8,0,0,0,0,11.32Zm197.68,80a8,8,0,0,1-11.32,11.32l40,40a8,8,0,0,0,11.32-11.32Zm0-80a8,8,0,0,0,0-11.32l-40-40A8,8,0,0,0,176,42.34l40,40A8,8,0,0,0,227.34,82.34Z"></path></svg>',
  Star: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34L128,198.46l-51.07,31.22A16,16,0,0,1,53.09,212.34l13.51-58.6L21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a16,16,0,0,1,29.44,0l23.21,55.36,59.46,5.15A16,16,0,0,1,234.5,114.38Z"></path></svg>',
  Globe: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm80,104a87.67,87.67,0,0,1-8.15,36.56l-34.41-34.41a8,8,0,0,0-11.32,0L136,148.34V128a8,8,0,0,0-8-8H96V104a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v16H48.43A88,88,0,0,1,208,128Z"></path></svg>',
  Download: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34A8,8,0,0,0,82.34,117.66Z"></path></svg>',
  Check: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>',
  Cursor: '<svg class="btn-icon" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M216.57,114.77,56.59,42.79A16,16,0,0,0,34.82,60.36L87.7,196.42A16,16,0,0,0,102.77,208h.56a16,16,0,0,0,14.61-9.9l24-56.12,56.12-24A16,16,0,0,0,216.57,114.77Z"></path></svg>',
};

export function generateHtmlSnippet(effect, config = {}) {
  const text = config.buttonText || 'HoverLab';
  const iconPos = config.iconPosition || 'right';
  const iconName = config.iconName || 'ArrowRight';
  
  const isIconOnly = iconPos === 'only';
  const isIconLeft = iconPos === 'left';
  const isIconRight = iconPos === 'right';
  const hasIcon = iconPos !== 'none';
  const className = `hover-btn ${effect.className}${isIconOnly ? ' btn-icon-only' : ''}`;

  const getIconSvg = (posClass = '') => {
    const raw = SVG_ICONS[iconName] || SVG_ICONS.ArrowRight;
    if (!posClass) return raw;
    return raw.replace('class="btn-icon"', `class="btn-icon ${posClass}"`);
  };

  const leftSvg = hasIcon && (isIconLeft || isIconOnly) ? getIconSvg(isIconLeft ? 'btn-icon-left' : '') : '';
  const rightSvg = hasIcon && isIconRight && !isIconOnly ? getIconSvg('btn-icon-right') : '';

  // Special DOM handling for special effects
  if (effect.className.includes('card-flip')) {
    return `<button class="${className}">
  <div class="card-inner">
    <div class="card-front">
      ${leftSvg ? `${leftSvg}\n      ` : ''}${!isIconOnly ? `<span>${text}</span>` : ''}${rightSvg ? `\n      ${rightSvg}` : ''}
    </div>
    <div class="card-back">
      ${leftSvg ? `${leftSvg}\n      ` : ''}${!isIconOnly ? `<span>${text}</span>` : ''}${rightSvg ? `\n      ${rightSvg}` : ''}
    </div>
  </div>
</button>`;
  }

  if (effect.className.includes('hover-text-elevator')) {
    return `<button class="${className}">
  <div class="btn-content-wrap">
    ${leftSvg ? `${leftSvg}\n    ` : ''}${!isIconOnly ? `<span>${text}</span>` : ''}${rightSvg ? `\n    ${rightSvg}` : ''}
  </div>
  <div class="btn-content-duplicate">
    ${leftSvg ? `${leftSvg}\n    ` : ''}${!isIconOnly ? `<span>${text}</span>` : ''}${rightSvg ? `\n    ${rightSvg}` : ''}
  </div>
</button>`;
  }

  const radius = config.borderRadiusValue === 999 ? '24' : `${config.borderRadiusValue ?? 12}`;

  if (effect.className.includes('btn-hover-stagger-liquid')) {
    return `<button class="${className}">
  <span class="btn-stagger-drop" style="--delay: 1"></span>
  <span class="btn-stagger-drop" style="--delay: 2"></span>
  <span class="btn-stagger-drop" style="--delay: 3"></span>
  <span class="btn-stagger-drop" style="--delay: 4"></span>
  ${leftSvg ? `${leftSvg}\n  ` : ''}${!isIconOnly ? `<span>${text}</span>` : ''}${rightSvg ? `\n  ${rightSvg}` : ''}
</button>`;
  }

  if (effect.className.includes('btn-hover-icon-swap-morph')) {
    if (config.iconPosition === 'right') {
      const swapIcon = getIconSvg('btn-icon-swap-right');
      return `<button class="${className} swap-from-right">
  <span class="btn-content-wrap">${text}</span>
  ${swapIcon}
</button>`;
    }
    const swapIcon = getIconSvg('btn-icon-swap-left');
    return `<button class="${className}">
  ${swapIcon}
  <span class="btn-content-wrap">${text}</span>
</button>`;
  }

  if (effect.className.includes('btn-hover-rolling-magic')) {
    const letters = Array.from(text);
    const renderChars = letters.map((char, i) => `<span class="btn-rolling-char" style="--char-i: ${i}">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    return `<button class="${className}">
  ${leftSvg ? `${leftSvg}\n  ` : ''}<span class="btn-rolling-text">
    <span class="btn-rolling-line original">${renderChars}</span>
    <span class="btn-rolling-line duplicate" aria-hidden="true">${renderChars}</span>
  </span>${rightSvg ? `\n  ${rightSvg}` : ''}
</button>`;
  }

  if (effect.className.includes('btn-hover-outline-revolving')) {
    return `<button class="${className}">
  <svg class="btn-svg-border" width="100%" height="100%">
    <rect class="btn-svg-rect" x="0.75" y="0.75" width="calc(100% - 1.5px)" height="calc(100% - 1.5px)" rx="${radius}" ry="${radius}" pathLength="100"/>
  </svg>
  ${leftSvg ? `${leftSvg}\n  ` : ''}${!isIconOnly ? `<span>${text}</span>` : ''}${rightSvg ? `\n  ${rightSvg}` : ''}
</button>`;
  }

  return `<button class="${className}">
  ${leftSvg ? `${leftSvg}\n  ` : ''}${!isIconOnly ? `<span>${text}</span>` : ''}${rightSvg ? `\n  ${rightSvg}` : ''}
</button>`;
}

export function generateVanillaCss(effect, config = {}) {
  const speed = config.animDuration || 0.35;
  const color = config.buttonColor || '#e6332a';
  const radius = config.borderRadiusValue === 999 ? '9999px' : `${config.borderRadiusValue ?? 999}px`;
  const canvasBg = config.cardBgColor || (config.canvasTheme === 'dark' ? '#111111' : '#ffffff');
  const size = config.buttonSize || 'md';

  let padding = '12px 28px';
  let fontSize = '15px';
  if (size === 'sm') {
    padding = '8px 20px';
    fontSize = '13px';
  } else if (size === 'lg') {
    padding = '16px 36px';
    fontSize = '17px';
  }

  const rawCss = effect.cssCode || '';

  return `/* ==========================================
   HoverLab Effect #${effect.id}: ${effect.name}
   Self-Contained & Plug-and-Play CSS
   ========================================== */

:root {
  --btn-color: ${color};
  --btn-bg: ${canvasBg};
  --anim-speed: ${speed}s;
}

/* Base Button Styles */
.hover-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: ${padding};
  font-family: inherit;
  font-size: ${fontSize};
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  cursor: pointer;
  background-color: transparent;
  color: var(--btn-color, ${color});
  border: 1.5px solid var(--btn-color, ${color});
  border-radius: ${radius};
  text-decoration: none;
  user-select: none;
  transition: all var(--anim-speed, ${speed}s) cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.hover-btn.btn-icon-only {
  padding: 0 !important;
  aspect-ratio: 1 / 1;
  width: ${size === 'sm' ? '36px' : size === 'lg' ? '54px' : '44px'};
  height: ${size === 'sm' ? '36px' : size === 'lg' ? '54px' : '44px'};
}

.hover-btn .btn-icon {
  display: block;
  flex-shrink: 0;
  transition: transform var(--anim-speed, ${speed}s) cubic-bezier(0.16, 1, 0.3, 1);
}

/* Effect Styles */
${rawCss}`;
}

export function generateTailwindCss(effect, config = {}) {
  const speedMs = Math.round((config.animDuration || 0.35) * 1000);
  const color = config.buttonColor || '#e6332a';
  const radiusClass = config.borderRadiusValue === 999
    ? 'rounded-full'
    : config.borderRadiusValue === 0
    ? 'rounded-none'
    : `rounded-[${config.borderRadiusValue || 12}px]`;

  return `<!-- Tailwind CSS Component -->
<button class="relative inline-flex items-center justify-center gap-2.5 px-7 py-3 text-[15px] font-medium text-[${color}] border-[1.5px] border-[${color}] ${radiusClass} overflow-hidden transition-all duration-[${speedMs}ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[${color}] hover:text-white focus:outline-none">
  <span>${config.buttonText || 'HoverLab'}</span>
  <svg class="w-4 h-4 transition-transform duration-[${speedMs}ms] group-hover:translate-x-1" viewBox="0 0 256 256" fill="currentColor">
    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
  </svg>
</button>`;
}

export function generateReactFramerMotion(effect, config = {}) {
  const speed = config.animDuration || 0.35;
  const color = config.buttonColor || '#e6332a';
  const radius = config.borderRadiusValue === 999 ? '9999px' : `${config.borderRadiusValue || 999}px`;

  return `import React from 'react';
import { motion } from 'framer-motion';

export default function HoverButton({ text = "${config.buttonText || 'HoverLab'}", onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: ${speed}, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '12px 28px',
        fontSize: '15px',
        fontWeight: 500,
        backgroundColor: 'transparent',
        color: '${color}',
        border: '1.5px solid ${color}',
        borderRadius: '${radius}',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <span>{text}</span>
    </motion.button>
  );
}`;
}

export function generateDesignTokens(effect, config = {}) {
  const speed = config.animDuration || 0.35;
  const color = config.buttonColor || '#e6332a';
  const tokens = {
    name: `HoverLab Effect #${effect.id}`,
    effectName: effect.name,
    className: effect.className,
    tokens: {
      color: {
        primary: color,
        canvasBg: config.cardBgColor || (config.canvasTheme === 'dark' ? '#111111' : '#ffffff')
      },
      border: {
        radius: config.borderRadiusValue === 999 ? '9999px' : `${config.borderRadiusValue ?? 999}px`,
        width: '1.5px'
      },
      animation: {
        duration: `${speed}s`,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  };
  return JSON.stringify(tokens, null, 2);
}

