const typeDefs = `
    type Welcome {
        message: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        role: String!
    }

    type Consultation {
        id: ID!
        consultationDate: String!
        consultationType: String!
        healthCareProviders: [String!]!
        medicalConditions: [String!]!
        patient: User!
        consultationOfficer: User!
    }

    type AuthUser {
        token: String!
    }

    type Patient {
        id: ID!
        name: String!
        email: String!
        role: String!
        consultations: [Consultation!]!
    }

    input BookConsultationInput {
        consultationDate: String!
        consultationType: String!
        healthCareProviders: [String!]!
        medicalConditions: [String!]!
        patientId: ID!
    }
    
    type Query {
        welcome: Welcome!
        getUser: User!
        getAllConsultations: [Consultation!]!
        getAllConsultationsForPatient(patientId: ID): [Consultation!]!
        getAllPatients: [User!]!
        getMyConsultations: [Consultation!]!
    }

    type Mutation {
        login(email: String!, password: String!): AuthUser!
        register(name: String!, email: String!, password: String!): AuthUser!
        deleteAccount: String!
        getPatientByName(name: String!): User!
        bookConsultation(bookConsultationInput: BookConsultationInput!): ID!
        deleteConsultation(consultationId: ID!): String!
    }
`;

export { typeDefs };
