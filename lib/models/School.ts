import mongoose, { Schema, Document } from "mongoose";

export interface ISchool extends Document {
  name: string;
  principalName: string;
  email: string;
  phone: string;
  address: string;
  principalUser: mongoose.Types.ObjectId;
}

const SchoolSchema = new Schema<ISchool>(
  {
    name: { type: String, required: true },
    principalName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    principalUser: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const School =
  mongoose.models.School || mongoose.model<ISchool>("School", SchoolSchema);
