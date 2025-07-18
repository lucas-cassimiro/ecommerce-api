import { FastifyInstance } from 'fastify'

import { makeAuthenticateController, makeCreateProductController, makeGetProductsController, makeSignUpController } from '../factories'

export async function appRoutes(app: FastifyInstance) {
    const controller = makeCreateProductController()
    const signUpController = makeSignUpController()
    const authenticateController = makeAuthenticateController()
    const getProductsController = makeGetProductsController()

    app.get('/products', (req, reply) => getProductsController.handle(req, reply))
    app.post('/products', (req, reply) => controller.handle(req, reply))
    app.post('/users', (req, reply) => signUpController.handle(req, reply))
    app.post('/sessions', (req, reply) => authenticateController.handle(req, reply))
}
