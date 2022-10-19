import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const userResponse = {
  name: z.string(),
  email: z
    .string({
      required_error: 'Email is requried',
      invalid_type_error: 'Email must be an string',
    })
    .email(),
}

const createUserSchema = z.object({
  ...userResponse,
  password: z.string({
    required_error: 'Password is requried',
    invalid_type_error: 'Password must be an string',
  }),
})

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userResponse,
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
})
