import { z } from 'zod'

const createUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email is requried',
      invalid_type_error: 'Email must be an string',
    })
    .email(),
  name: z.string(),
  password: z.string({
    required_error: 'Password is requried',
    invalid_type_error: 'Password must be an string',
  }),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
