import { Product } from "../generated/prisma"
import { ProductsRepository } from "../repositories/products-repository"

interface GetProductIdServiceRequest {
    productId: number
}

interface GetProductIdServiceResponse {
    product: Product | null
}

export class GetProductIdService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async execute({ productId }: GetProductIdServiceRequest): Promise<GetProductIdServiceResponse> {
        const product = await this.productsRepository.findById(productId)

        if (!product) {
            throw new Error('Product does not exists.')
        }

        return {
            product
        }
    }
}
