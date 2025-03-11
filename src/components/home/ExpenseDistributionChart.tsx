import { 
  Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip 
} from "recharts";

interface ExpenseDistributionChartProps {
  data:  {
    category: string;
    value: number;
  }[],
  data2?:  {
    category: string;
    value: number;
  }[]
}

export const ExpenseDistributionChart = ({ data, data2 }: ExpenseDistributionChartProps) => {
  const mergedData = data.map((item, index) => ({
    category: item.category,
    value1: item.value,
    value2: data2 ? data2[index]?.value ?? 0 : 0
  }));

  return (
    <ResponsiveContainer width="100%" height={342}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mergedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" className="text-xs" />
        <PolarRadiusAxis />
        <Tooltip />
        <Legend />
        <Radar 
          name="Despesas" 
          dataKey="value1" 
          stroke="rgba(255, 87, 51, 0.8)" 
          fill="rgba(255, 87, 51, 0.8)" 
          fillOpacity={0.6} 
        />
        {data2 && (
          <Radar 
            name="Comparação" 
            dataKey="value2"
            stroke="rgba(51, 87, 255, 0.8)" 
            fill="rgba(51, 87, 255, 0.8)" 
            fillOpacity={0.4} 
          />
        )}
      </RadarChart>
    </ResponsiveContainer>
  )
}