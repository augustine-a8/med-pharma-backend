import { Document } from "mongoose";

type UserRole = "Patient" | "ConsultationOfficer";

interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface IConsultationModel extends Document {
  consultationDate: Date;
  consultationType: string;
  healthCareProviders: string[];
  medicalConditions: string[];
  patient: IUserModel;
  consultationOfficer: IUserModel;
}

interface IInvitationCode extends Document {
  code: string;
  expiresAt: Date;
  used: boolean;
}

export { IConsultationModel, IUserModel, UserRole, IInvitationCode };
