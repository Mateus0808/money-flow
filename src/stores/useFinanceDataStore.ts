import { 
  getCategories, getExpensesByCategory, getIncomesAndExpenses, getMonthlyData 
} from '@/services/transaction.service';
import { TransactionType } from '@/types/transaction-type';

export const useFinanceDataStore = (
  transactions?: TransactionType[], 
  type?: "deposit" | "withdraw" | "total" | "",
  category?: string
) => {
  if (!transactions?.length) {
    return {
      radarChartData: [],
      chartBarData: [],
      fiveOutcomeCharData: [],
      annualMonthlyBalanceData: { labels: [], datasets: {} },
      expensesByCategory: {},
      incomeExpenseData: { labels: [], datasets: {} }
    }
  }

  let filteredTransactions = transactions;

  if (type && type !== "total") {
    filteredTransactions = filteredTransactions.filter((transaction) => transaction.type === type);
  }
  if (category) {
    filteredTransactions = filteredTransactions.filter((transaction) => transaction.category === category);
  }

  const categories = getCategories(filteredTransactions);
  const expensesByCategory = getExpensesByCategory(categories, filteredTransactions);
  const { incomes, expenses } = getIncomesAndExpenses(filteredTransactions);
  const { monthlyExpenses, monthlyIncomes, total } = getMonthlyData(filteredTransactions, type);

  const annualMonthlyBalanceData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: { monthlyExpenses, monthlyIncomes, total}
  }

  const incomeExpenseData = {
    labels: ['Entradas', 'Saídas'],
    datasets: { incomes, expenses }
  };

  const fiveOutcomesByCategory = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const fiveOutcomeCharData = fiveOutcomesByCategory.map(entry => {
    if (entry.amount > 0) {
      return {
        name: entry.category,
        amount: entry.amount
      };
    }
    return undefined;
  })
  .filter((entry): entry is { name: string; amount: number } => entry !== undefined)

  const radarChartData = categories.map(category => {
    if (expensesByCategory[category] > 0) {
      return {
        category: category,
        value: expensesByCategory[category] || 0,
      }
    }
    return undefined
  }).filter((entry): entry is { category: string, value: number }=> entry !== undefined);

  const chartBarData = annualMonthlyBalanceData.labels.map((label, index) => ({
    name: label,
    expenses: (type === "total" || type === 'deposit') ? undefined : annualMonthlyBalanceData.datasets.monthlyExpenses[index],
    incomes: (type === "total" || type === "withdraw") || (category !== 'Trabalho' && !!category)
      ? undefined 
      : annualMonthlyBalanceData.datasets.monthlyIncomes[index],
    total: (type === "total" || !!type) || !category ? total?.[index] : undefined
  }));

  return { 
    radarChartData,
    chartBarData,
    fiveOutcomeCharData, 
    annualMonthlyBalanceData, 
    expensesByCategory,
    incomeExpenseData 
  };
};