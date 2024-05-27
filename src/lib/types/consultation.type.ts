import { User } from "./user.type";

type Consultation = {
  id: string;
  consultationDate: Date;
  consultationType: string;
  healthCareProviders: string[];
  medicalConditions: string[];
  patient: User;
  consultationOfficer: User;
};

type BookConsultationInput = {
  consultationDate: string;
  consultationType: string;
  healthCareProviders: string[];
  medicalConditions: string[];
  patientId: string;
};

export { Consultation, BookConsultationInput };
