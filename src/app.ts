import fastify, { FastifyReply, FastifyRequest } from "fastify";
import dotenv from "dotenv";
import fjwt from "@fastify/jwt";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import productRoutes from "./modules/product/product.route";
import { EnvToLogger } from "./types/logger.types";

dotenv.config();

const environment: "development" | "production" | "test" =
  process.env.NODE_ENV === "production"
    ? "production"
    : process.env.NODE_ENV === "test"
    ? "test"
    : "development";

const envToLogger: EnvToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid, hostname",
      },
    },
  },
  production: true,
  test: false,
};

export const app = fastify({
  logger: envToLogger[environment] ?? true,
});

app.register(fjwt, {
  secret: process.env.SECRET_KEY as string,
});

app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

app.get("/healthcheck", async () => {
  return { status: "OK" };
});

async function main() {
  for (const schema of [...userSchemas]) {
    app.addSchema(schema);
  }

  app.register(userRoutes, {
    prefix: "api/users",
  });

  app.register(productRoutes, {
    prefix: "api/products",
  });

  try {
    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log(`Server is runnig at port: 3000`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
