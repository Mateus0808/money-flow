import { create } from "zustand";

interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
  type: "deposit" | "withdraw" | "total" | "";
}

interface FiltersStore {
  dashboardFilters: TransactionFilters;
  transactionsFilters: TransactionFilters;
  setDashboardFilters: (filters: TransactionFilters) => void;
  setTransactionsFilters: (filters: TransactionFilters) => void;
}

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  dashboardFilters: {
    startDate: "",
    endDate: "",
    category: "",
    type: "",
  },
  transactionsFilters: {
    startDate: "",
    endDate: "",
    category: "",
    type: "",
  },
  setDashboardFilters: (filters) => set({ dashboardFilters: filters }),
  setTransactionsFilters: (filters) => set({ transactionsFilters: filters }),
}))