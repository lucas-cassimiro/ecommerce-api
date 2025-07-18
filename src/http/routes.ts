import { FastifyInstance } from 'fastify'

import { makeCreateProductController } from '../factories/make-create-product-controller'

export async function appRoutes(app: FastifyInstance) {
    const controller = makeCreateProductController()
    app.post('/products', (req, reply) => controller.handle(req, reply))
}
