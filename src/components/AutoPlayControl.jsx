import React from 'react';
import { Play, Pause, Lightning } from '@phosphor-icons/react';

export default function AutoPlayControl({ mode = 'fast', onChangeMode, t }) {
  const tr = (key, fallback) => (t ? t(key) : fallback);

  return (
    <div className="autoplay-control-container">
      <button
        type="button"
        className={`autoplay-btn ${mode === 'off' ? 'is-active' : ''}`}
        onClick={() => onChangeMode('off')}
        title={tr('auto_off_title', 'Disable auto-demo / Pause')}
      >
        <Pause size={12} weight="bold" />
        <span>{tr('auto_off', 'OFF')}</span>
      </button>
      <button
        type="button"
        className={`autoplay-btn ${mode === 'slow' ? 'is-active' : ''}`}
        onClick={() => onChangeMode('slow')}
        title={tr('auto_slow_title', 'Gentle auto-demo (2.4s)')}
      >
        <Play size={12} weight="bold" />
        <span>{tr('auto_slow', 'Slow')}</span>
      </button>
      <button
        type="button"
        className={`autoplay-btn ${mode === 'fast' ? 'is-active' : ''}`}
        onClick={() => onChangeMode('fast')}
        title={tr('auto_fast_title', 'Fast auto-demo (350ms)')}
      >
        <Lightning size={12} weight="fill" />
        <span>{tr('auto_fast', 'Fast')}</span>
      </button>
    </div>
  );
}
