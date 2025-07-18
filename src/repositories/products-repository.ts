import { Prisma, Product } from '../generated/prisma'

export interface ProductsRepository {
    findById: (id: number) => Promise<Product | null>
    findByEan: (ean: string) => Promise<Product | null>
    findManyPaginated(params: { skip: number; take: number }): Promise<Product[]>
    create: (data: Prisma.ProductUncheckedCreateInput, tx?: Prisma.TransactionClient) => Promise<Product>
}
