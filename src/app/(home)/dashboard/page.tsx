'use client'
import { useEffect, useMemo, useState } from "react";

import { TransactionType } from "@/types/TransactionType";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FilterButton } from "@/components/ui/FilterButton";
import { ChartsSection } from "@/components/shared/ChartsSection";

import { useFinanceDataStore } from "@/hooks/useFinanceData";
import { useTransactions } from "@/hooks/useTransaction";
import { useTransactionsStore } from "@/stores/useTransactionsStore";
import LoadingDashboard from "./loading";


export default function DashboardPage() {
  const [openFilter, setOpenFilter] = useState(false)
  const { transactions, loading } = useTransactions("all")
  const { filters } = useTransactionsStore();
  const [trans, setTrans] = useState<TransactionType[]>(transactions)

  const chartBarData = useMemo(() => {
    return useFinanceDataStore(transactions, filters.type, filters.category).chartBarData;
  }, [transactions, filters.type, filters.category]);

  const radarChartData = useMemo(() => {
    return useFinanceDataStore(trans).radarChartData;
  }, [trans]);

  const fiveOutcomeCharData = useMemo(() => {
    return useFinanceDataStore(trans).fiveOutcomeCharData;
  }, [trans]);

  const toggleFiltersPanel = () => {
    setOpenFilter(!openFilter)
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('/api/transactions', window.location.origin);
      url.searchParams.set('limit', 'all');
      
      Object.entries(filters).forEach(([key, value]) => {
        if (key !== 'category' && key !== 'type' && !!value) url.searchParams.set(key, value.toString());
      });
      
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Falha ao buscar transações");      
      const result = await res.json();

      setTrans(result.transactions)
    }
    fetchData()
  }, [filters.startDate, filters.endDate])

  return (
    <>
      {loading ? (
        <LoadingDashboard />
      ) : (
        <div className="flex flex-col">
          <Breadcrumb />
          <div className="relative bg-white dark:bg-cardDark p-4 rounded-lg shadow-md mt-4 flex justify-between items-center gap-4">
            <h1 className="text-2xl text-primary font-bold dark:text-textLight">Dashboard</h1>

            <FilterButton openFilter={openFilter} toggleFiltersPanel={toggleFiltersPanel} />
            {openFilter && <DashboardFilters toggleFiltersPanel={toggleFiltersPanel}/>}
          </div>

          <div className="w-full mt-8 flex flex-col gap-8">
            <ChartsSection 
              chartBarData={chartBarData} 
              radarChartData={radarChartData}
              fiveOutcomeCharData={fiveOutcomeCharData}
              type={filters.type} 
              category={filters.category}
              isDashboard={true}
            />
          </div>
        </div>
      )}
    </>    
  )
}