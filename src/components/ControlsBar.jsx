import React from 'react';
import CustomColorPicker from './CustomColorPicker';
import CustomIconPicker from './CustomIconPicker';
import CustomCategoryPicker from './CustomCategoryPicker';
import {
  TextT,
  CirclesThreePlus,
  ArrowRight,
  Sparkle,
  Lightning,
  Compass,
  Plus,
  ShoppingBag,
  Heart,
  PaperPlane,
  Lock,
  Code,
  Star,
  Globe,
  Download,
  Check,
  Cursor,
  Sun,
  Moon,
  SelectionAll,
  TextAa,
  CornersOut,
  BoundingBox,
  Palette,
  Browsers,
  SquaresFour,
  NavigationArrow
} from '@phosphor-icons/react';

export const getPresetColors = (canvasTheme = 'light') => [
  { name: 'Rouge Logo', color: '#e6332a' },
  { name: 'Jaune Logo', color: '#f6e81d' },
  { name: canvasTheme === 'dark' ? 'Blanc Pure' : 'Anthracite', color: canvasTheme === 'dark' ? '#ffffff' : '#18181b' },
  { name: 'Bleu Électrique', color: '#2563eb' },
  { name: 'Vert Émeraude', color: '#10b981' },
  { name: 'Violet Neon', color: '#8b5cf6' },
  { name: 'Sunset Orange', color: '#f97316' },
];

export const CARD_BG_PRESETS = [
  { name: 'Fond Clair (#EEEEEE)', color: '#eeeeee' },
  { name: 'Fond Sombre (#111111)', color: '#111111' },
];

export const PRESET_COLORS = getPresetColors('light');

export const AVAILABLE_ICONS = [
  { id: 'ArrowRight', label: 'Flèche Droite', Icon: ArrowRight },
  { id: 'Sparkle', label: 'Étincelle', Icon: Sparkle },
  { id: 'Lightning', label: 'Éclair', Icon: Lightning },
  { id: 'Compass', label: 'Boussole', Icon: Compass },
  { id: 'Plus', label: 'Plus', Icon: Plus },
  { id: 'ShoppingBag', label: 'Panier', Icon: ShoppingBag },
  { id: 'Heart', label: 'Cœur', Icon: Heart },
  { id: 'PaperPlane', label: 'Avion', Icon: PaperPlane },
  { id: 'Lock', label: 'Cadenas', Icon: Lock },
  { id: 'Code', label: 'Code', Icon: Code },
  { id: 'Star', label: 'Étoile', Icon: Star },
  { id: 'Globe', label: 'Globe', Icon: Globe },
  { id: 'Download', label: 'Télécharger', Icon: Download },
  { id: 'Check', label: 'Valider', Icon: Check },
  { id: 'Cursor', label: 'Curseur', Icon: Cursor },
];

export const AVAILABLE_FONTS = [
  { id: 'font-satoshi', name: 'Satoshi' },
  { id: 'font-inter', name: 'Inter' },
  { id: 'font-space', name: 'Space Grotesk' },
  { id: 'font-instrument', name: 'Instrument Sans' },
  { id: 'font-mono', name: 'JetBrains Mono' },
];

