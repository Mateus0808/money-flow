import Link from "next/link"
import { CheckBoxField } from "../ui/CheckBoxField"
import { InputField } from "../ui/InputField"
import { SelectField } from "../ui/SelectField"
import { TextAreaField } from "../ui/TextAreaField"
import { EnumGoalPriority, IGoalType } from "@/types/GoalType"
import { getAllGoalCategories } from "@/services/category.service"
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

interface FormGoalProps {
  handleSubmit: UseFormHandleSubmit<IGoalType>
  onSubmit: SubmitHandler<IGoalType>
  register: UseFormRegister<IGoalType>
  errors: FieldErrors<IGoalType>
  showContributionField: boolean
}

export const FormGoal = ({ 
  handleSubmit, onSubmit, register, showContributionField, errors
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
        <InputField 
          label="Valor Inicial *" 
          register={register("initialAmount", { valueAsNumber: true })}  
          type="number" 
          error={errors.initialAmount?.message} 
        />
        <InputField 
          label="Valor Alvo *"
          register={register("targetAmount", { valueAsNumber: true })} 
          type="number" 
          error={errors.targetAmount?.message} 
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
          <InputField 
            label="Aporte *" 
            register={register("contribution", { valueAsNumber: true })}
            type="number" 
            error={errors.contribution?.message} 
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
        <Link className="min-w-24 flex justify-center items-center bg-gray-200 text-gray-900 p-2 rounded-md hover:bg-gray-300 transition duration-200" href="/metas">
          Cancelar
        </Link>
        <button type="submit" className="min-w-28 flex justify-center items-center bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-200">
          Criar Meta
        </button>
      </div>
    </form>
  )
}