import { FastifyReply, FastifyRequest } from 'fastify'

export interface Controller {
    handle: (request: FastifyRequest) => Promise<FastifyReply>
}
