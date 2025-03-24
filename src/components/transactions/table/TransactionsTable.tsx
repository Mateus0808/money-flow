import { HeaderTable } from '@/components/transactions/table/HeaderTable';
import { TransactionType } from '@/types/transaction-type';
import { ItemTransaction } from './ItemTransaction';
import { NoChartData } from '@/components/shared/NoChartData';
import { DeleteModalComponent } from '@/components/shared/DeleteModal';
import { useTransactionsStore } from '@/stores/useTransactionsStore';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import { useState } from 'react';

type TransactionsTableType = {
  transactions: TransactionType[]
  showActions?: boolean
}

export const TransactionsTable = ({ transactions, showActions = false }: TransactionsTableType) => {
  const { deleteTransaction } = useTransactionsStore()
  const [deleteModal, setDeleteModal] = useState(false)
  const [transactionIdToDelete, setTransactionIdToDelete] = useState<string | null>(null);

  const mutation = useGenericMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    queryKey: 'transactions'
  });

  const handleDeleteTransaction = () => {
    if (transactionIdToDelete) {
      mutation.mutate(transactionIdToDelete);
      setDeleteModal(false);
      setTransactionIdToDelete(null);
    }
  }

  const handleOpenModal = (id: string) => {
    setTransactionIdToDelete(id);
    setDeleteModal(true);
  }

  const handleCloseModal = () => {
    setDeleteModal(false);
    setTransactionIdToDelete(null);
  };

  if (transactions.length === 0) {
    return (
      <div className="w-full h-[194px] flex items-center justify-center">
        <NoChartData label="🔍 Nenhuma transação disponível" />  
      </div>
    )
  }

  return (
    <div className="w-full">
      {deleteModal &&
        <DeleteModalComponent handleDeleteItem={handleDeleteTransaction} cancelAction={handleCloseModal} />
      }
      <table className="w-full bg-white dark:bg-cardDark min-w-[350px]">
        <thead className="bg-inherit">
          <HeaderTable showActions={showActions} />
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <ItemTransaction 
              key={index}
              _id={transaction._id}
              amount={transaction.amount}
              category={transaction.category}
              date={transaction.date.toString()}
              title={transaction.title}
              type={transaction.type}
              showActions={showActions}
              onDelete={() => handleOpenModal(transaction._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};