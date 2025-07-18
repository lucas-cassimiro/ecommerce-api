import { CreateProductController } from '../http/controllers/create-product-controller'
import { prisma } from '../lib/prisma'
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository'
import { PrismaStocksRepository } from '../repositories/prisma/prisma-stocks-repository'
import { CreateProductService } from '../services/create-product-service'

export const makeCreateProductController = () => {
    const productsRepository = new PrismaProductsRepository(prisma)
    const stocksRepository = new PrismaStocksRepository(prisma)
    const createProductService = new CreateProductService(productsRepository, stocksRepository, prisma)
    const createProductController = new CreateProductController(createProductService)

    return createProductController
}
