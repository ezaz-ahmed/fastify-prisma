import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userResponse = {
  name: z.string(),
  email: z
    .string({
      required_error: "Email is requried",
      invalid_type_error: "Email must be an string",
    })
    .email(),
};

const createUserSchema = z.object({
  ...userResponse,
  password: z.string({
    required_error: "Password is requried",
    invalid_type_error: "Password must be an string",
  }),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userResponse,
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is requried",
      invalid_type_error: "Email must be an string",
    })
    .email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});
