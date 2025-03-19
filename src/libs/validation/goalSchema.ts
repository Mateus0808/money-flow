import { EnumGoalPriority } from "@/types/goal-type";
import { z } from "zod";

export const goalSchema = z.object({
  goalName: z.string().min(3, 'O nome da meta deve ter pelo menos 3 caracteres.'),
  goalType: z.string().nonempty('Selecione o tipo de meta.'),
  targetAmount: z.number().positive('O valor alvo deve ser maior que zero.'),
  initialAmount: z.number().min(0, 'O valor inicial não pode ser negativo.'),
  frequency: z.string().nonempty('Selecione a frequência de contribuição.'),
  contribution: z.number().min(0, 'O aporte não pode ser negativo.'),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 
    "A data deve estar no formato DD-MM-YYYY.").refine(
    (date) => {
      const currentDate = new Date();
      const selectedDate = new Date(date);
      return selectedDate > currentDate;
    },
    {
      message: "A data limite deve ser futura.",
    }
  ),
  priority: z.enum([
    EnumGoalPriority.LOW, EnumGoalPriority.MEDIUM, EnumGoalPriority.HIGH
  ], {
    errorMap: () => ({ message: "Selecione uma prioridade válida." }),
  }),
  description: z.string().optional(),
  reminder: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.frequency === "Única") {
    data.contribution = data.initialAmount 
  }
  if (data.frequency !== "Única" && data.contribution <= 0) {
    ctx.addIssue({
      path: ["contribution"],
      message: "O aporte deve ser maior que zero para contribuições recorrentes.",
      code: "custom",
    });
  }

  if (data.initialAmount > data.targetAmount) {
    ctx.addIssue({
      path: ["initialAmount"],
      message: "O valor inicial não pode ser maior ou igual ao valor alvo.",
      code: "custom",
    });
  }
})