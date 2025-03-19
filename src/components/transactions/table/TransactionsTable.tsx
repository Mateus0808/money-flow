import { HeaderTable } from '@/components/transactions/table/HeaderTable';
import { TransactionType } from '@/types/transaction-type';
import { ItemTransaction } from './ItemTransaction';
import { NoChartData } from '@/components/shared/NoChartData';

type TransactionsTableType = {
  transactions: TransactionType[]
  showActions?: boolean
}

export const TransactionsTable = ({ transactions, showActions = false }: TransactionsTableType) => {
  if (transactions.length === 0) {
    return (
      <div className="h-[194px]">
        <NoChartData label="🔍 Nenhuma transação disponível" />  
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
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
              date={transaction.date}
              title={transaction.title}
              type={transaction.type}
              showActions={showActions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};