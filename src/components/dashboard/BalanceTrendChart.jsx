import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getBalanceTrend } from '../../utils/analytics';
import { formatCurrency } from '../../utils/formatters';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="tooltip-row">
          <span className="tooltip-dot" style={{ background: p.color }} />
          <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
            {p.name}:
          </span>
          <span style={{ fontWeight: 700 }}>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function BalanceTrendChart() {
  const { state } = useApp();
  const data = getBalanceTrend(state.transactions).map((m) => ({
    name: m.label,
    Income: m.income,
    Expenses: m.expenses,
    Balance: m.cumulativeBalance,
  }));

  if (!data.length) return null;

  return (
    <div className="card chart-card" id="balance-trend-chart">
      <div className="chart-title">Balance Trend</div>
      <div className="chart-subtitle">Monthly income, expenses & cumulative balance</div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(val) => <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{val}</span>}
          />
          <Area type="monotone" dataKey="Income"   stroke="#10b981" strokeWidth={2} fill="url(#colorIncome)"   dot={false} activeDot={{ r: 4, fill: '#10b981' }} />
          <Area type="monotone" dataKey="Expenses"  stroke="#f43f5e" strokeWidth={2} fill="url(#colorExpenses)" dot={false} activeDot={{ r: 4, fill: '#f43f5e' }} />
          <Area type="monotone" dataKey="Balance"   stroke="#6366f1" strokeWidth={2} fill="url(#colorBalance)"  dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
