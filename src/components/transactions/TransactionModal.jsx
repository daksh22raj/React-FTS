import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const EMPTY_FORM = {
  date: new Date().toISOString().slice(0, 10),
  description: '',
  category: 'Food & Dining',
  type: 'expense',
  amount: '',
};

function makeId() {
  return `txn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function TransactionModal({ existing, onClose }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(
    existing
      ? { ...existing, amount: String(existing.amount) }
      : EMPTY_FORM
  );
  const [error, setError] = useState('');

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) { setError('Description is required'); return; }
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      setError('Enter a valid positive amount'); return;
    }

    const txn = {
      ...form,
      amount: parseFloat(form.amount),
      id: existing ? existing.id : makeId(),
    };

    dispatch({ type: existing ? 'EDIT_TRANSACTION' : 'ADD_TRANSACTION', payload: txn });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {existing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className="btn-ghost btn-icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="txn-description">Description</label>
              <input
                id="txn-description"
                className="form-input"
                type="text"
                placeholder="e.g. Grocery Store"
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="txn-amount">Amount ($)</label>
                <input
                  id="txn-amount"
                  className="form-input"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => set('amount', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="txn-date">Date</label>
                <input
                  id="txn-date"
                  className="form-input date-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="txn-type">Type</label>
                <select
                  id="txn-type"
                  className="form-input"
                  value={form.type}
                  onChange={(e) => set('type', e.target.value)}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="txn-category">Category</label>
                <select
                  id="txn-category"
                  className="form-input"
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div style={{ color: 'var(--expense)', fontSize: '0.8rem', fontWeight: 500 }}>
                ⚠ {error}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" id="modal-save-btn">
              <Save size={14} /> {existing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
