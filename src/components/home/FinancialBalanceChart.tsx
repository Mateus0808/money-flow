import { 
  Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from "recharts";

interface FinancialBalanceChartProps {
  data: {
    name: string;
    expenses: any;
    incomes: any;
    total: number;
  }[]
}
export const FinancialBalanceChart = ({ data }: FinancialBalanceChartProps) => (
  <ResponsiveContainer width="100%" height={342}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="expenses" fill="rgba(255, 99, 132, 0.8)" name="Despesas" />
      <Bar dataKey="incomes" fill="rgba(75, 192, 192, 0.8)" name="Receitas" />
      <Bar dataKey="total" fill="rgba(76, 175, 80, 0.8)" name="Total" />
    </BarChart>
  </ResponsiveContainer>
);