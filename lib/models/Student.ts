import mongoose, { Schema, type Document } from "mongoose"

export interface IStudent extends Document {
  name: string
  email?: string
  rollNumber: string
  class: string
  section: string
  dateOfBirth: Date
  gender: "male" | "female" | "other"
  address: string
  phone?: string
  parentId: mongoose.Types.ObjectId
  avatar?: string
  admissionDate: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: String,
    rollNumber: { type: String, required: true, unique: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    address: { type: String, required: true },
    phone: String,
    parentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    avatar: String,
    admissionDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

export const Student = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema)
