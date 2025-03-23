'use client'

import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { useGoals } from "@/hooks/useGoals";

import { PaginationControls } from "@/components/PaginationControls";
import { GoalCard } from "@/components/goal/GoalCard";
import { FiltersGoal } from "@/components/goal/FiltersGoal";

import LoadingGoals from "./loading";
import { NoChartData } from "@/components/shared/NoChartData";
import { useGoalStore } from "@/stores/useGoalStore";
import { useGenericMutation } from "@/hooks/useGenericMutation";
import { DeleteModalComponent } from "@/components/shared/DeleteModal";


export default function ListGoalsPage() {
  const { pagination, setPagination, deleteGoal } = useGoalStore()

  const [priority, setPriority] = useState("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  
  const { data, isFetching } = useGoals({ priority, month, year, pagination })

  const [goalIdToDelete, setGoalIdToDelete] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false)

  const deleteGoalMutation = useGenericMutation({
    mutationFn: (goalId: string) => deleteGoal(goalId),
    queryKey: "goals"
  });

  const handleOnDelete = async () => {
    if (goalIdToDelete) {
      deleteGoalMutation.mutate(goalIdToDelete);
      setDeleteModal(false);
      setGoalIdToDelete(null);
    }
  };

  const handleOpenModal = (id: string) => {
    setGoalIdToDelete(id);
    setDeleteModal(true);
  }

  const handleCloseModal = () => {
    setDeleteModal(false);
    setGoalIdToDelete(null);
  };

  if (isFetching) return <LoadingGoals />

  return (
    <div className="min-h-screen">
      <div className="w-full bg-white dark:bg-cardDark mx-auto p-6 rounded-lg shadow-lg mb-6">
        {deleteModal &&
          <DeleteModalComponent handleDeleteItem={handleOnDelete} cancelAction={handleCloseModal} />
        }
        <h1 className="text-2xl dark:text-textLight font-bold">Metas Financeira</h1>

        <FiltersGoal 
          month={month}
          priority={priority}
          setMonth={setMonth}
          setPriority={setPriority}
          setYear={setYear}
          year={year}
        />
      </div>

      <div className="flex justify-end items-center mb-4">
        <Link 
          href="/metas/adicionar"
          className="flex min-w-fit items-center gap-2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition duration-200"
        >
          <PlusCircle size={20} />
          Adicionar meta
        </Link>
      </div>

      {data?.goals.length === 0 
        ? <NoChartData label="🔍 Nenhum objetivo disponível"/> 
        : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data?.goals && data?.goals?.map((goal, index) => (
                <GoalCard key={index} goal={goal} handleOpenModal={() => handleOpenModal(goal._id)} />
              ))}
            </div>
            <PaginationControls pagination={data?.pagination || pagination} setPagination={setPagination} />
          </>
        )
      }
    </div>
  );
}
