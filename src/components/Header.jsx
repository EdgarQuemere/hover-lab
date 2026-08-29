import React, { forwardRef } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import LanguageSelector from './LanguageSelector';
import AutoPlayControl from './AutoPlayControl';

const Header = forwardRef(function Header({
  searchQuery,
  setSearchQuery,
  buttonColor = '#e6332a',
  canvasTheme = 'light',
  lang = 'en',
  setLang,
  autoPlayMode = 'on',
  setAutoPlayMode,
  t
}, ref) {
  return (
    <header className="header" ref={ref}>
      <div className="header-brand">
        <div className="brand-logo-wrap" title="HoverLab Logo">
          <svg
            id="Calque_2"
            data-name="Calque 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 454.46 357.92"
            className="brand-logo-svg"
          >
            <defs>
              <style>{`
                .cls-1 {
                  fill: #f6e81d;
                  stroke: ${canvasTheme === 'dark' ? '#0a0a0c' : '#ffffff'};
                  stroke-width: 17px;
                  stroke-miterlimit: 10;
                  transition: stroke 0.3s ease;
                }
                .cls-2 {
                  fill: ${canvasTheme === 'dark' ? '#ffffff' : '#000000'};
                  stroke: ${canvasTheme === 'dark' ? '#ffffff' : '#000000'};
                  stroke-width: 5px;
                  stroke-miterlimit: 10;
                  transition: stroke 0.3s ease, fill 0.3s ease;
                }
                .cls-3 {
                  fill: ${buttonColor || '#e6332a'};
                  transition: fill 0.3s ease;
                }
              `}</style>
            </defs>
            <polygon className="cls-2" points="271.06 350.06 242.39 204.56 96.88 175.88 431.97 14.97 271.06 350.06"/>
            <polygon className="cls-1" points="211.3 297.22 182.63 151.72 37.12 123.04 431.97 14.97 211.3 297.22"/>
            <polygon className="cls-3" points="211.3 297.22 182.63 151.72 37.12 123.04 431.97 14.97 211.3 297.22"/>
          </svg>
        </div>
        <div className="brand-text-wrap">
          <h1 className="brand-title">HoverLab</h1>
          <p className="brand-tagline">{t ? t('brand_tagline') : 'Interactive CSS Button Hover Effects Laboratory'}</p>
        </div>
      </div>

      <div className="header-actions">
        <AutoPlayControl mode={autoPlayMode} onChangeMode={setAutoPlayMode} t={t} />
        <LanguageSelector lang={lang} onChangeLang={setLang} />

        <div className="header-search-bar">
          <MagnifyingGlass size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t ? t('search_placeholder') : 'Search an effect...'}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title={t ? t('clear_search') : 'Clear search'}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
