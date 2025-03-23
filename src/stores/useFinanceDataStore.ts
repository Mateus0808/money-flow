import { 
  getCategories, getExpensesByCategory, getIncomesAndExpenses, getMonthlyData 
} from '@/services/transaction.service';
import { enumTransactionType, TransactionType } from '@/types/transaction-type';
import { reverseCategoryMapping } from '@/utils/reverse-category-mapping';

export const useFinanceDataStore = (
  transactions?: TransactionType[], 
  type?: enumTransactionType,
  category?: string,
  groupCategory?: string
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
    filteredTransactions = filteredTransactions
      .filter((transaction) => transaction.type === type);
  }
  if (category && !groupCategory) {
    filteredTransactions = filteredTransactions
      .filter((transaction) => transaction.category === category);
  }
  if (groupCategory && !category) {
    filteredTransactions = filteredTransactions
      .filter((transaction) => transaction.groupCategory === groupCategory);
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
        name: reverseCategoryMapping[entry.category] || entry.category,
        amount: entry.amount
      };
    }
    return undefined;
  })
  .filter((entry): entry is { name: string; amount: number } => entry !== undefined)

  const radarChartData = categories.map(category => {
    if (expensesByCategory[category] > 0) {
      return {
        category: reverseCategoryMapping[category] || category,
        value: expensesByCategory[category] || 0,
      }
    }
    return undefined
  }).filter((entry): entry is { category: string, value: number }=> entry !== undefined);

  const chartBarData = annualMonthlyBalanceData.labels.map((label, index) => ({
    name: label,
    expenses: annualMonthlyBalanceData.datasets.monthlyExpenses[index],
    incomes: annualMonthlyBalanceData.datasets.monthlyIncomes[index],
    total: total?.[index]
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