'use client'
import { PaginationControls } from "@/components/PaginationControls"
import { useState } from "react"
import { TransactionModal } from "@/components/transactions/create-transaction/TransactionModal"
import LoadingTable from "./loading"
import { Button } from "@/components/ui/Button"
import { useTransactions } from "@/hooks/useTransaction"
import { TransactionsTable } from "@/components/transactions/table/TransactionsTable"
import Breadcrumb from "@/components/ui/Breadcrumb"
import clsx from "clsx"
import { Filter } from "lucide-react"
import { DashboardFilters } from "@/components/dashboard/DashboardFilters"

export default function TransactionsPage () {
  const { 
    transactions, loading, pagination, setPagination
  } = useTransactions()
  const [openFilter, setOpenFilter] = useState(false)
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)

  const handleNewTransactionModal = () => {
    setIsNewTransactionOpen(!isNewTransactionOpen)
  }

  const toggleFiltersPanel = () => {
    setOpenFilter(!openFilter)
  }
  console.log("pagination trans", pagination)

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
        {openFilter && <DashboardFilters toggleFiltersPanel={toggleFiltersPanel} />}
      </div>

      <div className="space-y-4 rounded-lg bg-white dark:bg-cardDark p-4 mt-8">
        <div className="w-full flex justify-end">
          <Button label="Nova Transação" onClick={handleNewTransactionModal} />
        </div>
        <TransactionModal
          isOpen={isNewTransactionOpen}
          onClose={handleNewTransactionModal}
          categories={[
            "Trabalho",
            "Saúde",
            "Alimentação",
            "Lazer",
            "Vestuário",
            "Moradia",
            "Transporte",
            "Educação",
            "Contas e Serviços",
            "Investimentos",
            "Dívidas",
            "Presentes e Doações",
            "Tecnologia",
            "Outros"
          ]}
        />
        { loading 
          ? <LoadingTable /> 
          : (
            <div className="w-full overflow-x-auto">
              <TransactionsTable transactions={transactions} showActions={true} /> 
            </div>
          )
        }
        <PaginationControls 
          pagination={pagination} 
          setPagination={setPagination} 
        />
      </div>
    </div>
  )
}