import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: "super_admin" | "principal" | "vice_principal" | "teacher" | "parent"
  avatar?: string
  phone?: string
  address?: string
  employeeId?: string
  subjects?: string[]
  classes?: string[]
  children?: mongoose.Types.ObjectId[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["super_admin", "principal", "vice_principal", "teacher", "parent"],
      required: true,
    },
    avatar: String,
    phone: String,
    address: String,
    employeeId: String,
    subjects: [String],
    classes: [String],
    children: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
