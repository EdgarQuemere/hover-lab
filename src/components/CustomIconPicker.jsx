import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, Check, ArrowRight } from '@phosphor-icons/react';

export default function CustomIconPicker({ icons = [], selectedId, onChange, iconWeight = 'regular' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedIconObj = icons.find((item) => item.id === selectedId) || icons[0] || {
    id: 'ArrowRight',
    label: 'Flèche Droite',
    Icon: ArrowRight
  };
  const SelectedIcon = selectedIconObj.Icon || ArrowRight;

  // Close dropdown menu on click outside
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

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div className="custom-icon-picker-container" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className={`custom-icon-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Choisir une icône avec aperçu visuel"
      >
        <div className="trigger-icon-preview">
          <SelectedIcon size={18} weight={iconWeight} />
        </div>
        <span className="trigger-icon-label">{selectedIconObj.label}</span>
        <CaretDown size={14} className="trigger-caret" />
      </button>

      {/* Custom Dropdown List with Icon Previews */}
      {isOpen && (
        <div className="icon-dropdown-menu">
          <div className="icon-dropdown-list">
            {icons.map((item) => {
              const ItemIcon = item.Icon;
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`icon-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(item.id)}
                >
                  <div className="item-icon-box">
                    <ItemIcon size={18} weight={iconWeight} />
                  </div>
                  <span className="item-icon-label">{item.label}</span>
                  {isSelected && <Check size={14} className="item-check-mark" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
