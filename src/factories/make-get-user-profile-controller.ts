import { GetUserProfileController } from "../http/controllers/get-user-profile-controller"
import { prisma } from "../lib/prisma"
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository"
import { GetUserProfileService } from "../services/get-user-profile"

export const makeGetUserProfileController = () => {
    const usersRepository = new PrismaUsersRepository(prisma)
    const getUserProfileService = new GetUserProfileService(usersRepository)
    const getUserProfileController = new GetUserProfileController(getUserProfileService)

    return getUserProfileController
}
