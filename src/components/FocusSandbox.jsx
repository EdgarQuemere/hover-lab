import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Code,
  ArrowRight,
  SlidersHorizontal,
  Palette,
  Eye,
  ArrowCounterClockwise,
  FloppyDisk,
  Copy,
  Check,
} from '@phosphor-icons/react';
import { AVAILABLE_ICONS } from './ControlsBar';
import CustomColorPicker from './CustomColorPicker';

function isColorDark(hex) {
  if (!hex || typeof hex !== 'string') return false;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  if (c.length !== 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 130;
}

// Replaces transition and animation durations in CSS text
function updateDurationsInCss(cssText, newDuration) {
  if (!cssText) return cssText;
  const durationStr = `${newDuration}s`;
  if (/--anim-speed:\s*[\d.]+s/i.test(cssText)) {
    return cssText.replace(/--anim-speed:\s*[\d.]+s/gi, `--anim-speed: ${durationStr}`);
  }
  return cssText.replace(
    /((?:transition(?:-duration)?|animation(?:-duration)?)[^;:]*?:\s*[^;]*?)([\d.]+)s/gi,
    (match, prefix) => `${prefix}${durationStr}`
  );
}

// Extracts duration from CSS text
function extractDurationFromCss(cssText) {
  if (!cssText) return null;
  const varMatch = cssText.match(/--anim-speed:\s*([\d.]+)s/i);
  if (varMatch && !isNaN(parseFloat(varMatch[1]))) {
    return parseFloat(varMatch[1]);
  }
  const match = cssText.match(/(?:transition(?:-duration)?|animation(?:-duration)?)[^;:]*?:\s*[^;]*?([\d.]+)s/i);
  if (match && !isNaN(parseFloat(match[1]))) {
    return parseFloat(match[1]);
  }
  return null;
}

// Extracts button color from CSS text
function extractColorFromCss(cssText) {
  if (!cssText) return null;
  const match = cssText.match(/--btn-color:\s*(#[0-9a-fA-F]{3,8})/i);
  if (match) return match[1];
  return null;
}

export default function FocusSandbox({ effect, config, onClose, onOpenCode, t }) {
  const tr = (key, fallback) => (t ? t(key) : fallback);

  const homeCardBg = config.cardBgColor || (config.canvasTheme === 'dark' ? '#111111' : '#eeeeee');

  // Load saved state from localStorage if available
  const savedCss = effect?.id ? localStorage.getItem(`hoverlab_studio_css_${effect.id}`) : null;
  const savedSpeed = effect?.id ? localStorage.getItem(`hoverlab_studio_speed_${effect.id}`) : null;
  const savedColor = effect?.id ? localStorage.getItem(`hoverlab_studio_color_${effect.id}`) : null;

  const initialSpeed = savedSpeed ? parseFloat(savedSpeed) : 0.35;
  const initialColor = savedColor || config.buttonColor || '#e6332a';
  const initialCss = savedCss || effect?.cssCode || '';

  const [activeSidebarTab, setActiveSidebarTab] = useState('controls'); // 'controls' | 'css'
  const [animSpeed, setAnimSpeed] = useState(initialSpeed);
  const [speedInputText, setSpeedInputText] = useState(String(initialSpeed));
  const [backdropId, setBackdropId] = useState('light');
  const [studioCustomBg, setStudioCustomBg] = useState(homeCardBg);
  const [customButtonText, setCustomButtonText] = useState(config.buttonText || tr('default_button_text', 'HoverLab'));
  const [studioButtonColor, setStudioButtonColor] = useState(initialColor);
  const [customCssCode, setCustomCssCode] = useState(initialCss);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopiedCss, setIsCopiedCss] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);
  const [hoverCount, setHoverCount] = useState(0);
  const btnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 160, height: 48 });

  // Sync text input with slider value
  useEffect(() => {
    setSpeedInputText(String(animSpeed));
  }, [animSpeed]);

  // When animSpeed changes from Settings, update CSS code in real-time
  const handleSpeedChange = (newSpeed) => {
    const rounded = Math.round(newSpeed * 100) / 100;
    setAnimSpeed(rounded);
    setCustomCssCode((prevCss) => updateDurationsInCss(prevCss, rounded));
  };

  const handleSpeedInputChange = (e) => {
    const raw = e.target.value;
    setSpeedInputText(raw);
    const parsed = parseFloat(raw.replace(',', '.'));
    if (!isNaN(parsed) && parsed > 0 && parsed <= 20) {
      handleSpeedChange(parsed);
    }
  };

  const handleSpeedInputBlur = () => {
    const parsed = parseFloat(speedInputText.replace(',', '.'));
    if (isNaN(parsed) || parsed <= 0) {
      setSpeedInputText(String(animSpeed));
    } else {
      const clamped = Math.min(Math.max(parsed, 0.01), 20);
      const rounded = Math.round(clamped * 100) / 100;
      handleSpeedChange(rounded);
      setSpeedInputText(String(rounded));
    }
  };

  const handleSpeedKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.round((animSpeed + 0.05) * 100) / 100;
      handleSpeedChange(Math.min(next, 20));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.round((animSpeed - 0.05) * 100) / 100;
      handleSpeedChange(Math.max(next, 0.05));
    }
  };

  // When Button Color changes from Settings, update CSS if needed
  const handleColorChange = (newColor) => {
    setStudioButtonColor(newColor);
    setCustomCssCode((prevCss) => {
      if (/--btn-color:\s*#[0-9a-fA-F]{3,8}/i.test(prevCss)) {
        return prevCss.replace(/--btn-color:\s*#[0-9a-fA-F]{3,8}/gi, `--btn-color: ${newColor}`);
      }
      return prevCss;
    });
  };

  // When CSS code is typed in the Editor, parse speed and color to update settings in real-time
  const handleCssCodeChange = (newCss) => {
    setCustomCssCode(newCss);
    const parsedDuration = extractDurationFromCss(newCss);
    if (parsedDuration !== null && parsedDuration > 0 && parsedDuration <= 20 && parsedDuration !== animSpeed) {
      setAnimSpeed(parsedDuration);
    }
    const parsedColor = extractColorFromCss(newCss);
    if (parsedColor && parsedColor !== studioButtonColor) {
      setStudioButtonColor(parsedColor);
    }
  };

  // Save CSS to localStorage
  const handleSaveCss = () => {
    if (!effect?.id) return;
    try {
      localStorage.setItem(`hoverlab_studio_css_${effect.id}`, customCssCode);
      localStorage.setItem(`hoverlab_studio_speed_${effect.id}`, String(animSpeed));
      localStorage.setItem(`hoverlab_studio_color_${effect.id}`, studioButtonColor);
      setIsSaved(true);
      setFeedbackToast({ type: 'success', text: tr('css_saved_toast', 'CSS personnalisé enregistré') });
      setTimeout(() => setIsSaved(false), 2000);
      setTimeout(() => setFeedbackToast(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Reset CSS to default effect rules
  const handleResetCss = () => {
    if (!effect?.id) return;
    try {
      localStorage.removeItem(`hoverlab_studio_css_${effect.id}`);
      localStorage.removeItem(`hoverlab_studio_speed_${effect.id}`);
      localStorage.removeItem(`hoverlab_studio_color_${effect.id}`);
      setCustomCssCode(effect?.cssCode || '');
      setAnimSpeed(0.35);
      setStudioButtonColor(config.buttonColor || '#e6332a');
      setFeedbackToast({ type: 'info', text: tr('css_reset_toast', 'CSS réinitialisé par défaut') });
      setTimeout(() => setFeedbackToast(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyCss = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(customCssCode);
      setIsCopiedCss(true);
      setTimeout(() => setIsCopiedCss(false), 2000);
    }
  };

  const stageBackdrops = [
    { id: 'light', name: tr('bg_light', 'Clair'), bg: '#eeeeee', class: 'stage-backdrop-light' },
    { id: 'dark', name: tr('bg_dark', 'Sombre'), bg: '#111111', class: 'stage-backdrop-dark' },
    { id: 'wallpaper', name: tr('bg_wallpaper', 'Wallpaper HD'), bg: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")', class: 'stage-backdrop-wallpaper' },
    { id: 'custom', name: tr('bg_custom', 'Personnalisé'), bg: studioCustomBg, class: 'stage-backdrop-custom' },
  ];

  const currentEffect = effect;

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
  const isDarkCanvas =
    backdropId === 'dark' ||
    backdropId === 'wallpaper' ||
    (backdropId === 'custom' && (studioCustomBg.toLowerCase() === '#111111' || isColorDark(studioCustomBg)));
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
            {/* Sidebar Navigation Tabs */}
            <div className="sandbox-sidebar-tabs">
              <button
                type="button"
                className={`sandbox-tab-btn ${activeSidebarTab === 'controls' ? 'is-active' : ''}`}
                onClick={() => setActiveSidebarTab('controls')}
              >
                <SlidersHorizontal size={14} />
                <span>{tr('studio_tab_controls', 'Réglages')}</span>
              </button>
              <button
                type="button"
                className={`sandbox-tab-btn ${activeSidebarTab === 'css' ? 'is-active' : ''}`}
                onClick={() => setActiveSidebarTab('css')}
              >
                <Code size={14} />
                <span>{tr('studio_tab_css', 'Éditeur CSS')}</span>
                {customCssCode !== (currentEffect?.cssCode || '') && (
                  <span className="tab-modified-dot" title="Modifié" />
                )}
              </button>
            </div>

            {activeSidebarTab === 'controls' ? (
              <div className="sandbox-tab-content-controls">
                {/* 1. Animation Speed Slider */}
                <div className="control-card">
                  <div className="control-card-header">
                    <SlidersHorizontal size={16} />
                    <span>{tr('anim_speed_title', 'Vitesse d\'animation')}</span>
                    <div className="speed-input-container" title="Cliquez ou utilisez les flèches pour modifier">
                      <input
                        type="text"
                        className="speed-val-input"
                        value={speedInputText}
                        onChange={handleSpeedInputChange}
                        onBlur={handleSpeedInputBlur}
                        onKeyDown={handleSpeedKeyDown}
                        aria-label="Vitesse d'animation en secondes"
                      />
                      <span className="speed-val-unit">s</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.05"
                    value={animSpeed}
                    onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
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
                        {bd.id === 'custom' && (
                          <span
                            className="bd-swatch"
                            style={{ backgroundColor: studioCustomBg }}
                          />
                        )}
                        <span className="bd-name">{bd.name}</span>
                      </button>
                    ))}
                  </div>

                  {backdropId === 'custom' && (
                    <div className="custom-backdrop-picker-row">
                      <CustomColorPicker
                        color={studioCustomBg}
                        onChange={(newColor) => setStudioCustomBg(newColor)}
                        popoverPosition="right"
                      />
                    </div>
                  )}
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
                    onChange={handleColorChange}
                    popoverPosition="right"
                  />
                </div>
              </div>
            ) : (
              /* Full-height Live CSS Editor Tab */
              <div className="sandbox-tab-content-css">
                <div className="control-card full-css-card">
                  <div className="control-card-header">
                    <Code size={16} />
                    <span>{tr('live_css_title', 'Éditeur CSS en direct')}</span>
                    <div className="css-header-actions">
                      <button
                        type="button"
                        className={`css-action-btn ${isSaved ? 'is-saved' : ''}`}
                        onClick={handleSaveCss}
                        title={isSaved ? tr('saved', 'Enregistré !') : tr('save_css', 'Enregistrer le CSS')}
                      >
                        {isSaved ? <Check size={14} weight="bold" /> : <FloppyDisk size={14} />}
                      </button>
                      <button
                        type="button"
                        className="css-action-btn"
                        onClick={handleResetCss}
                        title={tr('reset_css', 'Réinitialiser le CSS')}
                      >
                        <ArrowCounterClockwise size={14} />
                      </button>
                      <button
                        type="button"
                        className={`css-action-btn ${isCopiedCss ? 'is-copied' : ''}`}
                        onClick={handleCopyCss}
                        title={isCopiedCss ? 'Copié !' : 'Copier le CSS'}
                      >
                        {isCopiedCss ? <Check size={14} weight="bold" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {feedbackToast && (
                    <div className={`css-feedback-banner ${feedbackToast.type}`}>
                      <span>{feedbackToast.text}</span>
                    </div>
                  )}

                  <div className="css-editor-wrapper">
                    <textarea
                      className="live-css-editor full-height"
                      value={customCssCode}
                      onChange={(e) => handleCssCodeChange(e.target.value)}
                      placeholder="CSS..."
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Stage Panel */}
          <div className="sandbox-stage-panel">
            <div
              className={`sandbox-preview-stage ${currentBackdrop.class} ${canvasThemeClass}`}
              style={
                backdropId === 'wallpaper'
                  ? { backgroundImage: currentBackdrop.bg }
                  : backdropId === 'custom'
                  ? { backgroundColor: studioCustomBg }
                  : { background: currentBackdrop.bg }
              }
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
