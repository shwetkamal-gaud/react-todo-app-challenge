import * as React from 'react';
import './checkbox.scss';

export const Checkbox = ({
  onClick, checked, onDelete, label, onKeyUp, onEdit,
}) => (
  <div className="checkbox">
    <div
      className="checkbox-content"
    >
      <input type="checkbox" checked={checked} onChange={onClick} />
      <span className={checked ? 'checkbox-checked' : ''}>{label}</span>
    </div>
    <div className="checkbox-buttons">
      <button type="button" className="checkbox-delete" onClick={onDelete}>
        <img src="/close.svg" alt="close" width={20} height={20} />
      </button>
      <button type="button" className="checkbox-delete" onClick={onEdit}>
        <img src="/edit.svg" alt="close" width={20} height={20} />
      </button>
    </div>
  </div>
);
