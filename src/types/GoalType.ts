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
  _id: string
}