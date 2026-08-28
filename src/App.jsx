import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import HoverCard from './components/HoverCard';
import CodeModal from './components/CodeModal';
import FocusSandbox from './components/FocusSandbox';
import { HOVER_EFFECTS } from './data/hoverEffects';
import { getTranslation, getTranslatedEffect } from './data/translations';
import './styles/hovers.css';
import './App.css';

const CARDS_PER_PAGE = 24;

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
  24: 'fills',
  25: 'fx',
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

  const translatedEffects = useMemo(
    () => HOVER_EFFECTS.map((eff) => getTranslatedEffect(eff, lang)),
    [lang]
  );

  const filteredEffects = useMemo(() => {
    return translatedEffects.filter((effect) => {
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
  }, [translatedEffects, searchQuery, config.filterCategory]);


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

  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  // Reset pagination when search or category filter changes
  useEffect(() => {
    setVisibleCount(CARDS_PER_PAGE);
  }, [searchQuery, config.filterCategory]);

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

  const [pendingScrollId, setPendingScrollId] = useState(null);
  const [targetedEffectId, setTargetedEffectId] = useState(null);

  // 1. Listen for URL hash changes (#effect-25 or #25) and expand pagination
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const rawId = hash.replace('#effect-', '').replace('#', '');
      const parsedId = parseInt(rawId, 10);
      if (isNaN(parsedId)) return;

      const targetIndex = filteredEffects.findIndex((e) => e.id === parsedId);
      if (targetIndex >= 0) {
        // Expand pagination limit so the card is rendered in the DOM
        const requiredLimit = Math.ceil((targetIndex + 1) / CARDS_PER_PAGE) * CARDS_PER_PAGE;
        setVisibleCount((prev) => Math.max(prev, requiredLimit));

        // Queue pending scroll target
        setPendingScrollId(parsedId);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, [filteredEffects]);

  // 2. Perform smooth scroll ONLY when the target element exists in the DOM
  useEffect(() => {
    if (!pendingScrollId) return;

    const targetId = pendingScrollId;
    setPendingScrollId(null); // Clear pending scroll so it only runs once!

    const scrollTimer = setTimeout(() => {
      const el = document.getElementById(`effect-${targetId}`);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + window.pageYOffset;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - viewportHeight);

      const targetIndex = filteredEffects.findIndex((e) => e.id === targetId);
      const isLast3Cards = targetIndex >= 0 && targetIndex >= filteredEffects.length - 3;

      let targetY;
      if (isLast3Cards) {
        // If it's among the last 3 cards, scroll all the way to the bottom of the page
        targetY = maxScrollY;
      } else {
        // Otherwise, center the card in the viewport
        targetY = elementTop - (viewportHeight - elementHeight) / 2;
        if (targetY > maxScrollY) targetY = maxScrollY;
        if (targetY < 0) targetY = 0;
      }

      window.scrollTo({ top: targetY, behavior: 'smooth' });
      setTargetedEffectId(targetId);

      setTimeout(() => {
        setTargetedEffectId(null);
      }, 2800);
    }, 150);

    return () => clearTimeout(scrollTimer);
  }, [pendingScrollId, visibleCount, filteredEffects]);

  const [overrideModalConfig, setOverrideModalConfig] = useState(null);

  const visibleEffects = filteredEffects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEffects.length;

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
          <>
            <div className="specimen-grid">
              {visibleEffects.map((effect) => (
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

            {hasMore && (
              <div className="load-more-section">
                <p className="load-more-info">
                  {t('showing_x_of_y', { count: visibleEffects.length, total: filteredEffects.length })}
                </p>
                <button
                  type="button"
                  className="load-more-btn"
                  onClick={() => setVisibleCount((prev) => prev + CARDS_PER_PAGE)}
                >
                  <span>{t('load_more')}</span>
                  <CaretDown size={16} weight="bold" />
                </button>
              </div>
            )}
          </>
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
