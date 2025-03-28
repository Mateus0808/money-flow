import { XCircle } from "lucide-react"
import { useEffect, useRef} from "react"
import { Controller, useForm } from "react-hook-form"

import { ITransactionFilters } from "@/types/filters"
import { enumTransactionType } from "@/types/transaction-type"

import { Button } from "@/components/ui/Button"
import { CustomDatePicker } from "@/components/ui/CustomDatePicker"
import { SelectField } from "@/components/ui/SelectField"

import { TransactionCategories } from "../../shared/TransactionCategories"


const transactionTypeOptions = [
  { value: 'income', label: 'Entradas' },
  { value: 'expense', label: 'Saídas' },
];

const dashboardTransactionTypeOptions = [
  ...transactionTypeOptions,
  { value: 'total', label: 'Total' },
];

interface DashboardFiltersProps {
  setOpenFilter: (value: boolean) => void
  openFilter: boolean
  filters: ITransactionFilters
  setFilters: (value: ITransactionFilters) => void
  isDashboard?: boolean
}


export const DashboardFilters = ({ 
  setOpenFilter, openFilter, filters, setFilters, isDashboard
}: DashboardFiltersProps) => {
  const { 
    register, handleSubmit, control, reset, watch, setValue 
  } = useForm<ITransactionFilters>({
    defaultValues: filters,
  });
  const filterRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  const onSubmit = (data: ITransactionFilters) => {
    const hasChanged = 
      filters.startDate !== data.startDate ||
      filters.endDate !== data.endDate ||
      filters.category !== data.category ||
      filters.groupCategory !== data.groupCategory ||
      filters.type !== data.type;

    const isValid = 
      Boolean(data.startDate && data.endDate) 
      || data.type || data.category || data.groupCategory;

    if (hasChanged && isValid) {
      setFilters(data);
    }
    setOpenFilter(false);
  };

  const handleDateChange = (name: "startDate" | "endDate", date: Date | null) => {
    const startDate = name === "startDate" ? date : watch("startDate");
    const endDate = name === "endDate" ? date : watch("endDate");

    if (startDate && endDate && startDate > endDate) {
      if (name === "startDate") {
        setValue("endDate", startDate);
      } else {
        setValue("startDate", endDate);
      }
    }

    setValue(name, date);
  }

  const handleCleanFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      category: '',
      groupCategory: '',
      type: enumTransactionType.NONE,
    })
    reset({
      startDate: null,
      endDate: null,
      category: '',
      groupCategory: '',
      type: enumTransactionType.NONE,
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setOpenFilter(false);
      }
    }

    if (openFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFilter]);

  return (
    <form 
      ref={filterRef}
      onSubmit={handleSubmit(onSubmit)}
      className="z-50 absolute top-16 right-4 max-w-96 border-2 bg-white shadow-lg dark:border-gray-500 dark:bg-cardDark rounded-lg p-4">
      <div className="relative flex w-full justify-between">
        <p className="dark:text-textLight text-md font-semibold text-gray-600">Filtros</p>
        <button 
          type="button" 
          onClick={() => setOpenFilter(false)} 
          className="dark:text-textLight text-gray-700 flex gap-2 items-center hover:opacity-80 rounded-full">
          <XCircle size={24} />
        </button>
      </div>

      <div className="h-[1px] w-full mt-4 bg-gray-300 dark:bg-gray-500" />

      <div className="mt-4 flex flex-col justify-start">
        <span className="text-gray-500 font-bold flex items-start">Intervalo de datas</span>
        <div className="grid grid-cols-2 gap-4 mt-1">
          <Controller
            name="startDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDatePicker
                label="De:"
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => handleDateChange("startDate", date)}
                error={error?.message}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDatePicker
                label="Até:"
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => handleDateChange("endDate", date)}
                error={error?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-2 w-full">
        <span className="text-gray-500 font-bold flex items-start">Categoria</span>
        <div className="grid grid-cols-1">
        <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <TransactionCategories
                  disabled={!!watch("type") || !!watch("groupCategory")}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )
            }}
          />
        </div>
      </div>

      <div className="mt-2 w-full">
        <SelectField
          disabled={!!watch("category") || !!watch("type")} 
          label="Grupo da categoria"
          classLabel="text-gray-500 font-bold flex items-start"
          options={[
            { value: 'moradia', label: 'Moradia'},
            { value: 'veículos', label: 'Veículos'},
            { value: 'transporte', label: 'Transporte'},
            { value: 'alimentação', label: 'Alimentação'},
            { value: 'saúde', label: 'Saúde'},
            { value: 'lazer', label: 'Lazer'},
            { value: 'educação', label: 'Educação'},
            { value: 'presentes e doações', label: 'Presentes e Doações'},
            { value: 'tecnologia', label: 'Tecnologia'},
            { value: 'finanças', label: 'Finanças'},
          ]}
          register={register('groupCategory')}
        />
      </div>

      <div className="mt-2 w-full">
        <SelectField
          disabled={!!watch("category") || !!watch("groupCategory")} 
          label="Tipo de transação"
          classLabel="text-gray-500 font-bold flex items-start"
          options={ isDashboard ? dashboardTransactionTypeOptions : transactionTypeOptions}
          register={register('type')}
        />
      </div>

         
      <div className="mt-4 w-full flex justify-between gap-4">
        <button 
          type="button" 
          onClick={handleCleanFilters}
          className="dark:text-textLight dark:bg-gray-700 px-4 py-2 rounded-lg bg-gray-300 text-gray-700 flex gap-2 items-center hover:opacity-80">
          Limpar
        </button>

        <Button label="Aplicar"  type="submit" isLoading={false} />
      </div>
    </form>
  )
}