import { z } from "zod";

const categorySchema = z.object({
  group: z.string(),
  category: z.string(),
});

export const transactionSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(20, "O título deve ter no máximo 20 caracteres."),
  amount: z.preprocess(
    (value) => (typeof value === "number" ? value : 0), 
    z.number().positive("O valor deve ser maior que zero."),
  ),
  groupCategory: z.preprocess(
    (val) => {
      try {
        return JSON.parse(val as string);
      } catch {
        return {
          group: '',
          category: ''
        };
      }
    },
    categorySchema.refine(
      (val) => val !== null && val.category !== '' && val.group !== '',
      "Selecione uma categoria"
    ), { message: 'Selecione uma categoria' }
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