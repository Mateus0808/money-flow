import { 
  Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from "recharts";
import { NoChartData } from "../shared/NoChartData";

interface FiveOutcomeChartProps {
  data: {
    name: string
    amount: number
  }[]
}

export const FiveOutcomeChart = ({ data }: FiveOutcomeChartProps) => {
  const colors = ["#FF4D4D", "#FF9800", "#FF6B6B", "#FF5252", "#E91E63"];

  if (data.length === 0) {
    return (
      <div className="w-full h-[342px] flex items-center justify-center">
        <NoChartData label="🔍 Nenhum dado disponível para os períodos selecionados."/>  
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={342}>
      <BarChart layout="vertical" data={data} margin={{ top: 0, right: 0, left: 50, bottom: 0 }}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" barSize={24} fill="#FF4D4D" name="Despesas">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}