const typeDefs = `
    type Welcome {
        message: String!
    }

    type Query {
        welcome: Welcome!
    }
`;

export { typeDefs };
