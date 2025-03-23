import { categoryMapping } from "@/components/shared/TransactionCategories";

export const reverseCategoryMapping: { [key: string]: string } = Object.fromEntries(
  Object.entries(categoryMapping).map(([key, value]) => [value, key])
);