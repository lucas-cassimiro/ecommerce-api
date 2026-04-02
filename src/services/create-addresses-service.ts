import { Address, Prisma, PrismaClient } from "../generated/prisma";
import { AddressesRepository } from "../repositories/addresses-repository";

interface CreateAddressServiceRequest {
    userId: number
    street: string
    number: number
    neighborhood: string
    cityId: number
    recipient: string
    cep: string
}

interface CreateAddressServiceResponse {
    address: Address
}

export class CreateAddressesService {
    constructor(
        private readonly addressesRepository: AddressesRepository,
    ) { }

    async execute({
        userId,
        street,
        number,
        neighborhood,
        cityId,
        recipient,
        cep
    }: CreateAddressServiceRequest): Promise<CreateAddressServiceResponse> {
        const address = await this.addressesRepository.create({
            userId,
            street,
            number,
            neighborhood,
            cityId,
            recipient,
            cep
        })

        return {
            address
        }
    }
}