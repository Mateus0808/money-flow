'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TransactionCategories } from "@/components/shared/TransactionCategories";
import { RadioBox } from "@/components/transactions/RadioBox";
import { Button } from "@/components/ui/Button";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";

import { errorNotify } from "@/libs/notify/notify";
import { CreateTransactionFormData, transactionSchema } from "@/libs/validation/transactionSchema";
import { useTransactionsStore } from "@/stores/useTransactionsStore";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateTransaction () {
  const queryClient = useQueryClient();
  const router = useRouter()
  const { createTransaction } = useTransactionsStore()

  const { 
    handleSubmit, register, setValue, control, watch, formState: { errors, isLoading } 
  } = useForm<CreateTransactionFormData>({
    defaultValues: {
      date: new Date(),
      is_recurring: 'no'
    },
    resolver: zodResolver(transactionSchema)    
  })

  const mutation = useMutation({
    mutationFn: (newTransaction: CreateTransactionFormData) => createTransaction(newTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      router.push('/transactions')
    },
    onError: (error) => {
      errorNotify(error.message || 'Erro ao criar transação')
    },
  });

  const onSubmit = async (formData: CreateTransactionFormData) => {
    mutation.mutate(formData)
  }

  return (
    <div className="min-h-screen rounded-lg flex flex-col justify-start items-center">
      <div className="max-w-2xl bg-white dark:bg-cardDark p-6 rounded-lg shadow-md w-full">
        <h1 className="text-2xl text-gray-700 dark:text-textLight font-semibold mb-4">Nova Transação</h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            label="Nome *"
            register={register("title")}  
            error={errors.title?.message}
            placeholder="Título da transação"
          />

          <Controller
            name="amount"
            control={control}
            render={({ field: { onChange, ...props }, fieldState: { error } }) => (
              <NumericFormat
                customInput={InputField}
                prefix="R$ "
                onValueChange={(values) => onChange(values.floatValue)}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                allowNegative={false}
                label="Valor"
                error={error?.message}
                placeholder="R$ 0,00"
                {...props}
              />
            )}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-textLight">Categoria</label>
            <TransactionCategories 
              {...register('groupCategory')}
              isCreateTransaction={true}
            />
            {errors?.groupCategory && <span className="text-sm text-red-500 mt-1">{errors.groupCategory.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-textLight" htmlFor="type">
              Tipo de Transação
            </label>
            <div className="grid grid-cols-2 gap-4">
              <RadioBox
                isActive={watch('type') === "income"}
                activeColor="green"
                title="Entrada"
                imagePath="/income.svg"
                onClick={() => setValue("type", "income")}
              />
              <RadioBox
                isActive={watch('type') === "expense"}
                activeColor="red"
                title="Saída"
                imagePath="/outcome.svg"
                onClick={() => setValue("type", "expense")}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomDatePicker
                  label="Data da Transação"
                  selected={field.value ? field.value : null}
                  onChange={(date) => field.onChange(date)}
                  error={error?.message}
                />
              )}
            />

            <SelectField
              label="Forma de Pagamento"
              register={register("payment_method")}
              options={[
                { value: "credit_card", label: "Cartão de Crédito" },
                { value: "debit_card", label: "Cartão de Débito" },
                { value: "cash", label: "Dinheiro" },
                { value: "pix", label: "Pix" },
                { value: "bank_transfer", label: "Transferência Bancária" }
              ]}
              error={errors.payment_method?.message}
            />
          </div>
          
          <Controller
            control={control}
            name="is_recurring"
            render={({ field }) => (
              <SelectField
                label="Valor Fixo"
                showDefaultOption={false}
                options={[
                  { value: "yes", label: "Sim" },
                  { value: "no", label: "Não" }
                ]}
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value} 
                error={errors.is_recurring?.message}
              />
            )}
          />

          <div className="flex justify-end gap-4">
            <Link
              className="w-1/2 px-4 py-2 h-12 flex items-center justify-center bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400/60 transition-all duration-300 ease-in-out"
              href="/transactions"
            >
              Cancelar
            </Link>
            <div className="w-1/2 h-12">
              <Button label="Salvar" type="submit" isLoading={isLoading} />
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}