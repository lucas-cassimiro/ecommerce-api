import { FastifyInstance } from 'fastify'

import { makeCreateProductController } from '../factories/make-create-product-controller'
import { makeSignUpController } from '../factories/make-sign-up-controller'

export async function appRoutes(app: FastifyInstance) {
    const controller = makeCreateProductController()
    const signUpController = makeSignUpController()

    app.post('/products', (req, reply) => controller.handle(req, reply))
    app.post('/users', (req, reply) => signUpController.handle(req, reply))
}
