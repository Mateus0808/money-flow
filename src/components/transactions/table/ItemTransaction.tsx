'use client'

import { Trash2 } from "lucide-react"
import { ItemTDTable } from "./ItemTDTable";
import { useTransactionsStore } from "@/stores/useTransactionsStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatDate } from "@/utils/format-date";
import { useGenericMutation } from "@/hooks/useGenericMutation";
import { categoryMapping } from "@/components/shared/TransactionCategories";
import { reverseCategoryMapping } from "@/utils/reverse-category-mapping";
import { DeleteModalComponent } from "@/components/shared/DeleteModal";
import { useState } from "react";

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
  _id, amount, category, date, title, type, showActions, onDelete
}: ItemTransactionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const mappedCategory = reverseCategoryMapping[category] || category;

  return (
    <tr className="border-b md:border-none">
      <ItemTDTable>{title}</ItemTDTable>
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