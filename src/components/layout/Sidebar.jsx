import React, { useState } from 'react';
import {
  LayoutDashboard, CreditCard, Lightbulb, TrendingUp, Menu, X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions',  icon: CreditCard },
  { id: 'insights',     label: 'Insights',      icon: Lightbulb },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    setMobileOpen(false);
  };

  return (
    <>
      <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
        <Menu size={18} />
      </button>

      <div
        className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <TrendingUp size={18} color="#fff" />
          </div>
          <div>
            <div className="sidebar-logo-text">FinanceIQ</div>
            <div className="sidebar-logo-sub">Smart Money Dashboard</div>
          </div>
          <button
            className="btn-ghost btn-icon"
            onClick={() => setMobileOpen(false)}
            style={{ marginLeft: 'auto', display: 'none' }}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-label">Navigation</span>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${state.activePage === id ? 'active' : ''}`}
              onClick={() => navigate(id)}
              id={`nav-${id}`}
            >
              <Icon className="nav-icon" size={17} />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            © 2026 FinanceIQ · Demo
          </div>
        </div>
      </aside>
    </>
  );
}
