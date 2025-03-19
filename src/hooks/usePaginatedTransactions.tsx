import { TransactionType } from "@/types/transaction-type";
import { useMemo } from "react";

export const usePaginatedTransactions = (transactions: TransactionType[], page: number, limit: number) => {
  return useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return transactions.slice(startIndex, endIndex);
  }, [transactions, page, limit]);
};