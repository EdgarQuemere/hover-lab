import React, { useRef, useState, useEffect } from 'react';
import { Code, ArrowRight, ShareNetwork, Check, SlidersHorizontal } from '@phosphor-icons/react';
import { AVAILABLE_ICONS } from './ControlsBar';

function isColorDark(hex) {
  if (!hex) return false;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  if (c.length !== 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 130;
}

export default function HoverCard({
  effect,
  config,
  onOpenCode,
  onOpenStudio,
  t,
  isAutoHovered = false,
  isTargeted = false,
  onUserHoverStart,
  onUserHoverEnd
}) {
  const tr = t || ((k) => (k === 'view_code' ? 'Code' : k));
  const btnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 140, height: 44 });
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [isShareCopied, setIsShareCopied] = useState(false);

  const handleMouseEnter = () => {
    setIsUserHovering(true);
    if (onUserHoverStart) onUserHoverStart(effect.id);
  };

  const handleMouseLeave = () => {
    setIsUserHovering(false);
    if (onUserHoverEnd) onUserHoverEnd(effect.id);
  };

  const handleShareLink = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#effect-${effect.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url);
    } else {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setIsShareCopied(true);
    setTimeout(() => setIsShareCopied(false), 2000);
  };

  // Use ResizeObserver for exact, responsive button dimensions
  useEffect(() => {
    if (!btnRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.borderBoxSize?.[0]) {
          setDimensions({
            width: entry.borderBoxSize[0].inlineSize,
            height: entry.borderBoxSize[0].blockSize
          });
        } else if (entry.contentRect) {
          setDimensions({
            width: entry.contentRect.width + 32, // padding adjustment
            height: entry.contentRect.height + 24
          });
        }
      }
    });
    observer.observe(btnRef.current);
    return () => observer.disconnect();
  }, [config.buttonText, config.buttonSize, config.iconPosition, config.iconName]);

  const SelectedIconComp = AVAILABLE_ICONS.find((i) => i.id === config.iconName)?.Icon || ArrowRight;

  const activeBg = config.cardBgColor || (config.canvasTheme === 'dark' ? '#111111' : '#eeeeee');
  const isDarkCanvas = (activeBg || '').toLowerCase() === '#111111' || isColorDark(activeBg);
  const canvasThemeClass = isDarkCanvas ? 'canvas-dark' : 'canvas-light';
  const canvasStyle = { backgroundColor: activeBg };

  const iconElement = (positionClass = '') => (
    <SelectedIconComp
      className={`btn-icon ${positionClass}`}
      size={config.buttonSize === 'sm' ? 14 : config.buttonSize === 'lg' ? 20 : 17}
      weight={config.iconWeight}
    />
  );

  // Safely clamp SVG rx so it never exceeds half height
  const maxPillRadius = Math.max((dimensions.height - 1.5) / 2, 0);
  const svgRx = config.borderRadiusValue === 999
    ? maxPillRadius
    : Math.min(config.borderRadiusValue, maxPillRadius);

  const radiusStyle = {
    borderRadius: config.borderRadiusValue === 999 ? `${Math.round(maxPillRadius || 24)}px` : `${config.borderRadiusValue}px`,
    ...(config.buttonColor ? { '--btn-color': config.buttonColor } : {})
  };

  const sizeClass = `btn-size-${config.buttonSize}`;
  const fontClass = config.fontFamily;
  const showAutoHover = isAutoHovered && !isUserHovering;
  const fullClassName = `specimen-btn ${fontClass} ${sizeClass} ${effect.className} ${showAutoHover ? 'is-auto-hovered' : ''}`;

  const isIconOnly = config.iconPosition === 'only';
  const isIconLeft = config.iconPosition === 'left';
  const isIconRight = config.iconPosition === 'right';
  const hasIcon = config.iconPosition !== 'none';
  const isSvgTrace = effect.className.includes('btn-hover-outline-revolving');
  const isSvgDualPulse = effect.className.includes('btn-hover-outline-dual-pulse');
  const isSvgDrawGlow = effect.className.includes('btn-hover-outline-draw-glow');
  const isSwapMorph = effect.className.includes('btn-hover-icon-swap-morph');
  const isStaggerLiquid = effect.className.includes('btn-hover-stagger-liquid');

  const isRollingEffect = effect.className.includes('btn-hover-rolling-magic');

  const renderRollingText = (text) => {
    const letters = Array.from(text || 'Filtres');
    return (
      <span className="btn-rolling-text">
        <span className="btn-rolling-line original">
          {letters.map((char, i) => (
            <span key={i} className="btn-rolling-char" style={{ '--char-i': i }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="btn-rolling-line duplicate" aria-hidden="true">
          {letters.map((char, i) => (
            <span key={i} className="btn-rolling-char" style={{ '--char-i': i }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
    );
  };

  const cleanTitle = (effect.name || '').replace(/^\d+\.\s*/, '');

  return (
    <div
      id={`effect-${effect.id}`}
      className={`hover-specimen-card ${isTargeted ? 'is-targeted-highlight' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="specimen-header">
        <div className="specimen-title-wrap">
          <span className="specimen-id">#{effect.id}</span>
          <h3 className="specimen-title">{cleanTitle}</h3>
        </div>
        <div className="specimen-header-actions">
          <button
            type="button"
            className={`share-btn ${isShareCopied ? 'is-copied' : ''}`}
            onClick={handleShareLink}
            title={isShareCopied ? tr('link_copied') : tr('share_tooltip')}
          >
            {isShareCopied ? <Check size={13} weight="bold" /> : <ShareNetwork size={13} weight="bold" />}
            <span>{isShareCopied ? tr('link_copied') : tr('share_btn')}</span>
          </button>
          <button
            type="button"
            className="code-btn studio-merge-btn"
            onClick={() => onOpenStudio(effect)}
            title="Ouvrir le Mode Studio & Exporter le Code"
          >
            <Code size={14} />
            <span>Studio</span>
          </button>
        </div>
      </div>

      <div className="specimen-desc">{effect.description}</div>

      <div className={`specimen-canvas ${canvasThemeClass}`} style={canvasStyle}>
        <button ref={btnRef} className={fullClassName} style={radiusStyle}>
          {isSvgTrace && dimensions.width > 0 && (
            <svg className="btn-svg-border" width="100%" height="100%">
              <rect
                className="btn-svg-rect"
                x="0.75"
                y="0.75"
                width={Math.max(dimensions.width - 1.5, 10)}
                height={Math.max(dimensions.height - 1.5, 10)}
                rx={svgRx}
                ry={svgRx}
                pathLength="100"
              />
            </svg>
          )}

          {isSvgDualPulse && dimensions.width > 0 && (
            <svg className="btn-svg-border" width="100%" height="100%">
              <rect
                className="btn-svg-rect-pulse-1"
                x="0.75"
                y="0.75"
                width={Math.max(dimensions.width - 1.5, 10)}
                height={Math.max(dimensions.height - 1.5, 10)}
                rx={svgRx}
                ry={svgRx}
                pathLength="100"
              />
              <rect
                className="btn-svg-rect-pulse-2"
                x="0.75"
                y="0.75"
                width={Math.max(dimensions.width - 1.5, 10)}
                height={Math.max(dimensions.height - 1.5, 10)}
                rx={svgRx}
                ry={svgRx}
                pathLength="100"
              />
            </svg>
          )}

          {isSvgDrawGlow && dimensions.width > 0 && (
            <svg className="btn-svg-border" width="100%" height="100%">
              <rect
                className="btn-svg-rect-draw"
                x="0.75"
                y="0.75"
                width={Math.max(dimensions.width - 1.5, 10)}
                height={Math.max(dimensions.height - 1.5, 10)}
                rx={svgRx}
                ry={svgRx}
                pathLength="100"
              />
            </svg>
          )}

          {isStaggerLiquid && (
            <>
              <span className="btn-stagger-drop" style={{ '--delay': 1 }} />
              <span className="btn-stagger-drop" style={{ '--delay': 2 }} />
              <span className="btn-stagger-drop" style={{ '--delay': 3 }} />
              <span className="btn-stagger-drop" style={{ '--delay': 4 }} />
            </>
          )}

          {isSwapMorph ? (
            <>
              {iconElement('btn-icon-swap-left')}
              <span className="btn-content-wrap">{config.buttonText || 'Filtres'}</span>
            </>
          ) : isRollingEffect ? (
            <>
              {hasIcon && (isIconLeft || isIconOnly) && iconElement('btn-icon-left')}
              {!isIconOnly && renderRollingText(config.buttonText || 'Filtres')}
              {hasIcon && isIconRight && !isIconOnly && iconElement('btn-icon-right')}
            </>
          ) : effect.className.includes('hover-text-elevator') ? (
            <>
              <div className="btn-content-wrap">
                {hasIcon && (isIconLeft || isIconOnly) && iconElement('btn-icon-left')}
                {!isIconOnly && <span>{config.buttonText || 'Filtres'}</span>}
                {hasIcon && isIconRight && !isIconOnly && iconElement('btn-icon-right')}
              </div>
              <div className="btn-content-duplicate">
                {hasIcon && (isIconLeft || isIconOnly) && iconElement('btn-icon-left')}
                {!isIconOnly && <span>{config.buttonText || 'Filtres'}</span>}
                {hasIcon && isIconRight && !isIconOnly && iconElement('btn-icon-right')}
              </div>
            </>
          ) : (
            <>
              {hasIcon && (isIconLeft || isIconOnly) && iconElement('btn-icon-left')}
              {!isIconOnly && <span>{config.buttonText || 'Filtres'}</span>}
              {hasIcon && isIconRight && !isIconOnly && iconElement('btn-icon-right')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
