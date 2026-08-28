import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Code,
  ArrowRight,
  SlidersHorizontal,
  Palette,
  Eye,
  Check,
  Sparkle
} from '@phosphor-icons/react';
import { AVAILABLE_ICONS } from './ControlsBar';
import CustomColorPicker from './CustomColorPicker';

const STAGE_BACKDROPS = [
  { id: 'light', name: 'Clair', bg: '#eeeeee', class: 'stage-backdrop-light' },
  { id: 'dark', name: 'Sombre', bg: '#111111', class: 'stage-backdrop-dark' },
  { id: 'mesh', name: 'Gradient Mesh', bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)', class: 'stage-backdrop-mesh' },
  { id: 'wallpaper', name: 'Wallpaper HD', bg: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")', class: 'stage-backdrop-wallpaper' },
];

export default function FocusSandbox({ effect, config, onClose, onOpenCode, t }) {
  const tr = (key, fallback) => (t ? t(key) : fallback);

  const [animSpeed, setAnimSpeed] = useState(0.35); // in seconds
  const [backdropId, setBackdropId] = useState('light');
  const [customButtonText, setCustomButtonText] = useState(config.buttonText || tr('default_button_text', 'Filters'));
  const [studioButtonColor, setStudioButtonColor] = useState(config.buttonColor || '#e6332a');
  const [customCssCode, setCustomCssCode] = useState(effect?.cssCode || '');
  const [hoverCount, setHoverCount] = useState(0);
  const btnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 160, height: 48 });

  const stageBackdrops = [
    { id: 'light', name: tr('bg_light', 'Clair'), bg: '#eeeeee', class: 'stage-backdrop-light' },
    { id: 'dark', name: tr('bg_dark', 'Sombre'), bg: '#111111', class: 'stage-backdrop-dark' },
    { id: 'mesh', name: tr('bg_mesh', 'Gradient Mesh'), bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)', class: 'stage-backdrop-mesh' },
    { id: 'wallpaper', name: tr('bg_wallpaper', 'Wallpaper HD'), bg: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")', class: 'stage-backdrop-wallpaper' },
  ];

  const currentEffect = effect;

  useEffect(() => {
    if (currentEffect) {
      setCustomCssCode(currentEffect.cssCode || '');
    }
  }, [currentEffect]);

  // Inject dynamic user-edited CSS or speed overrides
  useEffect(() => {
    if (!currentEffect) return;
    const styleId = 'sandbox-custom-live-css';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    // Inject speed variable override and custom CSS
    styleEl.innerHTML = `
      :root {
        --anim-speed: ${animSpeed}s;
      }
      .${currentEffect.className} {
        transition-duration: ${animSpeed}s !important;
        animation-duration: ${animSpeed}s !important;
      }
      .${currentEffect.className}::before, .${currentEffect.className}::after {
        transition-duration: ${animSpeed}s !important;
        animation-duration: ${animSpeed}s !important;
      }
      ${customCssCode}
    `;
    return () => {
      if (styleEl) styleEl.innerHTML = '';
    };
  }, [animSpeed, customCssCode, currentEffect]);

  useEffect(() => {
    if (!btnRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.borderBoxSize?.[0]) {
          setDimensions({
            width: entry.borderBoxSize[0].inlineSize,
            height: entry.borderBoxSize[0].blockSize
          });
        }
      }
    });
    observer.observe(btnRef.current);
    return () => observer.disconnect();
  }, [config.buttonText, config.buttonSize, config.iconPosition, config.iconName]);

  if (!currentEffect) return null;


  const SelectedIconComp = AVAILABLE_ICONS.find((i) => i.id === config.iconName)?.Icon || ArrowRight;

  const currentBackdrop = stageBackdrops.find((b) => b.id === backdropId) || stageBackdrops[0];
  const isDarkCanvas = backdropId === 'dark' || backdropId === 'mesh' || backdropId === 'wallpaper';
  const canvasThemeClass = isDarkCanvas ? 'canvas-dark' : 'canvas-light';

  const radiusStyle = {
    borderRadius: config.borderRadiusValue === 999 ? '9999px' : `${config.borderRadiusValue}px`,
    '--btn-color': studioButtonColor,
    transitionDuration: `${animSpeed}s`,
  };

  const sizeClass = `btn-size-${config.buttonSize}`;
  const fontClass = config.fontFamily;
  const fullClassName = `specimen-btn ${fontClass} ${sizeClass} ${currentEffect.className}`;

  const isIconOnly = config.iconPosition === 'only';
  const isIconLeft = config.iconPosition === 'left';
  const isIconRight = config.iconPosition === 'right';
  const hasIcon = config.iconPosition !== 'none';
  const isSvgTrace = currentEffect.className.includes('btn-hover-outline-revolving');

  const cleanTitle = (currentEffect.name || '').replace(/^\d+\.\s*/, '');

  return (
    <div className="sandbox-modal-backdrop" onClick={onClose}>
      <div className="sandbox-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sandbox-modal-header">
          <div className="sandbox-header-brand">
            <span className="sandbox-badge">{tr('studio_badge', 'MODE STUDIO')}</span>
            <h2>#{currentEffect.id} {cleanTitle}</h2>
          </div>
          <div className="sandbox-header-actions">
            <button
              type="button"
              className="code-btn primary"
              onClick={() => {
                onClose();
                if (onOpenCode) {
                  onOpenCode(
                    { ...currentEffect, cssCode: customCssCode },
                    { ...config, buttonColor: studioButtonColor, animDuration: animSpeed }
                  );
                }
              }}
            >
              <Code size={16} />
              <span>{tr('export_code', 'Exporter le code')}</span>
            </button>
            <button type="button" className="close-btn" onClick={onClose} title="Fermer le Studio">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="sandbox-modal-body">
          {/* Controls Sidebar */}
          <div className="sandbox-controls-sidebar">
            {/* 1. Animation Speed Slider */}
            <div className="control-card">
              <div className="control-card-header">
                <SlidersHorizontal size={16} />
                <span>{tr('anim_speed_title', 'Vitesse d\'animation')}</span>
                <span className="speed-val-badge">{animSpeed}s</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.05"
                value={animSpeed}
                onChange={(e) => setAnimSpeed(parseFloat(e.target.value))}
                className="speed-range-slider"
              />
              <div className="slider-labels">
                <span>{tr('speed_fast_label', 'Rapide (0.1s)')}</span>
                <span>{tr('speed_normal_label', 'Normal (0.35s)')}</span>
                <span>{tr('speed_slow_label', 'Lent (3.0s)')}</span>
              </div>
            </div>

            {/* 2. Stage Backdrop Selector */}
            <div className="control-card">
              <div className="control-card-header">
                <Palette size={16} />
                <span>{tr('stage_bg_title', 'Arrière-plan de scène')}</span>
              </div>
              <div className="backdrop-grid">
                {stageBackdrops.map((bd) => (
                  <button
                    key={bd.id}
                    type="button"
                    className={`backdrop-option-btn ${backdropId === bd.id ? 'is-active' : ''}`}
                    onClick={() => setBackdropId(bd.id)}
                  >
                    <span className="bd-name">{bd.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Live Button Text Input */}
            <div className="control-card">
              <div className="control-card-header">
                <Eye size={16} />
                <span>{tr('btn_text_title', 'Texte du Bouton')}</span>
              </div>
              <input
                type="text"
                className="sandbox-input-text"
                value={customButtonText}
                onChange={(e) => setCustomButtonText(e.target.value)}
                placeholder="Texte..."
              />
            </div>

            {/* 4. Live Custom Button Fill Color Picker */}
            <div className="control-card">
              <div className="control-card-header">
                <Palette size={16} />
                <span>{tr('btn_color_title', 'Couleur du Bouton')}</span>
              </div>
              <CustomColorPicker
                color={studioButtonColor}
                onChange={(newColor) => setStudioButtonColor(newColor)}
                popoverPosition="right"
              />
            </div>

            {/* 5. Live Interactive CSS Editor */}
            <div className="control-card flex-1">
              <div className="control-card-header">
                <Code size={16} />
                <span>{tr('live_css_title', 'Éditeur CSS en direct')}</span>
              </div>
              <textarea
                className="live-css-editor"
                value={customCssCode}
                onChange={(e) => setCustomCssCode(e.target.value)}
                placeholder="CSS..."
                spellCheck="false"
              />
            </div>
          </div>

          {/* Preview Stage Panel */}
          <div className="sandbox-stage-panel">
            <div
              className={`sandbox-preview-stage ${currentBackdrop.class} ${canvasThemeClass}`}
              style={currentBackdrop.id === 'wallpaper' ? { backgroundImage: currentBackdrop.bg } : { background: currentBackdrop.bg }}
            >
              <div className="sandbox-stage-center">
                <button
                  ref={btnRef}
                  type="button"
                  className={fullClassName}
                  style={radiusStyle}
                  onMouseEnter={() => setHoverCount((c) => c + 1)}
                >
                  {isSvgTrace && dimensions.width > 0 && (
                    <svg className="btn-svg-border" width="100%" height="100%">
                      <rect
                        className="btn-svg-rect"
                        x="0.75"
                        y="0.75"
                        width={Math.max(dimensions.width - 1.5, 10)}
                        height={Math.max(dimensions.height - 1.5, 10)}
                        rx={config.borderRadiusValue === 999 ? dimensions.height / 2 : config.borderRadiusValue}
                        ry={config.borderRadiusValue === 999 ? dimensions.height / 2 : config.borderRadiusValue}
                        pathLength="100"
                      />
                    </svg>
                  )}
                  {currentEffect.className.includes('card-flip') ? (
                    <div className="card-inner">
                      <div className="card-front">
                        {hasIcon && (isIconLeft || isIconOnly) && <SelectedIconComp className="btn-icon" size={18} weight={config.iconWeight} />}
                        {!isIconOnly && <span>{customButtonText || 'Button'}</span>}
                        {hasIcon && isIconRight && !isIconOnly && <SelectedIconComp className="btn-icon" size={18} weight={config.iconWeight} />}
                      </div>
                      <div className="card-back">
                        {hasIcon && (isIconLeft || isIconOnly) && <SelectedIconComp className="btn-icon" size={18} weight={config.iconWeight} />}
                        {!isIconOnly && <span>{customButtonText || 'Button'}</span>}
                        {hasIcon && isIconRight && !isIconOnly && <SelectedIconComp className="btn-icon" size={18} weight={config.iconWeight} />}
                      </div>
                    </div>
                  ) : (
                    <>
                      {hasIcon && (isIconLeft || isIconOnly) && <SelectedIconComp className="btn-icon" size={18} weight={config.iconWeight} />}
                      {!isIconOnly && <span>{customButtonText || 'Button'}</span>}
                      {hasIcon && isIconRight && !isIconOnly && <SelectedIconComp className="btn-icon" size={18} weight={config.iconWeight} />}
                    </>
                  )}
                </button>
              </div>

              {/* Stage Metrics Info Bar */}
              <div className="sandbox-metrics-bar">
                <div className="metric-tag">
                  <span className="m-label">{tr('metric_hovers', 'Survols :')}</span>
                  <span className="m-val">{hoverCount}</span>
                </div>
                <div className="metric-tag">
                  <span className="m-label">{tr('metric_speed', 'Vitesse :')}</span>
                  <span className="m-val">{animSpeed}s</span>
                </div>
                <div className="metric-tag">
                  <span className="m-label">{tr('metric_color', 'Couleur :')}</span>
                  <span className="m-val mono">{studioButtonColor}</span>
                </div>
                <div className="metric-tag">
                  <span className="m-label">{tr('metric_class', 'Classe :')}</span>
                  <span className="m-val mono">.{currentEffect.className}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
