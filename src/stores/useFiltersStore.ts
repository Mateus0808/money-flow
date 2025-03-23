import { ITransactionFilters } from "@/types/filters";
import { enumTransactionType } from "@/types/transaction-type";
import { create } from "zustand";


interface FiltersStore {
  dashboardFilters: ITransactionFilters;
  transactionsFilters: ITransactionFilters;
  setDashboardFilters: (filters: ITransactionFilters) => void;
  setTransactionsFilters: (filters: ITransactionFilters) => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  dashboardFilters: {
    startDate: null,
    endDate: null,
    category: "",
    type: enumTransactionType.NONE,
  },
  transactionsFilters: {
    startDate: null,
    endDate: null,
    category: "",
    type: enumTransactionType.NONE,
  },
  setDashboardFilters: (filters) => set({ dashboardFilters: filters }),
  setTransactionsFilters: (filters) => set({ transactionsFilters: filters }),
}))