import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";

import { connectDb } from "./models/db";
import { typeDefs } from "./schema/typedefs";
import { resolvers } from "./schema/resolvers";
import { adminRouter } from "./controllers/admin.controller";

interface MyContext {
  token?: String;
}

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
      context: async ({ req }) => {
        const token = req.headers.authorization || "";

        return {
          token,
        };
      },
    })
  );

  app.use("/admin", cors<cors.CorsRequest>(), express.json(), adminRouter);

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
