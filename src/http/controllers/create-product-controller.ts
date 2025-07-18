import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaClient, StockStatus } from '../../generated/prisma'
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
    status: z.enum(['AVAILABLE', 'UNAVAILABLE', 'RESTOCKING'])
        .default('AVAILABLE')
        .transform(val => val as StockStatus),
    quantity: z.coerce.number()
})

export class CreateProductController {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly createProductService: CreateProductService
    ) { }

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

            const product = await this.createProductService.execute({
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
                status,
                image
            })

            return response.status(201).send({ message: 'Produto criado com sucesso', product })
        } catch (err) {
            console.error(err)
            return response.status(400).send({ message: 'Erro ao criar produto', error: err })
        }
    }
}