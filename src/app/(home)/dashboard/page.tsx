'use client'
import { DashboardSectionChart } from "@/components/home/ChartCard";
import { ExpenseDistributionChart } from "@/components/home/ExpenseDistributionChart";
import { FinancialBalanceChart } from "@/components/home/FinancialBalanceChart";

import { useFinanceDataStore } from "@/hooks/useFinanceData";
import { useTransactions } from "@/hooks/useTransaction";

import LoadingDashboard from "./loading";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";

export default function DashboardPage() {
  const { transactions, loading } = useTransactions("all")
  const { chartBarData, radarChartData } = useFinanceDataStore(transactions)

  return (
    <>
      {loading ? (
        <LoadingDashboard />
      ) : (
        <div className="flex flex-col">
          <h1 className="text-2xl text-primary font-bold dark:text-textLight">Dashboard</h1>
          <DashboardFilters />
          <div className="w-full mt-8">
            
            <div className="flex flex-col lg:flex-row gap-6">
              <DashboardSectionChart title="Balanço Financeiro" width="xl:w-2/3">
                <FinancialBalanceChart data={chartBarData} />
              </DashboardSectionChart>
              <DashboardSectionChart title="Distribuição de Gastos" width="xl:w-1/3">
                <ExpenseDistributionChart data={radarChartData} />
              </DashboardSectionChart>
            </div>
          </div>
        </div>
      )}
    </>    
  )
}