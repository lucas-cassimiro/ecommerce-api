import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { AuthenticateService } from '@/services/authenticate-service'

const authenticateBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const { email, password } = authenticateBodySchema.parse(request.body)

      const { user, accessToken, refreshToken } = await this.authenticateService.execute({
        email,
        password,
      })

      return response
        .status(200)
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: false,
          sameSite: 'lax',
          httpOnly: true,
        })
        .send({
          user,
          accessToken,
        })
    } catch (err) {
      console.error(err)
      return response.status(400).send({ message: 'Erro ao autenticar usuário', error: err })
    }
  }
}
