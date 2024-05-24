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

    type AuthUser {
        token: String!
    }
    
    type Query {
        welcome: Welcome!
    }

    type Mutation {
        login(email: String!, password: String!): AuthUser!
        register(name: String!, email: String!, password: String!): AuthUser!
    }
`;

export { typeDefs };
