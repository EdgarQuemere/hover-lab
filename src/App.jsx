import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import HoverCard from './components/HoverCard';
import CodeModal from './components/CodeModal';
import FocusSandbox from './components/FocusSandbox';
import { HOVER_EFFECTS } from './data/hoverEffects';
import { getTranslation, getTranslatedEffect } from './data/translations';
import './styles/hovers.css';
import './App.css';

const DEFAULT_CONFIG = {
  buttonText: 'Filters',
  fontFamily: 'font-satoshi',
  iconName: 'ArrowRight',
  iconPosition: 'right',
  iconWeight: 'regular',
  borderRadiusValue: 999,
  buttonSize: 'md',
  canvasTheme: 'light',
  filterCategory: 'all',
  buttonColor: '#e6332a',
  cardBgColor: '#eeeeee',
};

const EFFECT_CATEGORY_MAP = {
  1: 'fills',
  2: 'motion',
  3: 'borders',
  4: 'fills',
  5: 'motion',
  6: 'motion',
  7: 'borders',
  8: 'motion',
  9: 'fx',
  10: 'motion',
  11: 'borders',
  12: 'fills',
  13: 'fx',
  14: 'fills',
  15: 'fills',
  16: 'borders',
  17: 'borders',
  18: 'fx',
  19: 'motion',
  20: 'fills',
  21: 'fx',
  22: 'borders',
  23: 'borders',
};

export default function App() {
  const [lang, setLang] = useState('en'); // Default language is English
  const [searchQuery, setSearchQuery] = useState('');
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [activeModalEffect, setActiveModalEffect] = useState(null);
  const [activeStudioEffect, setActiveStudioEffect] = useState(null);
  const [autoPlayMode, setAutoPlayMode] = useState('fast'); // 'off' | 'slow' | 'fast'
  const [autoHoveredIds, setAutoHoveredIds] = useState(new Set());
  const userHoveredRef = useRef(new Set());

  const t = (key, params) => getTranslation(lang, key, params);

  // Sync default buttonText when language changes if user hasn't typed custom text
  const handleLangChange = (newLang) => {
    const oldDefault = getTranslation(lang, 'default_button_text');
    const newDefault = getTranslation(newLang, 'default_button_text');
    if (!config.buttonText || config.buttonText === oldDefault) {
      setConfig((prev) => ({ ...prev, buttonText: newDefault }));
    }
    setLang(newLang);
  };

  // Apply canvas theme to body, keep site font fixed on font-satoshi
  useEffect(() => {
    document.body.className = `font-satoshi ${config.canvasTheme === 'dark' ? 'theme-dark' : 'theme-light'}`;
  }, [config.canvasTheme]);

  const translatedEffects = HOVER_EFFECTS.map((eff) => getTranslatedEffect(eff, lang));

  const filteredEffects = translatedEffects.filter((effect) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = effect.name ? effect.name.toLowerCase().includes(q) : false;
      const matchDesc = effect.description ? effect.description.toLowerCase().includes(q) : false;
      const matchCat = effect.category ? effect.category.toLowerCase().includes(q) : false;
      const matchClass = effect.className ? effect.className.toLowerCase().includes(q) : false;
      if (!matchName && !matchDesc && !matchCat && !matchClass) return false;
    }

    // Category filter using new 4-category taxonomy
    if (config.filterCategory && config.filterCategory !== 'all') {
      const cat = EFFECT_CATEGORY_MAP[effect.id];
      if (cat !== config.filterCategory) return false;
    }
    return true;
  });

  // Random auto-hover interval loop (configurable mode: off / slow / fast)
  useEffect(() => {
    if (activeModalEffect || activeStudioEffect || autoPlayMode === 'off') {
      setAutoHoveredIds(new Set());
      return;
    }

    const intervalMs = autoPlayMode === 'slow' ? 2400 : 350;
    const durationMs = autoPlayMode === 'slow' ? 1800 : 1200;

    const interval = setInterval(() => {
      setAutoHoveredIds((prev) => {
        const available = filteredEffects.filter(
          (e) => !userHoveredRef.current.has(e.id) && !prev.has(e.id)
        );
        if (available.length === 0) return prev;

        const randomEffect = available[Math.floor(Math.random() * available.length)];
        const targetId = randomEffect.id;

        setTimeout(() => {
          setAutoHoveredIds((currentSet) => {
            if (!currentSet.has(targetId)) return currentSet;
            const next = new Set(currentSet);
            next.delete(targetId);
            return next;
          });
        }, durationMs);

        return new Set(prev).add(targetId);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [filteredEffects, activeModalEffect, activeStudioEffect, autoPlayMode]);

  const handleUserHoverStart = (id) => {
    userHoveredRef.current.add(id);
    setAutoHoveredIds((prev) => {
      if (prev.has(id)) {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }
      return prev;
    });
  };

  const handleUserHoverEnd = (id) => {
    userHoveredRef.current.delete(id);
  };

  const [targetedEffectId, setTargetedEffectId] = useState(null);

  // Handle direct link URL hash auto-scroll & highlight (#effect-3 or #3)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const rawId = hash.replace('#effect-', '').replace('#', '');
      const parsedId = parseInt(rawId, 10);
      if (isNaN(parsedId)) return;

      setTimeout(() => {
        const el = document.getElementById(`effect-${parsedId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTargetedEffectId(parsedId);
          setTimeout(() => setTargetedEffectId(null), 2800);
        }
      }, 350);
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const [overrideModalConfig, setOverrideModalConfig] = useState(null);

  return (
    <div className="app-container font-satoshi">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonColor={config.buttonColor}
        canvasTheme={config.canvasTheme}
        lang={lang}
        setLang={handleLangChange}
        autoPlayMode={autoPlayMode}
        setAutoPlayMode={setAutoPlayMode}
        t={t}
      />

      <ControlsBar config={config} onChange={setConfig} t={t} lang={lang} />

      <main className="main-content">
        {filteredEffects.length > 0 ? (
          <div className="specimen-grid">
            {filteredEffects.map((effect) => (
              <HoverCard
                key={effect.id}
                effect={effect}
                config={config}
                onOpenCode={(eff) => {
                  setActiveModalEffect(eff);
                  setOverrideModalConfig(null);
                }}
                onOpenStudio={(eff) => setActiveStudioEffect(eff)}
                t={t}
                isAutoHovered={autoHoveredIds.has(effect.id)}
                isTargeted={targetedEffectId === effect.id}
                onUserHoverStart={handleUserHoverStart}
                onUserHoverEnd={handleUserHoverEnd}
              />
            ))}
          </div>
        ) : (
          <div className="empty-search-state">
            <p className="empty-search-title">{t('no_results_title', { query: searchQuery })}</p>
            <p className="empty-search-desc">{t('no_results_desc')}</p>
            <button className="reset-search-btn" onClick={() => setSearchQuery('')}>
              {t('reset_search')}
            </button>
          </div>
        )}
      </main>

      {activeModalEffect && (
        <CodeModal
          effect={activeModalEffect}
          config={overrideModalConfig || config}
          onClose={() => {
            setActiveModalEffect(null);
            setOverrideModalConfig(null);
          }}
          t={t}
        />
      )}

      {activeStudioEffect && (
        <FocusSandbox
          effect={activeStudioEffect}
          config={config}
          onClose={() => setActiveStudioEffect(null)}
          onOpenCode={(eff, customConfig) => {
            setActiveModalEffect(eff);
            setOverrideModalConfig(customConfig || null);
          }}
          t={t}
        />
      )}
    </div>
  );
}
