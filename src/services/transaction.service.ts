import { TransactionType, TransactionTypePagination } from "@/types/transaction-type";

export const getCategories = (transactions: TransactionType[]) => {
  if (!transactions || !Array.isArray(transactions)) {
    return [];
  }

  const categories = [...new Set(transactions.filter((
      transaction
    ) => transaction).map((transaction) => transaction.category))
  ];
  return categories
};

export const getExpensesByCategory = (categories: string[], transactions: TransactionType[]) => {
  return categories.reduce((acc, category) => {
    const total = transactions
      .filter((transaction) => transaction.category === category && transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    acc[category] = total;
    return acc;
  }, {} as Record<string, number>);
};

export const getIncomesAndExpenses = (transactions: TransactionType[]) => {
  const incomes = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  return { incomes, expenses };
};

export const getMonthlyData = (transactions: TransactionType[], type?: "income" | "expense" | "total" | "") => {
  const monthlyExpenses = Array(12).fill(0);
  const monthlyIncomes = Array(12).fill(0);

  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).getMonth();
    if (transaction.type === 'expense') {
      monthlyExpenses[month] += transaction.amount;
    } else if (transaction.type === 'income') {
      monthlyIncomes[month] += transaction.amount;
    }
  });

  const total = (type === 'total' || type === "" || type === undefined)
    ? monthlyIncomes.map((income, index) => income - monthlyExpenses[index])
    : undefined

  return { monthlyExpenses, monthlyIncomes, total };
};

export const fetchTransactions =  async (
  page?: number, limit?: string, filters?: object
): Promise<TransactionTypePagination> => {
  try {
    const url = new URL('/api/transactions', window.location.origin);
    url.searchParams.set("limit", limit ?? '10');

    if (page) url.searchParams.set("page", page.toString() ?? '1');
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== 'total' && !!value) url.searchParams.set(key, value.toString());
      });
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error("Falha ao buscar transações");
    }

    const result = await res.json();
    console.log("result transacction nnn", result)
    return result;
  } catch (error) {
    return {
      transactions: [],
      pagination: {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1
      }
    }
  }
}
