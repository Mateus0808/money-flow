import { Pie, Bar, Line, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, 
  PointElement, LineElement, Title, Tooltip, Legend, Filler, RadialLinearScale
} from 'chart.js';
import { useFinanceData } from '@/hooks/useFinanceData';
import { TransactionType } from '@/types/TransactionType';
import { ChartCard } from '@/components/home/ChartCard';

ChartJS.register(
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  RadialLinearScale
);

type FinanceChartsProps = {
  transactions: TransactionType[];
};

export const FinanceCharts = ({ transactions }: FinanceChartsProps) => {
  const { pieData, barData, fiveOutcomeCharData, lineData } = useFinanceData(transactions);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Despesas por Categoria">
          <Pie data={pieData} />
        </ChartCard>

        <ChartCard title="Entradas vs Saídas">
          <Bar 
            data={barData} 
            options={{ scales: { y: { beginAtZero: true } } }} 
          />
        </ChartCard>

        <ChartCard title="Despesas Mensais">
          <Line 
            data={lineData} 
            options={{ scales: { y: { beginAtZero: true } } }} 
          />
        </ChartCard>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
        <ChartCard title=" ">
          <Bar 
            data={fiveOutcomeCharData} 
            options={{ 
              indexAxis: 'y', responsive: true, 
              plugins: { legend: { display: false }, 
              title: { display: true, text: "Top 5 Categorias com Mais Gastos" } }, 
              scales: { x: { beginAtZero: true } } 
            }} 
          />
        </ChartCard>
        <ChartCard title=" ">
          <Radar 
            data={pieData}
          />
        </ChartCard>
      </div>
      <div className="grid">
        <div>
        </div>
      </div>
    </div>
  );
};