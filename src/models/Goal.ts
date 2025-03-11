import mongoose, { Document, Schema } from "mongoose";

export interface IGoal extends Document {
  goalName: string;
  goalType: string;
  targetAmount: number;
  initialAmount: number;
  contribution: number;
  deadline: Date;
  frequency: string;
  priority: string;
  description?: string
  reminder?: boolean
}

const GoalSchema = new Schema<IGoal>({
  goalName: { type: String, required: true },
  goalType: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  initialAmount: { type: Number, required: true },
  contribution: { type: Number, required: true },
  deadline: { type: Date, required: true },
  frequency: { type: String, required: true },
  priority: { type: String, required: true },
  description: { type: String, required: false },
  reminder: { type: Boolean, required: false }
}, {
  timestamps: true,
});

export default mongoose.models.Goal ||
  mongoose.model<IGoal>("Goal", GoalSchema)