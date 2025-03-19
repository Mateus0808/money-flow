import { TransactionType } from "@/types/transaction-type";
import { setEndOfDay } from "@/utils/set-end-of-day";
import { useMemo } from "react";

export const useFilteredTransactions = (transactions: TransactionType[], filters: any) => {
  return useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    return transactions.filter((t) => {
      const matchStartDate = filters.startDate ? new Date(t.date) >= new Date(filters.startDate) : true;
      const matchEndDate = filters.endDate ? new Date(t.date) <= setEndOfDay(new Date(filters.endDate)) : true;
      const matchType = filters.type ? t.type === filters.type : true;
      const matchCategory = filters.category ? t.category === filters.category : true;

      return matchStartDate && matchEndDate && matchType && matchCategory;

    });
  }, [transactions, filters.startDate, filters.endDate, filters.type, filters.category]);
};