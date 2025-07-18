import { Prisma, User } from '../generated/prisma'

export interface UsersRepository {
    findById: (id: number) => Promise<User | null>
    findByEmail: (email: string) => Promise<User | null>
    create: (data: Prisma.UserCreateInput) => Promise<User>
}
