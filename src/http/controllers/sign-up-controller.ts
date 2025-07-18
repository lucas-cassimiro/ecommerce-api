import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { Role } from '../../generated/prisma'

import { SignUpService } from '../../services/sign-up-service'

const signUpBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    cpf: z.string(),
    cellphone: z.string(),
    role: z.enum(['ADMIN', 'USER'])
        .default('USER')
        .transform(val => val as Role),
})

export class SignUpController {
    constructor(private readonly signUpService: SignUpService) { }

    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                cpf,
                cellphone,
                role
            } = signUpBodySchema.parse(request.body)

            const user = await this.signUpService.execute({
                firstName,
                lastName,
                email,
                password,
                cpf,
                cellphone,
                role
            })

            return response.status(201).send({ message: 'Usuário cadastrado', user })
        } catch (err) {
            console.error(err)
            return response.status(400).send({ message: 'Erro ao cadastrar usuário', error: err })
        }
    }
}