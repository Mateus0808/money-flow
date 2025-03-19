export interface ITransactionFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
  type: "deposit" | "withdraw" | "total" | "";
}