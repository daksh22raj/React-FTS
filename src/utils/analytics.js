import { getMonthKey, getMonthLabel } from './formatters';

export function getTotals(transactions) {
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? ((balance / income) * 100) : 0;
  return { income, expenses, balance, savingsRate };
}

export function getMonthlyData(transactions) {
  const map = {};
  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    if (!map[key]) map[key] = { month: key, label: getMonthLabel(t.date), income: 0, expenses: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });
  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((m) => ({ ...m, balance: m.income - m.expenses }));
}

export function getCategoryBreakdown(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      if (!map[t.category]) map[t.category] = 0;
      map[t.category] += t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getHighestSpendingCategory(transactions) {
  const breakdown = getCategoryBreakdown(transactions);
  return breakdown[0] || null;
}

export function getMonthlyComparison(transactions) {
  const monthly = getMonthlyData(transactions);
  if (monthly.length < 2) return null;
  const current = monthly[monthly.length - 1];
  const previous = monthly[monthly.length - 2];
  const expenseDiff = current.expenses - previous.expenses;
  const expensePct = previous.expenses > 0 ? (expenseDiff / previous.expenses) * 100 : 0;
  const incomeDiff = current.income - previous.income;
  const incomePct = previous.income > 0 ? (incomeDiff / previous.income) * 100 : 0;
  return { current, previous, expenseDiff, expensePct, incomeDiff, incomePct };
}

export function getBalanceTrend(transactions) {
  const monthly = getMonthlyData(transactions);
  let running = 0;
  return monthly.map((m) => {
    running += m.balance;
    return { ...m, cumulativeBalance: running };
  });
}

export function filterTransactions(transactions, { search, type, category, dateFrom, dateTo }) {
  return transactions.filter((t) => {
    if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (type && type !== 'all' && t.type !== type) return false;
    if (category && category !== 'all' && t.category !== category) return false;
    if (dateFrom && t.date < dateFrom) return false;
    if (dateTo && t.date > dateTo) return false;
    return true;
  });
}

export function exportToCSV(transactions) {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((t) => [
    t.date, t.description, t.category, t.type, t.amount,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.csv';
  a.click();
  URL.revokeObjectURL(url);
}
