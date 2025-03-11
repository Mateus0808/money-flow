export interface TransactionType {
  _id: string;
  title: string;
  type: "deposit" | "withdraw"
  category: string;
  amount: number;
  date: string;
}

export interface PaginationType {
  page: number
  total: number
  totalPages: number
  limit: number
}

export interface TransactionTypePagination {
  transactions: TransactionType[]
  pagination: PaginationType
}