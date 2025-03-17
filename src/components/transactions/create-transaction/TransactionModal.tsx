import { useState } from "react"
import { RadioBox } from "./RadioBox"
import { useTransactionsStore } from "@/stores/useTransactionsStore"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
}

export const TransactionModal = ({ isOpen, onClose, categories }: TransactionModalProps) => {
  const createTransaction = useTransactionsStore((state) => state.createTransaction)

  const [name, setName] = useState("")
  const [amount, setAmount] = useState<number | "">("")
  const [category, setCategory] = useState(categories[0] || "")
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')

  const handleSubmit = async () => {
    if (!name || amount === "" || !category) return
    await createTransaction({ title: name, amount, category, type })
    setName("")
    setAmount("")
    setCategory(categories[0] || "")
    setType(type)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-cardDark rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-xl dark:text-textLight font-semibold mb-4">Nova Transação</h2>

        <div className="space-y-4">
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
            <select
              className="w-full dark:text-textLight dark:bg-transparent placeholder:text-white h-14 border-2 dark:border-gray-700 border-gray-300 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat} className="dark:text-white dark:bg-cardDark">
                  {cat}
                </option>
              ))}
            </select>
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
        </div>

        <div className="flex w-full justify-end space-x-4 mt-8">
          <button
            className="w-1/2 px-4 py-2 h-14 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="w-1/2 px-4 h-14 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
