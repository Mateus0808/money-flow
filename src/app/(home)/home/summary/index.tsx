import Image from "next/image";

import { TransactionType } from "@/types/transaction-type";
import { SummaryCard } from "@/components/home/SummaryCard";

type SummaryProps = {
  transactions: TransactionType[]
}

export const Summary = ({ transactions }: SummaryProps) => {
  const { incomes, outcomes, total } = transactions.reduce(
    (totals, transaction) => {
      if (transaction.type === 'income') {
        totals.incomes += transaction.amount;
      } else if (transaction.type === 'expense') {
        totals.outcomes += transaction.amount;
      }
      totals.total = totals.incomes - totals.outcomes
      return totals;
    },
    { incomes: 0, outcomes: 0, total: 0 }
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <SummaryCard imagePath="/income.svg" label="Entradas" value={incomes} />
      <SummaryCard imagePath="/outcome.svg" label="Saídas" value={outcomes === 0 ? outcomes : -outcomes} />
      <div className="px-6 py-8 rounded bg-primary shadow-lg">
        <header className="flex items-center justify-between">
          <p className="text-white font-semibold">Total</p>
          <Image 
            src="/total.svg" 
            alt="Total" 
            width={40}
            height={40}
          />
        </header>
        <strong className="block text-[1.75rem] text-white font-semibold leading-10">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(total)}
        </strong>
      </div>
    </div>
  )
}