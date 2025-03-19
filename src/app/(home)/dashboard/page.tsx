'use client'
import { useState } from "react";

import { DashboardFilters } from "@/components/dashboard/filters/DashboardFilters";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FilterButton } from "@/components/ui/FilterButton";
import { ChartsSection } from "@/components/shared/ChartsSection";

import { useFinanceDataStore } from "@/stores/useFinanceDataStore";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { useTransactions } from "@/hooks/useTransactions";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";

import LoadingDashboard from "./loading";


export default function DashboardPage() {
  const { dashboardFilters, setDashboardFilters } = useFiltersStore();
  const { data, isFetching: loading } = useTransactions({
    limit: 'all'
  })
  const filteredTransactions = useDashboardFilters(data?.transactions || [], dashboardFilters);
  const [openFilter, setOpenFilter] = useState(false)

  const { chartBarData } = useFinanceDataStore(
    filteredTransactions, 
    dashboardFilters.type, 
    dashboardFilters.category
  );
  const { fiveOutcomeCharData, radarChartData } = useFinanceDataStore(filteredTransactions)

  const toggleFiltersPanel = () => setOpenFilter(!openFilter)

  if (loading) return <LoadingDashboard />

  return (
    <div className="flex flex-col">
      <Breadcrumb />
      <div className="relative bg-white dark:bg-cardDark p-4 rounded-lg shadow-md mt-4 flex justify-between items-center gap-4">
        <h1 className="text-2xl text-primary font-bold dark:text-textLight">
          Dashboard
        </h1>

        <FilterButton openFilter={openFilter} toggleFiltersPanel={toggleFiltersPanel} />
        {openFilter && 
          <DashboardFilters 
            toggleFiltersPanel={toggleFiltersPanel}
            filters={dashboardFilters}
            setFilters={setDashboardFilters}
            isDashboard={true}
          />
        }
      </div>

      <div className="w-full mt-8 flex flex-col gap-8">
        <ChartsSection 
          chartBarData={chartBarData} 
          radarChartData={radarChartData}
          fiveOutcomeCharData={fiveOutcomeCharData}
          type={dashboardFilters.type} 
          category={dashboardFilters.category}
          isDashboard={true}
        />
      </div>
    </div>
  )
}