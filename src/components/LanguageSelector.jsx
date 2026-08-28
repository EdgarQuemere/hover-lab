import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, Check } from '@phosphor-icons/react';
import { LANGUAGES } from '../data/translations';

export default function LanguageSelector({ lang = 'en', onChangeLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const activeLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Auto-close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
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

  const handleSelect = (code) => {
    onChangeLang(code);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-container" ref={containerRef}>
      <button
        type="button"
        className={`language-trigger-btn ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Select Language / Changer de langue"
      >
        <span className="lang-flag">{activeLangObj.flag}</span>
        <span className="lang-code-text">{activeLangObj.code.toUpperCase()}</span>
        <CaretDown size={12} className="lang-caret" />
      </button>

      {isOpen && (
        <div className="language-dropdown-menu">
          <div className="language-dropdown-header">
            <span>Language / Langue</span>
          </div>
          <div className="language-dropdown-list">
            {LANGUAGES.map((item) => {
              const isSelected = item.code === lang;
              return (
                <button
                  key={item.code}
                  type="button"
                  className={`language-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(item.code)}
                >
                  <span className="item-flag">{item.flag}</span>
                  <span className="item-label">{item.label}</span>
                  {isSelected && <Check size={14} className="item-check" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
