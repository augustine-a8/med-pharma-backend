import { userResolver } from "./user.resolver";

const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

export { resolvers };
