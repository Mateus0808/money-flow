'use client'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { goalSchema } from '@/libs/validation/goalSchema';
import { useGenericMutation } from '@/hooks/useGenericMutation';
import { useGoalStore } from '@/stores/useGoalStore';
import { FormGoal } from '@/components/goal/FormGoal';

import { IGoalType } from '@/types/goal-type';

export default function CreateGoal() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      targetAmount: 0,
      initialAmount: 0,
      contribution: 0,
      frequency: '',
      deadline: new Date()
    },
    resolver: zodResolver(goalSchema),
  });

  const router = useRouter()
  const createGoal = useGoalStore((state) => state.createGoal)

  const frequency = watch('frequency')
  const showContributionField = frequency !== 'Única' && frequency !== '';

  const createGoalMutation = useGenericMutation({
    mutationFn: (newTransaction: IGoalType) => createGoal(newTransaction),
    queryKey: "goals",
    successMessage: "Meta criada com sucesso",
  });

  const onSubmit = async (data: IGoalType) => {
    createGoalMutation.mutate(data)
    router.push('/metas')
  };

  return (
    <div className="min-h-screen rounded-lg flex flex-col justify-center items-center">
      <div className="max-w-2xl bg-white dark:bg-cardDark p-6 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-textLight">
          Adicionar Meta Financeira
        </h1>
        <FormGoal 
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          control={control}
          showContributionField={showContributionField}
          errors={errors}
          isLoading={isLoading}
          type='CREATE'
        />
      </div>
    </div>
  );
}
