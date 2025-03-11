import { EnumGoalPriority } from "@/types/GoalType";
import { z } from "zod";

export const goalSchema = z.object({
  goalName: z.string().min(3, 'O nome da meta deve ter pelo menos 3 caracteres.'),
  goalType: z.string().nonempty('Selecione o tipo de meta.'),
  targetAmount: z.number().positive('O valor alvo deve ser maior que zero.'),
  initialAmount: z.number().min(0, 'O valor inicial não pode ser negativo.'),
  contribution: z.number().positive('O aporte deve ser maior que zero.'),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 
    "A data deve estar no formato YYYY-MM-DD.").refine(
    (date) => {
      const currentDate = new Date();
      const selectedDate = new Date(date);
      return selectedDate > currentDate;
    },
    {
      message: "A data limite deve ser futura.",
    }
  ),
  frequency: z.string().nonempty('Selecione a frequência de contribuição.'),
  priority: z.enum([
    EnumGoalPriority.LOW, EnumGoalPriority.MEDIUM, EnumGoalPriority.HIGH
  ], {
    errorMap: () => ({ message: "Selecione uma prioridade válida." }),
  }),
  description: z.string().optional(),
  reminder: z.boolean(),
}).refine(
  (data) => data.initialAmount < data.targetAmount, 
  {
    message: "O valor inicial não pode ser maior ou igual ao valor alvo.",
    path: ["initialAmount"], // Associa o erro ao campo correto
  }
)
