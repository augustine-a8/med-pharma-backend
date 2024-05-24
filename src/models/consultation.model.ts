import { Schema, model } from "mongoose";

import { IConsultationModel } from "../lib/types/model";

const consultationSchema = new Schema<IConsultationModel>(
  {
    consultationDate: { type: Date, required: true },
    consultationType: { type: String, required: true },
    healthCareProviders: { type: [String], required: true },
    medicalConditions: { type: [String], required: true },
    patient: { type: Schema.Types.ObjectId, ref: "User" },
    consultationOfficer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ConsultationModel = model<IConsultationModel>(
  "Consultation",
  consultationSchema
);

export { ConsultationModel };
