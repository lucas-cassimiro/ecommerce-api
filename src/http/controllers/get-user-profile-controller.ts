import { FastifyRequest, FastifyReply } from 'fastify'

export class GetUserProfileController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        return response.send(request.user)
    }
}
