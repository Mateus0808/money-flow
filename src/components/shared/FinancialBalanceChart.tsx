import { 
  Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from "recharts";
import { NoChartData } from "./NoChartData";

interface FinancialBalanceChartProps {
  data: {
    name: string;
    expenses: any;
    incomes: any;
    total?: number;
  }[],
  type?: "deposit" | "withdraw" | "total" | ""
  category?: string
}

const getTotalBarColor = (value: number | undefined) => {
  if (value === undefined) return "#2196F3";
  return value >= 0 ? "#2196F3" : "#FF9800";
};

const shouldShowBar = (barType: "expenses" | "incomes" | "total", type: string | undefined, category?: string) => {
  if (!type && !category) return true
  if (barType === "expenses") {
    return type === "withdraw" || (category !== "Trabalho" && !!category);
  }
  if (barType === "incomes") {
    return type === "deposit" || (category === "Trabalho" && !!category)
  }
  if (barType === "total") {
    return type === "total"
  }
  return false;
};

export const FinancialBalanceChart = ({ data, type = undefined, category }: FinancialBalanceChartProps) => {
  const updatedData = data.map((entry) => ({
    ...entry,
    barColor: getTotalBarColor(entry.total),
  }));

  if (updatedData.length === 0) {
    return (
      <div className="h-[342px]">
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
        {shouldShowBar('incomes', type, category) && <Bar dataKey="incomes" fill="#4CAF50" name="Receitas" />}
        {shouldShowBar('expenses', type, category) && <Bar dataKey="expenses" fill="#FF4D4D" name="Despesas" />}
        {shouldShowBar("total", type, category) && (
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