import { FastifyRequest, FastifyReply } from 'fastify'
import { GetProductsService } from '../../services/get-products-service'
import { z, ZodError } from 'zod'
import { GetProductIdService } from '../../services/get-product-id'

const querySchema = z.object({
    productId: z.coerce.number()
})

export class GetProductIdController {
    constructor(private readonly getProductIdService: GetProductIdService) { }

    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { productId } = querySchema.parse(request.params)

            const { product } = await this.getProductIdService.execute({ productId })

            return response.status(200).send(product)
        } catch (err) {
            if (err instanceof ZodError) {
                return response.status(400).send({ message: 'Invalid product id', error: err.issues })
            }
            return response.status(500).send({ message: 'Internal server error', err })
        }
    }
}
