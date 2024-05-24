import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";

import { connectDb } from "./models/db";

interface MyContext {
  token?: String;
}

const typeDefs = `
    type Welcome {
        message: String!
    }

    type Query {
        welcome: Welcome!
    }
`;

const resolvers = {
  Query: {
    welcome: () => ({
      message: "Welcome to MD_Backend",
    }),
  },
};

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4040 }, () => {
      resolve();
      console.log(`🚀 Server ready at http://localhost:4040/graphql`);
    });
  });
}

connectDb()
  .then(() => {
    console.log("Established database connection");
    startServer();
  })
  .catch((err) => console.error(err));
