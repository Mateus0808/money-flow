import { CreateTransactionFormData } from "@/libs/validation/transactionSchema";
import { PaginationType } from "./pagination";

export enum enumTransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TOTAL = 'total',
  NONE = ''
}

export interface TransactionType extends Omit<CreateTransactionFormData, 'groupCategory'> {
  _id: string;
  userId: string
  groupCategory: string
  category: string
}

export interface TransactionTypePagination {
  transactions: TransactionType[]
  pagination: PaginationType
}