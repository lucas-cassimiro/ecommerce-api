import { Product, Prisma, PrismaClient } from '../../generated/prisma'
import { ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findById(id: number): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({
            where: {
                id
            }
        })

        return product
    }

    async findByEan(ean: string): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({
            where: {
                ean
            }
        })

        return product
    }

    async create(data: Prisma.ProductUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<Product> {
        const prisma = tx ?? this.prisma

        const product = await prisma.product.create({
            data
        })

        return product
    }
}