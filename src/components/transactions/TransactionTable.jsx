import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Pencil, Trash2, ArrowUpDown, ChevronUp, ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { filterTransactions } from '../../utils/analytics';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { CATEGORIES, CATEGORY_COLORS } from '../../data/mockData';
import TransactionModal from './TransactionModal';

export default function TransactionTable() {
  const { state, dispatch } = useApp();
  const { transactions, role, filters, sortConfig } = state;
  const isAdmin = role === 'admin';

  const [modalOpen, setModalOpen] = useState(false);
  const [editTxn, setEditTxn] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(
    () => filterTransactions(transactions, filters),
    [transactions, filters]
  );

  const sorted = useMemo(() => {
    const { key, direction } = sortConfig;
    return [...filtered].sort((a, b) => {
      let aVal = a[key]; let bVal = b[key];
      if (key === 'amount') { aVal = Number(aVal); bVal = Number(bVal); }
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortConfig]);

  const setFilter = (payload) => dispatch({ type: 'SET_FILTER', payload });

  const handleSort = (key) => {
    dispatch({
      type: 'SET_SORT',
      payload: {
        key,
        direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
      },
    });
  };

  const SortIcon = ({ col }) => {
    if (sortConfig.key !== col) return <ArrowUpDown size={12} opacity={0.4} />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    setConfirmDelete(null);
  };

  return (
    <>
      <div className="transactions-toolbar">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input
            id="txn-search"
            className="search-input"
            type="text"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={(e) => setFilter({ search: e.target.value })}
          />
        </div>

        <select
          id="filter-type"
          className="filter-select"
          value={filters.type}
          onChange={(e) => setFilter({ type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          id="filter-category"
          className="filter-select"
          value={filters.category}
          onChange={(e) => setFilter({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <input
          id="filter-date-from"
          className="filter-select date-input"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter({ dateFrom: e.target.value })}
          title="From date"
        />

        <input
          id="filter-date-to"
          className="filter-select date-input"
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter({ dateTo: e.target.value })}
          title="To date"
        />

        {(filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.dateFrom || filters.dateTo) && (
          <button
            id="reset-filters-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          >
            Clear
          </button>
        )}

        {isAdmin && (
          <button
            id="add-transaction-btn"
            className="btn btn-primary btn-sm"
            onClick={() => { setEditTxn(null); setModalOpen(true); }}
            style={{ marginLeft: 'auto' }}
          >
            <Plus size={14} /> Add Transaction
          </button>
        )}
      </div>

      <div className="table-wrap">
        <table id="transactions-table">
          <thead>
            <tr>
              {[
                { key: 'date',        label: 'Date' },
                { key: 'description', label: 'Description' },
                { key: 'category',    label: 'Category' },
                { key: 'type',        label: 'Type' },
                { key: 'amount',      label: 'Amount' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="sortable"
                  onClick={() => handleSort(key)}
                >
                  <span className="th-inner">
                    {label} <SortIcon col={key} />
                  </span>
                </th>
              ))}
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5}>
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <div className="empty-title">No transactions found</div>
                    <div className="empty-desc">Try adjusting your filters or add a new transaction.</div>
                  </div>
                </td>
              </tr>
            ) : (
              sorted.map((txn) => (
                <tr key={txn.id} id={`txn-row-${txn.id}`}>
                  <td className="td-date">{formatDate(txn.date)}</td>
                  <td className="td-description">{txn.description}</td>
                  <td>
                    <span
                      className="badge badge-category"
                      style={{
                        borderColor: `${CATEGORY_COLORS[txn.category]}40`,
                        color: CATEGORY_COLORS[txn.category] || 'var(--text-secondary)',
                        background: `${CATEGORY_COLORS[txn.category]}12`,
                      }}
                    >
                      {txn.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${txn.type}`}>
                      {txn.type === 'income' ? '↑ Income' : '↓ Expense'}
                    </span>
                  </td>
                  <td className={`td-amount ${txn.type}`}>
                    {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </td>
                  {isAdmin && (
                    <td>
                      <div className="tx-actions">
                        <button
                          id={`edit-${txn.id}`}
                          className="btn-ghost btn-icon"
                          title="Edit"
                          onClick={() => { setEditTxn(txn); setModalOpen(true); }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          id={`delete-${txn.id}`}
                          className="btn-ghost btn-icon"
                          title="Delete"
                          style={{ color: 'var(--expense)' }}
                          onClick={() => setConfirmDelete(txn.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <span>{sorted.length} of {transactions.length} transactions</span>
          {!isAdmin && (
            <span style={{ color: 'var(--text-muted)' }}>
              👁 Viewer mode — switch to Admin to edit
            </span>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <TransactionModal
          existing={editTxn}
          onClose={() => { setModalOpen(false); setEditTxn(null); }}
        />
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Transaction?</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              This action cannot be undone.
            </p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button
                id="confirm-delete-btn"
                className="btn btn-danger"
                onClick={() => handleDelete(confirmDelete)}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
