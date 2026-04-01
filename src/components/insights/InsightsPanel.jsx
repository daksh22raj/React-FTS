import React from 'react';
import {
  Trophy, ArrowUpDown, Zap, TrendingUp, TrendingDown, BarChart2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  getHighestSpendingCategory,
  getMonthlyComparison,
  getCategoryBreakdown,
  getTotals,
  getMonthlyData,
} from '../../utils/analytics';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="tooltip-row">
          <span className="tooltip-dot" style={{ background: p.color || p.fill }} />
          <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{p.name}:</span>
          <span style={{ fontWeight: 700 }}>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function InsightsPanel() {
  const { state } = useApp();
  const { transactions } = state;

  const top = getHighestSpendingCategory(transactions);
  const comparison = getMonthlyComparison(transactions);
  const breakdown = getCategoryBreakdown(transactions);
  const { savingsRate } = getTotals(transactions);
  const monthly = getMonthlyData(transactions);

  const maxBreakdown = breakdown[0]?.value || 1;

  const healthColor = savingsRate >= 20 ? 'var(--income)' : savingsRate >= 10 ? 'var(--neutral)' : 'var(--expense)';
  const healthLabel = savingsRate >= 20 ? '🟢 Excellent' : savingsRate >= 10 ? '🟡 Fair' : '🔴 Needs Attention';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      <div className="insights-grid">
        <div className="card insight-card" id="insight-top-category">
          <div
            className="insight-icon"
            style={{ background: `${CATEGORY_COLORS[top?.name] || '#6366f1'}20`, color: CATEGORY_COLORS[top?.name] || '#6366f1' }}
          >
            <Trophy size={20} />
          </div>
          <div className="insight-label">Highest Spending</div>
          <div className="insight-value">{top?.name || '—'}</div>
          <div className="insight-desc">
            {top ? `${formatCurrency(top.value)} total · ${((top.value / breakdown.reduce((s, b) => s + b.value, 0)) * 100).toFixed(0)}% of expenses` : 'No expense data'}
          </div>
          {top && (
            <div className="progress-bar-wrap" style={{ marginTop: '1rem' }}>
              <div
                className="progress-bar"
                style={{
                  width: `${(top.value / maxBreakdown) * 100}%`,
                  background: CATEGORY_COLORS[top.name] || '#6366f1',
                }}
              />
            </div>
          )}
        </div>

        <div className="card insight-card" id="insight-monthly-comparison">
          <div
            className="insight-icon"
            style={{ background: 'rgba(6,182,212,0.12)', color: 'var(--accent-secondary)' }}
          >
            <ArrowUpDown size={20} />
          </div>
          <div className="insight-label">Month vs Previous</div>
          {comparison ? (
            <>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Expenses</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                      {formatCurrency(comparison.current.expenses)}
                    </span>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 600,
                      color: comparison.expensePct > 0 ? 'var(--expense)' : 'var(--income)',
                    }}>
                      {comparison.expensePct > 0 ? '↑' : '↓'} {formatPercent(Math.abs(comparison.expensePct))}
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Income</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                      {formatCurrency(comparison.current.income)}
                    </span>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 600,
                      color: comparison.incomePct >= 0 ? 'var(--income)' : 'var(--expense)',
                    }}>
                      {comparison.incomePct >= 0 ? '↑' : '↓'} {formatPercent(Math.abs(comparison.incomePct))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="insight-desc" style={{ marginTop: '0.5rem' }}>
                Compared to {comparison.previous.label}
              </div>
            </>
          ) : (
            <div className="insight-desc">Not enough monthly data</div>
          )}
        </div>

        <div className="card insight-card" id="insight-savings-health">
          <div
            className="insight-icon"
            style={{ background: 'rgba(99,102,241,0.12)', color: 'var(--accent-primary)' }}
          >
            <Zap size={20} />
          </div>
          <div className="insight-label">Savings Health</div>
          <div className="insight-value" style={{ color: healthColor }}>{formatPercent(savingsRate)}</div>
          <div className="insight-desc">{healthLabel}</div>
          <div className="progress-bar-wrap" style={{ marginTop: '1rem' }}>
            <div
              className="progress-bar"
              style={{ width: `${Math.min(savingsRate, 100)}%`, background: healthColor }}
            />
          </div>
        </div>
      </div>

      <div className="card chart-card" id="insight-monthly-chart">
        <div className="chart-title">Income vs Expenses by Month</div>
        <div className="chart-subtitle">Side-by-side comparison</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly.map((m) => ({ name: m.label, Income: m.income, Expenses: m.expenses }))}
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Income"  fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card" id="insight-category-bars">
        <div className="chart-title">Top Spending Categories</div>
        <div className="chart-subtitle">All-time expense distribution</div>
        <div className="cat-bar-wrap" style={{ paddingTop: '0.5rem' }}>
          {breakdown.slice(0, 7).map((item) => (
            <div key={item.name} className="cat-bar-row">
              <div className="cat-bar-header">
                <span className="cat-bar-name">{item.name}</span>
                <span className="cat-bar-val">{formatCurrency(item.value)}</span>
              </div>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  style={{
                    width: `${(item.value / maxBreakdown) * 100}%`,
                    background: CATEGORY_COLORS[item.name] || '#6366f1',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
