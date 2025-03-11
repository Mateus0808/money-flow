import { 
  getCategories, getExpensesByCategory, getIncomesAndExpenses, getMonthlyData 
} from '@/services/transaction.service';
import { TransactionType } from '@/types/TransactionType';

export const useFinanceDataStore = (transactions: TransactionType[]) => {
  const categories = getCategories(transactions);
  const expensesByCategory = getExpensesByCategory(categories, transactions);
  const { incomes, expenses } = getIncomesAndExpenses(transactions);
  const { monthlyExpenses, monthlyIncomes, total } = getMonthlyData(transactions);

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

  const fiveOutcomeCharData = {
    labels: fiveOutcomesByCategory.map(entry => entry.category),
    datasets: { fiveOutcomesByCategory: fiveOutcomesByCategory.map(entry => entry.amount) }
  };

  const radarChartData = categories.map(category => ({
    category: category,
    value: expensesByCategory[category] || 0,
  }));

  const chartBarData = annualMonthlyBalanceData.labels.map((label, index) => ({
    name: label,
    expenses: annualMonthlyBalanceData.datasets.monthlyExpenses[index],
    incomes: annualMonthlyBalanceData.datasets.monthlyIncomes[index],
    total: total[index],
  }));

  return { 
    radarChartData,
    chartBarData,
    fiveOutcomeCharData, 
    annualMonthlyBalanceData, 
    incomeExpenseData 
  };
};