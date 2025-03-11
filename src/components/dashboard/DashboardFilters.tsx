import { useTransactionsStore } from "@/hooks/useTransaction";
import { Filter, XCircle } from "lucide-react"
import { ChangeEvent, ChangeEventHandler, MouseEvent, useState } from "react"

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

export const DashboardFilters = () => {
  const { setFilters } = useTransactionsStore();
  const [openFilter, setOpenFilter] = useState(false)

  const [dateRange, setDateRange] = useState<{ dateFrom: string; dateTo: string }>({
    dateFrom: "",
    dateTo: ""
  })
  
  // const [selectedPeriod, setSelectedPeriod] = useState("Mês Atual");
  // const [selectedMonth, setSelectedMonth] = useState("");
  // const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedType, setSelectedType] = useState<"income" | "expense" | undefined>(undefined);
  const [comparisonType, setComparisonType] = useState("Mensal");

  const handleOpenFilters = () => {
    setOpenFilter(!openFilter)
  }

  const handleDateRange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDateRange((prev) => {
      const updatedRange = { ...prev, [name]: value };
      if (updatedRange.dateFrom && updatedRange.dateTo && updatedRange.dateTo < updatedRange.dateFrom) {
        alert("A data final não pode ser menor que a data inicial!");
        return prev;
      }
      return updatedRange;
    });
  }

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value === "" ? undefined : (value as "income" | "expense"));
  };

  const applyFilters = () => {
    setFilters({
      startDate: dateRange.dateFrom,
      endDate: dateRange.dateTo,
      category: selectedCategory !== "Todas" ? selectedCategory : undefined,
      type: selectedType
    });
  };

  const handleCleanFilters = () => {
    setSelectedCategory("Todas")
    setSelectedType(undefined)
    setComparisonType("Mensal")
    setDateRange({ dateFrom: "", dateTo: "" })
    setFilters({})
  }

  return (
    <div className="relative bg-white dark:bg-cardDark p-4 rounded-lg shadow-md mt-4 flex flex-col lg:flex-row gap-4">
      <button onClick={() => handleOpenFilters()} className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-400 hover:bg-opacity-10 dark:bg-gray-400 dark:bg-opacity-10">
        <Filter className={`${openFilter ? 'text-blue-600' : 'dark:text-textLight'} dark:hover:text-white`} size={24} />
        <span className={`${openFilter ? 'text-blue-600' : 'dark:text-textLight'}`}>Filtros</span>
      </button>
      
      {openFilter && (
        <div className="z-50 absolute top-14 left-0 min-w-96 border-2 bg-white shadow-lg dark:border-gray-500 dark:bg-cardDark rounded-lg p-4">
          <div className="flex w-full justify-between">
            <p className="dark:text-textLight text-md">Filtros</p>
            <button type="button" onClick={handleCleanFilters} className="flex gap-2 items-center text-primary">
              <XCircle size={24} />
              Limpar
            </button>
          </div>
          <div className="h-[1px] w-full mt-2 bg-gray-300 dark:bg-white" />
          <div className="mt-4">
            <span className="text-gray-500 font-bold">Intervalo de datas</span>
            <div className="grid grid-cols-2 gap-4 mt-1">
              {["dateFrom", "dateTo"].map((field: string) => (
                <div key={field} className="flex flex-col gap-1 w-full">
                  <label htmlFor={field} className="text-sm w-full dark:text-textLight">
                    {field === "dateFrom" ? "De:" : "Até:"}
                  </label>
                  <input
                    type="date"
                    name={field}
                    value={dateRange[field as "dateFrom" | "dateTo"]}
                    onChange={handleDateRange}
                    className="w-full border-2 border-gray-300 dark:border-gray-500 rounded-lg p-2 dark:text-textLight dark:bg-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 w-full">
            <span className="text-gray-500 font-bold">Categoria</span>
            <div className="grid grid-cols-1 mt-2">
              <select 
                className="w-full h-11 border-2 border-gray-300 dark:border-gray-500 rounded-lg p-2 dark:text-textLight dark:bg-cardDark"
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Todas">Todas</option>
                {categories.map(category => (
                  <option value={category} key={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 w-full">
            <span className="text-gray-500 font-bold">Tipo de transação</span>
            <div className="grid grid-cols-1 mt-2">
              <select 
                className="w-full h-11 border-2 border-gray-300 dark:border-gray-500 rounded-lg p-2 dark:text-textLight dark:bg-cardDark"
                value={selectedType ?? ""} 
                onChange={handleTypeChange}
              >
                <option value="">Ambas</option>
                <option value="income">Entradas</option>
                <option value="expense">Saídas</option>
              </select>
            </div>
            <div className="mt-6 w-full flex justify-end">
              <button 
                onClick={applyFilters} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <select 
        className="p-2 border rounded-lg dark:bg-darkInput"
        value={comparisonType} 
        onChange={(e) => setComparisonType(e.target.value)}
      >
        <option value="Mensal">Mensal</option>
        <option value="Trimestral">Trimestral</option>
        <option value="Anual">Anual</option>
      </select>

      <select 
        className="p-2 border rounded-lg dark:bg-darkInput"
        value={selectedPeriod1} 
        onChange={(e) => setSelectedPeriod1(e.target.value)}
      >
        <option value="Janeiro">Janeiro</option>
        <option value="Fevereiro">Fevereiro</option>
        <option value="Março">Março</option>
        <option value="Abril">Abril</option>
        <option value="Maio">Maio</option>
        <option value="Junho">Junho</option>
      </select>

      <select 
        className="p-2 border rounded-lg dark:bg-darkInput"
        value={selectedPeriod2} 
        onChange={(e) => setSelectedPeriod2(e.target.value)}
      >
        <option value="Janeiro">Janeiro</option>
        <option value="Fevereiro">Fevereiro</option>
        <option value="Março">Março</option>
        <option value="Abril">Abril</option>
        <option value="Maio">Maio</option>
        <option value="Junho">Junho</option>
      </select>

      <select 
        className="p-2 border rounded-lg dark:bg-darkInput"
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="Todas">Todas</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Transporte">Transporte</option>
        <option value="Lazer">Lazer</option>
      </select>

      <select 
        className="p-2 border rounded-lg dark:bg-darkInput"
        value={selectedType} 
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="Ambas">Ambas</option>
        <option value="Entradas">Entradas</option>
        <option value="Saídas">Saídas</option>
      </select> */}
    </div>
  )
}