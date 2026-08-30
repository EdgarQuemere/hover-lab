import React, { useState } from 'react';
import { X, Copy, Check } from '@phosphor-icons/react';
import {
  generateHtmlSnippet,
  generateVanillaCss,
  generateTailwindCss,
  generateReactFramerMotion,
  generateDesignTokens,
} from '../utils/exportUtils';

export default function CodeModal({ effect, config, onClose, t }) {
  const tr = t || ((k) => k);
  const [activeTab, setActiveTab] = useState('css'); // 'css' | 'tailwind' | 'react' | 'tokens'
  const [copiedType, setCopiedType] = useState(null);

  if (!effect) return null;

  const htmlSnippet = generateHtmlSnippet(effect, config);
  const vanillaCss = generateVanillaCss(effect, config);
  const tailwindCss = generateTailwindCss(effect, config);
  const reactFramer = generateReactFramerMotion(effect, config);
  const designTokens = generateDesignTokens(effect, config);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const cleanTitle = (effect.name || '').replace(/^\d+\.\s*/, '');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">#{effect.id} {cleanTitle}</h2>
            <p className="modal-subtitle">{tr('code_modal_subtitle', 'Code prêt à l\'emploi pour vos projets')}</p>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Multi-Format Export Tabs */}
        <div className="modal-format-tabs">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'css' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            Vanilla HTML / CSS
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'tailwind' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('tailwind')}
          >
            Tailwind CSS
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'react' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('react')}
          >
            React / Framer Motion
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'tokens' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            Design Tokens (JSON)
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'css' ? (
            <>
              {/* 1. HTML Markup Block */}
              <div className="code-block" style={{ marginBottom: '14px' }}>
                <div className="code-block-header">
                  <span className="code-lang">1. HTML Markup</span>
                  <button
                    type="button"
                    className="copy-snippet-btn"
                    onClick={() => handleCopy(htmlSnippet, 'html')}
                  >
                    {copiedType === 'html' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedType === 'html' ? tr('copied', 'Copié !') : tr('copy_html', 'Copier l\'HTML')}</span>
                  </button>
                </div>
                <pre className="code-content" style={{ maxHeight: '140px' }}>{htmlSnippet}</pre>
              </div>

              {/* 2. CSS Stylesheet Block */}
              <div className="code-block">
                <div className="code-block-header">
                  <span className="code-lang">2. CSS Stylesheet (Base + Effet)</span>
                  <button
                    type="button"
                    className="copy-snippet-btn"
                    onClick={() => handleCopy(vanillaCss, 'css')}
                  >
                    {copiedType === 'css' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedType === 'css' ? tr('copied', 'Copié !') : tr('copy_css', 'Copier le CSS')}</span>
                  </button>
                </div>
                <pre className="code-content" style={{ maxHeight: '280px' }}>{vanillaCss}</pre>
              </div>
            </>
          ) : (
            <div className="code-block">
              <div className="code-block-header">
                <span className="code-lang">
                  {activeTab === 'tailwind' && 'Tailwind CSS v3/v4'}
                  {activeTab === 'react' && 'React Component'}
                  {activeTab === 'tokens' && 'Design Tokens'}
                </span>
                <button
                  type="button"
                  className="copy-snippet-btn"
                  onClick={() => {
                    const snippet = activeTab === 'tailwind' ? tailwindCss : activeTab === 'react' ? reactFramer : designTokens;
                    handleCopy(snippet, activeTab);
                  }}
                >
                  {copiedType === activeTab ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedType === activeTab ? tr('copied', 'Copié !') : 'Copier le code'}</span>
                </button>
              </div>
              <pre className="code-content">
                {activeTab === 'tailwind' && tailwindCss}
                {activeTab === 'react' && reactFramer}
                {activeTab === 'tokens' && designTokens}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
