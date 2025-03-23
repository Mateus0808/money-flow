'use client'

import { errorNotify } from "@/libs/notify/notify";

import { useGoals } from "@/hooks/useGoals";
import { useTransactions } from "@/hooks/useTransactions";
import { useFinanceDataStore } from "@/stores/useFinanceDataStore";

import { SimpleGoalCard } from "@/components/home/SimpleGoalCard";
import { TransactionsTable } from "@/components/transactions/table/TransactionsTable";
import { ChartsSection } from "@/components/shared/charts/ChartsSection";
import { CardContainer } from "@/components/shared/CardContainer";
import { NoChartData } from "@/components/shared/NoChartData";

import LoadingHome from "./loading";
import { Summary } from "./summary";


export default function HomePage() {
  const { data: goalResponse } = useGoals({ pagination: {
    limit: 3, page: 1, total: 0, totalPages: 1
  }})
  const { data, isLoading: isFetching, isError } = useTransactions({
    limit: 'all'
  })

  const { chartBarData, radarChartData } = useFinanceDataStore(data?.transactions)
  
  if (isError) {
    errorNotify('Erro interno no servidor')
    return null
  }

  if (isFetching || !data) return <LoadingHome />;

  return (
    <div className="flex flex-col gap-8">
      <Summary transactions={data?.transactions} />

      <ChartsSection chartBarData={chartBarData} radarChartData={radarChartData} isDashboard={false} />
      
      <div className="flex flex-col xl:flex-row gap-6">
        <CardContainer title="Transações Recentes" width="xl:w-2/3">
          <TransactionsTable transactions={data?.transactions.slice(0, 5)} />
        </CardContainer>
        <CardContainer title="Objetivos" width="xl:w-1/3">
          {goalResponse?.goals.length === 0 ? (
            <div className="h-[194px]">
              <NoChartData label="🔍 Nenhum objetivo cadastrado"/>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {goalResponse?.goals?.slice(0, 3).map((goal) => (
                <SimpleGoalCard goal={goal} key={goal._id} />
              ))}
            </div>
          )}
        </CardContainer>
      </div>
    </div>
  )
}
