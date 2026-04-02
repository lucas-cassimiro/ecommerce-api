import { Prisma, Address } from "../generated/prisma"

export interface AddressesRepository {
    create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
    // update(id: number, newAddress: Address): Promise<void>
    // delete(id: number): Promise<void>
}
