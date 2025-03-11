'use client'
import { PaginationControls } from "@/components/PaginationControls"
import { useEffect, useState } from "react"
import { TransactionModal } from "@/components/transactions/create-transaction/TransactionModal"
import LoadingTable from "./loading"
import { Button } from "@/components/Button"
import { useTransactions, useTransactionsStore } from "@/hooks/useTransaction"
import { TransactionsTable } from "@/components/transactions/table/TransactionsTable"

export default function TransactionsPage () {
  const { 
    transactions, loading, pagination, setPagination
  } = useTransactions()

  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)

  const handleNewTransactionModal = () => {
    setIsNewTransactionOpen(!isNewTransactionOpen)
  }
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchTransactions()
  //   }
  //   fetchData()
  // }, [pagination.page])

  return (
    <div className="space-y-4 rounded-lg bg-white dark:bg-cardDark p-4">
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
          <div className="overflow-x-auto w-full">
            <TransactionsTable transactions={transactions} showActions={true} /> 
          </div>
        )
      }
      <PaginationControls 
        pagination={pagination} 
        setPagination={setPagination} 
      />
    </div>
  )
}