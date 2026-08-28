/**
 * Generator utilities for multi-format hover code export
 * Formats: Vanilla CSS, Tailwind CSS v3/v4, React Framer Motion, Design Tokens
 */

export function generateVanillaCss(effect, config) {
  const speed = config.animDuration || 0.35;
  return `/* HoverLab Effect #${effect.id}: ${effect.name} */
:root {
  --hover-btn-color: ${config.buttonColor || '#e6332a'};
  --hover-btn-radius: ${config.borderRadiusValue === 999 ? '9999px' : `${config.borderRadiusValue || 999}px`};
  --hover-anim-speed: ${speed}s;
}

${effect.cssCode || ''}`;
}

export function generateTailwindCss(effect, config) {
  const speedMs = Math.round((config.animDuration || 0.35) * 1000);
  const radiusClass = config.borderRadiusValue === 999
    ? 'rounded-full'
    : config.borderRadiusValue === 0
    ? 'rounded-none'
    : 'rounded-xl';

  return `// 1. Tailwind JSX Component
<button className="relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-[${config.buttonColor || '#e6332a'}] ${radiusClass} overflow-hidden transition-all duration-[${speedMs}ms] group hover:shadow-lg focus:outline-none">
  <span>${config.buttonText || 'Button'}</span>
</button>

// 2. tailwind.config.js (Keyframes & Animation Extension)
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'hover-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        'border-sweep': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      animation: {
        'hover-pulse': 'hover-pulse ${config.animDuration || 0.35}s ease-in-out',
        'border-sweep': 'border-sweep ${config.animDuration || 0.35}s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    }
  }
};`;
}

export function generateReactFramerMotion(effect, config) {
  const speed = config.animDuration || 0.35;
  return `import React from 'react';
import { motion } from 'framer-motion';

export default function HoverButton({ text = "${config.buttonText || 'Button'}", onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: ${speed}, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: '${config.buttonColor || '#e6332a'}',
        borderRadius: '${config.borderRadiusValue === 999 ? '9999px' : `${config.borderRadiusValue || 999}px`}',
        padding: '12px 24px',
        color: '#ffffff',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        align-items: 'center',
        gap: '8px',
      }}
      onClick={onClick}
    >
      <span>{text}</span>
    </motion.button>
  );
}
`;
}

export function generateDesignTokens(effect, config) {
  const speed = config.animDuration || 0.35;
  const tokens = {
    name: `HoverLab Effect #${effect.id}`,
    effectName: effect.name,
    className: effect.className,
    tokens: {
      color: {
        primary: config.buttonColor || '#e6332a',
        canvasBg: config.cardBgColor || '#eeeeee'
      },
      border: {
        radius: config.borderRadiusValue === 999 ? '9999px' : `${config.borderRadiusValue || 999}px`
      },
      animation: {
        duration: `${speed}s`,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  };
  return JSON.stringify(tokens, null, 2);
}
