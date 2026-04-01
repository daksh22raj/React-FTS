import React from 'react';
import { Sun, Moon, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { filterTransactions, exportToCSV } from '../../utils/analytics';

const PAGE_TITLES = {
  dashboard:    { title: 'Dashboard',     sub: 'Your financial overview at a glance' },
  transactions: { title: 'Transactions',  sub: 'All your income & expense records' },
  insights:     { title: 'Insights',      sub: 'Understand your spending patterns' },
};

export default function Header() {
  const { state, dispatch } = useApp();
  const page = PAGE_TITLES[state.activePage];

  const handleExport = () => {
    const filtered = filterTransactions(state.transactions, state.filters);
    exportToCSV(filtered);
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-title">{page.title}</span>
        <span className="header-subtitle">{page.sub}</span>
      </div>

      <div className="header-right">
        <div className="role-switcher">
          <span className="role-label">Role:</span>
          <select
            id="role-select"
            className="role-select"
            value={state.role}
            onChange={(e) => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <span className={`role-badge ${state.role}`}>
            {state.role === 'admin' ? '🔑 Admin' : '👁 Viewer'}
          </span>
        </div>

        <button
          id="export-btn"
          className="btn btn-secondary btn-sm"
          onClick={handleExport}
          title="Export transactions as CSV"
        >
          <Download size={14} />
          Export
        </button>

        <button
          id="theme-toggle"
          className="theme-toggle"
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          title="Toggle theme"
        >
          {state.theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
