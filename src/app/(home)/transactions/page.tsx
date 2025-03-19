'use client'

import { useEffect, useState } from "react"
import clsx from "clsx"
import { Filter } from "lucide-react"

import { PaginationControls } from "@/components/PaginationControls"
import { TransactionModal } from "@/components/transactions/create-transaction/TransactionModal"
import { Button } from "@/components/ui/Button"
import { TransactionsTable } from "@/components/transactions/table/TransactionsTable"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { DashboardFilters } from "@/components/dashboard/filters/DashboardFilters"

import LoadingTable from "./loading"
import { useTransactions } from "@/hooks/useTransactions"
import { usePaginationStore } from "@/stores/usePaginationStore"
import { useFiltersStore } from "@/stores/useFiltersStore"
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions"
import { usePaginatedTransactions } from "@/hooks/usePaginatedTransactions"

export default function TransactionsPage () {
  const { transactionsFilters, setTransactionsFilters } = useFiltersStore();
  const { pagination, setPagination } = usePaginationStore()
  
  const {  data, isFetching: loading } = useTransactions({ limit: 'all', filters: transactionsFilters })
  const filteredTransactions = useFilteredTransactions(data?.transactions || [], transactionsFilters);
  const paginatedTransactions = usePaginatedTransactions(filteredTransactions, pagination.page, pagination.limit);

  const [openFilter, setOpenFilter] = useState(false)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)

  const handleNewTransactionModal = () => {
    setIsNewTransactionOpen(!isNewTransactionOpen)
  }

  const toggleFiltersPanel = () => {
    setOpenFilter(!openFilter)
  }

  useEffect(() => {
    const totalPages = Math.ceil(filteredTransactions.length / pagination.limit);

    setPagination({
      ...pagination,
      total: filteredTransactions.length,
      totalPages: totalPages
    });
  }, [filteredTransactions, pagination.totalPages, setPagination]);

  return (
    <div className="flex flex-col">
      <Breadcrumb />
      <div className="relative bg-white dark:bg-cardDark p-4 rounded-lg shadow-md mt-4 flex justify-between items-center gap-4">
        <h1 className="text-2xl text-primary font-bold dark:text-textLight">Transações</h1>

        <button
          onClick={() => toggleFiltersPanel()} 
          className={clsx(
            "flex gap-2 items-center p-2 rounded-lg transition duration-150",
            "hover:bg-gray-400 hover:bg-opacity-20",
            openFilter && "bg-gray-300 bg-opacity-10"
          )}
        >
          <Filter className={`text-gray-600 ${openFilter ? 'text-blue-600' : 'dark:text-textLight'}`} size={24} />
          <span className={`font-bold text-gray-600 ${openFilter ? 'text-blue-600' : 'dark:text-textLight'}`}>Filtros</span>
        </button>
        {openFilter && 
          <DashboardFilters 
            toggleFiltersPanel={toggleFiltersPanel}
            filters={transactionsFilters}
            setFilters={setTransactionsFilters}
          />
        }
      </div>

      <div className="space-y-4 rounded-lg bg-white dark:bg-cardDark p-4 mt-8">
        <div className="w-44 flex float-end mb-3">
          <Button label="Nova Transação" onClick={handleNewTransactionModal} />
        </div>
        <TransactionModal
          isOpen={isNewTransactionOpen}
          onClose={handleNewTransactionModal}
        />
        { loading 
          ? <LoadingTable /> 
          : (
            <>
              <div className="w-full overflow-x-auto">
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