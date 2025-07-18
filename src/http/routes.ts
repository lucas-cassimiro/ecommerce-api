import { FastifyInstance } from 'fastify'

import { makeCreateProductController } from '../factories/make-create-product-controller'
import { makeSignUpController } from '../factories/make-sign-up-controller'
import { makeAuthenticateController } from '../factories/make-authenticate-controller'

export async function appRoutes(app: FastifyInstance) {
    const controller = makeCreateProductController()
    const signUpController = makeSignUpController()
    const authenticateController = makeAuthenticateController()

    app.post('/products', (req, reply) => controller.handle(req, reply))
    app.post('/users', (req, reply) => signUpController.handle(req, reply))
    app.post('/sessions', (req, reply) => authenticateController.handle(req, reply))
}
