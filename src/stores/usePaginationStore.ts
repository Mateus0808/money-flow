import { PaginationType } from "@/types/pagination";
import { create } from "zustand";

interface TransactionsStore {
  pagination: PaginationType;
  setPagination: (pagination: PaginationType) => void;
}

export const usePaginationStore = create<TransactionsStore>((set, get) => ({
  pagination: { page: 1, totalPages: 1, limit: 10, total: 0 },
  setPagination: (pagination) => set({ pagination }),
}))