export default function ControlsBar({ config, onChange, t }) {
  const tr = t || ((k) => k);

  const handleInputChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  const translatedIcons = [
    { id: 'ArrowRight', label: tr('icon_arrow_right'), Icon: ArrowRight },
    { id: 'Sparkle', label: tr('icon_sparkle'), Icon: Sparkle },
    { id: 'Lightning', label: tr('icon_lightning'), Icon: Lightning },
    { id: 'Compass', label: tr('icon_compass'), Icon: Compass },
    { id: 'Plus', label: tr('icon_plus'), Icon: Plus },
    { id: 'ShoppingBag', label: tr('icon_shopping_bag'), Icon: ShoppingBag },
    { id: 'Heart', label: tr('icon_heart'), Icon: Heart },
    { id: 'PaperPlane', label: tr('icon_paper_plane'), Icon: PaperPlane },
    { id: 'Lock', label: tr('icon_lock'), Icon: Lock },
    { id: 'Code', label: tr('icon_code'), Icon: Code },
    { id: 'Star', label: tr('icon_star'), Icon: Star },
    { id: 'Globe', label: tr('icon_globe'), Icon: Globe },
    { id: 'Download', label: tr('icon_download'), Icon: Download },
    { id: 'Check', label: tr('icon_check'), Icon: Check },
    { id: 'Cursor', label: tr('icon_cursor'), Icon: Cursor },
  ];

  const translatedCategories = [
    { id: 'all', label: tr('cat_all'), count: 23, Icon: SquaresFour },
    { id: 'fills', label: tr('cat_fills'), count: 6, Icon: Palette },
    { id: 'borders', label: tr('cat_borders'), count: 7, Icon: BoundingBox },
    { id: 'motion', label: tr('cat_motion'), count: 6, Icon: NavigationArrow },
    { id: 'fx', label: tr('cat_fx'), count: 4, Icon: Sparkle },
  ];

  return (
    <div className="controls-bar">
      {/* 1. Button Text */}
      <div className="controls-group main-input-group">
        <label className="control-label">
          <TextT size={14} />
          <span>{tr('button_text_label')}</span>
        </label>
        <input
          type="text"
          className="text-input"
          value={config.buttonText}
          onChange={(e) => handleInputChange('buttonText', e.target.value)}
          placeholder={tr('default_button_text')}
        />
      </div>

      {/* 2. Category Filter Dropdown */}
      <div className="controls-group">
        <label className="control-label">
          <BoundingBox size={14} />
          <span>{tr('category_label')}</span>
        </label>
        <CustomCategoryPicker
          categories={translatedCategories}
          selectedId={config.filterCategory || 'all'}
          onChange={(id) => handleInputChange('filterCategory', id)}
        />
      </div>

      {/* 3. Typography Selector */}
      <div className="controls-group">
        <label className="control-label">
          <TextAa size={14} />
          <span>{tr('typography_label')}</span>
        </label>
        <select
          className="select-input"
          value={config.fontFamily}
          onChange={(e) => handleInputChange('fontFamily', e.target.value)}
        >
          {AVAILABLE_FONTS.map((font) => (
            <option key={font.id} value={font.id}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Phosphor Icon Picker */}
      <div className="controls-group icon-picker-group">
        <label className="control-label">
          <CirclesThreePlus size={14} />
          <span>{tr('icon_label')}</span>
        </label>
        <CustomIconPicker
          icons={translatedIcons}
          selectedId={config.iconName}
          onChange={(id) => handleInputChange('iconName', id)}
          iconWeight={config.iconWeight}
        />
      </div>

      {/* 5. Icon Position */}
      <div className="controls-group">
        <label className="control-label">
          <SelectionAll size={14} />
          <span>{tr('icon_pos_label')}</span>
        </label>
        <div className="button-segmented">
          <button
            className={config.iconPosition === 'left' ? 'active' : ''}
            onClick={() => handleInputChange('iconPosition', 'left')}
          >
            {tr('pos_left')}
          </button>
          <button
            className={config.iconPosition === 'right' ? 'active' : ''}
            onClick={() => handleInputChange('iconPosition', 'right')}
          >
            {tr('pos_right')}
          </button>
          <button
            className={config.iconPosition === 'only' ? 'active' : ''}
            onClick={() => handleInputChange('iconPosition', 'only')}
          >
            {tr('pos_only')}
          </button>
          <button
            className={config.iconPosition === 'none' ? 'active' : ''}
            onClick={() => handleInputChange('iconPosition', 'none')}
          >
            {tr('pos_none')}
          </button>
        </div>
      </div>

      {/* 6. Border Radius Presets + Slider */}
      <div className="controls-group radius-group">
        <label className="control-label">
          <CornersOut size={14} />
          <span>{tr('radius_label')} ({config.borderRadiusValue === 999 ? tr('radius_pill') : `${config.borderRadiusValue}px`})</span>
        </label>
        <div className="radius-control-wrap">
          <div className="button-segmented">
            <button
              className={config.borderRadiusValue === 0 ? 'active' : ''}
              onClick={() => handleInputChange('borderRadiusValue', 0)}
            >
              0px
            </button>
            <button
              className={config.borderRadiusValue === 8 ? 'active' : ''}
              onClick={() => handleInputChange('borderRadiusValue', 8)}
            >
              8px
            </button>
            <button
              className={config.borderRadiusValue === 16 ? 'active' : ''}
              onClick={() => handleInputChange('borderRadiusValue', 16)}
            >
              16px
            </button>
            <button
              className={config.borderRadiusValue === 999 ? 'active' : ''}
              onClick={() => handleInputChange('borderRadiusValue', 999)}
            >
              {tr('radius_pill')}
            </button>
          </div>
          <div className="radius-input-wrap">
            <input
              type="text"
              className="radius-manual-input"
              value={config.borderRadiusValue === 999 ? tr('radius_pill') : config.borderRadiusValue}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const val = e.target.value.trim().toLowerCase();
                if (val === 'pill' || val === 'max' || val === tr('radius_pill').toLowerCase()) {
                  handleInputChange('borderRadiusValue', 999);
                } else {
                  const cleaned = val.replace(/[^0-9]/g, '');
                  if (cleaned === '') {
                    handleInputChange('borderRadiusValue', 0);
                  } else {
                    const num = Math.min(999, Math.max(0, parseInt(cleaned, 10)));
                    handleInputChange('borderRadiusValue', num);
                  }
                }
              }}
            />
            {config.borderRadiusValue !== 999 && <span className="radius-input-unit">px</span>}
          </div>
        </div>
      </div>

      {/* 7. Button Fill Color */}
      <div className="controls-group color-picker-group">
        <label className="control-label">
          <Palette size={14} />
          <span>{tr('button_fill_color_label')}</span>
        </label>
        <div className="color-control-wrap">
          <div className="color-swatches">
            {getPresetColors(config.canvasTheme).map((item) => (
              <button
                key={item.color}
                type="button"
                className={`color-swatch ${config.buttonColor.toLowerCase() === item.color.toLowerCase() ? 'active' : ''}`}
                style={{
                  backgroundColor: item.color,
                  border: item.color.toLowerCase() === '#ffffff' ? '1px solid #d4d4d8' : 'none'
                }}
                onClick={() => handleInputChange('buttonColor', item.color)}
                title={item.name}
              />
            ))}
          </div>
          <CustomColorPicker
            color={config.buttonColor || (config.canvasTheme === 'dark' ? '#ffffff' : '#18181b')}
            onChange={(newColor) => handleInputChange('buttonColor', newColor)}
          />
        </div>
      </div>

      {/* 8. Card Background */}
      <div className="controls-group color-picker-group">
        <label className="control-label">
          <Browsers size={14} />
          <span>{tr('card_bg_label')}</span>
        </label>
        <div className="color-control-wrap">
          <div className="color-swatches">
            {CARD_BG_PRESETS.map((item) => {
              const activeColor = config.cardBgColor || (config.canvasTheme === 'dark' ? '#111111' : '#eeeeee');
              const isSelected = activeColor.toLowerCase() === item.color.toLowerCase();
              return (
                <button
                  key={item.color}
                  type="button"
                  className={`color-swatch ${isSelected ? 'active' : ''}`}
                  style={{
                    backgroundColor: item.color,
                    border: item.color.toLowerCase() === '#eeeeee'
                      ? '1px solid rgba(0, 0, 0, 0.18)'
                      : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onClick={() => {
                    const isDark = item.color.toLowerCase() === '#111111';
                    let nextBtnColor = config.buttonColor;
                    const btnLower = (config.buttonColor || '').toLowerCase();
                    if (isDark && (btnLower === '#18181b' || btnLower === '#000000' || btnLower === '#111111')) {
                      nextBtnColor = '#ffffff';
                    } else if (!isDark && btnLower === '#ffffff') {
                      nextBtnColor = '#18181b';
                    }
                    onChange({
                      ...config,
                      cardBgColor: item.color,
                      canvasTheme: isDark ? 'dark' : 'light',
                      buttonColor: nextBtnColor
                    });
                  }}
                  title={item.color === '#eeeeee' ? tr('card_bg_light') : tr('card_bg_dark')}
                />
              );
            })}
          </div>
          <CustomColorPicker
            color={config.cardBgColor || (config.canvasTheme === 'dark' ? '#111111' : '#eeeeee')}
            onChange={(newColor) => handleInputChange('cardBgColor', newColor)}
          />
        </div>
      </div>
    </div>
  );
}
