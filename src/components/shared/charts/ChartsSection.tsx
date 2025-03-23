import { enumTransactionType } from "@/types/transaction-type";
import { BalanceLineChart } from "../../dashboard/BalanceLineChart";
import { FiveOutcomeChart } from "../../dashboard/FiveOutcomeChart";
import { CardContainer } from "../CardContainer";
import { ExpenseDistributionChart } from "./ExpenseDistributionChart";
import { FinancialBalanceChart } from "./FinancialBalanceChart";

interface ChartsSectionProps {
  chartBarData: {
    name: string;
    expenses: any;
    incomes: any;
    total?: number;
  }[];
  radarChartData: {
    category: string;
    value: number;
  }[];
  fiveOutcomeCharData?: {
    name: string
    amount: number
  }[];
  type?: enumTransactionType;
  category?: string;
  groupCategory?: string
  isDashboard: boolean;
}

export const ChartsSection = ({ 
  chartBarData, radarChartData, type, category, groupCategory, isDashboard, fiveOutcomeCharData
}: ChartsSectionProps) => ( 
  <>
    <div className="flex flex-col lg:flex-row gap-6">
      <CardContainer title="Balanço Financeiro" width="xl:w-2/3">
        <FinancialBalanceChart data={chartBarData} type={type} category={category} groupCategory={groupCategory} />
      </CardContainer>
      <CardContainer title="Distribuição de Gastos" width="xl:w-1/3">
        <ExpenseDistributionChart data={radarChartData} />
      </CardContainer>
    </div>
    {isDashboard && fiveOutcomeCharData && (
      <div className="flex flex-col lg:flex-row gap-6">
        <CardContainer title="Gráfico de Linhas" width="xl:w-2/3">
          <BalanceLineChart data={chartBarData} />
        </CardContainer>
        <CardContainer title="Maiores Gastos" width="xl:w-1/3">
          <FiveOutcomeChart data={fiveOutcomeCharData} />
        </CardContainer>
      </div>
    )}
  </>
);