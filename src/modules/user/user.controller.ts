import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findUserByEmail, getUsers } from "./user.service";
import { verifiedPassword } from "../../utils/hash";
import { app } from "../../app";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500);
  }
}

export async function findUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await getUsers();
    return reply.code(200).send(users);
  } catch (error) {
    return reply.code(500);
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return reply.code(401).send({
        message: "Email invalid or password",
      });
    }

    const correctPassword = verifiedPassword({
      providedPass: password,
      salt: user.salt,
      hash: user.password,
    });

    if (correctPassword) {
      const { password, salt, ...rest } = user;

      return {
        accessToken: app.jwt.sign(rest),
      };
    }

    return reply.code(401).send({
      message: "Email invalid or password",
    });
  } catch (error) {
    return reply.code(500);
  }
}
