import mongoose, { Schema, type Document } from "mongoose"

export interface IFee extends Document {
  studentId: mongoose.Types.ObjectId
  amount: number
  feeType: "tuition" | "transport" | "library" | "sports" | "other"
  dueDate: Date
  paidDate?: Date
  status: "pending" | "paid" | "overdue"
  academicYear: string
  month: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

const FeeSchema = new Schema<IFee>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    amount: { type: Number, required: true },
    feeType: {
      type: String,
      enum: ["tuition", "transport", "library", "sports", "other"],
      required: true,
    },
    dueDate: { type: Date, required: true },
    paidDate: Date,
    status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" },
    academicYear: { type: String, required: true },
    month: { type: String, required: true },
    description: String,
  },
  {
    timestamps: true,
  },
)

export const Fee = mongoose.models.Fee || mongoose.model<IFee>("Fee", FeeSchema)
