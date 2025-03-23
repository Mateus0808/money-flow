import { enumTransactionType } from "./transaction-type";

export interface ITransactionFilters {
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string;
  groupCategory?: string
  type: enumTransactionType;
}