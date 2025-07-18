import { SignUpController } from '../http/controllers/sign-up-controller'
import { BcryptAdapter } from '../infra/criptography/bcrypt-adapter'
import { prisma } from '../lib/prisma'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { SignUpService } from '../services/sign-up-service'

export const makeSignUpController = () => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const usersRepository = new PrismaUsersRepository(prisma)
    const signUpService = new SignUpService(usersRepository, bcryptAdapter)
    const signUpController = new SignUpController(signUpService)

    return signUpController
}
