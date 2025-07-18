import { FastifyInstance } from 'fastify'

import {
    makeAuthenticateController,
    makeCreateProductController,
    makeGetProductsController,
    makeSignUpController,
    makeGetProductIdController,
    makeGetUserProfileController
} from '../factories'
import { authMiddleware } from './middlewares/auth'

export async function appRoutes(app: FastifyInstance) {
    const controller = makeCreateProductController()
    const signUpController = makeSignUpController()
    const authenticateController = makeAuthenticateController()
    const getProductsController = makeGetProductsController()
    const getProductIdController = makeGetProductIdController()
    const getUserProfileController = makeGetUserProfileController()

    app.get('/products', (req, reply) => getProductsController.handle(req, reply))
    app.get('/products/:productId', (req, reply) => getProductIdController.handle(req, reply))
    app.post('/products', (req, reply) => controller.handle(req, reply))

    app.get('/me', { onRequest: [authMiddleware] }, (req, reply) => getUserProfileController.handle(req, reply))
    app.post('/users', (req, reply) => signUpController.handle(req, reply))

    app.post('/sessions', (req, reply) => authenticateController.handle(req, reply))
}
