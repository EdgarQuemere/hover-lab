import React from 'react';
import { Play, Pause, Lightning } from '@phosphor-icons/react';

export default function AutoPlayControl({ mode = 'fast', onChangeMode }) {
  return (
    <div className="autoplay-control-container">
      <button
        type="button"
        className={`autoplay-btn ${mode === 'off' ? 'is-active' : ''}`}
        onClick={() => onChangeMode('off')}
        title="Désactiver la démo automatique / Pause"
      >
        <Pause size={12} weight="bold" />
        <span>OFF</span>
      </button>
      <button
        type="button"
        className={`autoplay-btn ${mode === 'slow' ? 'is-active' : ''}`}
        onClick={() => onChangeMode('slow')}
        title="Démo automatique douce (2.4s)"
      >
        <Play size={12} weight="bold" />
        <span>Slow</span>
      </button>
      <button
        type="button"
        className={`autoplay-btn ${mode === 'fast' ? 'is-active' : ''}`}
        onClick={() => onChangeMode('fast')}
        title="Démo automatique rapide (350ms)"
      >
        <Lightning size={12} weight="fill" />
        <span>Fast</span>
      </button>
    </div>
  );
}
