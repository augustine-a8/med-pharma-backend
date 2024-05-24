const resolvers = {
  Query: {
    welcome: () => ({
      message: "Welcome to MD_Backend",
    }),
  },
};

export { resolvers };
