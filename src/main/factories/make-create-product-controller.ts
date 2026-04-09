import { CreateProductController } from '@/infra/http/controllers/create-product-controller'
import { MinioStorage } from '@/infra/storage/minio-storage'
import { prisma } from '@/lib/prisma'
import { PrismaProductsRepository } from '@/infra/db/prisma/prisma-products-repository'
import { PrismaStocksRepository } from '@/infra/db/prisma/prisma-stocks-repository'
import { CreateProductService } from '@/services/create-product-service'
import { minioClient } from '@/lib/minio'

export const makeCreateProductController = () => {
  const minioStorage = new MinioStorage(minioClient, 'products')
  const productsRepository = new PrismaProductsRepository(prisma)
  const stocksRepository = new PrismaStocksRepository(prisma)
  const createProductService = new CreateProductService(
    productsRepository,
    stocksRepository,
    prisma,
    minioStorage,
  )
  const createProductController = new CreateProductController(createProductService)

  return createProductController
}
