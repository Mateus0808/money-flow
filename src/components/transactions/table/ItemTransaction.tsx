'use client'

import { Trash2 } from "lucide-react"
import { ItemTDTable } from "./ItemTDTable";
import { useTransactionsStore } from "@/stores/useTransactionsStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatDate } from "@/utils/format-date";

interface ItemTransactionProps {
  _id: string;
  amount: number
  category: string
  date: string
  title: string
  type: string
  showActions: boolean
}

export const ItemTransaction = ({ 
  _id, amount, category, date, title, type, showActions
}: ItemTransactionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { deleteTransaction } = useTransactionsStore()

  return (
    <tr className="border-b md:border-none">
      <ItemTDTable>{title}</ItemTDTable>
      <ItemTDTable>
        <span className={`${type == 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
        </span>
      </ItemTDTable>
      {!isMobile && <ItemTDTable>{category}</ItemTDTable>}
      <ItemTDTable>{formatDate(new Date(date), "dd MMM, yyyy")}</ItemTDTable>
      {showActions && (
      <ItemTDTable>
        <button onClick={() => deleteTransaction(_id)} type="button">
          <Trash2 height={20} width={20} />
        </button>
      </ItemTDTable>
      )}
    </tr>
  )
}