import { FastifyRequest, FastifyReply } from 'fastify'
import { GetProductsService } from '../../services/get-products-service'
import { z, ZodError } from 'zod'

const querySchema = z.object({
    page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
    size: z.string().optional().transform((val) => (val ? Number(val) : 6)),
})

export class GetProductsController {
    constructor(private readonly getProductsService: GetProductsService) { }

    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { page, size } = querySchema.parse(request.query)

            const { products } = await this.getProductsService.execute({
                page,
                size
            })

            return response.status(200).send(products)
        } catch (err) {
            if (err instanceof ZodError) {
                return response.status(400).send({ message: 'Invalid query parameters', error: err.issues })
            }
            return response.status(500).send({ message: 'Internal server error' })
        }
    }
}
