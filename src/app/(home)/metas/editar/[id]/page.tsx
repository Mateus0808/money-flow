'use client'

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { GoalTypeResponse } from "@/types/goal-type";
import { goalSchema } from "@/libs/validation/goalSchema";

import { FormGoal } from "@/components/goal/FormGoal";
import { zodResolver } from "@hookform/resolvers/zod";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { LoadingButton } from "@/components/shared/LoadingButton";


export default function EditGoal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isLoading: isFormLoading  },
  } = useForm({
    resolver: zodResolver(goalSchema),
  });

  const frequency = watch('frequency')
  const showContributionField = frequency !== 'Única' && frequency !== '';

  useEffect(() => {
    getData()
  }, [id])

  const getData = async () => {
    const res = await fetch('/api/goals/' + id)
    const { goal } = await res.json() as { goal: GoalTypeResponse }

    if (!goal) return

    reset({
      ...goal,
      deadline: goal.deadline ? new Date(goal.deadline).toISOString().split("T")[0] : undefined, 
    })
    setIsLoading(false)
  }

  const onSubmit = async (data: any) => {
    const response = await fetch(`/api/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id }),
    })
    if (!response.ok) {
      alert('Erro ao criar meta.');
      return
    }
    alert('Meta ATUALIZADA com sucesso!');
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center mt-14">
        <LoadingButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen rounded-lg flex flex-col justify-center items-center">
      <div className="max-w-2xl bg-white dark:bg-cardDark p-6 rounded-lg shadow-md w-full">
        <h1 className="text-2xl flex justify-center font-bold mb-6 dark:text-textLight">Editar Meta Financeira</h1>

        <FormGoal
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          showContributionField={showContributionField}
          errors={errors}
          isLoading={isFormLoading}
          type="EDIT"
          control={control}
        />
      </div>
    </div>
  )
}