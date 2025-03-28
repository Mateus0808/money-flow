'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import clsx from "clsx"
import { Filter } from "lucide-react"

import { PaginationControls } from "@/components/PaginationControls"
import { Button } from "@/components/ui/Button"
import { TransactionsTable } from "@/components/transactions/table/TransactionsTable"
import { DashboardFilters } from "@/components/dashboard/filters/DashboardFilters"

import { useTransactions } from "@/hooks/useTransactions"
import { usePaginationStore } from "@/stores/usePaginationStore"
import { useFiltersStore } from "@/stores/useFiltersStore"
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions"
import { usePaginatedTransactions } from "@/hooks/usePaginatedTransactions"

import LoadingTable from "./loading"
import { FilterButton } from "@/components/ui/FilterButton"


export default function TransactionsPage () {
  const { transactionsFilters, setTransactionsFilters } = useFiltersStore();
  const { pagination, setPagination } = usePaginationStore()
  
  const {  data, isFetching: loading } = useTransactions({ limit: 'all', filters: transactionsFilters })
  const filteredTransactions = useFilteredTransactions(data?.transactions || [], transactionsFilters);
  const paginatedTransactions = usePaginatedTransactions(filteredTransactions, pagination.page, pagination.limit);

  const [openFilter, setOpenFilter] = useState(false)

  const toggleFiltersPanel = () => setOpenFilter(!openFilter);

  useEffect(() => {
    const totalPages = Math.ceil(filteredTransactions.length / pagination.limit);

    setPagination({
      ...pagination,
      total: filteredTransactions.length,
      totalPages: totalPages
    });
  }, [filteredTransactions, pagination.totalPages, setPagination]);

  return (
    <div className="min-h-screen">
      <div className="relative bg-white dark:bg-cardDark p-4 rounded-lg shadow-md flex justify-between items-center gap-4">
        <h1 className="text-2xl text-primary font-bold dark:text-textLight">Transações</h1>

        <FilterButton openFilter={openFilter} toggleFiltersPanel={toggleFiltersPanel} />
        {openFilter &&
          <DashboardFilters 
            setOpenFilter={toggleFiltersPanel}
            openFilter={openFilter}
            filters={transactionsFilters}
            setFilters={setTransactionsFilters}
          />
        }
      </div>
      <div className="space-y-4 rounded-lg bg-white dark:bg-cardDark p-4 mt-8">
        <Link href="/transactions/adicionar" className="-z-10 w-44 flex float-end mb-3">
          <Button label="Nova Transação" isLoading={false} />
        </Link>
        { loading 
          ? <LoadingTable /> 
          : (
            <>
              <div className="w-full">
                <TransactionsTable transactions={paginatedTransactions || []} showActions={true} /> 
              </div>
              <PaginationControls 
                pagination={pagination} 
                setPagination={setPagination} 
              />
            </>
          )
        }
      </div>
    </div>
  )
}