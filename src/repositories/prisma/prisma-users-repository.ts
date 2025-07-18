import { Prisma, PrismaClient, User } from '../../generated/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }


    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.prisma.user.create({
            data
        })

        return user
    }
}

