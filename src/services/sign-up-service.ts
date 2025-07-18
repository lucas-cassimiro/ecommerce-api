import { PrismaClient, Role, User } from '../generated/prisma'
import { UsersRepository } from '../repositories/users-repository'
import bcrypt from 'bcryptjs'

interface SignUpServiceRequest {
    firstName: string
    lastName: string
    email: string
    password: string
    cpf: string
    cellphone: string
    role: Role
}

interface SignUpServiceResponse {
    user: User
}

export class SignUpService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async execute({
        firstName,
        lastName,
        email,
        password,
        cpf,
        cellphone,
        role
    }: SignUpServiceRequest): Promise<SignUpServiceResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('User already exists.')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await this.usersRepository.create({
            firstName,
            lastName,
            email,
            passwordHash,
            cpf,
            cellphone,
            role
        })

        return {
            user,
        }
    }
}
