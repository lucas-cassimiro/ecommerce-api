import { Product } from '../generated/prisma'
import { ProductsRepository } from '../repositories/products-repository'

interface GetProductsServiceRequest {
    page?: number
    size?: number
}

interface GetProductsServiceResponse {
    products: Product[]
}

export class GetProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async execute({
        page = 1,
        size = 6
    }: GetProductsServiceRequest): Promise<GetProductsServiceResponse> {
        const skip = (page - 1) * size
        const products = await this.productsRepository.findManyPaginated({ skip, take: size })

        return {
            products
        }
    }
}
