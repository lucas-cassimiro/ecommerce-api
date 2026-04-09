import { Address, Prisma, PrismaClient } from "../../../generated/prisma";
import { AddressesRepository } from "./repositories/addresses-repository";

export class PrismaAddressesRepository implements AddressesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: number): Promise<Address | null> {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
    });

    return address;
  }

  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = await this.prisma.address.create({
      data,
    });

    return address;
  }
}
