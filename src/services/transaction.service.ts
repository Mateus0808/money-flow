import { TransactionType } from "@/types/TransactionType";

export const getCategories = (transactions: TransactionType[]) => {
  const categories = [...new Set(transactions.filter((
      transaction
    ) => transaction).map((transaction) => transaction.category))
  ];
  return categories
};

export const getExpensesByCategory = (categories: string[], transactions: TransactionType[]) => {
  return categories.reduce((acc, category) => {
    const total = transactions
      .filter((transaction) => transaction.category === category && transaction.type === 'withdraw')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    acc[category] = total;
    return acc;
  }, {} as Record<string, number>);
};

export const getIncomesAndExpenses = (transactions: TransactionType[]) => {
  const incomes = transactions
    .filter((transaction) => transaction.type === 'deposit')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === 'withdraw')
    .reduce((total, transaction) => total + transaction.amount, 0);

  return { incomes, expenses };
};

export const getMonthlyData = (transactions: TransactionType[]) => {
  const monthlyExpenses = Array(12).fill(0);
  const monthlyIncomes = Array(12).fill(0);

  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).getMonth();
    if (transaction.type === 'withdraw') {
      monthlyExpenses[month] += transaction.amount;
    } else if (transaction.type === 'deposit') {
      monthlyIncomes[month] += transaction.amount;
    }
  });

  const total = monthlyIncomes.map((income, index) => income - monthlyExpenses[index]);

  return { monthlyExpenses, monthlyIncomes, total };
};
