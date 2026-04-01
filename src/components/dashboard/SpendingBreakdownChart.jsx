import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { getCategoryBreakdown } from '../../utils/analytics';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../data/mockData';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{name}</div>
      <div className="tooltip-row">
        <span className="tooltip-dot" style={{ background: CATEGORY_COLORS[name] || '#6366f1' }} />
        <span style={{ fontWeight: 700 }}>{formatCurrency(value)}</span>
      </div>
    </div>
  );
}

export default function SpendingBreakdownChart() {
  const { state } = useApp();
  const data = getCategoryBreakdown(state.transactions);
  const total = data.reduce((s, d) => s + d.value, 0);
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data.length) return null;

  return (
    <div className="card chart-card" id="spending-breakdown-chart">
      <div className="chart-title">Spending Breakdown</div>
      <div className="chart-subtitle">By category (all time)</div>

      <ResponsiveContainer width="100%" height={190}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name] || '#6366f1'}
                opacity={activeIndex === null || activeIndex === i ? 1 : 0.5}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-legend">
        {data.slice(0, 8).map((item) => (
          <div key={item.name} className="legend-item">
            <div className="legend-left">
              <span className="legend-dot" style={{ background: CATEGORY_COLORS[item.name] || '#6366f1' }} />
              <span className="legend-name">{item.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="legend-pct">{((item.value / total) * 100).toFixed(0)}%</span>
              <span className="legend-value">{formatCurrency(item.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
