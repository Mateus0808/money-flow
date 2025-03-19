import mongoose, { Document, Schema, Types } from "mongoose";

export interface IGoal extends Document {
  userId: Types.ObjectId
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
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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