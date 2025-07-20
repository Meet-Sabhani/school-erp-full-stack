import mongoose, { Schema, type Document } from "mongoose"

export interface IContact extends Document {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "in_progress" | "resolved"
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "in_progress", "resolved"], default: "new" },
  },
  {
    timestamps: true,
  },
)

export const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)
