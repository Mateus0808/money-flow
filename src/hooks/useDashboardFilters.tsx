import { TransactionType } from "@/types/transaction-type";
import { setEndOfDay } from "@/utils/set-end-of-day";
import { useMemo } from "react";

export const useDashboardFilters = (transactions: TransactionType[], filters: any) => {
  return useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    return transactions.filter((t) => {
      const matchStartDate = filters.startDate ? new Date(t.date) >= new Date(filters.startDate) : true;
      const matchEndDate = filters.endDate ? new Date(t.date) <= setEndOfDay(new Date(filters.endDate)) : true;
      return matchStartDate && matchEndDate;
    });
  }, [transactions, filters.startDate, filters.endDate]);
};