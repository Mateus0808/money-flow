'use client'
import { useEffect, useState } from "react";

import LoadingHome from "./loading";
import { Summary } from "./summary";
import { TransactionType, TransactionTypePagination } from "@/types/TransactionType";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useFinanceDataStore } from "@/hooks/useFinanceData";
import { useGoals } from "@/hooks/useGoals";

import { DashboardSectionChart } from "@/components/home/ChartCard";
import { FinancialBalanceChart } from "@/components/home/FinancialBalanceChart";
import { ExpenseDistributionChart } from "@/components/home/ExpenseDistributionChart";
import { SimpleGoalCard } from "@/components/home/SimpleGoalCard";
import { TransactionsTable } from "@/components/transactions/table/TransactionsTable";

export default function HomePage() {
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const [isFetching, setIsFetching] = useState(true);
  const { loading } = useAuthStore()
  const { chartBarData, radarChartData } = useFinanceDataStore(transactions)
  const { goals } = useGoals({})

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions?limit=all");
        const data: TransactionTypePagination = await res.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error("❌ Erro ao buscar transações:", error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchTransactions()
  }, [])

  return (
    <>
    {loading || isFetching ? <LoadingHome /> : (
      <div className="flex flex-col gap-8">
        <Summary transactions={transactions} />
        <div className="flex flex-col lg:flex-row gap-6">
          <DashboardSectionChart title="Balanço Financeiro" width="xl:w-2/3">
            <FinancialBalanceChart data={chartBarData} />
          </DashboardSectionChart>
          <DashboardSectionChart title="Distribuição de Gastos" width="xl:w-1/3">
            <ExpenseDistributionChart data={radarChartData} />
          </DashboardSectionChart>
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <DashboardSectionChart title="Transações Recentes" width="xl:w-2/3">
            <TransactionsTable transactions={transactions.slice(0, 5)} />
          </DashboardSectionChart>
          <DashboardSectionChart title="Objetivos" width="xl:w-1/3">
            <div className="flex flex-col gap-4">
              {goals?.slice(0, 3).map((goal) => (
                <SimpleGoalCard goal={goal} key={goal._id} />
              ))}
            </div>
          </DashboardSectionChart>
        </div>
      </div>
    )}
    </>
  )
}
