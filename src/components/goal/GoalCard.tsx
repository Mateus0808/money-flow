import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  CalendarClock, 
  RefreshCcw, 
  Target, 
  Pencil, 
  Trash2, 
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { Tooltip } from "../ui/Tooltip";
import { EnumGoalPriority, GoalTypeResponse } from "@/types/goal-type";
import { useGenericMutation } from "@/hooks/useGenericMutation";


const priorityIcons = {
  Baixa: <CheckCircle className="text-green-600" size={18} />,
  Média: <AlertCircle className="text-orange-600" size={18} />,
  Alta: <XCircle className="text-red-600" size={18} />,
};

const priorityColor = {
  [EnumGoalPriority.LOW]: "bg-green-400",
  [EnumGoalPriority.MEDIUM]: "bg-orange-400",
  [EnumGoalPriority.HIGH]: "bg-red-400",
};

type GoalCardProps = {
  goal: GoalTypeResponse
  deleteGoal: (id: string) => Promise<void>
}

export const GoalCard = ({ goal, deleteGoal }: GoalCardProps) => {
  const progress = Math.ceil((goal.initialAmount * 100) / goal.targetAmount)

  const deleteGoalMutation = useGenericMutation({
    mutationFn: (goalId: string) => deleteGoal(goalId),
    queryKey: "goals",
    successMessage: "Meta deletada com sucesso",
  });

  const handleOnDelete = async () => {
    deleteGoalMutation.mutate(goal._id)
  };

  return (
    <div className="flex flex-col gap-4 shadow-lg p-6 bg-white dark:bg-cardDark rounded-lg">
      <div className="flex justify-between items-center">
        <Tooltip content={goal.goalName}>
          <p className="font-semibold text-lg dark:text-white truncate whitespace-nowrap max-w-full cursor-pointer">
            {goal.goalName}
          </p>
        </Tooltip>
        <span className={`${priorityColor[goal.priority]} flex items-center gap-2 px-3 py-1 rounded text-white text-sm`}>
          {priorityIcons[goal.priority]} {goal.priority}
        </span>
      </div>

      <div className="w-full bg-gray-300 dark:bg-gray-400 h-4 rounded-full">
        <div
          className="bg-blue-600 dark:bg-primary text-xs h-4 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <p className="font-medium dark:text-textLight flex items-center gap-1">
          <Target size={18} className="text-red-600" />
          Objetivo: 
          <span className="text-gray-700 dark:text-textLight font-semibold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(goal.targetAmount)}
          </span>
        </p>
        <p className="font-medium flex items-center gap-1">
          <RefreshCcw size={18} className="text-blue-600" />
          <span className="text-gray-700 dark:text-textLight font-semibold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(goal.contribution)}/<span className="lowercase">{goal.frequency}</span>
          </span>
        </p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <p className="font-medium dark:text-white flex items-center gap-1">
          <DollarSign size={18} className="text-green-600" />
          Montante: <span className="text-gray-700 dark:text-textLight font-semibold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(goal.initialAmount)}
          </span>
        </p>
        <p className="font-medium dark:text-textLight flex items-center gap-1">
          <CalendarClock size={18} className="text-yellow-600" />
          {new Date(goal.deadline).toLocaleDateString('pt-BR')}
        </p>
      </div>

      <div className="flex justify-end items-center gap-3">
        <button onClick={handleOnDelete}>
          <Trash2 size={24} className="text-red-500 hover:text-red-600" />
        </button>
        <Link href={`/metas/editar/${goal._id}`}>
          <Pencil size={24} className="text-gray-500 hover:text-gray-800" />
        </Link>
      </div>
    </div>
  );
}