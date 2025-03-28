import { 
  CalendarClock, 
  RefreshCcw, 
  Target, 
  Pencil, 
  Trash2, 
  DollarSign,
  Goal
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TruncateTooltip } from "../ui/tooltips/TruncateTooltip";
import { GoalTypeResponse } from "@/types/goal-type";
import { reverseGoalMapping } from "@/utils/reverse-goal-mapping";
import { formatDate } from "@/utils/format-date";

const priorityIcons = {
  Baixa: '/low.svg',
  Média: '/medium.svg',
  Alta: '/high.svg'
};

type GoalCardProps = {
  goal: GoalTypeResponse
  handleOpenModal: () => void
}

export const GoalCard = ({ goal, handleOpenModal }: GoalCardProps) => {
  const progress = Math.ceil((goal.initialAmount * 100) / goal.targetAmount)

  const mappedFrequency = reverseGoalMapping[goal.frequency] || goal.frequency

  return (
    <div className="flex flex-col gap-4 shadow-lg p-6 bg-white dark:bg-cardDark rounded-lg">
      <div className="flex justify-between items-center">
        <TruncateTooltip content={goal.goalName}>
          <div className="flex items-center gap-2">
            <Goal size={20} className="text-orange-600"/>
            <p className="font-semibold text-gray-700 text-lg dark:text-white truncate whitespace-nowrap max-w-full cursor-pointer">
              {goal.goalName}
            </p>
          </div>          
        </TruncateTooltip>
        <Image 
          src={priorityIcons[goal.priority]}
          alt="Priority Icon"
          height={24}
          width={24}
        />
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
        <p className="font-medium text-gray-700 dark:text-textLight flex items-center gap-1">
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
            }).format(goal.contribution)}/
            <span className="lowercase">{mappedFrequency}</span>
          </span>
        </p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <p className="font-medium text-gray-700 dark:text-white flex items-center gap-1">
          <DollarSign size={18} className="text-green-600" />
          Montante: <span className="text-gray-700 dark:text-textLight font-semibold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(goal.initialAmount)}
          </span>
        </p>
        <p className="font-medium text-gray-700 dark:text-textLight flex items-center gap-1">
          <CalendarClock size={18} className="text-yellow-600" />
          {formatDate(new Date(goal.deadline), 'dd MMM, yyyy')}
        </p>
      </div>

      <div className="flex justify-end items-center gap-3">
        <button onClick={handleOpenModal}>
          <Trash2 size={24} className="text-red-500 hover:text-red-600" />
        </button>
        <Link href={`/metas/editar/${goal._id}`}>
          <Pencil size={24} className="text-gray-500 hover:text-gray-700/90 dark:hover:text-gray-600/90" />
        </Link>
      </div>
    </div>
  );
}