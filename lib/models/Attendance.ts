import mongoose, { Schema, type Document } from "mongoose"

export interface IAttendance extends Document {
  studentId: mongoose.Types.ObjectId
  date: Date
  status: "present" | "absent" | "late" | "half_day"
  subject?: string
  teacherId: mongoose.Types.ObjectId
  remarks?: string
  createdAt: Date
  updatedAt: Date
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["present", "absent", "late", "half_day"],
      required: true,
    },
    subject: String,
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    remarks: String,
  },
  {
    timestamps: true,
  },
)

AttendanceSchema.index({ studentId: 1, date: 1, subject: 1 }, { unique: true })

export const Attendance = mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema)
