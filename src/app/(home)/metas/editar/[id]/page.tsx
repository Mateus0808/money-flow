'use client'

import { FormGoal } from "@/components/goal/FormGoal";
import { goalSchema } from "@/libs/validation/goalSchema";
import { GoalTypeResponse } from "@/types/GoalType";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";


export default function EditGoal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(goalSchema),
  });

  const frequency = watch('frequency')
  const showContributionField = frequency !== 'Única' && frequency !== '';

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetch('/api/goals/' + id)
    const { goal } = await res.json() as { goal: GoalTypeResponse }

    if (!goal) return

    reset({
      ...goal,
      deadline: goal.deadline ? new Date(goal.deadline).toISOString().split("T")[0] : undefined, 
    })
}

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/goals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      alert('Erro ao criar meta.');
      return
    }
    alert('Meta ATUALIZADA com sucesso!');
  };


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="w-full flex justify-center items-center text-xl font-semibold mb-4">
          Editar Meta
        </h2>

        <FormGoal
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          showContributionField={showContributionField}
          errors={errors}
        />
      </div>
    </div>
  )
}