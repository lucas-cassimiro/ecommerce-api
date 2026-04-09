import { GetProductIdController } from '@/infra/http/controllers/get-product-id-controller'
import { prisma } from '@/lib/prisma'
import { PrismaProductsRepository } from '@/infra/db/prisma/prisma-products-repository'
import { GetProductIdService } from '@/services/get-product-id'

export const makeGetProductIdController = () => {
  const productsRepository = new PrismaProductsRepository(prisma)
  const getProductIdService = new GetProductIdService(productsRepository)
  const getProductIdController = new GetProductIdController(getProductIdService)

  return getProductIdController
}
