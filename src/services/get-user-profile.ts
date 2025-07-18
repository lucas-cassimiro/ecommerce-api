import { UsersRepository } from '../repositories/users-repository'
import { User } from '../generated/prisma'
// import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileRequest {
    userId: number
}

interface GetUserProfileResponse {
    user: User
}

export class GetUserProfileService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async execute({
        userId
    }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new Error()
        }

        return {
            user
        }
    }
}
