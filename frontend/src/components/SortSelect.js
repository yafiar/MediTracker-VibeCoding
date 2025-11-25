import React, { useState, useRef, useEffect, useCallback } from 'react';
import './SortSelect.css';

// Generic accessible custom dropdown select
// Props: value, onChange, options [{value,label}], placeholder
export default function SortSelect({ value, onChange, options, placeholder = 'Select', ariaLabel = 'Sort select' }) {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const listRef = useRef(null);

  const current = options.find(o => o.value === value);

  const close = useCallback(() => {
    setOpen(false);
    setFocusIndex(-1);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  useEffect(() => {
    if (open && listRef.current) {
      // Focus selected item or first
      const idx = options.findIndex(o => o.value === value);
      setFocusIndex(idx >= 0 ? idx : 0);
    }
  }, [open, value, options]);

  const commit = (opt) => {
    onChange && onChange(opt.value);
    close();
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Space'].includes(e.code) || ['ArrowDown','ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex(i => Math.min(options.length - 1, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex(i => Math.max(0, i - 1));
        break;
      case 'Enter':
      case ' ': // space
        e.preventDefault();
        if (focusIndex >= 0 && options[focusIndex]) commit(options[focusIndex]);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`ss-wrapper ${open ? 'open' : ''}`} ref={wrapperRef} onKeyDown={onKeyDown}>
      <button
        type="button"
        className="ss-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(o => !o)}
      >
        <span className="ss-value">{current ? current.label : placeholder}</span>
        <span className="ss-caret" aria-hidden="true" />
      </button>
      {open && (
        <ul className="ss-menu" role="listbox" ref={listRef}>
          {options.map((opt, idx) => {
            const selected = opt.value === value;
            const focused = idx === focusIndex;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                className={`ss-item ${selected ? 'selected' : ''} ${focused ? 'focused' : ''}`}
                onMouseEnter={() => setFocusIndex(idx)}
                onMouseDown={(e) => { e.preventDefault(); commit(opt); }}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
