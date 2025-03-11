"use client";

import { TransactionTypePagination, PaginationType, TransactionType } from "@/types/TransactionType";
import { createContext, useEffect, useState, ReactNode } from "react";

type TransactionRequest = Omit<TransactionType, "_id" | "date">;

interface TransactionsContextProps {
  transactions: TransactionType[];
  createTransaction: (transaction: TransactionRequest) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>
  pagination: PaginationType
  setPagination: (value: PaginationType) => void
  loading: boolean
}

export const TransactionsContext = createContext({} as TransactionsContextProps);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    totalPages: 1,
    limit: 10,
    total: 1
  })

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      console.log("alo mudno")
      const res = await fetch(
        `/api/transactions?page=${pagination.page}&limit=${pagination.limit}`
      );
      const data: TransactionTypePagination = await res.json();

      setTransactions(data.transactions);
      setLoading(false)
      setPagination(data.pagination);
    } catch (error) {
      setLoading(false)
      console.error("Erro ao buscar transações:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [pagination.page]);

  async function createTransaction(transactionRequest: TransactionRequest) {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionRequest),
      });

      const transaction = await res.json();
      setTransactions((prev) => {
        const newTransactions = [transaction, ...prev]
        return newTransactions.slice(0, pagination.limit)
      });
      setPagination((prev) => ({
        ...prev,
        page: 1,
        totalPages: Math.ceil((prev.totalPages * prev.limit + 1) / prev.limit)
      }));

      await fetchTransactions();
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  }

  async function deleteTransaction(id: string) {
    try {
      const deletedTransaction = await fetch(`/api/transactions?id=${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      if (deletedTransaction.ok) {
        alert("Deletado com sucesso")
      }
      await fetchTransactions();
    } catch (error) {
      console.log("Erro ao deletar transação")
    }
  }

  return (
    <TransactionsContext.Provider value={{ 
      loading, transactions, pagination, createTransaction, setPagination, deleteTransaction 
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}