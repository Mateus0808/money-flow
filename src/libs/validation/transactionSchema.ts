import { z } from "zod";

const categorySchema = z.object({
  group: z.string(),
  category: z.string(),
});

export const transactionSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  amount: z.number().positive("O valor deve ser maior que zero."),
  groupCategory: z.preprocess(
    (val) => {
      try {
        // Tenta fazer o parse do valor JSON
        return JSON.parse(val as string);
      } catch {
        // Se falhar, retorna null para ser validado pelo schema
        return null;
      }
    },
    categorySchema.refine(
      (val) => val !== null,
      "A categoria deve ser um objeto válido."
    )
  ),
  type: z.enum(["income", "expense"]),
  date: z.date({ message: 'Data inválida' }),
  is_recurring: z
    .enum(['yes', 'no'])
    .default('no'),
  payment_method: z
    .enum(["credit_card", "debit_card", "cash", "pix", "bank_transfer"], 
      { message: 'Selecione uma forma de pagamento'}
    ).optional(),
  tags: z.array(z.string()).optional()
});

export type CreateTransactionFormData = z.infer<typeof transactionSchema>;