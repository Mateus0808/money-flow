'use client'
import { useEffect, useState } from "react";

import { TransactionType, TransactionTypePagination } from "@/types/TransactionType";
import { errorNotify } from "@/libs/notify/notify";

import { useAuthStore } from "@/hooks/useAuth";
import { useFinanceDataStore } from "@/hooks/useFinanceData";
import { useGoals } from "@/hooks/useGoals";

import { SimpleGoalCard } from "@/components/home/SimpleGoalCard";
import { TransactionsTable } from "@/components/transactions/table/TransactionsTable";
import { ChartsSection } from "@/components/shared/ChartsSection";
import { CardContainer } from "@/components/shared/CardContainer";

import LoadingHome from "./loading";
import { Summary } from "./summary";


export default function HomePage() {
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { loading, checkAuth } = useAuthStore()
  const { goals } = useGoals({})
  const { chartBarData, radarChartData } = useFinanceDataStore(transactions)

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions?limit=all");

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Erro ao buscar transações");
        }

        const data: TransactionTypePagination = await res.json();
        setTransactions(data.transactions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsFetching(false);
      }
    }
    fetchTransactions()
  }, [])
  
  if (error) {
    errorNotify(error)
    return null
  }

  if (loading || isFetching) return <LoadingHome />;

  return (
    <div className="flex flex-col gap-8">
      <Summary transactions={transactions} />

      <ChartsSection chartBarData={chartBarData} radarChartData={radarChartData} isDashboard={false} />
      
      <div className="flex flex-col xl:flex-row gap-6">
        <CardContainer title="Transações Recentes" width="xl:w-2/3">
          <TransactionsTable transactions={transactions.slice(0, 5)} />
        </CardContainer>
        <CardContainer title="Objetivos" width="xl:w-1/3">
          <div className="flex flex-col gap-4">
            {goals?.slice(0, 3).map((goal) => (
              <SimpleGoalCard goal={goal} key={goal._id} />
            ))}
          </div>
        </CardContainer>
      </div>
    </div>
  )
}
