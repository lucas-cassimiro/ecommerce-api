import { FastifyInstance } from 'fastify'

import {
  makeAuthenticateController,
  makeCreateProductController,
  makeGetProductsController,
  makeSignUpController,
  makeGetProductIdController,
  makeGetUserProfileController,
} from '@/main/factories'
import { authMiddleware } from './middlewares/auth'
import { makeRefreshTokenController } from '@/main/factories/make-refresh-token-controller'
import { uploadMiddleware } from './middlewares/upload'

export async function appRoutes(app: FastifyInstance) {
  const controller = makeCreateProductController()
  const signUpController = makeSignUpController()
  const authenticateController = makeAuthenticateController()
  const getProductsController = makeGetProductsController()
  const getProductIdController = makeGetProductIdController()
  const getUserProfileController = makeGetUserProfileController()
  const refreshTokenController = makeRefreshTokenController()

  app.get('/products', (req, reply) => getProductsController.handle(req, reply))
  app.get('/products/:productId', (req, reply) => getProductIdController.handle(req, reply))
  app.post('/products', { preHandler: [uploadMiddleware] }, (req, reply) =>
    controller.handle(req, reply),
  )

  app.post('/users', (req, reply) => signUpController.handle(req, reply))
  app.post('/sessions', (req, reply) => authenticateController.handle(req, reply))

  app.get('/me', { onRequest: [authMiddleware] }, (req, reply) =>
    getUserProfileController.handle(req, reply),
  )

  app.patch('/token/refresh', (req, reply) => refreshTokenController.handle(req, reply))
}
