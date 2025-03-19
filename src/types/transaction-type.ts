import { PaginationType } from "./pagination";

export interface TransactionType {
  _id: string;
  userId: string;
  title: string;
  type: "deposit" | "withdraw"
  category: string;
  amount: number;
  date: string;
}

export interface TransactionTypePagination {
  transactions: TransactionType[]
  pagination: PaginationType
}