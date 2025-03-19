import { useState } from "react"
import { RadioBox } from "./RadioBox"
import { useTransactionsStore } from "@/stores/useTransactionsStore"
import { TransactionCategories } from "@/components/shared/TransactionCategories"
import { Button } from "@/components/ui/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

interface CreateTransactionType {
  type: "deposit" | "withdraw"
  category: string
  amount: number
  title: string
}

export const TransactionModal = ({ isOpen, onClose }: TransactionModalProps) => {
  const queryClient = useQueryClient();
  const { createTransaction, loading } = useTransactionsStore()

  const [name, setName] = useState("")
  const [amount, setAmount] = useState<number | "">("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')

  const mutation = useMutation({
    mutationFn: (newTransaction: CreateTransactionType) => createTransaction(newTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      onClose();
    },
    onError: (error) => {
      console.error('Erro ao criar transação:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || amount === "" || !category || !type) return

    const newTransaction = {
      title: name,
      amount: Number(amount),
      category,
      type,
    };
    mutation.mutate(newTransaction)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-cardDark rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-xl dark:text-textLight font-semibold mb-4">Nova Transação</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-textLight">Nome</label>
            <input
              type="text"
              className="w-full dark:text-textLight dark:bg-transparent placeholder:text-gray-700 h-14 border-2 dark:border-gray-700 border-gray-300 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Descrição da transação"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-textLight">Valor</label>
            <input
              type="number"
              className="w-full dark:text-textLight dark:bg-transparent placeholder:text-gray-700 h-14 border-2 dark:border-gray-700 border-gray-300 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="R$ 0,00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-textLight">Categoria</label>
            <TransactionCategories category={category} setCategory={setCategory} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <RadioBox
              onClick={() => setType("deposit")}
              isActive={type === "deposit"}
              activeColor="green"
              title="Entrada"
              imagePath="/income.svg"
            />

            <RadioBox
              onClick={() => setType("withdraw")}
              isActive={type === "withdraw"}
              activeColor="red"
              title="Saída"
              imagePath="/outcome.svg"
            />
          </div>
          <div className="flex w-full justify-end space-x-4 mt-8">
            <button
              className="w-1/2 px-4 py-2 h-14 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <div className="w-1/2 h-14">
              <Button label="Salvar" type="submit" isLoading={loading} />
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}
