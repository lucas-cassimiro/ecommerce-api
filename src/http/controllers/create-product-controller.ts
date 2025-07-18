import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { StockStatus } from '../../generated/prisma'
import { CreateProductService } from '../../services/create-product-service'

const createProductBodySchema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    description: z.string(),
    categoryId: z.coerce.number(),
    colorId: z.coerce.number(),
    highlight: z.boolean(),
    discount: z.coerce.number().optional(),
    ean: z.string(),
    purchasePrice: z.coerce.number(),
    status: z.enum(['AVAILABLE', 'UNAVAILABLE', 'RESTOCKING']).default('AVAILABLE').transform(val => val as StockStatus),
    quantity: z.coerce.number()
})

export class CreateProductController {
    constructor(private readonly createProductService: CreateProductService) { }

    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const {
                name,
                price,
                description,
                categoryId,
                colorId,
                highlight,
                discount,
                ean,
                purchasePrice,
                quantity,
                status
            } = createProductBodySchema.parse(request.body)

            const image = 'foo'

            const { product } = await this.createProductService.execute({
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
                status
            })

            return response.status(201).send({ message: 'Product created successfully.', product })
        } catch (err) {
            console.error(err)
            return response.status(400).send({ error: err })
        }
    }
}