import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/infra/db/prisma/prisma-users-repository'
import { AuthenticateService } from '@/services/authenticate-service'
import { AuthenticateController } from '@/infra/http/controllers/authenticate-controller'

export const makeAuthenticateController = () => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter('mysecretkey', '1h', '7d')
  const usersRepository = new PrismaUsersRepository(prisma)
  const authenticateService = new AuthenticateService(usersRepository, bcryptAdapter, jwtAdapter)
  const authenticateController = new AuthenticateController(authenticateService)

  return authenticateController
}
