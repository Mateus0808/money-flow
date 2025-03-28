'use client'

import { Trash2 } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatDate } from "@/utils/format-date";
import { reverseCategoryMapping } from "@/utils/reverse-category-mapping";

import { ItemTDTable } from "./ItemTDTable";
import { TruncateTooltip } from "@/components/ui/tooltips/TruncateTooltip";


interface ItemTransactionProps {
  _id: string;
  amount: number
  category: string
  date: string
  title: string
  type: 'income' | 'expense'
  showActions: boolean
  onDelete: () => void
}

export const ItemTransaction = ({ 
  amount, category, date, title, type, showActions, onDelete
}: ItemTransactionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const mappedCategory = reverseCategoryMapping[category] || category;

  return (
    <tr className="relative border-b lg:border-none">
      <ItemTDTable>
        <TruncateTooltip content={title}>{title}</TruncateTooltip>
      </ItemTDTable>
      <ItemTDTable>
        <span className={`${type == 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
        </span>
      </ItemTDTable>
      {!isMobile && <ItemTDTable>{mappedCategory}</ItemTDTable>}
      <ItemTDTable>{formatDate(new Date(date), "dd MMM, yyyy")}</ItemTDTable>
      {showActions && (
      <ItemTDTable>
        <button onClick={onDelete} type="button">
          <Trash2 height={20} width={20} />
        </button>
      </ItemTDTable>
      )}
    </tr>
  )
}