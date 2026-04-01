import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTotals, getMonthlyData } from '../../utils/analytics';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export default function SummaryCards() {
  const { state } = useApp();
  const { transactions } = state;

  const { income, expenses, balance, savingsRate } = getTotals(transactions);

  const monthly = getMonthlyData(transactions);
  const prevMonth = monthly[monthly.length - 2];
  const currMonth = monthly[monthly.length - 1];

  const incomeChange = prevMonth
    ? ((currMonth.income - prevMonth.income) / prevMonth.income) * 100
    : null;
  const expenseChange = prevMonth
    ? ((currMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100
    : null;

  const cards = [
    {
      id: 'balance',
      type: 'balance',
      icon: Wallet,
      label: 'Total Balance',
      value: formatCurrency(balance),
      valueClass: '',
      change: null,
      sub: 'All time net',
    },
    {
      id: 'income',
      type: 'income',
      icon: TrendingUp,
      label: 'Total Income',
      value: formatCurrency(income),
      valueClass: 'income',
      change: incomeChange,
      sub: 'vs. last month',
    },
    {
      id: 'expenses',
      type: 'expense',
      icon: TrendingDown,
      label: 'Total Expenses',
      value: formatCurrency(expenses),
      valueClass: 'expense',
      change: expenseChange,
      sub: 'vs. last month',
      invertChange: true,
    },
    {
      id: 'savings',
      type: 'savings',
      icon: PiggyBank,
      label: 'Savings Rate',
      value: formatPercent(savingsRate),
      valueClass: '',
      change: null,
      sub: 'Income minus expenses',
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map(({ id, type, icon: Icon, label, value, valueClass, change, sub, invertChange }) => (
        <div key={id} className={`card summary-card interactive ${type}`} id={`card-${id}`}>
          <div className={`summary-icon ${type}`}>
            <Icon size={18} />
          </div>
          <div className="summary-label">{label}</div>
          <div className={`summary-value ${valueClass}`}>{value}</div>
          {change !== null ? (
            <div
              className={`summary-change ${
                invertChange
                  ? change <= 0 ? 'up' : 'down'
                  : change >= 0 ? 'up' : 'down'
              }`}
            >
              {change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {formatPercent(Math.abs(change))} {sub}
            </div>
          ) : (
            <div className="summary-change" style={{ color: 'var(--text-muted)' }}>{sub}</div>
          )}
        </div>
      ))}
    </div>
  );
}
