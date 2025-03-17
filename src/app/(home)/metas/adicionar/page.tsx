'use client'
import { useForm } from 'react-hook-form';
import { goalSchema } from '@/libs/validation/goalSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormGoal } from '@/components/goal/FormGoal';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function CreateGoal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(goalSchema),
  });

  const frequency = watch('frequency')
  const showContributionField = frequency !== 'Única' && frequency !== '';

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      console.log('Erro', await response.json())
      alert('Erro ao criar meta.');
      return
    }
    alert('Meta criada com sucesso!');
  };

  return (
    <div className="min-h-screen rounded-lg flex flex-col justify-center items-center">
      <header className="w-full py-4 ">
        <Breadcrumb />
      </header>
      <div className="max-w-2xl bg-white dark:bg-cardDark p-6 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 dark:text-textLight">Adicionar Meta Financeira</h1>
        <FormGoal 
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          showContributionField={showContributionField}
          errors={errors}
        />
      </div>
    </div>
  );
}
