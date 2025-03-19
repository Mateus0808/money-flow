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
  console.log("errors", errors)
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
          render={({ field: { value, onChange, ...props }, fieldState: { error } }) => (
            <NumericFormat
              customInput={InputField}
              prefix="R$ "
              onValueChange={(values) => onChange(values.floatValue)}
              thousandSeparator="."
              decimalSeparator=","
              suffix=",00"
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
          render={({ field: { value, onChange, ...props }, fieldState: { error } }) => (
            <NumericFormat
              customInput={InputField}
              prefix="R$ "
              onValueChange={(values) => onChange(values.floatValue)}
              thousandSeparator="."
              decimalSeparator=","
              suffix=",00"
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
          options={["Mensal", "Semanal", "Única"]} 
          error={errors.frequency?.message} 
        />
        {showContributionField && (
          <Controller
          name="contribution"
          control={control}
          render={({ field: { value, onChange, ...props }, fieldState: { error } }) => (
            <NumericFormat
              customInput={InputField}
              prefix="R$ "
              onValueChange={(values) => onChange(values.floatValue)}
              thousandSeparator="."
              decimalSeparator=","
              suffix=",00"
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
        options={[EnumGoalPriority.LOW, EnumGoalPriority.MEDIUM, EnumGoalPriority.HIGH]} 
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