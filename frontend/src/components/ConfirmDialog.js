import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ open, title = 'Confirm', message, onCancel, onConfirm, confirmLabel = 'Yes', cancelLabel = 'Cancel' }) => {
  if (!open) return null;
  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="confirm-dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-outline" onClick={onCancel}>{cancelLabel}</button>
          <button className="btn-danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
