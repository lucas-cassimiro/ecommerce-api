import { PrismaClient, Product, StockStatus } from '../generated/prisma'
import { ProductsRepository } from '../repositories/products-repository'
import { StocksRepository } from '../repositories/stocks-repository'

interface CreateProductServiceRequest {
    name: string
    price: number
    image: string
    description: string
    categoryId: number
    colorId: number
    highlight: boolean
    discount?: number
    ean: string
    purchasePrice: number
    quantity: number
    status: StockStatus
}

interface CreateProductServiceResponse {
    product: Product
}

export class CreateProductService {
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly stocksRepository: StocksRepository,
        private readonly prisma: PrismaClient,
    ) { }

    async execute({
        name,
        price,
        image,
        description,
        categoryId,
        colorId,
        highlight,
        discount,
        ean,
        purchasePrice,
        quantity,
        status,
    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
        const productWithSameEan = await this.productsRepository.findByEan(ean)

        if (productWithSameEan) {
            throw new Error('Product already exists.')
        }

        const product = await this.prisma.$transaction(async (tx) => {
            const createdProduct = await this.productsRepository.create({
                name,
                price,
                image,
                description,
                categoryId,
                colorId,
                highlight,
                discount,
                ean,
            }, tx)

            await this.stocksRepository.create({
                productId: createdProduct.id,
                purchasePrice,
                quantity,
                status,
            }, tx)

            return createdProduct
        })

        return {
            product,
        }
    }
}
