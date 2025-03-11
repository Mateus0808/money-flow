import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  title: string;
  amount: number;
  category: string;
  type: "deposit" | "withdraw";
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ["deposit", "withdraw"], required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
