import { Prisma, PrismaClient, Stock } from '../../generated/prisma'
import { StocksRepository } from '../stocks-repository'

export class PrismaStocksRepository implements StocksRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findByProductId(productId: number): Promise<Stock | null> {
        const product = await this.prisma.stock.findUnique({
            where: {
                productId
            }
        })

        return product
    }

    async create(data: Prisma.StockUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<Stock> {
        const { productId, purchasePrice, quantity, status } = data

        const newStock = await this.prisma.stock.create({
            data: {
                productId,
                purchasePrice,
                quantity,
                status
            }
        })

        return newStock
    }
}