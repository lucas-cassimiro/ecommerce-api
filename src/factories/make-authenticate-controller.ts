import { JwtAdapter } from '../infra/criptography/jwt-adapter'
import { BcryptAdapter } from '../infra/criptography/bcrypt-adapter'
import { prisma } from '../lib/prisma'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '../services/authenticate-service'
import { AuthenticateController } from '../http/controllers/authenticate-controller'

export const makeAuthenticateController = () => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter('mysecretkey', '1h')
    const usersRepository = new PrismaUsersRepository(prisma)
    const authenticateService = new AuthenticateService(usersRepository, bcryptAdapter, jwtAdapter)
    const authenticateController = new AuthenticateController(authenticateService)

    return authenticateController
}
