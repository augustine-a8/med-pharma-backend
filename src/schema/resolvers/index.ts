import { userResolver } from "./user.resolver";
import { consultationResolver } from "./consultation.resolver";

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...consultationResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...consultationResolver.Mutation,
  },
};

export { resolvers };
