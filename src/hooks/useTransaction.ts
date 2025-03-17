import { useEffect } from "react";
import { useTransactionsStore } from "@/stores/useTransactionsStore";

export const useTransactions = (limit?: string) => {
  const { 
    fetchTransactions, filters, pagination, transactions, loading, setPagination 
  } = useTransactionsStore()

  useEffect(() => {
    const fetchData = async () => {
      await fetchTransactions(limit)
    }
    fetchData()
  }, [pagination.page, filters])

  return { transactions, loading, pagination, setPagination }
}

