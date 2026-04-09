import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateAddressesService } from '@/services/create-addresses-service'

export class CreateAddressController {
  constructor(private readonly createAddressService: CreateAddressesService) {}

  async handle(request: FastifyRequest, response: FastifyReply) {}
}
