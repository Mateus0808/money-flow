import { AlertCircle, CheckCircle, Goal, XCircle } from "lucide-react"
import { EnumGoalPriority, GoalTypeResponse } from "@/types/goal-type"
import { TruncateTooltip } from "../ui/tooltips/TruncateTooltip"

interface SimpleGoalCardProps {
  goal: GoalTypeResponse
}

export const SimpleGoalCard = ({ goal }: SimpleGoalCardProps) => {
  const progress = Math.ceil((goal.initialAmount * 100) / goal.targetAmount)

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

  return (
    <div className="flex flex-col gap-4 py-3 bg-white dark:bg-cardDark border-t-2 border-gray-200">
      <div className="flex justify-between items-center gap-2"> 
        <div className="flex items-center gap-1">
          <Goal size={20} className="text-orange-600"/>
          <TruncateTooltip content={goal.goalName}>
            <p className="font-semibold text-gray-700 text-md dark:text-white">
              {goal.goalName}
            </p>
          </TruncateTooltip>
        </div>
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
    </div>
  )
}