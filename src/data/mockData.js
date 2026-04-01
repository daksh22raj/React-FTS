export const CATEGORIES = [
  'Housing',
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Utilities',
  'Education',
  'Travel',
  'Salary',
  'Freelance',
  'Investments',
  'Other',
];

export const CATEGORY_COLORS = {
  Housing: '#6366f1',
  'Food & Dining': '#f59e0b',
  Transportation: '#3b82f6',
  Entertainment: '#ec4899',
  Healthcare: '#10b981',
  Shopping: '#8b5cf6',
  Utilities: '#06b6d4',
  Education: '#84cc16',
  Travel: '#f97316',
  Salary: '#22c55e',
  Freelance: '#14b8a6',
  Investments: '#a855f7',
  Other: '#64748b',
};

let idCounter = 1;
const makeId = () => `txn-${String(idCounter++).padStart(4, '0')}`;

const raw = [
  
  { date: '2026-01-02', description: 'Monthly Salary', category: 'Salary', amount: 5000, type: 'income' },
  { date: '2026-01-03', description: 'Rent Payment', category: 'Housing', amount: 1500, type: 'expense' },
  { date: '2026-01-05', description: 'Grocery Store', category: 'Food & Dining', amount: 120, type: 'expense' },
  { date: '2026-01-08', description: 'Freelance Project', category: 'Freelance', amount: 800, type: 'income' },
  { date: '2026-01-10', description: 'Netflix Subscription', category: 'Entertainment', amount: 15, type: 'expense' },
  { date: '2026-01-12', description: 'Gas Station', category: 'Transportation', amount: 60, type: 'expense' },
  { date: '2026-01-14', description: 'Doctor Visit', category: 'Healthcare', amount: 150, type: 'expense' },
  { date: '2026-01-15', description: 'Online Shopping', category: 'Shopping', amount: 85, type: 'expense' },
  { date: '2026-01-18', description: 'Electricity Bill', category: 'Utilities', amount: 95, type: 'expense' },
  { date: '2026-01-20', description: 'Restaurant Dinner', category: 'Food & Dining', amount: 70, type: 'expense' },
  { date: '2026-01-22', description: 'Dividend Income', category: 'Investments', amount: 200, type: 'income' },
  { date: '2026-01-25', description: 'Online Course', category: 'Education', amount: 49, type: 'expense' },
  { date: '2026-01-28', description: 'Uber Ride', category: 'Transportation', amount: 25, type: 'expense' },
  { date: '2026-01-30', description: 'Coffee Shop', category: 'Food & Dining', amount: 18, type: 'expense' },

  
  { date: '2026-02-01', description: 'Monthly Salary', category: 'Salary', amount: 5000, type: 'income' },
  { date: '2026-02-02', description: 'Rent Payment', category: 'Housing', amount: 1500, type: 'expense' },
  { date: '2026-02-05', description: 'Grocery Store', category: 'Food & Dining', amount: 140, type: 'expense' },
  { date: '2026-02-07', description: 'Freelance Design', category: 'Freelance', amount: 1200, type: 'income' },
  { date: '2026-02-10', description: 'Gym Membership', category: 'Healthcare', amount: 45, type: 'expense' },
  { date: '2026-02-12', description: 'Valentine Dinner', category: 'Food & Dining', amount: 120, type: 'expense' },
  { date: '2026-02-14', description: 'Movie Tickets', category: 'Entertainment', amount: 35, type: 'expense' },
  { date: '2026-02-16', description: 'Bus Pass', category: 'Transportation', amount: 80, type: 'expense' },
  { date: '2026-02-18', description: 'Water Bill', category: 'Utilities', amount: 40, type: 'expense' },
  { date: '2026-02-20', description: 'Amazon Purchase', category: 'Shopping', amount: 110, type: 'expense' },
  { date: '2026-02-22', description: 'Dividend Income', category: 'Investments', amount: 200, type: 'income' },
  { date: '2026-02-25', description: 'Book Store', category: 'Education', amount: 25, type: 'expense' },
  { date: '2026-02-27', description: 'Car Insurance', category: 'Transportation', amount: 130, type: 'expense' },

 
  { date: '2026-03-01', description: 'Monthly Salary', category: 'Salary', amount: 5000, type: 'income' },
  { date: '2026-03-03', description: 'Rent Payment', category: 'Housing', amount: 1500, type: 'expense' },
  { date: '2026-03-06', description: 'Grocery Store', category: 'Food & Dining', amount: 135, type: 'expense' },
  { date: '2026-03-08', description: 'Freelance Consulting', category: 'Freelance', amount: 950, type: 'income' },
  { date: '2026-03-10', description: 'Concert Tickets', category: 'Entertainment', amount: 90, type: 'expense' },
  { date: '2026-03-12', description: 'Gas Station', category: 'Transportation', amount: 55, type: 'expense' },
  { date: '2026-03-15', description: 'Pharmacy', category: 'Healthcare', amount: 35, type: 'expense' },
  { date: '2026-03-17', description: 'Clothing Store', category: 'Shopping', amount: 200, type: 'expense' },
  { date: '2026-03-19', description: 'Internet Bill', category: 'Utilities', amount: 65, type: 'expense' },
  { date: '2026-03-22', description: 'Restaurant Lunch', category: 'Food & Dining', amount: 45, type: 'expense' },
  { date: '2026-03-24', description: 'Dividend Income', category: 'Investments', amount: 200, type: 'income' },
  { date: '2026-03-26', description: 'Udemy Course', category: 'Education', amount: 29, type: 'expense' },
  { date: '2026-03-28', description: 'Weekend Trip', category: 'Travel', amount: 350, type: 'expense' },
  { date: '2026-03-30', description: 'Streaming Service', category: 'Entertainment', amount: 12, type: 'expense' },

  
  { date: '2026-04-01', description: 'Monthly Salary', category: 'Salary', amount: 5200, type: 'income' },
  { date: '2026-04-01', description: 'Rent Payment', category: 'Housing', amount: 1500, type: 'expense' },
  { date: '2026-04-01', description: 'Grocery Store', category: 'Food & Dining', amount: 95, type: 'expense' },
];

export const MOCK_TRANSACTIONS = raw.map((t) => ({ ...t, id: makeId() }));

export const MONTHLY_BUDGET = {
  Housing: 1600,
  'Food & Dining': 400,
  Transportation: 250,
  Entertainment: 150,
  Healthcare: 200,
  Shopping: 300,
  Utilities: 200,
  Education: 100,
  Travel: 500,
  Other: 100,
};
