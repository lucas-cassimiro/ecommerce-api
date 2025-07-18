import { SignUpController } from '../http/controllers/sign-up-controller'
import { prisma } from '../lib/prisma'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { SignUpService } from '../services/sign-up-service'

export const makeSignUpController = () => {
    const usersRepository = new PrismaUsersRepository(prisma)
    const signUpService = new SignUpService(usersRepository)
    const signUpController = new SignUpController(signUpService)

    return signUpController
}
