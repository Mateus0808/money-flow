import { 
  Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from "recharts";
import { NoChartData } from "../NoChartData";
import { enumTransactionType } from "@/types/transaction-type";

interface FinancialBalanceChartProps {
  data: {
    name: string;
    expenses: any;
    incomes: any;
    total?: number;
  }[],
  type?: enumTransactionType
  category?: string
  groupCategory?: string
}

const getTotalBarColor = (value: number | undefined) => {
  if (value === undefined) return "#2196F3";
  return value >= 0 ? "#2196F3" : "#FF9800";
};

const shouldShowBar = (
  barType: "expenses" | "incomes" | "total", type: string | undefined, category?: string, groupCategory?: string
) => {
  if (!type && !category && !groupCategory) return true
  if (barType === "expenses") {
    return type === "expense" || (category !== "Trabalho" && !!category) || (!!groupCategory && groupCategory !== 'income');
  }
  if (barType === "incomes") {
    return type === "income" || (category === "Trabalho" && !!category) || groupCategory === 'income'
  }
  if (barType === "total") {
    return type === "total"
  }
  return false;
};

export const FinancialBalanceChart = ({ 
  data, type = undefined, category, groupCategory
}: FinancialBalanceChartProps) => {
  const updatedData = data.map((entry) => ({
    ...entry,
    barColor: getTotalBarColor(entry.total),
  }));

  if (data.length === 0) {
    return (
      <div className="w-full h-[342px] flex items-center justify-center">
        <NoChartData  label="🔍 Nenhum dado disponível para os períodos selecionados."/>  
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={342}>
      <BarChart data={updatedData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {shouldShowBar('incomes', type, category, groupCategory) && <Bar dataKey="incomes" fill="#4CAF50" name="Receitas" />}
        {shouldShowBar('expenses', type, category, groupCategory) && <Bar dataKey="expenses" fill="#FF4D4D" name="Despesas" />}
        {shouldShowBar("total", type, category, groupCategory) && (
          <Bar dataKey="total" name="Total" fill="#2196F3">
            {updatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.barColor} />
            ))}
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  )
}