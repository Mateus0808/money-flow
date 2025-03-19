import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { NoChartData } from "../shared/NoChartData";

interface BalanceLineChartProps {
  data: {
    name: string;
    expenses: any;
    incomes: any;
    total?: number;
  }[]
  // type?: "deposit" | "withdraw" | "total" | ""
  // category?: string
}

export const BalanceLineChart = ({ data }: BalanceLineChartProps) => {
  if (data.length === 0) {
    return (
      <div className="h-[342px]">
        <NoChartData label="🔍 Nenhum dado disponível para os períodos selecionados."/>  
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={342}>
      <LineChart data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="expenses" stroke="#FF4D4D" name="Despesas" />
        <Line type="monotone" dataKey="incomes" stroke="#4CAF50" name="Entradas" />
        <Line type="monotone" dataKey="total" stroke="#2196F3" name="Total" />
      </LineChart>
    </ResponsiveContainer>
  )
}