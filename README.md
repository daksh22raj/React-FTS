# FinanceIQ – Smart Money Dashboard

A premium, interactive **Finance Dashboard UI** built with **React + Vite**, designed for tracking personal financial activity with beautiful visualizations and role-based access control.

---

## 🚀 Quick Start

```bash
# Install dependencies (already done if scaffolded)
npm install

# Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## ✨ Features

### 📊 Dashboard Overview
- **4 Summary Cards**: Total Balance, Income, Expenses, Savings Rate — with month-over-month delta indicators
- **Balance Trend Chart**: Area chart showing monthly income, expenses, and cumulative net balance over time
- **Spending Breakdown**: Interactive donut chart categorizing all-time expenses with hover highlighting and a summary legend

### 💳 Transactions Section
- Full transaction list with: **Date · Description · Category · Type · Amount**
- **Search** by description (real-time)
- **Filters**: Type (income/expense), Category, Date range
- **Sortable columns**: click any header to sort ascending/descending
- **Clear all filters** button
- Empty state messaging when no results match

### 🔑 Role-Based UI (RBAC Simulation)
| Feature              | Viewer | Admin |
|----------------------|:------:|:-----:|
| View all data        | ✅ | ✅ |
| Add transactions     | ❌ | ✅ |
| Edit transactions    | ❌ | ✅ |
| Delete transactions  | ❌ | ✅ |

Switch roles using the **Role dropdown** in the header.

### 💡 Insights Section
- **Highest Spending Category** with percentage of total expenses
- **Month-over-Month Comparison** for income and expenses with directional indicators
- **Savings Health** indicator with color-coded progress bar (🟢 Excellent / 🟡 Fair / 🔴 Needs Attention)
- **Income vs Expenses Bar Chart** — side-by-side monthly view
- **Top Categories Progress Bars** — visual weight of each expense category

### 🎨 UI & UX
- **Dark mode default** with light mode toggle (persisted in localStorage)
- **Glassmorphism-inspired card design** with subtle glow accents
- **Inter font** (Google Fonts) for premium typography
- **Micro-animations**: fade in on mount, hover lift, smooth transitions
- **Fully responsive**: works on mobile, tablet, and desktop
- **Empty states** for no data scenarios

---

## ⚙ Tech Stack

| Concern         | Tool                               |
|-----------------|------------------------------------|
| Framework       | React 18 + Vite                    |
| Styling         | Vanilla CSS with CSS Variables     |
| Charts          | Recharts                           |
| Icons           | Lucide React                       |
| State           | React Context + useReducer         |
| Persistence     | localStorage (theme, role, data)   |
| Mock Data       | Static JS file (48+ transactions)  |

---

## 🗂 Project Structure

```
src/
  context/
    AppContext.jsx         # Global state: transactions, role, theme, filters, sort
  components/
    layout/
      Sidebar.jsx          # Navigation sidebar (responsive with hamburger)
      Header.jsx           # Top bar: page title, role switcher, export, theme toggle
    dashboard/
      SummaryCards.jsx     # 4 KPI summary cards
      BalanceTrendChart.jsx# Area chart — time-based visualization
      SpendingBreakdownChart.jsx # Donut chart — categorical visualization
    transactions/
      TransactionTable.jsx # Sortable filterable table + CRUD (Admin)
      TransactionModal.jsx # Add/edit form modal
    insights/
      InsightsPanel.jsx    # All insight cards, bar charts, category bars
  pages/
    Dashboard.jsx
    Transactions.jsx
    Insights.jsx
  data/
    mockData.js            # 48+ realistic mock transactions (Jan–Apr 2026)
  utils/
    formatters.js          # Currency, date, percent formatting helpers
    analytics.js           # Aggregation: totals, monthly, breakdowns, filtering, CSV export
  index.css                # Complete design system (tokens, layout, components)
  App.jsx                  # Root with AppProvider + routing
  main.jsx
```

---

## 🔄 State Management

All state is managed via **React Context + useReducer** in `AppContext.jsx`:

| State Slice       | Description                                     |
|-------------------|-------------------------------------------------|
| `transactions`    | Array of all transaction objects                |
| `role`            | `'viewer'` or `'admin'`                         |
| `theme`           | `'dark'` or `'light'`                           |
| `filters`         | `{ search, type, category, dateFrom, dateTo }`  |
| `sortConfig`      | `{ key, direction }`                            |
| `activePage`      | Current page: dashboard / transactions / insights|

**Persistence**: `transactions`, `role`, and `theme` are synced to `localStorage` automatically.

---

## 📤 Optional Features Implemented

- ✅ **Dark mode** with localStorage persistence
- ✅ **Data persistence** via localStorage
- ✅ **CSV Export** of filtered transactions (Export button in header)
- ✅ **Animations** — fade-in on mount, hover transforms, smooth transitions
- ✅ **Advanced filtering** — type + category + date range + search

---

## 📸 Approach

The design prioritizes **information density without clutter** — a financial dashboard user needs to see the full picture at a glance. Key design decisions:

1. **Dark first**: Finance dashboards feel most professional in dark mode (think Bloomberg Terminal, trading apps).
2. **Color semantics**: Green = income/positive, Red = expense/negative, consistently throughout.
3. **Chart redundancy**: The balance trend (area) shows time pattern; the donut shows categorical pattern — these answer different questions simultaneously.
4. **Role-based UI**: Viewer and Admin roles simulate real RBAC without a backend — the Add/Edit/Delete controls simply don't render in Viewer mode.
5. **localStorage**: Makes the demo feel like a real app where changes persist through refreshes.

---

*Built as a frontend evaluation project — April 2026*
