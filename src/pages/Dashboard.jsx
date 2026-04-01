import React from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingBreakdownChart from '../components/dashboard/SpendingBreakdownChart';
import { useApp } from '../context/AppContext';
import { getTotals } from '../utils/analytics';
import { formatCurrency } from '../utils/formatters';

export default function Dashboard() {
  const { state } = useApp();
  const { transactions } = state;

  if (!transactions.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">💰</div>
        <div className="empty-title">No transactions yet</div>
        <div className="empty-desc">Switch to Admin role and add your first transaction.</div>
      </div>
    );
  }

  return (
    <div>
      <SummaryCards />
      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
    </div>
  );
}
