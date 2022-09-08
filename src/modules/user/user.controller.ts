
import { FastifyRequest, FastifyReply } from 'fastify'
import { fastify } from '../../app'
import { verifyPassword } from '../../utils/hash'
import { CreateUserInput, LoginInput } from './user.schema'
import { createUser, findUserByEmail } from './user.service'

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput
  }>,
  reply: FastifyReply) {

  const body = request.body

  try {
    const user = await createUser(body)

    return reply.code(201).send(user)

  } catch (error) {
    console.error(error)
    return reply.code(500).send(error)
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput
  }>,
  reply: FastifyReply) {

  const body = request.body

  try {
    const user = await findUserByEmail(body.email)

    if (!user) {
      return reply.code(401).send({
        message: "Invalid Email Or Password"
      })
    }

    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      salt: user.salt,
      hash: user.password
    })

    if (correctPassword) {
      const { password, salt, ...rest } = user

      return { accessToken: fastify.jwt.sign(rest) }
    }

    return reply.code(401).send({
      message: "Invalid Email Or Password"
    })

  } catch (error) {
    console.error(error)
    return reply.code(500).send(error)
  }
}
