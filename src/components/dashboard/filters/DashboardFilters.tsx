import { XCircle } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { useFiltersStore } from "@/stores/useFiltersStore"
import { TransactionCategories } from "../../shared/TransactionCategories"
import { DateRangeFilter } from "./DateRangeField"
import { Button } from "@/components/ui/Button"
import { ITransactionFilters } from "@/types/filters"

const categories = [
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
]

interface DashboardFiltersProps {
  toggleFiltersPanel: () => void
  filters: ITransactionFilters
  setFilters: (value: ITransactionFilters) => void
  isDashboard?: boolean
}

export const DashboardFilters = ({ 
  toggleFiltersPanel, filters, setFilters, isDashboard
}: DashboardFiltersProps) => {
  const [dateRange, setDateRange] = useState<{ dateFrom: string; dateTo: string }>({
    dateFrom: "",
    dateTo: ""
  })
  const [selectedCategory, setSelectedCategory] = useState(filters.category || "");
  const [selectedType, setSelectedType] = useState<"deposit" | "withdraw" | "total" | "">(filters.type || "");

  const handleDateRange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDateRange((prev) => {
      const updatedRange = { ...prev, [name]: value };
      if (updatedRange.dateFrom && updatedRange.dateTo && updatedRange.dateTo < updatedRange.dateFrom) {
        // alert("A data final não pode ser menor que a data inicial!");
        return prev;
      }

      return updatedRange;
    });
  }

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "deposit" | "withdraw" | "total" | "";
    setSelectedType(value === "" ? "" : value);
  };

  const applyFilters = () => {
    const newFilters = {
      startDate: dateRange.dateFrom?.trim() || "",
      endDate: dateRange.dateTo?.trim() || "",
      category: selectedCategory || "",
      type: selectedType
    }

    const hasChanged = 
      filters.startDate !== newFilters.startDate ||
      filters.endDate !== newFilters.endDate ||
      filters.category !== newFilters.category ||
      filters.type !== newFilters.type;

    const isValid = Boolean(newFilters.startDate && newFilters.endDate) || newFilters.type || newFilters.category;

    if (hasChanged && isValid) setFilters(newFilters);
  };

  const handleCleanFilters = () => {
    const defaultFilters = {
      startDate: "",
      endDate: "",
      category: "",
      type: "" as ""
    };

    const hasChanged =
      filters.startDate !== defaultFilters.startDate ||
      filters.endDate !== defaultFilters.endDate ||
      filters.category !== defaultFilters.category ||
      filters.type !== defaultFilters.type;
    
    if (hasChanged) {
      setFilters(defaultFilters)
      setSelectedCategory("")
      setSelectedType("")
      setDateRange({ dateFrom: "", dateTo: "" })
    }
  }

  useEffect(() => {
    setDateRange({
      dateFrom: filters.startDate || "",
      dateTo: filters.endDate || "",
    });
    setSelectedType(filters.type)
  }, [filters.startDate, filters.endDate, filters.type]);

  return (
    <div className="z-50 absolute top-16 right-4 min-w-96 border-2 bg-white shadow-lg dark:border-gray-500 dark:bg-cardDark rounded-lg p-4">
      <div className="relative flex w-full justify-between">
        <p className="dark:text-textLight text-md font-semibold text-gray-600">Filtros</p>
        <button 
          type="button" 
          onClick={toggleFiltersPanel} 
          className="dark:text-textLight text-gray-700 flex gap-2 items-center hover:opacity-80 rounded-full">
          <XCircle size={24} />
        </button>
      </div>
      <div className="h-[1px] w-full mt-2 bg-gray-300 dark:bg-white" />
      <div className="mt-4 flex flex-col justify-start">
        <span className="text-gray-500 font-bold flex items-start">Intervalo de datas</span>
        <div className="grid grid-cols-2 gap-4 mt-1">
          <DateRangeFilter 
            label="De:"
            date={dateRange.dateFrom}
            handleDateRange={handleDateRange}
            name="dateFrom"
          />
          <DateRangeFilter 
            label="Até:"
            date={dateRange.dateTo}
            handleDateRange={handleDateRange}
            name="dateTo"
          />
        </div>
      </div>
      <div className="mt-6 w-full">
        <span className="text-gray-500 font-bold flex items-start">Categoria</span>
        <div className="grid grid-cols-1 mt-2">
          <TransactionCategories 
            disabled={!!selectedType} 
            category={selectedCategory} 
            setCategory={setSelectedCategory} 
          />
        </div>
      </div>
      <div className="mt-6 w-full">
        <span className="text-gray-500 font-bold flex items-start">Tipo de transação</span>
        <div className="grid grid-cols-1 mt-2">
          <select 
            className="w-full dark:text-textLight dark:bg-cardDark placeholder:text-white h-12 border-2 dark:border-gray-700 border-gray-300 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType ?? ""} 
            onChange={(e) => handleTypeChange(e)}
            disabled={!!selectedCategory}
          >
            <option value="">...</option>
            <option value="deposit">Entradas</option>
            <option value="withdraw">Saídas</option>
            {isDashboard && <option value="total">Total</option>}
          </select>
        </div>
        <div className="mt-6 w-full flex justify-between gap-4">
          <button 
            type="button" 
            onClick={handleCleanFilters}
            className="dark:text-textLight dark:bg-gray-700 px-4 py-2 rounded-lg bg-gray-300 text-gray-700 flex gap-2 items-center hover:opacity-80">
            Limpar
          </button>
          <Button label="Aplicar" onClick={applyFilters} />
        </div>
      </div>
    </div>
  )
}