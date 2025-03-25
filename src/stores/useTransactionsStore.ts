import { create } from "zustand";
import { TransactionType } from "@/types/transaction-type";
import { PaginationType } from "@/types/pagination";
import { CreateTransactionFormData } from "@/libs/validation/transactionSchema";
import { errorNotify } from "@/libs/notify/notify";

interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
  type: "income" | "expense" | "total" | "";
}

interface TransactionsStore {
  transactions: TransactionType[];
  loading: boolean;
  pagination: PaginationType;
  filters: TransactionFilters;
  setTransactions: (transactions: TransactionType[]) => void;
  setLoading: (loading: boolean) => void;
  setPagination: (pagination: PaginationType) => void;
  setFilters: (filters: TransactionFilters) => void;
  fetchTransactions: (limit?: string) => Promise<void>
  createTransaction: (transaction: CreateTransactionFormData) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactionsStore = create<TransactionsStore>((set, get) => ({
  transactions: [],
  loading: false,
  pagination: { page: 1, totalPages: 1, limit: 10, total: 0 },
  filters: {
    startDate: "",
    endDate: "",
    category: "",
    type: ""
  },
  
  setTransactions: (transactions) => set({ transactions }),
  setLoading: (loading) => set({ loading }),
  setPagination: (pagination) => set({ pagination }),
  setFilters: (filters) => set({ filters }),

  fetchTransactions: async (limit?: string) => {
    set({ loading: true });
    try {
      const { pagination, filters } = get();

      const url = new URL('/api/transactions', window.location.origin);

      url.searchParams.set('page', pagination.page.toString());
      url.searchParams.set('limit', limit ?? pagination.limit.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== 'total' && !!value) url.searchParams.set(key, value.toString());
      });

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Falha ao buscar transações");      
      const result = await res.json();

      set({ transactions: result.transactions, pagination: result.pagination });
    } catch {
      return
    } finally {
      set({ loading: false });
    }
  },

  createTransaction: async (transactionRequest: CreateTransactionFormData) => {
    set({ loading: true });

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionRequest),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar transação");
      }

      const transaction = await res.json();

      set((state) => {
        const newTransactions = [transaction, ...state.transactions];
        return {
          transactions: newTransactions.slice(0, state.pagination.limit),
          pagination: updatePagination(state.pagination),
        };
      });
    } catch (error: any) {
      errorNotify(error.message || "Erro ao criar transação")
    } finally {
      set({ loading: false });
    }
  },

  deleteTransaction: async (id: string) => {
    set({ loading: true });
    
    const deletedTransaction = await fetch(`/api/transactions?id=${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!deletedTransaction.ok) {
      throw new Error("Erro ao deletar transação");
    }

    set((state) => ({
      transactions: state.transactions.filter((transaction) => transaction._id !== id),
      loading: false
    }));
  }
}));

const updatePagination = (pagination: PaginationType) => ({
  ...pagination,
  page: 1,
  totalPages: Math.ceil((pagination.totalPages * pagination.limit + 1) / pagination.limit),
});