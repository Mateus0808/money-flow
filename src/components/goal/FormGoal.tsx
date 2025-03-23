import Link from "next/link"
import { NumericFormat } from 'react-number-format';
import { CheckBoxField } from "../ui/CheckBoxField"
import { InputField } from "../ui/InputField"
import { SelectField } from "../ui/SelectField"
import { TextAreaField } from "../ui/TextAreaField"
import { EnumGoalPriority, IGoalType } from "@/types/goal-type"
import { getAllGoalCategories } from "@/services/category.service"
import { Control, Controller, FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form"
import clsx from "clsx"
import { LoadingButton } from "../shared/LoadingButton"
import { goalMapping } from "@/utils/reverse-goal-mapping";

interface FormGoalProps {
  handleSubmit: UseFormHandleSubmit<IGoalType>
  onSubmit: SubmitHandler<IGoalType>
  register: UseFormRegister<IGoalType>
  errors: FieldErrors<IGoalType>
  control: Control<IGoalType>
  showContributionField: boolean,
  isLoading: boolean
  type: "EDIT" | "CREATE"
}

export const FormGoal = ({ 
  handleSubmit, onSubmit, register, showContributionField, 
  errors, isLoading, type, control
}: FormGoalProps) => {
  const goalCategories = getAllGoalCategories();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        type="text"
        label="Nome da Meta *" 
        register={register("goalName")}  
        error={errors.goalName?.message} 
      />
      <SelectField
        label="Tipo de Meta *" 
        register={register("goalType")}  
        options={goalCategories} 
        error={errors.goalType?.message} 
      />
      <div className="flex w-full gap-4">
        <Controller
          name="initialAmount"
          control={control}
          defaultValue={0}
          render={({ field: { value, onChange, ...props }, fieldState: { error } }) => (
            <NumericFormat
              customInput={InputField}
              prefix="R$ "
              onValueChange={(values) => onChange(values.floatValue)}
              value={value}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              allowNegative={false}
              label="Valor Inicial *"
              error={error?.message}
              placeholder="R$ 0,00"
              {...props}
            />
          )}
        />
        <Controller
          name="targetAmount"
          control={control}
          defaultValue={0}
          render={({ field: { value, onChange, ...props }, fieldState: { error } }) => (
            <NumericFormat
              customInput={InputField}
              prefix="R$ "
              onValueChange={(values) => onChange(values.floatValue)}
              value={value}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              allowNegative={false}
              label="Valor Alvo *"
              error={error?.message}
              placeholder="R$ 0,00"
              {...props}
            />
          )}
        />
        
      </div>          
      <div className="flex w-full gap-4">
        <SelectField 
          label="Frequência de Contribuição *" 
          register={register("frequency")}  
          options={[
            { value: 'monthly', label: "Mensal" }, 
            { value: 'weekly', label: "Semanal" }, 
            { value: 'one-time', label: "Única" }
          ]} 
          error={errors.frequency?.message} 
        />
        {showContributionField && (
          <Controller
          name="contribution"
          control={control}
          defaultValue={0}
          render={({ field: { value, onChange, ...props }, fieldState: { error } }) => (
            <NumericFormat
              customInput={InputField}
              prefix="R$ "
              onValueChange={(values) => onChange(values.floatValue)}
              value={value}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              allowNegative={false}
              label="Aporte *"
              error={error?.message} 
              placeholder="R$ 0,00"
              {...props}
            />
          )}
        />
        )}
      </div>
      <InputField 
        label="Data Limite *" 
        register={register("deadline", { valueAsDate: false })}  
        type="date" 
        error={errors.deadline?.message} 
      />
      <SelectField 
        label="Prioridade *" 
        register={register('priority')}
        options={Object.values(EnumGoalPriority).map(priority => ({
          value: priority,
          label: priority
        }))}
        error={errors.priority?.message} 
      />
      <TextAreaField
        label="Descrição" 
        register={register("description")}
        error={errors.description?.message}
      />
      <CheckBoxField 
        label="Receber lembretes periódicos" 
        register={register("reminder")}
        error={errors.reminder?.message} 
      />
      <div className="flex justify-end gap-2">
        <Link href="/metas" className={clsx(
          'min-w-24 flex justify-center items-center bg-gray-200 text-gray-900 p-2',
          'rounded-md hover:bg-gray-300 transition duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        )}>
          Cancelar
        </Link>
        <button type="submit" disabled={isLoading} className={clsx(
          'min-w-28 flex justify-center items-center bg-indigo-600',
          'text-white p-2 rounded-md hover:bg-indigo-700 transition duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          )}>
            { isLoading ? <LoadingButton /> : type === "EDIT" ? "Atualizar Meta" : "Criar Meta"}
        </button>
      </div>
    </form>
  )
}