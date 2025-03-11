import { HeaderTable } from '@/components/transactions/table/HeaderTable';
import { TransactionType } from '@/types/TransactionType';
import { ItemTransaction } from './ItemTransaction';

type TransactionsTableType = {
  transactions: TransactionType[]
  showActions?: boolean
}

export const TransactionsTable = ({ transactions, showActions = false }: TransactionsTableType) => {
  return (
    <table className="w-full table-auto bg-white dark:bg-cardDark">
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
  );
};