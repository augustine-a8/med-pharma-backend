import { ConsultationModel } from "../models/consultation.model";
import { BookConsultationInput } from "../lib/types/consultation.type";

type CreateConsultation = BookConsultationInput & {
  consultationOfficerId: string;
};

const ConsultationRepository = {
  getAllConsultations: async () => {
    const allConsultations = await ConsultationModel.find({}).populate([
      "patient",
      "consultationOfficer",
    ]);

    return allConsultations;
  },
  createConsultation: async (consultation: CreateConsultation) => {
    const {
      consultationDate,
      consultationOfficerId,
      consultationType,
      healthCareProviders,
      medicalConditions,
      patientId,
    } = consultation;
    const newConsultation = new ConsultationModel({
      consultationDate,
      consultationType,
      healthCareProviders,
      medicalConditions,
      patient: patientId,
      consultationOfficer: consultationOfficerId,
    });

    const savedConsultation = await newConsultation.save();

    return savedConsultation.id;
  },
  getConsultationById: async (consultationId: string) => {
    const consultation = await ConsultationModel.findOne({
      _id: consultationId,
    }).populate("patient");

    return consultation;
  },
  deleteConsultation: async (consultationId: string) => {
    const res = await ConsultationModel.deleteOne({ _id: consultationId });

    return res.acknowledged;
  },
  getConsultationForPatientById: async (
    consultationId: string,
    patentId: string
  ) => {
    const consultation = await ConsultationModel.findOne({
      _id: consultationId,
      patient: patentId,
    });

    return consultation;
  },
  getAllConsultationsForPatientById: async (patientId: string) => {
    const consultations = await ConsultationModel.find({
      patient: patientId,
    }).populate(["consultationOfficer", "patient"]);

    return consultations;
  },
};

export { ConsultationRepository };
