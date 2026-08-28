import React, { useState } from 'react';
import { X, Copy, Check } from '@phosphor-icons/react';
import {
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

  const vanillaCss = generateVanillaCss(effect, config);
  const tailwindCss = generateTailwindCss(effect, config);
  const reactFramer = generateReactFramerMotion(effect, config);
  const designTokens = generateDesignTokens(effect, config);

  const getCodeSnippet = () => {
    switch (activeTab) {
      case 'tailwind':
        return tailwindCss;
      case 'react':
        return reactFramer;
      case 'tokens':
        return designTokens;
      case 'css':
      default:
        return vanillaCss;
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const cleanTitle = (effect.name || '').replace(/^\d+\.\s*/, '');
  const currentSnippet = getCodeSnippet();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">#{effect.id} {cleanTitle}</h2>
            <p className="modal-subtitle">{tr('code_modal_subtitle')}</p>
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
            Vanilla CSS
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
          <div className="code-block">
            <div className="code-block-header">
              <span className="code-lang">
                {activeTab === 'css' && 'Vanilla CSS'}
                {activeTab === 'tailwind' && 'Tailwind CSS v3/v4'}
                {activeTab === 'react' && 'React Component'}
                {activeTab === 'tokens' && 'Design Tokens'}
              </span>
              <button
                type="button"
                className="copy-snippet-btn"
                onClick={() => handleCopy(currentSnippet, activeTab)}
              >
                {copiedType === activeTab ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedType === activeTab ? tr('copied') : 'Copier le code'}</span>
              </button>
            </div>
            <pre className="code-content">{currentSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
