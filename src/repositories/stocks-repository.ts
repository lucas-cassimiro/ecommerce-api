import { Prisma, Stock } from '../generated/prisma'

export interface StocksRepository {
    findByProductId: (productId: number) => Promise<Stock | null>
    create(data: Prisma.StockUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<Stock>
}
