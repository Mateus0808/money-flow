import { PaginationType } from "./pagination"

export enum EnumGoalPriority {
  LOW = 'Baixa',
  MEDIUM = 'Média',
  HIGH = 'Alta'
}

export interface IGoalType {
  goalName: string
  goalType: string
  priority: EnumGoalPriority
  initialAmount: number
  targetAmount: number
  contribution: number
  frequency: string
  deadline: string
  description?: string
  reminder: boolean
}
  
export interface GoalTypeResponse extends IGoalType {
  userId: string
  _id: string
}

export interface GoalsResponse {
  goals: GoalTypeResponse[];
  pagination: PaginationType
}
