import { GraphQLError } from "graphql";

import { BookConsultationInput } from "../../lib/types/consultation.type";
import { IContext } from "../../lib/types/apollo.types";
import {
  checkAuth,
  verifyConsultationOfficerRole,
} from "../../services/auth.service";
import { ConsultationRepository } from "../../repositories/consultation.repository";

const consultationResolver = {
  Query: {
    getAllConsultations: async (_: any, __: any, context: IContext) => {
      const payload = checkAuth(context.token);
      const isConsultationOfficer = await verifyConsultationOfficerRole(
        payload
      );

      if (!isConsultationOfficer) {
        throw new GraphQLError("User is not authorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const allConsultations =
        await ConsultationRepository.getAllConsultations();

      return allConsultations;
    },
    getAllConsultationsForPatient: async (
      _: any,
      { patientId }: { patientId?: string },
      context: IContext
    ) => {
      const payload = checkAuth(context.token);
      const isConsultationOfficer = await verifyConsultationOfficerRole(
        payload
      );

      if (isConsultationOfficer && patientId) {
        const allConsultationsForPatient =
          ConsultationRepository.getAllConsultationsForPatientById(patientId);

        return allConsultationsForPatient;
      } else if (isConsultationOfficer && !patientId) {
        throw new GraphQLError("Patient ID should be provided", {
          extensions: {
            code: "BAD_REQUEST",
          },
        });
      }

      const allConsultationsForPatient =
        ConsultationRepository.getAllConsultationsForPatientById(payload.id);

      return allConsultationsForPatient;
    },
  },
  Mutation: {
    bookConsultation: async (
      _: any,
      {
        bookConsultationInput,
      }: { bookConsultationInput: BookConsultationInput },
      context: IContext
    ) => {
      const payload = checkAuth(context.token);
      const isConsultationOfficer = await verifyConsultationOfficerRole(
        payload
      );

      if (!isConsultationOfficer) {
        throw new GraphQLError("User is not authorized", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const savedConsultationId =
        await ConsultationRepository.createConsultation({
          ...bookConsultationInput,
          consultationOfficerId: payload.id,
        });

      return savedConsultationId;
    },
    deleteConsultation: async (
      _: any,
      { consultationId }: { consultationId: string },
      context: IContext
    ) => {
      const payload = checkAuth(context.token);

      const consultation =
        await ConsultationRepository.getConsultationForPatientById(
          consultationId,
          payload.id
        );

      if (!consultation) {
        throw new GraphQLError("Consultation does not exist", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }

      const ack = await ConsultationRepository.deleteConsultation(
        consultation.id
      );

      if (!ack) {
        throw new GraphQLError("Failed to delete Consultation");
      }

      return "Consultation deleted successfully";
    },
  },
};

export { consultationResolver };
