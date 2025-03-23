import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  userId: Types.ObjectId
  title: string;
  amount: number;
  category: string;
  groupCategory: string
  type: "income" | "expense";
  date: Date;
  is_recurring: 'no' | 'yes'
  payment_method: "credit_card" | "debit_card" | "cash" | "pix" | "bank_transfer"
}

const TransactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  groupCategory: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  date: { type: Date, required: true },
  is_recurring: { type: String, enum: ["no", "yes"], default: 'no' },
  payment_method: { type: String, enum: ["credit_card", "debit_card", "cash", "pix", "bank_transfer"]}
});

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
