import React, { useState, useEffect, useRef } from 'react';
import { Eyedropper, Check, Copy, CaretDown, X } from '@phosphor-icons/react';

// Helper: Convert Hex string to HSV object
function hexToHsv(hex) {
  let c = (hex || '#E6332A').replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  if (c.length !== 6) return { h: 0, s: 100, v: 90 };

  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((d / max) * 100);
  const v = Math.round(max * 100);

  return { h, s, v };
}

// Helper: Convert HSV to Hex string
function hsvToHex(h, s, v) {
  const sFrac = Math.max(0, Math.min(100, s)) / 100;
  const vFrac = Math.max(0, Math.min(100, v)) / 100;
  const c = vFrac * sFrac;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vFrac - c;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h <= 360) { r = c; g = 0; b = x; }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`.toUpperCase();
}

// Popular extra palette suggestions
const QUICK_PALETTE = [
  '#E6332A', '#F6E81D', '#FFFFFF', '#18181B',
  '#2563EB', '#10B981', '#8B5CF6', '#F97316',
  '#EC4899', '#06B6D4', '#64748B', '#D97706'
];

export default function CustomColorPicker({ color = '#E6332A', onChange, popoverPosition = 'bottom' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hexInput, setHexInput] = useState(color);
  const [popoverCoords, setPopoverCoords] = useState({ top: 0, left: 0 });
  
  const containerRef = useRef(null);
  const triggerBtnRef = useRef(null);
  const popoverRef = useRef(null);
  const satValRef = useRef(null);
  const nativeInputRef = useRef(null);

  const hsv = hexToHsv(color);

  // Sync hex text when external color changes
  useEffect(() => {
    setHexInput(color);
  }, [color]);

  // Dynamic positioning calculation & flip detection
  const [placement, setPlacement] = useState(popoverPosition);
  const [isMobileScreen, setIsMobileScreen] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const updateCoords = () => {
        const targetEl = triggerBtnRef.current || containerRef.current;
        if (!targetEl) return;
        const rect = targetEl.getBoundingClientRect();
        
        if (popoverPosition === 'right') {
          setPopoverCoords({
            top: rect.top + rect.height / 2,
            left: rect.right + 10,
          });
        } else {
          // Auto flip top if near bottom
          const spaceBelow = window.innerHeight - rect.bottom;
          if (spaceBelow < 340 && rect.top > 340) {
            setPlacement('top');
          } else {
            setPlacement('bottom');
          }
        }
      };
      updateCoords();
      window.addEventListener('resize', updateCoords);
      window.addEventListener('scroll', updateCoords, true);
      return () => {
        window.removeEventListener('resize', updateCoords);
        window.removeEventListener('scroll', updateCoords, true);
      };
    }
  }, [isOpen, popoverPosition]);

  // Outside click listener to close popover
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        (!popoverRef.current || !popoverRef.current.contains(e.target))
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Saturation/Value 2D Area dragging
  const updateSatValFromMouseEvent = (e) => {
    if (!satValRef.current) return;
    const rect = satValRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);

    const newHex = hsvToHex(hsv.h, s, v);
    onChange(newHex);
  };

  const handleSatValMouseDown = (e) => {
    e.preventDefault();
    updateSatValFromMouseEvent(e);

    const onMouseMove = (moveEvent) => {
      updateSatValFromMouseEvent(moveEvent);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Saturation/Value 2D Area touch dragging (Mobile/Tablet)
  const updateSatValFromTouchEvent = (e) => {
    if (!satValRef.current || !e.touches || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = satValRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top));

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);

    const newHex = hsvToHex(hsv.h, s, v);
    onChange(newHex);
  };

  const handleSatValTouchStart = (e) => {
    e.preventDefault();
    updateSatValFromTouchEvent(e);

    const onTouchMove = (moveEvent) => {
      moveEvent.preventDefault();
      updateSatValFromTouchEvent(moveEvent);
    };

    const onTouchEnd = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
  };

  // Hue Slider Change
  const handleHueChange = (e) => {
    const newHue = parseInt(e.target.value, 10);
    const newHex = hsvToHex(newHue, hsv.s, hsv.v);
    onChange(newHex);
  };

  // Hex Text input change
  const handleHexInputChange = (e) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#?[0-9A-Fa-f]{6}$/.test(val)) {
      const formatted = val.startsWith('#') ? val.toUpperCase() : `#${val.toUpperCase()}`;
      onChange(formatted);
    }
  };

  // Copy hex code to clipboard
  const handleCopyHex = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  // Eyedropper API
  const handleEyeDropper = async () => {
    if (window.EyeDropper) {
      try {
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          onChange(result.sRGBHex.toUpperCase());
        }
      } catch (err) {
        // User canceled eyedropper picker
      }
    } else if (nativeInputRef.current) {
      nativeInputRef.current.click();
    }
  };

  // 2D handle position percentage
  const handleLeftPercent = hsv.s;
  const handleTopPercent = 100 - hsv.v;

  return (
    <div className="custom-color-picker-container" ref={containerRef}>
      {/* Trigger Button */}
      <button
        ref={triggerBtnRef}
        type="button"
        className={`custom-color-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Ouvrir le sélecteur de couleur sur mesure"
      >
        <span
          className="color-trigger-swatch"
          style={{ backgroundColor: color }}
        />
        <span className="color-trigger-hex">{color}</span>
        <CaretDown size={12} className="color-trigger-caret" />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <>
          {isMobileScreen && (
            <div
              className="color-popover-backdrop"
              onClick={() => setIsOpen(false)}
            />
          )}
          <div
            ref={popoverRef}
            className={`color-popover-card pos-${placement} ${isMobileScreen ? 'is-mobile-modal' : ''}`}
            style={
              isMobileScreen
                ? {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 100000,
                  }
                : popoverPosition === 'right'
                ? {
                    position: 'fixed',
                    top: `${popoverCoords.top}px`,
                    left: `${popoverCoords.left}px`,
                    transform: 'translateY(-50%)',
                    zIndex: 9999,
                  }
                : undefined
            }
          >
          <div className="color-popover-header">
            <span className="color-popover-title">Choix de Couleur</span>
            <button
              type="button"
              className="color-popover-close"
              onClick={() => setIsOpen(false)}
              title="Fermer"
            >
              <X size={14} />
            </button>
          </div>

          {/* 2D Saturation / Brightness Field */}
          <div
            className="sat-val-picker"
            ref={satValRef}
            onMouseDown={handleSatValMouseDown}
            onTouchStart={handleSatValTouchStart}
            style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
          >
            <div className="sat-val-white-overlay" />
            <div className="sat-val-black-overlay" />
            <div
              className="sat-val-handle"
              style={{
                left: `${handleLeftPercent}%`,
                top: `${handleTopPercent}%`,
                backgroundColor: color,
              }}
            />
          </div>

          {/* Hue Slider */}
          <div className="hue-slider-wrap">
            <input
              type="range"
              min="0"
              max="360"
              value={hsv.h}
              onChange={handleHueChange}
              className="hue-slider-range"
            />
          </div>

          {/* Input & Actions bar */}
          <div className="color-actions-bar">
            <div className="hex-input-wrap">
              <span className="hex-prefix">#</span>
              <input
                type="text"
                className="hex-text-field"
                value={hexInput.replace('#', '')}
                onChange={handleHexInputChange}
                maxLength={6}
                spellCheck="false"
              />
            </div>

            <button
              type="button"
              className="color-action-btn"
              onClick={handleCopyHex}
              title="Copier le code HEX"
            >
              {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
            </button>

            <button
              type="button"
              className="color-action-btn"
              onClick={handleEyeDropper}
              title="Tétine / Pipette de couleur"
            >
              <Eyedropper size={14} />
            </button>

            {/* Fallback hidden native color picker */}
            <input
              type="color"
              ref={nativeInputRef}
              value={color}
              onChange={(e) => onChange(e.target.value.toUpperCase())}
              style={{ display: 'none' }}
            />
          </div>

          {/* Quick Palette Swatches */}
          <div className="quick-palette-grid">
            {QUICK_PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                className={`quick-swatch ${color.toUpperCase() === c ? 'active' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => onChange(c)}
                title={c}
              />
            ))}
          </div>
        </div>
        </>
      )}
    </div>
  );
}
