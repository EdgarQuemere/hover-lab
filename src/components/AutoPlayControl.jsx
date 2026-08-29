import React from 'react';
import { Pause, Play } from '@phosphor-icons/react';

export default function AutoPlayControl({ mode = 'on', onChangeMode, t }) {
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
        className={`autoplay-btn ${mode === 'on' ? 'is-active' : ''}`}
        onClick={() => onChangeMode('on')}
        title={tr('auto_on_title', 'Enable auto-demo')}
      >
        <Play size={12} weight="fill" />
        <span>{tr('auto_on', 'ON')}</span>
      </button>
    </div>
  );
}
