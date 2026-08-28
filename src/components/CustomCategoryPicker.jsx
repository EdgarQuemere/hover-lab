import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, Check, SquaresFour } from '@phosphor-icons/react';

export default function CustomCategoryPicker({ categories = [], selectedId = 'all', onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedCategoryObj = categories.find((item) => item.id === selectedId) || categories[0] || {
    id: 'all',
    label: 'Toutes les catégories',
    count: 23,
    Icon: SquaresFour
  };
  const SelectedIcon = selectedCategoryObj.Icon || SquaresFour;

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
        title="Filtrer par catégorie d'effet"
      >
        <div className="trigger-icon-preview">
          <SelectedIcon size={17} weight="bold" />
        </div>
        <span className="trigger-icon-label">
          {selectedCategoryObj.label} ({selectedCategoryObj.count})
        </span>
        <CaretDown size={14} className="trigger-caret" />
      </button>

      {/* Custom Dropdown List */}
      {isOpen && (
        <div className="icon-dropdown-menu">
          <div className="icon-dropdown-list">
            {categories.map((item) => {
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
                    <ItemIcon size={17} weight="bold" />
                  </div>
                  <span className="item-icon-label">
                    {item.label} <span className="item-count-badge">({item.count})</span>
                  </span>
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
