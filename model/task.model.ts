import { model, Schema, Model, Document } from "mongoose";

export interface Task extends Document {
  name: string;
  desc: string;
}

const TaskSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const TaskModel: Model<Task> = model<Task>("todos", TaskSchema);