import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { MOCK_TRANSACTIONS } from '../data/mockData';

const STORAGE_KEY_TXN = 'rf_transactions';
const STORAGE_KEY_THEME = 'rf_theme';
const STORAGE_KEY_ROLE = 'rf_role';

const initialState = {
  transactions: JSON.parse(localStorage.getItem(STORAGE_KEY_TXN) || 'null') || MOCK_TRANSACTIONS,
  role: localStorage.getItem(STORAGE_KEY_ROLE) || 'viewer',
  theme: localStorage.getItem(STORAGE_KEY_THEME) || 'dark',
  filters: { search: '', type: 'all', category: 'all', dateFrom: '', dateTo: '' },
  sortConfig: { key: 'date', direction: 'desc' },
  activePage: 'dashboard',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    case 'SET_SORT':
      return { ...state, sortConfig: action.payload };
    case 'SET_PAGE':
      return { ...state, activePage: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TXN, JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, state.role);
  }, [state.role]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
