import { Encrypter } from '../domain/criptography/encrypter'
import { Role, User } from '../generated/prisma'
import { UsersRepository } from '../repositories/users-repository'

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
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly encrypter: Encrypter,
    ) { }

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

        const passwordHash = await this.encrypter.encrypt(password)

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
