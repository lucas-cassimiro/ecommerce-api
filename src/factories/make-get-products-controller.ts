import { GetProductsService } from "../services/get-products-service"
import { PrismaProductsRepository } from "../repositories/prisma/prisma-products-repository"
import { prisma } from "../lib/prisma"
import { GetProductsController } from "../http/controllers/get-products-controller"

export const makeGetProductsController = () => {
    const productsRepository = new PrismaProductsRepository(prisma)
    const getProductsService = new GetProductsService(productsRepository)
    const getProductsController = new GetProductsController(getProductsService)

    return getProductsController
}
